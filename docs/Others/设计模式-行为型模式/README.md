## 命令模式

#### 定义

1. 请求以命令的形式包裹在对象中,并传给调用对象
2. 调用对象寻找可以处理该命令的合适的对象,并把该命令传给相应对象
3. 该对象执行命令

发送者,传递者,执行者

#### 应用场景

有时候需要向某些对象发送请求，但是又不知道请求的接受者是谁，更不知道被请求的操作是什么。此时，**命令模式就是以一种松耦合的方式来设计程序**

#### 代码实现

```javascript
// 接受到命令，执行相关操作
const MenuBar = {
  refresh() {
    console.log("刷新菜单页面");
  }
};
// 命令对象，execute方法就是执行相关命令
const RefreshMenuBarCommand = receiver => {
  return {
    execute() {
      receiver.refresh();
    }
  };
};
// 为按钮对象指定对应的 对象
const setCommand = (button, command) => {
  button.onclick = () => {
    command.execute();
  };
};
let refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
let button = document.querySelector("button");
setCommand(button, refreshMenuBarCommand);
```

## 备忘录模式

#### 定义

保存某个状态,在需要时直接获取,而不是重复计算

备忘录模式实现,不能破坏原始封装. 也就是说,能拿到内部状态,将其保存在外部

#### 应用场景

进行数据缓存,"斐波那契数列"递归实现中的运用

#### 代码实现

```javascript
const fetchData = (() => {
  // 备忘录 / 缓存
  const cache = {};
  return page =>
    new Promise(resolve => {
      // 如果页面数据已经被缓存, 直接取出
      if (page in cache) {
        return resolve(cache[page]);
      }
      // 否则, 异步请求页面数据
      // 此处, 仅仅是模拟异步请求
      setTimeout(() => {
        cache[page] = `内容是${page}`;
        resolve(cache[page]);
      }, 1000);
    });
})();
// 以下是测试代码
const run = async () => {
  let start = new Date().getTime(),
    now;
  // 第一次: 没有缓存
  await fetchData(1);
  now = new Date().getTime();
  console.log(`没有缓存, 耗时${now - start}ms`);
  // 第二次: 有缓存 / 备忘录有记录
  start = now;
  await fetchData(1);
  now = new Date().getTime();
  console.log(`有缓存, 耗时${now - start}ms`);
};
run();
```

输出

```javascript
没有缓存, 耗时1008ms
有缓存, 耗时1ms
```

## 模板模式

#### 定义

抽象父类定义子类需要重写的相关方法,而这些方法仍然通过父类方法调用

#### 代码实现

```javascript
class Animal {
  constructor() {
    // this 指向实例
    this.live = () => {
      this.eat();
      this.sleep();
    };
  }
  eat() {
    throw new Error("模板类方法必须被重写");
  }
  sleep() {
    throw new Error("模板类方法必须被重写");
  }
}
class Dog extends Animal {
  constructor(...args) {
    super(...args);
  }
  eat() {
    console.log("狗吃粮");
  }
  sleep() {
    console.log("狗睡觉");
  }
}
class Cat extends Animal {
  constructor(...args) {
    super(...args);
  }
  eat() {
    console.log("猫吃粮");
  }
  sleep() {
    console.log("猫睡觉");
  }
}
/********* 以下为测试代码 ********/
// 此时, Animal中的this指向dog
let dog = new Dog();
dog.live();
// 此时, Animal中的this指向cat
let cat = new Cat();
cat.live();
```

## 状态模式

#### 定义

对象行为基于状态来改变,内部状态转化,导致行为表现形式不同.

#### 优缺点

封装转化规则,对于大量分支语句,可以考虑使用状态类进一步封装.每个状态是确定的,所以对象行为是可控的

状态模式的**关键**是将事物的状态都封装成单独的类,这个类的各种方法就是“此种状态对应的表现行为”.因此,状态类会增加**程序开销**

#### 代码实现

```javascript
const FSM = (() => {
  let currenState = "download";
  return {
    download: {
      click: () => {
        console.log("暂停下载");
        currenState = "pause";
      },
      del: () => {
        console.log("先暂停, 再删除");
      }
    },
    pause: {
      click: () => {
        console.log("继续下载");
        currenState = "download";
      },
      del: () => {
        console.log("删除任务");
        currenState = "deleted";
      }
    },
    deleted: {
      click: () => {
        console.log("任务已删除, 请重新开始");
      },
      del: () => {
        console.log("任务已删除");
      }
    },
    getState: () => currenState
  };
})();
class Download {
  constructor(fsm) {
    this.fsm = fsm;
  }
  handleClick() {
    const { fsm } = this;
    fsm[fsm.getState()].click();
  }
  hanldeDel() {
    const { fsm } = this;
    fsm[fsm.getState()].del();
  }
}
// 开始下载
let download = new Download(FSM);
download.handleClick(); // 暂停下载
download.handleClick(); // 继续下载
download.hanldeDel(); // 下载中，无法执行删除操作
download.handleClick(); // 暂停下载
download.hanldeDel(); // 删除任务
```

## 策略模式

#### 定义

把一系列"可互换的"算法封装起来,并根据用户需求来选择其中一种.

