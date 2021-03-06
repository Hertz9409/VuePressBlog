# Cookie,Session,Token,Oauth和JWT

## 认证(Authentication)、 授权(Authorization) 和 凭证(Credentials)

* 通俗得讲,认证就是验证当前用户的身份,就是证明你是你自己,例如身份证认证就是一种认证,还有用户密码登录,手机号验证码等
* 授权是指用户授予第三方可以访问该用户某些资源的权限,例如手机APP可以访问相册,通讯录等,小程序可以访问微信信息等
* 凭证是实现认证和授权的前提,是一种媒介(证书),标记访问者身份,例如身份证就是一个证书凭证

## Cookie

cookie是浏览器提供的一小块保存在本地的数据,与具体的Web页面或站点相关.

cookie特点:

* 数据存储在客户端,会在浏览器向同一服务器发送请求时被携带并发送到服务器上
* 不可跨域,每个cookie绑定单一域名,无法在其他域名下获取和使用,一级域名和二级域名之间可通过设置cookie的domain信息实现cookie共享

cookie属性:

| 属性 | 说明 |
| --- | --- |
| name=value | 键值对,设置cookie的名称以及对应的值,必须为字符串 |
| domain | 指定cookie所属域名,默认为当前域名 |
| path | 指定cookie在哪个路径(路由)下生效,默认'/' |
| maxAge | cookie失效时间,单位秒.如果为负数,表示cookie为临时cookie,关闭浏览器(不是当前tab页)即失效,如果为0,则表示删除该cookie,默认为-1 |
| expires | 过期时间,在设置某个时间点后该cookie失效 |
| secure | 该cookie是否仅被使用安全协议传输,如https,ssl等 |
| httpOnly | 设置该属性后,cookie将无法通过js脚本读取和操作,可一定程度上防止XSS攻击 |

## Session

Session是一种基于cookie实现的另一种记录服务器和客户端会话状态的机制.session保存在服务器端,sessionid保存在浏览器的cookie中.

### Session认证流程

* 用户第一次请求服务器时,服务器根据用户提交的信息,创建对应的Session
* 请求返回时将此Session的唯一标识SessionID返回给浏览器
* 浏览器接收到服务器返回的SessionID后,会将信息保存入Cookie中
* 当用户第二次访问服务器时,请求会自动判断此域名下是否存在Cookie,如果有,会自动将Cookie信息发送到服务器,服务器从Cookie中获取SessionID,再根据SessionID查找对应的Session信息,如果没有找到说明用户没有登陆或登陆失效,如果找到了Session证明用户已经登陆可执行后续操作

`公司的统一安全中心用户验证就是基于此原理`

## Cookie和Session的区别

* 安全性: Session比Cookie安全,Session存储在服务器,Cookie存储在客户端
* 存取值的类型不同: Cookie只支持字符串数据,想要使用其他类型,需要类型转换.Session可以时任意类型的数据
* 有效期不同: Cookie可设置长时间有效,Session一般失效时间较短,客户端关闭或Session超时都会失效
* 存储大小不同: 单个cookie保存的数据不能超过4k,Session可存储数据远高于cookie,但是当访问量过多时,会占用过多的服务器资源,毕竟Session信息保存在内存中

## Token(令牌)

### Access Token
* 访问资源(如API)时所需要的资源凭证
* token组成: uid(用户唯一身份标识) + time(时间戳) + sign(签名,token使用hash算法压缩后的字符串)
* 特点:

    * 服务端无状态化,可扩展性好
    * 支持移动端设置(移动设备对cookie支持较差)
    * 安全(签名验证)
    * 支持跨程序调用 

* token验证流程:

    1.客户端使用用户名密码登陆,服务端接收请求,验证信息
    2.验证成功后,服务端签发一个token并发送给客户端
    3.客户端收到token后保存,并在每次向服务器请求时携带此token
    4.服务端收到请求,验证token,验证成功,就返回数据

* 注意事项:

    * 每次请求都需要携带token,需要把token放到Http的header中
    * 基于token的用户认证是一种服务端无状态的认证方式,服务端不存放token数据,用解析token的计算时间换取session的存储空间,从而减轻服务器压力
    * token完全由应用管理,可以避开同源策略

