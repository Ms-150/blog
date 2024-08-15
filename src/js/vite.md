# Vite

下一代的前端工具链 为开发提供极速响应

[https://cn.vitejs.dev/](https://cn.vitejs.dev/)

## feature 特点

- 快速的冷启动  
   Vite 利用了 ES Module 的特性，可以在启动开发服务器时快速加载文件，从而实现快速的冷启动。
- 即时热更新  
   Vite 支持即时热更新，使开发人员在修改代码时可以立即看到更改的效果，无需手动刷新浏览器。
- 按需编译  
   Vite 可以根据需要按需编译代码，而不必编译整个项目。
- 原生 ES 模块支持  
   Vite 支持原生 ES 模块，这意味着可以直接使用现代 JavaScript 的模块化语法，而无需使用转译工具（如 Babel）。
- 内置开发服务器  
   Vite 包含了一个内置的开发服务器，支持 HTTP/2 和服务器端渲染（SSR）等功能。

## 技术使用

- 开发环境
  - 使用 Esbuild // 快速构建和优化算法使得 Vite 能够快速响应文件变更并进行即时的模块重建，配合 HMR 提供流畅的开发体验。
  - 预构建的依赖（例如常用的库或框架）缓存到 node_modules/.vite
- 生产环境
  - 使用 Rollup
  - 优化的静态资源文件，实现代码的优化、压缩和打包。

## 搭建 Vite 项目

```bash
npm create vite@latest
```

## proxy 代理

```js
server: {
    proxy: {
      "/api": {
        target: "http://api.example.com", // 目标主机
        changeOrigin: true, // 是否改变请求头中的 Origin 字段，用于虚拟主机
        rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写
      },
    },
  },
```
### 实现
底层使用 [`http-proxy`](https://www.npmjs.com/package/http-proxy) 实现
