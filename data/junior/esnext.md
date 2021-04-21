# let、const 的异同

1. 都是块级作用域
2. 无法变量提升，存在 TDZ
3. let 可修改引用，const 不可以

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

# Generator 的基本用法

yield/throw/next

# 如何取消 fetch

使用 AbortController

```js
const controller = new AbortController()
const signal = controller.signal

fetch( url, { signal } )

controller.abort()
```
