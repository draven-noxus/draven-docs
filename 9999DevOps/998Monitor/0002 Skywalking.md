# Skywalking

## 资料信息

```shell
# Agent 与 Server是不同的
# 1.官网：
http://skywalking.apache.org/

# 2.参考资料：

# 2.1 镜像资料：
https://hub.docker.com/r/apache/skywalking-oap-server

# 3.下载链接：
https://skywalking.apache.org/downloads/

# 4.Demo:
https://www.apache.org/dyn/closer.cgi/skywalking/8.0.0/apache-skywalking-apm-8.0.0.tar.gz

# 5.其他资料：
https://skywalking.apache.org/docs/skywalking-showcase/latest/readme/
```

# Update



```shell
# 更新至最新版
# https://www.apache.org/dyn/closer.cgi/skywalking/8.9.1/apache-skywalking-apm-8.9.1.tar.gz
```





## 什么是链路追踪

## 什么是skywalking

​	SkyWalking 是观察性分析平台和应用性能管理系统，提供分布式追踪、服务网格遥测分析、度量聚合和可视化一体化解决方案。

​	目前主要的一些 APM 工具有: Cat、Zipkin、Pinpoint、SkyWalking；Apache SkyWalking 是观察性分析平台和应用性能管理系统。提供分布式追踪、服务网格遥测分析、度量聚合和可视化一体化解决方案。

![Skywalking-01](./images/skywalking-old.png)

![Skywalking-01](./images/skywalking-new.png)

![Skywalking-01](./images/skywalking-8.9.1.png)

- **Skywalking Agent：** 使用 JavaAgent 做字节码植入，无侵入式的收集，并通过 HTTP 或者 gRPC 方式发送数据到 SkyWalking Collector。

- **SkyWalking Collector：** 链路数据收集器，对 agent 传过来的数据进行整合分析处理并落入相关的数据存储中。

- **Storage：** SkyWalking 的存储，时间更迭，SW 已经开发迭代到了 6.x 版本，在 6.x 版本中支持以 ElasticSearch(支持 6.x)、Mysql、TiDB、H2、作为存储介质进行数据存储。

- **UI：** Web 可视化平台，用来展示落地的数据。

  

## SkyWalking 功能特性

- 多种监控手段，语言探针和服务网格(Service Mesh)
- 支持Java, .Net Core, PHP, NodeJS, Golang, LUA语言探针，支持Envoy + Istio构建的Service Mesh
- 轻量高效，不需要大数据
- 模块化，UI、存储、集群管理多种机制可选
- 支持告警
- 优秀的可视化方案

## 检测指标

- 服务可用性指标 SLA
- 每分钟平均响应数
- 平均响应时间
- 服务进程 PID
- 服务所在物理机的 IP、Host、OS
- 运行时 CPU 使用率
- 运行时堆内存使用率
- 运行时非堆内存使用率
- GC 情况
- ...

# 服务端

## 环境搭建

```shell
# 获取服务包
http://skywalking.apache.org/zh/downloads/
https://www.apache.org/dyn/closer.cgi/skywalking/8.0.0/apache-skywalking-apm-8.0.0.tar.gz
```

### 使用Elasticsearch

```yaml
# '9200'端口号为SkyWalking配置ElasticSearch所需端口号，
# 'cluster.name'为SkyWalking配置ElasticSearch 集群的名称
version: '3.3'
services:
  elasticsearch:
    # 此处选择自己的镜像（建议找官方的）
    image: wutang/elasticsearch-shanghai-zone:6.3.2
    container_name: elasticsearch
    restart: always
    ports:
      - 9200:9200
      - 9300:9300
    environment:
      cluster.name: elasticsearch
```

```shell
# 测试 elasticsearch
http://elasticsearchIP:9200/ 
```

```shell
# 修改一系列配置接入Elasticsearch
# apache-skywalking-apm-incubating/config/application.yml

# 注释H2存储方案
# 启用Elasticsearch存储方案
# 修改 ElasticSearch 服务器地址
```

