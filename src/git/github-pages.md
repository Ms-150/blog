# GitHub Pages

为您和您的项目提供的网站。
直接从您的 GitHub 存储库托管。只需编辑、推送，您的更改即可上线。

[https://pages.github.com/](https://pages.github.com/)

## 创建

- 用户组/组织站点

  1. 创建一个名为 `username.github.io` 的新公共存储库.（将 username 替换为你的 GitHub 用户名）。
  2. 访问 `https://yourusername.github.io`

- 项目站点
  1. 创建一个普通的新公共存储库 例如 `repo`
  2. 访问 `https://yourusername.github.io/repo`

## 使用 gh-pages 发布网站到 github pages

```sh
npm i gh-pages -D
```

```diff
# package.json
+ "homepage": "https://username.github.io/repo",
"scripts": {
# 生命周期 pre 在部署之前运行构建脚本 build
+    "predeploy": "yarn run build",
+    "deploy": "gh-pages -d dist",
# 将构建后的文件 dist 上传到 gh-pages 分支
}
```

```sh
npm run deploy

>>>
Published
✨  Done in 69.89s.

# 浏览器打开 `https://username.github.io/repo`（homepage的值）即可查看

```
