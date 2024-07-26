# Navigator.sendBeacon

用于通过 `HTTP POST` 将少量数据 `异步` 传输到 Web 服务器。

用于将统计数据发送到 Web 服务器，同时避免了用传统技术（如：XMLHttpRequest）发送分析数据的一些问题。

## 优缺点

- 优点

  - 异步处理

    它不会阻塞页面的卸载或关闭过程。这对于需要在用户离开页面时仍然能够发送数据的场景非常有用，例如日志记录或分析数据的收集。

  - 可靠性

    设计用来确保数据能够被成功发送的，它通常会尽力确保数据在网络环境较差或者用户即将离开页面时也能成功发送到服务器。这种可靠性使其特别适合于关键数据的传输。

  - 简单易用

    相对于其他复杂的技术（如 AJAX 请求或 WebSocket）来说，语法简单，易于理解和实现。只需提供目标 URL 和要发送的数据，即可完成数据发送的操作。

- 缺点

  - 仅支持 POST 请求

  只能发送 POST 请求，不能用于发送 GET 请求或其他类型的请求，这在一些场景下可能不太适用。

  - 数格式限制 大小 64kb

  数据的格式通常是键值对形式的 FormData，这对于复杂的数据结构可能需要额外的序列化和处理。

  - 无获取响应

  sendBeacon 方法发送请求后，无法获取服务器的响应信息，因此对于需要根据服务器响应做进一步处理的情况可能不适用。

## 语法

```js
navigator.sendBeacon(url[, data]);
```

data 参数 的类型`ArrayBuffer、ArrayBufferView、Blob、DOMString`、`FormData` 或 `URLSearchParams` 类型的数据。
其他类型需要数据转换

### example

```js
const handler = () => {
  let data = { name: "xxx" };
  const jsonString = JSON.stringify(data);
  let blobData = new Blob([jsonString], { type: "application/json" });

  navigator.sendBeacon("http://localhost:3000/api/beacon", blobData);
};
```

```js
const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5500"); // 设置允许的来源
  res.header("Access-Control-Allow-Headers", "Content-Type"); // 允许的请求头
  res.header("Access-Control-Allow-Credentials", "true"); // 允许发送 cookies
  next();
});

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/api/beacon", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
```
