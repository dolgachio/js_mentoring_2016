'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function () {
    runSequence(['js', 'html', 'styles', 'data', 'img',  'fonts']);
});
