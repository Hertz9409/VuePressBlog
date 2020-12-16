<!--
 * @Author: Hertz
 * @Date: 2020-11-17 17:28:20
 * @LastEditTime: 2020-12-16 17:21:31
 * @LastEditors: Hertz
 * @Description:
 * @FilePath: \VuePressBlog\docs\GIS\超图服务\README.md
-->

# 超图服务(IServer)

## 简介

### SuperMap GIS 10i 产品体系

![超图GIS 10I产品体系](./image/SuperMapGIS.png)

#### 云 GIS 平台软件

SuperMap GIS 产品体系中的云 GIS 平台软件包括 SuperMap iServer、SuperMap iPortal、SuperMap iManager.

- SuperMap IServer : 基于高性能跨平台 GIS 内核的云 GIS 应用服务器,提供全功能的 GIS 服务发布,管理和聚合能力,并支持多层次的扩展开发,提供强大的空间大数据存储、空间大数据分析、流数据实时处理、机器学习和数据科学等 Web 服务,支持海量的矢量、栅格数据"免切片"发布.深度融合微服务、容器化等,提供 PC 端、Web 端和移动端等多种 SDK,可快速构建基于云原生架构的大数据、AI 与三维 GIS 应用系统.

- SuperMap iPortal : 集 GIS 资源整合、搜索、共享和管理于一体的 GIS 门户平台,具备零代码可视化界面定制、多源异构服务注册、系统监控仪表盘等能力.提供丰富的 Web 端应用,可以进行专题图制作、三维可视化、分布式空间分析、大屏创建与展示等操作.作为云端一体化 GIS 平台的用户中心、资源中心、应用中心,可快速构建 GIS 云门户站点.

- SuperMap iManager : 全面的 GIS 运维管理中心,可用于应用服务管理、基础设施管理、大数据管理.提供基于容器技术的 Kubernetes 解决方案,可一键创建基于云原生 GIS 技术的大数据、AI 与三维 GIS 系统.可监控多个 GIS 数据存储、计算与服务节点或其它 Web 站点,监控硬件资源占用、地图访问热点、节点健康状态等指标,实现 GIS 系统的一体化运维管理.可管理运维 GIS 云原生系统,实现细粒度的动态伸缩和灵活部署.

#### 边缘 GIS 平台软件

- SuperMap iEdge : 边缘 GIS 服务器,部署在靠近客户端或数据源的一侧,实现就近服务发布与实时分析计算,可降低响应延时和带宽消耗,减轻云 GIS 中心压力.

#### 端 GIS 平台软件

- 组件 GIS 开发平台: SuperMap iObjects Java、SuperMap iObjects .NET、SuperMap iObjects C++、SuperMap iObjects Python、SuperMap iObjects for Spark、SuperMap iObjects for Blockchain
- 桌面 GIS 平台: SuperMap iDesktop
- 跨平台桌面 GIS 平台: SuperMap iDesktopX
- Web 端 GIS 开发平台: SuperMap iClient JavaScript、SuperMap iClient for WebGL
- 移动 GIS 开发平台: SuperMap iMobile for iOS/Android
- SuperMap iTablet for Android / iOS

### IServer 端口

| 端口      | 用途                                                                | 是否可修改 |
| --------- | ------------------------------------------------------------------- | ---------- |
| 8090      | 启用 Tomcat 服务                                                    | 是         |
| 8015      | 停止 Tomcat 服务                                                    | 是         |
| 1947      | 许可服务                                                            | 否         |
| 8100      | 启用多进程时,进程间通信                                             | 是         |
| 8900-9000 | 启用多进程时,启用进程节点                                           | 是         |
| 10070     | 启用多进程时,HSQLDB 存储临时资源                                    | 是         |
| 6765      | 启动分布式分析服务                                                  | 是         |
| 8020      | 启动 datastore 服务                                                 | 是         |
| 27017     | 使用 datastore 服务时,启用的瓦片数据库 (MongoDB )的默认端口         | 否         |
| 5432      | 使用 datastore 服务时,启用的关系型数据库(PostgreSQL)的默认端口      | 否         |
| 9200      | 使用 datastore 服务时,启用的时空数据库(Elasticsearch)的默认端口端口 | 否         |
| 8097      | 启动地理处理服务                                                    | 是         |

