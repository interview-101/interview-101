# 箭头函数和普通函数有什么区别

- 没有自己的 this，使用 call / apply / bind 时第一个参数会被忽略
- 没有 arguments
- 不能用作构造函数，无法 new，无 prototype
- 不能用来定义 generator（内部不能使用yield）

# 描述下暂时性死区（Temporal Dead Zone）

```js
function do_something() {
  console.log( bar ) // undefined
  console.log( foo ) // ReferenceError
  var bar = 1
  let foo = 2
}
```

let 没有变量提升，在声明执行前，访问使用 let 定义的变量，会导致一个 ReferenceError（const 也一样）
