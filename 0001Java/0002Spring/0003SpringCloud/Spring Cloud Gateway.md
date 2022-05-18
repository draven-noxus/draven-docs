# SpringCloud Gateway

## 版本锁定

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.1.0.RELEASE</version>
</parent>

<properties>
    <cloud.version>Hoxson.RELEASE</mycloudsql.version>
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



# Spring Cloud Gateway

## pom.xml

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
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
      <configuration>              		<mainClass>com.noxus.draven.eureka.GatewayServerApplication</mainClass>
      </configuration>
		</plugin>
	</plugins>
</build>
```

## 启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class GatewayServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayServerApplication.class, args);
    }
}

```

## 属性配置

### bootstrap.yaml/Application.yaml

```yaml
server:
  port: 8090
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
    gateway:
      routes:
        - id: nacos-consumer
          uri: lb://nacos-consumer # 负载均衡
          predicates:
            - Path=/consumer/**
          filters: # 下面配置使用了路径重写 demo
            - RewritePath=/consumer/(?<segment>.*),/$\{segment}
        - id: nacos-provider
          uri: lb://nacos-provider
          predicates:
            - Path=/provider/**
          filters:
            - RewritePath=/provider/(?<segment>.*),/$\{segment}
```

## Java配置

略 不常用

# 介绍

## Route Predicate Factories

https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/

## GatewayFilter Factories

## Global Filters