### IServer 安装包目录

- agenthome 文件夹:存放 SuperMap iServer 以 Agent 方式启动时的配置文件和用到的数据.
- bin 文件夹:启动、停止 Tomcat 服务,以及其他相关的脚本文件,Windows 下从 startup.bat 启动服务,即发布 SuperMap iServer 服务.
- conf 文件夹:存放 Tomcat 的配置文件和相关的文件类型定义.
- docs 文件夹:存放 SuperMap iServer 的帮助文档和电子书.deploy 分发包不含这些内容,iServer 界面上的 help 链接至 SuperMap 资源中心的相关内容.
- iClient 文件夹: 存放 SuperMap iServer 的客户端,包括各个开发平台上的工具库、示范代码等内容,如 forJavaScript、forFlash 等.
- lib 文件夹:存放 Tomcat 所需的 jar 文件.
- licenses 文件夹:存放 SuperMap iServer 用到的开源库的许可协议和声明.
- logs 文件夹:存放 SuperMap iServer 和 Tomcat 启动、运行过程中的日志信息.
- samples 文件夹:存放 SuperMap iServer 的示范程序及用到的数据.deploy 分发包不包含 samples 文件夹.
- support 文件夹:存放 JRE、SuperMap iObjects Java 的 bin 文件夹及许可配置工具.
- temp 文件夹:Tomcat 运行过程中的存放临时文件的位置.
- webapps 文件夹:SuperMap iServer 部署的文件夹,里面的 iserver 文件夹下存放有 SuperMap iServer 依赖的 jar 文件、配置文件等信息.
- license.txt 文件:SuperMap iServer 用户许可协议文件.
- readme.txt 文件:与安装产品并启动服务相关的自述文件,用户可据此安装并启动服务.
- SuperMap_iServer_10i(2020)\_Readme_Windows_CHS.pdf 文件:SuperMap iServer 的自述文件.
- BUILD\_* 文件:SuperMap iServer 的版本(由*的内容标识).

### [IServer 主要功能](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/Product_introduce/iServer6_Capability.htm)

### [IServer 支持平台信息](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/Product_introduce/iServer_Support.htm)

## 使用 IServer

### 服务 URL

`http://<server>:<port>/iserver/services/<servicecomponent>/<serviceinterface>`

- server: 发布服务的服务器地址
- port: 发布服务的端口号
- servicecomponent: 已配置的服务组件或服务组件集合的名称
- serviceinterface: 已配置的并被 servicecomponent 绑定的服务接口名称

## 服务分类

| REST 服务              | 功能描述                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| 地图 REST 服务         | 与地图相关的功能,例如地图浏览、缩放、查询、对图层的操作等                                           |
| 数据 REST 服务         | 与数据相关的功能,例如对数据集、数据源的操作,编辑 GIS 数据等                                         |
| 空间分析 REST 服务     | 与分析相关的功能,例如数据集、几何对象的缓冲分析、叠加分析、表面分析等                               |
| 交通网络分析 REST 服务 | 与交通网络分析相关的功能,例如旅行商分析、服务区分析、选址分区分析、最近设施查找分析、最佳路径分析等 |
| 交通换乘分析 REST 服务 | 与交通换乘分析相关的功能,例如公交换乘分析、公交站线查询等                                           |
| 三维 REST 服务         | 与三维相关的功能,例如对三维缓存数据的操作,三维场景的操作等                                          |
| 三维网络分析 REST 服务 | 三维场景下的网络分析,如汇与源的计算、上游追踪、下游追踪、上游基础设施查找                           |
| 动态标绘 REST 服务     | 与动态标绘相关的内容,例如标号及图元的标绘、编辑,态势图文件操作等                                    |

