# cookie 有哪些属性，分别代表什么含义

Domain：cookie 所属的域名，
Path、Expires、Max-Age
Secure：在已经启用 https 的情况下，标记 Secure 可以让对应的 cookie 仅通过 https 发送
HttpOnly：标记 HttpOnly 的 cookie 只能通过网络传输，无法通过 JS 读取，避免 xss 攻击者获取 cookie 中的敏感信息

> servers that require a higher level of security SHOULD use the Cookie
   and Set-Cookie headers only over a secure channel.  When using
   cookies over a secure channel, servers SHOULD set the Secure
   attribute (see Section 4.1.2.5) for every cookie

> 参考：
> [HTTP State Management Mechanism](https://tools.ietf.org/html/rfc6265#section-8.3)
> [Cookie《JavaScript 标准参考教程（alpha）》](https://javascript.ruanyifeng.com/bom/cookie.html#toc4)
> [Secure your Cookies (Secure and HttpOnly flags)](https://blog.dareboost.com/en/2019/03/secure-cookies-secure-httponly-flags/)


# localStorage / sessionStorage 的区别？

使用 localStorage 存储的数据没有过期时间的设置，而存储在 sessionStorage 中的数据会在页面会话结束时被清除

# 如何定义 sessionStorage 的会话

sessionStorage 会在页面重新加载或恢复页面时保持原来的会话，在新标签页或窗口打开一个页面时会创建一个新的会话


# 如何检测 localStorage 是否为空

localStorage.length

# 和 Web 存储相关的事件


```js
window.addEventListener( 'storage', function ( e ) {  
  // e.key
  // e.oldValue
  // e.newValue
  // e.url
  // e.storageArea
} )
```

触发条件：Storage对象发生变化时（创建/更新/删除），重复设置相同的键值不会触发，Storage.clear至多触发一次

触发限制：在同一个页面内发生的改变不会起作用，在相同域名下的其他页面（如一个新标签页或iframe）发生的改变才会起作用
