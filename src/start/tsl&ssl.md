# SSL / TLS

## HTTPS

HTTPS（HyperText Transfer Protocol Secure）是一种安全的通信协议，用于在客户端（浏览器）和服务器之间传输数据。
它通过加密通信内容，确保数据在传输过程中不被窃取或篡改。
HTTPS 的安全基础建立在 SSL（Secure Sockets Layer）或更现代的 TLS（Transport Layer Security）协议上。

`Https` = `Http` + `SSL`/`TLS`

## HTTP 和 HTTPS 的区别

- HTTP 是超文本传输协议，用于在 Web 浏览器和服务器之间传输数据。
- HTTPS 通过加密来保护数据传输的安全性，是 HTTP 的安全版本。
  - 数据加密：保护数据在传输过程中的机密性。
  - 身份验证：确保用户连接到的是正确的服务器。
  - 完整性保护：防止数据在传输中被篡改。

### 加密算法

HTTPS 使用加密算法来保护数据的机密性。常见的加密算法包括对称加密算法（如 AES）、非对称加密算法（如 RSA）和哈希函数（如 SHA）。

- 对称加密 // 使用相同的密钥进行加密和解密，速度快，适合大量数据的加密传输。
- 非对称加密 // 使用公钥和私钥进行加密和解密，安全性高，常用于安全密钥交换和数字签名。
- 哈希函数 // 生成固定长度的数据摘要，用于验证数据完整性。

#### 对称加密

常见的对称加密算法

- AES（Advanced Encryption Standard）：目前最常用的对称加密算法之一，支持多种密钥长度（如 AES-128、AES-256）。
- DES（Data Encryption Standard）：较旧的对称加密算法，已逐渐被 AES 取代。

#### 非对称加密

常见的非对称加密

- RSA（Rivest-Shamir-Adleman）：最早和最广泛使用的非对称加密算法，适用于加密和数字签名。
- DSA（Digital Signature Algorithm）：专门用于数字签名的非对称加密算法。

## openSSL

一个强大的开源工具包，用于实现安全套接字层（SSL）和传输层安全（TLS）协议。它提供了密码学工具和库，可以用来保护通信的安全性，支持各种操作系统和编程语言。

[https://openssl-library.org/](https://openssl-library.org/)

[https://www.feistyduck.com/library/openssl-cookbook](https://www.feistyduck.com/library/openssl-cookbook)

```bash
openssl -v / version  # 查看版本
openssl version -a    # 全部信息

openssl help
```

### 生成自签名证书 过程

#### 1. 生成 私钥文件（Private Key）文件
#### 2. 生成 证书签名请求 `.csr`（Certificate Signing Request）文件
#### 3. 生成 签名证书 `.crt` 文件

```bash
# 1 成一个 2048 位的 RSA 算法 私钥，并将其保存在 private-key.pem 文件中。
openssl genrsa -out private-key.pem 2048
# or
openssl genpkey -algorithm RSA -out private-key.pem -aes256
# 生成一个使用 AES-256 加密的私钥。在生成过程中，
# 会被提示输入一个密码，以保护这个私钥。这个密码在以后的使用过程中需要提供来解密私钥。

# 命令 genrsa == genpkey -algorithm RSA
# genpkey 默认算法是 ECC

# 2 使用生成的私钥，生成一个证书签名请求（CSR），其中包含证书的相关信息。
openssl req -new -key private-key.pem -out certificate.csr

>>>
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:

# 3 使用生成的私钥和 CSR 文件，生成自签名证书 .crt。
openssl x509 -req -in certificate.csr -signkey private-key.pem -out certificate.crt

```

### example

- Node

```js
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("certificate.pem"),
  // 私钥密码
  passphrase: "123456",
};

https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Hello World!");
  })
  .listen(443, () => {
    console.log("HTTPS server running on port 443");
  });
```

- nginx

```diff
# HTTPS server
server {
    listen       443 ssl;
    server_name  localhost;

# 证书
+    ssl_certificate      ./certificate/certificate.crt;
# 私钥
+    ssl_certificate_key   ./certificate/private-key.pem;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root   html;
        index  index.html index.htm;
   }
}
```
