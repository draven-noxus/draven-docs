
```shell
https://resilience4j.readme.io/docs
https://resilience4j.readme.io/docs/circuitbreaker
https://resilience4j.readme.io/docs/bulkhead
https://resilience4j.readme.io/docs/ratelimiter
https://resilience4j.readme.io/docs/retry

https://resilience4j.readme.io/docs/getting-started

https://resilience4j.readme.io/docs/feign

https://resilience4j.readme.io/docs/getting-started-3
https://github.com/resilience4j/resilience4j-spring-boot2-demo

https://resilience4j.readme.io/docs/getting-started-6

https://github.com/resilience4j/resilience4j-spring-cloud2-demo

https://resilience4j.readme.io/docs/micrometer

https://github.com/resilience4j/resilience4j/edit/master/grafana_dashboard.json
```

```shell
@Bulkhead(name = "backendA")
@Retry(name = "retryBackendA")
@RateLimiter(name = "backendA")
@CircuitBreaker(name = "backendA")
```



# Spring-Boot-resilience4j

```xml
<dependency>
  <groupId>io.github.resilience4j</groupId>
  <artifactId>resilience4j-spring-boot2</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<!--<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-aop</artifactId>
</dependency>-->
```

# Spring-Cloud-resilience4j

```xml
<dependency>
  <groupId>io.github.resilience4j</groupId>
  <artifactId>resilience4j-spring-cloud2</artifactId>
</dependency>
```



```yaml

```



# Spring Cloud Circuit Breaker-Resilience4J

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-circuitbreaker-resilience4j</artifactId>
</dependency>   
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>org.springframework.cloud:spring-cloud-starter-circuitbreaker-reactor-resilience4j</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-circuitbreaker-spring-retry</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-circuitbreaker-spring-retry</artifactId>
</dependency>
<!--<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-circuitbreaker-spring-retry</artifactId>
</dependency> -->
```

```yaml
spring:
  cloud:
    circuitbreaker:
      resilience4j:
        enabled: true
```



# 介绍

```shell
https://resilience4j.readme.io/docs/getting-started
```

```xml
<properties>
 <resilience4j.version>resilience4jVersion</resilience4j.versionresilience4j.version>
</properties>
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-circuitbreaker</artifactId>
    <version>${resilience4jVersion}</version>
</dependency>
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-ratelimiter</artifactId>
    <version>${resilience4jVersion}</version>
</dependency>
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-retry</artifactId>
    <version>${resilience4jVersion}</version>
</dependency>
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-bulkhead</artifactId>
    <version>${resilience4jVersion}</version>
</dependency>
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-cache</artifactId>
    <version>${resilience4jVersion}</version>
</dependency>
<dependency>
    <groupId>io.github.resilience4j</groupId>
    <artifactId>resilience4j-timelimiter</artifactId>
    <version>${resilience4jVersion}</version>
</dependency>
```



## Core modules

### Circuitbreaker

```shell
a count-based sliding window and a time-based sliding window
```



### Ratelimiter

### Bulkheading

### Automatic retrying

### Result caching

### Timeout Handing

## Add-on modules

### Feign adapter

## Metrics

### micrometer

### metrics

### prometheus

# 附录

```yaml
resilience4j.circuitbreaker:
    configs:
        default:
            registerHealthIndicator: true
            slidingWindowSize: 10
            minimumNumberOfCalls: 5
            permittedNumberOfCallsInHalfOpenState: 3
            automaticTransitionFromOpenToHalfOpenEnabled: true
            waitDurationInOpenState: 5s
            failureRateThreshold: 50
            eventConsumerBufferSize: 10
            recordExceptions:
                - org.springframework.web.client.HttpServerErrorException
                - java.util.concurrent.TimeoutException
                - java.io.IOException
            ignoreExceptions:
                - io.github.robwin.exception.BusinessException
        shared:
            slidingWindowSize: 100
            permittedNumberOfCallsInHalfOpenState: 30
            waitDurationInOpenState: 1s
            failureRateThreshold: 50
            eventConsumerBufferSize: 10
            ignoreExceptions:
                - io.github.robwin.exception.BusinessException
    instances:
        backendA:
            baseConfig: default
        backendB:
            registerHealthIndicator: true
            slidingWindowSize: 10
            minimumNumberOfCalls: 10
            permittedNumberOfCallsInHalfOpenState: 3
            waitDurationInOpenState: 5s
            failureRateThreshold: 50
            eventConsumerBufferSize: 10
            recordFailurePredicate: io.github.robwin.exception.RecordFailurePredicate
resilience4j.retry:
    configs:
        default:
	          maxAttempts: 3
	          # 未来版本不再使用
            maxRetryAttempts: 3
            waitDuration: 100
            retryExceptions:
                - org.springframework.web.client.HttpServerErrorException
                - java.util.concurrent.TimeoutException
                - java.io.IOException
            ignoreExceptions:
                - io.github.robwin.exception.BusinessException
    instances:
        backendA:
            baseConfig: default
        backendB:
            baseConfig: default
resilience4j.bulkhead:
    configs:
        default:
            maxConcurrentCalls: 100
    instances:
        backendA:
            maxConcurrentCalls: 10
        backendB:
            maxWaitDuration: 10ms
            maxConcurrentCalls: 20

resilience4j.thread-pool-bulkhead:
    configs:
        default:
            maxThreadPoolSize: 4
            coreThreadPoolSize: 2
            queueCapacity: 2
    instances:
        backendA:
            baseConfig: default
        backendB:
            maxThreadPoolSize: 1
            coreThreadPoolSize: 1
            queueCapacity: 1

resilience4j.ratelimiter:
    configs:
        default:
            registerHealthIndicator: false
            limitForPeriod: 10
            limitRefreshPeriod: 1s
            timeoutDuration: 0
            eventConsumerBufferSize: 100
    instances:
        backendA:
            baseConfig: default
        backendB:
            limitForPeriod: 6
            limitRefreshPeriod: 500ms
            timeoutDuration: 3s
            
resilience4j.timelimiter:
    configs:
        default:
            cancelRunningFuture: false
            timeoutDuration: 2s
    instances:
        backendA:
            baseConfig: default
        backendB:
            baseConfig: default




management:
  endpoint:
    health:
      show-details: always
  endpoints:
    web:
      exposure:
        include: '*'
  health:
    circuitbreakers:
      enabled: true
    diskspace:
      enabled: false
    ratelimiters:
      enabled: false
  metrics:
    distribution:
      percentiles-histogram:
        http:
          server:
            requests: true
        resilience4j:
          circuitbreaker:
            calls: true
    tags:
      application: ${spring.application.name}
```

# FAQ

```shell
# 1 整合问题
# 必须依赖
spring-boot-starter-aop
# 暴露端点
spring-boot-starter-actuator
# boot
resilience4j-spring-boot2
# cloud
resilience4j-spring-cloud2


# 2 配置不生效问题
# 配置错误书写 没有采用官方demo配置

# 3 原理xxx 

```

