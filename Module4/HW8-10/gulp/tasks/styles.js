'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const reload = require('browser-sync').reload;
const config = require('../../config.js');
const clean = require('gulp-rimraf');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const src = config.getSrc();
const dest = config.getDest();

gulp.task('styles', ['clean:css', 'sprite'], function () {
    runSequence('build:styles');
});

gulp.task('build:styles', () => {
    const processors = [
        autoprefixer({
            browsers: ['last 3 versions', 'IE 8'],
            cascade: false
        })
    ];

    return gulp.src(src.styles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
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