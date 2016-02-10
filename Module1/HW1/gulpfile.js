'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watch  = require('gulp-watch');
var clean = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('babelify');
var browserify = require('browserify');
var stream = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');


var examplePath = 'example';
var vendorPath = 'vendor';
var buildPath = 'dist';

var src = {
        html: examplePath + '/*.html',
        templates: examplePath + '/templates/*.html',
        js: examplePath + '/js/**/*.*',
        jsMain: examplePath + '/js/app.js',
        sass: examplePath + '/sass/**/*.scss',
        img: examplePath + '/img/**/*.*',
        data: examplePath + '/data/**/*.*',

        vendorJsMain: vendorPath + '/root.js',
        vendorJs: vendorPath + '/**/*.*'
    };

var dest = {
        html: buildPath,
        templates: buildPath + '/templates',
        js: buildPath + '/js',
        styles: buildPath + '/css',
        img: buildPath + '/img',
        data: buildPath + '/data',

        vendor: buildPath + '/vendor'
};

gulp.task('server', function() {
    browserSync({
        port: 8080,
        server: {
            baseDir: buildPath,
            index: 'index.html'
        }
    });
});

gulp.task('html', function() {
    gulp.src(src.html)
        .pipe(plumber())
        .pipe(gulp.dest(dest.html))
        .pipe(reload({stream: true}));
});

gulp.task('templates', function () {
    gulp.src(src.templates)
        .pipe(plumber())
        .pipe(gulp.dest(dest.templates))
        .pipe(reload({stream: true}));
});


gulp.task('clean:js', function() {
    return gulp.src(dest.js + '/**/*.js', {
        read: false
        })
        .pipe( clean({
            force: true
        }));
});

gulp.task('js', function () {
    return deployJS(src.jsMain, 'script.js', dest.js)
});

gulp.task('js:vendor', function () {
    return deployJS(src.vendorJsMain, 'seal.js', dest.vendor);
});

function deployJS(fromFile, toFile, toPath) {
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

gulp.task('lint', function () {
   gulp.src(src.js)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('sass', ['clean:css'], function () {
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

gulp.task('img', function() {
   copyFiles(src.img, dest.img);
});

gulp.task('data', function () {
   copyFiles(src.data, dest.data);
});

function copyFiles(from, to) {
    gulp.src(from)
        .pipe(gulp.dest(to))
        .pipe(reload({stream: true}));
}

gulp.task('img', function() {
    gulp.src(src.img)
        .pipe(gulp.dest(dest.img))
        .pipe(reload({stream: true}));
});



gulp.task('watch', function(){
    watch([src.html], function (event, cb) {
        gulp.start('html');
    });

    watch([src.templates], function (event, cb) {
        gulp.start('templates');
    });

    watch([src.sass], function (event, cb) {
        gulp.start('sass');
    });

    watch([src.js], function (event, cb) {
        gulp.start('js');
    });

    watch([src.vendorJs], function (event, cb) {
        gulp.start('js:vendor');
    });

    watch([src.data], function (event, cb) {
        gulp.start('data');
    });
});

gulp.task('build', ['js:vendor', 'html', 'templates', 'sass', 'img', 'data', 'js', 'server', 'lint']);

gulp.task('develop',['build', 'watch']);
