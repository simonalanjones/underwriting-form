// const { createProxyMiddleware } = require('http-proxy-middleware');
// const proxy = {
// 	//target: 'http://react.cond-switch/',
// 	target: 'http://uw-form-router.test/',

// 	changeOrigin: true,
// };
// module.exports = function (app) {
// 	app.use('/', createProxyMiddleware(proxy));
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			//target: 'http://uw-form-router.test',
			target: 'http://writeoff.test',
			changeOrigin: true,
		})
	);
};
