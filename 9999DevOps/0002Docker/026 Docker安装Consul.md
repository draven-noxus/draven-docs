# Consul

## 单节点安装

```shell
# 拉取镜像运行
docker run --name consul1 -d -p 8500:8500 -p 8300:8300 -p 8301:8301 -p 8302:8302 -p 8600:8600 consul agent -server -bootstrap-expect 2 -ui -bind=0.0.0.0 -client=0.0.0.0

# 查看网段
docker inspect --format='{{.NetworkSettings.IPAddress}}' consul1
172.17.0.3

# 加入集群
docker run --name consul2 -d -p 8501:8500 consul agent -server -ui -bind=0.0.0.0 -client=0.0.0.0 -join 172.17.0.3

# 加入集群
docker run --name consul3 -d -p 8502:8500 consul agent -server -ui -bind=0.0.0.0 -client=0.0.0.0 -join 172.17.0.3

# 查看集群状态
docker exec -it consul1 consul members
```

## 说明

```shell
# 端口详解
  # 8500 : http 端口，用于 http 接口和 web ui访问；
  # 8300 : server rpc 端口，同一数据中心 consul server 之间通过该端口通信；
  # 8301 : serf lan 端口，同一数据中心 consul client 通过该端口通信; 用于处理当前datacenter中LAN的gossip通信；
  # 8302 : serf wan 端口，不同数据中心 consul server 通过该端口通信; agent Server使用，处理与其他datacenter的gossip通信；
  # 8600 : dns 端口，用于已注册的服务发现；
```

# FAQ

```shell
0101 can not connect to 127.0.0.1:8091 cause:can not register RM,err:can not connect to services-server.
```

## 非docker安装

```shell
# 1.下载安装包
# 2.解压运行即可
# 3.启动(熟悉命令行即可)
./consul agent -dev
```

