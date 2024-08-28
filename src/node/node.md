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
- process // 处理进程相关 [见](#process-模块)
- Buffer

## CSR SSR SEO

node 环境中无法操作 DOM 和 BOM，但是如果非要操作 DOM 和 BOM 也是可以的我们需要使用第三方库 `jsdom` 帮助我们。

- 客户端渲染（CSR，Client-Side Rendering）
  初始 HTML 由服务器发送，内容为空或很少。大部分内容由 JavaScript 在客户端加载和渲染。
  优点：页面切换快，用户体验好。
  缺点：首次加载慢，对 SEO 不友好。

- 服务器端渲染（SSR，Server-Side Rendering）
  HTML 内容由服务器生成并发送给客户端。
  优点：首次加载快，对 SEO 友好。
  缺点：每次页面切换都需要从服务器获取新的 HTML，用户体验不如 CSR。

- 搜索引擎优化 (SEO - Search Engine Optimization)
  通过优化网站内容、结构和技术来提高在搜索引擎中的排名。SEO 直接影响网站的可见度和流量，是所有 Web 应用程序的重要考虑因素。

### SSR example

```sh
npm install jsdom
```

```js
const fs = require("node:fs");
const { JSDOM } = require("jsdom");

const dom = new JSDOM(`<!DOCTYPE html><div id='app'></div>`);

const document = dom.window.document;

const window = dom.window;

fetch("https://api.thecatapi.com/v1/images/search?limit=10&page=1")
  .then((res) => res.json())
  .then((data) => {
    const app = document.getElementById("app");
    data.forEach((item) => {
      const img = document.createElement("img");
      img.src = item.url;
      img.style.width = "200px";
      img.style.height = "200px";
      app.appendChild(img);
    });
    // serialize 序列化字符串
    fs.writeFileSync("./index.html", dom.serialize());
  });
```

## 核心模块

### path 模块

提供了一些用于处理和操作文件路径的实用工具。

- `path.basename()`
  // 返回路径的最后一部分，即文件名。
- `path.dirname()`
  // 返回路径的目录名，即路径中最后一个部分之前的部分。
- `path.extname()`
  // 返回路径中文件的扩展名。
- `path.json()`
  // 用于将多个路径片段拼接成一个完整路径。
- `path.resolve()`
  // 将路径片段解析为一个绝对路径。
- `path.parse()`
  // 将一个路径解析为一个对象，包含根目录、目录、文件名和扩展名等信息。
- `path.format()`
  // 将一个路径对象转换为字符串路径，与 path.parse() 相反。
- `path.sep()`
  // 返回当前操作系统使用的路径分隔符。
  - Windows 上，路径分隔符是 `\`
  - Unix/Linux 和 macOS 上，路径分隔符是 `/`

```js
const path = require("path");

console.log(path.basename("/users/documents/file.txt")); // 输出：'file.txt'
console.log(path.dirname("/users/documents/file.txt")); // 输出：'/users/documents'
console.log(path.extname("/users/documents/file.txt")); // 输出：'.txt'
console.log(path.join("/users", "documents", "file.txt")); // 输出：'/users/documents/file.txt'
console.log(path.resolve("documents", "file.txt")); // 输出类似：'/当前工作目录/documents/file.txt'

