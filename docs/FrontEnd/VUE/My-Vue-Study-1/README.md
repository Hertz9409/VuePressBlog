---
title: My Vue Study (1)
date: 2018-03-23 16:45:00
tags: [Vue]
categories: vue
---

## Vue.JS 学习笔记一

#### 兼容性： IE9以上，Vue使用ECMA5特性

#### 浏览器调试器： [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools)

<!-- more -->

### 使用Vue:

1.直接&lt;script&gt;引入<br/>
> [官网](https://vuejs.org/js/vue.js)

> [CDN](https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js)

2.NPM安装<br/>
 <code>$ npm install vue</code>

3.使用Vue-Cli<br/>
<code>
    全局安装 vue-cli<br/>
    $ npm install --global vue-cli<br/>
    创建一个基于 webpack 模板的新项目<br/>
    $ vue init webpack my-project<br/>
    安装依赖<br/>
    $ cd my-project<br/>
    $ npm run dev<br/>
</code>


### 使用Vue构建项目的几种实现方法

1.使用Vue-Cli实现大型项目构建
> 需要node环境，集成常用打包工具
#### 优点：
* 开发高效方便
* 自定义.vue文件类型实现单文件组件
* 使用ES6语法
* 版本打包，优化网络，代码加密
* 适合大型项目构建<br/>
#### 缺点：
* 配置复杂，虽然直接可以使用默认配置
* 如果ES6语法不熟悉很难做
* 要想发布版本需要进行打包，打包后对于内容修改以及在线调试都极其不友好
* 直接上手，让新手没有一个学习基础原理的过程
* 项目交接可能会存在一些问题

2.引入Vue.js库，使用原生语法，或者使用ES6语法
#### 优点：
* 可以使用旧的语法，对于不了解ES6的开发相对友好
* 系统源码可控，交接方便，在线修改调试方便
* 上手也比较简单<br/>
#### 缺点：
* 不存在代码压缩和保密工作
* html模版需要自己处理
