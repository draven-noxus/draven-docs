# SpringCloudAlibaba

## 版本锁定

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.1.0.RELEASE</version>
</parent>

<properties>
    <cloud.version>Greenwich.RELEASE</mycloudsql.version>
</properties>

<dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>${cloud.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
</dependencyManagement>
```



# Spring Cloud Config

#### pom.xml

```xml
<dependencies>
   <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-config-server</artifactId>
   </dependency>
   <dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
	 </dependency>
   <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-bus-amqp</artifactId>
   </dependency>
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-web</artifactId>
    <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-actuator</artifactId>
     </dependency>
   </dependency>
</dependencies>

<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>              		<mainClass>com.noxus.draven.eureka.ConfigServerApplication</mainClass>
      </configuration>
		</plugin>
	</plugins>
</build>
```

#### 启动类

```java
@EnableConfigServer
@SpringBootApplication
@EnableDiscoveryClient
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}

```

#### bootstrap.yaml

```yaml
server:
  port: 8888
spring:
  application:
    name: config-server
  profiles:
    active: dev
  cloud:
    config:
      server:
        git:
          uri: https://github.com/the-glorious-executione-noxus/draven-projects.git
          search-paths: /tensquare_parent/tensquare_config/src/main/resources/config/
          username: xxxx@qq.com
          password: xxxx
          force-pull: true
    bus:
      # 开启消息跟踪
      enabled: true
      trace:
        enabled: true

  #  cloud:
  #    config:
  #      server:
  #        native:
  #          search-locations: classpath:/config


  rabbitmq:                    #本地环境不需要配置mq，但是需要启动mq,Springboot会自动连接本地mq
    host: 172.16.244.128
    port: 5672
    username: guest
    password: guest
eureka:
  client:
    service-url:
      defaultZone: http://localhost:6868/eureka/
  instance:
    lease-expiration-duration-in-seconds: 30 # 续约到期时间（默认90秒）
    lease-renewal-interval-in-seconds: 10    # 续约更新时间间隔（默认30秒）
    hostname: ${spring.application.name}
    instance-id: ${spring.application.name}:${server.port} # 服务列表显示列表
    prefer-ip-address: true  # 服务列表显示列表 显示ip
    # statusPageUrl: http://${eureka.hostname}/actuator/
    #healthCheckUrl: http://${eureka.instance.hostname}/actuator/health
    #homePageUrl: http://${eureka.instance.hostname}/actuator
# 端点暴露
management:
  endpoints:
    web:
      exposure:
        include: '*'
```



# Spring-cloud-netflix

## Eureka

### Server

#### pom.xml

```xml
<dependencies>
	 <dependency>
		<groupId>org.springframework.cloud</groupId>
		<artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
	 </dependency>
   <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-config</artifactId>
   </dependency>
   <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-bus-amqp</artifactId>
   </dependency>
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-web</artifactId>
    <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-actuator</artifactId>
     </dependency>
   </dependency>
</dependencies>

<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>              		<mainClass>com.noxus.draven.eureka.EurekaServerApplication</mainClass>
      </configuration>
		</plugin>
	</plugins>
</build>
```

#### 启动类

```java
@SpringBootApplication
@EnableEurekaServer
@EnableDiscoveryClient
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

```

#### bootstrap.yaml

```yaml
spring:
  profiles:
    active: dev
  cloud:
    config:
      profile: dev
      label: master
      url: http://localhost:8888
      name: eureka-server
    bus:
      enabled: true
      trace:
        enabled: true
```

#### eureka-server-dev.yaml

```yaml
server:
  port: 8761 # 端口
spring:
  application:
    name: eureka-server # 应用名称，会在Eureka中显示
  rabbitmq:  #本地环境不需要配置mq，但是需要启动mq,Springboot会自动连接本地mq
    host: 172.16.244.128
    port: 5672
    username: guest
    password: guest
eureka:
  instance:
    hostname: www.eureka.com     # eureka服务端的实例名称
  server:
    enable-self-preservation: true #关闭自我保护 默认开启
    eviction-interval-timer-in-ms: 60000 #清理间隔
  client:
    register-with-eureka: false # 是否注册自己的信息到EurekaServer，默认是true
    fetch-registry: false # 是否拉取其它服务的信息，默认是true
    service-url: # EurekaServer的地址，现在是自己的地址，如果是集群，需要加上其它Server的地址。
    defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka
management:
  endpoints:
    web:
      exposure:
        include: '*'
