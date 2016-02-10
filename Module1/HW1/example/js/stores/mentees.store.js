'use strict';

var dispatcher = require('../dispatcher/app.dispatcher.js');
var CONSTANTS = require('../CONSTANTS/app.constants.js');

var storeInstance = seal.Store(menteesStore);
storeInstance.init();

dispatcher.register(function (payload) {
    var action = payload.action;

    switch(action) {
        case CONSTANTS.ADD_MENTEE:
            storeInstance.add(payload.payload);
            break;
        default:
            return true;
    }

    storeInstance.emitChange();
});

module.exports  = storeInstance;

function menteesStore() {
    var _mentees = [];
    var _callbackStore = [];

    return {
        init: init,
        add: add,
        getMentees: getMentees,
        emitChange: emitChange,
        addChangeListener: addChangeListener,
        removeChangeListener: removeChangeListener
    };

    function init() {
        var _this = this;

        seal.xhr.get('/data/mentees.json', function (resp) {
            let normalizedResp = JSON.parse(resp);

            if(seal.isArray(normalizedResp)) {
                _mentees = normalizedResp;
                _this.emitChange();
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
