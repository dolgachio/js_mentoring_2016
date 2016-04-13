'use strict';

const gulp = require('gulp');
const config = require('../../config.js');
const browserSync = require('browser-sync');

const buildPath = config.getBuildPath();

gulp.task('server', function() {
    browserSync({
        port: 8080,
        server: {
            baseDir: buildPath,
            index: 'index.html'
        }
    });
});