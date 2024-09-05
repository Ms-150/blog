# 模版引擎

- EJS
- Handlebars.js
- Mustache

# EJS（Embedded JavaScript）

高效的嵌入式 JavaScript 模板引擎。

[https://ejs.co/](https://ejs.co/)

“E” 代表什么？“嵌入式”？可能是。“有效”、“优雅”还是“简单”？EJS 是一种简单的模板语言，可让您使用纯 JavaScript 生成 HTML 标记。无需虔诚地组织事物。无需重新发明迭代和控制流。它只是纯 JavaScript。

## install

```bash
npm install ejs

npx ejs -v
npx ejs -h
```

## usage

```js
const ejs = require("ejs");

// 设置 EJS 为视图引擎
app.set("view engine", "ejs");
```

### 创建 EJS 模板文件 `template.ejs`

```bash
mkdir views && touch template.ejs
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title><%= title %></title>
  </head>
  <body>
    <h1><%= message %></h1>
    <ul>
      <% items.forEach(function(item) { %>
      <li><%= item %></li>
      <% }); %>
    </ul>
  </body>
</html>
<!-- 
<%= ... %> 用于插入变量的值。
<% ... %> 用于执行 JavaScript 代码块。
 -->
```

### 渲染

- ejs.render(str, data, options) 渲染模板

```js
import ejs from "ejs";
import fs from "fs";

const template = fs.readFileSync("./template.ejs", "utf-8");

const data = {
  title: "EJS Example",
  message: "Hello, EJS!",
  items: ["Item 1", "Item 2", "Item 3"],
};

const html = ejs.render(template, data);

console.log(html);
```

- ejs.renderFile(filename, data, options, callback) 渲染模板并输出到 HTML

```js
import ejs from "ejs";
import fs from "fs";

ejs.renderFile(
  "./template.ejs",
  {
    title: "EJS Example",
    message: "Hello, EJS!",
    items: ["Item 1", "Item 2", "Item 3"],
  },
  (err, data) => {
    if (err) throw err;
    fs.writeFileSync("output.html", data);
    console.log("HTML file created!");
  }
);
```

### 条件语句和循环

```html
<% if (user.isAdmin) { %>
<p>Welcome Admin!</p>
<% } else { %>
<p>Welcome <%= user.name %>!</p>
<% } %>

<ul>
  <% users.forEach(function(user) { %>
  <li><%= user.name %></li>
  <% }); %>
</ul>
```

## 布局和局部视图

1. 创建局部试图文件

   创建一个包含要重用的模板片段的 EJS 文件

```html
<!-- partial.ejs -->
<div>
  <h2>This is a partial view!</h2>
  <p><%= message %></p>
</div>
```

2. 在主视图中引入局部视图

   使用 <%- include('partial.ejs') %> 引入局部视图

```html
<!-- main.ejs -->
<html>
  <head>
    <title>Main View</title>
  </head>
  <body>
    <h1>Main View Content</h1>

    <!-- Include the partial view -->
    <%- include('partial.ejs', { message: 'Hello from main view!' }) %>
  </body>
</html>
```

3. 渲染主视图

```js
const express = require("express");
const ejs = require("ejs");
const app = express();

// 设置模板引擎为EJS
app.set("view engine", "ejs");

// 渲染主视图
app.get("/", (req, res) => {
  res.render("main", { message: "Hello from Express!" });
});

// 启动服务器
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

# Handlebars.js

Mustache
