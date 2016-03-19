'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const config = require('../../config.js');
const clean = require('gulp-rimraf');
const browserify = require('browserify');
const stream = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');

const src = config.getSrc();
const dest = config.getDest();
const vendors = config.getVendors();

gulp.task('js', function () {
   runSequence('clean:js', ['js:app', 'js:vendor', 'eslint']);
});

gulp.task('clean:js', function() {
    return gulp.src(dest.js + '/**/*.js', {
            read: false
        })
        .pipe( clean({
            force: true
        }));
});

gulp.task('js:app', function () {
    return _deployJS(src.jsMain, 'script.js', dest.js)
});

gulp.task('js:vendor', function () {
    return _deployVendors(vendors.scripts, 'vendor.js', dest.js);
});

function _deployJS(fromFile, toFile, toPath) {
    return browserify(fromFile, {debug:true})
        .transform('babelify', {presets: ["es2015"]})
        .bundle()
        .pipe(plumber())
        .pipe(stream(toFile))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(toPath))
}

function _deployVendors(fromFiles, toFile, toPath) {
    gulp.src(fromFiles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat(toFile))
        .pipe(sourcemaps.write('maps', {sourceRoot: '/app'}))
        .pipe(gulp.dest(toPath))
}

gulp.task('eslint', function () {
    return gulp.src([src.js])
        .pipe(eslint({
            useEslintrc: true
        }))
        .pipe(eslint.format());
});
