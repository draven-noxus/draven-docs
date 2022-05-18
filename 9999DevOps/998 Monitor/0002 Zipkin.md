# Zipkin

## 参考

```shell
# github: https://github.com/openzipkin/zipkin
# https://zipkin.io/ 
# https://zipkin.io/pages/quickstart.html
# http://ip:9411/zipkin/
```

# 理论篇

## 日志分析

### traceId

### spanId

### parentId



## 配置

基于Spring Boot 已经不再推荐自己搭建zipkin服务器

```shell
# 最新安装包(jar)
https://search.maven.org/remote_content?g=io.zipkin&a=zipkin-server&v=LATEST&c=exec
# 源码安装 
https://github.com/openzipkin/zipkin
# docker安装
docker run -d -p 9411:9411 openzipkin/zipkin
```



## 安装包

```shell
# 获取安装包
	# https://search.maven.org/remote_content？g=io.zipkin&a=zipkin-server&v=LATEST&c=exec
	
# 运行安装包
	java -jar zipkin-server-version-exec.jar
	
# 配置存储源
	# 改配置文件中描述了详细信息 zipkin-master/zipkin-server/src/main/resources/zipkin-server-shared.yml
  # 改为mysql存储
  # 创建表语句
	zipkin-master/zipkin-storage/mysql-v1/src/main/resources/mysql.sql
	
	# 获取参数信息
	zipkin-master/zipkin-server/src/main/resources/zipkin-server-shared.yml
# demo
# 这里采用rabbitmq收集-不使用请注释(默认采用web) 
java -jar zipkin-server-version-exec.jar
--zipkin.collector.rabbitmq.addresses=localhost --zipkin.storage.type=mysql --zipkin.storage.mysql.host=localhost --zipkin.storage.mysql.port=3306 --zipkin.storage.mysql.username=root --zipkin.storage.mysql.password=12345678 --zipkin.storage.mysql.db=zipkin

```



## Docker

### Docker-compose

```yaml
# https://github.com/openzipkin-attic/docker-zipkin/blob/master/docker-compose.yml
# This file uses the version 2 docker-compose file format, described here:
# https://docs.docker.com/compose/compose-file/#version-2
#
# This runs the zipkin and zipkin-mysql containers, using docker-compose's
# default networking to wire the containers together.
#
# Note that this file is meant for learning Zipkin, not production deployments.

version: '2'

services:
  storage:
    image: openzipkin/zipkin-mysql
    container_name: mysql
    # Uncomment to expose the storage port for testing
    # ports:
    #   - 3306:3306

  # The zipkin process services the UI, and also exposes a POST endpoint that
  # instrumentation can send trace data to. Scribe is disabled by default.
  zipkin:
    image: openzipkin/zipkin
    container_name: zipkin
    # Environment settings are defined here https://github.com/openzipkin/zipkin/blob/master/zipkin-server/README.md#environment-variables
    environment:
      - STORAGE_TYPE=mysql
      # Point the zipkin at the storage backend
      - MYSQL_HOST=mysql
      # Uncomment to enable scribe
      # - SCRIBE_ENABLED=true
      # Uncomment to enable self-tracing
      # - SELF_TRACING_ENABLED=true
      # Uncomment to enable debug logging
      # - JAVA_OPTS=-Dlogging.level.zipkin2=DEBUG
    ports:
      # Port used for the Zipkin UI and HTTP Api
      - 9411:9411
      # Uncomment if you set SCRIBE_ENABLED=true
      # - 9410:9410
    depends_on:
      - storage

  # Adds a cron to process spans since midnight every hour, and all spans each day
  # This data is served by http://192.168.99.100:8080/dependency
  #
  # For more details, see https://github.com/openzipkin/docker-zipkin-dependencies
  dependencies:
    image: openzipkin/zipkin-dependencies
    container_name: dependencies
    entrypoint: crond -f
    environment:
      - STORAGE_TYPE=mysql
      - MYSQL_HOST=mysql
      # Add the baked-in username and password for the zipkin-mysql image
      - MYSQL_USER=zipkin
      - MYSQL_PASS=zipkin
      # Uncomment to see dependency processing logs
      # - ZIPKIN_LOG_LEVEL=DEBUG
      # Uncomment to adjust memory used by the dependencies job
      # - JAVA_OPTS=-verbose:gc -Xms1G -Xmx1G
    depends_on:
      - storage

  prometheus:
    image: prom/prometheus
    container_name: prometheus
    ports:
      - 9090:9090
    depends_on:
      - storage
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - 3000:3000
    depends_on:
      - prometheus
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin

  setup_grafana_datasource:
    image: appropriate/curl
    container_name: setup_grafana_datasource
    depends_on:
      - grafana
    volumes:
      - ./prometheus/create-datasource-and-dashboard.sh:/create.sh:ro
    command: /create.sh

```



