'use strict';

module.exports = {
    convertDataForSimpleChart
};

function convertDataForSimpleChart(data, nameField, valueField) {
    const normData = data || [];
    const dataLength = normData.length;
    const result = [];

    for(var i = 0; i < dataLength; i++) {
        result.push({
            value: +normData[i][valueField] || 0,
            name: normData[i][nameField]
        });
    }

    return result;
}