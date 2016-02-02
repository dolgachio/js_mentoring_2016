'use strict';

var dispatcher = require('../app.dispatcher.js');
var store = seal.store(clockStore);

module.exports = dispatcher.createSubscriber(store);

function clockStore() {
    var _time = new Date();

    function get() {
        return _time;
    }

    function update(action, change) {
        if(action.type === 'UPDATE_TIME') {
            _time = new Date();
            change();
        }
    }

    return {
        update: update,
        get: get
    }
}
