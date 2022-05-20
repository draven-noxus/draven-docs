# Docker简介

链接:https://www.docker.com/tryit/

## 虚拟化

## 虚拟化种类

## Docker

Go语言编写

### 容器技术

依赖于Linux内核特性 

# The underlying technology

## Namspaces

```shell
PID（Process ID）#进程隔离

NET（Network） # 管理网络接口

IPC（InterProcess Communication）# 管理跨进程通信的访问

MNT（Mount）# 管理挂载点

UTS（Unix Timesharing System）#隔离内核和版本标识
```

## Control Group（Cgroups）

```shell
# 资源限制
# 优先级设定
# 资源计量
# 资源控制
```

文件系统隔离： 每个容器都有自己的root文件系统

进程隔离：每个容器都运行在自己的进程环境中

网络隔离：容器间的虚拟网络接口和IP地址都是分开的

资源隔离和分组：使用cgroups将CPU和内存之类的资源独立分配给每个Docker容器

## Union file systems

Container 和 image的分层

# Docker特点

![DockerVsOpenStack](images\DockerVsOpenStack.png)

能干什么

![DockerWhatCanDFo](images\DockerWhatCanDFo.png)



# Docker platform

参考资料

https://docs.docker.com/get-started/overview/#the-docker-platform

# Docker Architecture-架构

## Client

### api

```shell
docker build
docker pull
docker run
```



## DOCKER_HOST

### Docker daemon

### Containers

### Images

## Registry



### Docker Client/Docker Server

#### Remote API

链接：https://docs.docker.com/refrtence/api/docker_remote_api

链接：https://docs.docker.com/reference/commandline/cli

#### 链接方式

```shell
# 默认链接
unix:///var/run/docker.sock
# 示例
$ nc -U /var/run/docker.sock
tcp://host:port

fd://socketfd

# 守护进程的配置
# 运行相关
$ docker -d [OPTIONS]
	-D,--debubg=false
	-e,--exec-driver="native"
	-g,--graph="/var/lib/docker"
	--icc=true
	-l,--log-level="indo"
	--label=[]
	-p,--pidfile="/var/run/docker.pid"
	
# 与服务端连接
	-G,--group="docker"
	-H,--host=[]
	--tls=false
	--tlscacert="home/sven/.docker/ca.pem"
	--tlscert="/home/sven/.docker/cert.pem"
	--tlskey="/home/sven/.docker/key.pem"
	--tlsverify=false
# 存储相关
	-s,--storage-driver=""
	--selinux-enabled=false
	--storage-opt=[]
# 仓库相关
	--insecure-register=[]
	--registry-mirror=[]
# 网络设置相关
	-b,--bridge=""
	--bip=""
	--fixed-cidr=""
	--fixed-cidr-v6=""
	--dns=[]
	--dns-search=[]
	--ip=0.0.0.0
	--ip-forward=true
	--ip-masq=true
	--iptables=true
	--ipv6=true
	--mtu=0
```

#### 启动配置文件

```shell
$ /etc/default/docker

# 守护进程启动选项
-H 	tcp://host:port
	unix:///path/to/socket,
	fd://* or fd://socketfd
 # 守护进程默认配置
  -H unix:///var/run/docker.sock
  
 # DOCKER_HOST 环境变量
 $ export DOCEKR_HOST="TCP://IP:PORT"
```

# 

# 镜像 Image

```shell
# location 
/var/lib/docker
文件和meta data的集合(root filesystem)
分层，每一层都可以添加改变、删除文件，成为一个新的image
不同的image可以共享形同的layer
image本身是read-only
```

参考资料

https://docs.docker.com/develop/develop-images/baseimages/

## 来源

### Dockerfile

### Dockerhub

(pull from registry)

## 创建base images

```shell
FROM 
ADD
CMD ['']


$ docker build -t xxx/yyy .

# 分层信息查看
docker history imageId
```



![Docker Image](images\Docker Image.png)

# 构建镜像

## docker commit

### Container->images

不推荐

```shell
$ docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]] [flags]
# demo
docker commit xxx xxx/xxx:xxx
```

## docker build

Docker file

```shell
FROM centos
RUN 

docker build .
```

# 发布镜像

## dockerHub

关联github

```shell
docker login
username:
password:

docker push username/imageName:tag
```

## Harbor

## Registry

参考资料

https://docs.docker.com/registry/spec/api/

```shell
# 见 搭建registry
```



## 其他仓库

# Container 容器

