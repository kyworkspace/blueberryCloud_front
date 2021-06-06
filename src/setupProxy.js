const { createProxyMiddleware } = require('http-proxy-middleware');

if (process.env.NODE_ENV === 'production') {
    module.exports = function (app) {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://blueberry.hopto.org:5000',
                changeOrigin: true,
            })
        );
    };
} else {
    module.exports = function (app) {
        app.use(
            '/api',
            createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
            })
        );
    };
}

