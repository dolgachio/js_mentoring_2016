var gulp = require('gulp');
var config = require('../../config.js');
var watch  = require('gulp-watch');

var src = config.getSrc();

gulp.task('watch', function(){
    watch([src.html], function (event, cb) {
        gulp.start('html');
    });

    watch([src.templates], function (event, cb) {
        gulp.start('templates');
    });

    watch([src.sass], function (event, cb) {
        gulp.start('styles');
    });

    watch([src.js], function (event, cb) {
        gulp.start('js');
        gulp.start('lint');
    });

    watch([src.vendorJs], function (event, cb) {
        gulp.start('js:vendor');
        gulp.start('lint');
    });

    watch([src.data], function (event, cb) {
        gulp.start('data');
    });
});