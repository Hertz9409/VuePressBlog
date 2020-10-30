# 函数防抖和节流

## 背景

在实际项目开发过程中,我们经常会遇到一些事件,它们会频繁触发,例如:

- window 的 resize, scroll
- 鼠标的 mouseenter, mouseleave, mousemove
- 键盘的 keyup, keydown
- 地图的 extentchange
- ...

当我们需要监听这些事件,并触发回调时,如果不做处理的话,就会被频繁调用,如果遇到需要在回调中使用 ajax 请求的情况,那更是会造成严重后果.

所以,我们就需要使用一些手段来限制这些事件的频繁触发.而最先想到的肯定就是利用 settimeout 来做事件检测(或者使用时间戳,原理类似).这就和我们处理单击和双击的方法类似(在 300ms 内单击两次,则为双击,否则为两次单击).

## 防抖

**定义: 事件在被触发 n 秒后再被执行回调,如果这 n 秒内事件又被触发,则重新计时**

废话不多说,直接上代码

```javascript
// 函数防抖,传递三个参数 func 要执行的函数, wait 等待时长ms, immediate 是否在开始时立即执行,即不是等事件停止触发后再执行,而是在事件开始触发时执行
function debounce(func, wait, immediate) {
  // 利用闭包保存定时器id
  let timeout;
  return function() {
    // 记录函数本身的this和参数,防止丢失
    let context = this,
      args = arguments;
    // 正在计时,触发则清理计时器重新计时,注意此处清理的是定时器,而非定时器id
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 开始时立即执行一次,如果存在定时器id,说明已经执行过,不再执行立即执行的方法
      let callNow = !timeout;
      // 创建定时器,阻止后面的调用执行函数,并在wait后设置定时器id为null,从而可以重新执行func
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      // 开始时执行函数
      if (callNow) func.apply(context, args);
    } else {
      // 等待wait时间后执行函数,如果触发了则清理定时器重新计时
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 节流

**定义: 在一段时间内只能触发一次事件回调**

和防抖一样,也可以分为在这段时间内的事件首次触发时回调或者事件最后一次触发时回调

```javascript
// 函数节流,传递三个参数 func 要执行的函数, wait 等待时长ms,
// immediate 为true表示开始时触发,为false表示结束时触发
function throttle(func, wait, immediate) {
  let timeout, context, args;
  // 上一次触发的时间戳
  let previous = 0;
  return function() {
    // 获取当前触发函数的时间
    let now = new Date().getTime();
    context = this;
    args = arguments;
    if (immediate) {
      // 开始时触发,第一次调用时previous=0,此时remaining是个超大的负值
      let remaining = wait - (now - previous);
      if (remaining <= 0 || remaining > wait) {
        // 超出wait时长,可以重新触发函数
        // 将previous设置为当前触发函数时间
        previous = now;
        func.apply(context, args);
      }
    } else {
      // 结束时触发
      // 第一次previous为0时,给其赋值
      if (!previous) previous = now;
      let remaining = wait - (now - previous);
      if (!timeout) {
        // 当没有现存计时器时
        timeout = setTimeout(function() {
          previous = 0;
          timeout = null;
          func.apply(context, args);
          context = args = null;
        }, remaining);
      }
    }
  };
}
```

## 总结

函数的防抖和节流在项目中非常常见,流行的 lodash 库也提供了相应的方法,有兴趣的话可以看看它的[源码](https://github.com/lodash/lodash/blob/master/debounce.js),同时一个很有意思的地方是 lodash 将函数的防抖和节流写到了同一个方法里面.
