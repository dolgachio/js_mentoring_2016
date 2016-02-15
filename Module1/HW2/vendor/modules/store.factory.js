'use strict';

var baseFactory = require('../utils/base.factory.js');

var methodsMap = [
    'emitChange',
    'addChangeListener',
    'removeChangeListener'
];

module.exports = baseFactory('store', methodsMap);
