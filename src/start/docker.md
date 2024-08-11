# docker

Docker 是一个开源平台，旨在通过容器技术简化应用程序的开发、部署和运行。

[https://www.docker.com/](https://www.docker.com/)

## 基本概念

- 镜像 images
  一个轻量级、独立、可执行的软件包，包含运行应用程序所需的所有内容。镜像由一系列文件系统层组成，通过联合文件系统（UnionFS）叠加在一起，构成最终的镜像。
- 容器 container
  基于镜像启动的一个轻量级、独立的可运行环境。它们共享宿主操作系统的内核，但彼此隔离。容器是开发、测试和部署应用程序的核心单元。
- Docker Hub
  一个公共仓库，用于存储和共享 Docker 镜像。你可以从 Docker Hub 拉取镜像，也可以将自己的镜像推送到 Docker Hub。
- 数据卷 Docker Volumes
  数据卷用于持久化和共享数据。它们允许你在容器之间共享数据，并将数据与容器的生命周期分离，以避免数据丢失。
- Dockerfile
  一个文本文件，包含了一系列指令，用于构建 Docker 镜像。
- Docker Compose
  用于定义和运行多容器 Docker 应用的工具。
- 引擎 Docker Enginee
  用于管理容器的核心服务，负责构建、运行和管理容器。

```bash
docker
docker -v
docker --help
docker info     # 查看 docker 配置信息
```

## Image 镜象 类似 js 对象的类

镜像是一个轻量级、独立、可执行的软件包，包含运行应用程序所需的所有内容。
每个镜像由一系列文件系统层组成，这些层通过联合文件系统（UnionFS）叠加在一起，构成最终的镜像。

```bash
docker image    # 列出 镜像相关命令

docker search <镜像名>      # 搜索镜像
docker images ls           # 列出本地镜像
docker image pull <镜像名>:<标签>   # 拉取镜像
docker image rm <镜像名>:<标签>     # 删除镜像 容器用到了先删除容器

docker image history <镜像名>:<标签> # 查看镜像的构建历史（即镜像的每一层）
```

## Container 容器 类似 js 对象

基于镜像启动的一个轻量级、独立的可运行环境。但共享宿主操作系统的内核。容器是隔离的，但可以互相通信。

```bash
docker container    # 列出 容器相关命令

dcoker run -d --name <容器名> <镜像名>:<标签>   # 运行容器
docker run -d -p 80:80 --name nginx_my nginx

-d      # 后台运行
-p 宿主机端口:容器端口      # 端口映射 宿主机:容器
--name  # 自定义容器名称
-it     # 交互模式运行容器并连接终端
-v      # 将宿主机卷挂载到容器内部
docker ps       # 列出正在运行的容器
docker ps -a    # 列出所有容器

docker stop <容器名/ID>     # 停止容器
docker rm <容器名/ID>       # 删除容器

docker logs <容器名/ID>     # 查看容器日志
```

## Volume 数据卷

- 持久化存储: 数据卷可以存储在主机文件系统中，不会随着容器的删除而丢失。
- 共享数据: 可以在多个容器之间共享同一个数据卷，实现数据共享。
- 分离数据和应用: 数据卷将数据从容器的文件系统中分离出来，使得数据可以独立于容器的生命周期进行管理。

```bash
docker volume   # 列出 数据卷相关命令

docker create <数据卷名>    # 创建卷

docker volume ls           # 列出卷
docker volume inspect      # 显示一个或多个卷的详细信息
docker volume prune        # 删除未使用的本地卷
docker volume rm           # 删除一个或多个卷
```

## Dockerfile

一个文本文件，包含了一系列指令，用来描述如何创建一个 Docker 镜像。通过 Dockerfile，可以自动化构建镜像的过程。

### 常用指令

```bash
FROM    # 指定基础镜像。每个 Dockerfile 都必须以 FROM 指令开始。
RUN     # 执行命令，在镜像中安装软件或配置环境。
COPY    # 将文件或目录从主机系统复制到镜像中。
ADD     # 除了复制文件外，还支持 URL 下载和 tar 文件自动解压。
CMD           # 指定容器启动时要运行的命令。
ENTRYPOINT    # 配置容器启动时执行的主程序。
WORKDIR       # 设置工作目录。
ENV           # 设置环境变量。
EXPOSE        # 声明容器将监听的端口。
VOLUME        # 声明一个挂载点，容器运行时将主机上的目录或数据卷挂载到这个位置。
```

### 构建自定义镜像

1. 编写 Dockerfile 文件

```bash
mkdir docker_file   # 任意位置创建 保存 Dockerfile 的文件夹
vim Dockerfile   # 创建 Dockerfile 文件 （规定命名）
```

```bash
# 使用官方 CentOS 作为基础镜像
FROM centos:7

# 更新软件包并安装 Nginx
RUN yum -y update && \
    yum -y install epel-release && \
    yum -y install nginx

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
```

2. 构建

```bash
docker build -t 镜像名 .
```

3. 测试运行自定义镜像

### 镜像迁移 备份和恢复

将 Docker 镜像导出为一个 tar 包文件，以便在不同的环境之间迁移镜像。

```bash
docker save --help

# 备份
docker save -o /路径/镜像.tar 镜像名  # 将镜像名 保存为 /路径/镜像.tar

# 恢复
docker load -i /路径/镜像.tar
```

## Docker Hub

一个用于共享和管理 Docker 镜像的云端仓库，是 Docker 社区和开发者常用的资源库。你可以从 Docker Hub 中拉取公共镜像，也可以上传自己的镜像供他人使用。

### 镜像加速器配置

```bash
# Docker Desktop 配置地址
vim /Users/ms/.docker/daemon.json
```

```diff
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
+  "registry-mirrors": ["https://vsiidjop.mirror.aliyuncs.com"]
}
```

### 推送镜像

```bash
docker login # 登陆

docker tag hello-world:latest 150337
```
