# tree

`tree`命令用于以树状图的形式显示目录结构，是一个非常直观的工具。

[https://oldmanprogrammer.net/source.php?dir=projects/tree](https://oldmanprogrammer.net/source.php?dir=projects/tree)

[https://github.com/Old-Man-Programmer/tree](https://github.com/Old-Man-Programmer/tree)

## install

```bash
brew install tree

tree --version
tree -help
```

### usage

```bash
tree <directory>
tree -a             # 显示隐藏目录
tree -d             # 仅显示目录
tree -f             # 显示文件或目录的完整路径
tree -L <level>     # 限制显示的目录层级深度

tree -I <name>      # 指定忽略的模式
tree -I 'node_modules|.git'     # 忽略多个文件用`|` 隔开
```

### example

```bash
# 限制显示的目录2
tree -L 2

# 忽略多个文件
tree -I 'node_modules|.git' -a -L 2
```
