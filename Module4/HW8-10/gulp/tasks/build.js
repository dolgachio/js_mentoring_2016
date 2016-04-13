'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', function () {
    runSequence(['html', 'fonts', 'vendors', 'img', 'styles', 'server']);
});
