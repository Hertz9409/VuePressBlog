## 享元模式

#### 定义

运用共享技术来减少创建对象的数量,从而减少内存占用,提高性能

1. 将一个对象的属性划分为内部和外部状态.

   * 内部状态: 可以被对象集合共享,通常不会改变

   * 外部状态: 根据应用场景经常改变

2. 利用时间换取空间的优化模式.

#### 应用场景

只要是**需要大量创建重复的类的代码块**,都可以使用享元模式来抽离内部,外部状态,减少重复类创建.

#### 代码实现

```javascript
// 对象池
class ObjectPool {
  constructor() {
    this._pool = []; //
  }
  // 创建对象
  create(Obj) {
    return this._pool.length === 0
      ? new Obj(this) // 对象池中没有空闲对象，则创建一个新的对象
      : this._pool.shift(); // 对象池中有空闲对象，直接取出，无需再次创建
  }
  // 对象回收
  recover(obj) {
    return this._pool.push(obj);
  }
  // 对象池大小
  size() {
    return this._pool.length;
  }
}
// 模拟文件对象
class File {
  constructor(pool) {
    this.pool = pool;
  }
  // 模拟下载操作
  download() {
    console.log(`+ 从 ${this.src} 开始下载 ${this.name}`);
    setTimeout(() => {
      console.log(`- ${this.name} 下载完毕`); // 下载完毕后, 将对象重新放入对象池
      this.pool.recover(this);
    }, 100);
  }
}
/****************** 以下是测试函数 **********************/
let objPool = new ObjectPool();
let file1 = objPool.create(File);
file1.name = "文件1";
file1.src = "https://download1.com";
file1.download();

let file2 = objPool.create(File);
file2.name = "文件2";
file2.src = "https://download2.com";
file2.download();

setTimeout(() => {
  let file3 = objPool.create(File);
  file3.name = "文件3";
  file3.src = "https://download3.com";
  file3.download();
}, 200);

setTimeout(
  () =>
    console.log(
      `${"*".repeat(50)}\n下载了3个文件，但其实只创建了${objPool.size()}个对象`
    ),
  1000
);
```

输出结果

```javascript
+ 从 https://download1.com 开始下载 文件1
+ 从 https://download2.com 开始下载 文件2
- 文件1 下载完毕
- 文件2 下载完毕
+ 从 https://download3.com 开始下载 文件3
- 文件3 下载完毕
**************************************************
下载了3个文件，但其实只创建了2个对象
```

## 代理模式

#### 定义

为一个对象提供一种代理以方便对它的访问

代理模式可以解决避免对一些对象的直接访问,以此为基础,常见的有保护代理和虚拟代理,

保护代理可以在代理中直接拒绝对对象的访问,

虚拟代理可以延迟访问到真正需要的时候,节省开销

#### 优缺点

高度解耦,对象保护,易修改

通过代理访问对象,开销更大,时间更慢

#### 代码实现

```javascript
const myImg = {
  setSrc(imgNode, src) {
    imgNode.src = src;
  }
};
// 利用代理模式实现图片懒加载
const proxyImg = {
  setSrc(imgNode, src) {
    myImg.setSrc(imgNode, "./image.png"); // NO1. 加载占位图片并且将图片放入<img>元素

    let img = new Image();
    img.onload = () => {
      myImg.setSrc(imgNode, src); // NO3. 完成加载后, 更新 <img> 元素中的图片
    };
    img.src = src; // NO2. 加载真正需要的图片
  }
};
let imgNode = document.createElement("img"),
  imgSrc =
    "https://upload-images.jianshu.io/upload_images/5486602-5cab95ba00b272bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp";
document.body.appendChild(imgNode);
proxyImg.setSrc(imgNode, imgSrc);
```

## 桥接模式

#### 定义

将抽象部分和具体实现部分分离,两者可独立变化,也可一起工作

#### 应用场景

在封装开源库组件时,经常使用.

#### 代码实现

js中桥接模式的典型应用是: Array对象上的forEach函数. 此函数负责循环遍历数组每个元素,是抽象部分;回调函数callback是具体实现部分

