# Security 安全

- XSS Cross-Site Scripting 跨站脚本攻击
- CSRF 跨站请求伪造

## XSS 跨站脚本攻击

攻击者通过在网页中注入恶意脚本，利用用户浏览器的执行能力来实施攻击。

### 类型

- 存储型 XSS

  是指恶意脚本被永久存储在目标服务器上，例如数据库、日志、消息论坛、评论区等。受害者在浏览网页时，恶意脚本会从服务器上被加载并执行。

  ```html
  <a href="http://example.com/?q=<script>alert('XSS')</script>">点击这里</a>
  ```

- 反射型 XSS

  是指恶意脚本通过 URL 参数或表单提交的数据，立即反射回网页并在受害者的浏览器中执行。与存储型 XSS 不同，反射型 XSS 不会被存储在服务器上。

  ```html
  <input type="text" name="comment" value="<script>alert('XSS')</script>" />
  ```

- DOM 型 XSS

  是指恶意脚本通过修改页面的 DOM 结构，使得恶意代码在客户端被执行。这种攻击不涉及服务器端的输入输出，而是直接在客户端发生。

  ```js
  // 获取 URL 参数中的 'query' 值
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  // 将用户输入直接插入到页面中
  document.getElementById("results").innerHTML = "You searched for: " + query;

  // 用户访问如下 URL，将会触发 XSS 漏洞
  // http://example.com/?query=<script>alert('XSS')</script>
  ```

### 防御

- #### 输入过滤 输出转译
  详见 [HTML 转义](#转义)

```js
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

// 转义用户输入
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

document.getElementById("results").innerHTML =
  "You searched for: " + escapeHTML(query);
```

- #### CSP (Content Security Policy)内容安全策略

  - Express helmet

  ```js
  // npm i helmet
  const express = require("express");
  const helmet = require("helmet");
  const app = express();

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        styleSrc: ["'self'"],
      },
    })
  );
  ```

  - 使用 CSP Meta 标签

  ```html
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self';"
  />
  ```

- #### npm xss 库

专注于净化和过滤用户输入的库，主要用于防止 XSS 攻击。
它通过转义或删除可能包含恶意脚本的内容来确保用户输入的安全。

```bash
npm i xss
# or
<script src="https://rawgit.com/leizongmin/js-xss/master/dist/xss.js"></script>
```

## CSRF 跨站请求伪造

攻击者通过欺骗用户在已登录的 Web 应用程序上执行未经授权的操作。攻击者在受害者的浏览器中伪造请求，以执行某个操作，而这个请求被 Web 应用程序误认为是受信任的。

### 防御

- 使用 CSRF 令牌（CSRF token）验证每个表单提交和敏感操作。
- 额外验证 限制对敏感资源的访问，确保只有授权用户能够执行关键操作。

## 转义

`HTML转义` 是一种将 特殊字符 转换为 HTML 实体 表示形式的过程，以防止这些字符被浏览器解释为 HTML 标签或 JavaScript 代码。

| 字符 | HTML 实体          |
| ---- | ------------------ |
| <    | `&lt;`             |
| >    | `&gt;`             |
| &    | `&amp;`            |
| "    | `&quot;`           |
| '    | `&#39;` / `&apos;` |
