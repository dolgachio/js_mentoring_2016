'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var config = require('../../config.js');
var reload = require('browser-sync').reload;
var clean = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserify = require('browserify');
var stream = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var src = config.getSrc();
var dest = config.getDest();

gulp.task('js', function () {
   runSequence('clean:js', ['js:app', 'js:vendor', 'lint']);
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
    return _deployJS(src.vendorJsMain, 'seal.js', dest.vendor);
});

gulp.task('lint', function () {
    lintFiles([src.js, src.vendorJs]);
});

function lintFiles(paths) {
    paths.forEach((path) => {
        gulp.src(path)
            .pipe(jshint('./.jshintrc'))
            .pipe(jshint.reporter(stylish));
    })
}

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
        .pipe(reload({stream: true}));
}
