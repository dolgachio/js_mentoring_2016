var gulp = require('gulp');
var KarmaServer = require('karma').Server;

gulp.task('test', function(done) {
    return new KarmaServer({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, done);
});
