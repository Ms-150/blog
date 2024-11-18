# Nanoid

一个小巧、安全、URL 友好、唯一的 JavaScript 字符串 ID 生成器。

Nano ID 是一个用于生成随机 ID 的库。
与 UUID 类似，存在重复 ID 的可能性。但是，这种可能性非常小。

[https://zelark.github.io/nano-id-cc/](https://zelark.github.io/nano-id-cc/)

## install

```bash
npm i nanoid
```

## usage

1. 生成 ID

```js
import { nanoid } from "nanoid";

const id = nanoid();
>>>
"V1StGXR8_Z5jdHi6B-myT"
```

2. 自定义 ID 长度

   默认长度为 `21` 个字符

```js
import { nanoid } from "nanoid";

const id = nanoid(10); // 生成 10 个字符长的 ID
console.log(id);
>>>
输出类似 "IRFnj2nXoQ" 的字符串
```

3. 自定义字符集

   默认字符集为`0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-`

   - 10 个数字：`0-9`
   - 26 个小写字母：`a-z`
   - 26 个大写字母：`A-Z`
   - 2 个特殊字符：`_` 和 `-`

```js
const customId = nanoid(10, 'abcdefghijklmnopqrstuvwxyz0123456789');

console.log(customId);
>>>
例如 "fkdj34dhs9"
```
