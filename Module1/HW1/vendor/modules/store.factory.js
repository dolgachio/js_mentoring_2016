'use strict';

function storeFactory(factoryFunction) {
    var store;

    if(typeof factoryFunction !== 'function') {
        throw new Error('To create store you need to send factory function');
    }

    store = factoryFunction();

    if(typeof store !== 'object') {
        throw new Error('Factory function should return object');
    }

    if(typeof store.update === 'function'
        && typeof store.get === 'function' ) {
        return store;
    } else {
        throw new Error('Store should have "get" and "update" methods');
    }
}

module.exports = storeFactory;

