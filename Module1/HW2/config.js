'use strict';

module.exports = {
    getSrc: getSrc,
    getDest: getDest,

    getBuildPath: getBuildPath
};

var examplePath = 'example';
var vendorPath = 'vendor';
var buildPath = 'dist';

var src = {
    html: examplePath + '/*.html',
    templates: examplePath + '/templates/*.html',
    js: examplePath + '/js/**/*.js',
    jsMain: examplePath + '/js/app.js',
    sass: examplePath + '/sass/**/*.scss',
    img: examplePath + '/img/**/*.*',
    data: examplePath + '/data/**/*.*',

    vendorJsMain: vendorPath + '/root.js',
    vendorJs: vendorPath + '/**/*.js'
};

var dest = {
    html: buildPath,
    templates: buildPath + '/templates',
    js: buildPath + '/js',
    styles: buildPath + '/css',
    img: buildPath + '/img',
    data: buildPath + '/data',

    vendor: buildPath + '/vendor'
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
