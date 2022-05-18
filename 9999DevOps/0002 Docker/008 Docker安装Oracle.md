# docker安装

# Docker安装Oracle

### 搜索镜像

```bash
$ docker search oralce
```

选择 `alexeiled/docker-oracle-xe-11g` 镜像

### 拉取镜像

```bash
$ docker pull alexeiled/docker-oracle-xe-11g
docker pull deepdiver/docker-oracle-xe-11g:2.0
```

### 启动镜像

```bash
$ docker run -d -p 49161:1521 -e ORACLE_ALLOW_REMOTE=true  alexeiled/docker-oracle-xe-11g
docker run -d -p 49161:1521 -e ORACLE_ALLOW_REMOTE=true  deepdiver/docker-oracle-xe-11g:2.0
```

上面命令中 `-e ORACLE_ALLOW_REMOTE=true` 的作用是开启远程连接，如果只是本地使用可以写成这样

```bash
$ docker run -d -p 49161:1521 alexeiled/docker-oracle-xe-11g
```

```
docker run -d -v /data/kongchao/docker_volume/oracle_data:/data/oracle_data -p 49160:22 -p 49161:1521 -e ORACLE_ALLOW_REMOTE=true alexeiled/oracle-xe-11g
docker run -d --name=oracle -v /docker/oracle/oracle_data:/data/oracle_data -p 49160:22 -p 49161:1521 -e ORACLE_ALLOW_REMOTE=true deepdiver/docker-oracle-xe-11g:2.0
```

### 远程链接镜像

连接信息：

- 连接类型：Basic
- 主机地址：ip
- 端口：49161
- DIS：xe
- 用户名：system
- 密码：oracle




# 连接工具

https://www.oracle.com/technetwork/developer-tools/sql-developer/downloads/index.htmlcccvc

https://www.oracle.com/cn/database/technologies/appdev/sqldeveloper-landing.html

```shell
#Mac Navicat 报错：ORA-24454 

#查看hostname，终端执行：hostname；
#设置hosts文件，终端执行：sudo /bin/bash -c "echo '127.0.1.1 [上一步查出来的hostname]' >> /etc/hosts"；
#再尝试使用Navicat连接Oracle，可以正常连接。

```

