# baota

宝塔,安全高效的服务器运维面板.

[https://www.bt.cn/new/index.html](https://www.bt.cn/new/index.html)

## install

::: code-group

```bash [Centos/OpenCloud/Alibaba]
url=https://download.bt.cn/install/install_lts.sh;if [ -f /usr/bin/curl ];then curl -sSO $url;else wget -O install_lts.sh $url;fi;bash install_lts.sh ed8484bec
```

```bash [Debian]
wget -O install.sh https://download.bt.cn/install/install_lts.sh && bash install.sh ed8484bec
```

:::

## usage

```bash [ecs]
bt default
```

```bash [ecs]
bt version
```
