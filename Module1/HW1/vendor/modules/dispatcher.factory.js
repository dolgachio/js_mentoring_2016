'use strict';

module.exports = dispatcherFactory;

function dispatcherFactory() {
    let dispatcher;

        dispatcher = _Dispatcher();

        function createAction(type) {
            if (!type) {
                throw new Error('Please, provide action\'s type.');
            } else {
                return function (payload) {
                    return dispatcher.dispatch({ type: type, payload: payload });
                }
            }
        }

        function createSubscriber(store) {
            return dispatcher.register(store);
        }

        return {
            createAction: createAction,
            createSubscriber: createSubscriber
        };
}

function _Dispatcher() {
    return {
        _stores: [],

        register: function (store) {
            if (!store || !store.update) {
                throw new Error('You should provide a store that has an `update` method.');
            } else {
                var consumers = [];
                var change = function () {
                    consumers.forEach(function (l) {
                        l(store);
                    });
                };
                var subscribe = function (consumer, noInit) {
                    consumers.push(consumer);
                    !noInit ? consumer(store) : null;
                };

                this._stores.push({store: store, change: change});
                return subscribe;
            }
        },

        dispatch: function (action) {
            if (this._stores.length > 0) {
                this._stores.forEach(function (entry) {
                    entry.store.update(action, entry.change);
                });
            }
        }
    }
}
