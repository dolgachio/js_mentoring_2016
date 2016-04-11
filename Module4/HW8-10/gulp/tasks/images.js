'use strict';

const gulp = require('gulp');
const config = require('../../config.js');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

const src = config.getSrc();
const dest = config.getDest();

gulp.task('img', function() {
    gulp.src(src.img)
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(dest.img));
});
