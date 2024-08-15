# Ajax

一个用于创建动态和交互式网页应用的技术。
通过 AJAX，网页可以在不重新加载整个页面的情况下向服务器发送请求并接收响应，从而更新页面的部分内容。

## XHR XMLHttpRequest

1. 创建 XMLHttpRequest 对象
2. 配置请求

   - setRequestHeader 详见 [http-headers](#http-headers)
     - Content-Type: 表示请求体的格式（例如 application/json、application/x-www-form-urlencoded）。
     - Authorization: 用于传递身份验证信息（例如 Bearer token）。

3. 处理响应  
   处理方式

   1. onreadystatechange // 判断 xhr.readyState 和 xhr.status
   2. onload // 判断 xhr.status

4. 发送请求

- GET 请求

```js
// 1. 创建 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();

// 2. 配置请求 请求方法 请求地址 是否异步  默认 true
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1", true);

// 3. 设置回调函数
// 第 1 种方法处理  使用 onload  判断 status
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    // 处理响应数据
    var response = JSON.parse(xhr.responseText);
    console.log("请求成功，数据：", response);
  } else {
    console.error("请求失败");
  }
};
// 第 2 种方法处理  使用 onreadystatechange 判断 readyState 和 status
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    console.log("请求成功，数据：", response);
  } else {
    console.error("请求失败");
  }
};

// 发送请求
xhr.send();
```

- POST 请求

```js
// 创建一个新的 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();

// 配置请`求方法`、URL 和是否异步
xhr.open("POST", "https://example.com/api/endpoint", true);

// 设置请求头，指明发送的数据类型
xhr.setRequestHeader("Content-Type", "application/json");

// 定义请求完成后的回调函数
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    // 请求成功
    console.log("Response:", xhr.responseText);
  } else {
    // 请求失败
    console.error("Request failed with status:", xhr.status);
  }
};

// 处理请求出错的情况
xhr.onerror = function () {
  console.error("Request failed");
};

// 发送请求数据，作为 JSON 字符串
var data = JSON.stringify({ key1: "value1", key2: "value2" });
xhr.send(data);
```

### 请求进度

- Event Handler 事件处理程序 形式

```js
// 监听上传进度
xhr.upload.onprogress = function (event) {
  if (event.lengthComputable) {
    console.log(
      `上传进度：${((event.loaded / event.total) * 100).toFixed(2)}%`
    );
  } else {
    console.log("上传进度未知");
  }
};

// 监听下载进度
xhr.onprogress = function (event) {
  if (event.lengthComputable) {
    console.log(
      `下载进度：${((event.loaded / event.total) * 100).toFixed(2)}%`
    );
  } else {
    console.log("下载进度未知");
  }
};
```

- Event Listener 事件监听器 形式

```js
// 使用 addEventListener 监听上传进度
xhr.upload.addEventListener("progress", function (event) {
  if (event.lengthComputable) {
    console.log(
      `上传进度：${((event.loaded / event.total) * 100).toFixed(2)}%`
    );
  } else {
    console.log("上传进度未知");
  }
});

// 使用 addEventListener 监听下载进度
xhr.addEventListener("progress", function (event) {
  if (event.lengthComputable) {
    console.log(
      `下载进度：${((event.loaded / event.total) * 100).toFixed(2)}%`
    );
  } else {
    console.log("下载进度未知");
  }
});
```

### 请求中断

```js
// 中断请求
xhr.abort();

// 中断请求监听
xhr.addEventListener("abort", function () {
  console.log("请求被中断");
});
```

### 超时

```js
// 设置超时时间，单位是毫秒
xhr.timeout = 5000; // 例如设置超时时间为 5 秒钟

xhr.ontimeout = function () {
  // 请求超时处理
  console.error("Request timed out");
};
```

### 网络错误

```js
xhr.onerror = function () {
  console.error("网络错误或请求无法完成");
};
```

## Fetch

用于发送网络请求，并返回一个 `Promise` 对象，这样你可以使用 `then()` 和 `catch()` 方法来处理请求的响应或错误。
它支持 `GET`、`POST`、`PUT`、`DELETE` 等 HTTP 方法。

```js
fetch(url[, options])
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### `options` 对象

- method 详见 [http-mothod](#http-mothod)

  常用值: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`, `TRACE`, `CONNECT`

- headers 详见 [http-headers](#http-headers)

  常用头部字段

  - `Content-Type`: 表示请求体的格式（例如 application/json、application/x-www-form-urlencoded）。
  - `Authorization`: 用于传递身份验证信息（例如 Bearer token）。

- body 请求体数据通常在 POST、PUT 或 PATCH 请求中使用。

  ```js
  <!-- application/x-www-form-urlencoded  => new URLSearchParams()-->
  fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      key1: 'value1',
      key2: 'value2'
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  ```

- mode

  | 值          | 注解                   |
  | ----------- | ---------------------- |
  | cors        | 允许跨域请求           |
  | no-cors     | 只允许某些简单请求跨域 |
  | same-origin | 请求必须同源           |

- credentials 用户凭证
  指定是否包括用户凭证（如 cookies）。

  | 值           | 注解                 |
  | ------------ | -------------------- |
  | omit         | 不包含凭证           |
  | same-origion | 仅对同源请求包含凭证 |
  | include      | 对所有请求包含凭证   |

- cache 指定请求缓存的策略

  | 值             | 注解                                 |
  | -------------- | ------------------------------------ |
  | default        | 浏览器的默认缓存行为                 |
  | no-store       | 不缓存请求或响应                     |
  | reload         | 强制从网络加载资源                   |
  | no-cache       | 检查资源的新鲜度                     |
  | force-cache    | 使用缓存                             |
  | only-if-cached | 只从缓存中获取资源（不发起网络请求） |

- signal
  提供一个 AbortSignal 实例来中止请求。

```js
const controller = new AbortController();
const signal = controller.signal;

fetch("https://api.example.com/data", {
  signal: signal,
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Fetch request was aborted");
    } else {
      console.error("Fetch error:", error);
    }
  });

// 取消请求
controller.abort();
```

### 处理服务器返回的响应数据 第一个 `.then`

| 方法                   | 说明                                 | 返回类型               |
| ---------------------- | ------------------------------------ | ---------------------- |
| response.json()        | 解析响应体为 `JSON` 对象             | `Promise<object>`      |
| response.text()        | 以文本形式读取响应体                 | `Promise<string>`      |
| response.blob()        | 读取响应体为二进制大对象（Blob）     | `Promise<Blob>`        |
| response.formData()    | 解析 multipart/form-data 格式的数据  | `Promise<FormData>`    |
| response.arrayBuffer() | 读取响应体为 `ArrayBuffer` 对象      | `Promise<ArrayBuffer>` |
| response.clone()       | 克隆响应对象用于处理响应体的多次读取 | `Response`             |

### 中断请求

```js
const abort = new AbortController();

fetch("http://localhost:3000/api/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  signal: abort.signal,
  body: JSON.stringify({
    name: "zhangsan",
    age: 18,
  }),
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(res);
    return res.json();
  })
  .then((data) => {
    console.log(data); // 处理成功的响应数据
  })
  .catch((error) => {
    console.error("Fetch error:", error); // 处理 fetch 错误
  });

// 中断请求
abort.abort();
```

### 请求进度

```js
fetch("http://localhost:3000/api/txt", { signal: abort.signal })
  .then((data) => {
    // 克隆响应对象，以备多次使用
    const response = data.clone();

    // 进度
    const reader = data.body.getReader();
    const contentLength = data.headers.get("Content-Length");
    let loaded = 0;

    // 更新进度条的函数
    const updateProgress = () => {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            return;
          }
          loaded += value ? value.length : 0;
          let progress = ((loaded / contentLength) * 100).toFixed(2) + "%";
          console.log(progress);
          updateProgress(); // 递归调用更新进度条
        })
        .catch((error) => {
          console.error("Error reading data:", error);
        });
    };

    // 开始更新进度条
    updateProgress();
    return response.text();
  })
  .then((text) => {
    console.log(text); // 处理响应文本的操作
  });
```

## SSE (Server-Sent Events)

一种基于 HTTP 的技术，允许服务器端向客户端推送事件。它建立在常规的 HTTP 请求-响应模型之上，但是允许服务器持续发送数据给客户端，而无需客户端显式请求。

### 使用场景

- ChatGPT
- 实时数据 大屏

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <div id="con">内容：</div>
    <button onclick="handler()">获取数据</button>
    <script>
      const con = document.getElementById("con");
      const handler = () => {
        const sse = new EventSource("http://localhost:3000/api/sse");
        sse.addEventListener("xxx", (e) => {
          // xxx 是sse 事件名称 默认 message
          console.log(e);
          con.innerHTML += e.data;
        });
      };
    </script>
  </body>
</html>
```

```js
const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/sse", function (req, res) {
  res.writeHead(200, { "Content-Type": "text/event-stream" });
  const data =
    "# SSE (Server-Sent Events) 一种基于 HTTP 的技术，允许服务器端向客户端推送事件。它建立在常规的 HTTP 请求-响应模型之上，但是允许服务器持续发送数据给客户端，而无需客户端显式请求。";
  let arr = data.split("");
  let current = 0;
  const timer = setInterval(() => {
    if (current < arr.length) {
      res.write(`event: xxx\n`); // 自定义事件名称 默认为 message
      res.write(`data: ${arr[current]}\n\n`); // \n\n 结束每条消息
      current++;
    } else {
      clearInterval(timer);
    }
  }, 100);
});

