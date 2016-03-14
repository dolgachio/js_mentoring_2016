'use strict';

var gulp = require('gulp');
var gls = require('gulp-live-server');
var watch = require('gulp-watch');
var config = require('../../config.js');

var serverSrc = config.getServerSrc();
var serverFiles = config.getServerFiles();

gulp.task('server', function () {
    var liveReload = gls.new(serverSrc);
    liveReload.start();

    gulp.watch(serverFiles,
        function (file) {
            var filePath = file.path || '';
            var pathDetailed = filePath.split('\\server\\');
            var normalizedPath = pathDetailed[1];

            console.log('[' + normalizedPath + ']: changes occured. Reloading...');
            liveReload.stop();
            liveReload.start();
        });
});
