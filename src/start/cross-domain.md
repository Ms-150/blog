# 跨域

### 同源策略 Same-Origin Policy

是一种浏览器安全机制，用于防止一个网页的脚本对来自不同源的内容进行访问，从而减少潜在的安全漏洞。

所谓同源：是指 域名 协议 端口相同

- 协议（Protocol）：HTTP 或 HTTPS
- 域名（Domain）：例如 example.com
- 端口号（Port）：例如 80（HTTP 默认端口）或 443（HTTPS 默认端口）

## 跨域请求和数据传递 的方法

- `CORS` // 跨域资源共享
- `JSONP`
- `代理` proxy
- `postMessage` 消息传递
- `nginx` // 详见 [nginx](./nginx.md)篇

- `WebSocket` // WebSocket 协议与 HTTP 协议的不同

  跨域控制主要依赖于服务器端的编程实现来检查 Origin 头部信息，从而决定是否允许来自不同源的 WebSocket 连接。

### `CORS`（跨域资源共享）

服务端设置响应头中的 Access-Control-Allow-Origin 字段，允许特定的源或者所有源的请求访问资源。

#### 常见的 CORS 相关 HTTP 头部及其作用

- `Access-Control-Allow-Origin` 指定允许访问资源的源。

```js
// 允许全部请求 `*` 表示允许所有源访问，但这通常不够安全。
res.header('Access-Control-Allow-Origin', *);

// 允许特定请求 `http://example.com`
res.header('Access-Control-Allow-Origin', 'http://example.com');
```

- `Access-Control-Allow-Methods` 指定允许的 HTTP 方法。

```js
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
```

- `Access-Control-Allow-Headers` 指定允许客户端在跨域请求中使用的自定义请求头部。

```js
res.header(
  "Access-Control-Allow-Headers",
  "Content-Type, Authorization, X-Custom-Header"
);
```

#### example express

```diff
const express = require('express');
const app = express();

app.use((req, res, next) => {
+ res.header('Access-Control-Allow-Origin', 'http://example.com');
+ res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
+ res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

# 对 浏览器发起的预检请求 (`OPTIONS` 请求)返回 200 响应
+ if (req.method === 'OPTIONS') {
+    return res.status(200).end();
+  }
  next();
});

# 处理GET请求
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

# 启动服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### `JSONP`（JSON with Padding）

- `<script>` 标签没有跨域限制的
- JSONP 请求仅支持 GET 方法，
- JSONP 的使用会导致 `XSS`（跨站脚本）攻击风险，因为服务器返回的是 `JavaScript` 代码，而不仅仅是数据。

#### 原理

1. 使用 `<script>` 标签进行请求
   利用 `<script>` 标签没有跨域限制的特性来实现跨域数据请求。客户端动态创建一个 `<script>`标签，设置其 `src` 属性指向需要跨域请求的数据 URL。

2. 服务器端返回 JSON 数据
   允许用户传递一个 `callback` 参数给服务器 然后服务器返回数据时会将这个 `callback` 参数作为函数名来包裹着 `JOSN` 数据 这样客户端就可以随意定制自己的函数来自动处理返回数据

3. 客户端执行回调
   客户端的 `<script>` 标签加载并执行服务器返回的 JavaScript 代码，通常是一个回调函数，该函数处理数据并执行进一步的逻辑。

#### example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JSONP Example</title>
    <script>
      function handleResponse(data) {
        console.log("Data received from server:", data);
      }

      function fetchData() {
        const script = document.createElement("script");
        const callbackName = "handleResponse"; // 与服务器端回调函数名一致
        script.src = `http://localhost:3000/api/data?callback=${callbackName}`;
        document.body.appendChild(script);
      }
    </script>
  </head>
  <body>
    <h1>JSONP Example</h1>
    <button onclick="fetchData()">Fetch Data</button>
  </body>
</html>
```

```js
// 2. 后端
const express = require("express");
const app = express();

