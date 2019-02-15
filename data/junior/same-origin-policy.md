# 如何判断同源？

协议、域名、端口都相同

# 常见的跨域方案

- 窗口通信
  - document.domain

    <p style="font-size: 13px;">适用于二级域名相同，三级域名不同的场景，比如 <strong>a.example.com</strong> 和 <strong>b.example.com</strong></p>
  - hash + hashchange
  - window.name
  - postMessage

- 异步请求
  - JSONP
  - WebSocket
  - CORS

# JSONP 有什么限制？

只能发送 GET 请求

# 为什么 WebSocket 没有同源策略的限制

浏览器发送了 `Origin` 请求头，服务端可以对此进行校验

# 描述下预检请求（Preflight request）


# form 表单可以跨域吗？

可以，因为表单提交后会刷新页面，原页面的js拿不到响应内容
