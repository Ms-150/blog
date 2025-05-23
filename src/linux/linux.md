# Linux

## 目录

### 目录结构

```bash
pwd   # 显示当前工作目录的绝对路径
```

### 文件和目录操作命令

```bash
ls   # 列出目录内容
  -a # 显示全部文件 包含隐藏文件
  -F # 分类标识
      # 目录，会在名称后面添加一个 “/”
      # 可执行文件，会添加一个 “*”
      # 符号链接，会添加一个 “@”
  -l # 详细信息
  -h # 以人类易读的格式呈现文件大小，比如B、K、M、G等。目录 不能准确表示实际占用的空间

cd    # 改变当前目录
cd ..   # 返回上一级目录
cd ~    # 返回用户主目录

touch   # 创建新文件
mkdir   # 创建新目录
  -p    # 递归创建多级目录

rmdir   # 删除空目录

rm    # 删除文件或目录
  -r    # 递归的删除此文件及 子文件/文件夹
  -f    # 强制性删除 不询问
  -i    # interactive 互动式 删之前询问

cp    # 复制文件或目录
  -r    # 递归复制文件或目录
mv    # 移动 或重命名 文件或目录
```

### 搜索

```bash
whereis # 查找指定命令的二进制文件、源代码文件和帮助文件的位置
which   # 在环境变量 $PATH 指定的路径中查找可执行文件
PATH    # 环境变量
```

## 文件内容查看与编辑命令

```bash
cat   # 连接文件并打印到标准输出设备上

head -n 数字  # 查看文件的前几行
tail -n 数字  # 查看文件的后几行

vi / vim   # 文本编辑器
```

详见 [vi / vim](./vi&vim.md)篇

## 文件搜索与过滤命令

### `find`

```bash
find [范围] [条件] # 在文件系统中搜索文件

find  # 在文件系统中搜索文件

条件
  *     # 通配符
  ?     # 匹配任意一个字符
  []    # 匹配方括号中任意一个字符

  -name   # 按名称搜索文件
  -size   # 按文件大小搜索

  -atime  # access 按最后访问时间搜索
  -ctime  # create 按创建时间搜索
  -mtime  # modify 按修改时间搜索

组合条件
  -a / -and # 默认
  -o / -or
  -n / -not
```

### `grep` Global / Regular Expression / Print 全局正则表达式打印

```bash
grep  # Global / Regular Expression / Print 在文件中搜索特定模式
```

## 文件重定向与管道

### `> >> 2> &> 2>&1` 文件重定向

| 符号   | 名字                   | 解释                                                                                              |
| ------ | ---------------------- | ------------------------------------------------------------------------------------------------- |
| `>`    | 输出重定向             | 将命令的标准输出（stdout）重定向到文件，如果文件存在，覆盖原内容                                  |
| `>>`   | 输出追加重定向         | 将命令的标准输出追加到文件的末尾，而不覆盖文件内容                                                |
| `2>`   | 错误输出重定向         | 将命令的标准错误输出（stderr）重定向到文件                                                        |
| `&>`   | 合并输出重定向         | 将标准输出和标准错误同时重定向到同一个文件中                                                      |
| `2>&1` | 标准错误合并到标准输出 | 将标准错误输出重定向到标准输出：让标准错误（stderr）与标准输出（stdout）合并，通常与 `>` 一起使用 |

::: code-group

```bash [> 输出重定向]
# 将命令的输出写入文件（覆盖）
echo "Hello" > file.txt
```

```bash [>> 追加重定向]
# 将命令的输出追加到文件的末尾，而不是覆盖文件的内容
echo "Hello" >> output.txt
```

```bash [2> 错误输出重定向]
# 将命令的错误输出写入文件
ls non_existent_file 2> error.log
```

```bash [&> 合并输出重定向]
# 将标准输出和标准错误同时重定向到同一个文件
ls non_existent_file &> output.log
```

:::

::: warning

- `>` `>>` 重定向操作时，目标文件不存在，系统会自动创建该文件，然后进行写入操作
- `>` 会覆盖文件的内容
- `>>` 则是追加内容

:::

### `|` 管道符

用于将一个命令的输出作为另一个命令的输入的符号。

```bash
command1 | command2   # command1 的输出成为 command2 的输入

# example
ps -ef | grep "process_name"  # 使用 ps 和 grep 查找特定的进程
```

