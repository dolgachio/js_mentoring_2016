module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['browserify', 'mocha'],

        files: [
            '/**/*.spec.js'
        ],
        browserify: {
            debug: true
        },
        exclude: [
            '**/*.swp'
        ],
        preprocessors: {
            '/**/*.spec.js': ['browserify']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserNoActivityTimeout: 10000,

        browsers: ['Chrome'],

        singleRun: false
    });
};