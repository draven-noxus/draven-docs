# Spring Cloud Sleuth

## 分布式追踪系统

### 核心步骤

#### 数据采集

#### 数据存储

#### 查询展示

## OpenTracing

### 原则

ZIPKIN

TRACER

JAEGER

GRPC

### Annotation

事件类型

cs

cr

ss

sr

## 集成步骤

引入依赖

启动Zipkin

配置参数













```xml
<dependency>
     <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
```



```java

```

[服务名称,链路唯一标识,几个基本单元,是否收集展示]



## Zipkin

```xml
<dependency>
     <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-sleuth-zipkin</artifactId>
</dependency>

<dependency>
     <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```



```yaml
spring:
 zipkin:
  base-url: # zipkin 地址
  sender:
   type: web # 默认指定某种MQ
 sleuth:
  sampler:
   probability: 1 # 数据发送百分比 0-1
```



打印日志

```yaml
logging:
  level:
    root: INFO
    org.springframework.web.servlet.DispatcherServlet: DEBUG
    org.springframework.cloud.sleuth: DEBUG
```



### 优化

消息中间件来解决耦合问题

日志保存在内存中，重启即丢失 MySQL  Elcasticsearch

