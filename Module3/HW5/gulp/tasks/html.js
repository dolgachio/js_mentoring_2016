'use strict';

var gulp = require('gulp');
var config = require('../../config.js');
var plumber = require('gulp-plumber');

var src = config.getSrc();
var dest = config.getDest();

gulp.task('html', function() {
    gulp.src(src.html)
        .pipe(plumber())
        .pipe(gulp.dest(dest.html));

    gulp.src(src.pages)
        .pipe(plumber())
        .pipe(gulp.dest(dest.pages));
});
