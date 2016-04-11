'use strict';

module.exports = {
    getSrc,
    getDest,
    getBuildPath
};

const path = require('path');

const appPath = 'app';
const buildPath = 'dist';

const src = {
    html: path.join(appPath,'/*.html'),
    scssPath:  path.join(appPath + '/scss'),
    styles: path.join(appPath + '/scss/**/*.scss'),
    img: path.join(appPath, 'img', '/*.*'),
    sprite: path.join(appPath, 'img', 'sprite', '/*.*'),
    fonts: path.join(appPath, 'fonts', '/*.*')
};

const dest = {
    html: path.join(buildPath),
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