```javascript
const forEach = (arr, callback) => {
  if (!Array.isArray(arr)) return;

  const length = arr.length;
  for (let i = 0; i < length; ++i) {
    callback(arr[i], i);
  }
};

// 以下是测试代码
let arr = ["a", "b"];
forEach(arr, (el, index) => console.log("元素是", el, "位于", index));
```

## 组合模式

#### 定义

将对象组合成树形结构以表示"部分-整体"的层次结构

1. 用小的子对象构造更大的父对象,而这些子对象也由更小的子对象构成
2. 单个对象和组合对象对于用户暴露的接口具有一致性,而同种接口不同表现形式亦体现了多态性

#### 应用场景

需要针对树形结构进行操作的应用中使用.如扫描文件夹,渲染网站导航结构等

#### 代码实现

```javascript
// 文件类
class File {
  constructor(name) {
    this.name = name || "File";
  }
  add() {
    throw new Error("文件下面不能添加文件");
  }
  scan() {
    console.log("扫描文件: " + this.name);
  }
}
// 文件夹类
class Folder {
  constructor(name) {
    this.name = name || "Folder";
    this.files = [];
  }
  add(file) {
    this.files.push(file);
  }
  scan() {
    console.log("扫描文件夹: " + this.name);
    for (let file of this.files) {
      file.scan();
    }
  }
}
let home = new Folder("用户根目录");
let folder1 = new Folder("第一个文件夹"),
  folder2 = new Folder("第二个文件夹");
let file1 = new File("1号文件"),
  file2 = new File("2号文件"),
  file3 = new File("3号文件");

// 将文件添加到对应文件夹中
folder1.add(file1);
folder2.add(file2);
folder2.add(file3);
// 将文件夹添加到更高级的目录文件夹中
home.add(folder1);
home.add(folder2);
// 扫描目录文件夹
home.scan();
```

输出

```javascript
扫描文件夹: 用户根目录
扫描文件夹: 第一个文件夹
扫描文件: 1号文件
扫描文件夹: 第二个文件夹
扫描文件: 2号文件
扫描文件: 3号文件
```

## 装饰者模式

#### 定义

在不改变自身对象的基础上,动态地添加功能代码

装饰者比继承更灵活,而且不污染原来的代码,代码逻辑松耦合

#### 应用场景

装饰者模式由于松耦合,多用于一开始不确定对象的功能,或者对象功能经常变动的时候,尤其是在参数检查,参数拦截等场景

#### 代码实现

ES6的装饰器语法规范还在提案阶段,而且不能装饰普通函数或箭头函数

```javascript
const addDecorator = (fn, before, after) => {
  let isFn = fn => typeof fn === "function";
  if (!isFn(fn)) {
    return () => {};
  }
  return (...args) => {
    let result;
    // 按照顺序执行“装饰函数”
    isFn(before) && before(...args);
    // 保存返回函数结果
    isFn(fn) && (result = fn(...args));
    isFn(after) && after(...args);
    // 最后返回结果
    return result;
  };
};
/******************以下是测试代码******************/
const beforeHello = (...args) => {
  console.log(`Before Hello, args are ${args}`);
};
const hello = (name = "user") => {
  console.log(`Hello, ${name}`);
  return name;
};
const afterHello = (...args) => {
  console.log(`After Hello, args are ${args}`);
};
const wrappedHello = addDecorator(hello, beforeHello, afterHello);
let result = wrappedHello("godbmw.com");
console.log(result);
```

输出

```javascript
Before Hello, args are godbmw.com
Hello, godbmw.com
After Hello, args are godbmw.com
godbmw.com
```

## 适配器模式

#### 定义

为多个不兼容接口之间提供转化器

检查接口数据,进行过滤,重组等操作,使另一个接口可以使用数据

#### 代码实现

```javascript
const API = {
  qq: () => ({
    n: "菊花台",
    a: "周杰伦",
    f: 1
  }),
  netease: () => ({
    name: "菊花台",
    author: "周杰伦",
    f: false
  })
};
const adapter = (info = {}) => ({
  name: info.name || info.n,
  author: info.author || info.a,
  free: !!info.f
});
/*************测试函数***************/
console.log(adapter(API.qq()));
console.log(adapter(API.netease()));
```