```shell
# 启动 SkyWalking 运行 `startup.bat` `startup.sht`
apache-skywalking-apm-incubating\bin

# 通过浏览器访问 启动成功
http://localhost:8080 
```



### 使用内存数据库

```shell
# 直接启动即可
# 注释 H2 存储方案
# 启用 ElasticSearch 存储方案
# 修改 ElasticSearch 服务器地址
```



# 客户端

## 三种部署方式

https://github.com/apache/skywalking/blob/master/docs/en/setup/service-agent/java-agent/README.md

```shell
# 配置探针 copy以下全部文件到idea指定位置
apache-skywalking-apm-incubating/agent

```

### Idea配置

```shell
# 注意此处的路径

# `-javaagent`：用于指定探针路径
# `-Dskywalking.agent.service_name`：用于重写 `agent/config/agent.config` 配置文件中的服务名
# `-Dskywalking.collector.backend_service`：用于重写 `agent/config/agent.config` 配置文件中的服务地址

-javaagent:/Users/draven/Documents/documents/java/document/draven-spring/draven-spring-cloud-alibaba/draven-spring-cloud-alibaba-greenwich/noxus-draven-alibaba-greenwich-skywalking/agent/skywalking-agent.jar -Dskywalking.agent.service_name=alibaba-consumer
-Dskywalking.collector.backend_service=localhost:11800
```

### Java启动方式

```shell
java -javaagent:/path/to/skywalking-agent/skywalking-agent.jar -Dskywalking.agent.service_name=nacos-provider -Dskywalking.collector.backend_service=localhost:11800 -jar yourApp.jar
```

## Docker部署

### Assembly

```shell
# Assembly 插件目的是提供一个把工程依赖元素、模块、网站文档等其他文件存放到单个归档文件里

# 支持文件 
  # zip、tar.gz、tar.bz2、jar、dir、war
# 项目构建为maven项目
```

#### maven插件

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-assembly-plugin</artifactId>
            <executions>
                <!-- 配置执行器 -->
                <execution>
                    <id>make-assembly</id>
                    <!-- 绑定到 package 生命周期阶段上 -->
                    <phase>package</phase>
                    <goals>
                        <!-- 只运行一次 -->
                        <goal>single</goal>
                    </goals>
                    <configuration>
                        <finalName>skywalking</finalName>
                        <descriptors>
                            <!-- 配置描述文件路径 -->
                            <descriptor>src/main/resources/assembly.xml</descriptor>
                        </descriptors>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

#### assembly.xml

```shell
# Assembly 插件目的是提供一个把工程依赖元素、模块、网站文档等其他文件存放到单个归档文件里。
# 新建文件
src/main/resources/assembly.xml
```



```xml
<assembly>
    <id>6.0.0-Beta</id>
    <formats>
        <!-- 打包的文件格式，支持 zip、tar.gz、tar.bz2、jar、dir、war -->
        <format>tar.gz</format>
    </formats>
    <!-- tar.gz 压缩包下是否生成和项目名相同的根目录，有需要请设置成 true -->
    <includeBaseDirectory>false</includeBaseDirectory>
    <dependencySets>
        <dependencySet>
            <!-- 是否把本项目添加到依赖文件夹下，有需要请设置成 true -->
            <useProjectArtifact>false</useProjectArtifact>
            <outputDirectory>lib</outputDirectory>
            <!-- 将 scope 为 runtime 的依赖包打包 -->
            <scope>runtime</scope>
        </dependencySet>
    </dependencySets>
    <fileSets>
        <fileSet>
            <!-- 设置需要打包的文件路径 -->
            <directory>agent</directory>
            <!-- 打包后的输出路径 没有值为当前目录-->
            <outputDirectory></outputDirectory>
        </fileSet>
    </fileSets>
</assembly>
```

#### mvn构建

