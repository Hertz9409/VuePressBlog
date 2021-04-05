# 移动端适配

## 几个基本概念

- 物理像素: (DP)设备屏幕实际拥有的像素点,屏幕的基本单元,是实体,(屏幕分辨率).单位 pt,不同设备的物理像素是不同的,像显示器和打印机就有很大的不同.

  - pt 在 CSS 单位中属于绝对单位,`1pt=1/72(inch)`

- 逻辑像素: 也叫设备独立像素(DIP),反映在 CSS/JS 程序中的像素点.在浏览器中,window 对象存在一个 devicePixelRatio 属性,表示设备物理像素与设备逻辑像素之间的比例,也就是`devicePixelRatio=物理像素/逻辑像素`

- CSS 像素: 虚拟像素,在 CSS 和 JS 中使用的抽象单位,浏览器中一切长度都以 CSS 像素为单位,单位 px.CSS 像素是一种逻辑像素.

  - px 为一个相对单位,相对的是物理像素,同一台设备,1px 所代表的物理像素可变,不同设备,1px 代表的物理像素也是变化的.

  - 在谈论 CSS 像素时,一定要清楚上下文,即考虑实际环境.

  - 由于不同设备的物理像素不同,浏览器为了使 1px 大小在不同设备上看上去总是差不多,保证阅读体验,会对 CSS 像素进行调节.而浏览器通过定义的`参考像素(以一臂之遥看96DPI的屏幕时的视角,0.0213度)`来进行换算

- DPR(device pixels ratio): 设备像素比,用来描述未缩放状态下,物理像素与 CSS 像素间的初始比例关系.在 window 中存在 devicePixelRatio 这个参数.

  - 1px=(dpr)^2\*1dp, 表示 1px 由多少物理像素组成,当 DPR 不为 1 时,1px 边框问题就出现了.

- PPI(pixels per inch): 每英寸物理像素个数.

- DPI(dots per inch): 每英寸多少个点(墨点),这个参数和打印机有关.

- Viewport:

  - layout viewport: 移动设备浏览器布局视口,宽度大于浏览器可视区域的宽度,用于方便展示桌面端网页,通过 document.documentElement.clientWidth 可以获取宽度.

  - visual viewport: 浏览器可视区域大小,通过 window.innerWidth 可以获取宽度.

  - ideal viewport: 移动设备的理想 viewport,专为移动设备定制,没有固定尺寸,各个设备各不相同.

## 控制 viewport

### 通过 meta 标签控制

> 移动设备 viewport 默认为 layout viewport,我们可以通过设置 meta 标签使浏览器 layout viewport 的宽度等于设备宽度,同时不允许用户手动缩放,这样浏览器就不会出现横向滚动条了

`<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>`

- 通过 device-width 可将宽度设置为 ideal viewport 宽度

- scale 缩放是相对于 ideal viewport 进行的,缩放值越大,当前 viewport 宽度会越小.

- visual viewport 宽度 = ideal viewport 宽度 / 当前缩放值

- 当前缩放值 = ideal viewport 宽度 / visual viewport 宽度

### 媒体查询@media

> @media 参数可以针对不同屏幕尺寸设置不同样式.

```
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<style>
@media (max-width: 600px) and (orientation: landscape) {
  body {
    background-color:red;
  }
}
</style>
```

简单,调整屏幕宽度不需要刷新;代码量大,不好维护,不能完全适配所有屏幕.

### vh 和 vw 单位

- vh 相对于 viewport 视口高度(100vh)计算,

- vw 相对于 viewport 视口宽度(100vw)计算

可能会出现小数点,兼容性较差

### rem 和 em 单位

- rem 相对于 html 根元素的 font-size 变化

- em 相对于父级 font-size 变化

尽管 rem 很好用且自适应页面体验良好,但是在一些需要固定间距的场景下还是会出现问题,需要搭配 px 使用

### flex 布局

flex 布局的特性天然就适合用来做自适应布局,目前以及得到广泛应用.