## 源码安装

## 

```shell
# 太麻烦 待定
# 获取安装包
./mvnw -DskipTests --also-make -pl zipkin-server clean install

# 运行安装包

# 配置存储源
```



# 参考资料

## 配置文件

```yaml
# zipkin-server.yml
spring.profiles.include: shared
armeria.enableMetrics: false

# zipkin-server-shared.yml
# 查看此配置文件
zipkin:
  self-tracing:
    # Set to true to enable self-tracing.
    enabled: ${SELF_TRACING_ENABLED:false}
    # percentage of self-traces to retain. If set to a value other than 1.0, traces-per-second will
    # not be used.
    sample-rate: ${SELF_TRACING_SAMPLE_RATE:1.0}
    # Number of traces per second to retain. sample-rate must be set to 1.0 to use this value. If
    # set to 0, an unlimited number of traces per second will be retained.
    traces-per-second: ${SELF_TRACING_TRACES_PER_SECOND:1}
    # Timeout in seconds to flush self-tracing data to storage.
    message-timeout: ${SELF_TRACING_FLUSH_INTERVAL:1}
  collector:
    # percentage to traces to retain
    sample-rate: ${COLLECTOR_SAMPLE_RATE:1.0}
    activemq:
      enabled: ${COLLECTOR_ACTIVEMQ_ENABLED:true}
      # ActiveMQ broker url. Ex. tcp://localhost:61616 or failover:(tcp://localhost:61616,tcp://remotehost:61616)
      url: ${ACTIVEMQ_URL:}
      # Queue from which to collect span messages.
      queue: ${ACTIVEMQ_QUEUE:zipkin}
      # Number of concurrent span consumers.
      concurrency: ${ACTIVEMQ_CONCURRENCY:1}
      # Optional username to connect to the broker
      username: ${ACTIVEMQ_USERNAME:}
      # Optional password to connect to the broker
      password: ${ACTIVEMQ_PASSWORD:}
    http:
      # Set to false to disable creation of spans via HTTP collector API
      enabled: ${COLLECTOR_HTTP_ENABLED:${HTTP_COLLECTOR_ENABLED:true}}
    grpc:
      # Set to true to enable the GRPC collector
      enabled: ${COLLECTOR_GRPC_ENABLED:false}
    kafka:
      enabled: ${COLLECTOR_KAFKA_ENABLED:true}
      # Kafka bootstrap broker list, comma-separated host:port values. Setting this activates the
      # Kafka 0.10+ collector.
      bootstrap-servers: ${KAFKA_BOOTSTRAP_SERVERS:}
      # Name of topic to poll for spans
      topic: ${KAFKA_TOPIC:zipkin}
      # Consumer group this process is consuming on behalf of.
      group-id: ${KAFKA_GROUP_ID:zipkin}
      # Count of consumer threads consuming the topic
      streams: ${KAFKA_STREAMS:1}
    rabbitmq:
      enabled: ${COLLECTOR_RABBITMQ_ENABLED:true}
      # RabbitMQ server address list (comma-separated list of host:port)
      addresses: ${RABBIT_ADDRESSES:}
      concurrency: ${RABBIT_CONCURRENCY:1}
      # TCP connection timeout in milliseconds
      connection-timeout: ${RABBIT_CONNECTION_TIMEOUT:60000}
      password: ${RABBIT_PASSWORD:guest}
      queue: ${RABBIT_QUEUE:zipkin}
      username: ${RABBIT_USER:guest}
      virtual-host: ${RABBIT_VIRTUAL_HOST:/}
      useSsl: ${RABBIT_USE_SSL:false}
      uri: ${RABBIT_URI:}
    scribe:
      enabled: ${COLLECTOR_SCRIBE_ENABLED:${SCRIBE_ENABLED:false}}
      category: ${SCRIBE_CATEGORY:zipkin}
      port: ${COLLECTOR_PORT:9410}
  query:
    enabled: ${QUERY_ENABLED:true}
    # Timeout for requests to the query API
    timeout: ${QUERY_TIMEOUT:11s}
    # 1 day in millis
    lookback: ${QUERY_LOOKBACK:86400000}
    # The Cache-Control max-age (seconds) for /api/v2/services, /api/v2/remoteServices and /api/v2/spans
    names-max-age: 300
    # CORS allowed-origins.
    allowed-origins: "*"

  # Internal properties that end users should never try to use
  internal:
    actuator:
      enabled: true
      # auto-configuration to include when ArmeriaSpringActuatorAutoConfiguration is present.
      # Note: These are still subject to endpoint conditions. The list must be checked for drift
      #       upgrading Spring Boot.
      include:
        - org.springframework.boot.actuate.autoconfigure.beans.BeansEndpointAutoConfiguration
        - org.springframework.boot.actuate.autoconfigure.condition.ConditionsReportEndpointAutoConfiguration
        - org.springframework.boot.actuate.autoconfigure.context.properties.ConfigurationPropertiesReportEndpointAutoConfiguration
        - org.springframework.boot.actuate.autoconfigure.endpoint.EndpointAutoConfiguration
        - org.springframework.boot.actuate.autoconfigure.env.EnvironmentEndpointAutoConfiguration
        - org.springframework.boot.actuate.autoconfigure.management.HeapDumpWebEndpointAutoConfiguration
        - org.springframework.boot.actuate.autoconfigure.logging.LoggersEndpointAutoConfiguration
        - org.springframework.boot.actuate.autoconfigure.management.ThreadDumpEndpointAutoConfiguration

  storage:
    strict-trace-id: ${STRICT_TRACE_ID:true}
    search-enabled: ${SEARCH_ENABLED:true}
    autocomplete-keys: ${AUTOCOMPLETE_KEYS:}
    autocomplete-ttl: ${AUTOCOMPLETE_TTL:3600000}
    autocomplete-cardinality: 20000
    type: ${STORAGE_TYPE:mem}
    throttle:
      enabled: ${STORAGE_THROTTLE_ENABLED:false}
      min-concurrency: ${STORAGE_THROTTLE_MIN_CONCURRENCY:10}
      max-concurrency: ${STORAGE_THROTTLE_MAX_CONCURRENCY:200}
      max-queue-size: ${STORAGE_THROTTLE_MAX_QUEUE_SIZE:1000}
    mem:
      # Maximum number of spans to keep in memory.  When exceeded, oldest traces (and their spans) will be purged.
      max-spans: ${MEM_MAX_SPANS:500000}
    cassandra:
      # Comma separated list of host addresses part of Cassandra cluster. Ports default to 9042 but you can also specify a custom port with 'host:port'.
      contact-points: ${CASSANDRA_CONTACT_POINTS:localhost}
      # Name of the datacenter that will be considered "local" for load balancing.
      local-dc: ${CASSANDRA_LOCAL_DC:datacenter1}
      # Will throw an exception on startup if authentication fails.
      username: ${CASSANDRA_USERNAME:}
      password: ${CASSANDRA_PASSWORD:}
      keyspace: ${CASSANDRA_KEYSPACE:zipkin}
      # Max pooled connections per datacenter-local host.
      max-connections: ${CASSANDRA_MAX_CONNECTIONS:8}
      # Ensuring that schema exists, if enabled tries to execute script /zipkin-cassandra-core/resources/cassandra-schema.cql.
      ensure-schema: ${CASSANDRA_ENSURE_SCHEMA:true}
      # 7 days in seconds
      span-ttl: ${CASSANDRA_SPAN_TTL:604800}
      # 3 days in seconds
      index-ttl: ${CASSANDRA_INDEX_TTL:259200}
      # the maximum trace index metadata entries to cache
      index-cache-max: ${CASSANDRA_INDEX_CACHE_MAX:100000}
      # how long to cache index metadata about a trace. 1 minute in seconds
      index-cache-ttl: ${CASSANDRA_INDEX_CACHE_TTL:60}
      # how many more index rows to fetch than the user-supplied query limit
      index-fetch-multiplier: ${CASSANDRA_INDEX_FETCH_MULTIPLIER:3}
      # Using ssl for connection, rely on Keystore
      use-ssl: ${CASSANDRA_USE_SSL:false}
    cassandra3:
      # Comma separated list of host addresses part of Cassandra cluster. Ports default to 9042 but you can also specify a custom port with 'host:port'.
      contact-points: ${CASSANDRA_CONTACT_POINTS:localhost}
      # Name of the datacenter that will be considered "local" for load balancing.
      local-dc: ${CASSANDRA_LOCAL_DC:datacenter1}
      # Will throw an exception on startup if authentication fails.
      username: ${CASSANDRA_USERNAME:}
      password: ${CASSANDRA_PASSWORD:}
      keyspace: ${CASSANDRA_KEYSPACE:zipkin2}
      # Max pooled connections per datacenter-local host.
      max-connections: ${CASSANDRA_MAX_CONNECTIONS:8}
      # Ensuring that schema exists, if enabled tries to execute script /zipkin2-schema.cql
      ensure-schema: ${CASSANDRA_ENSURE_SCHEMA:true}
      # how many more index rows to fetch than the user-supplied query limit
      index-fetch-multiplier: ${CASSANDRA_INDEX_FETCH_MULTIPLIER:3}
      # Using ssl for connection, rely on Keystore
      use-ssl: ${CASSANDRA_USE_SSL:false}
    elasticsearch:
      # host is left unset intentionally, to defer the decision
      hosts: ${ES_HOSTS:}
      pipeline: ${ES_PIPELINE:}
      timeout: ${ES_TIMEOUT:10000}
      index: ${ES_INDEX:zipkin}
      ensure-templates: ${ES_ENSURE_TEMPLATES:true}
      date-separator: ${ES_DATE_SEPARATOR:-}
      index-shards: ${ES_INDEX_SHARDS:5}
      index-replicas: ${ES_INDEX_REPLICAS:1}
      username: ${ES_USERNAME:}
      password: ${ES_PASSWORD:}
      credentials-file: ${ES_CREDENTIALS_FILE:}
      credentials-refresh-interval: ${ES_CREDENTIALS_REFRESH_INTERVAL:5}
      http-logging: ${ES_HTTP_LOGGING:}
      ssl:
        no-verify: ${ES_SSL_NO_VERIFY:false}
      health-check:
        enabled: ${ES_HEALTH_CHECK_ENABLED:true}
        interval: ${ES_HEALTH_CHECK_INTERVAL:3s}
      template-priority: ${ES_TEMPLATE_PRIORITY:}
    mysql:
      jdbc-url: ${MYSQL_JDBC_URL:}
      host: ${MYSQL_HOST:localhost}
      port: ${MYSQL_TCP_PORT:3306}
      username: ${MYSQL_USER:}
      password: ${MYSQL_PASS:}
      db: ${MYSQL_DB:zipkin}
      max-active: ${MYSQL_MAX_CONNECTIONS:10}
      use-ssl: ${MYSQL_USE_SSL:false}
  ui:
    enabled: ${QUERY_ENABLED:true}
    ## Values below here are mapped to ZipkinUiProperties, served as /config.json
    # Default limit for Find Traces
    query-limit: 10
    # The value here becomes a label in the top-right corner
    environment:
    # Default duration to look back when finding traces.
    # Affects the "Start time" element in the UI. 15 minutes in millis
    default-lookback: 900000
    # When false, disables the "Discover" screen
    search-enabled: ${SEARCH_ENABLED:true}
    # Which sites this Zipkin UI covers. Regex syntax. (e.g. http:\/\/example.com\/.*)
    # Multiple sites can be specified, e.g.
    # - .*example1.com
    # - .*example2.com
    # Default is "match all websites"
    instrumented: .*
    # URL placed into the <base> tag in the HTML
    base-path: /zipkin

# We are using Armeria instead of Tomcat. Have it inherit the default configuration from Spring
spring.main.web-application-type: none
# These defaults are not used directly. They are used via armeria namespacing
server:
  port: ${QUERY_PORT:9411}
  use-forward-headers: true
  compression:
    enabled: true
    # compresses any response over min-response-size (default is 2KiB)
    # Includes dynamic json content and large static assets from zipkin-ui
    mime-types: application/json,application/javascript,text/css,image/svg
    min-response-size: 2048

armeria:
  ports:
    - port: ${server.port}
      protocols:
        - http
  compression:
    enabled: ${server.compression.enabled}
    mime-types: ${server.compression.mime-types}
    min-response-size: ${server.compression.min-response-size}
  gracefulShutdownQuietPeriodMillis: -1
  gracefulShutdownTimeoutMillis: -1

spring:
  jmx:
     # reduce startup time by excluding unexposed JMX service
     enabled: false
  mvc:
    favicon:
      # zipkin has its own favicon
      enabled: false
  autoconfigure:
    # NOTE: These exclusions can drift between Spring Boot minor versions. Audit accordingly.
    # Ex. curl -s localhost:9411/actuator/beans|jq '.contexts.application.beans|keys_unsorted[]'|sort
    exclude:
      # JMX is disabled
      - org.springframework.boot.actuate.autoconfigure.endpoint.jmx.JmxEndpointAutoConfiguration
      # /health and /actuator/health served directly by Armeria
      - org.springframework.boot.actuate.autoconfigure.health.HealthEndpointAutoConfiguration
      - org.springframework.boot.actuate.autoconfigure.health.HealthContributorAutoConfiguration
      # /info and /actuator/info served directly by Armeria (content is /info.json)
      - org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration
      - org.springframework.boot.actuate.autoconfigure.info.InfoContributorAutoConfiguration
      # /prometheus and /actuator/prometheus are served directly by Armeria
      - org.springframework.boot.actuate.autoconfigure.metrics.export.prometheus.PrometheusMetricsExportAutoConfiguration
      # Remove unused auto-configuration
      - org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration
      - org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration
      - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
      - org.springframework.boot.autoconfigure.jooq.JooqAutoConfiguration
      - org.springframework.boot.autoconfigure.jms.activemq.ActiveMQAutoConfiguration
      - org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration
      - org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration
logging:
  pattern:
    level: "%clr(%5p) %clr([%X{traceId}/%X{spanId}]){yellow}"
  level:
    # Hush MySQL related logs
    org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor: 'WARN'
    com.zaxxer.hikari.HikariDataSource: 'WARN'
    # Don't print driver version in console output
    com.datastax.oss.driver.internal.core.DefaultMavenCoordinates: 'WARN'
    # We exclude Geo codec and Graph extensions to keep size down
    com.datastax.oss.driver.internal.core.context.InternalDriverContext: 'WARN'
    # Use of native clocks in Cassandra is not insightful
    com.datastax.oss.driver.internal.core.time.Clock: 'WARN'
    # Unless it's serious we don't want to know
    com.linecorp.armeria: 'WARN'
    # # But allow to say it's ready to serve requests
    com.linecorp.armeria.server.Server: 'INFO'
    # kafka is quite chatty so we switch everything off by default
    org.apache.kafka: 'OFF'
#     # investigate /api/v2/dependencies
#     zipkin2.internal.DependencyLinker: 'DEBUG'
#     # log reason behind http collector dropped messages
#     zipkin2.server.ZipkinHttpCollector: 'DEBUG'
#     zipkin2.collector.kafka.KafkaCollector: 'DEBUG'
#     zipkin2.collector.rabbitmq.RabbitMQCollector: 'DEBUG'
#     zipkin2.collector.scribe.ScribeCollector: 'DEBUG'
management:
  endpoints:
    web:
      exposure:
        include: '*'
  # Below are served directly without actuator.
  endpoint:
    health:
      enabled: false
    prometheus:
      enabled: false
    info:
      enabled: false
# Disabling auto time http requests since it is added in ZipkinPrometheusMetricsConfiguration
# In Zipkin we use different naming for the http requests duration
  metrics:
    web:
      server:
        auto-time-requests: false
```

