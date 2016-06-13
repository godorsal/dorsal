var gulp = require('gulp'),
    url = require('url'),
    browserSync = require('browser-sync'),
    modRewrite = require('connect-modrewrite');

var config = require('./config');

module.exports = function () {
    var baseUri = config.uri + config.apiPort;

    browserSync({
        open: true,
        port: config.port,
        server: {
            baseDir: config.app,
            middleware: [
                modRewrite([
                    '^/api/(.*)$ ' + (baseUri + '/api/') + '$1 [P]',
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });

    gulp.start('watch');
};
