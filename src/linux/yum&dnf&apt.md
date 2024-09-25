# YUM DNF APT

## yum

Yellowdog Updater, Modified

个用于基于 RPM 的 Linux 发行版的软件包管理工具。它简化了软件包的安装、升级、卸载和管理过程。

## 基本命令

### 查看 `yum` 版本和帮助

```bash
yum -v             # 显示 `yum` 的版本信息
yum help           # 显示 `yum` 的帮助信息
```

### 安装和删除软件包

```bash
sudo yum install package_name  # 安装指定的软件包
sudo yum remove package_name   # 卸载指定的软件包
```

```bash
yum -v
yum help

sudo yum install package_name
sudo yum remove package_name

sudo yum update
sudo yum update package_name

yum list installed
yum list installed package_name

yum search search_term
yum info package_name

sudo yum clean all
sudo yum clean packages
```

## DNF

Dandified YUM）是 YUM 的下一代版本，用于基于 RPM 的 Linux 发行版（如 Fedora 和 CentOS）。DNF 提供了更好的性能和更少的依赖问题。

```bash
dnf --version                # 显示 DNF 的版本信息
dnf help                     # 显示 DNF 的帮助信息

sudo dnf check-update        # 检查可用的软件包更新

sudo dnf install package_name   # 安装指定的软件包
sudo dnf remove package_name    # 卸载指定的软件包

sudo dnf upgrade                # 更新所有已安装的软件包
sudo dnf upgrade package_name   # 更新指定的软件包

dnf list installed              # 列出所有已安装的软件包
dnf list installed package_name # 查看指定软件包的安装状态

dnf search search_term          # 根据搜索词查找软件包
dnf info package_name           # 显示指定软件包的信息

sudo dnf clean all # 清理所有缓存
sudo dnf clean packages # 清理包缓存
```

## APT

APT（Advanced Package Tool）是用于基于 Debian 的 Linux 发行版（如 Ubuntu）的软件包管理工具，旨在简化软件的安装、更新和卸载过程。

## command

```bash
apt --version                # 显示 APT 的版本信息
apt help                     # 显示 APT 的帮助信息

sudo apt update              # 更新可用软件包列表
sudo apt install package_name   # 安装指定的软件包
sudo apt remove package_name    # 卸载指定的软件包

sudo apt upgrade               # 更新所有已安装的软件包
sudo apt upgrade package_name  # 更新指定的软件包

apt list --installed               # 列出所有已安装的软件包
apt list --installed package_name   # 查看指定软件包的安装状态

apt search search_term           # 根据搜索词查找软件包
apt show package_name            # 显示指定软件包的信息

sudo apt clean                   # 清理本地下载的包文件
sudo apt autoclean               # 清理旧版本的包文件
```
