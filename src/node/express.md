# Express

适用于 `Node.js` 的快速、无主见、简约的 Web 框架。

[https://expressjs.com/](https://expressjs.com/)

### 核心特性：

- 可以设置中间件来响应 HTTP 请求。
- 定义了路由表用于执行不同的 HTTP 请求动作。
- 可以通过向模板传递参数来动态渲染 HTML 页面。

## install

```bash
npm install express
npm install @types/express -D   # 声明文件
```

## usage

```js
const express = require("express");
const app = express();

// 定义一个路由
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// 启动服务器
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000}`);
});
```

## router 路由

```js
// 处理根路径的 GET 请求
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// 处理 /about 路径的 GET 请求
app.get("/about", (req, res) => {
  res.send("About us page");
});
```

### 参数解析

1. 查询参数

- req.query

```js
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`搜索内容: ${query}`);
});
>>>
http://localhost:3000/search?q=express
```

2. 路由 参数

- 动态参数 req.params / req.body

```js
// 处理包含用户ID的路径的 GET 请求
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
>>>
http://localhost:3000/user/123

// 处理请求体数据 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 解析请求体
app.post("/api/data", (req, res) => {
  // 访问解析后的请求体
  const body = req.body;
  res.send(body);
});
```

### 多个处理程序

```js
// 多个处理程序
// 处理 /example 路径的 GET 请求，使用多个处理程序
app.get(
  "/example",
  (req, res, next) => {
    console.log("Middleware 1");
    next();
  },
  (req, res) => {
    res.send("Example page");
  }
);
```

### 路由模块化

1. 创建路由模块 express.Router()

```js
touch routes.js
// routes.js
const express = require('express');
const router = express.Router();

// 处理根路径的 GET 请求
router.get('/', (req, res) => {
  res.send('Home page');
});

// 处理 /about 路径的 GET 请求
router.get('/about', (req, res) => {
  res.send('About us page');
});

module.exports = router;
```

2. 使用路由模块

```js
const express = require("express");
const app = express();

// 引入路由模块
const routes = require("./routes");

// 使用路由模块
app.use("/", routes);

// 启动服务器
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
```

### 参数化路由模块

1. 创建一个接受动态参数的路由模块

```js
// dynamicRoute.js
const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

module.exports = router;
```

2. 主应用程序中使用参数化的路由模块

```diff
const express = require('express');
const app = express();

// 引入路由模块
const routes = require('./routes');
+ // 引入参数化路由模块
+ const dynamicRoute = require('./dynamicRoute');

// 使用路由模块
app.use('/', routes);
+ // 使用参数化路由模块
+app.use('/user', dynamicRoute);

// 启动服务器
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
```

### 路由控制器

1. 创建一个控制器 touch controllers.js

```js
// controllers.js
const homeController = (req, res) => {
  res.send("Home page");
};

const aboutController = (req, res) => {
  res.send("About us page");
};

const userController = (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
};

module.exports = {
  homeController,
  aboutController,
  userController,
};
```

2. 创建路由和使用控制器

```js
// routes.js
const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

// 使用控制器处理根路径的 GET 请求
router.get("/", controllers.homeController);

// 使用控制器处理 /about 路径的 GET 请求
router.get("/about", controllers.aboutController);

// 使用控制器处理包含用户ID的路径的 GET 请求
router.get("/user/:id", controllers.userController);

module.exports = router;
```

3. 主应用程序中使用路由

```js
// app.js
const express = require("express");
const app = express();
const routes = require("./routes");

// 使用路由模块
app.use("/", routes);

// 启动服务器
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
```

## 中间件

中间件可以在请求到达路由处理器之前或之后执行某些操作

1. `express.static` 静态文件服务中间件

```diff
const express = require('express');
const app = express();
const routes = require('./routes');

+ // 提供静态文件服务，将 public 目录作为根目录
+ app.use(express.static('public'));

// 使用路由模块
app.use('/', routes);

// 启动服务器
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
```

2. `express.json` 解析 `JSON` 请求体中间件

```js
// 解析 JSON 请求体
app.use(express.json());

app.post("/api/data", (req, res) => {
  const requestData = req.body;
  res.json({ message: "Data received successfully", data: requestData });
});
```

3. `express.urlencoded` 解析 `URL 编码`的请求体中间件

通常用于提交 HTML 表单数据。`application/x-www-form-urlencoded` 是一种常见的 HTTP 请求体格式，

```js
// 解析 x-www-form-urlencoded 编码的请求体
app.use(express.urlencoded({ extended: true }));

app.post("/api/form", (req, res) => {
  const formData = req.body;
  res.json({ message: "Form data received successfully", data: formData });
});
```

4. `express.Router` 路由中间件

```js
// routes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home page");
});

router.get("/about", (req, res) => {
  res.send("About us page");
});

module.exports = router;

// app.js
const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");

// 使用路由模块
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

5. 自定义中间件

```bash
npm i log4js
```

一个非常灵活的日志记录库，可以用于 Node.js 应用中进行日志管理。它提供了丰富的功能，包括日志输出到控制台、文件，支持不同级别的日志以及灵活的日志格式化。

```js
// /middleware/logger.js
import log4js from "log4js";

// 配置 log4js
log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "colored",
      },
    },
    file: {
      type: "file",
      filename: "logs/server.log",
    },
  },
  categories: {
    default: {
      appenders: ["out", "file"],
      level: "debug",
    },
  },
});

// 创建 logger 实例
const logger = log4js.getLogger("default");

// 定义日志中间件
const LoggerMiddleware = (req, res, next) => {
  logger.debug(req.method, req.url);
  next();
};

export default LoggerMiddleware;

// 使用日志中间件
app.use(LoggerMiddleware);
```

## 模板引擎 EJS Handlebars.js Mustache

### utils

- promisify
  将基于回调的函数转换为返回 Promise 的函数。通过将异步函数转换为 Promise，可以更方便地在代码中使用现代的异步编程模式，比如 async/await。

```js
const fs = require("fs");
const util = require("util");

// 使用 util.promisify() 将 fs.readFile() 转换为返回 Promise 的函数
const readFileAsync = util.promisify(fs.readFile);

// 使用 async/await 处理异步操作
async function readFileExample() {
  try {
    // 调用返回 Promise 的函数
    const data = await readFileAsync("example.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// 调用异步函数
readFileExample();
```

## 防盗链

一种通过检查请求的来源（通常通过 Referer 头信息）来防止第三方网站未经授权直接链接和使用你服务器上资源的技术。通常用于图片、视频等静态资源，防止其他网站滥用你的资源带宽。

```js
import express from "express";

const app = express();

const whiteList = ["localhost"];

const preventHotLinking = (req, res, next) => {
  const referer = req.get("referer");

  if (referer) {
    try {
      const { hostname } = new URL(referer);

      if (!whiteList.includes(hostname)) {
        return res.status(403).send("资源不存在");
      }
    } catch (err) {
      return res.status(400).send("无效的请求");
    }
  }

  next();
};

app.use(preventHotLinking);
app.use(express.static("static"));

app.listen(3000, () => {
  console.log("服务器运行在 http://localhost:3000");
});
```
