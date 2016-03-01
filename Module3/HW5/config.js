'use strict';

module.exports = {
    getSrc: getSrc,
    getDest: getDest,

    getBuildPath: getBuildPath,
    getServerSrc: getServerSrc
};

var examplePath = 'app';
var buildPath = 'dist';
var serverSrc = 'server/server.js';

var src = {
    html: examplePath + '/*.html',
    sass: examplePath + '/sass/**/*.scss'
};

var dest = {
    html: buildPath,
    styles: buildPath + '/css'
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
