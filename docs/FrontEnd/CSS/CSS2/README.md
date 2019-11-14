---
title: CSS基础知识二
date: 2018-09-30 11:18:58
tags: [前端,CSS]
categories: css
---

# 选择器

<!-- more -->

### 选择器语法

|           语法            |                             解释                             |       选择器描述       |
| :-----------------------: | :----------------------------------------------------------: | :--------------------: |
|             *             |                         匹配所有元素                         |       通配选择器       |
|             E             |                     匹配所有E类型的元素                      | 类型选择器(标签选择器) |
|            E F            |                  匹配所有E元素后代中的F元素                  |       后代选择器       |
|           E > F           |                  匹配所有E元素子集中的F元素                  |        子选择器        |
|       E:first-child       |                匹配父元素下子集中第一个E元素                 |    :first-child伪类    |
|    E:link   E:visited     |      匹配未访问过的或者已被访问过的超链接源锚点的E元素       |        link伪类        |
| E:active  E:hover E:focus |               匹配处于某些用户动作期间的E元素                |        动态伪类        |
|         E:lang(c)         |                      匹配语言为c的E元素                      |      :lang()伪类       |
|           E + F           |            匹配所有前面紧跟着一个E元素兄弟的F元素            |       相邻选择器       |
|          E[foo]           |                 匹配所有设置了foo属性的E元素                 |       属性选择器       |
|     E[foo="warning"]      |            匹配所有foo属性设置为"warning"的E元素             |       属性选择器       |
|     E[foo~="warning"]     | 匹配所有"foo"属性值为一列空格分隔的值，且其中之一恰好是"warning"的E元素 |       属性选择器       |
|    E[lang&#124;="en"]     | 匹配所有"lang"属性值为一列以"en"开头（从左向右）用连字符分隔的值的E元素 |       属性选择器       |
|        DIV.warning        |      *语言特定的*（HTML中，与DIV[class~="warning"]相同       |        类选择器        |
|          E#myid           |                  匹配所有ID为"myid"的E元素                   |        id选择器        |

### 伪类和伪元素

为了允许根据文档树之外的信息来格式化,CSS引入了伪类和伪元素的概念

* 伪元素建立了对超出文档语言指定的文档树的抽象
* 伪类根据元素的特征分类,而不是名字,属性或者内容

通俗得讲  伪类的效果可以通过添加实际的类来实现,而伪元素的效果可以通过添加实际的元素来实现 
它们的本质区别就是**是否抽象创造了新元素**

### 样式优先级

样式表来源:

* 编写者: 编写者根据文档语言约定给源文档指定样式表
* 用户: 用户可能会给某个特定文档指定样式信息
* 用户代理(浏览器): 遵循CSS规范,应用一份默认的样式表

优先级排序:  用户重要声明 > 编写者重要声明 > 编写者常规声明 > 用户常规声明 > 用户代理(浏览器)声明

相同优先级下的样式则根据样式选择器优先级来应用样式:

内联样式 > ID选择器 > 类选择器/伪类选择器/属性选择器 > 标签选择器/伪元素选择器

当出现!important,一律使用此样式.

@media规则:一般用于指定特定媒体类型(设备类型)下的样式,可用于做界面自适应.