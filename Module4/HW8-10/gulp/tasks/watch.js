const gulp = require('gulp');
const config = require('../../config.js');

const src = config.getSrc();

gulp.task('watch', function(){
    gulp.watch(src.html, ['html']);
    /*watch([src.html], function (event, cb) {
        gulp.start('html');
    });

    watch([src.sass], function (event, cb) {
        gulp.start('styles');
    });

    watch([src.js], function () {
        gulp.start('js');
    })*/
});