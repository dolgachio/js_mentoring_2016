'use strict';

var baseFactory = require('../utils/base.factory.js');

var methodsMap = [
    'init',
    'destroy',
    'updateState',
    'updateView',
    'render',
    'afterRender'
];

module.exports = baseFactory('view', methodsMap);

