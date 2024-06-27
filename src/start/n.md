# N

交互式管理 `Node.js` 版本

[https://github.com/tj/n](https://github.com/tj/n)

## install

```bash
brew install n  # brew 安装
npm install n   # npm 安装
```

## usage

```bash
n <version>     # 下载特定版本 eg：n 16.20.2
n stable        # 安装最新稳定版
n lts           # 安装最新长期维护版
n latest        # 安装最新版本

n ls            # 查看已安装的的Node
n rm <version>  # 删除指定版本
```

### switch node version

```bash
n       # 查看可用的node
上下键   # 切换版本
Enter   # 选中
q       # 退出
d       # 删除
```

// 注：没有 n 没有权限 需要使用 sudo

## mac 给文件加权限

```bash
sudo chown -R `whoami`:admin /usr/local/n/versions/node
# :admin 后面为路径
```
