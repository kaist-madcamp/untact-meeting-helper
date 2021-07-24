const proxy = require('http-proxy-middleware');

module.exports = function(app) {

    app.use(
        '/',
        proxy({
            target: 'http://192.249.18.120:80',
            changeOrigin: true,
        })
    );
};