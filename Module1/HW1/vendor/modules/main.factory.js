'use strict';

var moduleFactory = require('./module.factory.js');
var createDispatcher = require('./dispatcher.factory.js');
var createStore = require('./store.factory.js');
var createView = require('./view.factory.js');
var router = require('./router.js');
var typeChecker = require('../utils/typeChecker.js');
var xhr = require('../utils/xhr.js');


function factory() {

    return {
        Module: moduleFactory,
        Dispatcher: createDispatcher,
        Store: createStore,
        View: createView,
        router: router,

        isObject: typeChecker.isObject,
        isArray: typeChecker.isArray,
        isFunction: typeChecker.isFunction,

        xhr: xhr
    };
}

module.exports = factory;

