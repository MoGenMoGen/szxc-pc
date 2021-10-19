const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
	//基本路径
	publicPath: "./",
	//outputDir: "dist", 构建时输出目录 默认dist
	//放置静态资源目录
	assetsDir: "static",
	//indexPath: "index.html", html输出路径 默认 index.html
	devServer: {
		port: 8012,
		proxy: {
			"/api": {
				target: "http://szxc.jinkworld.com/api",
				// target: "http://smgdjaf.nat.ipyingshe.com",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	},
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
	}
};
