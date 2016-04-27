'use strict';

var gulp = require('gulp');
var copyFiles = require('../utils/copy');
var config = require('../../config.js');

var src = config.getSrc();
var dest = config.getDest();

gulp.task('fonts', function() {
    copyFiles(src.fonts, dest.fonts);
});