'use strict';

var typeChecker = require('../utils/typeChecker.js');

module.exports = View;

function View(factoryFunction) {
    if(typeChecker.isFunction(factoryFunction)) {
        let view = factoryFunction();

        if(typeChecker.isObject(view) && _hasCorrectMethods(view)) {
            return view;
        } else {
            throw new Error('[view factory] cannot create view, ' +
                'incorrect output of factory function')
        }

    } else {
        throw new Error('[view factory] cannot create view, incorrect arguments');
    }
}


function _hasCorrectMethods(view) {
    var methodsMap = [
        'init',
        'setState',
        'updateView',
        'afterRender',
        'render',
        'updateState'
    ];

    return methodsMap.every((method) => view.hasOwnProperty(method));
}

