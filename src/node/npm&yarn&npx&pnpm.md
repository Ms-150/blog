# NPM NPX YARN PNPM

## NPM

[https://www.npmjs.com/](https://www.npmjs.com/)

#### NPM 是随同 NodeJS 一起安装的包管理工具，能解决 NodeJS 代码部署上的很多问题。

#### 常见的使用场景

- 从 NPM 服务器下载别人编写的第三方包到本地使用。
- 从 NPM 服务器下载并安装别人编写的命令行程序到本地使用。
- 将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。

### npm 命令

```bash
npm -v                  # 版本提示
npm config list		    # 查看当前 npm 配置项
npm install express     # 安装模块
npm install express -g  # 全局安装模块
npm uninstall express   # 卸载模块
npm update express      # 更新模块
npm list -g             # 查看所有下载的模块

npm root -g     # 查看全局包安装路径
>>>
/usr/local/lib/node_modules
```

#### 使用淘宝镜像的命令：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 查看当前源
npm get registry
# 临时用淘宝镜像安装依赖
npm config set registry https://registry.npmjs.org
>
npm config set registry https://registry.npm.taobao.org
```

## NPX

#### npm 从 5.2 版开始，增加了 npx 命令。

#### npx 可以检索 package.json 里安装的依赖版本，避免版本问题。

#### npx 可以指定 node 版本、命令的版本，解决了不同项目使用不同版本的命令的问题。

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
