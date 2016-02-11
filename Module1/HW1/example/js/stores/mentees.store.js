'use strict';

var dispatcher = require('../dispatcher/app.dispatcher.js');
var CONSTANTS = require('../CONSTANTS/app.constants.js');

var storeInstance = seal.Store(menteesStore);
storeInstance.init();

dispatcher.register(onAction);

module.exports  = storeInstance;

function menteesStore() {
    let _mentees = [];
    let _callbackStore = [];
    let _store = {
        init: init,
        add: add,
        getMentees: getMentees,
        emitChange: emitChange,
        addChangeListener: addChangeListener,
        removeChangeListener: removeChangeListener
    };

    return _store;

    function init() {
        seal.xhr.get('/data/mentees.json', function (resp) {
            let normalizedResp = JSON.parse(resp);

            if(seal.isArray(normalizedResp)) {
                _mentees = normalizedResp;
                _store.emitChange();
            }
        });
    }

    function getMentees() {
        return _mentees || [];
    }

    function add(mentee) {
        if(seal.isObject(mentee)) {
            _mentees.push(mentee);
        }
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
            console.log('[store instance] cannot add listener');
        }
    }

    function removeChangeListener(callback) {
        if(seal.isFunction(callback)) {
            _callbackStore.forEach(function (cb, index) {
                if(cb === callback) {
                    _callbackStore.splice(index, 1);
                }
            });
        }
    }
}

function onAction(payload) {
    var action = payload.action;

    switch(action) {
        case CONSTANTS.ADD_MENTEE:
            storeInstance.add(payload.payload);
            break;
        default:
            return true;
    }

    storeInstance.emitChange();
}
