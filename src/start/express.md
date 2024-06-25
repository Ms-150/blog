# Express

适用于Node.js的快速、无主见、简约的 Web 框架

[https://expressjs.com/](https://expressjs.com/)

### 核心特性：
+ 可以设置中间件来响应 HTTP 请求。
+ 定义了路由表用于执行不同的 HTTP 请求动作。
+ 可以通过向模板传递参数来动态渲染 HTML 页面。

## install

```bash
npm install express
```

## express app

```js
const express = require('express');
const app = express();

// 定义一个路由
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// 启动服务器
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000}`);
});
```

## router 路由

```js
// 处理根路径的 GET 请求
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// 处理 /about 路径的 GET 请求
app.get('/about', (req, res) => {
    res.send('About us page');
});
```

### req.params / req.body

```js
// 处理包含用户ID的路径的 GET 请求
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});


// 处理请求体数据 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 解析请求体
app.post('/api/data', (req, res) => {
  // 访问解析后的请求体
  const body = req.body;
  res.send(body);
});
```

### 多个处理程序

```js
// 多个处理程序
// 处理 /example 路径的 GET 请求，使用多个处理程序
app.get('/example',
    (req, res, next) => {
        console.log('Middleware 1');
        next();
    },
    (req, res) => {
        res.send('Example page');
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
const express = require('express');
const app = express();

// 引入路由模块
const routes = require('./routes');

// 使用路由模块
app.use('/', routes);

// 启动服务器
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
```

### 参数化路由模块

1. 创建一个接受动态参数的路由模块

```js
// dynamicRoute.js
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
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
    res.send('Home page');
};

const aboutController = (req, res) => {
    res.send('About us page');
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
const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

// 使用控制器处理根路径的 GET 请求
router.get('/', controllers.homeController);

// 使用控制器处理 /about 路径的 GET 请求
router.get('/about', controllers.aboutController);

// 使用控制器处理包含用户ID的路径的 GET 请求
router.get('/user/:id', controllers.userController);

module.exports = router;
```

3. 主应用程序中使用路由

```js
// app.js
const express = require('express');
const app = express();
const routes = require('./routes');

// 使用路由模块
app.use('/', routes);

// 启动服务器
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
```

## 中间件

中间件可以在请求到达路由处理器之前或之后执行某些操作

1. express.static 静态文件服务中间件

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

2. express.json 解析 JSON 请求体中间件

```js
// 解析 JSON 请求体
app.use(express.json());

app.post('/api/data', (req, res) => {
    const requestData = req.body;
    res.json({ message: 'Data received successfully', data: requestData });
});
```

3. express.urlencoded 解析 URL 编码的请求体中间件

通常用于提交 HTML 表单数据。`application/x-www-form-urlencoded` 是一种常见的 HTTP 请求体格式，

```js
// 解析 x-www-form-urlencoded 编码的请求体
app.use(express.urlencoded({ extended: true }));

app.post('/api/form', (req, res) => {
    const formData = req.body;
    res.json({ message: 'Form data received successfully', data: formData });
});
```

4. express.Router 路由中间件

```js
// routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home page');
});

router.get('/about', (req, res) => {
  res.send('About us page');
});

module.exports = router;

// app.js
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');

// 使用路由模块
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## 模板引擎 EJS Handlebars.js Mustache


### utils

+ promisify
    将基于回调的函数转换为返回 Promise 的函数。通过将异步函数转换为 Promise，可以更方便地在代码中使用现代的异步编程模式，比如 async/await。

```js
const fs = require('fs');
const util = require('util');

// 使用 util.promisify() 将 fs.readFile() 转换为返回 Promise 的函数
const readFileAsync = util.promisify(fs.readFile);

// 使用 async/await 处理异步操作
async function readFileExample() {
  try {
    // 调用返回 Promise 的函数
    const data = await readFileAsync('example.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 调用异步函数
readFileExample();
```
