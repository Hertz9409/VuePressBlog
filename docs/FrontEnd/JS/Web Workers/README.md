# Web Workers

JavaScript 是单线程的,因为这一特点,我们有了异步方法,任务队列,宏任务,微任务这些概念.

但是随着计算机硬件的发展,家用电脑都已经 8 核 16 线程了,而 JS 依然只能单线程运行,这是对资源的极大浪费:).

于是,HTML5 标准中,定义了 Web Worker 这一规范来让 JS 程序实现多线程,占用更多的资源.

那么,我们在什么情况下使用 Web Worker 呢?

## 使用场景

1. 当我们需要进行复杂运算,需要花费大量时间时

目前来说,当我们遇到这种问题时都会使用一个最简单粗暴的办法,直接整个页面加一个 loding 蒙板,禁止用户操作,等待计算完成.这种方式在用户体验上是很糟糕的,如果计算时间久了,用户会选择右上角关闭网页的.

而如果我们使用 Web Worker 技术,就可以将计算放到其他线程(后台),用户依然可以操作界面,等到计算成功,通过消息提醒用户查看计算结果.目前实施监督系统基线的审查成果包上传就是这么实现的,上传成果包时不影响用户进行其他操作.

2. 服务的心跳检测,精确的计时工具等

就像 windows 系统一样,将很多后台任务作为独立线程隐藏运行.我们也可以将很多和主线程没有太大关系的功能独立为一个个单独的子线程去运行,这样主线程的操作不会影响这些功能,这些功能的运行也不会阻塞主线程.

那么,Web Worker 又是怎么使用的呢?

## 使用

### 主线程

#### 创建 Worker 对象

主线程调用`new Worker(aURL, options)`构造函数,创建一个 worker 线程,Worker 构造函数参数为一个 js 文件的 url 地址.
url 地址可以直接是一个`网络地址`,也可以是`由 Blob 转换来的 url 地址`.
当 url 地址为`网络地址`时,`脚本地址必须与主线程脚本文件同源`.

`options`可选参数包括`type`,`credentials`,`name`三个参数,大多数情况下,我们不需要设置.

```javascript
let url = 'http://...js';

const str = 'worker线程 todo ...';
const blob = new Blob([data]);
let url = URL.createObjectURL(blob);

const worker = new Worker(url);
```

#### 主线程与 Worker 线程通信

主线程和 worker 线程之间通过`postMessage()`方法来发送消息,并通过`onmessage`方法来接收消息(传递的信息包含在 Message 事件的 data 属性内),传输的是数据的副本(经过序列化),不直接共享数据.

```javascript
worker.postMessage({
  msg: 'hello world'
});

worker.onmessage = function(e) {
  console.log('主线程接收到的数据', JSON.parse(e.data));
};
```

#### 主线程关闭 worker 线程

worker 线程创建后,会一直运行,所以我们在完成计算后,需要关闭 worker 线程.

一旦调用此方法,worker 线程会立即停止,哪怕代码还没执行完.

```JavaScript
worker.terminate();
```

#### 监听 worker 线程错误

Worker 有两个监听错误的方法,一个是`onerror`,这个方法监听的是 worker 线程内部执行发生的错误,还有一个是`onmessageerror`,这个方法监听的是 worker 线程消息发送的错误,例如参数序列化失败等.

### Worker 线程

我们可以在 worker 线程中运行任意代码,但是需要注意,我们不能直接在 worker 线程中操作 DOM 元素或者使用 window 对象中的某些方法和属性(通过 WorkerGlobalScope 暴露了部分 window 对象的属性和方法,像 URL 方法就不可用).

worker 线程也是可以使用 ajax 来进行网络请求的,只是`XMLHttpRequest` 的 `responseXML`(XML 格式的响应) 和 `channel` 这两个属性的值将总是 `null`

worker 线程也是可以另外创建新的 worker 线程的,这些新创建的 worker 线程与 worker 线程的宿主线程相同.