```shell
# 通过image创建（copy）
# 在Image layer上建立一个container layer（可读写）
# 类比面向对象 类和实例
# Image负责app的存储和分发，Container负责运行app
```

![Docker Container](images\Docker Container.png)



# 镜像操作

```shell
# 说明
REPOSITORY # 仓库
TAG # 标签
IMAGE_ID # 镜像id
CREATE # 创建时间
CIRTUAL SIZE # 镜像大小


# 命令
$ docker images [options] [repository]
	-a --all=false
	-f --filter=[]
	--no-trunc=false
	-q,--quiet=false
	
# 
$ docker inspect [options] container|IMAGE[container|IMAGE...]

# docker rmi [OPTIONS]IMAGE[IMAGE...]
  -f,--force=false Force removal of the image
  --no-prune=false Do not delete untagged parents # 保留没有标签的镜像
  
$ docker rmi imageId

# 查找镜像
# Docker Hub
# https://regidtry.hub.docker.com

$ docker search [OPTIONS]TERM
  --automated=false Only show automated builds
  --no-trunc=false Don't truncate output
  -s,stars=0 Only displays with at least x stars

$ docker search centos 搜索：

 name 名字？

 description 描述？

 starts 星级？

 offical 官方？

 automated 自动构建？
 
# 拉取镜像
$ docker pull [OPTIONS] NAME[:TAG]
   -a,--all-tags=false #Download all tagged images in the respository
# 修改镜像源
$ vim /etc/default/docker
  DOCKER_OPTS = "--registry-mirror=http://MIRROR-ADDR"
  
  # 注册账号 https://www.daocloud.io
  # 选择加速器
# 查看是否成功
$ ps -a|grep docker


# 推送镜像
$ docker push dockerName/ImageName
$ username:
$ password:
$ ...

# 构建镜像
$ docker commit # 容器构建
$ docker build  # Dockerfile构建

# 容器构建
$ docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
  -q,--author="" Author e.g., "John Hannibal Smith hannibal@a-team.com"
  -m,--message="" Commit message
  -p,--pause=true Pause container during commit
  
# 
$ docker commit -m "name" containerid imagesname:version

# Dockerfile构建
#基础镜像信息
$ vim Dockerfile

$ docker builder
$ docker build [OPTIONS] PATH | URL -
	--force-rm=false
	--no-cache=false
	--pull=false
	-q,--quiet=false
	--rm=true
	-t,--tag=""
	
# 构建命令
docker build -t imagesName:v1 .
```

# 容器操作

参考资料

https://docs.docker.com/engine/reference/commandline/container/

```shell
$ man 

$ docker info

# 交互式启动
$ docker run -i -t IMAGE /bin/bash
#	-i --interactive=true | false 默认是false
#	-t --tty=true | false 默认是false

# 
$ docker ps [-l]/[-s] 


# 
$ docker run --name=自定义名 -i -t IMAGE /bin/bash

$ docekr start [-i] name

$ docker rm name

# -----------------------------------
# 守护式
$ ctrl+p ctrl+q 
$ docker attach name

$ docker --name=name -d - i -t IMAGE /bin/bash 

$ docker logs [-f][-t][--tail] 容器名
  -f --follows=true | false 默认为false
  -t --timestamps=true |false 默认为false
  --tail="all"

# 查看进程
$ docker top name

# 运行中的容器启动新进程
$ docker exec [-d][-i][-t] 容器名 [COMMAND][ARG...]
 docker exec -it container /bin/bash
 
$ docker kill name

$ docker exec -it container ip a
# 详细信息
$ docker inspect [id]/[name]
```



```
安装：yum install -y docker-io

启动：/etc/init.d/docker start
```

## 网络链接

```shell
docker0的地址划分

IP:172.17,42.1

子网掩码：255.255.0.0

MAC:02:42:AC:11:00:00 到 02:42:ac:11:ff:ff

65534
```

![docker-net](images\docker-net.png)

```shell
# 网络管理工具
$ apt-get install bridge-utils
# 查看网桥
$ brctl show

# 修改docker0
$ ifconfig docker0 192.168.200.1 netmask 255.255.255.0

# 自定义虚拟网桥
 # 添加虚拟网桥
$ brctl addbr br0
$ ifconfig br0 192.168.100.1 netmask 255.255.255.0
# 更改docker守护京城
$ vim /etc/default/docker # 添加DOCKER_OPS值 -b=br0

```

## 容器链接

