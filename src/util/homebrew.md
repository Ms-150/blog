# Homebrew

macOS 和 Linux 下的包管理工具。

[https://brew.sh](https://brew.sh)

## install

- 命令行安装

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- 手动下载安装

1. 浏览器打开
   [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
   查看文件，保存文件 `install.sh` 到文稿里。

2. 手动执行脚本

   ```bash
   /bin/bash install.sh
   ```

3. 源镜像 安装

- 清华大学开源软件镜像站

  [https://mirrors.tuna.tsinghua.edu.cn/](https://mirrors.tuna.tsinghua.edu.cn/)

## command

```bash
brew config         # 显示 brew 配置
brew search 包名    # 查询可用包
brew install 包名
brew list           # 查看安装列表
brew ls 包名        # 查看 package 的安装目录
brew upgrade 包名   # 更新包 [指定包]
brew cleanup       # 清理所有包的旧版本
brew tap 包名       # 用于添加第三方软件库
brew --prefix      # 获取 brew 的安装目录
```

## brew service

Homebrew 提供的一个管理后台服务的命令工具。它可以帮助你方便地启动、停止和管理由 Homebrew 安装的软件的后台服务，比如 Nginx、MySQL 等。这些服务通常需要持续运行，比如 web 服务器或数据库服务器。

```bash
brew service                   # 查看后台所有服务
brew service start [nginx]     # 启动 nginx 服务 注册开机动
brew service cleanup           # 清理停用的服务
brew service restart [nginx]   # 重启 [nginx] 注册开机启动
brew service run [nginx]       # 启动服务 [nginx] 不注册开启动
brew service stop [nginx]      # 停止 [nginx] 取消开机启动注册
```

### brew cleanup 权限不足

```bash
    sudo chown -R $(whoami):staff /usr/local/*
    sudo chmod -R g+rwx /usr/local/*
```

## 切换镜像

- 临时替换

```bash
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
```

- 永久替换

```bash
# 对于 zsh 用户
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"' >> ~/.zshrc

# bash 用户
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"' >> ~/.bash_profile
```

## uninstall

- 命令卸载

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall.sh)"
```
