'use strict';

var gulp = require('gulp');
var config = require('../../config.js');
var browserSync = require('browser-sync');

var buildPath = config.getBuildPath();

gulp.task('server', function() {
    browserSync({
        port: 8080,
        server: {
            baseDir: buildPath,
            index: 'index.html'
        }
    });
});