在 worker 线程内部,标准定义了一个关键字`self`,这个对象返回 Worker 的全局作用域,一些 Worker 内部特有的方法,可以通过此对象来调用.包括上面提到的和主线程通信会使用到的`postMessage`,`onmessage`,`onmessageerror`等方法.

#### 关闭线程

不同于主线程使用的方法,在 worker 线程内部关闭线程调用的是`close`方法.

```JavaScript
self.close();
```

#### 在 worker 中加载 js 脚本

`importScripts`方法可以将一个或者多个脚本同时导入到 worker 线程的作用域中.脚本的下载顺序不固定,但是执行顺序是按照导入顺序来的.

```JavaScript
self.importScripts('foo.js', 'bar.js', ...);
```

## Transferable objects

上面讲到,主线程与 web worker 线程之间是通过 postMessage 进行通信的,并且遵循`传值不传址`的原则,那么如果遇到主线程需要将一个 1G 的数据交给 worker 线程计算的情况,那么这种通信逻辑势必会造成极大的性能消耗和资源浪费,甚至会存在序列化失败的情况.针对这个问题,有一个新的 api 被提出.

这个 api 只是一个标签,用来指示对象在特定场合下,对数据所有权的传递转变,比如通过`Worker.postMessage()`方法传递到 Worker 时就可使用.
`ArrayBuffer`,`MessagePort`和`ImageBitmap`实现了此接口.也就是说,面对上面那个 1G 的数据,我们可以使用此特性.此时 postMessage 的语法有所不同`myWorker.postMessage(aMessage, transferList)`.

```Javascript
const ab = new ArrayBuffer(100);
console.log(ab.byteLength); // 100
worker.postMessage(ab, [ab]);
console.log(ab.byteLength); // 0
```

注意,上述方法不是数据的复制,而是数据所有权的传递,一旦主线程执行此方法,那么主线程不再可以读取和修改此数据,此数据所有权在 worker 线程.

## SharedWorker

一种 WebWorker 的特殊情况.一般情况下,浏览器一个页面就有一个 js 线程,那么这个 js 线程创建的 worker 线程应该只和该线程有关.

SharedWorker 线程是一种可以在多个浏览器页面之间共享的线程.

在使用方式上是类似的.依然是主线程实例化,获取 SharedWorker 实例.
但是这时,我们得通过 SharedWorker 实例的 `port` 属性获取一个 `MessagePort` 对象,使用此对象来对共享 worker 进行控制

而共享线程内部,必须使用 `onconnect` 方法监听主线程和工作线程的连接,只有连接上以后,我们才能通过 `onconnect` 事件的 `ports` 属性获取到与该 worker 相关联的端口,才能传递消息.

```JavaScript
// main
var myWorker = new ShareWorker("http://...js");
myWorker.port.postMessage("hello world");
myWorker.port.onmessage = function(e) {
    console.log(e.data);
}
// shared worker
onconnect = function(e) {
    const port = e.ports[0];
    port.onmessage = function(e) {
        console.log(e.data);
        port.postMessage('aa');
    }
}
```

`MessagePort`除了 `postMessage` 方法,还有`start`(开启主线程与共享线程的连接,当使用 `addEventListener` 方法监听 message 消息时,需要显式调用此方法),`close`(关闭主线程与共享线程的连接)方法

## Web Worker message 消息队列管理

由于 WebWorker 执行的主要是耗时计算,所以我们要控制 message 的请求频次,最好在上次执行完成后,WebWorker 返回计算结果回执消息了,再进行下一次请求,并且在计算过程中接收到请求时进行 drop 处理.

## 样例

- [Web Worker](http://mdn.github.io/simple-web-worker/)
- [shared Worker](http://mdn.github.io/simple-shared-worker/)
- [demo](https://codepen.io/hertz9409/pen/VwjPYYq?editors=1111)