## SQL

```MySQL
--
-- Copyright 2015-2019 The OpenZipkin Authors
--
-- Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
-- in compliance with the License. You may obtain a copy of the License at
--
-- http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software distributed under the License
-- is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
-- or implied. See the License for the specific language governing permissions and limitations under
-- the License.
--
use zipkin;
-- show tables;
CREATE TABLE IF NOT EXISTS zipkin_spans (
  `trace_id_high` BIGINT NOT NULL DEFAULT 0 COMMENT 'If non zero, this means the trace uses 128 bit traceIds instead of 64 bit',
  `trace_id` BIGINT NOT NULL,
  `id` BIGINT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `remote_service_name` VARCHAR(255),
  `parent_id` BIGINT,
  `debug` BIT(1),
  `start_ts` BIGINT COMMENT 'Span.timestamp(): epoch micros used for endTs query and to implement TTL',
  `duration` BIGINT COMMENT 'Span.duration(): micros used for minDuration and maxDuration query',
  PRIMARY KEY (`trace_id_high`, `trace_id`, `id`)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED CHARACTER SET=utf8 COLLATE utf8_general_ci;

ALTER TABLE zipkin_spans ADD INDEX(`trace_id_high`, `trace_id`) COMMENT 'for getTracesByIds';
ALTER TABLE zipkin_spans ADD INDEX(`name`) COMMENT 'for getTraces and getSpanNames';
ALTER TABLE zipkin_spans ADD INDEX(`remote_service_name`) COMMENT 'for getTraces and getRemoteServiceNames';
ALTER TABLE zipkin_spans ADD INDEX(`start_ts`) COMMENT 'for getTraces ordering and range';

CREATE TABLE IF NOT EXISTS zipkin_annotations (
  `trace_id_high` BIGINT NOT NULL DEFAULT 0 COMMENT 'If non zero, this means the trace uses 128 bit traceIds instead of 64 bit',
  `trace_id` BIGINT NOT NULL COMMENT 'coincides with zipkin_spans.trace_id',
  `span_id` BIGINT NOT NULL COMMENT 'coincides with zipkin_spans.id',
  `a_key` VARCHAR(255) NOT NULL COMMENT 'BinaryAnnotation.key or Annotation.value if type == -1',
  `a_value` BLOB COMMENT 'BinaryAnnotation.value(), which must be smaller than 64KB',
  `a_type` INT NOT NULL COMMENT 'BinaryAnnotation.type() or -1 if Annotation',
  `a_timestamp` BIGINT COMMENT 'Used to implement TTL; Annotation.timestamp or zipkin_spans.timestamp',
  `endpoint_ipv4` INT COMMENT 'Null when Binary/Annotation.endpoint is null',
  `endpoint_ipv6` BINARY(16) COMMENT 'Null when Binary/Annotation.endpoint is null, or no IPv6 address',
  `endpoint_port` SMALLINT COMMENT 'Null when Binary/Annotation.endpoint is null',
  `endpoint_service_name` VARCHAR(255) COMMENT 'Null when Binary/Annotation.endpoint is null'
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED CHARACTER SET=utf8 COLLATE utf8_general_ci;

ALTER TABLE zipkin_annotations ADD UNIQUE KEY(`trace_id_high`, `trace_id`, `span_id`, `a_key`, `a_timestamp`) COMMENT 'Ignore insert on duplicate';
ALTER TABLE zipkin_annotations ADD INDEX(`trace_id_high`, `trace_id`, `span_id`) COMMENT 'for joining with zipkin_spans';
ALTER TABLE zipkin_annotations ADD INDEX(`trace_id_high`, `trace_id`) COMMENT 'for getTraces/ByIds';
ALTER TABLE zipkin_annotations ADD INDEX(`endpoint_service_name`) COMMENT 'for getTraces and getServiceNames';
ALTER TABLE zipkin_annotations ADD INDEX(`a_type`) COMMENT 'for getTraces and autocomplete values';
ALTER TABLE zipkin_annotations ADD INDEX(`a_key`) COMMENT 'for getTraces and autocomplete values';
ALTER TABLE zipkin_annotations ADD INDEX(`trace_id`, `span_id`, `a_key`) COMMENT 'for dependencies job';

CREATE TABLE IF NOT EXISTS zipkin_dependencies (
  `day` DATE NOT NULL,
  `parent` VARCHAR(255) NOT NULL,
  `child` VARCHAR(255) NOT NULL,
  `call_count` BIGINT,
  `error_count` BIGINT,
  PRIMARY KEY (`day`, `parent`, `child`)
) ENGINE=InnoDB ROW_FORMAT=COMPRESSED CHARACTER SET=utf8 COLLATE utf8_general_ci;






select * from zipkin_annotations 
select * from zipkin_dependencies
select * from zipkin_spans

-- show tables

```

