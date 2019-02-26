# css 选择器有哪些？

- 简单选择器
  - 类型选择器（标签）
  - class 选择器
  - id 选择器
  - 通用选择器(*)
  - 属性选择器
- 伪类选择器
- 伪元素选择器
- 组合
 - `+`
 - `~`
 - `>`
 - (space)

# class 或 id 大小写敏感么？

[选择器本身是大小写不敏感的](https://www.w3.org/TR/selectors-4/#case-sensitive)，class和id是否大小写敏感，[取决于宿主语言](https://www.w3.org/TR/html50/disabled-elements.html#case-sensitivity)

CSS 本身是大小写不敏感的，所以以下写法是等价的

```css
.klass {
  Color: RED;
}

.klass {
  color: red;
}
```

# css选择器的匹配过程

自右向左

# 选择器优先级

**题一**

```html
<div class="red blue">text</div>
```

```css
.blue {
  color: blue;
}

.red {
  color: red;
}
```

最终 text 的颜色是什么？

```
red
```

**题二**

```html
<html>
<body>
  <h1>Here is a title!</h1>
</body>
</html>
```

```css
body h1 {
  color: green;
}
html h1 {
  color: purple;
}
```



### 如何实现一个元素水平和垂直居中
