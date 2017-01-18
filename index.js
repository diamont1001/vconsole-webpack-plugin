/**
 * webpack plugin for vConsole
 *
 * @author diamont1001<diamont1001@163.com>
 * @sea http://webpack.github.io/docs/plugins.html
 */

'use strict';

const path = require('path');

function vConsolePlugin(options) {
    this.options = Object.assign({
        enable: false // 插件开关，默认“关”
    }, options);
}

vConsolePlugin.prototype.apply = function(compiler) {
    const enable = this.options.enable;
    let _root = path.join(compiler.context, '/node_modules'); // base to $project/node_modules

    // support resolveLoader.root
    if (compiler.options.resolveLoader && compiler.options.resolveLoader.root) {
        _root = compiler.options.resolveLoader.root;
    }

    const pathVconsole = path.join(_root, '/vconsole/dist/vconsole.min.js');

    compiler.plugin('entry-option', function() {
        if (enable) {
            if (Object.prototype.toString.call(this.options.entry) === '[object Array]') {
                this.options.entry.unshift(pathVconsole);
            } else if (typeof this.options.entry === 'object') {
                for (let key in this.options.entry) {
                    if (Object.prototype.toString.call(this.options.entry[key]) === '[object Array]') {
                        this.options.entry[key].unshift(pathVconsole);
                    } else if (typeof this.options.entry[key] === 'string') {
                        this.options.entry[key] = [pathVconsole, this.options.entry[key]];
                    }
                }
            }

            // console.log(this.options.entry);
        }
    });
};

module.exports = vConsolePlugin;
