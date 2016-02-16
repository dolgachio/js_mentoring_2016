'use strict';

var typeChecker = require('./typeChecker.js');

module.exports = createFactory;

function createFactory(name, methodsMap) {
    if(typeChecker.isArray(methodsMap) && _allKeysAreString(methodsMap)) {
        return function(factoryFunction) {
            if(typeChecker.isFunction(factoryFunction)) {
                let instance = factoryFunction();

                if(typeChecker.isObject(instance) && _hasCorrectMethods(instance, methodsMap)) {
                    return instance;
                } else {
                    throw new Error('[' + name + ' factory] cannot create instance, ' +
                        'incorrect output of factory function');
                }

            } else {
                throw new Error('[' + name + ' factory] cannot create view, incorrect arguments');
            }
        };
    } else {
        throw new Error('[seal base factory constructor] cannot create factory');
    }
}

function _hasCorrectMethods(view, methodsMap) {
    return methodsMap.every((method) => view.hasOwnProperty(method));
}

function _allKeysAreString(methodsMap) {
    return methodsMap.every((method) => typeChecker.isString(method));
}