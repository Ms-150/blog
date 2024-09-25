# Amis

一个低代码前端框架，它使用 JSON 配置来生成页面，可以减少页面开发工作量，极大提升效率。

[https://aisuda.bce.baidu.com/amis/zh-CN/docs/index](https://aisuda.bce.baidu.com/amis/zh-CN/docs/index)

## install

```bash
npm install amis
```

## usage

- sdk 形式

  `npm i amis` 来下载，在 `node_modules\amis\sdk` 目录里就能找到。

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>Amis 示例</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <link rel="stylesheet" href="https://unpkg.com/amis@latest/sdk/sdk.css" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/amis@latest/sdk/helper.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/amis@latest/sdk/iconfont.css"
    />
    <style>
      html,
      body,
      .app-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="root" class="app-wrapper"></div>
    <script src="https://unpkg.com/amis@latest/sdk/sdk.js"></script>
    <script src="amis.js"></script>
  </body>
</html>
```

```js [amis.js]
(function () {
  let amis = amisRequire("amis/embed");
  let amisScoped = amis.embed("#root", {
    type: "page",
    title: "Amis 示例页面",
    body: [
      {
        type: "form",
        title: "用户信息表单",
        api: "/api/mock2/form/saveForm",
        body: [
          {
            type: "input-text",
            name: "name",
            label: "姓名",
          },
          {
            type: "input-email",
            name: "email",
            label: "邮箱",
          },
          {
            type: "input-number",
            name: "age",
            label: "年龄",
          },
          {
            type: "submit",
            label: "提交",
          },
        ],
      },
      {
        type: "crud",
        title: "用户列表",
        api: "/api/mock2/sample",
        columns: [
          {
            name: "id",
            label: "ID",
          },
          {
            name: "engine",
            label: "引擎",
          },
          {
            name: "browser",
            label: "浏览器",
          },
          {
            name: "platform",
            label: "平台",
          },
          {
            name: "version",
            label: "版本",
          },
          {
            name: "grade",
            label: "等级",
          },
        ],
      },
    ],
  });
})();
```

:::