```shell
# 重新启动容器ip会变化
--icc=true

# 
--link
$ docker -run --link=[CONTAINER_NAME]:[ALIAS] [IMAGE][COMMAND]

# 拒绝所有链接
--icc =false
```

## 外部链接

```shell
$ brctk show # 查看网络映射

$ ip ro li

# 随机映射

$ docker run -P

# 指定映射

# -p port1:port2 port为宿主机 端口

$ -p hostPort:containerPort
$ -p ip:hostPort:containerPort
$ -p ip::contailnerPort
$ -p hostPort:containerPort
$ -p hostPort:containerPort
```



### 默认桥接

### HOST模式

### 其他模式

## 基础操作

```shell

$ docker ps -a 所有容器
 container id 容器ID
 image 镜像
 command 启动命令
 created 创建时间
 status 运行状态
 name 名字

$ docker run --name mydocker -it centod /bin/bash
 $ ps aux 
 $ ip ad li
$ exit

$ docker start name/container 

$ docker run -d --name 'name' 'images' 后台运行

$ docker ps -l 最后运行一个的容器

$ docker help

$ docker attach 'container id' 进入容器 有错误

$ nsenter (yum instakk -y util-linux)

$ docker inspect --format "{{.State.Pid}}" 'name' 获取pid

$ nsenter --target 'pid' --mount --uts --ips --net --pid 进入容器内部

$ docker exec

$ docker attach
```

## 跨主机链接

网桥式

Open vSwitch

weave

# 数据管理

## 数据卷（Data Volume）

介绍：特殊设计的目录，绕过联合文件系统（UFS）,为一个或多个容器提供访问

目的：数据永久化，独立于容器的生存周期

![Data Volume](images\Data Volume.png)

```shell
$ -v /data
# 示例
$ docker run -it --name volume=test11 -h bgbix -v /data ngnix

# 挂载目录/文件 宿主机在前
$ -v src:des
# 示例
$ docker run -it --name vloume-test2 -h ngnix -v /opt:/opt centos

```

## 数据卷容器

![1565061083902](images\Data Container.png)

```shell
$ --volumes -from [CONTAINER NAME]
# 示例 test4的数据来自于test1
$ docker run -it --name volume-test4 --volumes-from volume-test1 centos

# 查看映射前数据存储位置
$ docker inspect -f {{.Volumes}} 'name'
```

## 备份与还原

![Data Bak](images\Data Bak.png)

```SHELL
# 备份
$ docker run --volumes-from [container name] -v$(pwd):/backup ubuntu tar cvf /backup/backup.tar [container data volume]
# 还原
$ docker run --volumes-from [container name] -v$(pwd):/backup ubuntu tar xvf /backup/backup.tar [container data volume]
```



# 私有仓库

```shell
$ docker tag imagesName ip:port/images:version
$ docker push ip:port/images:version
```

 

# 资源

## 隔离

LXC kernel 

namespace

```
Pid 

Net

Ipc

Mnt

Uts

User


```

## CPU

cgroup

```shell
$ yum install -y stress
```



```shell
CPU
$ docker run -it --rm -c 512 stress --cpu 1
$ docker run -it --rm --cpuset=0 stress --cpu 1
内存

磁盘（手动）
```

## 内存

```shell
$ docker run -it --rm -m 128m stress --vm 1 --vm-bytes 120 --vm-hang 0
```

# 网络模式

## 默认桥接

## HOST模式

## 其他模式

# Dashboard

Shipyard

```shell
$ vim 
```

# DockerFile

参考资料

https://github.com/docker-library

https://docs.docker.com/engine/reference/builder/

