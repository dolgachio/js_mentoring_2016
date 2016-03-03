'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const multiparty = require('multiparty');
const mime = require('mime');
const util = require('util');

const config = require('./config');
const CONST = require('./CONST');
const PATHS = CONST.PAGE_PATHS;

module.exports = {
    writeFileSafe: writeFileSafe,
    sendFileSafe: sendFileSafe
};

function parseFilePath(filePath, res) {

    try {
        filePath = decodeURIComponent(filePath);
    } catch(e) {
        res.statusCode = 400;
        sendFileSafe(PATHS.BAD_REQUEST, res);
        return;
    }

    return path.normalize(path.join(config.ROOT, filePath));
}

function sendFileSafe(filePath, res) {

    let parsedFilePath = parseFilePath(filePath, res);

    if (!parsedFilePath) {
        res.statusCode = 404;
        _sendFile(PATHS.NOT_FOUND, res);
        return;
    }

    if (parsedFilePath.indexOf(config.ROOT) !== 0) {
        res.statusCode = 404;
        _sendFile(PATHS.NOT_FOUND, res);
        return;
    }

    fs.stat(parsedFilePath, function(err, stats) {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            _sendFile(PATHS.NOT_FOUND, res);
            return;
        }

        _sendFile(parsedFilePath, res);
    });

}

function _sendFile(filePath, res) {

    fs.readFile(filePath, function(err, content) {
        if (err) throw err;

        var mime = require('mime').lookup(filePath);
        res.setHeader('Content-Type', mime + '; charset=utf-8');
        res.end(content);
    });

}

function writeFileSafe(filePath, req, res) {
    _writeFile(filePath, req, res);
}

function _writeFile(req, res) {

    var form = new multiparty.Form();
    var hasError = false;

    form.on('part', part => {
        part.on('error', () => {});

        let filePath = parseFilePath('img/' + part.filename, res);

        fs.stat(filePath, function(err, stats) {
            if(stats && stats.isFile()) {
                sendFileSafe(PATHS.IMG_ALREADY_EXISTS, res);
                return;
            }

            var out = fs.createWriteStream(filePath, {flag: 'wq'});
            part.pipe(out);
        });
    });

    form.on('error', () => {
        hasError = true;
        fs.unlink(filePath);
    });

    form.on('close', () => {
       sendFileSafe(PATHS.ADD_FILE_SUCCESS, res);
    });

    form.parse(req);
}
