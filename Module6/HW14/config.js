'use strict';
const path = require('path');

module.exports = {
    getSrc,
    getDest,
    getBuildPath,
    getVendors
};

const appPath = 'app';
const vendorsPath = path.join(appPath, 'vendors');
const buildPath = 'dist';

const src = {
    html: path.join(appPath,'/*.html'),
    js: path.join(appPath, 'js', '**/*.js'),
    jsMain: path.join(appPath + '/js/app.js'),
    styles: path.join(appPath + '/scss/**/*.scss'),
    img: path.join(appPath, 'img', '**', '/*.*'),
    fonts: path.join(appPath, 'fonts', '/*.*'),
    data: path.join(appPath, 'data', '**', '/*.*')
};

const vendors = {
    scripts: [
        path.join(vendorsPath, 'vue/dist/vue.js'),
        path.join(vendorsPath, 'vue-resource/dist/vue-resource.js'),
        path.join(vendorsPath, 'd3/d3.js')
    ],

    scriptsMin: [
        path.join(vendorsPath, 'vue/dist/vue.min.js'),
        path.join(vendorsPath, 'vue-resource/dist/vue-resource.min.js'),
        path.join(vendorsPath, 'd3/d3.min.js')
    ]
};

const dest = {
    html: path.join(buildPath),
    js: path.join(buildPath, 'js'),
    styles: path.join(buildPath, 'css'),
    img: path.join(buildPath, 'img'),
    fonts: path.join(buildPath, 'fonts'),
    data: path.join(buildPath, 'data')
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

function getVendors() {
    return vendors;
}
