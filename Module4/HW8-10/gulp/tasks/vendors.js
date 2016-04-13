'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const config = require('../../config.js');
const concat = require('gulp-concat');

const vendors = config.getVendors();
const dest = config.getDest();

gulp.task('vendors', () => {
    gulp.src(vendors.scripts)
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(dest.js))
});

