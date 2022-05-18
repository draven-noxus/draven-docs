# Zookeeper

## 单机

```shell
version: '3.5'

services:
  JD:
    image: zookeeper
    restart: always
    container_name: zk1
    ports:
      - 2181:2181
    environment:
      ZOO_MY_ID: 1
      ZOO_SERVERS: server=JD:2888:3888;2181 
 
  dubbo-admin:
    image: apache/dubbo-admin
    container_name: dubbo
    ports:
      - 8088:8080
    networks:
      - dubbo-net
    environment:
      - admin.registry.address=zookeeper://JD:2181?
    depends_on:
      - JD
```

## 集群

```shell
version: '3.5'

services:
  zoo1:
    image: zookeeper
    restart: always
    container_name: zk1
    ports:
      - 2181:2181
    environment:
      ZOO_MY_ID: 1
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181
    networks:
      - dubbo-net

  zoo2:
    image: zookeeper
    restart: always
    container_name: zk2
    ports:
      - 2182:2181
    environment:
      ZOO_MY_ID: 2
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181
    networks:
      - dubbo-net

  zoo3:
    image: zookeeper
    restart: always
    container_name: zk3
    ports:
      - 2183:2181
    environment:
      ZOO_MY_ID: 3
      ZOO_SERVERS: server.1=zoo1:2888:3888;2181 server.2=zoo2:2888:3888;2181 server.3=zoo3:2888:3888;2181
    networks:
      - dubbo-net

  dubbo-admin:
    image: apache/dubbo-admin
    container_name: dubbo
    ports:
      - 8080:8080
    networks:
      - dubbo-net
    environment:
      - admin.registry.address=zookeeper://zoo1:2181?backup=zoo2:2181,zoo3:2181
      - admin.config-center=zookeeper://zoo1:2181?backup=zoo2:2181,zoo3:2181
      - admin.metadata-report.address=zookeeper://zoo1:2181?backup=zoo2:2181,zoo3:2181
    depends_on:
      - zoo1
      - zoo2
      - zoo3

networks:
  dubbo-net:
    name: dubbo-net
    driver: bridge
```

## 说明

```shell
# 项目介绍

    # 本项目旨在应用阿里开源的分布式服务框架 dubbo
    # https://amoswang0626.github.io/docker-dubbo/

# 主要内容包括
   # docker 构建 zookeeper 集群
   # docker 构建 dubbo-admin（服务管理后台）
   # docker 构建 服务提供者 provider
   # docker 构建 服务消费者 consumer

# docker 构建 zookeeper 集群、dubbo-admin

# docker-compose.yml
   # docker-compose up -d
   # 访问dubbo-admin
   # root用户：账号密码均为root
   # guest用户：账号密码均为guest

# 注意事项

  # 不删除旧镜像，再次构建，旧镜像就会被悬空
  # 删除悬空镜像：docker image prune
  # 删除构建的 zookeeper、dubbo-admin、network
  # 停止：docker stop dubbo-admin zookeeper_3 zookeeper_2 zookeeper_1
  # 删除：docker rm dubbo-admin zookeeper_3 zookeeper_2 zookeeper_1
  # 删除网络：docker network rm dubbo-net
```



# FAQ

```shell
0101 can not connect to 127.0.0.1:8091 cause:can not register RM,err:can not connect to services-server.
```