### Refresh Token

* 专门用于刷新access token的token.如果没有refresh token,刷新token后,原来的token失效,用户需要重新输入账户密码获取新的token.而使用refresh token,可以减少麻烦,优化体验
* Access Token有效期较短,当Access token因过期而失效时,使用Refresh Token可获取到新的token,如果Refresh Token也失效,那只能重新登陆
* Refresh Token及过期时间存储在服务器数据库中,只有在申请新的Access token时才会验证,不会对业务接口响应时间造成影响,也不需要像Session一样一致保持在内存中

![refresh-token验证流程](./Images/refresh-token.png)

## Token和Session区别

* Session是一种记录服务器和客户端会话状态的机制,使服务端有状态化,可以记录会话信息.而token是令牌,是访问资源时所需要的资源凭证,token使服务端无状态化,不会存储会话信息
* 作为身份认证,token比session安全,token带有签名可防止被篡改,而session必须依赖链路层来保障通讯安全
* 如果用户数据需要和第三方共享,或允许第三方调用API,那么使用token,如果只是自己的网站或app访问,两者都可以使用

## OAuth2(开放授权)

OAuth是一个开放标准,允许用户授权第三方应用访问他们存储在另外的服务提供者上的信息,而不需要将用户名密码提供给第三方应用或分享他们数据的所有内容.(如第三方网页使用qq登陆)

OAuth2是OAuth的延续版本,并完全替代OAuth,OAuth2可以为web应用,桌面应用,移动应用提供授权流程.

### 授权流程
* 用户打开客户端后,客户端要求用户给予授权
* 用户同意授权,客户端使用获取到的授权,向认证服务器申请令牌
* 认证服务器对客户端进行认证后,确认无误,同意发放令牌
* 客户端使用令牌,向资源服务器申请获取资源
* 资源服务器确认令牌无误,同意向客户端开放资源

### 授权协议
* 授权码模式: 适用于所有有Server端的应用,是功能最完整,流程最严密的授权模式,特点是通过客户端后台服务器与服务提供商认证服务器互动

    * 用户访问客户端,客户端将用户导向认证服务器
    * 用户选择是否给客户端授权
    * 给予授权,认证服务器将用户导向客户端事先指定的重定向url并附上授权码
    * 客户端获取到授权码,客户端后台服务器通过授权码向认证服务器申请令牌,并提供重定向url
    * 认证服务器核对授权码和重定向url,确认无误后,向客户端发送访问令牌和更新令牌

* 简化模式: 适用于没有Server端配合的应用,不通过第三方应用程序的服务器,直接在浏览器中向认证服务器申请令牌,跳过授权码步骤

    * 客户端将用户导向认证服务器,用户授权
    * 授权后,认证服务器将用户导向客户端指定的重定向url,并在url中包含令牌
    * 浏览器向资源服务器发出请求,资源服务器返回一个网页,其中包含的代码可以获取令牌
    * 浏览器执行上一步获得的脚本,提取令牌,浏览器将令牌发给客户端

* 密码模式: 适用于受信任客户端应用,客户端直接使用用户提供的账户密码获取授权
* 客户端模式: 适用于客户端调用主服务API型应用,这种模式下,用户直接向客户端注册,客户端以自己的名义要求服务提供商提供服务,不存在授权问题

## JWT(JSON Web Token)

JWT是一种认证授权机制,是目前最流行的跨域认证解决方案,是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准.一般被用来在身份提供者和服务提供者间传递被认证的用户信息,可以使用HMAC算法或RSA加密算法对JWT进行签名

### JWT数据结构

![JWT数据结构](./Images/jwt.jpg)
它是一个很长的字符串,中间使用`.`分隔成三部分: Header,Payload,Signature

#### Header
是一个JSON对象,藐视JWT元数据,通常像这样:
```
{
    "alg": "HS256",
    "typ": "JWT"
}
```
alg属性表示签名算法,默认HMAC SHA256;typ属性表示令牌(token)类型
#### Payload
是一个JSON对象,存放实际需要传递的数据,JWT规定了7个官方字段:

