'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const config = require('../../config.js');
const clean = require('gulp-rimraf');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');

const postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');



const src = config.getSrc();
const dest = config.getDest();

gulp.task('styles', function () {
    runSequence('clean:css', ['build:styles']);
});

gulp.task('build:styles', () => {
    const processors = [
        autoprefixer({
            browsers: ['last 3 versions', 'IE 8'],
            cascade: false
        }),
        cssnano
    ];


    return gulp.src(src.styles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.styles));
});

/*gulp.task('build:styles', function () {
    return gulp.src(src.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest.styles));
});*/

gulp.task('clean:css', function () {
    return gulp.src(dest.styles + '/*.css', {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});