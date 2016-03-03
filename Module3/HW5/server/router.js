'use strict';

const url = require('url');

const utils = require('./utils.js');
const CONST = require('./CONST');
const fileOperator = require('./file-operator');

class Router {
    constructor() {
        this._getListeners = {};
        this._postListeners = {};
    }

    get(url, callback) {
        try {
            _checkArguments(url, callback);
        } catch(errorMsg) {
            throw new Error('[Error Router get]: ' + errorMsg);
        }

        this._getListeners[url] = callback;
    }

    post(url, callback) {
        try {
            _checkArguments(url, callback);
        } catch(errorMsg) {
            throw new Error('[Error Router post]: ' + errorMsg);
        }

        this._postListeners[url] = callback;
    }
}

function rootListeningFunction(req, res) {
    let urlPath = url.parse(req.url, true).pathname;

    const getListeners = this._getListeners;
    const postListeners = this._postListeners;

    switch(req.method) {
        case 'GET':
            if(getListeners.hasOwnProperty(urlPath)) {
                getListeners[urlPath](req, res);
            } else {
                fileOperator.sendFileSafe(urlPath, res);
            }
            break;
        case 'POST':
            if(postListeners.hasOwnProperty(urlPath)) {
                postListeners[urlPath](req, res);
            } else {
                res.end('Ooops, cannot post such things');
            }
            break;
        default:
            res.end('Ooops, cannot handle this!');
    }
}


function _checkArguments(url, callback) {
    if(!utils.isFunction(callback)) {
        throw 'Callback should be a function';
    }

    if(!utils.isString(url)) {
        throw 'url should be a string';
    }
}

module.exports = {
    Router: Router,
    rootListeningFunction: rootListeningFunction
};
