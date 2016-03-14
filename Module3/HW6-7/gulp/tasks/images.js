'use strict';

var gulp = require('gulp');
var copyFiles = require('../utils/copy');
var config = require('../../config.js');

var src = config.getSrc();
var dest = config.getDest();

gulp.task('img', function() {
    copyFiles(src.img, dest.img);
});