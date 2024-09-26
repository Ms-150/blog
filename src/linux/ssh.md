# SSH（Secure Shell）

一种用于远程登录和文件传输的安全协议，通过加密保证通信的安全性。它常用于在不安全的网络中，安全地管理远程服务器。

## 基础概念

- SSH 客户端：用于发起与 SSH 服务器的连接。Linux、macOS 等系统自带 ssh 客户端。
- SSH 服务器：负责监听和接受来自客户端的 SSH 连接请求，常见的服务器软件是 `openssh-server`。
- 加密：SSH 使用加密技术确保数据在传输过程中安全，防止中间人攻击、数据窃听等。

## 连接

::: code-group

```bash [server]
sudo apt install openssh-server # 安装OpenSSH服务器

sudo systemctl start ssh    # 启动SSH服务
sudo systemctl enable ssh

sudo ufw allow ssh  # 防火墙配置
```

```bash [client]
ssh -p 22 username@remote_ip # 连接

exit    # 断开
```

:::

## SCP (Secure Copy Protocol)

它利用 SSH 提供的安全加密通道来传输文件，确保数据在传输过程中不被窃取或篡改。
这意味着 SCP 也继承了 SSH 的安全特性，包括身份验证和加密，使其成为一种安全的文件传输方式。

### command

```bash
scp [选项] [源文件] [目标]
    -r # 递归复制目录
    -P # 指定远程主机端口（注意是大写）
    -v # 显示详细的传输信息
```

### example

```bash
# 上传文件到服务器
scp myfile.txt root@ip地址:/home

# 上传文件夹到服务器
scp -r /Users/ms/Documents/test root@ip地址:/home

# 服务器下载 build 目录到 Documents
scp -r root@id地址:home/build /Users/ms/Documents
```

## SSH 加密

### 使用 ssh-keygen 命令生成公私钥，常用的参数如下：

- -b：指定 key 的 bit 数，对于 RSA key 而言，默认是 3072 bits
- -f：指定 key 的文件名，若需要指定路径，则文件名需要和路径一直，如 ~/.ssh/id_rsa_gh
- -t：指定私钥类型，一般有 "dsa", "ecdsa", "ecdsa-sk", "ed25519", "ed25519-sk" 和 "rsa" 等几种，若指定为 rsa 还可以指定签名类型，默认为 "rsa-sha2-512"
- -C：指定新的 comment，即公钥末尾的字符串，一般是邮箱地址，若不指定会是 username@hostname 的形式

### 使用 ssh-agent 管理 SSH key

#### ssh-agent 通过 ssh-add 来管理私钥，如下是 ssh-add 的一些习惯用法：

- ssh-add -l：列出加载的私钥指纹
- ssh-add -L：列出加载的私钥对应的公钥
- ssh-add -D：删除所有加载的私钥
- ssh-add -d filename：删除指定的私钥

### 查看 ssh

```bash
cd ~/.ssh

tree -l
.
├── config          # SSH 客户端的配置文件 配置不同主机使用不同的密钥
├── id_rsa          # 默认的私钥文件
├── id_rsa.pub      # 默认的公钥文件 添加到GitHub
└── known_hosts     # 存储你连接过的主机的公钥，用于验证主机身份
```

### 生成 SSH 密钥

```bash
# 默认生成 ssh
ssh-keygen -t rsa -C "1318820477@qq.com"

# 生成指定名称的 ssh id_rsa_gh
ssh-keygen -C user_gh@qq.com -f ~/.ssh/id_rsa_gh
```

```diff
tree
>>>
    .
    ├── config
    ├── id_rsa
    ├── id_rsa.pub
+   ├── id_rsa_gh
+   ├── id_rsa_gh.pub
    ├── known_hosts
    └── known_hosts.old
```

### SSH 配置文件 多个 SSH 的配置

```diff
#  新增 ssh config

# Host 别名
# HostName 域名
# User 用户名
# PreferredAuthentications 权限
# IdentityFile 对应域名的密钥

Host github
    HostName github.com
    User test.qq.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_gh

+ Host gitlab
+     HostName github.com
+     User test.qq.com
+     PreferredAuthentications publickey
+     IdentityFile ~/.ssh/id_rsa_gl
```

### 测试链接

::: code-group

```bash [git@github]
ssh -T git@github
>>>
Hi test.qq.com! You've successfully authenticated, but GitHub does not provide shell access.
```

```bash [git@gitlab]
ssh -T git@gitlab
>>>
Welcome to GitLab, @test.qq.com!
```

:::

# Hosts

## 查询真正的 ip 地址 写入到 hosts 文件中

```bash
cd /etc
vi hosts

# 在hosts文件写入真实IP和网址
```

# 查询 ip 地址

[https://www.ipaddress.com](https://www.ipaddress.com)
