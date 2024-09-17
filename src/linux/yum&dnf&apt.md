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