## Data Model

```json
[
    {
      "traceId": "5982fe77008310cc80f1da5e10147517",
      "name": "get",
      "id": "bd7a977555f6b982",
      "timestamp": 1458702548467000,
      "duration": 386000,
      "localEndpoint": {
        "serviceName": "zipkin-query",
        "ipv4": "192.168.1.2",
        "port": 9411
      },
      "annotations": [
        {
          "timestamp": 1458702548467000,
          "value": "sr"
        },
        {
          "timestamp": 1458702548853000,
          "value": "ss"
        }
      ]
    },
    {
      "traceId": "5982fe77008310cc80f1da5e10147517",
      "name": "get-traces",
      "id": "ebf33e1a81dc6f71",
      "parentId": "bd7a977555f6b982",
      "timestamp": 1458702548478000,
      "duration": 354374,
      "localEndpoint": {
        "serviceName": "zipkin-query",
        "ipv4": "192.168.1.2",
        "port": 9411
      },
      "tags": {
        "lc": "JDBCSpanStore",
        "request": "QueryRequest{serviceName=zipkin-query, spanName=null, annotations=[], binaryAnnotations={}, minDuration=null, maxDuration=null, endTs=1458702548478, lookback=86400000, limit=1}"
      }
    },
    {
      "traceId": "5982fe77008310cc80f1da5e10147517",
      "name": "query",
      "id": "be2d01e33cc78d97",
      "parentId": "ebf33e1a81dc6f71",
      "timestamp": 1458702548786000,
      "duration": 13000,
      "localEndpoint": {
        "serviceName": "zipkin-query",
        "ipv4": "192.168.1.2",
        "port": 9411
      },
      "remoteEndpoint": {
        "serviceName": "spanstore-jdbc",
        "ipv4": "127.0.0.1",
        "port": 3306
      },
      "annotations": [
        {
          "timestamp": 1458702548786000,
          "value": "cs"
        },
        {
          "timestamp": 1458702548799000,
          "value": "cr"
        }
      ],
      "tags": {
        "jdbc.query": "select distinct `zipkin_spans`.`trace_id` from `zipkin_spans` join `zipkin_annotations` on (`zipkin_spans`.`trace_id` = `zipkin_annotations`.`trace_id` and `zipkin_spans`.`id` = `zipkin_annotations`.`span_id`) where (`zipkin_annotations`.`endpoint_service_name` = ? and `zipkin_spans`.`start_ts` between ? and ?) order by `zipkin_spans`.`start_ts` desc limit ?",
        "sa": "true"
      }
    },
    {
      "traceId": "5982fe77008310cc80f1da5e10147517",
      "name": "query",
      "id": "13038c5fee5a2f2e",
      "parentId": "ebf33e1a81dc6f71",
      "timestamp": 1458702548817000,
      "duration": 1000,
      "localEndpoint": {
        "serviceName": "zipkin-query",
        "ipv4": "192.168.1.2",
        "port": 9411
      },
      "remoteEndpoint": {
        "serviceName": "spanstore-jdbc",
        "ipv4": "127.0.0.1",
        "port": 3306
      },
      "annotations": [
        {
          "timestamp": 1458702548817000,
          "value": "cs"
        },
        {
          "timestamp": 1458702548818000,
          "value": "cr"
        }
      ],
      "tags": {
        "jdbc.query": "select `zipkin_spans`.`trace_id`, `zipkin_spans`.`id`, `zipkin_spans`.`name`, `zipkin_spans`.`parent_id`, `zipkin_spans`.`debug`, `zipkin_spans`.`start_ts`, `zipkin_spans`.`duration` from `zipkin_spans` where `zipkin_spans`.`trace_id` in (?)",
        "sa": "true"
      }
    },
    {
      "traceId": "5982fe77008310cc80f1da5e10147517",
      "name": "query",
      "id": "37ee55f3d3a94336",
      "parentId": "ebf33e1a81dc6f71",
      "timestamp": 1458702548827000,
      "duration": 2000,
      "localEndpoint": {
        "serviceName": "zipkin-query",
        "ipv4": "192.168.1.2",
        "port": 9411
      },
      "remoteEndpoint": {
        "serviceName": "spanstore-jdbc",
        "ipv4": "127.0.0.1",
        "port": 3306
      },
      "annotations": [
        {
          "timestamp": 1458702548827000,
          "value": "cs"
        },
        {
          "timestamp": 1458702548829000,
          "value": "cr"
        }
      ],
      "tags": {
        "jdbc.query": "select `zipkin_annotations`.`trace_id`, `zipkin_annotations`.`span_id`, `zipkin_annotations`.`a_key`, `zipkin_annotations`.`a_value`, `zipkin_annotations`.`a_type`, `zipkin_annotations`.`a_timestamp`, `zipkin_annotations`.`endpoint_ipv4`, `zipkin_annotations`.`endpoint_port`, `zipkin_annotations`.`endpoint_service_name` from `zipkin_annotations` where `zipkin_annotations`.`trace_id` in (?) order by `zipkin_annotations`.`a_timestamp` asc, `zipkin_annotations`.`a_key` asc",
        "sa": "true"
      }
    }
  ]
```

## 



# 番外篇

## 搭建Zipkin Server

不推荐

```xml-dtd
<dependency>
    <groupId>io.zipkin.java</groupId>
    <artifactId>zipkin-server</artifactId>
	<!-- 此处会与springboot 日志 组件冲突-->
    <exclusions>
        <exclusion>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-slf4j-impl</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>io.zipkin.java</groupId>
    <artifactId>zipkin-autoconfigure-ui</artifactId>
</dependency>
```

## Client-简单使用

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

### yaml

```xml
zipkin:
  base-url: http://localhost:10085
```

### 
