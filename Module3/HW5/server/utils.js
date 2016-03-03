'use strict';
const url = require('url');
const config = require('./config');

module.exports = {
    isObject: function (value) {
        return value !== null &&
            typeof value === 'object' &&
            value.hasOwnProperty;
    },

    isFunction: function (value) {
        return value && typeof value === 'function';
    },

    isArray: function (value) {
        return value && Array.isArray(value);
    },

    isString: function (value) {
        return value && typeof value === 'string';
    },

    checkAccess: function (req) {
        let parsedUrl = url.parse(req.url, true);

        return parsedUrl.query.password === config.SECRET_KEY;
    }
};

