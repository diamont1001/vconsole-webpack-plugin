// webpack.config.js
// 
'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Html文件处理
const vConsolePlugin = require('../../index.js');
    
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '', // This is used to generate URLs to e.g. images
    filename: '[name].js',
    chunkFilename: "[id].chunk.js?[hash:8]"
  },
  mode: 'development', // 'production'
  devServer: {
    // contentBase: './dist',
    hot: true
  },
  plugins: [
    new vConsolePlugin({enable: true}),

    /**
     * HTML文件编译，自动引用JS/CSS
     *
     * filename - 输出文件名，相对路径output.path
     * template - HTML模板，相对配置文件目录
     * chunks - 只包含指定的文件（打包后输出的JS/CSS）,不指定的话，它会包含生成的所有js和css文件
     * excludeChunks - 排除指定的文件（打包后输出的JS/CSS），比如：excludeChunks: ['dev-helper']
     * hash
     */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['index'],
      hash: true
    })
  ],

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
    ]
  }
};
