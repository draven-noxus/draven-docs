# Graylog

链接：https://www.graylog.org/

https://hub.docker.com/r/graylog/graylog/

http://docs.graylog.org/en/stable/pages/installation/docker.html

http://docs.graylog.org/en/stable/pages/configuration/server.conf.html

## 环境搭建

### MongoDB

设置配置

### Elasticsearch



docker-compose.yml

```yaml
version: '2'
services:
  # MongoDB: https://hub.docker.com/_/mongo/
  mongodb:
    image: mongo:3
  # Elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/6.6/docker.html
#  elasticsearch:
#    image: docker.elastic.co/elasticsearch/elasticsearch-oss:6.6.1
#    environment:
#      - http.host=0.0.0.0
#      - transport.host=localhost
#      - network.host=0.0.0.0
#      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
#    ulimits:
#      memlock:
#        soft: -1
#        hard: -1
#    mem_limit: 1g
  # Graylog: https://hub.docker.com/r/graylog/graylog/
  graylog:
    image: graylog/graylog:3.0
    environment:
      # CHANGE ME (must be at least 16 characters)!
      - GRAYLOG_PASSWORD_SECRET=somepasswordpepper
      # Password: admin
      - GRAYLOG_ROOT_PASSWORD_SHA2=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
      - GRAYLOG_HTTP_EXTERNAL_URI=http://127.0.0.1:9000/
      # 使用外部elasticsearch
      - GRAYLOG_ELASTICSEARCH_HOSTS=http://127.0.0.1:9200
      - GRAYLOG_ROOT_TOMEZONE=Asia/shanghai
    links:
      - mongodb:mongo
      - elasticsearch
    depends_on:
      - mongodb
      - elasticsearch
    ports:
      # Graylog web interface and REST API
      - 9000:9000
      # Syslog TCP
      - 1514:1514
      # Syslog UDP
      - 1514:1514/udp
      # GELF TCP
      - 12201:12201
      # GELF UDP
      - 12201:12201/udp
```

## 接入SpringBoot

链接：https://marketplace.graylog.org/

https://marketplace.graylog.org/addons?kind=gelf

https://github.com/osiegmar/logback-gelf

### 选择组件

```xml
<dependency>
    <groupId>de.siegmar</groupId>
    <artifactId>logback-gelf</artifactId>
    <version>2.1.0</version>
</dependency>
```

```xml
<configuration>
    <appender name="GELF" class="de.siegmar.logbackgelf.GelfUdpAppender">
        <graylogHost>localhost</graylogHost>
        <graylogPort>12201</graylogPort>
    </appender>
    <root level="debug">
        <appender-ref ref="GELF" />
    </root>
</configuration>
```

































docker-compose.yml

```yaml
version: '2'
services:
  # MongoDB: https://hub.docker.com/_/mongo/
  mongodb:
    image: mongo:3
  # Elasticsearch: https://www.elastic.co/guide/en/elasticsearch/reference/6.6/docker.html
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch-oss:6.6.1
    environment:
      - http.host=0.0.0.0
      - transport.host=localhost
      - network.host=0.0.0.0
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    mem_limit: 1g
  # Graylog: https://hub.docker.com/r/graylog/graylog/
  graylog:
    image: graylog/graylog:3.0
    environment:
      # CHANGE ME (must be at least 16 characters)!
      - GRAYLOG_PASSWORD_SECRET=somepasswordpepper
      # Password: admin
      - GRAYLOG_ROOT_PASSWORD_SHA2=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
      - GRAYLOG_HTTP_EXTERNAL_URI=http://127.0.0.1:9000/
    links:
      - mongodb:mongo
      - elasticsearch
    depends_on:
      - mongodb
      - elasticsearch
    ports:
      # Graylog web interface and REST API
      - 9000:9000
      # Syslog TCP
      - 1514:1514
      # Syslog UDP
      - 1514:1514/udp
      # GELF TCP
      - 12201:12201
      # GELF UDP
      - 12201:12201/udp
```

