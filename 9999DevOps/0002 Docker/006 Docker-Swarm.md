# Swarm Mode

链接：https://docs.docker.com/swarm/overview/

# 特点

对外以Docker API接口呈现

容易上手，学习成本低

轻量级，节省资源

对Docker命令参数支持完善

## 架构与概念

服务编排

Docker CLI -->Swarm-->Docker

Docker Client -->Swarm Manager-->SwarmNode(Docker daemon)

# 调度模块

### filter

Constraints	 	约束过滤器

Affinity				切合过滤器 		

Dependency		依赖

Health filter		建康状态

Ports filter	  	端口过滤器

### Strategy

Binpack	使用最多的策略

Spread	 资源最少 均匀分布

Random	最忌

# 服务发现

Ingress（默认） 基于物理网络之上的虚拟网络，不依赖物理网络，下层网络保持不变

Ingress+link  一个服务依赖于另一个服务时，基于DNS

​		link 内部之间访问

自定义网络

```shell
# 创建自定义网络
$ docker network create --driver=overlay --attachable mynet
# 创建服务
$ docker service create -p 80:80 --network=mynet --name ngnix ngnix
```

# API Server

监听来自Docker Client的请求

将请求转发到相应的工作节点

TLS加密

目前支持大约75%的Docker API

# 服务编排

服务部署 && 服务发现

服务更新  --docker service update

服务扩缩容 --docker service scale

# 集群搭建

```shell
$ ssh michael@ip

$ docker search swarm

$ docker run swarm --help

$ docker run swarm create

$ docker-machine create -d virtualbox --swarm --swarm-master --swarm-discovery token://fe0cc96a72cf04dba8c1c4aa79536ec3 swarm-master
```

### 搭建

```shell
$ docker network ls
# 初始化集群
$ docker swarm init --advertise-addr ip
# 会生成一个加入主节点的命令 生成worker节点
# ip:port : 主节点的地址
$ docker swarm join --token xxx ip:port
# 查看网络状态
$ docker network ls
# 查看当前节点状态
$ docker node ls
# 切换主节点 标记 leader
$ docker node promote server02
# 查看当前节点状态
$ docker node ls

# 创建服务
# test1 服务名
$ docker service create --name test1 alpine ping www.baidu.com

# 查看当前服务
$ docker service ls

# 查看当前服务的配置i信息
# test1 服务名
$ docker service inspect test1

# 查看日志
$ docker service logs test1

# 创建服务并查看状态
$ docker service create --name ngnix --detach=false ngnix

# 暴露端口
$ docker service update --publish-add 8080:80 --detach=false ngnix

# 查看监听
netstat -na|grep LISETN

# 扩展为三个节点
$ docker service scale ngnix=3

# 负载均衡测试
# 通过修改某个节点的ngnix的页面来测试负载均衡

# 不能通过名字访问
# 但是可以通过ip进行访问
$ wget ip:port


# 测试自定义网络
$ docekr network craete -d overlay imooc-overlay
# 创建服务测试
$ docker service create --network imooc-overlay --name ngnix -p 8080:80 --detach=false ngnix
# 可以通过名字访问
$ ping ngnix

# dnsrr方式 不需要使用端口 -p 8090:80
$ docker service craete --name ngnix-b --endpoint-node dnsrr--detch=false  ngnix
```

### docker stack

```shell
# 编写文件
$ vi service.yml
```



```yaml
version: ""
services:
 alpine:
  image:
  command:
   -"ping"
   -"www.baidu.com"
  networks:
   -
```



### 架构

### 服务创建和调度