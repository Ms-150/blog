# 虚拟机

## Parallels Desktop

## Virtual Box

开源虚拟机

[https://www.virtualbox.org](https://www.virtualbox.org)

### 1. 安装
官网下载并安装

#### 设置中文
* Tools -> Preference -> Language -> 简体中文
* 工具 -> 全局设定 -> 语言 -> 简体中文

### 2. 安装系统
工具 -> 新建 -> 选择系统 -> 开机（提示安装系统）-> 选择系统镜像 -> 安装

// 若没有 `光盘镜像` (iso文件) 先去安装  
再次启动前 -> 先设置 -> 存储 -> 选择系统镜像 -> 安装

### 3. 启动 USB设备（包含链接手机）

下载：官网下载扩展包 (VM VirtualBox Extension Pack) 选择版本(All supported platforms) 

安装扩展包：工具 -> 全局设定 -> 扩展 -> + 选择扩展包

设置USB设备：设置 -> 端口 -> USB设备 -> USB2.0 控制器 -> + 选择当前 USB设备

### 4. 安装增强功能 实现屏幕全屏 拉伸

启动 win10 -> 设备(顶部菜单栏中) -> 安装增强功能 -> 安装
再win10我的电脑中 运行驱动
 
## Win10 命令激活

以管理员身份运行

```bash
# 示例
slmgr /ipk TX9XD-98N7V-6WMQ6-BX7FG-H8Q99
slmgr /skms kms.03k.org
slmgr /ato
```

## 在线激活win10

```bash
irm jihuo.win | iex
```

## 管理登陆账户

```bash
control userpasswords2
```