```shell
$ mvn clean package
$ mvn clean install

# package：会在 target 目录下创建名为 `skywalking-6.0.0-Beta.tar.gz` 的压缩包
# install：会在本地仓库目录下创建名为 `hello-spring-cloud-external-skywalking-1.0.0-SNAPSHOT-6.0.0-Beta.tar.gz` 的压缩包
```

### Agent镜像

#### JDK

```dockerfile
FROM openjdk:8-jdk-alpine
ENV LANG=C.UTF-8
RUN  mkdir -p /usr/skywalking/agent/
# A streamlined jre
ADD apache-skywalking-apm-bin-es7/agent/ /usr/skywalking/agent/
# set env
# 此处可以设置JDK环境变量JAVA_HOMEs
# run container with base path:/
WORKDIR /
CMD bash
```

#### 最小镜像

```dockerfile
# 可以从私有仓库中获取
FROM 10.58.239.195/bn-dev/busybox:latest
ENV LANG=C.UTF-8
RUN set -eux && mkdir -p /usr/skywalking/agent/
ADD ./skywalking/agent/ /usr/skywalking/agent/
WORKDIR /
docker build -t skywalking-agent-sidecar:8.2.0 .

# dockerhub
FROM busybox:latest
ENV LANG=C.UTF-8
RUN set -eux && mkdir -p /usr/skywalking/agent
add apache-skywalking-apm-bin-es7/agent /usr/skywalking/agent
WORKDIR /
```

# Docker部署

## skywalking-oap-server

```shell
# 使用es作为数据存储
docker run --name oap --restart always -d \
# 由于是个人电脑 不推荐开机启动N多个容器
--restart=always \
-e TZ=Asia/Shanghai \
-p 12800:12800 \
-p 11800:11800 \
--link es7:es7 \
-e SW_STORAGE=elasticsearch \
-e SW_STORAGE_ES_CLUSTER_NODES=es7:9200 \
apache/skywalking-oap-server:8.4.0-es7

# 使用mysql作为数据存储
docker run --name oap  -d \
-e TZ=Asia/Shanghai \
-p 12800:12800 \
-p 11800:11800 \
-e SW_STORAGE=mysql \
-e SW_JDBC_URL=jdbc:mysql://10.211.55.5:3306/swdb \
-e SW_DATA_SOURCE_USER=root \
-e SW_DATA_SOURCE_PASSWORD=root \
apache/skywalking-oap-server:8.4.0-es7

# 默认不包含mysql驱动，此处可以直接使用tar包构建 也可以使用高版本驱动 但是请注意jdbcUrl配置
docker cp mysql-connector-java-5.1.49.jar oap:/skywalking/oap-libs/
```

## apache/skywalking-ui

```shell
# demo
docker run -d --name skywalking-ui \
--restart=always \
-e TZ=Asia/Shanghai \
-p 8088:8080 \
# 链接至collector服务
--link oap:oap \
-e SW_OAP_ADDRESS=oap:12800 \
apache/skywalking-ui:8.4.0


docker run -d --name skywalking-ui \
-e TZ=Asia/Shanghai \
-p 8088:8080 \
--link oap:oap \
-e SW_OAP_ADDRESS=oap:12800 \
apache/skywalking-ui:8.4.0
```



# Linux部署

## 单机部署

```shell
# 下载安装包
$ wget https://www.apache.org/dyn/closer.cgi/skywalking/8.9.1/apache-skywalking-apm-8.9.1.tar.gz

# 解压安装包
tar -zxvf https://www.apache.org/dyn/closer.cgi/skywalking/8.9.1/apache-skywalking-apm-8.9.1.tar.gz

# 更改名称
$ mv apache-skywalking-apm-bin apache-skywalking

# 编辑配置文件
$ vim apache-skywalking/conf/application.yml

# 修改UI界面端口
$ vim apache-skywalking/webapp/webapp.yml

# 分别启动 oap-server 以及 webapp
$ ./apache-skywalking/startup.sh
$ ./apache-skywalking/bin/oapService.sh
$ ./apache-skywalking/bin/webappService.sh

```

