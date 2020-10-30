---
title: Promise
date: 2020-08-20 09:15:00
tags: [JS基础, Promise, 异步编程]
categories: JS
---

# 异步编程之 Promise

为什么会出现异步编程,这个问题我们只要了解过 JS 执行环境`单线程`特点以及浏览器`事件循环`机制就能够得出答案,本文不对其进行详细解释.

我们直接从几个问题来讲解异步编程.

## 面试问答

### 问题一: 前端有哪些异步编程方案?

- 回调函数

  在 ES6 语法还没正式成为标准之前.由于在 JS 中,`函数是一个特殊的对象`,所以就有了将函数作为变量传入方法中,再在合适的时机调用函数,从而实现异步调用的方法.

  ```javascript
  var job1 = function(callback) {
    // do someting
    callback();
  };
  var job2 = function() {};
  job1(job2);
  ////////////////////////////////
  doSth1((...args) => {
    doSth2((...args) => {
      doSth3((...args) => {
        doSth4((...args) => {
          doSth5((...args) => {});
        });
      });
    });
  });
  ```

  上面只是一个简单的伪代码演示,不过不难看出,使用回调函数很容易就会出现回调嵌套,然后每个回调函数都得处理成功和失败的状态,从而导致代码可维护性和可理解性的大大降低,而这种情况,有一个专有名词--`回调地狱`.而回调函数的使用也会存在一个安全问题--控制反转,若是我们调用第三方 api 时,使用回调函数的方法,那么第三方 api 就可以决定什么时候回调,回调几次,如果涉及到敏感数据操作,这几乎是致命的问题.

  在当时背景下,优秀的开发者想出了几种方法去解决这个问题,其中最常用的就是

- 事件监听($emit, $on)

- 订阅者模式(EventBus)

- Promise

  ES6 的发布极大的提高了前端程序员的代码书写体验,其中 Promise 就是最重要的语法之一.回调函数被处理成了链式调用,更加符合常人思维,也更加容易被人接受,毕竟当年最火爆的 Jquery 就是链式调用的集大成者,包括现在很火的函数柯里化也是类似写法.虽然 Promise 依然有回调,但这是浏览器实现的标准,不再受个人所控制,则避免了控制反转的问题.

  ```javascript
  job1()
    .then(job2)
    .then(job3)
    .catch(err => {});
  ```

  在大量应用 Promise 后,人们又发现,Promise 的错误只能通过 catch 捕获,不怎么方便.

- Generator

  ES6 除了增加了 Promise 特性,Generator 也是其中新增的一种异步编程解决方案,只不过它的语法行为和传统函数完全不同.

  ```javascript
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  var hw = helloWorldGenerator();
  hw.next();
  // { value: 'hello', done: false }
  hw.next();
  // { value: 'world', done: false }
  hw.next();
  // { value: 'ending', done: true }
  hw.next();
  // { value: undefined, done: true }
  ```

  从这个例子我们可以看出一件事情,我们可以通过 next()方法,控制函数的执行或暂停.这是一件多么让人不可思议的事情,一般来说,函数一旦被调用,除非遇到 return 或报错,不然是不会停止执行的.

  关于 Generator 语法的特性以及应用后面再介绍.不过,有一个大家平时使用的非常多的语法糖,就是使用了此特性来实现的.

- async/await

  以书写同步代码的方式来编写异步代码,这简直就是神器.再也没有 Promise 的 then,catch,再也不会出现各种看不懂的嵌套,只有和普通函数一样的一行行执行的代码.

至此,第一个问题我们算是回答完成了,这篇文章的主角是 Promise,所以我们围绕它来展开讲.

### 问题二: Promise 通过什么手段解决回调地狱问题

三个手段: `回调函数延迟绑定`,`返回值穿透`,`错误冒泡`

```javascript
let promise = new Promise((resolve, reject) => {
  // do someting
  if (success) {
    resolve(data);
  } else {
    reject(error);
  }
});
promise()
  .then(data => {
    return promise();
  })
  .catch(error => {});
```

简单解释一下,结合上面的代码,我们应该就很容易理解这三大特性.

1. 回调函数延迟绑定: 回调函数是通过 then 方法传入进去的,而不像原来在函数调用时就得传入
2. 返回值穿透: then 中回调函数的返回值会被创建为 Promise,返回给外层,供后续 then 方法调用.这样两个特性就实现了 promise 的链式调用.
3. 错误冒泡: promise 内部的错误会不断传递,最后被 catch 捕获

### 问题三: 为什么 Promise 使用微任务

关于浏览器宏任务,微任务的问题,不在这篇文章讨论,只简单说一下,浏览器任务队列按照先进先出的方式执行任务.宏任务在执行完成后,会检查当前微任务队列中是否有任务,如果有,那么执行微任务,如果没有,那么执行下一个宏任务,至于宏任务微任务,怎么区分,这里不讲.

回到问题,Promise 使用微任务的目的就是为了处理回调.

处理回调有三种方式:

1. 同步回调,直到异步任务完成,再进行后面的任务. 这个方法会造成脚本阻塞,cpu 利用率低
2. 异步回调,将回调函数放在宏任务队列中. 此方法导致要等到回调前面所有宏任务执行完成才能回调,若是当前宏任务过长,则会等待很久,造成卡顿现象
3. 异步回调,将回调函数放到当前宏任务的微任务队列中. 这样就解决了同步阻塞和宏任务异步时间长的问题.

