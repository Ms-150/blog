# Nginx

一个高性能的 Web 服务器、反向代理服务器和负载均衡器。

[https://nginx.org/](https://nginx.org/en/)

## 命令

```bash
brew install nginx  # Homebrew安装
nginx -v            # 查看版本
nginx -h | -?       # 查看版本

nginx               # 启动 nginx 默认 localhost:8080
nginx -t            # 测试配置文件是否正确
nginx -s quit       # 安全退出
nginx -s stop       # 停止nginx服务
nginx -s reload     # 重新加载

ps aux | grep nginx # 查看 nginx 是否在运行
killall nginx       # 直接杀死进程
```

## 文件位置

```bash
nginx -h

/usr/local/etc/nginx/nginx.conf     # 配置文件
/usr/local/etc/nginx/nginx.conf.default     # 默认配置文件
/usr/local/Cellar/nginx/1.27.0/html     # nginx 启动文件根目录
```

## config 配置文件

- 全局配置
- events // 事件模块
- http // HTTP 模块
  - server // server 指令
  - ...
  - include servers/\*; // 其他 server 指令

```bash
vim /usr/local/etc/nginx/nginx.conf
```

1. 全局配置

```bash
#user  nobody;
worker_processes  auto;         # 工作进程数

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;     # PID 文件路径
```

2. events 模块

```bash
events {
    worker_connections  1024;   # 最大连接数
}
```

3. http 模块

```bash
http {
    include       mime.types;           # MIME 类型定义
    default_type  application/octet-stream;     # 默认 MIME 类型

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;                      # 启用 Gzip

    server {
        listen       8080;           # 监听端口
        server_name  localhost;      # 服务器域名

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;                  # 包含其他 Server 模块配置
}
```

### server 指令

用于定义虚拟主机的配置，每个 server 块可以设置不同的 server_name、监听端口、根目录等属性。
一个 nginx 实例可以有多个 server 块，用于处理不同的域名或 IP 地址。

```bash
server {
    listen 80;                  # 监听端口
    server_name example.com;    # 服务器域名
    root /var/www/html;         # 根目录
    index index.html index.htm; # 默认首页文件
    # 其他配置项
}
```

- location 指令
  用于匹配客户端请求的 URI，并根据匹配规则执行相应的操作。
  location 块可以包含处理请求的具体指令，比如转发请求、返回错误、设置缓存等。

#### 常见配置项

| 配置项     | 说明                                                    | 示例                               |
| ---------- | ------------------------------------------------------- | ---------------------------------- |
| proxy_pass | 反向代理 将请求转发到另一台服务器 反向代理              | proxy_pass http://backend;         |
| rewrite    | URL 重写规则                                            | rewrite ^/old/(.\*)$ /new/$1 last; |
| return     | 返回指定的 HTTP 状态码或重定向                          | return 404;                        |
| try_files  | 尝试访问多个文件或路径，如果第一个不存在，则尝试下一个  | try_files $uri $uri/ =404;         |
| root       | 指定当前 location 的根目录                              | root /var/www/html;                |
| alias      | 指定当前 location 的文件系统路径（alias 替换 URI 部分） | alias /var/www/html/blog;          |
| index      | 设置当前 location 的首页文件                            | index index.html index.htm;        |

#### 正则

| 符号   | 解释         |
| ------ | ------------ |
| `=`    | 严格匹配     |
| `～`   | 区分大小写   |
| `～\*` | 不区分大小写 |

## 反向代理

```bash
server {
    listen 80;
    server_name example.com;

    # 根目录配置
    root /var/www/html;
    index index.html index.htm;

    # 处理前端资源请求
    location / {
        # 指定前端应用的根目录
        root /var/www/html;
        index index.html index.htm;
    }

    # 处理 API 请求，进行反向代理
    location /api/ {
        # 反向代理到实际的 API 服务器
        proxy_pass http://backend-api-server;  # 后端 API 服务器地址
        proxy_set_header Host $host;  # 保留请求中的 Host 头部
        proxy_set_header X-Real-IP $remote_addr;  # 转发请求的真实 IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 转发请求的原始 IP 地址
        proxy_set_header X-Forwarded-Proto $scheme;  # 转发请求的协议（http/https）

        # 可选的缓存和时间设置
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }
}
```

## 负载均衡

负载均衡是将客户端请求分配到多个服务器上的过程。
以实现以下目标：

- 提高可靠性：如果一个服务器故障，其他服务器可以继续处理请求。
- 增加容量：分散流量到多个服务器上，避免单台服务器负担过重。
- 优化性能：根据负载均衡算法选择最适合的服务器来处理请求，改善响应时间。

### 负载均衡的类型

| 类型         | 代码                | 翻译                       | 注解                                         |
| ------------ | ------------------- | -------------------------- | -------------------------------------------- |
| 轮询         | 默认                | Round Robin                | 将请求均匀地分配到每个服务器                 |
| 最少连接     | least_conn          | Least Connections          | 将请求分配到连接数最少的服务器               |
| IP 哈希      | ip_hash             | IP Hash                    | 根据客户端 IP 地址的哈希值来决定请求的服务器 |
| 加权轮询     | weight = x          | Weighted Round Robin       | 根据每台服务器的权重分配请求                 |
| 加权最少连接 | 加权轮询 + 最少连接 | Weighted Least Connections | 结合权重和最少连接数进行负载均衡             |
| 会话保持     | sticky              | Sticky Sessions            | 将来自同一客户端的请求始终转发到同一台服务器 |

### example

- 加权最少连接

```bash
upstream backend {
    least_conn;
    server backend1.example.com weight=3;  # 权重为 3
    server backend2.example.com weight=1;  # 权重为 1
}
```

### gzip

gzip 模块 主要用于对 Nginx 的`响应内容`进行压缩

#### 好处

- 减少数据体积：gzip 可以将文本数据压缩到原始体积的 20% 到 30%。
- 提高加载速度：减少数据传输时间，从而提高网页加载速度。
- 节省带宽：减少带宽消耗，从而降低服务器成本。

```bash
# 启用 gzip 压缩
    gzip on;
```

### 高可用

    yum install keepalived -y