## 集群部署

```shell
# 获取文件
# 见《单机部署》


$ mv apache-skywalking-apm-bin skywalkingNode1
$ mv apache-skywalking-apm-bin skywalkingNode2
$ mv apache-skywalking-apm-bin skywalkingNode3

$ vim apache-skywalking/webapp/webapp.yml
# 《见 下webapp.yml》

# agent配置
SW_AGENT_COLLECTOR_BACKEND_SERVICES=ip1:port1,ip2:port2,ip3:port3

# 启动 可nginx代理
./skywalkingNode1/startup.sh
./skywalkingNode2/startup.sh
./skywalkingNode3/startup.sh

```

### Nacos

```yaml
# 资料
# https://skywalking.apache.org/docs/main/v8.9.1/en/setup/backend/dynamic-config/

# vim apache-skywalking/conf/application.yml

# 注册
cluster:
  selector: ${SW_CLUSTER:nacos}
  nacos:
    serviceName: ${SW_SERVICE_NAME:"SkyWalking_OAP_Cluster"}
    hostPort: ${SW_CLUSTER_NACOS_HOST_PORT:localhost:8848}
    # Nacos Configuration namespace
    namespace: ${SW_CLUSTER_NACOS_NAMESPACE:"public"}
    # Nacos auth username
    username: ${SW_CLUSTER_NACOS_USERNAME:""}
    password: ${SW_CLUSTER_NACOS_PASSWORD:""}
    # Nacos auth accessKey
    accessKey: ${SW_CLUSTER_NACOS_ACCESSKEY:""}
    secretKey: ${SW_CLUSTER_NACOS_SECRETKEY:""}
    
# 配置
configuration:
  selector: ${SW_CONFIGURATION:nacos}
  nacos:
  # Nacos Server Host
  serverAddr: ${SW_CONFIG_NACOS_SERVER_ADDR:127.0.0.1}
  # Nacos Server Port
  port: ${SW_CONFIG_NACOS_SERVER_PORT:8848}
  # Nacos Configuration Group
  group: ${SW_CONFIG_NACOS_SERVER_GROUP:skywalking}
  # Nacos Configuration namespace
  namespace: ${SW_CONFIG_NACOS_SERVER_NAMESPACE:}
  # Unit seconds, sync period. Default fetch every 60 seconds.
  period: ${SW_CONFIG_NACOS_PERIOD:60}
  # Nacos auth username
  username: ${SW_CONFIG_NACOS_USERNAME:""}
  password: ${SW_CONFIG_NACOS_PASSWORD:""}
  # Nacos auth accessKey
  accessKey: ${SW_CONFIG_NACOS_ACCESSKEY:""}
  secretKey: ${SW_CONFIG_NACOS_SECRETKEY:""}


```

