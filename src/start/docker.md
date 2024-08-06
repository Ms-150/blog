# docker

Docker 是一个开源平台，旨在通过容器技术简化应用程序的开发、部署和运行。

[]

## docker image 镜象 类似 js 对象的类

```bash
docker images

Docker image pull nginx
```

## docker container 容器 类似 js 对象

````bash
docker run -d -p 80:80 --name webServer nginx

docker stop webServer
docker rm webServer
```bash

````
