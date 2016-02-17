'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var config = require('../../config.js');
var reload = require('browser-sync').reload;
var clean = require('gulp-rimraf');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');

var src = config.getSrc();
var dest = config.getDest();

gulp.task('styles', function () {
    runSequence('clean:css', ['build:styles']);
});

gulp.task('build:styles', function () {
    return gulp.src(src.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.styles))
        .pipe(reload({stream: true}));
});

gulp.task('clean:css', function () {
    return gulp.src(dest.styles + '/*.css', {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});