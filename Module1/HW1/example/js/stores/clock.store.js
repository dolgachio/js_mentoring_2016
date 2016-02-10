'use strict';

var dispatcher = require('../dispatcher/app.dispatcher.js');
var CONSTANTS = require('../CONSTANTS/app.constants.js');

var storeInstance = seal.Store(clockStore);

dispatcher.register(function (payload) {
    var action = payload.action;

    switch(action) {
        case CONSTANTS.UPDATE_TIME:
            storeInstance.setValue(payload.payload);
            break;
        default:
            return true;
    }

    storeInstance.emitChange();
});

module.exports  = storeInstance;


function clockStore() {
    var _this = this;
    var _time = new Date();
    var _callbackStore = [];

    return {
        init: init,
        getValue: getValue,
        setValue: setValue,
        emitChange: emitChange,
        addChangeListener: addChangeListener,
        removeChangeListener: removeChangeListener
    };

    function init() {

    }

    function getValue() {
        return _time;
    }

    function setValue(newTime) {
        return _time = newTime;
    }

    function emitChange() {
        if (_callbackStore.length > 0) {
            _callbackStore.forEach(function (entry) {
                entry();
            });
        }
    }

    function addChangeListener(callback) {
        if(seal.isFunction(callback)) {
            _callbackStore.push(callback);
        } else {
            console.log('[store instance] cannot add listener')
        }
    }

    function removeChangeListener(callback) {
        if(seal.isFunction(callback)) {
            let deleteIndex;

            _callbackStore.forEach(function (cb, index) {
               if(cb === callback) {
                   deleteIndex = index;
               }
            });

            if(deleteIndex) {
                _callbackStore.splice(deleteIndex, 1)
            } else {
                console.log('[clock store] there is no such callback');
            }
        }
    }

}
