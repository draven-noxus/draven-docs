# Spring cloud bus

接Spring cloud config

https://cloud.spring.io/spring-cloud-static/spring-cloud-bus/2.0.2.RELEASE/multi/multi__quick_start.html

## config_server

### pom

```xml
// 使用其中一个
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-kafka</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### bootstrap.yaml

```yaml
# config 端
spring:
  application:
    name: onfig-bus-server
  profiles:
    active: dev
  cloud:
    config:
      server:
        git:
          uri: https://github.com/the-glorious-executione-noxus/draven-projects.git # 仓库地址
          label: master # 对应 {label} 部分，即 Git 的分支
          search-paths: springcloud-config-bus/config-repo # 仓库文件夹名称，多个以逗号分隔
          username: xxx
          password: xxx
          force-pull: true
    bus:
      # 开启消息跟踪
      enabled: true
      trace:
        enabled: true
  rabbitmq:
    host: mybroker.com
    port: 5672
    username: user
    password: secret
# 端口暴露实现自动刷新
management:
  endpoints:
    web:
      exposure:
        include: '*'    

# 以下目前可以不需要
#SpringCloud暴露接口，暴露/bus/refresh接口
management:
  security:
    enabled: false
    
#开启基本的权限，默认为true
security:
  basic:
    enabled: false
```

## config_client

### pom

// 使用其中一个

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-kafka</artifactId>
</dependency>
```

## 安装RabbitMq

```shell
http://192.168.200.134:15672
```

### bootstrap.yaml

```yaml
spring:
  cloud:
    config:
      # 对应 {label} 部分，即 Git 的分支
      label: master
      # 对应 {application} 部分 即服务名
      name: xxx-xxx
      # 对应 {profile} 部分
      profile: dev
      # 拉取地址
      url: http://localhost:8888 
      discovery:
        # 开启 Config 服务发现与注册
        enabled: true
        # 指定 server
        service-id: config-bus-server
    bus:
      # 开启消息跟踪
      enabled: true
      trace:
        enabled: true
```



## 增加注解

```java
@RefreshScope
```

## 触发bus总线

```shell
# 触发post请求
http://localhost:8888/actuator/bus-refresh
```

## 配置WebHooks

各种git服务器配置不一致