### 地图 REST 服务

地图 REST 服务提供 maps 资源及其子资源 map、layers,算法资源 area、distance 等,这些资源可以对地图和图层进行访问与操作,包括：

- 获取地图图片与地图信息
- 获取地图图层信息与图层图片
- 对图层进行创建、修改、获取或者删除操作
- 获取鹰眼图片
- 对地图进行查询并获取结果
- 高亮几何地物
- 对地图进行距离或者面积量算
- 清除服务端缓存的地图图片

### 数据 REST 服务

数据 REST 服务提供 data 资源及其子资源 datasources 和 featureResults,这些资源可以对空间数据进行访问与操作,包括：

- 获取数据源的信息,如数据源名称,数据源描述,引擎类型,投影信息,坐标单位,距离单位等
- 修改数据源信息,包括数据源描述,坐标单位,距离单位
- 获取数据源所包含的所有数据集的信息
- 对数据集进行操作,包括创建、修改或者删除数据集
- 对数据集中空间数据进行操作,包括获取、修改、添加、删除数据集中空间数据
- 对数据集中的字段进行操作,包括获取,修改、添加、删除字段
- 对数据集中字段的统计计算如统计 WRLD30_ID 字段的平均值
- 对数据集中的要素进行查询

### 空间分析 REST 服务

空间分析 REST 服务,提供 spatialAnalyst 资源及其子资源 datasets、geometry 等,这些资源可以分别提供对于数据集、几何对象的空间分析服务,包括：

- 对数据集进行缓冲区分析
- 对数据集进行叠加分析
- 对数据集进行提取等值线、等值面的表面分析
- 对数据集进行邻近分析,如生成泰森多边形
- 对数据集进行的差值分析、空间关系分析、线性分析等服务
- 对几何对象进行缓冲区分析
- 对几何对象进行叠加分析
- 对几何对象进行提取等值线、等值面的表面分析
- 对几何对象进行邻近分析,如生成泰森多边形

### 交通网络分析 REST 服务

交通网络分析 REST 服务通过 networkanalyst 资源及其 networkDataName、edgeweightnames 等子资源,提供了最近设施查找分析、选址分区分析、旅行商分析、多旅行商分析（物流配送）、最佳路径分析、服务区分析

以最佳路径分析为例,最佳路经分析解决的问题是,在网络数据集中,给定 N 个点（N 大于等于 2）,找出按照给定点的次序依次经过这 N 个点的阻抗最小的路经“阻抗最小”有多种理解,如时间最短、费用最低、风景最好、路况最佳、过桥最少、收费站最少、经过乡村最多等在 iClient for Ajax 最佳路径分析范例中,在地图上选择起点与终点,即可得到两点之间的最佳路径

### 交通换乘 REST 服务

交通换乘分析 REST 服务通过 trafficTransferAnalyst 资源及其 transferNetwork 等子资源,提供了公交换乘分析、公交站点查询功能

交通换乘分析支持按照指定的公交站点和公交换乘策略进行换乘分析,返回相应的换乘方案,以及指定的某条换乘路线的详细信息其中,支持的换乘策略包括时间最短、距离最短、最少换乘、少步行等此外,交通换乘分析还支持通过关键字查询站点信息,这样客户端可以先查询站点,再根据合适的站点进行换乘分析

### 三维 REST 服务

三维 REST 服务提供 3D 资源及其子资源 scenes、datas 等,这些资源可以分别提供三维场景和三维数据的操作,包括：

- 获取三维场景的信息
- 获取三维场景中图层列表
- 获取三维场景中某一个三维图层的表述,包括三维图层的名称、类型、对应三维数据的路径、所用数据在三维数据中的缓存层号
- 获取三维数据
- 获取三维模型缓存数据的索引文件
- 获取三维数据的配置文件
- 获取三维缓存数据里某一块缓存文件的版本
- 获取三维数据中的一块缓存文件

