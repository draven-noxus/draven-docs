# Gateway

## 关键词

Netty

Reactor

webflux

## 整合gateway

```yaml
spring:
  application:
    name: nacos-gateway
  profiles:
    active: native # 环境指定
  cloud:
    nacos:
      config: # 配置中心
        server-addr: 116.196.77.250:8848
        file-extension: yaml
        group: NATIVE_GROUP
        namespace: 7d7282e8-1906-460e-8729-0492358c4b2b
      discovery: # 服务发现
        server-addr: 116.196.77.250:8848
        service: ${spring.application.name}
        group: NATIVE_GROUP
        namespace: 7d7282e8-1906-460e-8729-0492358c4b2b
    gateway:
      discovery:
        locator:
          enabled: true # 自动获取服务信息
```

## 核心概念

Route路由

包含 id url Predicate filter

Predicate

条件匹配

Filter

修改请求响应

## 架构

主要实现类

Handler Mapping

Web Handler



### RoutePredicateFactory

#### 手记

http://www.imooc.com/article/290804

```shell
org.springframework.cloud.gateway.handler.predicate.RoutePredicateFactory
```

#### 自定义

```yaml
      routes:
        - id: before_route
          uri: localhost:8888
          predicates:
            - Method=GET
            - TimeBetween 
```

```java
@Component
public class TimeBetweenRoutePredicateFactory extends AbstractRoutePredicateFactory<TimeBeetweenConfig> {
    public TimeBetweenRoutePredicateFactory() {
        super(TimeBeetweenConfig.class);
    }

    /**
     * 匹配字段关键字
     * @return
     */
    @Override
    public List<String> shortcutFieldOrder() {
        return Arrays.asList("start", "end");
    }

    /**
     * @param config
     * @return
     */
    @Override
    public Predicate<ServerWebExchange> apply(TimeBeetweenConfig config) {
        LocalTime start = config.getStart();
        LocalTime end = config.getEnd();
        return exchange -> {
            LocalTime now = LocalTime.now();
            return now.isAfter(start) && now.isBefore(end);
        };
    }
}
```



```java
@Data
@Setter
@Getter
public class TimeBeetweenConfig {

    private LocalTime start;
    private LocalTime end;

    public LocalTime getStart() {
        return start;
    }

    public void setStart(LocalTime start) {
        this.start = start;
    }

    public LocalTime getEnd() {
        return end;
    }

    public void setEnd(LocalTime end) {
        this.end = end;
    }
}

```

### GatewayFilterFactory

#### 手记

http://www.imooc.com/article/290816

```java
org.springframework.cloud.gateway.filter.NettyRoutingFilter
```



#### 自定义

### 全局过滤器

http://www.imooc.com/article/290821