app.listen(3000);
```

## FormData 表单数据

```js
// 通过无参数创建 FormData 对象
let formData = new FormData();

// 添加数据
formData.append("name", "Alice");
formData.append("age", 30);
formData.append("email", "alice@example.com");

// 通过表单元素创建 FormData 对象
let formElement = document.querySelector("form");
let formDataFromElement = new FormData(formElement);
```

### 常用方法

- append(name, value[, filename])
- delete(name)
- get(name) // 获取指定键的第一个值
- getAll(name) // 获取指定键的所有值（返回一个数组）
- has(name) // 检查 FormData 对象中是否包含某个键。
- set(name, value[, filename]) // 设置指定键的值。如果键存在则更新值，如果不存在则添加新键值对。
- keys() // 返回一个包含所有键的迭代器。
- values() // 返回一个包含所有值的迭代器。
- entries() // 返回一个包含键值对的迭代器。

# HTTP

## http method

| 值     | 备注                             | 备注 |
| ------ | -------------------------------- | ---- |
| GET    | 从服务器请求数据                 | 默认 |
| POST   | 向服务器发送数据                 |      |
| PUT    | 更新服务器上的现有数据           |      |
| PATCH  | 对服务器上的现有数据进行部分修改 |      |
| DELETE | 从服务器删除数据                 |      |

## http headers

| Content-Type 类型                 | 说明               | 示例数据                                            |
| --------------------------------- | ------------------ | --------------------------------------------------- |
| application/json                  | JSON 格式数据      | `{"key1": "value1", "key2": "value2"}`              |
| application/x-www-form-urlencoded | 表单数据           | `key1=value1&key2=value2`                           |
| multipart/form-data               | 文件上传和表单数据 | `FormData 对象` 详见 [FormDate](#formdata-表单数据) |

| readyState 状态 | 状态描述         | 常量                            |
| :-------------: | ---------------- | ------------------------------- |
|        0        | 请求未初始化     | XMLHttpRequest.UNSENT           |
|        1        | 服务器连接已建立 | XMLHttpRequest.OPENED           |
|        2        | 请求已接收       | XMLHttpRequest.HEADERS_RECEIVED |
|        3        | 请求处理中       | XMLHttpRequest.LOADING          |
|        4        | 请求已完成       | XMLHttpRequest.DONE             |

## http status

| status 状态 | 含义                  | 状态描述                           |
| :---------: | --------------------- | ---------------------------------- |
|     200     | OK                    | 请求成功，服务器返回请求的数据     |
|     201     | Created               | 请求成功，服务器创建了一个新的资源 |
|     204     | No Content            | 请求成功，但没有返回内容           |
|     301     | Moved Permanently     | 请求的资源已被永久移动到新位置     |
|     302     | Found                 | 请求的资源临时被移动到新位置       |
|     400     | Bad Request           | 请求无效，服务器无法理解请求       |
|     401     | Unauthorized          | 请求未授权，用户需要登录           |
|     403     | Forbidden             | 服务器拒绝请求，用户没有访问权限   |
|     404     | Not Found             | 请求的资源未找到                   |
|     500     | Internal Server Error | 服务器内部错误                     |