### 问题四: 如何编写一个符合 PromiseA+规范的 Promsie

首先贴上[PromiseA+规范](https://promisesaplus.com/)地址.

其实规范中主要讲的是两点:

1. Promise 是一个状态机,状态只能为`Pending`, `Fulfilled`, `Rejected` 三种状态,并且状态的变化是单向的,只能由`Pending -> Fulfilled` 或者 `Pending -> Rejected`,状态变更不可逆.
2. then 方法接收两个可选参数,分别对应状态改变时的回调.then 方法返回一个 promise,then 方法可以被同一个 promise 多次调用.

在此基础上,我们简单实现一下 Promise 以及其方法

```javascript
// Promise 的三种状态常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  // 构造方法,executor为带有 resolve 和 reject 两个参数的函数,Promise构造函数在执行时会立即调用executor函数
  constructor(executor) {
    // 初始化当前Promise状态
    this._status = PENDING;
    // 初始化Promise结果
    this._value = null;
    // 成功回调队列
    this._resolveQueue = [];
    // 失败回调队列
    this._rejectQueue = [];
    // Promise成功后执行此方法
    const _resolve = val => {
      const run = () => {
        // 单向状态流动,状态改变后不可再执行回调
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        this._value = val;
        while (this._resolveQueue.length) {
          // 按照回调队列顺序执行回调
          const callback = this._resolveQueue.shift();
          callback(val);
        }
      };
      // 此处使用setTimeout来实现Promise回调微任务添加(虽然此处是宏任务)
      setTimeout(run);
    };
    // Promise失败后执行此方法
    const _reject = err => {
      const run = () => {
        // 单向状态流动,状态改变后不可再执行回调
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        this._value = err;
        while (this._rejectQueue.length) {
          // 按照回调队列顺序执行回调
          const callback = this._rejectQueue.shift();
          callback(err);
        }
      };
      // 此处使用setTimeout来实现Promise回调微任务添加(虽然此处是宏任务)
      setTimeout(run);
    };
    // 立即执行executor函数
    executor(_resolve, _reject);
  }
  // 处理Promise的回调,并返回一个新的Promise以实现链式调用(回调函数延迟绑定,返回值穿透)
  then(resolveFn, rejectFn) {
    // 参数必须为函数
    typeof resolveFn !== 'function' ? (resolveFn = value => value) : null;
    typeof rejectFn !== 'function'
      ? (rejectFn = reason => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        })
      : null;
    // 返回新的Promise
    return new MyPromise((resolve, reject) => {
      // 重新包装resolveFn,当返回结果为Promise时,我们需要先收集其then回调,再收集外部then回调
      // 先进行then回调深度收集,再进行长度收集
      const fulfilledFn = value => {
        try {
          let x = resolveFn(value);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      };
      const rejectedFn = error => {
        try {
          let x = rejectFn(error);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      };
      // 根据当前Promise状态,执行不同操作
      switch (this._status) {
        case PENDING:
          // pending状态进行回调收集
          this._resolveQueue.push(fulfilledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        case FULFILLED:
          // fulfilled状态进行成功回调
          fulfilledFn(this._value);
          break;
        case REJECTED:
          // rejected状态进行失败回调
          rejectedFn(this._value);
          break;
      }
    });
  }
  // catch 捕捉错误,执行失败回调
  catch(rejectFn) {
    return this.then(undefined, rejectFn);
  }
  // 返回一个Promise实例,如果值不为Promise,则为fulfilled状态
  resolve(value) {
    return value instanceof MyPromise
      ? value
      : new MyPromise(resolve => resolve(value));
  }
  // 返回一个状态为rejecter状态的Promise实例
  reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
  // 返回一个新的Promise,等promiseArr中所有promise都成功才会触发,一旦有失败,则立即触发该Promise的失败,
  // 触发成功后,会把所  有promise的返回值按顺序放到数组中,作为该Promise的成功返回.
  all(promiseArr) {
    let index = 0;
    // 成功结果记录
    let result = [];
    return new MyPromise((resolve, reject) => {
      // 如果promiseArr数组为空,直接resolve
      if (promiseArr.length === 0) {
        resolve(result);
      }
      promiseArr.forEach((promise, i) => {
        // 遍历promiseArr,保证每个promise参数都是真正的Promise
        MyPromise.resolve(promise).then(
          val => {
            index++;
            result[i] = val;
            if (index === promiseArr.length) {
              // 等待所有Promise resolve,则返回
              resolve(result);
            }
          },
          err => {
            // 遇到错误,直接reject
            reject(err);
          }
        );
      });
    });
  }
  // 返回一个新的Promise, promiseArr中任意一个Promise成功或失败,马上也成功或失败
  race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      if (promiseArr.length === 0) {
        resolve([]);
      }
      for (let promise of promiseArr) {
        MyPromise.resolve(promise).then(
          value => {
            resolve(value);
          },
          err => {
            reject(err);
          }
        );
      }
    });
  }
  // 不管成功还是失败,Promise最后都会执行其中的代码,同时会返回一个新的Promise并将结果传递
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }
}
```
