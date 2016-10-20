module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            './bld/lib.js',
            //'node_modules/angular-mocks/angular-mocks.js', already included in lib.js
            './bld/template.js',
            './bld/app.js',
            './tst/**/*.js'
        ],
        logLevel: config.LOG_DISABLE,
        singleRun: true,
        autoWatch: false
    });
}