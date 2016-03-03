'use strict';

var gulp = require('gulp');

module.exports = function copyFiles(from, to) {
    gulp.src(from)
        .pipe(gulp.dest(to));
};
