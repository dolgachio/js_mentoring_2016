'use strict';

module.exports = {
    buildSimpleChart,
    buildExtendedBarChart,
    buildLayoutChart
};

function buildSimpleChart(data, desc, rootClass) {
    const width = '100%';
    const barHeight = 40;

    const x = d3.scale.linear()
        .range([0, width]);

    const chart = d3.select(rootClass)
        .append('svg')
        .attr('class', 'chart-svg')
        .attr('width', width);

    x.domain([0, d3.max(data, d => d.value + 100)]);

    chart.attr('height', barHeight * data.length);

    const bar = chart.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0,${i * barHeight})`);

    bar.append('rect')
        .attr('width', (d) => x(d.value))
        .attr('height', barHeight - 1)
        .style('fill', () => d3.rgb(_getRandomRgbColorIndex(), _getRandomRgbColorIndex(), _getRandomRgbColorIndex()));

    bar.append('text')
        .attr('x', d => x(d.value - 5))
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(d => `${d.name} ${desc}: ${d.value}`);
}

function buildExtendedBarChart(data, rootClass) {
    const margin = {top: 20, right: 20, bottom: 30, left: 20};
    const width = 1500 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const yTicks = _formatTicksList(data, 'value');

    const x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    const y = d3.scale.linear()
        .range([height, 0]);

    const xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    const yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .tickValues(yTicks);

    const svg = d3.select(rootClass)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain(data.map( d => d.name));
    y.domain([0, d3.max(data, d => d.value)]);

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('QTY');

    svg.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('width', x.rangeBand())
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
        .style('fill', d3.rgb(_getRandomRgbColorIndex(), _getRandomRgbColorIndex(), _getRandomRgbColorIndex()));
}

function buildLayoutChart(data, rootClass) {
    const diameter = 800;
    const format = d3.format(',d');
    const color = d3.scale.category20c();

    const bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    const svg = d3.select(rootClass)
        .append('svg')
        .attr('width', diameter)
        .attr('height', diameter)
        .attr('class', 'bubble');

    const node = svg.selectAll('.node')
        .data(bubble.nodes(classes(data))
        .filter(d => !d.children))
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('title')
        .text(d => d.className + ': ' + format(d.value));

    node.append('circle')
        .attr('r', d => d.r)
        .style('fill', d => color(d.packageName));

    node.append('text')
        .attr('dy', '.3em')
        .style('text-anchor', 'middle')
        .text( d => d.className.substring(0, d.r / 3));


    function classes(data) {
        const classes = [];
        function recurse(name, node) {
            if (node.children) {
                node.children
                    .forEach( child => recurse(node.name, child) );
            } else {
                classes.push({packageName: name, className: node.name, value: node.size});
            }
        }
        recurse(null, data);
        return { children: classes };
    }

    d3.select(self.frameElement)
        .style('height', diameter + 'px');
}

function _getRandomRgbColorIndex() {
    return Math.floor(Math.random() * 255 + 1);
}

function _formatTicksList(list, property) {
    const normList = list || [];
    return normList.map(item => item[property]);
}