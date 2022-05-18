# 服务发现

Eureka

Consul

Zookeeper

## Eureka(注册中心)

注

- 这里我们添加了spring.application.name属性来指定应用名称，将来会作为应用的id使用。
- 不用指定register-with-eureka和fetch-registry，因为默认是true

### 单机版<服务端>

#### 依赖<服务端>

	<?xml version="1.0" encoding="UTF-8"?>
	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.leyou.demo</groupId>
	<artifactId>eureka-demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>
	
	<name>eureka-demo</name>
	<description>Demo project for Spring Boot</description>
	
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.0.1.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<java.version>1.8</java.version>
	    <!-- SpringCloud版本，是最新的F系列 -->
		<spring-cloud.version>Finchley.RC1</spring-cloud.version>
	</properties>
	
	<dependencies>
	    <!-- Eureka服务端 -->
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
		</dependency>
	</dependencies>
	
	<dependencyManagement>
		<dependencies>
	        <!-- SpringCloud依赖，一定要放到dependencyManagement中，起到管理版本的作用即可 -->
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-dependencies</artifactId>
				<version>${spring-cloud.version}</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
		</dependencies>
	</dependencyManagement>
	
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
	
	<repositories>
		<repository>
			<id>spring-milestones</id>
			<name>Spring Milestones</name>
			<url>https://repo.spring.io/milestone</url>
			<snapshots>
				<enabled>false</enabled>
			</snapshots>
		</repository>
	</repositories>
	</project>
#### application.yml<服务端>

```
server:
  port: 10086 # 端口
spring:
  application:
    name: eureka-server # 应用名称，会在Eureka中显示
eureka:
  instance:
    hostname: www.eureka.com     # eureka服务端的实例名称
  server:
    enable-self-preservation: false #关闭自我保护 原理
    eviction-interval-timer-in-ms: 60000 #清理间隔
  client:
    register-with-eureka: false # 是否注册自己的信息到EurekaServer，默认是true
    fetch-registry: false # 是否拉取其它服务的信息，默认是true
    service-url: # EurekaServer的地址，现在是自己的地址，如果是集群，需要加上其它Server的地址。
    defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka
```

#### 启动类<服务端>

```
@SpringBootApplication
@EnableEurekaServer // 声明这个应用是一个EurekaServer
public class EurekaDemoApplication {
public static void main(String[] args) {
	SpringApplication.run(EurekaDemoApplication.class, args);
	}
}
```



### 单机版<客户端>

#### 依赖<客户端>

```
<!-- Eureka客户端 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

#### application.yml<客户端>

```
server:
  port: 8081
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb01
    username: root
    password: 123
    hikari:
      maximum-pool-size: 20
      minimum-idle: 10
  application:
    name: user-service # 应用名称
mybatis:
  type-aliases-package: com.leyou.userservice.pojo
eureka:
  client:
    service-url: # EurekaServer地址
      defaultZone: http://127.0.0.1:10086/eureka
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
    ip-address: 127.0.0.1 # 指定自己的ip信息，不指定的话会自己寻找
    prefer-ip-address: true  # 服务列表显示列表 显示ip
```

#### 启动类<客户端>

```
@SpringBootApplication
@EnableDiscoveryClient // 来开启Eureka客户端功能
public class UserServiceDemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserServiceDemoApplication.class, args);
	}
}
```

### 单机版<消费端>

#### 依赖<消费端>

```
<!-- Eureka客户端 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

#### application.yml<消费端>

```
server:
  port: 8080
spring:
  application:
    name: consumer # 应用名称
eureka:
  client:
    service-url: # EurekaServer地址
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    prefer-ip-address: true # 当其它服务获取地址时提供ip而不是hostname
    ip-address: 127.0.0.1 # 指定自己的ip信息，不指定的话会自己寻找
```

#### 启动类<消费端>

```
@SpringBootApplication
@EnableDiscoveryClient // 开启Eureka客户端
public class UserConsumerDemoApplication {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate(new OkHttp3ClientHttpRequestFactory());
    }
    public static void main(String[] args) {
        SpringApplication.run(UserConsumerDemoApplication.class, args);
    }
}
```

