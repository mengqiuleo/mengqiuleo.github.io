# [【原型链】Function & Object 鸡蛋问题](https://github.com/mengqiuleo/mengqiuleo.github.io/issues/8)

被裁了，复习八股，看到了一个有意思的问题。。。

*该 issue 只是对问题和答案的总结，非原创
<br/>

![1](https://github.com/user-attachments/assets/ed80cad5-1a45-4c39-9020-6b4c84365591)

Array，Date，Number，String，Boolean，Error，Object 都是 Function 的一个实例，那么 Function 是谁的实例呢？
```js
console.log(Function.__proto__ === Function.prototype) // true

console.log(Function.constructor === Function) // true
```
Function实例的构造函数是Funcion.难道这代表着 Function 自己产生了自己?（或者说 Function 是它自己的构造函数？）



## 探究 Object.prototype
所有对象都可以通过原型链最终找到 Object.prototype ，虽然 Object.prototype 也是一个对象，但是这个对象却不是 Object 创造的，而是引擎自己创建了 Object.prototype。
这也就是为什么`Object.prototype.__proto__ === null`
```js
Object.prototype instanceof Object // false
Object.prototype instanceof Function // false
```
所以可以这样说，所有实例都是对象，但是对象不一定都是实例。比如，Object.prototype 是一个对象，但是它却不是由什么构造函数创建出来的实例，而是由引擎自己创建。

到现在，这已经某种程度上解开了鸡和蛋的问题：Object.prototype 是对象，但它不是通过 Object 函数创建的。
那么 Function.prototype 可以用相同的理论解释。

## 探究 Function.prototype
Function.prototype 是个特殊的对象，如果在浏览器将这个对象打印出来，会发现这个对象其实是一个函数。

```js
console.log(Function.prototype)
// ƒ () { [native code] }
```

```
let fun = Function.prototype.bind()
```
如果以上述方法创建一个函数，那么可以发现这个函数是不具有 prototype 属性的。

**解释**
我们知道函数都是通过 new Function() 生成的，难道 Function.prototype 也是通过 new Function() 产生的吗？答案也是否定的，这个函数也是引擎自己创建的。首先引擎创建了 Object.prototype ，然后创建了 Function.prototype ，并且通过 __proto__ 将两者联系了起来。这里也很好的解释了上面的一个问题，为什么 let fun = Function.prototype.bind() 没有 prototype 属性。因为 Function.prototype 是引擎创建出来的对象，引擎认为不需要给这个对象添加 prototype 属性。

**结论：不是所有函数都是 new Function() 产生的，比如Function.prototype虽然是一个函数，但是它是由引擎创建的。**

有了 Function.prototype 以后才有了 function Function() ，然后其他的构造函数都是 function Function() 生成的。

现在可以来解释 `Function.__proto__ === Function.prototype` 这个问题了。因为先有的 Function.prototype 以后才有的 function Function() ，所以也就不存在鸡生蛋蛋生鸡的悖论问题了。
对于为什么`Function.__proto__` 会等于 Function.prototype ，一种理解是：其他所有的构造函数都可以通过原型链找到 Function.prototype ，并且 function Function() 本质也是一个函数，为了不产生混乱就将 function Function() 的` __proto__` 联系到了 Function.prototype 上。

## 总结
所以，大概回答就是，Object.prototype 是个神之对象，由它诞生了 Function.prototype，以之为原型又诞生了 Function 和 Object，接着创造了对象世界的万物吧。
```js
console.log(Function.prototype instanceof Function) //false
console.log(Function.prototype instanceof Object) //true
console.log(Function.prototype.__proto__ === Object.prototype) //true
```


**Ref**:
[从探究Function.__proto__===Function.prototype过程中的一些收获](https://github.com/jawil/blog/issues/13)

[高能！typeof Function.prototype 引发的先有 Function 还是先有 Object 的探讨](https://segmentfault.com/a/1190000005754797)


