# Docker-compose

来源：https://docs.docker.com/compose/install/

两种安装方式

## 二进制文件安装

```shell
curl -L https://github.com/docker/compose/releases/download/1.8.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) > /usr/local/bin/docker-compose
```


```shell
chmod +x /usr/local/bin/docker-compose
```

```shell
查看版本信息
docker-compose --version
```

##### 注意：但是此方法会经常因为网络的原因而无法安装

## pip安装

```shell
1、安装python-pip
yum -y install epel-release
yum -y install python-pip
2、安装docker-compose
pip install docker-compose
查看版本信息
docker-compose version
```



## 问题

执行权限命令之后报错:

chmod +x /usr/local/bin/docker-compose

Cannot open self /usr/local/bin/docker-compose or archive /usr/local/bin/docker-compose.pkg

解决办法：

```shell
进入下面的网址下载目前的最新版：
https://github.com/docker/compose/releases/tag/1.14.0-rc2
网页拉到最下面，下载：
[docker-compose-Linux-x86_64](https://github.com/docker/compose/releases/download/1.14.0-rc2/docker-compose-Linux-x86_64)

然后将文件上传到 /usr/local/bin/ 文件夹下，然后将其重命名为docker-compose，修改此文件的权限，增加可执行：chmod +x /usr/local/bin/docker-compose
然后再运行 
[root@fd240 bin]# docker-compose version
docker-compose version 1.14.0-rc2, build 24dae73
docker-py version: 2.3.0
CPython version: 2.7.13
OpenSSL version: OpenSSL 1.0.1t 3 May 2016
可以看到已经没有问题了
```

至此安装完毕

## 命令

## 核心配置文件

```yaml
# docker-compose.yml
# for example
version: '3'
services:
  web:
    build: .
    ports:
    - "5000:5000"
    volumes:
    - .:/code
    - logvolume01:/var/log
    links:
    - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

## 基本命令

```shell
docker-compose build [name]

docker-compose up -d [name]

docker-compose down [name]

docker-compose logs [name]
```



## 原理

工程

服务

容器
