'use strict';

class ModuleFactory {
    constructor(name) {
        if(!name || typeof name !== 'string') {
            throw new Error('Cannot create module without a name');
        } else {
            this.name = name;
            this._dispatcher =  null
        }
    }

    setDispatcher(dispatcher) {
        if(typeof dispatcher === 'object' && dispatcher.hasOwnProperty) {
            return this._dispatcher = dispatcher;
        } else {
            throw new Error('Cannot set dispatcher');
        }
    }
}


module.exports = ModuleFactory;