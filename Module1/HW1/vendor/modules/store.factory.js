'use strict';

var typeChecker = require('../utils/typeChecker.js');

module.exports = Store;

function Store(factoryFunction) {
    if(typeChecker.isFunction(factoryFunction)) {
        let store = factoryFunction();

        if(typeChecker.isObject(store) && _hasCorrectAPI(store)) {
            return store;
        } else {
            throw new Error('[storeFactory] cannot create store, ' +
                'factory function returns incorrect value')
        }

    } else {
        throw new Error('[storeFactory] cannot create store, ' +
            'factory function should return object');
    }
}

function _hasCorrectAPI(store) {
    var methodsMap = [
        'emitChange',
        'addChangeListener',
        'removeChangeListener'
    ];

    return methodsMap.every((method) => store.hasOwnProperty(method));
}

