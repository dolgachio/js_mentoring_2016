'use strict';

const gulp = require('gulp');
const reload = require('browser-sync').reload;
const plumber = require('gulp-plumber');

const config = require('../../config.js');
const src = config.getSrc();
const dest = config.getDest();

gulp.task('html', () => {
    gulp.src(src.html)
        .pipe(plumber())
        .pipe(gulp.dest(dest.html))
        .pipe(reload({stream: true}));
});