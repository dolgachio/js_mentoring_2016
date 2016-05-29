'use strict';

const gulp = require('gulp');
const copyFiles = require('../utils/copy');
const config = require('../../config.js');

const src = config.getSrc();
const dest = config.getDest();

gulp.task('img', function() {
    copyFiles(src.img, dest.img);
});