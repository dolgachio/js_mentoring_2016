'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const reload = require('browser-sync').reload;
const config = require('../../config.js');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const scss = require('postcss-scss');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const runSequence = require('run-sequence');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const src = config.getSrc();
const dest = config.getDest();


gulp.task('styles', () => {
    const processors = [
        cssnano(),
        reporter(),
        autoprefixer({
            browsers: ['last 3 versions', 'IE 8'],
            cascade: false
        })
    ];

    return gulp.src(src.styles)
        .pipe(plumber())
        .pipe(postcss(processors, {syntax: scss}))
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(dest.styles))
        .pipe(reload({stream: true}));
});
