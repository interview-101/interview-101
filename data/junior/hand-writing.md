# 展平数组

```js
function flatten( array = [] ) {
  return array.reduce( ( memo, current, index ) => {
    return memo.concat(
      Array.isArray( current ) ?
        flatten( current ) :
        current
    )
  }, [] )
}
```

```js
// 利用 concat 能够展开数组
function flatten( array ) {
  while( array.some( item => Array.isArray( item ) ) ) {
    array = [].concat( ...array )
  }

  return array
}
```

# 深拷贝

# 柯里化

```js
function curry( fn ) {
  return function judge( ...args ) {
    if ( args.length < fn.length ) {
      return ( arg ) => {
        return judge( ...args, arg )
      }
    }

    return fn( ...args )
  }
}
```

用法

```js
function add( a, b, c ) {
  return a + b + c
}

const curryAdd = curry( add )

curryAdd( 1 )( 2 )( 3 ) // -> 6
```

注：柯里化的定义是每次调用新增一个参数，所以上面的实现是按一个参数来的

# LRU Cache

LRU 的主要目的是为了限制内存，以下的 LRU 算法不会严格查找最近最少使用的k/v，会在 get 时尝试更新从 oldCache 中把 k/v 捞回，然后在 cache 满了的时候，直接 GC 整个 oldCache，这个算法最多会存储 2N keys/value，内存上不会有什么问题

```js
class LRUCache {
  constructor( maxSize ) {
    if ( !maxSize || ( maxSize <= 0 ) ) {
      throw new Error( 'Expect maxSize > 0' )
    }

    this.maxSize = maxSize || Infinity
    this.cache = new Map()
    this.oldCache = new Map()
  }

  has( key ) {
    return this.cache.has( key ) ||
      this.oldCache.has( key )
  }

  remove( key ) {
    return this.cache.delete( key ) ||
      this.oldCache.delete( key )
  }

  clear() {
    this.cache.clear()
    this.oldCache.clear()
  }

  set( key, value ) {
    if ( this.cache.has( key ) ) {
      this.cache.set( key, value )
    } else {
      this._set( key, value )
    }
  }

  get( key ) {
    if ( this.cache.has( key ) ) {
      return this.cache.get( key )
    }

    if ( this.oldCache.has( key ) ) {
      // 将值从 oldCache 向 cache 转移，在下次 cache 满了的时候， oldCache 会被自动 GC
      const value = this.oldCache.get( key )
      this._set( key, value )
      return value
    }
  }

  _set( key, value ) {
    this.cache.set( key, value )

    if ( this.cache.size >= this.maxSize ) {
      this.oldCache = this.cache
      this.cache = new Map()
    }
  }
}
```

> 参考：[hashlru](https://github.com/dominictarr/hashlru)

# 金额处理，整数部分从后往前，每三位添加一个 “,” 进行分隔

```js
function formatMoney( string ) {
  return ~string.indexOf( '.' ) ?
    string.replace( /(\d)(?=(\d{3})+\.)/g, '$1,' ) :
    string.replace( /(\d)(?=(\d{3})+$)/g, '$1,' )
}
formatMoney( '1234567890.89' ) // -> 1,234,567,890.89
```

# Promise.retry( fn, retryTimes )

```js
Promise.retry = function ( fn, retryTimes = 1 ) {
  function job( resolve, reject ) {
    fn().then( resolve ).catch( e => {
      if ( retryTimes === 0 ) {
        reject( e )
      } else {
        retryTimes--
        job( resolve, reject )
      }
    } )
  }

  return new Promise( resolve, reject ) {
    job( resolve, reject )
  }
}
```