```

### Client

#### pom.xml

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   </dependency>
    <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-config</artifactId>
   </dependency>
   <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-bus-amqp</artifactId>
   </dependency>
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
   <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
</dependencies>

<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>              		<mainClass>com.noxus.draven.eureka.EurekaclientApplication</mainClass>
      </configuration>
		</plugin>
	</plugins>
</build>
```

#### 启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class EurekaClientApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaClientApplication.class, args);
    }
}

```

#### bootstrap.yaml

```yaml
spring:
  profiles:
    active: dev
  cloud:
    config:
      profile: dev
      label: master
      url: http://localhost:8888
      name: eureka-client
    bus:
      enabled: true
      trace:
        enabled: true
```

#### eureka-client-dev.yaml

```yaml
server:
  port: 8081
spring:
 application:
    name: eureka-client # 应用名称
 rabbitmq:  #本地环境不需要配置mq，但是需要启动mq,Springboot会自动连接本地mq
    host: 172.16.244.128
    port: 5672
    username: guest
    password: guest  
eureka:
  client:
    service-url: # EurekaServer地址
      defaultZone: http://127.0.0.1:8761/eureka
    register-with-eureka: true # 将自己注册到服务端 默认true
    registry-fetch-interval-seconds: 5 #服务拉取间隔 默认为30秒
    healthcheck:
      enabled: true # 开启健康检查（依赖spring-boot-starter-actuator）
  instance:
    prefer-ip-address: true # 当调用getHostname获取实例的hostname时，返回ip而不是host名称
    lease-expiration-duration-in-seconds: 30 # 续约到期时间（默认90秒）
    lease-renewal-interval-in-seconds: 10    # 续约更新时间间隔（默认30秒）
    hostname: ${spring.application.name}
    instance-id: ${spring.application.name}:${server.port} #服务列表显示列表
    prefer-ip-address: true  # 服务列表显示列表 显示ip
    ip-address: 127.0.0.1 # 指定自己的ip信息，不指定的话会自己寻找
management:
  endpoints:
    web:
      exposure:
        include: '*'
```

## Zuul

#### pom.xml

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   </dependency>
    <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-config</artifactId>
   </dependency>
   <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-bus-amqp</artifactId>
   </dependency>
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
   <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
   </dependency>
</dependencies>

<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>              		<mainClass>com.noxus.draven.eureka.ZuulServerApplication</mainClass>
      </configuration>
		</plugin>
	</plugins>
</build>
```

#### 启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class ZuulServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZuulServerApplication.class, args);
    }
}

```

#### bootstrap.yaml

```yaml
spring:
  profiles:
    active: dev
  cloud:
    config:
      profile: dev
      label: master
      url: http://localhost:8888
      name: eureka-client
    bus:
      enabled: true
      trace:
        enabled: true
```

#### zuul-server-dev.yaml

```yaml
server:
  port: 8080
spring:
 application:
    name: config-server # 应用名称
 rabbitmq:  #本地环境不需要配置mq，但是需要启动mq,Springboot会自动连接本地mq
    host: 172.16.244.128
    port: 5672
    username: guest
    password: guest  
eureka:
  client:
    service-url: # EurekaServer地址
      defaultZone: http://127.0.0.1:8761/eureka
    register-with-eureka: true # 将自己注册到服务端 默认true
    registry-fetch-interval-seconds: 5 #服务拉取间隔 默认为30秒
    healthcheck:
      enabled: true # 开启健康检查（依赖spring-boot-starter-actuator）
  instance:
    prefer-ip-address: true # 当调用getHostname获取实例的hostname时，返回ip而不是host名称
    lease-expiration-duration-in-seconds: 30 # 续约到期时间（默认90秒）
    lease-renewal-interval-in-seconds: 10    # 续约更新时间间隔（默认30秒）
    hostname: ${spring.application.name}
    instance-id: ${spring.application.name}:${server.port} #服务列表显示列表
    prefer-ip-address: true  # 服务列表显示列表 显示ip
    ip-address: 127.0.0.1 # 指定自己的ip信息，不指定的话会自己寻找
management:
  endpoints:
    web:
      exposure:
        include: '*'
zuul:
  routes:
    eureka-client: #服务名
      path: /client/** #配置请求URL的请求规则
      serviceId: eureka-client #指定Eureka注册中心中的服务id
    eureka-client: #服务名 配置多个
      path: /client/** #配置请求URL的请求规则
      serviceId: eureka-client #指定Eureka注册中心中的服务id
```

## 