module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],

        files: [
            './vendor/**/*.spec.js',
            './vendor/**/*.js'
        ],

        browserify: {
            transform: [ 'babelify' ]
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

        browsers: ['Chrome'],

        singleRun: false
    });
};