## 帮助

### `man` （manual pages）

用于查看 Unix 和类 Unix 系统上的手册页面（manual pages）的命令

```bash
q       # 退出手册
b       # 向上翻页
空格     # 向下翻页

man [command]     # 查看命令的手册页面
man -k [keyword]  # 搜索手册页面内容
man [section] command   # 跳转到手册的特定章节
```

### `--help`

```bash
[command] --help

# example
le --help
```

## 压缩 / 解压 / 打包

- zip
- gzip
- xz
- tar

详见 [压缩&打包](./zip&gzip&tar&xz.md)

## 关机 重启

### 关机

#### `shutdown`

用于安全地关闭或重启系统，通常需要管理员权限才能执行。

```bash
shutdown [选项] [时间] [警告消息]

选项
  -h  # 关闭系统并停止电源
  -c  # 取消一个已经进行中的关机操作
  -r  # 关闭系统并重启

时间
  now   # 立即关机。
  +m    # 在 m 分钟后关机。
  hh:mm   # 在指定的时间（24小时格式）关机。

# example
shutdown -r +5 "系统将在5分钟内重启，请保存工作"
```

#### `halt`

用于立即停止系统的运行并停止电源。

```bash
halt
```

#### `poweroff`

会立即停止系统运行，并安全地停止电源。

```bash
poweroff
```

#### `init`

```bash
init 0   # 关闭系统（建议使用 shutdown 命令）
init 1   # 单用户模式（用于系统维护）
init 2   # 多用户模式（不带网络服务）
init 3   # 多用户模式（带网络服务，通常用于命令行界面）
init 4   # 未使用/自定义
init 5   # 多用户模式（带网络服务，通常用于图形界面）
init 6   # 重启系统
```

### 重启

```bash
reboot  # 重启系统

init 6   # 重启系统
```

## 用户管理 和 系统日志

```bash
whoami  # 查看当前用户 who am i
```

### 登陆 退出

```bash
login   # 登陆
logout  # 退出登陆
```

### 用户管理

系统上所有用户的基本信息 都存储在 `/etc/passwd` 文件夹中
系统上所有组的基本信息 都存储在 `/etc/group` 文件夹中

```bash
useradd 用户名  # 添加用户
groupadd 组名   # 添加组

usermod     # 修改用户信息
groupmod    # 修改组信息

userdel   # 删除用户
groupdel   # 删除用户

password 用户名   # 用户秘密
```

#### 切换用户

```bash
su 用户名  # 切换用户 switch user
```

## 内存和磁盘

### 内存

```bash
free  # 显示内存和交换空间的使用情况
  -h  # 可读的格式显示内存信息

# example
free -h
>>>
              total        used        free      shared  buff/cache   available
Mem:           1.8G        155M        1.3G        8.5M        352M        1.5G
Swap:          2.0G          0B        2.0G

# Mem 内存
# Swap 交换空间 硬盘上预留的一部分空间，用于当物理内存（RAM）不足时，将内存中不活跃的数据暂时写入硬盘，以释放物理内存给活跃进程使用。
```

### 磁盘

#### df

Disk Free 文件系统磁盘使用情况

```bash
df  # disk free 用于显示文件系统的磁盘使用情况
  -h  # 可读的方式显示磁盘使用情况

# example
df -h
>>>
文件系统                 容量  已用  可用 已用% 挂载点
devtmpfs                 908M     0  908M    0% /dev
tmpfs                    919M     0  919M    0% /dev/shm
tmpfs                    919M  8.6M  911M    1% /run
tmpfs                    919M     0  919M    0% /sys/fs/cgroup
/dev/mapper/centos-root   17G  2.5G   15G   15% /
/dev/sda1               1014M  194M  821M   20% /boot
tmpfs                    184M     0  184M    0% /run/user/0
```

#### du

Disk Usage 文件或目录的实际占用空间

1. 递归查看某个目录或文件的实际占用空间。
2. 实际读取目录结构，遍历每一个文件，耗时更长，但更精准到内容级别。
3. 例如临时文件、日志文件等，就能看到详细的占用。

