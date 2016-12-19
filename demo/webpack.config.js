// webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // Html文件处理
var vConsolePlugin = require('vconsole-webpack-plugin'); 

// 接收运行参数
const argv = require('yargs')
    .describe('debug', 'debug 环境') // use 'webpack --debug'
    .argv;

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: './dist', // This is where images & js will go
        publicPath: '', // This is used to generate URLs to e.g. images
        filename: '[name].js',
        chunkFilename: "[id].chunk.js?[hash:8]"
    },
    plugins: [
        new vConsolePlugin({enable: !!argv.debug}),

        /**
         * HTML文件编译，自动引用JS/CSS
         * 
         * filename - 输出文件名，相对路径output.path
         * template - HTML模板，相对配置文件目录
         * chunks - 只包含指定的文件（打包后输出的JS/CSS）,不指定的话，它会包含生成的所有js和css文件
         * excludeChunks - 排除指定的文件（打包后输出的JS/CSS），比如：excludeChunks: ['dev-helper']
         * hash
         */
        new HtmlWebpackPlugin({filename: 'list.html', template: 'src/index.html', chunks: ['index'], hash: true}),
        ],

    module: {
        loaders: [
            {
                test: /\.js$/, loader: 'babel-loader', // ES6
                exclude: /(node_modules)/
            },
            // CSS,LESS打包进JS
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders

            { test: /\.tpl$/, loader: 'ejs'}, // artTemplate/ejs 's tpl
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    name: '[path][name].[ext]?[hash:8]',
                    limit: 8192 // inline base64 URLs for <=8k images, direct URLs for the rest
                }
            }
        ]
    },
    resolve: {
        // 现在可以写 require('file') 代替 require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee']
    }
};