| Config Key                                          | Value Description                                            | Value Format Example                                         |
| --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| agent-analyzer.default.slowDBAccessThreshold        | Thresholds of slow Database statement. Overrides `receiver-trace/default/slowDBAccessThreshold`of `application.yml`. | default:200,mongodb:50                                       |
| agent-analyzer.default.uninstrumentedGateways       | The uninstrumented gateways. Overrides `gateways.yml`.       | Same as [`gateways.yml`](https://skywalking.apache.org/docs/main/v8.9.1/en/setup/backend/uninstrumented-gateways#configuration-format). |
| alarm.default.alarm-settings                        | The alarm settings. Overrides `alarm-settings.yml`.          | Same as [`alarm-settings.yml`](https://skywalking.apache.org/docs/main/v8.9.1/en/setup/backend/backend-alarm). |
| core.default.apdexThreshold                         | The apdex threshold settings. Overrides `service-apdex-threshold.yml`. | Same as [`service-apdex-threshold.yml`](https://skywalking.apache.org/docs/main/v8.9.1/en/setup/backend/apdex-threshold). |
| core.default.endpoint-name-grouping                 | The endpoint name grouping setting. Overrides `endpoint-name-grouping.yml`. | Same as [`endpoint-name-grouping.yml`](https://skywalking.apache.org/docs/main/v8.9.1/en/setup/backend/endpoint-grouping-rules). |
| core.default.log4j-xml                              | The log4j xml configuration. Overrides `log4j2.xml`.         | Same as [`log4j2.xml`](https://skywalking.apache.org/docs/main/v8.9.1/en/setup/backend/dynamical-logging). |
| agent-analyzer.default.traceSamplingPolicy          | The sampling policy for default and service dimension, override `trace-sampling-policy-settings.yml`. | same as [`trace-sampling-policy-settings.yml`](https://skywalking.apache.org/docs/main/v8.9.1/en/setup/backend/trace-sampling) |
| configuration-discovery.default.agentConfigurations | The ConfigurationDiscovery settings.                         | See [`configuration-discovery.md`](https://github.com/apache/skywalking-java/blob/20fb8c81b3da76ba6628d34c12d23d3d45c973ef/docs/en/setup/service-agent/java-agent/configuration-discovery.md). |



### webapp.yml

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: oap-route
          uri: lb://oap-service
          predicates:
            - Path=/graphql/**
    discovery:
      client:
        simple:
          instances:
            oap-service:
              - uri: http://127.0.0.1:12801
              - uri: http://127.0.0.1:12802
              - uri: http://127.0.0.1:12803
```



# 关于Agent介绍

```shell
tar -zxvf apache-skywalking-apm-7.0.0.tar.gz -C / # 自己指定目录

cd apache-skywalking-apm-bin/agent/
   skywalking-agent.jar # 探针jar
   
config
   agent.conf # 探针配置
   
plugins/
optional-plugins/
	# 插件信息

cd apache-skywalking-apm-bin/

bin
	startup.sh  #	启动脚本

config
	application.yml # 主配置文件
	
cd apache-skywalking-apm-bin/

webapp
	skywalking-webapp.jar # UI界面
	webapp.yml # UI配置
```

# 应用测试

```dockerfile
# 使用集成了agent的jre
FROM skywalking-jre:8.4.0
# 讲maven生成的jar制作镜像
COPY noxus-draven-alibaba-ilford-provider-Draven2020.0.jar  noxus-draven-alibaba-ilford-provider-Draven2020.0.jar
# 端口暴露
EXPOSE 10086
# 环境配置包括增加agent与运行命令
ENTRYPOINT java -javaagent:/usr/skywalking/agent/skywalking-agent.jar -Dskywalking.agent.service_name=alibaba-providers -Dskywalking.collector.backend_service=10.211.55.5:11800 -Dserver.port=10086 -jar noxus-draven-alibaba-ilford-provider-Draven2020.0.jar

# ENTRYPOINT ["java","-jar","app.jar"]
# ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-javaagent:/tmp/agent/skywalking-agent.jar","-jar","app.jar"]
```

# 告警功能



# 追踪功能

```xml
<dependency>
  <groupId>org.apache.skywalking</groupId>
  <artifactId>apm-toolkit-trace</artifactId>
  <version>{project.release.version}</version>
</dependency>
```

```java
@Trace
@Tag
```



# 日志功能

## 资料

```shell
# https://skywalking.apache.org/docs/main/v8.4.0/en/setup/service-agent/java-agent/application-toolkit-logback-1.x/

# https://skywalking.apache.org/docs/main/v8.4.0/en/setup/service-agent/java-agent/application-toolkit-log4j-1.x/

# https://skywalking.apache.org/docs/main/v8.4.0/en/setup/service-agent/java-agent/readme/#table-of-agent-configuration-properties
```

## 依赖

```xml-dtd
<dependency>
  <groupId>org.apache.skywalking</groupId>
  <artifactId>apm-toolkit-logback-1.x</artifactId>
  <version>{project.release.version}</version>
</dependency>
```

agent config

```properties
plugin.toolkit.log.grpc.reporter.server_host=${SW_GRPC_LOG_SERVER_HOST:127.0.0.1}
plugin.toolkit.log.grpc.reporter.server_port=${SW_GRPC_LOG_SERVER_PORT:11800}
plugin.toolkit.log.grpc.reporter.max_message_size=${SW_GRPC_LOG_MAX_MESSAGE_SIZE:10485760}
plugin.toolkit.log.grpc.reporter.upstream_timeout=${SW_GRPC_LOG_GRPC_UPSTREAM_TIMEOUT:30}

plugin.toolkit.log.transmit_formatted=false
```

```xml
<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
  <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
    <layout class="org.apache.skywalking.apm.toolkit.log.logback.v1.x.TraceIdPatternLogbackLayout">
      <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%tid] [%thread] %-5level %logger{36} -%msg%n</Pattern>
    </layout>
  </encoder>
</appender>

<appender name="grpc-log" class="org.apache.skywalking.apm.toolkit.log.logback.v1.x.log.GRPCLogClientAppender"/>
```



# 附录

## logback

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
        </filter>
        <encoder>
            <pattern>%date [%thread] %-5level [%logger{50}] %file:%line - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="org.apache.skywalking.apm.toolkit.log.logback.v1.x.TraceIdPatternLogbackLayout">
                <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%tid] [%thread] %-5level %logger{36} -%msg%n</Pattern>
            </layout>
        </encoder>
    </appender>

    <appender name="grpc-log" class="org.apache.skywalking.apm.toolkit.log.logback.v1.x.log.GRPCLogClientAppender"/>


    <appender name="FILE_INFO" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--如果只是想要 Info 级别的日志，只是过滤 info 还是会输出 Error 日志，因为 Error 的级别高， 所以我们使用下面的策略，可以避免输出 Error 的日志-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!--过滤 Error-->
            <level>ERROR</level>
            <!--匹配到就禁止-->
            <onMatch>DENY</onMatch>
            <!--没有匹配到就允许-->
            <onMismatch>ACCEPT</onMismatch>
        </filter>
        <!--日志名称，如果没有File 属性，那么只会使用FileNamePattern的文件路径规则如果同时有<File>和<FileNamePattern>，那么当天日志是<File>，明天会自动把今天的日志改名为今天的日期。即，<File> 的日志都是当天的。-->
        <!--<File>logs/info.spring-boot-demo-logback.log</File>-->
        <!--滚动策略，按照时间滚动 TimeBasedRollingPolicy-->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--文件路径,定义了日志的切分方式——把每一天的日志归档到一个文件中,以防止日志填满整个磁盘空间-->
            <FileNamePattern>logs/spring-boot-demo-logback/info.created_on_%d{yyyy-MM-dd}.part_%i.log</FileNamePattern>
            <!--只保留最近90天的日志-->
            <maxHistory>90</maxHistory>
            <!--用来指定日志文件的上限大小，那么到了这个值，就会删除旧的日志-->
            <!--<totalSizeCap>1GB</totalSizeCap>-->
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <!-- maxFileSize:这是活动文件的大小，默认值是10MB,本篇设置为1KB，只是为了演示 -->
                <maxFileSize>2MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <!--<triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">-->
        <!--<maxFileSize>1KB</maxFileSize>-->
        <!--</triggeringPolicy>-->
        <encoder>
            <pattern>%date [%thread] %-5level [%logger{50}] %file:%line - %msg%n</pattern>
            <charset>UTF-8</charset> <!-- 此处设置字符集 -->
        </encoder>
    </appender>

    <appender name="FILE_ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--如果只是想要 Error 级别的日志，那么需要过滤一下，默认是 info 级别的，ThresholdFilter-->
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>Error</level>
        </filter>
        <!--日志名称，如果没有File 属性，那么只会使用FileNamePattern的文件路径规则如果同时有<File>和<FileNamePattern>，那么当天日志是<File>，明天会自动把今天的日志改名为今天的日期。即，<File> 的日志都是当天的。-->
        <!--<File>logs/error.spring-boot-demo-logback.log</File>-->
        <!--滚动策略，按照时间滚动 TimeBasedRollingPolicy-->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--文件路径,定义了日志的切分方式——把每一天的日志归档到一个文件中,以防止日志填满整个磁盘空间-->
            <FileNamePattern>logs/spring-boot-demo-logback/error.created_on_%d{yyyy-MM-dd}.part_%i.log</FileNamePattern>
            <!--只保留最近90天的日志-->
            <maxHistory>90</maxHistory>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <!-- maxFileSize:这是活动文件的大小，默认值是10MB,本篇设置为1KB，只是为了演示 -->
                <maxFileSize>2MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <encoder>
            <pattern>%date [%thread] %-5level [%logger{50}] %file:%line - %msg%n</pattern>
            <charset>UTF-8</charset> <!-- 此处设置字符集 -->
        </encoder>
    </appender>




    <!--    <appender name="prodEMAIL" class="ch.qos.logback.classic.net.SMTPAppender">
            <smtpHost>smtp.163.com</smtpHost>
            <smtpPort>25</smtpPort>
            <to>18335927508@163.com</to>
            <from>18335927508@163.com</from>
            <subject>[ORDER-UAT]ERROR: %logger{20} - %m</subject>
            <username>18335927508@163.com</username>
            <password>xxxx</password>
            <SSL>false</SSL>
            <charsetEncoding>utf-8</charsetEncoding>
            <layout class="ch.qos.logback.classic.PatternLayout">
                <pattern>%date %-5level %logger{35} - %message%n</pattern>
            </layout>
            &lt;!&ndash; 这里采用等级过滤器 指定等级相符才发送 &ndash;&gt;
            <filter class="ch.qos.logback.classic.filter.LevelFilter">
                <level>ERROR</level>
                <onMatch>ACCEPT</onMatch>
                <onMismatch>DENY</onMismatch>
            </filter>
        </appender>-->


    <!--    <appender name="prodEMAIL" class="ch.qos.logback.classic.net.SMTPAppender">-->
    <!--        <smtpHost>smtp.email.qq.com</smtpHost>-->
    <!--        <smtpPort>465</smtpPort>-->
    <!--        <to>18335927508@163.com</to>-->
    <!--        <from>1064517852@qq.com</from>-->
    <!--        <subject>[ORDER-UAT]ERROR: %logger{20} - %m</subject>-->
    <!--        <username>1064517852@qq.com</username>-->
    <!--        <password>xxxx</password>-->
    <!--        <SSL>true</SSL>-->
    <!--        <charsetEncoding>utf-8</charsetEncoding>-->
    <!--        <layout class="ch.qos.logback.classic.PatternLayout">-->
    <!--            <pattern>%date %-5level %logger{35} - %message%n</pattern>-->
    <!--        </layout>-->
    <!--        &lt;!&ndash; 这里采用等级过滤器 指定等级相符才发送 &ndash;&gt;-->
    <!--        <filter class="ch.qos.logback.classic.filter.LevelFilter">-->
    <!--            <level>ERROR</level>-->
    <!--            <onMatch>ACCEPT</onMatch>-->
    <!--            <onMismatch>DENY</onMismatch>-->
    <!--        </filter>-->
    <!--    </appender>-->



    <root level="info">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE_INFO"/>
        <appender-ref ref="FILE_ERROR"/>
        <!--        <appender-ref ref="prodEMAIL"/>-->
        <appender-ref ref="grpc-log" />
    </root>

<!--    <root level="info">
        <appender-ref ref="grpc-log" />
    </root>-->
</configuration>

```

```java

```

