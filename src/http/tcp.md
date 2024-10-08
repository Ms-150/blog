# TCP

TCP（Transmission Control Protocol，传输控制协议）是一种面向连接的、可靠的传输层协议。它在计算机网络中用于确保数据包按顺序、无错误地传输。

三次握手和四次挥手

## 连接

```bash
Client                Server
  |                     |
  |   ---- SYN  ---->   |  （客户端发送 [SYN] 请求，SEQ=x）
  |   SEQ=x             |
  |                     |
  |   <-- SYN, ACK ---  |  （服务器响应 [SYN，ACK]，SEQ=y，ACK=x+1）
  |   SEQ=y, ACK=x+1    |
  |                     |
  |   ---- ACK ---->    |  （客户端确认 [ACK]，SEQ=x+1，ACK=y+1）
  |   SEQ=x+1, ACK=y+1  |
  |                     |

连接建立完成
```

## 关闭

```bash
Client                Server
  |                     |
  |   ---- FIN ---->    |  （客户端发送 [FIN] 请求，SEQ=u）
  |   SEQ=u             |
  |                     |
  |   <-- ACK -----     |  （服务器响应 [ACK]，SEQ=v，ACK=u+1）
  |   SEQ=v, ACK=u+1    |
  |                     |
  |   <-- FIN -----     |  （服务器发送 [FIN] 请求，SEQ=w）
  |   SEQ=w             |
  |                     |
  |   ---- ACK ---->    |  （客户端确认 [ACK]，SEQ=u+1，ACK=w+1）
  |   SEQ=u+1, ACK=w+1  |
  |                     |

连接关闭完成
```

| 名词 | 全拼            | 注解     |
| ---- | --------------- | -------- |
| SYN  | Synchronize     | 同步信号 |
| SEQ  | Sequence Number | 序列号   |
| ACK  | Acknowledgment  | 确认信号 |
| FIN  | Finish          | 结束信号 |

## Wireshark 抓包

一个开放源代码的网络协议分析器，用于捕获和分析网络数据包。

[https://www.wireshark.org/](https://www.wireshark.org/)

## 实现 http 服务

```js
const net = require("net");

// 创建一个 TCP 服务器
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // 解析 HTTP 请求
    const request = data.toString();
    console.log("Received request:\n", request);

    const res = "Hello World!";
    // 构建 HTTP 响应
    const response = [
      "HTTP/1.1 200 OK",
      "Content-Type: text/plain",
      `Content-Length: ${res.length}`,
      "", // 空行分隔头部和主体
      res,
    ];

    // 发送 HTTP 响应
    socket.write(response.join("\r\n"));
    socket.end();
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});
```
