# FTP （File Transfer Protocol，文件传输协议）

一种用于在计算机之间传输文件的标准网络协议。FTP 使用客户端-服务器模型，并且通常基于 TCP/IP 网络，如互联网。

## 基本概念

1. 客户端-服务器模型：FTP 需要在一台计算机上运行 FTP 服务器，另一台计算机上运行 FTP 客户端，客户端通过服务器来上传、下载或管理文件。
2. 传输模式：
   - 主动模式（Active Mode）：客户端通过命令连接 FTP 服务器，服务器主动连接客户端传输数据。
   - 被动模式（Passive Mode）：客户端通过命令连接 FTP 服务器后，服务器提供一个端口，客户端主动连接服务器来传输数据。
3. 端口号：
   命令端口：默认端口为 21。
   数据端口：根据传输模式不同，主动模式下服务器会主动连接客户端随机端口，被动模式下服务器提供一个随机端口，客户端主动连接。

## 常用的 FTP 客户端工具

命令行 FTP：几乎所有操作系统都内置了 FTP 客户端（ftp 命令）。

- FileZilla：常用的跨平台 FTP 客户端，支持图形界面操作，方便文件管理。
- WinSCP：Windows 上的 FTP、SFTP 和 SCP 客户端。

```bash
ftp <服务器地址>    # 连接
bye               # 退出 FTP 会话

get <文件名>        # 下载文件到本地
put <文件名>        # 上传文件到服务器
mget <文件名模式>    # 批量下载文件
mput <文件名模式>    # 批量上传文件
```

# SFTP （SSH File Transfer Protocol，安全文件传输协议）

一种通过 SSH（Secure Shell）提供安全加密的文件传输协议。
与 FTP 不同，SFTP 提供了安全性更高的文件传输方式，所有数据传输都经过加密，保证了传输过程中的机密性和完整性。

## usage

::: code-group

```bash [server]
sudo apt install openssh-server # 安装OpenSSH服务器

sudo systemctl start ssh    # 启动SSH服务
sudo systemctl enable ssh

sudo ufw allow ssh  # 防火墙配置
```

```bash [client]
# 连接 SFTP 服务器
sftp -p 22 <username>@<hostname>

# 退出 SFTP 会话
bey
```

:::

### command

```bash
# 上传文件
put <localfile>

# 下载文件
get <remotefile>

# 上传整个目录 递归上传本地目录到服务器
put -r <localdir>

# 下载整个目录 递归下载服务器上的目录到本地
get -r <remotedir>

# 删除远程文件
rm <remotefile>
```
