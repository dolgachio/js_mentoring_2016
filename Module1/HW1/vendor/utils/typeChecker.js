'use strict';

module.exports = {
    isObject: function (value) {
        return value !== null
            && typeof value === 'object'
            && value.hasOwnProperty;
    },

    isFunction: function (value) {
        return value && typeof value === 'function';
    },

    isArray: function (value) {
        return value && Array.isArray(value);
    },

    isString: function (value) {
        return value && typeof value === 'string';
    }
};