### 三维网络分析

三维网络分析 REST 服务通过 3DNetworkDataName 及其子资源 sinks、sources、traceDownResult、traceUpResult 等,提供了三维场景中的网络分析功能,具体包括：

- 汇查找
- 源查找
- 上游追踪
- 下游追踪
- 上游基础设施查找

### 动态标绘 REST 服务

动态标绘 REST 服务通过 graphicObject、smlInfos 等资源,提供了标号库信息查询功能和态势图访问与操作,包括：

- 获取标号库 ID 信息
- 通过指定 ID 获取标号库
- 获取标号库中的具体标号信息
- 获取服务器中的态势图文件列表
- 对服务器中的态势图文件进行保存、加载、删除操作
- 下载态势图文件

## REST 接口

### 客户端构建 REST 请求

#### 几何对象的 JSON 格式构建

SuperMap iServer 的几何对象由 id、parts、points、style 和 type 等参数表示.

- id: 几何对象的唯一标识符
- parts: 整型数组,其元素描述几何对象中各个子对象所包含的节点个数
  - 几何对象从结构上分为简单几何对象和复杂几何对象,简单几何对象为单一对象,复杂几何对象由多个简单对象组成或经过一定的空间运算之后产生.如:矩形为简单面对象,而中空的矩形则是复杂的面对象.
  - 通常情况下,一个简单几何对象的子对象就是它本身,因此简单几何对象的 parts 是长度为 1 的整型数组,数组中元素值就是这个简单对象节点的个数.一个复杂几何对象由三个简单多边形构成时,那么这个复杂几何对象的 parts 参数值就是一个长度为 3 的整型数组,数组中的每个元素值分别代表这三个多边形的节点个数.
- points: 组成几何对象的节点的二维坐标对数组,对于简单几何对象,这是个一维数组,对应复杂几何对象,这是个二维数组
- style: 几何对象的风格,定义几何对象的符号,线型,填充模式等
- type: 几何对象的类型

简单面几何对象 eg.

```JSON
{
    "id": 1,
    "parts": [4],
    "points": [{
        "x": -12.908614415006994,
        "y": 407.37026387547877
    },
    {
        "x": -2.916359855276923,
        "y": 248.49341637577055

    },
    {
        "x": 250.22075565788498,
        "y": 305.782342518223
    },
    {
        "x": 185.2711010196395,
        "y": 413.3656166113168
    },
    {
        "x": -12.908614415006994,
        "y": 407.37026387547877
    }],
    "style": null,
    "type": "REGION"
}
```

#### 用 POST 请求模拟 GET 请求

GET 请求中,我们总是将参数放在 URI 地址中,如果参数过长,例如 distance 接口计算要素长度,就会超出浏览器 URI 长度限制,导致接口调用失败,此时,我们可以使用 POST 请求来代替 GET 请求,但是要注意在 URI 地址后面需要添加参数`_method= GET`来标识该请求.

### [REST 接口服务资源层级结构](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/resource_hierarchy.htm)

`超图 REST 接口非常丰富,官方 API 讲解也很详细,这里只说明在二维地图和 EyeMap 中经常使用的 API`

```
注1: 以下如无特殊说明, root_uri = http://<server>:<port>/iserver/services/{component组件或组件集名}/rest.
地图模块 component = map-{component}
数据模块 component = data-{component}
三维模块 component = 3D-{component}
空间分析模块 component = spatialanalyst-{component}
交通网络分析模块 component = transportationanalyst-{component}
三维网络分析模块 component = networkAnalyst3D-{component}
交通换乘分析模块 component = traffictransferanalyst-{component}
数据目录服务模块 component = dataCatalog
动态标绘服务模块 component = plot-{component}
分布式分析模块 component = distributedanalyst
地址匹配模块 component = addressmatch-{component}
几何服务模块 component = geometry
Web打印服务模块 component = webprinting

注2: 超图服务一般情况下会提供name和index两种参数标识来定位资源,index为索引号,从0开始编号,与name一一对应.

注3: subLayers 字段表示该图层包含哪些子图层
```

