# JWT (JSON Web Token)

一种用于在网络上安全地传递信息的开放标准（RFC 7519）。JWT 主要用于在用户和服务器之间传递身份验证信息。

[https://jwt.io/introduction](https://jwt.io/introduction)

```js
// 示例
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
  .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c;
```

## 组成 composition

```js
// example
Header.Payload.Signature;
```

1.  Header 头部

    描述 JWT 的元数据

    ```json
    {
      "alg": "HS256", // algorithm 签名的算法 默认 HS256 (HMAC SHA256)
      "typ": "JWT" // type 令牌的类型 JWT 令牌统一写为JWT
    }
    ```

2.  Payload 载荷

    实际需要传递的数据

    ### JWT 规定了 7 个官方字段

    1. iss (issuer) // 签发人
    2. exp (expiration time) // 过期时间
    3. sub (subject) // 主题
    4. aud (audience) // 受众
    5. nbf (Not Before) // 生效时间
    6. iat (Issued At) // 签发时间
    7. jti (JWT ID) // 编号

    还可以在这个部分定义私有字段

    ```json
    "name": "John Doe",
    "admin": true
    ```

    这部分默认不加密，不能把秘密信息放在这个部分

3.  Signature 签名

    对前两部分的签名，防止数据篡改。

    指定一个密钥 `secret`。这个密钥只有服务器才知道，不能泄露给用户。对前两部分的签名，防止数据篡改。

    ```js
    HMACSHA256(
      base64UrlEncode(header) + "." + base64UrlEncode(payload),
      secret
    );
    ```

## Base64URL

它类似于 base64。  
JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。  
Base64 有三个字符`+`、`/`和`=`，在 URL 里面有特殊含义，所以要被替换掉：`=`被`省略`、`+`替换成`-`，`/`替换成`_` 。这就是 Base64URL 算法。

## JWT 的使用方式

客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage / sessionStorage。

此后，客户端每次与服务器通信，都要带上这个 JWT。

- 你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，
  Cookie 存在跨域限制，不能在不同域名下共享。
- 所以更好的做法是放在 HTTP 请求的头信息 Authorization 字段里面。
  ```json
  Authorization: Bearer <token>
  ```
- 另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。

## nodejs 使用 jsonwebtoken

```bash
npm install jsonwebtoken
```

1. 前端

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <form id="form">
      <input type="text" value="123" name="username" />
      <input type="password" value="456" name="password" />
      <button type="submit" onclick="login()">提交</button>
    </form>

    <button onclick="handleGet()">点击获取数据</button>

    <script>
      const login = () => {
        event.preventDefault();
        let form = document.getElementById("form");
        let formData = new FormData(form);

        let data = {};
        for (const [key, value] of formData.entries()) {
          data[key] = value;
        }

        fetch("http://localhost:8080/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              return response.json(); // 解析 JSON 响应
            } else {
              throw new Error("网络响应失败.");
            }
          })
          .then((data) => {
            // 处理登录成功逻辑
            console.log("登录成功", data);
            localStorage.setItem("token", data.token); // 将 token 存储在 localStorage 中
            // 根据需要添加更多逻辑
          })
          .catch((error) => {
            console.error("网络错误", error);
            // 可以在这里处理网络错误的逻辑
          });
      };

      const handleGet = () => {
        console.log("handle");
        fetch("http://localhost:8080/login/getAuth", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("网络响应失败.");
            }
          })
          .then((data) => {
            console.log(data.data);
          });
      };
    </script>
  </body>
</html>
```

2. 后端

```js
// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./mima");

app.use(express.json());
app.use(cors());
const port = 8080;

app.get("/", (req, res) => {
  res.send("/ hello world");
});

app.post("/", (req, res) => {
  console.log(req);
  res.status(200).send("/ post");
  console.log("/ post");
});

app.use("/login", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// mima.js
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const privateKey = require("./config").secretKey;
console.log(privateKey);

router.post("/", (req, res) => {
  const { username } = req.body;
  console.log(username);
  const token = jwt.sign({ data: username }, privateKey, { expiresIn: "1h" });

  res.status(200).json({ token });
});

router.post("/getAuth", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // 如果没有提供 token，则返回 401 Unauthorized
    return res.status(401).json({ error: "未提供身份验证令牌" });
  }

  // 验证 JWT
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      // JWT 验证失败
      console.error("JWT 验证失败:", err);
      // 返回 403 Forbidden 或其他适当的错误响应
      return res.status(403).json({ error: "身份验证失败" });
    } else {
      // JWT 验证成功，decoded 中包含解码后的 payload
      console.log("JWT 验证成功，解码后的 payload:", decoded);
      // 在这里处理验证成功后的逻辑，例如继续处理请求或者返回响应
      res.status(200).json({ data: decoded.data });
    }
  });
});

module.exports = router;
```
