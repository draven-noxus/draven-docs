# docker安装

# Docker安装MySQL

### 搜索镜像

```bash
$ docker search mysql
```

建议选择dockerhub的官方镜像

### 拉取镜像

```bash
$ docker pull mysql:8.0.18
$ docker pull mysql:5.7
```

## MySQL5.X 安装目录

### 创建挂载目录

```shell
$ mkdir -p /docker/mysql/conf
$ mkdir -p /docker/mysql/data
```

### 编写配置文件

```shell
$ vim /docker/mysql/conf/my.cnf


[mysqld]
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

### 启动容器

```shell l
docker run -p 3306:3306 \
--name mysql \
-e MYSQL_ROOT_PASSWORD=root \
--privileged=true \
-v /docker/mysql/data:/var/lib/mysql \
-v /docker/mysql/conf/my.cnf:/etc/mysql/conf.d/mysql.cnf \
-d docker.io/mysql:5.7
```

### MySQL8.X 安装目录

```shell
mkdir -p /docker/mysql8/conf
mkdir -p /docker/mysql8/data
```

### 编辑配置文件

```shell
$ vim /docker/mysql8/conf/my.cnf
[mysqld]
character-set-server=utf8
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

### 启动容器

```sh
docker run -p 13306:3306 \
--name mysql8 \
-e MYSQL_ROOT_PASSWORD=bigkang \
--privileged=true \
-v /docker/mysql8/data:/var/lib/mysql \
-v /docker/mysql8/conf/my.cnf:/etc/mysql/conf.d/mysql.cnf \
-d docker.io/mysql:8.0.16
```

## 设置编码集

```shell
SET NAMES utf-8
```