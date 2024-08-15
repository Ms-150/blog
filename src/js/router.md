# router 路由

## hash 路由

一种常见的前端路由技术，主要用于单页应用（SPA）。
它使用 URL 的 hash 部分（即 # 后面的部分）来表示不同的页面或视图。

### 原理

- **Hash 部分** URL 中 `#`之后的部分称为 hash。
  改变 hash 不会导致页面重新加载，但会触发 `hashchange` 事件。

- **Hash 路由** 利用 hash 的变化来实现不同视图的切换，从而实现单页应用的导航。

```js
www.test.com/#/a
// 直接赋值也可以
location.hash = "/b";

www.test.com/#/b

// 监听 hash 变化 hashchange
window.addEventListener(
  "hashchange",
  function (e) {
    console.log(e, "The hash has changed!");
  },
  false
);
```

## history 路由

利用 `HTML5 History API` 实现的前端路由技术，主要用于单页应用（SPA）。

与 Hash 路由不同，History 路由不使用 URL 的 hash 部分，而是利用 `pushState` 和 `replaceState` 方法直接操作浏览器的历史记录，允许我们创建更美观和语义化的 URL。

```js
history.pushState(state, title, url); // 跳转
history.replaceState(state, title, url); // 替换当前的记录

history.back();
history.forward();
history.go(n);

// 监听
window.addEventListener("popstate", function (e) {
  console.log(e);
});
```

### history 刷新页面 404

url 请求未匹配到对应的静态资源或 api 接口

```js
// 解决：服务端 获取不到资源 将 url 重定向到根目录
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname, "public")));

// 捕获所有未匹配的路由，返回 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```
