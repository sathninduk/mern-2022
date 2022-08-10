const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://159.89.171.251:4000',
            //target: 'http://localhost:4000',
            changeOrigin: true,
        })
    );
};