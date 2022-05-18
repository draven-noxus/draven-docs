# Spring-boot-Metrics

```shell
# https://micrometer.io/
# https://micrometer.io/docs
# https://micrometer.io/docs/concepts
```



```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!--micrometer-registry-{system}-->
```
# Prometheus

```xml
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-redis</artifactId>
</dependency>
<dependency>
    <groupId>io.prometheus</groupId>
    <artifactId>simpleclient_pushgateway</artifactId>
</dependency>

```

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'spring.application.name'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['HOST:PORT']
```

```yaml
management.metrics.export.prometheus.pushgateway.enabled=true


# PrometheusPushGatewayManager
```



# Elastic

```xml
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-elastic</artifactId>
</dependency>
```

```yaml
# 端口暴露
management:
  endpoints:
    web:
      exposure:
        include: '*'
  endpoint:
    metrics:
      enabled: true

  # 监控服务名
  metrics:
    #    tags:
    #      application: ${spring.application.name}
    export:
      elastic:
        enabled: true
        auto-create-index: true
        index: ${spring.application.name}
        host: http://localhost:9200

```



prometheus+grafana



