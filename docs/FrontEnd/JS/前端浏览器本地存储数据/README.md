# 浏览器本地存储数据--Cookie,localstorage,sessionStorage,IndexedDB

随着web应用程序的出现,产生了对能够直接在客户端存储用户信息能力的要求,于是cookie就此诞生

## Cookie

cookie是浏览器提供的一小块保存在本地的数据,与具体的Web页面或站点相关.

### cookie特点

* 不同浏览器存放cookie位置不同,不能通用
* 数据存储在客户端,会在浏览器向同一服务器发送请求时被携带并发送到服务器上
* 不可跨域,每个cookie绑定单一域名,无法在其他域名下获取和使用,一级域名和二级域名之间可通过设置cookie的domain信息实现cookie共享
* 一个域名下存放的cookie的个数和大小都是由限制的,一般为20个,小于4k
* cookie默认过期时间是浏览器会话结束时,也可手动设置过期时间

`因为cookie会被浏览器自动添加到请求头中发送给服务器,所以cookie很适合用来存储用户验证信息`

### cookie操作

* 设置cookie
```
document.cookie = 'name=hertz';
document.cookie = 'name=hertz;domain=www.baidu.com';
```
`注意: 虽然设置cookie的操作看着像是在给cookie赋值,但其内部并不是赋值操作,而是一个字符串拼接操作`
![cookie设置](./images/cookie1.png)

* 修改cookie,重新给key赋值就行
```
document.cookie = 'name=hertz11';
```

* 删除cookie,把要删除的cookie的过期时间设置为已经过去的时间
```
document.cookie = 'name=hertz11;expires=Mon, 06 Jan 2020 03:00:45 GMT';
```

* 获取cookie,document.cookie可以直接获取所有cookie组成的字符串,使用分号加空格隔开

由于cookie本身的一些限制,于是又出现了其他的用于存储大量信息的手段.

## sessionStorage

sessionStorage对象存储特定于某个会话的数据,该数据只保持到浏览器关闭

### sessionStorage特点

* 和cookie类似,也会在浏览器关闭后清除
* 存储在sessionStorage中的数据可以跨越页面刷新而存在,同时有些浏览器在崩溃重启后依然可用
* sessionStorage依然只能在单个页面使用,不能跨浏览器tab共享
* 对sessionStorage的操作会触发storage事件
* sessionStorage是挂载在window上的Storage实例,可直接使用,不需要手动实例化

### sessionStorage操作

* 设置sessionStorage
```
sessionStorage.setItem('name', 'hertz');
sessionStorage.name = 'hertz';
```

* 修改sessionStorage
```
sessionStorage.setItem('name', 'hertz11');
sessionStorage.name = 'hertz11';
```

* 删除sessionStorage
```
delete sessionStorage.name;
sessionStorage.removeItem('name');
sessionStorage.clear(); // 全部删除
```

* 获取sessionStorage值
```
sessionStorage.name;
sessionStorage.getItem('name');
```

## localStorage

HTML5规范中提出的一种持久保存客户端数据的方案.要访问同一个localStorage对象,页面必须来自同一个域名(子域名无效),使用同一种协议,在同一个端口.

### localStorage特点

* 数据持久存储,除非调用js方法或清除浏览器缓存,不然数据不会过期
* 存储信息在同一个域中共享,受同源策略限制
* 对localStorage的操作会触发storage事件
* 和sessionStorage一样,localStorage也是挂载在window上的Storage实例,可直接使用,不需要手动实例化

### localStorage操作

`localStorage和sessionStorage都继承自Storage,所以它的操作api和sessionStorage一致.`

`注意: 对localStorage和sessionStorage的修改会触发storage事件,可以通过监听变化实现跨页面通信的操作`

## IndexedDB

IndexedDB是在浏览器中保存结构化数据的一种数据库,所有的操作都是异步执行的.IndexedDB是一个类似MySQL这样的数据库,只不过不是使用表来存储数据,而是使用对象来保存数据,一个IndexedDB数据库,就是一组位于相同命名空间下的对象的集合.