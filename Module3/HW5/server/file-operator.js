'use strict';

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
    sendFileSafe: sendFileSafe,

    sendLastUploaded: sendLastUploaded,
    sendImageList: sendImageList
};

function parseFilePath(filePath, res) {

    try {
        filePath = decodeURIComponent(filePath);
    } catch(e) {
        if(res) {
            res.statusCode = 400;
            sendFileSafe(PATHS.BAD_REQUEST, res);
        }
        return;
    }

    return path.normalize(path.join(config.ROOT, filePath));
}

function sendFileSafe(filePath, res) {

    let parsedFilePath = parseFilePath(filePath);

    if (!parsedFilePath) {
        res.statusCode = 404;

        _sendFile(parsedFilePath(PATHS.NOT_FOUND, res), res);
        return;
    }

    if (parsedFilePath.indexOf(config.ROOT) !== 0) {
        res.statusCode = 404;
        _sendFile(parsedFilePath(PATHS.NOT_FOUND, res), res);
        return;
    }

    fs.stat(parsedFilePath, function(err, stats) {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            _sendFile(parseFilePath(PATHS.NOT_FOUND, res), res);
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

function _pasteAndSendHtml(filePath, injection, res) {
    const parsedFilePath = parseFilePath(filePath, res);

    fs.readFile(parsedFilePath, 'utf-8', function (err, content) {
        let normalizedContent;

        if(err) {
            console.log('err');
            return;
        }

        normalizedContent = content.replace(PATHS.REPLACE_FLAG, injection);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(normalizedContent);
    });
}

function writeFileSafe(req, res) {
    _writeFile(req, res);
}

function _writeFile(req, res) {

    var form = new multiparty.Form();
    var hasError = false;

    form.on('part', part => {
        part.on('error', () => {});

        let filePath = parseFilePath('img/upload/' + part.filename, res);

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

function sendLastUploaded(res) {
    let uploadFolder = parseFilePath(PATHS.UPLOAD);

    fs.readdir(uploadFolder, function (err, filesPaths) {
        let lastUploadTime = 0;
        let files;
        let lastUploadFilePath;
        let lastUploadedImage;

        if (err) {
            console.log(err);
        }

        files = filesPaths
            .reduce(_createFilesReducer(uploadFolder), []);

        files.forEach((file) => {
            if(file.birthTime > lastUploadTime) {
                lastUploadFilePath = file.path;
                lastUploadTime = file.birthTime;
            }
        });

        lastUploadedImage = '<img src="' + lastUploadFilePath + '" width="500" alt="last uploded image" />'

        _pasteAndSendHtml(PATHS.MAIN, lastUploadedImage, res);
    });
}

function sendImageList(res) {
    let uploadFolder = parseFilePath(PATHS.UPLOAD);

    fs.readdir(uploadFolder, function (err, filesPaths) {
        let files;
        let imageList;
        let imageListNoramalized;

        if (err) {
            console.log(err);
        }

        files = filesPaths
            .reduce(_createFilesReducer(uploadFolder), []);

        imageList = files.map((file, index) => {
            return file.path !== PATHS.DEFAULT_IMG_PATH ?
                '<li><img src="' + file.path + '" width="500" alt="image#' + index + '"/></li>': '';
        });

        imageListNoramalized = '<ul class="image-list">' + imageList.join('') + '</ul>';

        _pasteAndSendHtml(PATHS.IMAGE_LIST, imageListNoramalized, res);
    });
}

function _createFilesReducer(uploadFolder) {
    return (files, filePath) => {
        let completePath = path.join(uploadFolder, filePath);
        let fileObj = fs.statSync(completePath);

        if(fileObj.isFile()) {
            files.push({
                path: path.join(PATHS.UPLOAD, filePath),
                birthTime: Date.parse(fileObj.birthtime)
            });
        }

        return files
    }
}




