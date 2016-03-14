'use strict';
var path = require('path');

module.exports = {
    getSrc: getSrc,
    getDest: getDest,

    getBuildPath: getBuildPath,
    getServerSrc: getServerSrc,
    getServerFiles: getServerFiles
};

var appPath = 'app';
var buildPath = 'dist';
var serverSrc = 'server/server.js';
var serverFiles = 'server/**/**.js';

var src = {
    html: path.join(appPath,'/*.html'),
    pages: path.join(appPath, 'pages', '/*.html'),
    sass: appPath + '/sass/**/*.scss',
    img: path.join(appPath, 'img', '**', '/*.*')
};

var dest = {
    html: path.join(buildPath, 'public'),
    pages: path.join(buildPath, 'public', 'static'),
    styles: path.join(buildPath, 'public', 'css'),
    img: path.join(buildPath, 'public', 'img')
};

function getSrc() {
    return src;
}

function getDest() {
    return dest;
}

function getBuildPath() {
    return buildPath;
}

function getServerSrc() {
    return serverSrc;
}

function getServerFiles() {
    return serverFiles;
}
