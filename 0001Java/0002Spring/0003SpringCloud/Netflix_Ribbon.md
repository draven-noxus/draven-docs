# Ribbon

RestTemplate

Feign

Zuul

均使用到了Ribbon

## 负载均衡

### 介绍

增加了okhttp httpclient

服务发现 ServerList

服务选择规则 IRule

```yaml
# 修改访问规则
service-name:
 ribbon:
  NFLoadBalancerRuleClassName: # 全限定类
```

服务监听 ServerListFilter

### 使用

(接Eureka)

Ribbon的超时时间一定要小于Hystix的超时时间

Eureka中已经帮我们集成了负载均衡组件：Ribbon

在RestTemplate的配置方法上添加`@LoadBalanced`注解：

```
@Bean
@LoadBalanced
public RestTemplate restTemplate() {
   //若不指定调用方式，那么默认的RestTemplate，底层走JDK的URLConnection方式。
    return new RestTemplate(new OkHttp3ClientHttpRequestFactory());
}
```

## 负载均衡策略

默认是轮询策略

配置策略：（配置于服务提供方）

### 依赖

```yaml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
</dependency>
```

格式是：`{服务名称}.ribbon.NFLoadBalancerRuleClassName`，值就是IRule的实现类。

```
user-service:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule
```

自定义策略：

？？？？

## 重试机制

配置于调用方（消费方）

### 依赖

```
<dependency>
    <groupId>org.springframework.retry</groupId>
    <artifactId>spring-retry</artifactId>
</dependency>
```

### application.yml

```yaml
spring:
 cloud:
  loadbalancer:
   retry:
    enabled: true # 开启Spring Cloud的重试功能
user-service:
  ribbon:
    ConnectTimeout: 250 # Ribbon的连接超时时间
    ReadTimeout: 1000 # Ribbon的数据读取超时时间
    OkToRetryOnAllOperations: true # 是否对所有操作都进行重试
    MaxAutoRetriesNextServer: 1 # 切换实例的重试次数
    MaxAutoRetries: 1 # 对当前实例的重试次数
```

## 粒度控制

### java方式

```java
/**
* 
*
*/
@Configuration
@RibbonClient(name="service-name",configuration="RibbonConfiguration.class")
public class XXXRibbonConfiguration{
  
}

/**
* 规则配置类
* 
*/
@Configuration
public class  RibbonConfiguration {
	@Bean
  public IRule ribbonRule(){
     return new RandomRule(); 
  }
}
```

注意：此配置类不要被@SpringBootApplication所扫描，会导经典问题Spring上下文重叠，从而引起事物失效问题，对于Rabbon配置类会将某个服务的负载均衡规则作为全局配置而产生影响

### 属性配置

```yaml
service-name:
 ribbon:
 # 配置负载均衡的规则 全限定类名
  NFLoadBalancerRuleClassName: com.netflix.loadbalancer.Random
```

### 全局配置

```java
/**
* 
* 此处替换为全局负载均衡策略生效
*@RibbonClients(deffaultConfiguraion="RibbonConfiguration.c* lass")
*/
@Configuration
@RibbonClients(defaultConfiguraion="RibbonConfiguration.class")
public class XXXRibbonConfiguration{
  
}

/**
* 规则配置类
* 
*/
@Configuration
public class  RibbonConfiguration {
	@Bean
  public IRule ribbonRule(){
     return new RandomRule(); 
  }
}
```

## 常用配置项

IClientConfig

IRule

IPing

ServerList<Server>

ServerListFilter<Server>

IloadBalance

ServerListUpdate

### 饥饿加载

会导致第一次调用时client代理慢，故

```yaml
ribbon:
 eager-load:
  enabled: true
  client: service-name1,service-name2,...,xxx
```

## Nacos

引入了权重的概念

引入了同一集群优先调用

基于元数据的版本控制

namespace概念-隔离机制