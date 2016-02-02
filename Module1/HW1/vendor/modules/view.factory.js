'use strict';

function View(subscribeToStore, factoryFunction) {
    if(_validateStore(subscribeToStore) && typeof factoryFunction === 'function') {
        let view = factoryFunction(subscribeToStore);

        if(_validateView(view)) {
            return view;
        }

    }

    throw new Error('cannot create view');
}

function _validateStore(subscribeToStore) {
    var subscribeToStore = typeof subscribeToStore;

    return subscribeToStore === 'function';
}

function _validateView(view) {
    var viewType = typeof view;

    return viewType === 'object' && view.hasOwnProperty
        && view.hasOwnProperty('render');
}

module.exports = View;