* iss(issuer): 签发人
* exp(expiration time): 过期时间
* sub(subject): 主题
* aud(audience): 受众
* nbf(Not Before): 生效时间
* iat(Issued At): 签发时间
* jti(JWT ID): 编号

除了官方字段,也可以定义私有字段

`注意,JWT默认是不加密的,任何人都可以读取,不要把秘密信息放在这个部分`
#### Signature
对前两部分的签名,防止数据被篡改

`由于JWT有时会被放到url地址中作为参数使用,所以使用base64URL算法转码.使用时推荐将JWT信息放在HTTP请求头信息的Authorization字段中.`

### JWT特点

* 默认不加密,也可以加密
* 不加密时,不能将秘密数据写入JWT
* 不仅可以用于认证,也可用于交换信息,有效使用JWT,可降低服务器查询数据库次数
* 由于服务器不保存Session状态,无法在使用过程中废止某个token或修改token权限,也就是说,一旦JWT签发,在到期前始终有效,除非服务器部署额外逻辑
* JWT本身包含认证信息,一旦泄露,任何人都可以获得该令牌的所有权限,为减少盗用,JWT有效期应该设置得比较短
* 为减少盗用,建议使用HTTPS协议传输

## Token和JWT区别
共同点:

* 都是访问资源得令牌
* 都可以记录用户信息
* 都使服务端无状态化
* 都只是验证成功后,客户端才能访问服务端上受保护的资源

不同点:

* 服务端验证客户端token时,还需要查询数据库获取用户信息,然后验证token是否有效
* 将token和payload加密存储于客户端,服务端只需要使用密钥解密校验即可,不需要查询或减少数据库查询,因为JWT包含了用户信息和加密数据


## 使用cookie的注意事项
* 因为存储在客户端,容易被客户端篡改,使用前需要验证合法性
* 不要存储敏感数据,比如用户密码,账户余额
* 使用`httpOnly`在一定程度上提高安全性
* 尽量减少`cookie`的体积,能存储的数据量不能超过4kb
* 设置正确的`domain`和`path`,减少数据传输
* cookie无法跨域
* 一个浏览器针对一个网站最多存20个Cookie,浏览器一般只允许存放300个Cookie
* 移动端对cookie的支持不是很好,而session需要基于cookie实现,所以移动端常用的是token

## 使用session的注意事项
* 将session存储在服务器里面,当用户同时在线量比较多时,session会占据较多的内存,需要在服务端定期的去清理过期的session
* 当网站采用集群部署的时候,会遇到多台web服务器之间如何做session共享的问题.因为session是由单个服务器创建的,但是处理用户请求的服务器不一定是那个创建session的服务器,那么该服务器就无法拿到之前已经放入到session中的登录凭证之类的信息了
* 当多个应用要共享session时,除了以上问题,还会遇到跨域问题,因为不同的应用可能部署的主机不一样,需要在各个应用做好cookie跨域的处理
* sessionId是存储在cookie中的,假如浏览器禁止cookie或不支持cookie怎么办?一般会把sessionId跟在url参数后面,所以session不一定非得需要靠cookie实现
* 移动端对cookie的支持不是很好,而session需要基于cookie实现,所以移动端常用的是token

## 使用Token的注意事项
* 如果你认为用数据库来存储token会导致查询时间太长,可以选择放在内存当中.比如`redis`很适合你对token查询的需求
* token完全由应用管理,所以它可以避开同源策略
* token可以避免CSRF攻击(因为不需要cookie)
* 移动端对cookie的支持不是很好,而session需要基于cookie实现,所以移动端常用的是token

