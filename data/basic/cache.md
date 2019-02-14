# 常见的缓存类型

按缓存位置分：

- Service Wroker
- Memory Cache
- Disk cache

按失效策略分：

- 强缓存
- 协商缓存

# 缓存查找的顺序

自上而下，找到则返回，否则继续

1. Service Worker
2. Memory Cache
3. Disk Cache
4. (网络请求)

# 如何区分强缓存和协商缓存

- 200(from cache)：强制缓存
- 304(Not Modified)：协商缓存

# Cache from Memory 和 Cache from Disk 的区别

Cache from Memory 是浏览器自身的优化行为，它不受 HTTP 协议头控制（no-store是例外）；
Cache from Disk 才是我们平时提到的 HTTP Cache；

# Cache-Control 的配置决策树

<p>
  <img width="400" src="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/images/http-cache-decision-tree.png" alt="http-cache-decision-tree">
</p>

# 缓存相关的 headers，以及他们是如何生效的

- **Cache-Control** (HTTP/1.1)

  定义缓存策略，比如何时可以缓存/可以缓存多久

  **可缓存性：**

  - no-cache: 每次需要先和服务器通信，确认资源未发生变化（如果存在ETag），才允许使用之前的缓存
  - no-store: 不允许缓存响应，每次请求都必须完整获取
  - public: 可以被浏览器或中间存储缓存（即使存在 HTTP 身份验证）
  - private: 可以被浏览器缓存，但不能被中间存储缓存（比如 CDN）

  **过期时间：**

  - max-age: 单位秒，比如 `max-age: 120` 表示可缓存120s

- **ETag**

  资源更新检查

  第一次浏览器会拿到ETag，如果缓存过期，会在`If-None-Match`的header带上ETag的值，和服务器确认资源是否发生变化，如果未发生变化，服务器会响应`304 Not Modified`，可以再延用max-age时间的缓存

  我们要做的是确保服务端返回ETag header，后续的事情浏览器会替我们完成

# 如何让客户端更新被缓存的资源

如果资源被客户端缓存，在缓存失效前，在不更改资源网址的情况下，是没办法做到的，所以我们在资源内容发生变化时，需要更改它的网址，强制用户重新下载

# HTTP Cache 实践举例

- html - Cache-Control: no-cache
- js/css - Cache-Control: max-age=31536000
- image - Cache-Control: max-age=86400

# Cache-Control 默认值/行为

TODO

# Cache-Control max-age=0 和 no-cache 的关系

no-cache 等价于 max-age=0, must-revalidate

<!--
参考：
https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
https://mp.weixin.qq.com/s/cUqkG3NETmJbglDXfSf0tg
https://tools.ietf.org/html/rfc7234#section-5.2.1
-->
