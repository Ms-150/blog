# Jenkins

一个开源的自动化服务器，用于持续集成（CI）和持续部署（CD）。

## install

使用 Docker 运行 Jenkins

```bash
docker pull jenkins/jenkins:lts
```

## start

```bash
docker run -d --name jenkins -p 9090:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts

-d # 后台运行
-p 9090:8080
# 端口映射，将宿主机（本机）9090 端口映射到容器内部 8080 端口。
-p 50000:50000
# 映射 50000 端口，供 Jenkins 的“代理（Agent）”节点使用。如果你不需要 Jenkins 的分布式构建功能，可以省略这个端口映射。
-v # 选项用于挂载数据卷，jenkins_home 是 Docker 卷的名称，/var/jenkins_home 是容器内 Jenkins 的数据目录。
```

##

```bash
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

## plugins

### nodejs

```bash
1. 系统管理 > 全局工具配置 > NodeJS 安装

2. 构建环境"（Build Environment）
✅ 勾选 "Provide Node & npm bin/ folder to PATH"
```

### Publish over SSH

[https://plugins.jenkins.io/publish-over-ssh/]()

### dingtalk 钉钉机器人

[https://plugins.jenkins.io/dingding-notifications/](https://plugins.jenkins.io/dingding-notifications/)

https://jenkinsci.github.io/dingtalk-plugin/

```
钉钉群 添加自定义机器人
系统管理 -> 系统配置 -> 钉钉 -> 新增
```

钉钉信息 -> 手机号码 -> 用于在钉钉中 @ 成员