#### Map 服务接口

1. 获取组件或组件集中的地图服务列表:[root_uri/maps[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/maps.htm)

   支持方法: GET, HEAD

   支持表述格式: RJSON, JSON, HTML, XML, JSONP

2. 获取地图服务基本信息:[root_uri/maps/{mapName|mapIndex}[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/map.htm)

   此接口除了可以获取地图服务的基本信息,还可以通过代码加载图层进行预览,同时还提供了地图动态投影的方法.

   支持方法: GET, HEAD

   支持表述格式: RJSON,JSON,JSONP,HTML,XML,KML,Leaflet,openlayers3(with MVT),MapboxGL,for Classic (with Vector Tile), Tianditu

3. 获取地图服务全幅显示的图片:[root_uri/maps/{mapName|mapIndex}/entireImage[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/entireImage.htm)

   此接口支持对输出的全幅图片进行各种定制

   支持方法: GET, HEAD

   支持表述格式: PNG、BMP、GIF、JPG、RJSON、JSON、HTML、XML、WebP

4. 获取地图服务鹰眼图:[root_uri/maps/{mapName|mapIndex}/overview[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/overview.htm)

   此接口支持对输出的鹰眼图片进行各种定制

   支持方法: GET, HEAD

   支持表述格式: PNG、BMP、GIF、JPG、RJSON、JSON、HTML、XML、WebP

5. 获取地图服务资源图片接口:

   - 根据参数动态生成一幅地图图片[root_uri/maps/{mapName|mapIndex}/image[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/image.htm)
   - 获取矢量切片的一个瓦片要素[root_uri/maps/{mapName|mapIndex}/tileFeature[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/tileFeature/tileFeature.htm)
   - 根据参数动态获取地图格网图片[root_uri/maps/{mapName|mapIndex}/tileimage[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/tileImage.htm)
   - 一次获取多张地图格网图片[root_uri/maps/{mapName|mapIndex}/tileimages[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/tileImages.htm)
   - 针对 EPSG 为 3857 的地图服务,可以加载 ZXY 标准瓦片(其他坐标系会被强制投影转换)[root_uri/maps/{mapName|mapIndex}/zxyTileImage[/z/x/y][.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/zxyTileImage/zxyTileImage.htm)

6. 获取地图服务坐标系详情信息:[root_uri/maps/{mapName|mapIndex}/prjCoordSys[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/prjCoordSys.htm)

   此接口支持以通用的 WKT 格式返回地图坐标系信息(返回二进制文件)

   支持方法: GET, HEAD

   支持表述格式: RJSON、JSON、HTML、XML、WKT

7. 获取地图服务下的图层列表:[root_uri/maps/{mapName|mapIndex}/layers[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/layers/layers.htm)

   注意: 此接口返回数组,不仅会返回图层列表,其中图层信息以及子图层信息也会一并返回.超图服务下的图层分为 SuperMap 地图图层, WMS 图层和 WFS 图层,其中 SuperMap 地图图层里面所有的子图层都被放在了`subLayers`字段中

8. 获取具体图层的信息:`root_uri/maps/{mapName|mapIndex}/layers/{layerName|layerIndex}[.format]`

   此接口和(7)接口返回结果对应元素信息一致.

9. 获取图层的**子图层**信息:

   - `root_uri/maps/{mapName|mapIndex}/layers/{layerIndex}/sublayers/{sublayerIndex}[.<format>]`
   - `root_uri/maps/{mapName|mapIndex}/layers/{LYGLQ@XJGLQ.2@@XJGLQ}[.format]`

   注意: 子图层的 URI 命名规则：【layers 资源的 URI】+'/'+【子图层名】+'@@'+【父图层名】+【URI 后缀】

   子图层名命名规则: 【图层名】+'@'+【数据源名字】+'.1' `.1`后缀为超图自动添加,用于区分同名的子图层,`此处需要注意,url地址中为.1,但是通过接口获取到的图层名称使用的是#1`,此处这么处理应该是因为#在 url 中有特殊含义.

10. 获取图层图例信息:

    - ①`root_uri/maps/{mapName|mapIndex}/layers/{layerIndex}/sublayers/{sublayerIndex}/legend[.<format>]`
    - ②`root_uri/maps/{mapName|mapIndex}/layers/{LYGLQ@XJGLQ.2@@XJGLQ}/legend[.format]`
    - ③`root_uri/maps/{mapName|mapIndex}/layers/{layerIndex}/sublayers/{sublayerIndex}/items/{itemID}/legend[.<format>]`
    - ④`root_uri/maps/{mapName|mapIndex}/layers/{LYGLQ@XJGLQ.2@@XJGLQ}/items/{itemID}/legend[.format]`

    注意: 一般情况下,①② 两个接口并不能获得真正的图层图例,大部分时候,我们得使用 ③④ 接口.
    那么,③④ 接口中的 itemID 是什么意思,又是从哪里获取的呢?

    还记得前面提到的获取地图图层信息的接口吧,这个接口返回了一大串信息,其中就包含了地图的渲染方式,itemID 就是从这儿来.

    ![超图服务图层信息-渲染信息](./image/smlayerinfo.png)

    从此处我们可以获取到地图图层的配图信息,然后通过 legend 接口我们可以直接获取地图图例图片,当然,我们也可以使用 style 信息手动构建图例.

11. 针对当前服务进行数据查询(针对当前数据源下的单图层查询)[root_uri/maps/{mapName|mapIndex}/queryResults[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/queryResults/queryresults.htm)

    此接口可以对地图下图层进行 SQL 查询,距离查询,空间查询,最近地物查询,范围查询以及海图查询等.地位类似于 ArcGIS Server 的 Query 查询.

12. 在 map 服务中创建临时图层,用于渲染专题图或者要素过滤图[root_uri/maps/{mapName|mapIndex}/templayersset[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/tempLayersSet/tempLayersSet.htm)

    此时创建的临时图层和服务中的图层除了名字的特殊以外,没有任何不同,图层带的几个接口,临时图层也支持,不过临时图层不支持查询.

13. 获取临时图层集信息并加载其中的图层数据[root_uri/maps/{mapName|mapIndex}/templayersset/{tempLayersID}[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/maps/map/tempLayersSet/tempLayers/tempLayers.htm)

#### Data 服务接口

1. 支持跨数据源查询,但是不能跨地图服务,和 map 服务提供的单图层查询接口表现一致.[root_uri/data/featureResults[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/data/featureResults/featureResults.htm)

2. 获取指定图层下的属性字段信息

   注意,超图并没有提供一次获取所有属性字段信息的接口,所以要想实现此功能,我们得分两步:

   - 获取图层所有属性字段名称[root_uri/data/datasources/{datasourceName|datasourceIndex}/datasets/{datasetName|datasetIndex}/fields[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/data/datasources/datasource/datasets/dataset/fields/fields.htm)
   - 按需获取每一个属性字段的信息[root_uri/data/datasources/{datasourceName|datasourceIndex}/datasets/{datasetName|datasetIndex}/fields/{fieldName|fieldIndex}[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/data/datasources/datasource/datasets/dataset/fields/field/field.htm)

#### geometry 服务接口

1. 距离计算[geometry_uri/distance[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/geometry/distance.htm)

   这个接口在使用时只需要注意 mode 参数,分为 Geodesic(测地线模式,沿着地球椭球体的最短距离,默认使用),Planar(平面模式,两点直线距离,仅当量算时坐标串为投影坐标系有效).

2. 面积计算[geometry_uri/area[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/geometry/area.htm)

3. geometry 坐标转换[geometry_uri/coordTransfer[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/geometry/coordtransfer.htm)

#### spatialAnalyst 服务接口

    空间分析服务分为针对数据集数据进行分析和针对几何对象进行分析,在项目中,我们一般是使用针对几何对象进行分析的接口.

1. Buffer 缓冲区分析[spatialAnalyst_uri/geometry/buffer[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/spatialAnalyst/geometry/geometryBufferResults/geometryBufferResults.htm)

2. Overlay 叠加分析[spatialAnalyst_uri/geometry/overlay[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/spatialAnalyst/geometry/geometryOverlayResults/geometryOverlayResults.htm)

   注意,Overlay 提供了多种叠加方式(裁剪,擦除,合并,相交,同一,对称差,更新),对应了 arcgis 几何服务中不同的接口,目前来说项目中基本够用.

#### webPrinting 地图打印接口

这是 IServer 10i 新增的接口,用来根据预先定义的模板出图打印的.

1. 获取已有模板列表信息(GET)或新增模板(POST)[webPrinting_uri/layouts[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/webprinting/layoutTemplates.htm)

2. 获取打印任务列表,包括已完成的和在打印的(GET),创建新的打印任务(POST)[webPrinting_uri/jobs[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/webprinting/webPrintingJobs.htm)

3. 获取具体打印任务的信息和任务状态[webPrinting_uri/jobs/{jobId}[.format]](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/webprinting/webPrintingJob.htm)

4. 获取打印结果文档数据流[webPrinting_uri/jobs/{jobId}/result](http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/mergedProjects/SuperMapiServerRESTAPI/root/webprinting/webPrintingJobResult.htm)

## 与 ArcGIS Server 对比

- arcgis 服务按照服务类型主要有 MapServer,FeatureServer,GeometryServer,GPServer 四种类型,这其实可以类比超图的 Map 服务,Data 服务,几何服务和空间分析服务和其他服务.

- 由于超图服务由服务提供者,服务组件,服务接口三个部分组成,每一个服务接口都是通过这三个部分的排列组合来实现,也就导致了同一个功能可以在多个地方进行调用,这是一个特别容易让人困惑的点.而 REST 服务风格的 uri 地址拼接访问特点又会对接口调用造成困扰,特别是熟悉 arcgis 服务以后,会觉得超图服务的组织特别混乱,例如获取服务图例的方式,相对于 arcgis 来说,超图的接口设计实在是太复杂了,但是这种复杂也是 rest 接口的完整体现,这样其实是可以简化 iserver 开发人员的工作的.经过深入学习,也是能够理解其中的逻辑的.

- 严格来说,超图服务是没有切片服务的,它是通过提供 tileimage 接口来模拟切片请求,并利用服务器切片缓存特性来动态对切片进行缓存,以提高第二次的接口请求效率.

- 超图和 arcgis 还有一个不同就是,一切皆缓存,arcgis 的接口返回结果不会在服务端进行缓存,客户端获取后就会消失,而超图服务,不管是查询接口,地图渲染接口,都会创建一个缓存记录,将结果记录在缓存中,供用户使用,当然这些缓存也有自己的生命周期.

- 当然,我们也要正视超图在分析算法方面的不足,arcgis 可以将 desktop 的分析能力发布为 GPServer,也可以二次开发 SOE 服务用于对服务功能进行拓展,这些都是超图 IServer 不能支持的.

## 总结

超图 IServer 目前在 WebGIS 方面的能力已经完全足够,我们只需要合理利用它的接口就基本可以实现大部分需求,重点其实是在理解 IServer 的架构以及对 REST 服务接口进行构建方面,要花费更多的时间和精力.至于更多的和业务相关的空间分析能力,依然得依赖于后台基于超图 API 开发的接口服务.
