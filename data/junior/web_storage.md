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
