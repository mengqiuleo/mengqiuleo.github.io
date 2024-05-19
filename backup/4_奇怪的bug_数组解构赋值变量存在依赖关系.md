# [奇怪的bug_数组解构赋值变量存在依赖关系](https://github.com/mengqiuleo/mengqiuleo.github.io/issues/4)

题目随便起的，这不是bug，而是自己对解构赋值理解不够深刻
在刷力扣 41.缺失的第一个正数 这个题的时候，出现了解构赋值的问题，
对于`[a,b] = [1,2]和[b,a]=[2,1]`按理说都是行的通的，和位置没有关系，本质上都是进行交换

可是当我在题目中
使用`[nums[nums[i]-1], nums[i]] = [nums[i], nums[nums[i]-1]]`时是可以通过测试用例的，
使用`[nums[i], nums[nums[i]-1]] = [nums[nums[i]-1], nums[i]]`会超时

## 41. 缺失的第一个正数
题目要求返回缺失的第一个正整数，那么我们可以采用“一个萝卜一个坑”的思想
将数组中的所有数字归位，当下标为[0,N]时，数字应该为[1,N+1]
那么数值为i的数应该放在下标为i-1的位置
比如数字：`nums[i]`，它的下标应该为`nums[i]-1`，
所以，反过来说，下标为`nums[i]-1`的地方对应的数字应该为`nums[nums[i]-1]`
通过上面的推导，我们可以得出一个结论：`nums[nums[i]-1] === nums[i]`
于是，我们可以遍历一遍，将所有的数组交换到正确的位置，然后再进行一次遍历，找到`nums[i] != i + 1`的数

```javascript
var firstMissingPositive = function(nums) {
    for(let i = 0; i < nums.length; i++){
        while(nums[i] > 0 && nums[i] <= nums.length && nums[nums[i]-1] != nums[i] ){
            // ok
            const temp = nums[nums[i]-1]; 
            nums[nums[i]-1] = nums[i];
            nums[i] = temp;

            // const temp = nums[i];
            // nums[i] = nums[nums[i]-1];
            // nums[nums[i]-1] = temp;

            // [nums[i], nums[nums[i]-1]] = [nums[nums[i]-1], nums[i]]
            // [nums[nums[i]-1], nums[i]] = [nums[i], nums[nums[i]-1]] ok
        }
    }
    for(let i = 0; i < nums.length; i++){
        if(nums[i] != i+1){
            return i+1;
        }
    }
    return nums.length + 1;
};
```
但是，`[nums[i], nums[nums[i]-1]] = [nums[nums[i]-1], nums[i]]`这样写是错的

## 解释

首先，清楚
情况一：

```javascript
const temp = nums[nums[i]-1]; 
nums[nums[i]-1] = nums[i];
nums[i] = temp;

// 等价于 

[nums[nums[i]-1], nums[i]] = [nums[i], nums[nums[i]-1]]
```
情况二：

```javascript
const temp = nums[i];
nums[i] = nums[nums[i]-1];
nums[nums[i]-1] = temp;

// 等价于

[nums[i], nums[nums[i]-1]] = [nums[nums[i]-1], nums[i]]
```
情况一：
对于情况一，
我们先暂存了 `nums[nums[i]-1]`地址的值，然后更新`nums[nums[i]-1]`地址的值，
因为此时`nums[i]`的值没有变，所以 `nums[nums[i]-1]`所指向的地址没有变，我们只是改变了该地址对应的值，
最后更新`nums[i]`的值

情况二：
我们先暂存了`nums[i]`的值，然后更新`nums[i]`地址的值，当走到第三步更新`nums[nums[i]-1]`地址的值时，因为`nums[i]`的值发生了变化，那么相当于nums[nums[i]-1]这个地址发生了变化，最后我们将一个新地址的原有值改变了
而我们的初衷是交换`nums[nums[i]-1]`和`nums[i]`这两个地址的值，结果我们改变了一个新地址的值


## 画图模拟：
![1](https://github.com/mengqiuleo/mengqiuleo.github.io/assets/85825776/0f04d3ab-cd83-4aa1-8e0c-a83e550a2d7d)


## 解决：

如果想让 `[nums[i], nums[nums[i]-1]] = [nums[nums[i]-1], nums[i]]`正确表示，
可以这样：

```javascript
const tmp = nums[i];
nums[i] = nums[nums[i] - 1];
nums[tmp -1] = tmp;
```
