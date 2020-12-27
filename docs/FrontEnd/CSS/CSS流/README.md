# CSS流(文档流)

`定义: css中的一种基本的定位和布局机制.`

## 正常布局流

`在不对页面进行任何布局控制情况下,浏览器默认的HTML布局方式.`此时浏览器完全按照代码中元素的先后顺序以及块元素,内联元素的特性进行布局.

我们可以通过修改`display`,`float`,`position`这些属性,修改布局流,从而实现更加复杂多变的界面.

## position

能够将一个元素从它原本的正常布局流中拿出,移动到另一个位置.`position`通常用来对页面元素进行微调.

### 属性

* static: 元素默认属性,表示元素遵循正常布局流

* relative: 相对定位,相对于`元素在正常布局流`中的位置进行定位.[eg](https://codepen.io/pen/?&editable=true=https%3A%2F%2Fdeveloper.mozilla.org%2F)

* absolute: 绝对定位,相对于该元素的`包含块`进行定位,元素会脱离正常文档流[eg](https://codepen.io/pen/?&editable=true=https%3A%2F%2Fdeveloper.mozilla.org%2F)

  `当元素属性position:absolute时,包含块由最近的position不为static的祖先元素建立,如果没有符合条件的祖先元素,则包含块是初始包含块.`

  `当position:absolute时,float属性无效`

* fixed: 固定定位,将元素相对浏览器视口(viewport)固定[eg](https://codepen.io/pen/?&editable=true=https%3A%2F%2Fdeveloper.mozilla.org%2F)

* sticky: 粘性定位,元素先保持和static一样的定位,当元素距离视口位置达到某一预设值时,像fixed一样定位[eg](https://codepen.io/pen/?&editable=true=https%3A%2F%2Fdeveloper.mozilla.org%2F)

#### absolute

当absolute与overflow相遇时: 绝对定位元素不总是被父级overflow属性剪裁，尤其当overflow在绝对定位元素及其包含块之间的时候.

```html
<!--此时不会裁剪-->
<div style="position: relative;">
　<div style="overflow: hidden;">
　　<img src="1.jpg" style="position: absolute;">
　</div>
</div>
```

当absolute与clip相遇时: clip属性要想生效,position属性必须是absolute或fixed.不过,clip属性已经弃用,使用新的**clip-path**属性替代.

当absolute遇到left/top/right/bottom时: 真正的绝对定位

问题: 为absolute元素设置left:0,right:0 和width: 100% 有什么不同?

表面上没有什么不同,但是我们通过设置absolute元素的padding和margin,就会发现它们的不同,对于设置left/right的元素,无论设置多少padding或margin,它的盒子模型宽度一直和包含块一致,而设置width的元素盒子宽度已经超出了包含块的宽度.

当absolute与margin:auto相遇: 居中显示

#### relative

relative可以将absolute元素限制在正常的文档流中.relative定位不影响页面其他元素的定位.

相对定位的top/right/bottom/left属性为百分比时,是相对与元素包含块计算的,而不是自身,当元素包含块高度为auto时,计算值为0.同时,如果同时设置left和right属性,则只有一个属性会生效,具体和文档流顺序有关.

#### fixed

fixed包含块为根元素

## float

顾名思义,就是将一个元素`浮动`起来,这会改变元素本身的布局,同时也会改变正常流中跟随它的其他元素的布局.毕竟元素浮动以后,会被从正常布局流中移除,就和`position:absolute`一样.

### 属性

* left: 元素浮动到左侧
* right: 元素浮动到右侧
* none: 默认值,不浮动
* inherit: 继承父元素的浮动属性

## display

在css中,我们通常是通过修改这个属性来实现页面布局.

* block
* inline-block
* table
* flex
* grid