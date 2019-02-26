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

> The Selectors specification leaves the case-sensitivity of IDs, classes, element names, attribute names, and attribute values to be defined by the host language. [SELECTORS]

> The unique identifier of HTML elements in documents that are in quirks mode must be treated as ASCII case-insensitive for the purposes of selector matching.

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


### 如何实现一个元素水平和垂直居中
