# 翻转链表

1 -> 2 -> 3 -> 4 -> 5
变为
5 -> 4 -> 3 -> 2 -> 1

思路：弄两个指针，分别指向相邻两个，同时后移

```js
function reverseList( head ) {
  let pre = head
  let next = head.next

  while( next ) {
    next.next = pre
    pre = next
    next = pre.next
  }

  return pre
}
```

# 多个数组求交集

```js
function intersection( first, ...rest ) {
  return first.filter( item => rest.every( v => v.includes( item ) ) )
}
```

# 多个数组求并集

```js
function union( ...arrays ) {
  return arrays.reduce( ( memo, array ) => {
    array.forEach( v => {
      if ( !memo.includes( v ) ) {
        memo.push( v )
      }
    } )

    return memo
  }, [] )
}
```
