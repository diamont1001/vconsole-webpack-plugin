/**
 * webpack plugin for vConsole
 *
 * @author diamont1001<diamont1001@163.com>
 * @sea http://webpack.github.io/docs/plugins.html
 */

'use strict';

const path = require('path');
const fs = require('fs');


function vConsolePlugin(options) {
    this.options = Object.assign({
        filter: [],
        enable: false // 插件开关，默认“关”
    }, options);
    if (typeof this.options.filter === 'string') {
        this.options.filter = [this.options.filter];
    }
}

vConsolePlugin.prototype.apply = function(compiler) {
    const enable = this.options.enable;
    let pathVconsole = 'vconsole-webpack-plugin/src/vconsole.js';
    const _root = module.parent.paths.find(item => {
        let tmpPathVconsole = path.join(item, 'vconsole-webpack-plugin/src/vconsole.js');
        if (fs.existsSync(item) && fs.existsSync(tmpPathVconsole)) {
            pathVconsole = tmpPathVconsole;
            return true;
        }
        return false;
    });
    const that = this;

    compiler.plugin('entry-option', function() {
        if (enable) {
            if (typeof this.options.entry === 'string') {
                if (!that.find([this.options.entry])) {
                    // TODO: entry 为 string 时，修改不了，只有 object 才可以修改
                    this.options.entry = [pathVconsole, this.options.entry];
                    console.warn('[vconsole-webpack-plugin] 暂不支持 entry 为 string 类型的情况\n');
                }
            } else if (Object.prototype.toString.call(this.options.entry) === '[object Array]') {
                if (!that.find(this.options.entry)) {
                    this.options.entry.unshift(pathVconsole);
                }
            } else if (typeof this.options.entry === 'object') {
                for (let key in this.options.entry) {
                    if (that.options.filter.indexOf(key) < 0) {
                        if (Object.prototype.toString.call(this.options.entry[key]) === '[object Array]') {
                            if (!that.find(this.options.entry[key])) {
                                this.options.entry[key].unshift(pathVconsole);
                            }
                        } else if (typeof this.options.entry[key] === 'string') {
                            if (!that.find([this.options.entry[key]])) {
                                this.options.entry[key] = [pathVconsole, this.options.entry[key]];
                            }
                        }
                    }
                }
            }

            // console.log(this.options.entry);
        }
    });
};
vConsolePlugin.prototype.find = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        // 去重，避免两次初始化 vconsole
        const data = codeClean((fs.readFileSync(arr[i]) || '').toString());
        if (data.toLowerCase().indexOf('new vconsole(') >= 0
            || data.indexOf('new require(\'vconsole') >= 0
            || data.indexOf('new require("vconsole') >= 0
            ) {
            return true;
        }

        // 过滤黑名单
        for (var j = 0; j < this.options.filter.length; j++) {
            if (this.options.filter[j] === arr[i]) {
                return true;
            }
        }
    }
    return false;
};

// 去除注释
function codeClean(str) {
    var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g;
    // console.log(str.match(reg));
    return str.replace(reg, function(word) { // 去除注释后的文本  
        return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? '' : word;  
    });
}

module.exports = vConsolePlugin;
