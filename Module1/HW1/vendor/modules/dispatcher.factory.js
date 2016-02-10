'use strict';
var typeChecker = require('../utils/typeChecker.js');

module.exports = function () {
    return new Dispatcher();
};

class Dispatcher {
    constructor() {
        this._storesCallbacks = [];
    }

    register(storeCallback) {
        if (typeChecker.isFunction(storeCallback)) {
            this._storesCallbacks.push(storeCallback);
        } else {
            throw new Error('[dispatcher:register] ' +
                'You should provide a store that has an `update` method.');
        }
    }

    dispatch(payload) {
        this._storesCallbacks.forEach(function (callback) {
            callback(payload);
        })
    }

    handleAction(actionType) {
        if(typeChecker.isString(actionType)) {
            let _this = this;

            return function (payload) {
                return _this.dispatch({
                    action: actionType,
                    payload: payload
                })
            };

        } else {
            throw new Error('[dispatcher:register] cannot create handler for action');
        }
    }
}