#### 业务调用<消费端>

@Service
public class UserService {

```
@Autowired
private RestTemplate restTemplate;

@Autowired
private DiscoveryClient discoveryClient;// Eureka客户端，可以获取到服务实例信息

public List<User> queryUserByIds(List<Long> ids) {
    List<User> users = new ArrayList<>();
    // String baseUrl = "http://localhost:8081/user/";
    // 根据服务名称，获取服务实例
    List<ServiceInstance> instances = discoveryClient.getInstances("user-service");
    // 因为只有一个UserService,因此我们直接get(0)获取
    ServiceInstance instance = instances.get(0);
    // 获取ip和端口信息
    String baseUrl = "http://"+instance.getHost() + ":" + instance.getPort()+"/user/";
    ids.forEach(id -> {
        // 我们测试多次查询，
        users.add(this.restTemplate.getForObject(baseUrl + id, User.class));
        // 每次间隔500毫秒
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    });
    return users;
  }
}
```

### 详解

#### 三个核心角色：

- ##### 服务注册中心

  Eureka的服务端应用，提供服务注册和发现功能

- ##### 服务提供者

  提供服务的应用，可以是SpringBoot应用，也可以是其它任意技术实现，只要对外提供的是Rest风格服务即可。

- ##### 服务消费者

  消费应用从注册中心获取服务列表，从而得知每个服务方的信息，知道去哪里调用服务方。



客户端发现

Eureka

服务端发现

Nginx

Zookeeper

K8s



eureka-js-client

## 高可用

两两注册

```
@EnableEurekaServer 	#声明为注册中心
@EnableDiscoveryClient	#客户端注册到服务中心

测试环境
server:
 port: 8761	 #	指定该Eureka实例的端⼝
eureka:
 instance:
  hostname: discovery #	指定该Eureka实例的主机名
   client:
    registerWithEureka:	false
    fetchRegistry:	false
    serviceUrl:
     defaultZone:	http://${eureka.instance.hostname}:${server.port}/eureka

高可用
---
spring:
		profiles:	peer1																																	#	指定profil
e=peer1
server:
		port:	8761
eureka:
		instance:
				hostname:	peer1																															#	指定当prof
ile=peer1时，主机名
		client:
				serviceUrl:
						defaultZone:	http://peer2:8762/eureka/						#	将⾃⼰注册
到peer2这个Eureka上⾯去
---
spring:
		profiles:	peer2
server:
		port:	8762
eureka:
		instance:
				hostname:	peer2
		client:
				serviceUrl:
						defaultZone:	http://peer1:8761/eureka/
     
     
注册到服务器
eureka:
		client:
				serviceUrl:
						defaultZone:	http://peer1:8761/eureka/,http://peer2:8762
/eureka
```

## 用户验证

```yaml
security:
 basic:
  enabled: true
 user:
  name: root
  password: 123456
```

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

访问路径

http://root:123456@ip:port/eureka/

## Consul

```
Consul下载⻚⾯：https://www.consul.io/downloads.html
官⽅⽂档：https://www.consul.io/docs/agent/options.html
Consul系列博客：http://www.cnblogs.com/java-zhao/p/5378876.html
使⽤consul实现分布式服务注册和发现：http://www.tuicool.com/articles/M3QFv
```

```
安装

cd	/usr/local/bin/
wget https://releases.hashicorp.com/consul/0.7.0/consul_0.7.0_linux_amd64.zip
unzip consul0.7.0linux_amd64.zip

启动
./consul agent -dev # 开发模式
./consul agent -server #服务模式运行

访问
http://127.0.0.1:850/ui/

远程访问
http://192.168.11.143/ui/	
consul	agent	-dev	-client	192.168.11.143 # 指定客户端访问
```

常用命令

```
命令 解释 示例 帮助
agent   
运⾏⼀个consul agent 	  	 
consul agent -dev 
consul agent --help	

join
将agent加⼊到consul集群
consul join IP

members
列出consul cluster集群中的members
consul members

leave
将节点移除所在集群 consul
eave
```

高可用