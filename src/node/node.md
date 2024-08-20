# Node

## npm npx

随同 NodeJS 一起安装的包管理工具。

详见 [npm](./npm&yarn&npx&pnpm.md)

## 模块化

```json
// package.json
type: "commonjs" // 默认
// require 导入，module.exports 或 exports 导出。

// or
type: "module"
// import 导入，export 导出
```

- 内置模块

```js
const fs = require("fs");
const path = require("path");
```

- 第三方模块

```sh
npm install express
const express = require('express');
```

- 自定义模块

```js
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// app.js
const math = require("./math");
console.log(math.add(2, 3)); // 输出: 5
```

- JSON 模块

```js
const config = require("./config.json");
console.log(config);
```

### CommonJS 和 ESModule 的区别

- CommonJS 是基于 `运行时的同步加载`，ESModule 是基于 `编译时的异步加载`
- CommonJS 是可以修改值的，ESModule 值并且不可修改（可读的）
- CommonJS 不可以 tree shaking，ESModule 支持 tree shaking
- CommonJS 中顶层的 this 指向这个模块本身，而 ES6 中顶层 this 指向 undefined

## 全局变量

Node 中没有 `DOM` 和` BOM`，除了这些 API，其他的 `ECMAscript API` 基本都能用

- global
- globalThis // ECMAScript 2020 nodejs 环境会指向 `global` ，浏览器环境指向 `window`

```js
global.xxx = "123";
// or
globalThis.xxx = "123";
```

### 内置 API

- `__dirname` // 当前模块文件所在目录的绝对路径
- `__filename` // 当前模块文件的绝对路径，包括文件名本身。
- process // 处理进程相关
- Buffer

#### provess

它提供了一系列与当前 Node.js 进程相关的功能和属性。通过 process 对象，开发者可以获取有关 Node.js 运行时环境的信息，并与操作系统交互。

- `process.argv` 返回一个数组，其中包含启动 Node.js 进程时传入的命令行参数
- `process.env` 返回一个包含用户环境信息的对象（环境变量）
- `process.exit([code])` 以给定的退出码退出当前 Node.js 进程。code 是一个整数，默认值为 0（成功）
- `process.cwd()` 返回 Node.js 进程的当前工作目录
- `process.on(event, listener)` 指定的事件注册一个监听器。常用于监听进程级别的事件，如 exit、uncaughtException 等。

```js
// 假设运行命令为: node app.js arg1 arg2

console.log(process.argv);
// 输出: [ '/path/to/node', '/path/to/app.js', 'arg1', 'arg2' ]

// 设置环境变量
process.env.NODE_ENV = "production";

console.log(process.env.NODE_ENV); //  production

if (someCondition) {
  console.log("Exiting process");
  process.exit(1); // 非零退出码表示错误
}

console.log(process.cwd()); // /path/to/app.js

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error:", err);
  process.exit(1); // 非零退出码表示错误
});
```

## CSR SSR SEO

node 环境中无法操作 DOM 和 BOM，但是如果非要操作 DOM 和 BOM 也是可以的我们需要使用第三方库帮助我们 `jsdom`

- 客户端渲染（CSR，Client-Side Rendering）
  初始 HTML 由服务器发送，内容为空或很少。大部分内容由 JavaScript 在客户端加载和渲染。
  优点：页面切换快，用户体验好。
  缺点：首次加载慢，对 SEO 不友好。
- 服务器端渲染（SSR，Server-Side Rendering）
  HTML 内容由服务器生成并发送给客户端。
  优点：首次加载快，对 SEO 友好。
  缺点：每次页面切换都需要从服务器获取新的 HTML，用户体验不如 CSR。

```sh
npm install jsdom
```

###

```js
const fs = require('node:fs')
const { JSDOM } = require('jsdom')

const dom = new JSDOM(`<!DOCTYPE html><div id='app'></div>`)

const document = dom.window.document

const window = dom.window

fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1').then(res => res.json()).then(data => {
    const app = document.getElementById('app')
    data.forEach(item=>{
       const img =  document.createElement('img')
       img.src = item.url
       img.style.width = '200px'
       img.style.height = '200px'
       app.appendChild(img)
    })
    fs.writeFileSync('./index.html', dom.serialize())
})
```