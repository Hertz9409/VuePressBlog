# VuePress博客部署和Travis CI持续集成

## VuePress介绍
VuePress是由Vue框架团队开发的一款静态网页生成器,它诞生的初衷是为了支持Vue及其子项目的文档需求.类似于Hexo.
### 快速开始
1. 环境安装
``` javascript
# 安装
yarn global add vuepress 或者 npm install -g vuepress
# 新建一个md文件
echo '# hello vuepress' > README.md
# 开始写作
vuepress dev .
# 构建静态文件
vuepress build .

# 在package.json中添加开发和编译命令
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
2. 目录结构
```
.
├── docs
│   ├── .vuepress (可选的) // 存放全局的配置,组件,静态资源等
│   │   ├── components (可选的) // 该目录的Vue组件会被注册为全局组件
│   │   ├── theme (可选的) // 存放本地主题
│   │   │   └── Layout.vue
│   │   ├── public (可选的) // 静态资源目录
│   │   ├── styles (可选的) // 存放样式相关文件
│   │   │   ├── index.styl // 自动应用的全局样式文件,具有比默认样式更高优先级
│   │   │   └── palette.styl // 重写默认颜色常量或设置新的颜色常量
│   │   ├── templates (可选的, 谨慎配置) // 存储HTML模板文件
│   │   │   ├── dev.html // 开发环境HTML模板文件
│   │   │   └── ssr.html // 基于Vue SSR的HTML模板文件
│   │   ├── config.js (可选的) // 配置文件入口文件
│   │   └── enhanceApp.js (可选的) // 客户端应用的增强
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```
默认页面路由

|文件相对路径|页面路由地址|
|:-:|:-:|
|/README.md|/|
|/guide/README.md|/guide/|
|/config.md|/config.html|

3. 基本配置

一个VuePress网站必要的配置文件为`.vuepress/config.js`,它应该导出一个JavaScript对象.目前我的个人Blog网站就只进行了该文件的配置,其他的自定义样式和主题都是使用的VuePress默认的.

![config.js配置信息](./Image/1.png)

VuePress还有其他很多特性,由于在使用中还没用到,所以暂时不做介绍,待后续补充

## 使用VuePress配合Github Page搭建个人博客
## Travis CI持续集成