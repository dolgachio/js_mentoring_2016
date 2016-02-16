'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var karma = require('karma').Server;

gulp.task('test:run', function(done) {
    karma.start({
        configFile: __dirname + '/../../karma.conf.js'
    }, function() {
        done();
    });
});