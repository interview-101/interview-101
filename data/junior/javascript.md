# JavaScript 中有哪些内置类型

6大基本类型 和 对象

# JavaScript中的基本类型

- null
- undefined
- boolean
- number
- string
- symbol
- object

# 如何区分 JavaScript 中的 6 大基本类型

`typeof` 可以区分除了 `null` 以外的其他基本类型

想要区分所有基本类型可以使用

```javascript
Object.prototype.toString.call()
```

- null -> [object Null]
- undefined -> [object Undefined]
- number -> [object Number]
- string -> [object String]
- boolean -> [object Boolean]
- symbol -> [object Symbol]

# JavaScript 是如何做隐式类型转换的

# === 和 == 有什么区别，什么时候使用 ==？

- == 会做隐式的类型转换，转换过后再进行比较
- === 不会做类型转换，如果类型不同，会直接返回 false

## 原始类型转换的规则
原始类型转换大致可以分为下面3类和2条特殊规则

- 1.to string   
隐式转换发生在用一个字符串进行+操作的二元运算

```javascript
123 + ''    // implicit
```

- 2.to boolean
隐式转换发生在使用了（ || && ！）进行逻辑运算时

```javascript 
if (2) { ... }      // implicit due to logical context
!!2                 // implicit due to logical operator
2 || 'hello'        // implicit due to logical operator
```
除了下面列出的值为false, 其余的都为true

```javascript
Boolean('')         // false
Boolean(0)          // false
Boolean(-0)         // false
Boolean(NaN)        // false
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(false)      // false
```
所以除了它以外的都是true

```javascript
Boolean({})             // true
Boolean([])             // true
Boolean(Symbol())       // true
!!Symbol()              // true
Boolean(function() {})  // true
```

- 3.to number
进行 to number 的隐式转换比较多，下面列一下可能会发生的情况：
    - 比较运算 (>, <, <=, >=)
    - 按位运算 (|, &, ^, ~)
    - 算术运算（- + * / %）
    - == 和 ！=
    - 一元运算 +
注意当 == 的左右都是字符串时，不会进行to number的隐式转换

```javascript
Number([]);                    //0
Number(undefined)              // NaN
Number({});                    // NaN
Number(null)                   // 0
Number(true)                   // 1
Number(false);                 //0
Number(" 12 ")                 // 12
Number("-12.34")               // -12.34
Number("\n")                   // 0
Number(" 12s ")                // NaN
Number(123)                    // 123
```

- 4.当用 == 和 ```null``` 或者 ```undeinfed``` 进行运算时，是不会发生numeric 转换的。 ```null```只==```null```或者```undefined```!
```javascript
null == 0               // false
null == null            // true
undefined == undefined  // true
null == undefined       // true
```

- 5.NaN 和谁都不相等，包括它自己!
```javascript
NaN == NaN              // false
```   
    
根据上面的规则，测试一下:

```javascript
'true' == true // false 因为Number('true')是 NaN; Number(true) 是1

// 某面试题
console.log(([])?true:false);  // Boolean([]) = true
console.log(([] == false?true:false)); // Number([]) = 0 所以为true
```    

## 对象的类型转换
对象的类型转换分为下面三步
- 1.如果已经是原始类型，直接返回
- 2.调用```input.toString()```方法，如果是原始类型, 返回
- 3.调用```input.valueOf()```, 如果是原始类型, 返回
- 4.如果调用 ```input.toString()``` 和 ```input.valueOf()```返回都不是原始类型，抛出类型错误

举个例子：
```javascript
[1] > null
// [1].toString() = '1'
// '1' > null
// 原始类型比较进入Number('1') > Number(null)
// 1 > 0
// 所以为true

// 再看一个面试题
console.log(({} == false)?true:false);

// {}.toString() "[object Object]"; 返回类型字符串
// Number("[object Object]") NaN
// Number(false) 0
// 所以为false
```
    
**【注意】大多数时候应该杜绝使用 ==，因为这会让你的代码意图不清晰**

<!-- 
参考:
1.JavaScript type coercion explained
https://medium.freecodecamp.org/js-type-coercion-explained-27ba3d9a2839
2. 文章1的作者推荐了书
https://legacy.gitbook.com/book/oshotokill/understandinges6-simplified-chinese/details
-->

# 描述下 JavaScript 中的垃圾回收机制
