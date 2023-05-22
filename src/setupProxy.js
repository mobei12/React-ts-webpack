const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		createProxyMiddleware("/自定义code/**", {
			target: "", //转发的代理地址
			changeOrigin: true,
			pathRewrite: {
				"^/自定义code": "/",
			},
		}),
	);
};