核心是将算法的使用和算法的实现分离,算法的实现交给策略类,算法的使用交给环境类,环境类会根据不同的情况选择合适的算法.

#### 优缺点

需要了解所有的策略的异同点,才能选择合适的策略进行调用

#### 代码实现

```javascript
// 策略类
const strategies = {
  A() {
    console.log("This is stragegy A");
  },
  B() {
    console.log("This is stragegy B");
  }
};

// 环境类
const context = name => {
  return strategies[name]();
};

// 调用策略A
context("A");
// 调用策略B
context("B");
```

## 解释器模式

#### 定义

提供了评估语言的语法或表达式的方式

## 订阅-发布模式

#### 定义

定义了对象之间的一种一对多的依赖关系,当一个对象的状态发生改变时,所有依赖它的对象都可以得到通知

#### 订阅发布模式 VS 观察者模式

在订阅-发布模式中,订阅者和发布者之间有一个被抽象出来的信息调度中心

#### 代码实现

```javascript
const Event = {
  clientList: {},
  // 绑定事件监听
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
    return true;
  },
  // 触发对应事件
  trigger() {
    const key = Array.prototype.shift.apply(arguments),
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let fn of fns) {
      fn.apply(null, arguments);
    }
    return true;
  },
  // 移除相关事件
  remove(key, fn) {
    let fns = this.clientList[key];
    // 如果之前没有绑定事件
    // 或者没有指明要移除的事件
    // 直接返回
    if (!fns || !fn) {
      return false;
    }
    // 反向遍历移除置指定事件函数
    for (let l = fns.length - 1; l >= 0; l--) {
      let _fn = fns[l];
      if (_fn === fn) {
        fns.splice(l, 1);
      }
    }
    return true;
  }
};
// 为对象动态安装 发布-订阅 功能
const installEvent = obj => {
  for (let key in Event) {
    obj[key] = Event[key];
  }
};
let salesOffices = {};
installEvent(salesOffices);
// 绑定自定义事件和回调函数
salesOffices.listen(
  "event01",
  (fn1 = price => {
    console.log("Price is", price, "at event01");
  })
);
salesOffices.listen(
  "event02",
  (fn2 = price => {
    console.log("Price is", price, "at event02");
  })
);
salesOffices.trigger("event01", 1000);
salesOffices.trigger("event02", 2000);
salesOffices.remove("event01", fn1);
// 输出: false
// 说明删除成功
console.log(salesOffices.trigger("event01", 1000));
```

## 责任链模式

#### 定义

多个对象均有机会处理请求,从而解除发送者和接受者之间的耦合关系.这些对象连接成为链式结构,每个节点转发请求,直到有对象处理请求为止.

核心是请求者不必知道是哪个节点对象处理的请求,如果当前不符合终止条件,那么把请求转发给下一个节点处理.

当需求具有“传递”的性质时(代码中其中一种体现就是:多个`if、else if、else if、else`嵌套),就可以考虑将每个分支拆分成一个节点对象,拼接成为责任链

#### 优缺点

可以根据需求变动,任意向责任链中添加/删除节点对象

没有固定的开始节点,可以从任意节点开始

责任链最大的代价就是每个节点带来的多余消耗,当责任链过长,很多节点只具有传递作用,而不是真正的处理逻辑

#### 代码实现

```javascript
class Handler {
  constructor() {
    this.next = null;
  }

  setNext(handler) {
    this.next = handler;
  }
}

class LogHandler extends Handler {
  constructor(...props) {
    super(...props);
    this.name = "log";
  }

  handle(level, msg) {
    if (level === this.name) {
      console.log(`LOG: ${msg}`);
      return;
    }
    this.next && this.next.handle(...arguments);
  }
}

class WarnHandler extends Handler {
  constructor(...props) {
    super(...props);
    this.name = "warn";
  }

  handle(level, msg) {
    if (level === this.name) {
      console.log(`WARN: ${msg}`);
      return;
    }
    this.next && this.next.handle(...arguments);
  }
}

class ErrorHandler extends Handler {
  constructor(...props) {
    super(...props);
    this.name = "error";
  }

  handle(level, msg) {
    if (level === this.name) {
      console.log(`ERROR: ${msg}`);
      return;
    }
    this.next && this.next.handle(...arguments);
  }
}

/******************以下是测试代码******************/

let logHandler = new LogHandler();
let warnHandler = new WarnHandler();
let errorHandler = new ErrorHandler();

// 设置下一个处理的节点
logHandler.setNext(warnHandler);
warnHandler.setNext(errorHandler);

logHandler.handle("error", "Some error occur");
```

## 迭代器模式

#### 定义

提供一种方法顺序访问一个集合对象的各个元素,使用者不需要了解集合对象的底层实现

#### 内部迭代器,外部迭代器

内部迭代器: 封装的方法完全接手迭代过程,外部只需要一次调用

外部迭代器: 用户必须显式请求迭代下一元素

#### 代码实现

```javascript
const Iterator = obj => {
  let current = 0;
  let next = () => (current += 1);
  let end = () => current >= obj.length;
  let get = () => obj[current];

  return {
    next,
    end,
    get
  };
};

let myIter = Iterator([1, 2, 3]);
while (!myIter.end()) {
  console.log(myIter.get());
  myIter.next();
}
```

