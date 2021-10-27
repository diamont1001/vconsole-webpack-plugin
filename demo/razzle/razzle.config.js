const path = require('path')

const VConsolePlugin = require('vconsole-webpack-plugin')

module.exports = {
	options: {
		buildType: 'spa',
	},
	modifyWebpackConfig({ webpackConfig }) {
		webpackConfig.plugins.push(
            new VConsolePlugin({
                enable: true
            }),
        )

        return webpackConfig
	},
}