```bash
du      # 统计当前目录及子目录所有文件的磁盘使用情况（单位为 KB）
  -h  # human readable，以 MB、GB 方式显示
  -s  # summary，仅显示每个参数的总计，不展开子目录
  -a  # all，显示包括文件在内的每个条目
  -c  # total，最后加一行总和
  -x  # one file system，仅统计当前文件系统的文件，避免统计挂载点（mount）
  -d N  # depth，只展开显示 N 层目录（有些系统使用 -d，macOS BSD版不支持）


# 常用组合
du -sh .          # 查看当前目录的总大小
du -sh *          # 显示当前目录下各文件/文件夹的大小（不含隐藏文件）
du -sh /var/log   # 查看日志目录大小
```

## 输出 echo

用于在终端输出字符串或变量的值  
类似 js console.log()

```bash
echo

# example
echo $PATH # 用于显示当前用户的 PATH 环境变量
>>>
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

# 以冒号 : 分隔的目录列表
```

## 系统服务管理 systemctl

```bash
systemctl start 服务名   # 启动服务
systemctl stop 服务名    # 停止服务
systemctl restart 服务名 # 重启服务
systemctl reload 服务名  # 重新加载服务配置

systemctl enable 服务名  # 启用服务开机自启动
systemctl disable 服务名 # 禁用服务开机自启动

systemctl status 服务名   # 查看服务状态
```

### 任务和进程

#### top (table of processes) 动态显示系统中运行的进程

```bash
top   # table of processes 动态显示系统中运行的进程
```

#### ps (process status) 显示当前运行的进程

```bash
ps    # Process Status 显示当前进程状态
  -e  # every 显示所有进程
  -f  # full 以完整格式显示

  -a  # all 显示所有用户的所有进程
  -u  # user 以用户格式显示进程信息
  -x  # 显示没有控制终端的进程，通常是系统或守护进程

kill  # 发送信号给进程以终止它们

# example
ps -ef  # 显示进程列表
>>>
  UID   PID  PPID   C STIME   TTY           TIME CMD
    0     1     0   0 11:31上午 ??         1:24.78 /sbin/launchd
    0    91     1   0 11:31上午 ??         0:59.77 /usr/libexec/logd

kill -1 PID号   # 正常杀死
kill -9 PID号   # 强制杀死
```

## 权限管理

### 基本权限

| 符号 | 文件类型 |
| ---- | -------- |
| `-`  | 文件     |
| `d`  | 目录     |
| `l`  | 软链接   |

| 符号 | 操作权限 |
| ---- | -------- |
| `r`  | 可读     |
| `w`  | 可写     |
| `x`  | 可执行   |
| `-`  | 没有权限 |

```bash
ls -aFl
>>>
total 20
lrwxrwxrwx.   1 root root    7 7月   8 19:44 bin -> usr/bin
dr-xr-xr-x.   5 root root 4096 7月   9 15:05 boot
drwxr-xr-x.  20 root root 3140 7月  11 15:46 dev
drwxr-xr-x.  77 root root 8192 7月  11 18:48 etc
drwxr-xr-x.   3 root root   16 7月  11 18:48 home
lrwxrwxrwx.   1 root root    7 7月   8 19:44 lib -> usr/lib
lrwxrwxrwx.   1 root root    9 7月   8 19:44 lib64 -> usr/lib64
...

```

#### drwxr-xr-x | drwxr-xr-x.

|    d     |     rwx      |        r-x         |        r-x         | .              |
| :------: | :----------: | :----------------: | :----------------: | -------------- |
| 文件类型 |  所有者权限  |     所属组权限     |     其他人权限     | SELinux        |
|   目录   | 可读 写 执行 | 可读 不可写 可执行 | 可读 不可写 可执行 | 安全上下文标记 |

### `chmod` 修改文件权限

```bash
chmod [选项] 模式 文件  # 修改文件权限
  -R  # 递归地更改目录及其子目录中的文件权限。

# example
chomd u+x 文件      # 用户 添加 可执行 权限
chomd g+w,o+w 文件  # 用户组 添加 可写 权限, 其他人 添加 可写 权限

chomd a=rwx 文件    # 所有用户 设置 可读可写可执行 权限
```

#### 权限模式

- 符号模式
- 数字模式

##### 1. 符号模式

| 符号 |   用户类型   | 注解   |
| ---- | :----------: | ------ |
| `u`  | 文件的拥有者 | user   |
| `g`  | 文件的所属组 | group  |
| `o`  |    其他人    | others |
| `a`  |   所有用户   | all    |

