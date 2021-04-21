# 从输入 URL 到页面加载完成，发生了什么？

1. DNS 查询
2. 建立 TCP 连接
3. ...

# 前端监控方案

可以分为两大类监控指标

**稳定性指标 & 性能指标**

1. 稳定性指标：
 - JS 异常
 - API 异常
 - 资源异常（比如 404）
 - 白屏率
 - ...
2. 性能指标：
 - 白屏时间
 - LCP/FID/CLS
 - 秒开率...

以及平台本身的告警能力，支持环比时间、阈值、告警渠道（邮件、短信、电话...）配置

# 如何做前端的错误监控

onerror
unhandledrejection

# 前端错误监控上报量过大，如何解决

- 添加采样率: random(0,1) < 0.x 才上报
- 配置 errorFilter
- 本地暂存，去重后批量上报

# 前端监控遇到 Script Error 如何解决

1. script 脚本添加 crossorigin="anonymous" 属性
2. 服务端添加允许跨域头 Access-Control-Allow-Origin: *

# 为什么一般打点上报使用 new Image 方式

1. 一般打点域名都是独立域名，new Image 不存在跨域
2. new Image 不像 script，需要插入到 DOM 中才会发送请求，不会引发频繁操作 DOM 带来的性能问题

> 参考：
> 1. [为什么前端监控要用GIF打点](https://mp.weixin.qq.com/s/v6R2w26qZkEilXY0mPUBCw)

# 如何在页面关闭前发送打点请求

1. 同步 xhr
2. navigator.sendBeacon

> 参考：
> 1. [如何在 Web 关闭页面时发送 Ajax 请求](https://zhuanlan.zhihu.com/p/68838820)
