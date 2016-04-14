'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build', function () {
    runSequence(['img', 'html', 'fonts', 'vendors', 'styles', 'server']);
});
