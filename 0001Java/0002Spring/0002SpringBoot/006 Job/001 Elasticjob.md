# Elastic-Job

```shell
# 下载
# ElasticJob-Lite

https://www.apache.org/dyn/closer.lua/shardingsphere/elasticjob-3.0.1/apache-shardingsphere-elasticjob-3.0.1-lite-bin.tar.gz

# ElasticJob-Lite-UI
https://www.apache.org/dyn/closer.lua/shardingsphere/elasticjob-ui-3.0.1/apache-shardingsphere-elasticjob-3.0.1-lite-ui-bin.tar.gz
```



## ElasticJob-Lite



```shell
tar -zxvf elasticjob-lite-console-${version}.tar.gz

tar -zxvf apache-shardingsphere-elasticjob-3.0.1-lite-bin.tar.gz

```

### application.properties

```properties
server.port=port

spring.datasource.default.driver-class-name=
spring.datasource.default.url=
spring.datasource.default.username=
spring.datasource.default.password=
spring.jpa.show-sql=
```





```yaml
elasticjob:
  regCenter:
    serverLists: localhost:6181
    namespace: elasticjob-lite-springboot
```





```xml
<dependency>
    <groupId>org.apache.shardingsphere.elasticjob</groupId>
    <artifactId>elasticjob-lite-core</artifactId>
    <version>${latest.release.version}</version>
</dependency>


<dependency>
    <groupId>org.apache.shardingsphere.elasticjob</groupId>
    <artifactId>elasticjob-lite-spring-boot-starter</artifactId>
    <version>${latest.release.version}</version>
</dependency>
```





## ElasticJob-Cloud

```shell
# 
tar -zxvf elasticjob-cloud-scheduler-${version}.tar.gz


```



```xml
<dependency>
    <groupId>org.apache.shardingsphere.elasticjob</groupId>
    <artifactId>elasticjob-cloud-executor</artifactId>
    <version>${latest.release.version}</version>
</dependency>
```