console.log(path.parse("/users/ms/documents/file.txt"));
/* 输出：
{
  root: '/',
  dir: '/users/ms/documents',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/

const pathObject = {
  root: "/",
  dir: "/users/ms/documents",
  base: "file.txt",
  ext: ".txt",
  name: "file",
};

console.log(path.format(pathObject)); // 输出：'/users/ms/documents/file.txt'

console.log(path.sep); // 输出（在 Unix 上）：'/'
```

### os 模块

用于提供与操作系统相关的基本信息和功能。

- `os.paltform()` // 返回 Node.js 进程的操作系统平台。例如：'darwin' (macOS), 'win32' (Windows), 'linux' (Linux)
- `os.release()` // 返回操作系统的发布版本。例如：'20.6.0' (macOS 版本), '10.0.19042' (Windows 版本)
- `os.type()` // 返回操作系统名称。例如：'Darwin', 'Windows_NT', 'Linux'
- `os.version()` // 返回操作系统的版本。例如：'Version 10.15.7 (Build 19H2)' (macOS), 'Version 2004 (Build 19041.572)' (Windows)

- `os.homedir()` // 返回获取当前用户的主目录路径。
  - Windows 系统中，`%USERPROFILE%` 环境变量指向当前用户的主目录。
  - Linux 系统中，`$HOME` 环境变量指向当前用户的主目录。
- `os.arch()` // 返回一个表示操作系统 CPU 架构的字符串，常见的值包括 x64（64 位系统）和 arm（ARM 架构）等。
- `os.cpus()` // 返回关于每个逻辑 CPU 内核的信息。
- `os.networkInterfaces()` // 返回一个对象，其中的每个属性都是一个网络接口的名称，每个属性值是一个数组，包含有关该接口的网络信息。每个数组项是一个包含网络接口详细信息的对象。

```js
const os = require("os");

console.log(os.platform()); // 输出操作系统平台。例如：'darwin' (macOS), 'win32' (Windows), 'linux' (Linux)
console.log(os.release()); // 输出操作系统的发布版本。例如：'20.6.0' (macOS 版本), '10.0.19042' (Windows 版本)
console.log(os.type()); // 输出操作系统名称。例如：'Darwin', 'Windows_NT', 'Linux'
console.log(os.version()); // 输出操作系统的版本。例如：'Version 10.15.7 (Build 19H2)' (macOS), 'Version 2004 (Build 19041.572)' (Windows)
```

#### example

```bash
npm install open

# 打开默认浏览器
const open = require('open');

open('http://localhost:3000').catch(err => {
  console.error(`Error opening browser: ${err.message}`);
});
```

#### 模拟 open 打开不同操作系统的浏览器

```js
const os = require("os");
const { exec } = require("child_process");

// 要打开的 URL
const url = "http://localhost:3000";

// 根据操作系统平台选择打开浏览器的方式
if (os.platform() === "win32") {
  // Windows
  exec(`start ${url}`);
} else if (os.platform() === "darwin") {
  // macOS
  exec(`open ${url}`);
} else if (os.platform() === "linux") {
  // Linux
  exec(`xdg-open ${url}`);
} else {
  console.error("Unsupported OS");
}
```

### process 模块

提供了与当前 Node.js 进程交互的功能。它是一个全局对象，允许你获取进程信息、控制进程的生命周期、管理环境变量等。

- `process.arch()` // 返回当前 Node.js 进程的操作系统架构（如 'x64', 'arm', 'ia32'）。
- `process.platform()` // 返回当前操作系统平台的字符串（如 'win32', 'darwin', 'linux'）。
- `process.argv()` // 返回一个包含启动 Node.js 进程时传入的命令行参数的数组。
- `process.env()` // 返回一个包含用户环境信息的对象（环境变量）
- `process.cwd()` // 返回 Node.js 进程的当前工作目录 同`__dirname` esm 使用不了 用 `__dirname` 代替 cwd()
- `process.memoryUsage()` // 返回一个对象，显示 Node.js 进程的内存使用情况（单位为字节）。
- `process.exit([code])` // 以给定的退出码退出当前 Node.js 进程。code 是一个整数，默认值为 0（表示成功）
- `process.on(event, listener)` // 指定的事件注册一个监听器。常用于监听进程级别的事件，如 exit、uncaughtException 等。
- `process.kill(process.pid)` // 发送信号给进程，通常用来结束进程。process.pid 是当前进程的 PID。

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

#### corss-env 库

一个用于在不同操作系统上设置环境变量的工具。它可以帮助你在开发和构建过程中设置环境变量，而不需要考虑操作系统之间的差异。

##### 原理

- Windows: 使用 `set VAR_NAME=value` 语法设置环境变量。
- 类 Unix 系统（如 Linux 和 macOS）: 使用` export VAR_NAME=value` 或直接使用 `VAR_NAME=value` 语法来设置环境变量。

```bash
npm install cross-env --save-dev
```

```json
{
  "scripts": {
    "start:dev": "cross-env NODE_ENV=development node app.js",
    "start:prod": "cross-env NODE_ENV=production node app.js"
  }
}
```

```js
// app.js
console.log(
  `The current environment is ${process.env.NODE_ENV || "undefined"}`
);
```

```sh
npm run start:dev   # 输出: The current environment is development
npm run start:prod  # 输出: The current environment is production
```

### child_process 子进程 模块

允许创建子进程来执行系统命令、运行其他脚本或程序。它提供了多种方式来管理和控制子进程，从而实现并发处理或利用操作系统的功能。

- `exec(command [, options], callback)` // 执行一个 shell 命令，适合运行简单的命令。
- `execSync(command [, options])` // 同步执行一个 shell 命令，返回标准输出的结果。
- `spawn(command [, args [, options]])` // 启动一个新进程来执行命令，适合长时间运行的进程或需要与进程进行交互的场景。
- `spawnSync(command [, args [, options]])` // 同步启动一个新进程来执行命令，返回结果。

| options 配置项             | 说明                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| `cwd`                      | 指定子进程的当前工作目录。默认为 `process.cwd()`。                                         |
| `env`                      | 环境变量的键值对对象。默认为 `process.env`。                                               |
| `encoding`                 | 用于 stdout 和 stderr 的字符编码。默认为 `'utf8'`。                                        |
| `timeout`                  | 进程的最大执行时间（毫秒）。超时后进程会被终止。默认为 `0`，表示没有超时限制。             |
| `maxBuffer`                | stdout 或 stderr 可以占用的最大内存（字节）。默认值为 `1024 * 1024`（1MB）。               |
| `killSignal`               | 终止进程时使用的信号。默认值为 `'SIGTERM'`。                                               |
| `shell`                    | 指定要执行命令的 shell。默认值为 `'/bin/sh'` (POSIX) 或 `'cmd.exe'` (Windows)。            |
| `windowsHide`              | 在 Windows 上隐藏子进程的控制台窗口。默认为 `false`。                                      |
| `argv0`                    | 覆盖子进程的 `argv[0]`，通常用于修改命令名称显示。                                         |
| `stdio`                    | 子进程的标准输入输出配置，可以是 `'pipe'`（默认）、`'ignore'`、`'inherit'`，或文件描述符。 |
| `detached`                 | 子进程与父进程分离，在父进程退出后继续运行。默认为 `false`。                               |
| `uid`                      | 设置子进程的用户 ID（仅适用于 POSIX）。                                                    |
| `gid`                      | 设置子进程的组 ID（仅适用于 POSIX）。                                                      |
| `windowsVerbatimArguments` | 在 Windows 上不对参数进行转义或引用。默认为 `false`。                                      |

- `execFile(file [, args [, options]], callback)` // 执行可执行文件，适用于 `.sh` 文件（macOS、Linux）或 `.cmd` 文件（Windows）。
- `execFileSync(file [, args [, options]])` // 同步执行可执行文件，返回标准输出的结果。

- `fork()` // 创建一个新的 Node.js 子进程，并且通过建立 IPC（进程间通信）通道，使父进程和子进程能够相互发送消息。

```js
const {
  exec,
  execSync,
  spawn,
  spawnSync,
  execFile,
  execFileSync,
  fork,
} = require("child_process");

// exec 异步 回调函数 默认返回 buffer 可以执行 shell 命令 或者软件交互
// execSync 同步 默认返回 buffer

exec("node -v", (err, stdout, stderr) => {
  if (err) return;

  console.log(stdout.toString()); // 输出 Node.js 版本号
});

execSync("mkdir aa"); // 创建目录

// spawn
const { stdout } = spawn("ls", ["-l"]);

stdout.on("data", (data) => {
  console.log(`输出: ${data}`);
});

stdout.on("close", (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});

// execFile

// a.sh
// #!/bin/bash
// echo "start"
// mkdir a
// cd a
// echo "console.log('print aaa')" > a.js
// echo "end"
// node ./a.js

execFile(path.resolve(__dirname, "./a.sh"), null, (error, stdout) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(stdout.toString());
});

// fork

// parent.js
// 创建子进程
const child = fork("child.js");
// 向子进程发送消息
child.send({ hello: "world" });
// 接收子进程发来的消息
child.on("message", (message) => {
  console.log("Received from child:", message);
});

// child.js
process.on("message", (message) => {
  console.log("Received from parent:", message);

  // 向父进程发送消息
  process.send({ reply: "Hi parent!" });
});
```

#### 底层

实现顺序 exec -> execFile -> spawn

- spawn 是最底层的实现，直接调用操作系统的底层 API 来启动子进程。
- execFile 是基于 spawn 封装的一个更高效的 API，用于执行特定的可执行文件。
- exec 是基于 spawn 和 execFile 封装的 API，用于通过 shell 执行命令。

- fork 调用 进程间通信（IPC）-> libuv 来处理跨平台的异步 I/O 操作
  libuv
  - Windows: 使用命名管道（Named Pipes）
  - POSIX: 使用 Unix 域套接字（Unix Domain Sockets）

### ffmpeg

用于录制、转换和传输音频和视频的完整跨平台解决方案。 [详见](../media/ffmpeg.md)

```js
// child_process exec 调用 ffmpeg 处理视频
const { execSync } = require("child_process");

execSync(
  // 格式转换
  "ffmpeg -i input.mp4 output.avi",
  // # 提取音频
  // "ffmpeg -i input.mp4 -vn -acodec copy output.mp3",
  // # 裁剪 10-20s `-ss 10 -to 20`
  // "ffmpeg -i input.mp4 -ss 10 -to 20 -c copy output.mp4"
  // 子进程将直接继承父进程的标准输入（stdin）、标准输出（stdout）和标准错误（stderr）流。
  // 子进程的输出会直接显示在父进程的终端窗口中，就像是父进程自己输出的一样。
  { stdio: "inherit" }
);
```

### pngquant

用于压缩 PNG 图像的开源工具。[详见](../media/pngquant.md)

```js
// child_process exec 调用 pngquant 压缩 png 图片
const { exec } = require("child_process");

exec(
  "pngquant input.png --quality 30-50 --speed 1 -o ouput.png ",
  (error, stdout) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(stdout);
  }
);
```

## Event 事件触发器

Node.js 提供了内置的 EventEmitter 类，几乎所有的核心模块（如 http、fs、net 等）都依赖于它。

### 发布订阅模式

- 类似 vue2 event bus 第三方库 mitt

- on(event, listener) 注册事件监听器
- off(event, listener) 移除事件监听器
- emit(event, listener) 触发事件
- once(event, listener) 注册一次性事件监听器

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

// 监听事件 on
emitter.on("sayHello1", (name) => {
  console.log(`Hello, ${name}`);
});

// 触发事件 emit
emitter.emit("sayHello1", "Node.js");

// 使用 once 注册一次性监听器
emitter.once("sayHello1", (name) => {
  console.log(`Hello once, ${name}`);
});

// 再次触发事件
emitter.emit("sayHello1", "Node.js"); // 第二次不会触发 once 监听器

console.log(` on off -----`);

const fn = (data) => {
  console.log(`Hello, ${data}`);
};

emitter.on("sayHello2", fn);

emitter.emit("sayHello2", "Node.js emit");
// 移除事件监听器 off
emitter.off("sayHello2", fn);

emitter.emit("sayHello2", "Node.js emit"); // 第二次不会触发 emit 监听器
```

## util

提供了一些实用的功能，用于帮助开发者进行常见的任务，如格式化、继承、调试等

- util.promisify() 将回调风格的函数转换为返回 Promise 的函数。
- util.callbackify() 将返回 Promise 的函数转换为传统的基于回调的函数。
- util.format() 用于格式化字符串，类似于在 C 语言中的 printf() 函数。

### example

- util.promisify

```js
// 使用 util.promisify 将 exec 转换为返回 Promise 的函数
const { exec } = require("child_process");
const util = require("util");

exec("node -v", (error, stdout) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(stdout);
});

// 使用 util.promisify
const execPromise = util.promisify(exec);

execPromise("node -v")
  .then((res) => {
    console.log({ ...res });
  })
  .catch((error) => {
    console.log(error);
  });

// 模拟 util.promisify
const promisify = (fn) => {
  return (...arg) => {
    return new Promise((resolve, reject) => {
      fn(...arg, (err, ...values) => {
        if (err) {
          reject(err);
        }
        if (values && values.length > 1) {
          let obj = {};
          for (const key in values) {
            obj[key] = values[key];
          }
          resolve(obj);
        } else {
          resolve(values[0]);
        }
      });
    });
  };
};

const execPromise1 = promisify(exec);

execPromise1("node -v")
  .then((res) => {
    console.log({ ...res });
  })
  .catch((error) => {
    console.log(error);
  });
```

- util.callbackify

```js
const util = require("util");

// util.callbackify 将返回 promise 风格的函数转换为 回调函数风格
const fn = (type) => {
  if (type == 1) {
    return Promise.resolve("yes");
  } else {
    return Promise.reject("no");
  }
};

const callback = util.callbackify(fn);

callback(1, (err, value) => {
  console.log(err, value);
});
```

- util.format()

```js
const util = require("util");

const name = "Alice";
const age = 25;
const info = { city: "Wonderland" };

const formattedString = util.format(
  "My name is %s, I am %d years old, and I live in %j.",
  name,
  age,
  info
);

console.log(formattedString);
// 输出: My name is Alice, I am 25 years old, and I live in {"city":"Wonderland"}.
```

| 占位符 | 匹配                 |
| ------ | -------------------- |
| %s     | 字符串               |
| %d     | 数字（整数或浮点数） |
| %j     | JSON                 |
| %%     | 字符 %               |

## fs

fs 是 Node.js 中用于与文件系统进行交互的核心模块之一。它提供了多种方法来读取、写入、删除和操作文件与目录。
fs 模块有同步（阻塞）和异步（非阻塞）两种接口，适应不同的编程需求。还可以通过 fs/promises 以 Promise 方式操作文件系统。

### 编程方式

- 异步方式: 通过回调函数处理结果，避免阻塞主线程。 // 非阻塞
- 同步方式: 操作会阻塞，代码执行会等待文件操作完成。 // 阻塞
- Promise 方式: 使用 fs/promises 提供的 Promise API，可结合 async/await 进行异步操作。

## 文件操作 API

### 读取文件

- `fs.readFile(path[, options], callback)` // 异步读取文件
- `fs.readFileSync(path[, options])` // 同步读取文件

### 写入文件

- `fs.writeFile(path, data[, options], callback)` // 异步写入文件
- `fs.writeFileSync(path, data[, options])` // 同步写入文件

### 追加文件

如果文件不存在，会自动创建文件。

- `fs.appendFile(path, data[, options], callback)` // 异步追加到文件的末尾
- `fs.appendFileSync(path, data[, options])` // 同步追加到文件的末尾

#### options 类型

- `string | object`
  - `encoding`: 文件编码，默认值为 `null`，返回 Buffer。
  - `flag`: 文件系统标志，类型为 `string`。

| 标志 | 英文        | 解释                                                                 |
| ---- | ----------- | -------------------------------------------------------------------- |
| `r`  | read        | 以读取模式打开文件。如果文件不存在则报错。                           |
| `w`  | write       | 以写入模式打开文件。如果文件不存在则创建文件，文件已存在则清空。     |
| `a`  | append      | 以追加模式打开文件。如果文件不存在则创建文件，数据写入文件末尾。     |
| `x`  | exclusive   | 以独占写入模式打开文件。如果文件已存在则操作失败。                   |
| `+`  | plus        | 结合使用 `r`、`w` 或 `a` 标志，表示可以同时进行读取和写入操作。      |
| `s`  | synchronous | 同步模式，文件的所有操作（包括数据写入和文件元数据更新）都同步完成。 |

### 文件流操作

- `fs.createReadStream(path[, options])` // 创建可读文件流，适合处理大文件或逐块读取文件内容。
  - `options` 选项:

| 选项            | 类型      | 解释                                                                | 默认值    |
| --------------- | --------- | ------------------------------------------------------------------- | --------- |
| `flags`         | `string`  | 文件系统标志，'r' 表示以读取模式打开文件。                          | `'r'`     |
| `encoding`      | `string`  | 指定字符编码，如 `'utf8'`。                                         |           |
| `fd`            | `number`  | 文件描述符，指定文件的打开方式。如果指定了此选项，`path` 将被忽略。 |           |
| `mode`          | `number`  | 文件模式（权限），仅在文件创建时生效。                              | `0o666`   |
| `autoClose`     | `boolean` | 当流关闭时，自动关闭文件描述符。                                    | `true`    |
| `start`         | `number`  | 指定文件读取的起始字节位置。                                        |           |
| `end`           | `number`  | 指定文件读取的结束字节位置。                                        |           |
| `highWaterMark` | `number`  | 控制流在读取过程中缓冲的字节数，默认是 64KB。                       | `64*1024` |

- `fs.createWriteStream(path[, options])` // 创建可写文件流，适合逐块写入文件内容。
  - `options` 选项:

| 选项            | 类型      | 解释                                                                | 默认值    |
| --------------- | --------- | ------------------------------------------------------------------- | --------- |
| `flags`         | `string`  | 文件系统标志，'w' 表示以写入模式打开文件，'a' 表示追加模式。        | `'w'`     |
| `encoding`      | `string`  | 指定字符编码，如 `'utf8'`。                                         | `'utf8'`  |
| `fd`            | `number`  | 文件描述符，指定文件的打开方式。如果指定了此选项，`path` 将被忽略。 |           |
| `mode`          | `number`  | 文件模式（权限），仅在文件创建时生效。                              | `0o666`   |
| `autoClose`     | `boolean` | 当流关闭时，自动关闭文件描述符。                                    | `true`    |
| `highWaterMark` | `number`  | 控制流在写入过程中缓冲的字节数，默认是 16KB。                       | `16*1024` |

### 创建与删除目录

- `fs.mkdirSync(path[, options])` // 同步创建目录
- `fs.mkdir(path[, options], callback)` // 异步创建目录
- `fs.rmSync(path[, options])` // 同步删除文件或目录
- `fs.rm(path[, options], callback)` // 异步删除文件或目录

### 重命名与移动文件

- `fs.renameSync(oldPath, newPath)` // 同步重命名文件或移动文件

### 文件监听

- `fs.watch(path[, options], callback)` // 监听文件或目录的变化

### 链接操作

- `fs.link(path, path, callback)` // 异步创建硬链接
- `fs.linkSync(path, path)` // 同步创建硬链接
- `fs.symlink(path, path[, type], callback)` // 异步创建符号链接（软链接）
- `fs.symlinkSync(path, path[, type])` // 同步创建符号链接（软链接）
  - `type`: 可选，可以是 `'file'` 或 `'dir'`。

#### example

- readFile

```js
const fs = require("fs");
const fs2 = require("fs/promises"); // promise 方式引入

// readFile 异步
fs.readFile("./example.txt", { encoding: "utf-8" }, (err, data) => {
  console.log(data);
});

// readFileSync 同步
try {
  const data = fs.readFileSync("example.txt", "utf8");
  console.log("文件内容:", data);
} catch (err) {
  console.error("读取文件出错:", err);
}

// promise 方式
fs2
  .readFile("./example.txt")
  .then((data) => {
    console.log(data.toString());
  })
  .catch((error) => {
    console.log(error);
  });
```

- fs.writeFile

```js
fs.writeFile("./index.text", "index write", () => {});
```

- fs.appendFile

```js
fs.appendFile("./index.text", "index append", "utf-8", () => {});
```

- fs.createReadStream

```js
const fs = require("fs");

const readStream = fs.createReadStream("./example.txt", { encoding: "utf8" });

readStream.on("data", (chunk) => {
  console.log("读取到的数据:", chunk);
});

readStream.on("end", () => {
  console.log("文件读取完毕");
});

readStream.on("error", (err) => {
  console.error("读取文件时出错:", err);
});
```

- fs.createWriteStream

```js
const fs = require("fs");

const lines = [
  "这是写入的第一行内容。\n",
  "这是写入的第二行内容。\n",
  "这是写入的第三行内容。\n",
];

const writeStream = fs.createWriteStream("./output.txt", { encoding: "utf8" });

lines.forEach((line) => {
  writeStream.write(line);
});

writeStream.end();

writeStream.on("finish", () => {
  console.log("写入操作完成");
});

writeStream.on("error", (err) => {
  console.error("写入文件时出错:", err);
});
```

- fs.mkdirSync

```js
const fs = require("fs");

// 创建文件夹
fs.mkdirSync("./dir");

// recursive 递归创建文件夹
fs.mkdirSync("./dir_out/dir_inner", {
  recursive: true,
});
```

- fs.rmSync

```js
const fs = require("fs");

// 删除文件夹
fs.rmSync("./dir");

// recursive 递归删除文件夹
fs.rmSync("./dir_out", {
  recursive: true,
});
```

- fs.watch

```js
const fs = require("fs");

// 监听文件变化
fs.watch("./example.txt", (event, filename) => {
  console.log(event, filename);
});
```

- fs.link

```js
fs.link("index.text", "index2.text", (err) => {
  if (err) throw err;
  console.log("硬链接创建成功");
});
```

- fs.linkSync

```js
try {
  fs.linkSync("targetPath", "linkPath");
  console.log("硬链接创建成功");
} catch (err) {
  console.error("创建硬链接时出错:", err);
}
```

- fs.symlink

```js
fs.symlink("./index.text", "./index2.text", (err) => {
  if (err) throw err;
  console.log("软链接创建成功");
});
```

- fs.symlinkSync

```js
try {
  fs.symlinkSync("targetPath", "linkPath");
  console.log("硬链接创建成功");
} catch (err) {
  console.error("创建硬链接时出错:", err);
}
```

### 原理 libuv

fs 底层使用 libuv。

fs 源码是通过 C++ 层的 FSReqCallback 这个类 对 libuv 的 uv_fs_t 的一个封装，其实也就是将我们 fs 的参数透传给 libuv 层

一个多平台支持库，主要用于提供异步 I/O 操作，它是 Node.js 的核心依赖之一。

[https://libuv.org/](https://libuv.org/)

#### example

```c++
// mkdir
// 创建目录的异步操作函数，通过uv_fs_mkdir函数调用
// 参数：
// - loop: 事件循环对象，用于处理异步操作
// - req: 文件系统请求对象，用于保存操作的状态和结果
// - path: 要创建的目录的路径
// - mode: 目录的权限模式 777 421
// - cb: 操作完成后的回调函数
int uv_fs_mkdir(uv_loop_t* loop,
                uv_fs_t* req,
                const char* path,
                int mode,
                uv_fs_cb cb) {
  INIT(MKDIR);
  PATH;
  req->mode = mode;
  if (cb != NULL)
    if (uv__iou_fs_mkdir(loop, req))
      return 0;
  POST;
}
```

#### 注意

setImmediate 先执行，而不是 fs

Node.js 读取文件 I/O 操作 都是使用 libuv 进行调度的

而 setImmediate 是由 V8 进行调度的

文件读取完成后 libuv 才会将 fs 的结果 推入 V8 的队列

```js
const fs = require("fs");

fs.readFile(
  "./index.txt",
  {
    encoding: "utf-8",
    flag: "r",
  },
  (err, dataStr) => {
    if (err) throw err;
    console.log("fs");
  }
);

setImmediate(() => {
  console.log("setImmediate");
});
>>>
setImmediate
index
```
