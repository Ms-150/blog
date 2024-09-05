# Browser-sync

节省时间的同步浏览器测试。

[https://browsersync.io/](https://browsersync.io/)

## install

```sh
npm install -g browser-sync

# or
npm install browser-sync --save-dev
```

## usage

- command line

```sh
browser-sync help

browser-sync
```

- 脚本使用

```js
const browserSync = require("browser-sync").create();

// 初始化 BrowserSync 服务器
browserSync.init({
    server: {
        baseDir: "./"  // 指定服务器的根目录
    }
});
```
