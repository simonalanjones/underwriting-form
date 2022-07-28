// const proxy = require('http-proxy-middleware');

// module.exports = function (app) {
// 	app.use(
// 		proxy('/submit', {
// 			target: 'http://localhost/cond-switch/',
// 			changeOrigin: true,
// 		})
// 	);
// };

const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
	target: 'http://localhost/cond-switch/',
	changeOrigin: true,
};
module.exports = function (app) {
	app.use('/search', createProxyMiddleware(proxy));
};
