var proxyquire = require('proxyquireify');

module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],

        files: [
            './vendor/**/*.spec.js',
            './vendor/**/*.js'
        ],

        browserify: {
            debug: true,
            extensions: ['.js'],
            configure: function(bundle) {
                bundle
                    .transform(['babelify', {
                        presets: 'es2015'
                    }])
                    .plugin(proxyquire.plugin)
                    .require(require.resolve('./vendor/tests'), { entry: true });

            }

        },

        preprocessors: {
            './vendor/**/*.spec.js': ['browserify'],
            './vendor/**/*.js': ['browserify']
        },

        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserNoActivityTimeout: 10000,

        browsers: ['PhantomJS'],

        singleRun: false
    });
};