# vconsole-webpack-plugin

webpack plugin for [vConsole](https://github.com/WechatFE/vConsole)

帮助开发者在移动端进行调试，本插件是在 [vConsole](https://github.com/WechatFE/vConsole) 的基础上封装的 `webpack` 插件，通过 `webpack` 配置即可自动添加 `vConsole` 调试功能，方便实用。

- Release History: [History](https://github.com/diamont1001/vconsole-webpack-plugin/blob/master/History.md)

## 安装

```bash
npm install vconsole-webpack-plugin --save-dev
```

## 使用

`webpack.conf.js` 文件配置里增加以下插件配置即可

```js
// 引入插件
var vConsolePlugin = require('vconsole-webpack-plugin'); 

module.exports = {
    ...

    plugins: [
        new vConsolePlugin({
            filter: [],  // 需要过滤的入口文件
            enable: true // 发布代码前记得改回 false
        }),
        ...
    ]
    ...
}
```

`vConsole` 作为一个调试模块，注定了需要在发布前把它去掉，为了避免人为操作失误而影响线上功能，这里建议配置如下：

`package.json` 文件配置：

```js
scripts: {
    "dev": "webpack -w --debug",
    "prod": "webpack -p"
}
```

`webpack.conf.js` 配置：

```js
// 引入插件
var vConsolePlugin = require('vconsole-webpack-plugin'); 

// 接收运行参数
const argv = require('yargs')
    .describe('debug', 'debug 环境') // use 'webpack --debug'
    .argv;

module.exports = {
    ...

    plugins: [
        new vConsolePlugin({enable: !!argv.debug}),
        ...
    ]
    ...
}
```

这样，在开发的时候运行 `npm run dev`，发布的时候运行 `npm run prod` 即可。

`webpack-dev-server` 的配套用法：

用法其实跟上面一样，只是别忘记在启动脚本的时候增加 `--debug` 即可。如下：

```js
  // package.json
  "scripts": {
    ...
    "start:dev": "webpack-dev-server --debug",
    ...
  },
```

## 例子参考: [webpack-demo](https://github.com/diamont1001/webpack-demo/tree/master/example1)

## 直接使用 vconsole

当然，有时候一些页面想临时添加 `vconsole` 来调试一下，可以直接使用：

```htmls
<script src="http://wechatfe.github.io/vconsole/lib/vconsole.min.js?v=3.2.0"></script>
<script>
	window.vConsole = new window.VConsole();
</script>
```
