# 实施监督系统对接基础信息平台统一登录

方案一: 整个实施监督系统前后台由平台网关代理,后台修改接口,前端无需修改

方案二: 前后台修改

- 后台调用平台提供的接口同步平台用户信息

- 后台修改或新增登录接口,通过平台提供的`connid`和`token`校验用户信息进行系统登录(具体校验规则询问陈艳平)

- 前端集成网关探针文件,使用`script`标签在 head 下引入登录 js 库文件

- 修改登录逻辑

  - 在系统初始化时调用 GreatWall.sso 接口,获取用户信息(此时若没有登录,可以跳转到平台登录页登录)

    <img src="./assets/image-20210115105205553.png" alt="获取平台用户信息" style="zoom:50%;" />

  - 对比接口返回的用户信息和本地 cookie 保存的用户信息是否一致

    - 如果一致,则表示本地保存用户信息有效
    - 如果信息不一致,则需要清除本地保存的用户信息并将新的用户信息写入本地 cookie

    <img src="./assets/image-20210115105250792.png" alt="判断cookie信息是否有效" style="zoom:50%;" />

  - 读取最新的用户信息,使用`connid`和`token`调用后台提供的接口,登录实施监督信息系统,若登录失败,则清理本地信息并重新跳转到基础信息平台登录页面

    <img src="./assets/image-20210115105422909.png" alt="使用新接口登录" style="zoom:50%;" />

  - 用户登出时调用 GreatWall.logout 接口,清除用户信息并重新跳转到平台登录页面

    <img src="./assets/image-20210115105524088.png" alt="用户登出" style="zoom:50%;" />

- 接入平台代理服务时,需要提供平台用户 cookie 信息,在开始调用 sso 接口时,平台已经将 cookie 信息写入浏览器.

  - 针对 ArcGIS API,我们需要将平台 IP 端口地址配置进可信服务列表(esriConfig.request.trustedServers)
  - 真的一般的 ajax 请求,我们需要设置允许携带 cookie
  - 针对新版本浏览器的 samesite 策略,平台将 token 写入本地 localStroage 并添加自定义请求头,所以系统在清理 localStroage 时注意过滤名为`greatwall-token`的值.
