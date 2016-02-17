'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

//gulp.task('build', ['html', 'templates', 'styles', 'img', 'data', 'js', 'server']);
gulp.task('build', function () {
    runSequence(['html', 'templates', 'styles', 'img', 'data', 'js', 'server']);
});
