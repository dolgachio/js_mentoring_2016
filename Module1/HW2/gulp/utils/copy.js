'use strict';

var gulp = require('gulp');
var reload = require('browser-sync').reload;

module.exports = function copyFiles(from, to) {
    gulp.src(from)
        .pipe(gulp.dest(to))
        .pipe(reload({stream: true}));
};
