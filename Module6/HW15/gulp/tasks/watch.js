'use strict';

const gulp = require('gulp');
const config = require('../../config.js');
const watch  = require('gulp-watch');

const src = config.getSrc();

gulp.task('watch', ['server'], function(){
    gulp.watch(src.html, ['html']);
    gulp.watch(src.styles, ['styles']);
    gulp.watch(src.js, ['js']);
});