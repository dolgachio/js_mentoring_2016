const gulp = require('gulp');
const config = require('../../config.js');

const src = config.getSrc();

gulp.task('watch', function(){
    gulp.watch(src.html, ['html']);
    gulp.watch(src.styles, ['styles']);
});