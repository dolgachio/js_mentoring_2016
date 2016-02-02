'use strict';

var moduleFactory = require('./module.factory.js');
var createDispatcher = require('./dispatcher.factory.js');
var createStore = require('./store.factory.js');
var createView = require('./view.factory.js');


function factory() {

    return {
        module: moduleFactory,
        dispatcher: createDispatcher,
        store: createStore,
        view: createView
    };
}

module.exports = factory;

