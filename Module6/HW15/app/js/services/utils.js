'use strict';

module.exports = {
    convertDataForSimpleChart,
    cleanRootChart
};

function convertDataForSimpleChart(data, nameField, valueField) {
    const normData = data || [];
    const dataLength = normData.length;
    const result = [];

    for(var i = 0; i < dataLength; i++) {
        result.push({
            value: parseInt(normData[i][valueField], 10) || 0,
            name: normData[i][nameField]
        });
    }

    return result;
}

function cleanRootChart(rootClass) {
    const root = document.querySelector(rootClass);
    root ? root.innerHTML = '' : '';
}