| 符号 | 权限设置 |
| ---- | -------- |
| `+`  | 增加权限 |
| `-`  | 去除权限 |
| `=`  | 设置权限 |

| 符号 | 操作权限 |
| ---- | :------: |
| `r`  |   可读   |
| `w`  |   可写   |
| `x`  |  可执行  |

##### 2. 数字模式

```bash
chomd 755 文件 # 用户 可读写执行 用户组 可读可执行 其他人 可读可执行
```

| 十进制 | 符号 | 操作权限 | 二进制 |
| ------ | ---- | -------- | ------ |
| `4`    | r--  | 可读     | 100    |
| `2`    | -w-  | 可写     | 010    |
| `1`    | --x  | 可执行   | 001    |

| 十进制 | 符号      | 操作权限 | 二进制 |
| ------ | --------- | -------- | ------ |
| `7`    | 4 + 2 + 1 | rwx      | 111    |
| `6`    | 4 + 2     | rw-      | 110    |
| `5`    | 4 + 1     | r-x      | 101    |
| `4`    | 4         | r--      | 100    |
| `3`    | 2 + 1     | -wx      | 011    |
| `2`    | 2         | -w-      | 010    |
| `1`    | 1         | --x      | 001    |
| `0`    | 0         | ---      | 000    |

### `sudo` 授权 以超级用户权限执行命令

使用 `visudo` 编辑 `/etc/sudoers` 文件

```bash
su root # 切换管理员权限

vi # 修改权限文件
```

```diff
## Allow root to run any commands anywhere
root    ALL=(ALL)       ALL

+ ms      ALL=(ALL)       /sbin/shutdown
```

| root | ALL=(ALL)                                     | ALL              |
| ---- | --------------------------------------------- | ---------------- |
| 用户 | 任何主机上都适用=(可以以任何用户身份执行命令) | 名允许执行的命令 |

```bash
chown   # 改变文件所有者
chgrp   # 改变文件所属组
```

## 网络

### 防火墙

#### 启动

```bash
# 启动防火墙
systemctl start firewalld

# 启用防火墙，使其在系统启动时自动启动
systemctl enable firewalld
```

#### 关闭

```bash
# 关闭防火墙
systemctl stop firewalld

# 禁用防火墙，使其在系统启动时不自动启动
systemctl disable firewalld
```

#### 常用命令

```bash
firewall-cmd  # 防火墙
firewall-cmd -h / --help
firewall-cmd --state    # 查看防火墙状态

firewall-cmd --list-ports # 查看所有打开的端口

firewall-cmd --zone=public --add-port=8080/tcp --permanent # 打开端口 8080 永久有效 --permanent
# 默认 重启失效
firewall-cmd --reload   # 重新加载

firewall-cmd --zone=public --remove-port=8080/tcp --permanent # 关闭防火墙

# example
firewall-cmd --list-ports
>>>
8080/tcp
```

### IP 地址

#### 查看 ip

```bash
ifconfig / ip addr / ip a   # 显示和适配网络接口信息

ping      # 测试与目标主机的连通性
```

#### 配置 静态 IP

配置文件通常位于 `/etc/sysconfig/network-scripts/ `目录下, 文件名格式为 `ifcfg-<接口名称>`。

1. 查看配置文件

```bash
cd /etc/sysconfig/network-scripts/
vi ifcfg-enp0s3
```

2. 修改

```diff
YPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
- BOOTPROTO="dhcp"  # dncp 动态 ip
+ BOOTPROTO="static"
+ IPADDR="192.168.1.101"
+ NETMASK="255.255.255.0"
+ GATEWAY="192.168.1.1"
+ DNS1="223.5.5.5"
+ DNS2="1.2.4.8"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="enp0s3"
UUID="3fccaa9e-9bf1-4443-af03-7d14b36c461b"
DEVICE="enp0s3"
ONBOOT="yes"
```

| 配置                  | 注解                          |
| --------------------- | ----------------------------- |
| IPADDR=192.168.1.100  | 您想要设置的静态 IP 地址      |
| NETMASK=255.255.255.0 | 子网掩码                      |
| GATEWAY=192.168.1.1   | 网关地址（通常是路由器的 IP） |
| DNS1=1.2.4.8          | DNS 服务器                    |

3. 重启网络服务

```bash
systemctl restart network
```

## 包管理

[详见 yum&dnf&apt](./yum&dnf&apt.md)

- yum
- dnf
- apt-get
