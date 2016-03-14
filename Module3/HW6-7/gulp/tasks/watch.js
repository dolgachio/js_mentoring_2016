var gulp = require('gulp');
var config = require('../../config.js');
var watch  = require('gulp-watch');

var src = config.getSrc();

gulp.task('watch', function(){
    watch([src.html], function (event, cb) {
        gulp.start('html');
    });

    watch([src.sass], function (event, cb) {
        gulp.start('styles');
    });
});