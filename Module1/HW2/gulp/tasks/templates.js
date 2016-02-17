'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var config = require('../../config.js');
var reload = require('browser-sync').reload;

var src = config.getSrc();
var dest = config.getDest();

gulp.task('templates', function () {
    gulp.src(src.templates)
        .pipe(plumber())
        .pipe(gulp.dest(dest.templates))
        .pipe(reload({stream: true}));
});