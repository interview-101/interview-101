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

# 如何隐藏一个元素

1. display: none;
2. visibility: hidden;
3. opacity: 0;

# class 或 id 大小写敏感么？

[选择器本身是大小写不敏感的](https://www.w3.org/TR/selectors-4/#case-sensitive)，class和id是否大小写敏感，[取决于宿主语言](https://www.w3.org/TR/html50/disabled-elements.html#case-sensitivity)

> The Selectors specification leaves the case-sensitivity of IDs, classes, element names, attribute names, and attribute values to be defined by the host language. [SELECTORS]

> The unique identifier of HTML elements in documents that are in quirks mode must be treated as ASCII `case-insensitive` for the purposes of selector matching.

> Classes from the class attribute of HTML elements in documents that are in quirks mode must be treated as ASCII case-insensitive for the purposes of selector matching.

> When comparing a CSS element type selector to the names of HTML elements in HTML documents, the CSS element type selector must first be converted to ASCII lowercase. The same selector when compared to other elements must be compared according to its original case. In both cases, the comparison is case-sensitive.

> When comparing the name part of a CSS attribute selector to the names of namespace-less attributes on HTML elements in HTML documents, the name part of the CSS attribute selector must first be converted to ASCII lowercase. The same selector when compared to other attributes must be compared according to its original case. In both cases, the comparison is case-sensitive.

> Everything else (attribute values on HTML elements, IDs and classes in no-quirks mode and limited-quirks mode, and element names, attribute names, and attribute values in XML documents) must be treated as case-sensitive for the purposes of selector matching.

CSS 本身是大小写不敏感的，以下写法是等价的

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

解析：css 中后面定义的样式优先级更高

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

最终 h1 的颜色是什么？

```
purple
```

解析：css 中权重相同的情况下，后定义的样式优先级更高；body h1 和 html h1 优先级相同，后面的覆盖前面的

**题三**

```html
<html>
<body id="parent">
  <h1 id="child">Here is a title!</h1>
</body>
</html>
```

```css
#parent {
  color: green;
}

#child {
  color: purple;
}
```

最终 h1 的颜色是什么？

```
purple
```

解析：继承的样式优先级不如自身定义的样式优先级高

# 如何实现一个元素水平和垂直居中

1. 定位

```css
.parent {
  position: relative;
}
.child {
  display: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
}
```

2. flex

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

# 使用 CSS 实现一个三角

```css
.triangle {
  width: 0;
  height: 0;
  border-top: solid 0 transparent;
  border-left: solid 10px transparent;
  border-right: solid 10px transparent;
  border-bottom: solid 10px #000;
}
```

# 如何触发 CSS 硬件加速( GPU渲染 )

1. transform: translateZ(0);
3. will-change: transform;

注：滥用硬件加速也可能导致性能问题
