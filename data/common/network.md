# 301 和 302

- 301 永久重定向，资源永久转移，比如更换了域名
- 302 临时重定向，比如登录后的临时跳转

# 401 和 403

- 401 Unauthorized 表示未登录认证（潜台词：希望客户端携带凭证再次访问）
- 403 Forbidden 没有权限，拒绝执行（潜台词：就是没有权限，不是技术上能解决的，不要再请求该资源）

# 使用 301 强制 https 存在什么问题？有更好的方案吗

使用 301 重定向，第一次请求仍然是 http 的，仍然存在被攻击的风险

# TCP 和 UDP 的区别

- TCP 面向字节流
- UDP 面向报文

# TCP 协议中的序列号有什么用

丢失重发 & 去重 & 排序

# TCP 粘包问题

# TCP 建立连接 为什么是三次握手？

**三次是建立相对可靠连接的最小次数，两次不够，四次多余**。其实无论多少次握手，信道都**不是完全可靠**的（参考两军问题），三次握手只是保证了信道最基本的**"可用性"，双方能收能发**

建连过程将最终的控制权交给了发送方，原因在于网络是分布式的，没有绑定一个全局时钟来生成序列号，所以只有发送方才知道某个 序列号 是否过期，需要由发送方来验证，再通过 ACK 确认建立连接或者 RST 中止连接

# TCP 建立连接时，三次握手做了什么事情

1. 确认了**双方能收能发**，信道相对可靠
2. **交换**了彼此的**初始序列号** ISN

```
TCP A                                                TCP B

1.  CLOSED                                               LISTEN

2.  SYN-SENT    --> <SEQ=100><CTL=SYN>               --> SYN-RECEIVED

3.  ESTABLISHED <-- <SEQ=300><ACK=101><CTL=SYN,ACK>  <-- SYN-RECEIVED

4.  ESTABLISHED --> <SEQ=101><ACK=301><CTL=ACK>       --> ESTABLISHED

5.  ESTABLISHED --> <SEQ=101><ACK=301><CTL=ACK><DATA> --> ESTABLISHED

      Basic 3-Way Handshake for Connection Synchronization
```

> 示意图来自：
[RFC 793 - TCP](https://tools.ietf.org/html/rfc793#section-3.4)

# TCP 建立连接，如果使用两次握手，会有什么问题？

1. 首先两次握手，**只能保证 Sender -> Receiver 的单向传输可用**，Receiver -> Sender 方向传输可靠性仍是未知的
2. 其次，网络是不稳定的，**SYN 传输可能存在延迟和超时重发**，如果没有来自 Sender 的确认，可能会导致 Receiver 创建不必要的连接，造成资源浪费

# TCP 和两军问题

关于两军问题，可以网上搜一下。这个问题的直接原因在于，最后一次派遣 通信兵 的军队，都无法确认消息是否送达

# TCP 释放连接，为什么是四次挥手？为什么比建立连接的三次，多了一次

简言之，建立连接其实也可以是四次，只不过第二次和第三次可以合并，最终变成了三次。
而在挥手过程中，第二次和第三次无法合并，因为 Receiver 端存在一个半关闭状态，此时先回复了 ACK ，直到 Receiver 数据发送完毕，才会发送 FIN

看下过程
* step1:
  Sender向Receiver发出 FIN+SEQ 标记，表示Sender要主动关闭连接，停止发送数据
* step2:
  Receiver发出 ACK + SEQ 标记，发出确认回复，此时，Receiver进入**半关闭状态**（Sender已经没有数据发出了，但Receiver若发出数据，Sender要接收）**因为此时Receiver的数据不一定完全发送完了**
* step3:
  Receiver最后的数据发送完了，就向Sender发送 FIN+ACK 连接释放, 服务器此时进入了等待Sender最后确认的状态
* step4:
  Sender收到Receiver连接释放后，发出 ACK + SEQ 表示确认，服务器收到了Sender发出的确认后就立即进入了closed状态

所以可以看出，挥手多的一个步骤是在 step3, ACK 和 FIN 在 Receiver 分成了 2 步发出，如果 Receiver 再收到 Sender 发来的 FIN 后，如果没有数据传输了，那么 FIN+ACK 是可以合并的

> 参考资料：
> 1. [TCP的三次握手与四次挥手](https://blog.csdn.net/qzcsu/article/details/72861891)
> 2. [《图解http》](https://www.amazon.cn/dp/B00JTQK1L4)
> 3. [cs50-tcp](https://www.youtube.com/watch?v=GP7uvI_6uas&t=1s)
> 4. [cs50-http](https://www.youtube.com/watch?v=4axL8Gfw2nI)
> 5. [TCP 为什么是三次握手，而不是两次或四次？](https://www.zhihu.com/question/24853633)
> 5. [为什么 TCP 建立连接需要三次握手](https://draveness.me/whys-the-design-tcp-three-way-handshake/)

# 介绍下 HTTP/2 的一些新特性

- 二进制分帧（HTTP/1.1 中，头信息是文本格式，数据体可以是文本，也可以是二进制，而到了 HTTP/2，头信息和数据体都采用了二进制格式，统称为帧：头信息帧和数据帧）
- 多路复用
- header 压缩
- 服务器推送
- ...

> 参考
> 1. [HTTP/1.0、HTTP/1.1、HTTP/2、HTTPS](https://zhuanlan.zhihu.com/p/43787334)
> 2. [Introduction to HTTP/2](https://developers.google.com/web/fundamentals/performance/http2)

# 介绍下 HTTP/2 的头部压缩技术

在 HTTP/1 中，一般只有消息主体会经过压缩（ 比如 gzip ），但是状态行和头部没有经过任何压缩
HTTP/2 针对每个 TCP 连接，会在客户端和服务端维护一份静态字典、动态字典，加上哈弗曼编码，来对头部进行压缩，这种压缩格式简称 HPACK

> 参考资料：
> 1. [HTTP/2 头部压缩技术介绍](https://imququ.com/post/header-compression-in-http2.html)
> 2. [HPACK - Header Compression for HTTP/2 draft-ietf-httpbis-header-compression-12](https://tools.ietf.org/html/draft-ietf-httpbis-header-compression-12)

# 介绍下 HTTP/2 多路复用？

同一个域名下，多个请求可以复用同一个 TCP 连接

# 为什么 HTTP/1.x 无法多路复用，而 HTTP/2 可以？

因为 HTTP/1.x 交付模型保证每个连接每次只交付一个响应（响应排队），而在 HTTP/2 引入了二进制分帧机制后，突破了这个限制，不再依赖并发 TCP 连接来提升性能，每个数据流都可以拆成帧，并且这些帧可以交错发送，并在另一端重组

> 参考：
> 1. [Request and response multiplexing](https://developers.google.com/web/fundamentals/performance/http2#request_and_response_multiplexing)

# HTTP/2 哪些情况会复用连接

1. 同一个域名下的资源
2. 不同域名下的资源，需满足两个条件：域名解析到同一个 IP、使用同一个证书

# 介绍下 HTTP/2 服务器推送（Server Push）

服务器发送 HTML 后，需要等待浏览器解析 HTML 后发起内嵌资源的请求，才会响应 JavaScript、CSS、images 等资源，Server Push 允许服务器提前推送这些资源到浏览器(浏览器可以选择拒绝，比如已有缓存的情况)，消除了中间的等待时间

> 参考 [HTTP/2 FAQ](https://http2.github.io/faq/)

# 什么是队首阻塞

> 参考 [关于队头阻塞（Head-of-Line blocking），看这一篇就足够了](https://zhuanlan.zhihu.com/p/330300133)
