const proxy = require('http-proxy-middleware');

module.exports = function (app) {
	console.log('hello in the proxy!');
	app.use(
		proxy('/api', {
			target: 'http://localhost/cond-switch/',
			changeOrigin: true,
		})
	);
};
