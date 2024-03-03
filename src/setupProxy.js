const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		createProxyMiddleware("/api/**", {
			target: "http://localhost:8000", //转发的代理地址
			changeOrigin: true,
			pathRewrite: {
				"^/api": "/api",
			},
		}),
	);
};
