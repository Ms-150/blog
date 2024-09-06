# iTerm2 + Oh My Zsh

## iTerm2

macOS 上的一个高级终端应用程序，它提供了比默认终端更多的功能和灵活性。

[https://iterm2.com](https://iterm2.com)

官网直接下载安装

## Oh My Zsh

一款令人愉悦的开源社区驱动框架，用于管理您的 Zsh 配置。它捆绑了数千个有用的函数、帮助程序、插件、主题以及一些让您大呼过瘾的东西……

以前所未有的方式释放您的终端。[依赖 zsh](#zsh)

[https://ohmyz.sh/](https://ohmyz.sh/)

### install

- 命令安装

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

omz version     # master (c41f2e7a)
```

- 手动安装

```bash
# 浏览器打开网址 保存文件到本地 并运行命令
https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh

/bin/bash install.sh
```

### 配置 主题

1. vim ~/.zshrc

```diff
+ ZSH_THEME="robbyrussell"
```

2. reload

```bash
 source ~/.zshrc   # 重新加载你的 zsh 配置
```

### 配置插件

[https://github.com/zsh-users](https://github.com/zsh-users)

- #### zsh 语法高亮

1. download

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
```

2. vim ~/.zshrc

```diff
plugins=( git
+  zsh-syntax-highlighting
)
```

3. reload

```bash
source ~/.zshrc   # 重新加载你的 zsh 配置
```

- #### zsh 自动建议

1. download

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2. vim ~/.zshrc

```diff
plugins=( git
+  zsh-autosuggestions
)
```

3. reload

```bash
source ~/.zshrc   # 重新加载你的 zsh 配置
```

## zsh

（Z Shell）是一个功能强大的 Unix shell，常被用作替代 bash（Bourne Again Shell）。它提供了许多增强功能，如更强大的命令补全、扩展的脚本编程功能、和更丰富的配置选项。

[https://www.zsh.org/](https://www.zsh.org/)

```bash
zsh --version     # mac 默认已安装
```

### 配置别名 ll 命令查看 全部文件

1. vim ~/.zshrc

```diff
+ alias ll="ls -aFL" # 新增
```

2. reload

```bash
source ~/.zshrc
```