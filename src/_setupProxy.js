const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
	target: 'http://react.cond-switch/',
	changeOrigin: true,
};
module.exports = function (app) {
	app.use('/', createProxyMiddleware(proxy));
};
