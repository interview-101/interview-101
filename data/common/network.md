# TCP 建立连接 为什么是三次握手？

第一次：client -> server，你能收到我的消息吗？

第二次：client <- server，能收到，你能收到我的消息吗？

第三次：client -> server，我也能收到你的消息

信道不可靠，至少需要三次握手来确保信道是**"可用的"**，**确保双方能收能发**

# TCP 释放连接 为什么是四次挥手

前两次用来释放 client -> server 方向的连接

后两次用来释放 client <- server 方向的连接

# 介绍下 HTTP/2 的一些新特性

- 采用了二进制格式传输数据（相比 HTTP/1.x 的文本格式）
- 多路复用
- header 压缩
- 服务器推送

# HTTP/2 多路复用？

同一个域名下，多个请求可以复用同一个 TCP 连接

# HTTP/2 服务器推送（Server Push）？

服务器发送完 HTML 的响应后，需要等待浏览器解析 HTML 发起内嵌资源的请求，才会响应 JavaScript、CSS、images，Server Push 允许服务器提前推送这些资源到浏览器的缓存中，消除了等待时间

> [HTTP/2 FAQ](https://http2.github.io/faq/)