// JSONP 路由
app.get("/api/data", (req, res) => {
  const callback = req.query.callback; // 获取客户端传递的 callback 参数
  const data = { message: "Hello from JSONP" }; // 要返回的数据

  // 设置响应类型为 JavaScript
  res.type("application/javascript");
  // 返回 JSONP 响应
  res.send(callback + "(" + JSON.stringify(data) + ")");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### `proxy` 代理服务器

代理服务器是一个中间服务器，客户端（浏览器）向代理服务器发送请求，然后代理服务器将请求转发到目标服务器，并将响应返回给客户端。

- webpack

```js
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://example.com", // 目标服务器地址
        changeOrigin: true, // 是否更改请求头中的Origin字段
        pathRewrite: { "^/api": "" }, // 重写路径
      },
    },
  },
};
```

- vite

详见 详见 [vite / proxy ](./vite.md#proxy)篇

```js
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://example.com", // 目标服务器的地址
        changeOrigin: true, // 是否更改请求头中的Origin字段
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写路径
      },
    },
  },
});
```

### nginx 设置反向代理

```diff
+ location /api/ {
+    proxy_pass http://api.example.com/;
+ }
```

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 请替换为你的域名或 IP

    # 处理前端请求
    location / {
        proxy_pass http://localhost:3000;  # 转发到前端应用
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        try_files $uri $uri/ /index.html; # spa 项目 所有未匹配的请求都被重定向到 index.html
    }

    # 处理 API 请求
    location /api/ {
        proxy_pass http://api.example.com/;  # 转发到 API 服务器
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 添加 CORS 头部
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'Origin, Content-Type, Accept, Authorization';
        add_header Access-Control-Allow-Credentials true;

        # 处理预检请求
        if ($request_method = OPTIONS ) {
            return 204;
        }
    }
}
```

### postMessage 消息传递

一个 JavaScript API，允许不同源（origin）的网页之间进行安全的跨文档消息传递。

#### 基本概念

postMessage API 的核心是两个方法：

- `window.postMessage(message, targetOrigin)`：用于向目标窗口发送消息。
- `window.addEventListener('message', callback)`：用于监听接收到的消息。

#### sample

1. `父页面`与` <iframe>` 之间的通信

```js
//  父页面 https://test-origin.com
const iframe = document.getElementById("myIframe");
iframe.contentWindow.postMessage("Hello iframe", "https://test-children.com");

// <iframe> 页面 https://test-children.com
window.addEventListener("message", (event) => {
  if (event.origin === "https://test-origin.com") {
    console.log("Message from parent:", event.data);
  }
});
```

2. 不同窗口或标签页之间的通信

```js
// 主窗口 https://testA.com
const newWindow = window.open("https://testB.com");
newWindow.postMessage("Hello from main window", "https://testB.com");

// 新窗口  https://testB.com
window.addEventListener("message", (event) => {
  if (event.origin === "https://testA.com") {
    console.log("Message from main window:", event.data);
  }
});
```

3. `Web Worker` 和 `主线程` 之间的通信

```js
// 主线程
const worker = new Worker("worker.js");
worker.postMessage("Hello from main thread");

// Web Worker：
self.addEventListener("message", (event) => {
  console.log("Message from main thread:", event.data);
});
```

## WebSocket

一种网络协议，允许客户端和服务器之间建立持久的连接，从而可以在两者之间实时地交换数据。它使用一个标准的 TCP 连接，协议标识符是 `ws://` 和` wss://`（加密版本）。

使用 WebSocket 协议进行通信，WebSocket 不受同源策略限制。

### 应用场景

- 实时聊天应用
- 实时游戏
- 实时数据流
- 实时协作工具 在线文档编辑、白板应用

### sample

1. 客户端

```js
// 创建 WebSocket 实例
const socket = new WebSocket("ws://example.com/socketserver");

// 连接成功时触发
socket.onopen = function (event) {
  console.log("WebSocket connection opened");
  socket.send("Hello Server!");
};

// 服务器发来消息时触发
socket.onmessage = function (event) {
  console.log("Message from server:", event.data);
};

// 连接关闭时触发
socket.onclose = function (event) {
  console.log("WebSocket connection closed");
};

// 连接出错时触发
socket.onerror = function (error) {
  console.error("WebSocket error:", error);
};
```

2. 服务器端
   使用 Node.js 的 ws 库创建 WebSocket 服务器

```js
const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  // 处理客户端消息
  socket.on("message", (message) => {
    console.log("Received:", message);
    socket.send("Hello Client!");
  });

  // 处理连接关闭
  socket.on("close", () => {
    console.log("Client disconnected");
  });

  // 处理错误
  socket.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
```

# 安全

- XSS 跨站脚本攻击
- CSRF 跨站请求伪造

## XSS 跨站脚本攻击

攻击者通过在网页中注入恶意脚本，利用用户浏览器的执行能力来实施攻击。

### 防御

- 对用户输入进行验证和过滤
- 使用安全编码机制。 如 HTML 转义，确保用户输入不被执行。

#### HTML 转义

HTML 转义 是一种将 特殊字符 转换为 HTML 实体 表示形式的过程，以防止这些字符被浏览器解释为 HTML 标签或 JavaScript 代码。

| 特殊字符 | html 实体          |
| -------- | ------------------ |
| <        | `&lt;`             |
| >        | `&gt;`             |
| &        | `&amp;`            |
| "        | `&quot;`           |
| '        | `&#39;` / `&apos;` |

## CSRF 跨站请求伪造

攻击者通过欺骗用户在已登录的 Web 应用程序上执行未经授权的操作。攻击者在受害者的浏览器中伪造请求，以执行某个操作，而这个请求被 Web 应用程序误认为是受信任的。

### 防御

- 使用 CSRF 令牌（CSRF token）验证每个表单提交和敏感操作。
- 额外验证 限制对敏感资源的访问，确保只有授权用户能够执行关键操作。
