'use strict';

var gulp = require('gulp');
var gls = require('gulp-live-server');
var watch = require('gulp-watch');
var config = require('../../config.js');

var serverSrc = config.getServerSrc();
var buildPath = config.getBuildPath();

gulp.task('server', function () {
    var liveReload = gls.new(serverSrc);
    liveReload.start();
    watch([
        buildPath + '**/*.*'
    ], function (e) {liveReload.notify.call(liveReload, e)});
    liveReload.start.bind(liveReload)
});