## 使用JWT的注意事项
* 因为JWT并不依赖Cookie的,所以为使用任何域名提供API服务而不需要担心跨域问题
* JWT默认是不加密,但也是可以加密的.生成原始Token以后,可以用密钥再加密一次
* JWT不加密的情况下,不能将秘密数据写入JWT
* JWT不仅可以用于认证,也可以用于交换信息.有效使用JWT,可以降低服务器查询数据库的次数
* JWT最大的优势是服务器不再需要存储Session,使得服务器认证鉴权业务可以方便扩展.但这也是JWT最大的缺点:由于服务器不需要存储Session状态,因此使用过程中无法废弃某个Token或者更改Token的权限.也就是说一旦JWT签发了,到期之前就会始终有效,除非服务器部署额外的逻辑
* JWT本身包含了认证信息,一旦泄露,任何人都可以获得该令牌的所有权限.为了减少盗用,JWT的有效期应该设置得比较短.对于一些比较重要的权限,使用时应该再次对用户进行认证
* JWT适合一次性的命令认证,颁发一个有效期极短的JWT,即使暴露了危险也很小,由于每次操作都会生成新的JWT,因此也没必要保存JWT,真正实现无状态
* 为了减少盗用,JWT不应该使用HTTP协议明码传输,要使用HTTPS协议传输

## 集群环境下Session共享方案
* session复制: 任何一个服务器上的session发生改变,该节点会把session内容序列化,然后广播给所有其他节点,保证session同步

优点: 可容错,各服务器间session实时响应

缺点: 对网络负荷造成压力,如果session量大会造成网络堵塞,拖慢服务器性能

* 粘性session/ip绑定策略: 采用Nginx中的ip_hash机制,将某个ip的所有请求定向到同一台服务器,这样就将用户ip和某台服务器绑定

优点: 简单,不需要对session处理

缺点: 缺乏容错性,一旦服务器故障,用户被转移到其他服务器,session信息丢失

* session共享: 使用分布式缓存方案,将session存储到redis缓存服务器中

优点: 可扩展,服务器重启不丢失session,可跨服务器跨平台共享session

缺点: 架构复杂,需要访问一次redis

* session持久化: 将session数据保存到数据库

优点: 服务器故障,session不丢失

缺点: 网站访问量大,保存session对数据库压力大

## 当关闭浏览器后,session就失效了?
不对,由于session一般保存在cookie中,当关闭浏览器后,cookie清除,所以下次访问系统时需要创建新的session,给人造成关闭浏览器,session失效的错觉.所以服务器需要为session设置失效时间,当距离客户端上次使用session超过失效时间时,认为客户端停止活动,清除session.


参考: [傻傻分不清之Cookie,Session,Token,JWT](https://juejin.im/post/5e055d9ef265da33997a42cc), [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)


## 2020-04-01 更新 SameSite

chrome80版本以后,google将浏览器SameSite属性从None改为了Lax,导致第三方cookie失效.

### SameSite作用

SameSite属性可以让cookie在跨站请求时不会被发送,从而阻止跨站请求伪造攻击(CSRF)

### 属性值

1. Strict 仅允许第一方请求携带cookie,即浏览器将只发送相同站点(当前网页url与请求目标url完全一致)请求的cookie
2. Lax 允许部分第三方请求携带cookie
3. none 无论是否跨站都会发送cookie

`跨域是浏览器同源策略中的概念,同源策略要求两个url地址协议,主机名,端口一致,否则跨域.而跨站和同站概念对应,等价于第三方和第一方,只需要url地址的有效顶级域名和二级域名相同就行`

### 改变

|请求类型|实例|以前|Strict|Lax|None|
|-|-|-|-|-|-|
|链接|`<a href=''></a>`|发送cookie|不发送|发送cookie|发送cookie|
|预加载|`<link rel='prerender' href=''/>`|发送cookie|不发送|发送cookie|发送cookie|
|get表单|`<form method='GET' action=''>`|发送cookie|不发送|发送cookie|发送cookie|
|post表单|`<form method='POST' action=''>`|发送cookie|不发送|不发送|发送cookie|
|iframe|`<iframe src=''></iframe>`|发送cookie|不发送|不发送|发送cookie|
|ajax|`$.get()`|发送cookie|不发送|不发送|发送cookie|
|image|`<img src=''>`|发送cookie|不发送|不发送|发送cookie|

### 解决方案

后台传递cookie时将SameSite属性设置为None.
`注意: chrome正在测试启用一个新的特性来保证cookie的安全,在SameSite设为none的情况下,必须添加Secure属性,即必须开启https特性.`

最好的解决方案还是修改鉴权和用户标识方案,使用JWT来实现.JWT利用请求头的Authorization字段来传递信息.