- 入口(entry): 指示webpack应该使用哪个模块来作为构建其内部依赖图的开始.默认值是 ./src/index.js

  * 入口语法: `entry: string|Array<string>`

  ```javascript
   module.exports = {
   	entey: './path/index.js'
   }
  ```

  - 对象语法: `entry: {[entryChunkName: string]: string|Array<string>}`

     ```javascript
     module.exports = {
       entry: {
         app: './src/app.js',
         adminApp: './src/adminApp.js'
       }
     }
     ```

     常见场景: 1.分离app(应用程序)和vendor(第三方库)入口

     2.多页面应用程序

     ```javascript
     module.exports = {
       entry: {
         pageOne: './src/pageOne/index.js',
         pageTwo: './src/pageTwo/index.js',
         pageThree: './src/pageThree/index.js'
       }
     }
     ```

- 输出(output): 告诉webpack在哪里输出它所创建的bundle,以及如何命名这些文件.主要输出文件默认值 ./dist/main.js, 其他生成文件放置在./dist文件夹下

  ```javascript
  module.exports = {
    output: {
      filename: 'bundle.js',
    }
  }
  ```

  * 多入口起点

    如果配置创建了多个单独的"chunk",则应该使用占位符来确保每个文件具有唯一名称

    ```javascript
    module.exports = {
      entry: {
        app: './src/app.js',
        search: './src/search.js'
      },
      output: {
        filename: '[name].js',
        path: __dirname + '/dist'
      }
    };
    
    // 写入到硬盘：./dist/app.js, ./dist/search.js
    ```

- loader: webpack只能理解JavaScript和JSON文件, loader让webpack能够去处理其他类型的文件,并将它们转    换为有效模块,供程序使用,以及添加到依赖图中

  * 使用loader

    1. 配置: `module.rules`允许在webpack配置中指定多个loader

       loader从右到左取值/执行: sass-loader => css-loader => style-loader

       ```javascript
       module.exports = {
         module: {
           rules: [
             {
               test: /\.css$/,
               use: [
                 { loader: 'style-loader' },
                 {
                   loader: 'css-loader',
                   options: {
                     modules: true
                   }
                 },
                 { loader: 'sass-loader' }
               ]
             }
           ]
         }
       };
       ```

    2. 内联(inline)

       可以在 `import` 语句或任何类似import使用 `!` 将资源中的 loader 分开。每个部分都会相对于当前目录解析

       `import Styles from 'style-loader!css-loader?modules!./styles.css';`

    3. CLI

  * loader特性

    1. load支持链式存储
    2. loader何以是同步,也可以是异步
    3. loader运行在nodejs中,能够执行任何nodejs操作
    4. loader 可以通过 `options` 对象配置
    5. 除了常见的通过 `package.json` 的 `main` 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 `loader` 字段直接引用一个模块
    6. 插件(plugin)可以为 loader 带来更多特性。
    7. loader 能够产生额外的任意文件

- 插件(plugin): loader用于转换某些类型的模块,而插件则可以用于执行范围更广的任务,包括:打包优化,资源管理,注入环境变量

  * webpack插件是一个具有apply方法会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问.
  * 由于插件可以携带参数/选项,在webpack配置中,向plugins属性传入new 实例.

  ```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const webpack = require('webpack');
  module.exports = {
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({template: './src/index.html'})
    ]
  };
  ```

- 模式(mode): 通过选择development, production 或 none之中的一个,来设置mode参数,你可以启用webpack内置在相应环境下的优化,默认值为production

  * 用法

  ```javascript
  module.exports = {
    mode: 'production'
  };
  或
  webpack --mode=production
  ```

  * 如果需要根据webpack.config.js中的mode变量更改打包行为,必须将配置导出为一个函数,而不是一个对象

  ```javascript
  var config = {
    entry: './app.js'
    //...
  };
  module.exports = (env, argv) => {
    if (argv.mode === 'development') {
      config.devtool = 'source-map';
    }
    if (argv.mode === 'production') {
      //...
    }
    return config;
  };
  ```

- 浏览器兼容性(brower compatibility): webpack支持所有符合ES5标准的浏览器(不支持IE8及以下版本)

- 模块(module): 在模块化编程中,开发者将程序分解为离散的功能,称这些为模块.

  - [ES2015 `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 语句
  - [CommonJS](http://www.commonjs.org/specs/modules/1.0/) `require()` 语句
  - [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) `define` 和 `require` 语句
  - css/sass/less 文件中的 [`@import` 语句](https://developer.mozilla.org/en-US/docs/Web/CSS/@import)。
  - 样式(`url(...)`)或 HTML 文件(`<img src=...>`)中的图片链接

- 部署目标(target): 因为服务器和浏览器代码都可以使用JavaScript编写,所以webpack提供了多种部署target

  ```javascript
  module.exports = {
    target: 'node'
  };
  ```

  webpack 会编译为用于类 Node.js 环境（使用 Node.js 的 `require` ，而不是使用任意内置模块（如 `fs` 或 `path`）来加载 chunk)

  * 多个target

    ```javascript
    const path = require('path');
    const serverConfig = {
      target: 'node',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.node.js'
      }
      //…
    };
    
    const clientConfig = {
      target: 'web', // <=== 默认是 'web'，可省略
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.js'
      }
      //…
    };
    
    module.exports = [ serverConfig, clientConfig ];
    ```

    