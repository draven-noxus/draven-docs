# Cassandra

```shell
#
# https://cassandra.apache.org/
# https://cassandra.apache.org/download/
# https://www.apache.org/dyn/closer.lua/cassandra/3.11.9/apache-cassandra-3.11.9-bin.tar.gz
# https://cassandra.apache.org/doc/latest/getting_started/index.html
```



```XML
<dependency>
    <groupId>org.spring.framework.boot</groupId>
    <artifactId>spring-boot-starter-data-cassandra</artifactId>
</dependency>

```



```properties
spring.data.cassandra.keyspace-name=keyspace
spring.data.cassandra.contact-points=127.0.0.1:9042
spring.data.cassandra.local-datacenter=datacenter1
```



```yaml
spring:
  data:
    cassandra:
      # 若报错此处使用双引号  '"demo"'
      keyspace-name: demo
      contact-points: 127.0.0.1:9042
      local-datacenter: datacenter1
      # 生成策略
      schema-action: create_if_not_exists

```





```shell
CREATE KEYSPACE demo
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

```





## FAQ

```shell
Invalid CQL form [keyspace]: needs double quotes
```