```shell
#维护者信息

#镜像操作命令

#容器启动时执行命令

 # FROM
 # 注意 使用官方镜像
 # 镜像来源 第一条非注释指令
 # FROM <image>
 # FROM <image>:<tag>
 # FROM scratch  # 制作base image
 # FROM centos   # 使用base image
 FROM centos
 FROM ubuntu:14.4
 
 
 # LABEL
 # 注意 Metadata不可少
 # 维护者，包含镜像的所有者和联系信息
 # MAINTAINER<name> 
 MAINTAINER XXX
 
 # RUN 执行命令并创建新的Image layer
 # CMD 设置容器启动后默认执行的命令 命令会被新的命令覆盖
 # ENTRYPOINT  设置容器启动时运行的命令
 
 
 # RUN
 # 注意 每运行一次RUN构建一层镜像，避免无用行
       # 建议多行合并 &&  
       # \ 
 # RUN <command> shell模式
 	# /bin/sh-c command
 # RUN ["executable","param1","param2"] exec模式
 	# RUN ["/bin/bash","-c","echo hello"]
 RUN yum install
 # 用户
 RUN useradd  /sbin/nologin -s -M www
 
 # CMD
 # 容器运行的默认命令
 # CMD 指令会被 docker run指令覆盖掉
 # CMD ["executable","param1","param2"] exec模式
 # CMD command param1 param2 shell模式
 # CMD ["param1","param2"] 作为ENTRYPOINT指令的默认参数
 CMD ["ngnix"]
 
 
 # ENTRYPOINT
 # ENTRYPOINT 指令必须显示的 使用docker run 才能被覆盖
 # ENTRYPOINT ["executable","param1","param2"] exec 模式
 # ENTRYPOINT command param1 param2 shell模式
 
 
 # WORKID
 # 注意 路径不存在会自动创建
     # 使用绝对路径 
 # 指定工作目录
 WORKID dir
 RUN XXX #安装命令
 # 修改配置文件
 RUN ECHO "daemon off;" >> /file
 
 
 # ADD COPY
 # COPY 优先级高于 ADD
 # 添加远程文件/目录 使用curl 或 wget 
 
 # ADD 
 # 将文件或目录复制到镜像当中
 # ADD 中包含类似tar的解压功能 但是会使缓存机制失效
 # ADD <src>...<dest>
 # ADD ["<src>"..."<dest>"] # 适用于文件路径中有空格的情况
 # 
 ADD xxx=
 ADD xxx=
 ADD xxx=
 
 # COPY
 # 将文件或目录复制到镜像当中
 # 单纯复制文件 Docker 推荐使用COPY
 # COPY <src>...<dest>
 # COPY ["<src>"..."<dest>"] # 适用于文件路径中有空格的情况

 
 # ENV 
 # 注意 多使用 增加可维护性
 # 设置环境变量
 # ENV <key><value>
 # ENV <key>=<value>...
 ENV PATH /usr/local/ngnix/sbin:$PATH
 
 
 # EXPOSE
 # 指定运行该镜的容器使用的端口
 # EXPOSE <port>[<port>...]
 EXPOSE port # 映射端口
 
 # VOLUME["/data"]
  
  
 
 
 

 
 # USER daemon
 # 指定什么用户可以运行
 
 # ONBUILD [INSTRUCTION]
 # 添加镜像触发器
 # 当一个镜像被其他镜像作为基础镜像时执行
 # 会在构建过程中插入指令
 
# 开始构建
docker build -t imagesName:v1 .

# 构建过程
# 从基础镜像运行一个容器
# 执行一条指令，对容器做出修改
# 执行类似docker commit的操作，提交一个新的镜像层
# 再基于刚提交的镜像运行一个新容器
# 执行dockerfile中的下一条指令，直至所有指令执行完毕

# 构建缓存
# 标志：using cache

# 不使用缓存
$ docker build --no-cache # 比如存在yum等命令

# 查看镜像构建的过程
$ docker history [image]
```

## 实战

```shell
# 错误调试
# 当构建image时出现错误 利用image layer来进行调试
docker run -it container  /bin/bash
# 最后根据具体的错误信息进行排查
```

### 测试

```shell
FROM ubuntu
RUN apt-get update && apt-get install -y stress
ENTRYPOINT ["/usr/bin/stress"]
CMD []
#CMD ["/usr/bin/stress"]
```

## 资源限制

底层技术支持

```shell

```



# Docker基本命令

```shell
# docker基本命令
docker --help

docker
 management commands
 commands
 
 

# awk 打印第一列
docker ls -a ｜ awk {'print$1'}
# demo
docker rm $(docker ls -aq)

# 获取推出的数据
docker ls -f "status=exited" -q

# demo
docker rm $(docker ls -f "status=exited" -q)
```



# 权限问题

```shell
# 以后安全考虑均创建docker用户
sudo groupadd docker
sudo gpasswd -a docker docker
```

# 番外篇

```shell
# 编译c文件
# 先安装gcc
gcc -static xxx.c -o hello
# result 可执行文件
hello
```

```shell
# shell格式
RUN apt-get install -y vim
CMD echo "hello docker"
ENTRYPOINT echo "hello word"

# exec格式 不识别变量$name 必须显示的指定运行命令比如 /bin/bash
RUN ["apt-get","install","-y","vim"]
CMD ["/bin/echo","hello docker"]
ENTRYPOINT ["/bin/echo","hello docker"]
```

