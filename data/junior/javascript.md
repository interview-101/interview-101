# JavaScript 中有哪些内置类型

6大基本类型 和 对象

# JavaScript中的基本类型

- null
- undefined
- boolean
- number
- string
- symbol

# 如何区分 JavaScript 中的 6 大基本类型

`typeof` 可以区分除了 `null` 以外的其他基本类型

想要区分所有基本类型可以使用

```js
Object.prototype.toString.call()
```

```
null -> [object Null]
undefined -> [object Undefined]
number -> [object Number]
string -> [object String]
boolean -> [object Boolean]
symbol -> [object Symbol]
```

# JavaScript 是如何做隐式类型转换的

# === 和 == 有什么区别，什么时候使用 ==？

- == 会做隐式的类型转换，转换过后再进行比较
- === 不会做类型转换，如果类型不同，会直接返回 false

大多数时候应该杜绝使用 ==，因为这会让你的代码意图不清晰

如果你不知道某个值的类型，可以显式地进行类型转换，比如

```js
if ( Number( x ) === 1 ) {
  // ...
}
```

# 描述下 JavaScript 中的垃圾回收机制
