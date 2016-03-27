'use strict';
const path = require('path');

module.exports = {
    getSrc,
    getDest,

    getBuildPath,
    getServerSrc,
    getServerFiles,
    getVendors
};

const appPath = 'app';
const vendorsPath = path.join(appPath, 'vendors');
const buildPath = 'server/public';
const serverSrc = 'server/bin';
const serverFiles = 'server/**/**.js';

const src = {
    html: path.join(appPath,'/*.html'),
    js: path.join(appPath, 'js', '**/*.js'),
    jsMain: path.join(appPath + '/js/app.js'),
    sass: path.join(appPath + '/sass/**/*.scss'),
    img: path.join(appPath, 'img', '**', '/*.*'),
    fonts: path.join(appPath, 'fonts', '/*.*')
};

const vendors = {
    scripts: [
        path.join(vendorsPath, 'vue/dist/vue.js'),
        path.join(vendorsPath, 'vue-resource/dist/vue-resource.js'),
        path.join(vendorsPath, 'socket.io/')
    ],

    scriptsMin: [
        path.join(vendorsPath, 'vue/dist/vue.min.js'),
        path.join(vendorsPath, 'vue-resource/dist/vue-resource.min.js')
    ]
};

const dest = {
    html: path.join(buildPath),
    js: path.join(buildPath, 'js'),
    styles: path.join(buildPath, 'css'),
    img: path.join(buildPath, 'img'),
    fonts: path.join(buildPath, 'fonts')
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

function getVendors() {
    return vendors;
}
