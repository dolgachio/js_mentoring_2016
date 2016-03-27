'use strict';

const fs = require('fs');
const url = require('url');
const path = require('path');
const multiparty = require('multiparty');
const mime = require('mime');
const util = require('util');

const config = require('../config');
const User = require('../models/user.js');

module.exports = {
    writeFileSafe
};

function parseFilePath(filePath, res) {
    try {
        filePath = decodeURIComponent(filePath);
    } catch(e) {
        if(res) {
            console.log('Cannot save file');
            res.redirect('/profile');
        }
        return;
    }

    return path.normalize(path.join(config.ROOT, filePath));
}

function writeFileSafe(req, res) {
    _writeFile(req, res);
}

function _writeFile(req, res) {

    const form = new multiparty.Form();
    const uniqueFileName = _generateUniqueFileName();
    let hasError = false;
    let fileName;

    form.on('part', part => {
        part.on('error', () => {});

        fileName = 'img/upload/' + uniqueFileName + part.filename.match(/\.(.*)/g)[0];
        let filePath = parseFilePath(fileName, res);

        fs.stat(filePath, function(err, stats) {
            if(stats && stats.isFile()) {
                res.redirect('/profile');
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
        const user = req.user;

        User.findOne({_id: user._id})
            .then(user => {
                user.local.imageUrl = fileName;
                user.save();
            })
            .then(() => {
                res.redirect('/profile');
            });
    });

    form.parse(req);
}

function _S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// Generate a pseudo-GUID by concatenating random hexadecimal.
function _generateUniqueFileName() {
    return (_S4()+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+_S4()+_S4());
}




