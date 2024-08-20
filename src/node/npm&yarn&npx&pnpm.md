# NPM NPX YARN PNPM

## NPM

随同 NodeJS 一起安装的包管理工具，能解决 NodeJS 代码部署上的很多问题。

[https://www.npmjs.com/](https://www.npmjs.com/)

#### 常见的使用场景

- 从 NPM 服务器下载别人编写的第三方包到本地使用。
- 从 NPM 服务器下载并安装别人编写的命令行程序到本地使用。
- 将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。

### npm 常用命令

```bash
npm -v                 # 版本提示
npm config list		   # 查看当前 npm 配置项
npm install 包名        # 安装模块
npm install 包名 -g     # 全局安装模块
npm uninstall 包名      # 卸载模块
npm update 包名         # 更新模块
npm list -g            # 查看所有下载的模块

npm root -g            # 查看全局包安装路径
>>>
/usr/local/lib/node_modules
```

### npm run 的原理

执行 `node_modules/.bin` 下的可执行文件

1. 先从当前项目的 `node_modules/.bin` 去查找可执行命令 vite
2. 如果没找到就去全局的 `node_modules` 去找可执行命令 vite
3. 如果还没找到就去环境变量查找 再找不到就进行报错

### npm 生命周期

```sh
"predev": "node prev.js",   # dev 之前运行
"dev": "node index.js",     # 运行 dev
"postdev": "node post.js"   # dev 之后运行
```

### 切换源

```sh
npm install cnpm -g --registry=https://registry.npmmirror.com

# 查看当前源
npm get registry

# 临时切换源下载 --registry=
npm install express --registry=https://registry.npmmirror.com/

# 用淘宝镜像安装依赖
npm config set registry https://registry.npmmirror.com/
```

## NPX

npm 从 5.2 版开始，增加了 npx 命令。

它是 npm 的一个扩展，用于简化执行本地安装包的命令以及临时执行 npm 包。

### 优势

1. 避免全局安装: npx 允许你执行 npm package ，而不需要你先全局安装它。
2. 总是使用最新版本: 没有在本地安装相应的 npm package，npx 会从 npm 的 package 仓库中下载并使用最新版。
3. 执行任意: 不仅可以执行在 package.json 的 scripts 部分定义的命令，还可以执行任何 npm package。

### npm npx 的区别

- `npm` Node.js 的包管理器，主要用于安装、管理和共享 JavaScript 包。
- `npx` npm 的一个扩展工具，用于简化执行 npm 包中的命令。它可以立即运行本地安装或远程下载的 npm 包中的可执行文件，而不需要手动去指定路径或进行全局安装。

### 发布 `npm包`

```sh
# 1. 注册
npm useradd

# 2. 登陆
npm login

# 3. 发布
npm publish
```

### npm 私有仓库

verdaccio

一个开源的轻量级私有 npm 代理注册表，允许你托管自己的 npm 仓库并缓存来自官方 npm 仓库的包。

[https://verdaccio.org/zh-cn/](https://verdaccio.org/zh-cn/)

```sh
npm install -g verdaccio

verdaccio -h

# 默认 4873 端口
npm publish --registry http://localhost:4873/ # 发布包

npm unpublish <package-name> --registry http://localhost:4873 # 从仓库删除包
```

## Yarn

一个兼具项目管理器功能的软件包管理器。

[https://yarnpkg.com/](https://yarnpkg.com/)

### 安装

```bash
brew install yarn   # brew 安装
npm install yarn -g # npm 安装

yarn global dir     # 查看全局包安装路径
>>>
/Users/ms/.config/yarn/global
```

### 设置国内镜像源

```bash
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

### yarn 命令

```bash
yarn / yarn install   # 安装依赖
yarn add [包名]       # 安装指定包
yarn [global] add [包名][@version]    # [全局]安装包[指定版本]
yarn [global] remove [包名]     # 全局删除指定包
yarn global list        # 列出全局安装的包
Yarn global dir	# 列出全局安装的目录
yarn [global] upgrade   # 更新[全局]安装的包
yarn set version latest # 更新 yarn 最新
```

## PNPM

快速、节省磁盘空间的包管理器

[https://pnpm.io/](https://pnpm.io/)

#### 节约磁盘空间并提升安装速度、创建非扁平化的 node_modules 文件夹

#### 同 yarn 和 npm 一样，pnpm 仍然使用缓存来保存已经安装过的包，以及使用 pnpm-lock.yaml 来记录详细的依赖版本。

### 安装

```bash
npm install -g pnpm # npm 安装
npx add -g pnpm     # npx 安装
brew install pnpm   # brew 安装
```

### usage

```bash
pnpm add  [-D] <package>
pnpm remove <package>
pnpm update

pnpm store path # 所有依赖的安装位置
```

### 硬链接和软链接 hardlink and symlink

- hardlink 指向文件数据的直接引用，多个硬连接共享一个数据块，硬连接之一被删除时，文件依然保留，还有其他硬连接指向该数据。
- symlink 类似快捷方式，指向文件的路径，软连接删除不会影响源文件。

### ln 命令 用于创建链接的命令

```bash
ln <源文件> <硬链接文件>     # hardlink
ln -s <源文件或目录> <软链接文件>   # symlink

# 查看
ls <文件>

ls -l  s.text a.text  # s.text 为symlink
>>>
-rw-r--r--@ 2 ms  staff  3  6 13 11:38 a.text
lrwxr-xr-x  1 ms  staff  6  6 13 11:15 s.text -> a.text
```
