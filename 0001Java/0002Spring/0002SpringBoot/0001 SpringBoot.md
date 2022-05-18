# SpringBoot

链接：https://spring.io/

![](assets\diagram-boot-reactor.svg)

## 启动流程

主方法跟踪

## 新特点

### spring-webflux

### http

### reactive streams

# 开始

链接：https://spring.io/guides/gs/spring-boot/

![](assets\Getting Started Guide.png)

链接：https://github.com/spring-projects/spring-boot

![](assets\Getting Started.png)

链接：https://github.com/spring-projects/spring-boot

![](assets\Getting help.png)

链接：https://github.com/spring-projects/spring-boot/wiki

![](assets\Home.png)

链接：https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Release-Notes

![](assets\Spring Boot 2.0 Release Notes.png)

## Spring Initializr

链接：<https://start.spring.io/>

![](assets\Spring Initializr Bootstrap your application.png)

这里只演示一种

```shell
1通过Web界面使用-->http://start.spring.io
2通过Spring Tool Suite使用。
3通过IntelliJ IDEA使用。
4使用Spring Boot CLI使用。
```



## 文档

链接：<https://docs.spring.io/spring-boot/docs/2.3.5.RELEASE/reference/htmlsingle/#using-boot-using-the-default-package>

![](assets\Spring Boot Reference Guide.png)

## 环境搭建

使用IDEA软件即可

### Maven Installation

```xml
<?xml version="1.0" encoding="utf-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">  
  <modelVersion>4.0.0</modelVersion>  
  <groupId>com.example</groupId>  
  <artifactId>myproject</artifactId>  
  <version>0.0.1-SNAPSHOT</version>  
  <!-- Inherit defaults from Spring Boot -->    
  <parent> 
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-parent</artifactId>  
    <version>2.3.5.RELEASE</version> 
  </parent>  
  <!-- 正式版本 -->
  <parent> 
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-parent</artifactId>  
    <version>2.3.5.RELEASE</version>
  </parent> 
  <!-- Add typical dependencies for a web application -->  
  <dependencies> 
    <dependency> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-starter-web</artifactId> 
    </dependency> 
  </dependencies>  
  <!-- Package as an executable jar -->  
  <build> 
    <plugins> 
      <plugin> 
        <groupId>org.springframework.boot</groupId>  
        <artifactId>spring-boot-maven-plugin</artifactId> 
      </plugin> 
    </plugins> 
  </build>  
  <!-- Add Spring repositories -->  
  <!-- (you don't need this if you are using a .RELEASE version) -->  
  <repositories> 
    <repository> 
      <id>spring-snapshots</id>  
      <url>https://repo.spring.io/snapshot</url>  
      <snapshots>
        <enabled>true</enabled>
      </snapshots> 
    </repository>  
    <repository> 
      <id>spring-milestones</id>  
      <url>https://repo.spring.io/milestone</url> 
    </repository> 
  </repositories>  
  <pluginRepositories> 
    <pluginRepository> 
      <id>spring-snapshots</id>  
      <url>https://repo.spring.io/snapshot</url> 
    </pluginRepository>  
    <pluginRepository> 
      <id>spring-milestones</id>  
      <url>https://repo.spring.io/milestone</url> 
    </pluginRepository> 
  </pluginRepositories> 
</project>
```



### Gradle Installation

不怎么用

### Installing the Spring Boot CLI

不使用

```shell
https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/2.3.5.RELEASE/spring-boot-cli-2.3.5.RELEASE-bin.tar.gz
```



## 总结

###  mvn spring-boot:run

  running the example

###  creating an Executable Jar

* 注意看官方文档有描述

```xml
<!-- xx.jar中没有主清单属性 -->
<build>
  <plugins>
  <plugin>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-maven-plugin</artifactId>
  </plugin>
  </plugins>
</build>
```



##  Starters

```shell
All official starters follow a similar naming pattern; spring-boot-starter-*

A third-party starter project
called thirdpartyproject would typically be named thirdpartyproject-spring-boot-starter
```



# 配置文件

You can use properties files, YAML files, environment variables, and command-line arguments to externalize configuration

xml,properties,json,yaml

### application.yml

### application.properties

链接：https://docs.spring.io/spring-boot/docs/2.1.0.BUILD-SNAPSHOT/reference/htmlsingle/#appendix

SpringBoot注解把配置文件自动映射到属性和实体类实战
	简介：讲解使用@value注解配置文件自动映射到属性和实体类

# Spring Boot Features

## Developer Tools

### 开发工具

```
 自动重启：当Classpath里的文件发生变化时，自动重启运行中的应用程序。
 LiveReload支持：对资源的修改自动触发浏览器刷新。
 远程开发：远程部署时支持自动重启和LiveReload。
 默认的开发时属性值：为一些属性提供有意义的默认开发时属性值。
```

### 自动重启

```xml
<dependencies>
  <dependency>
  	<groupId>org.springframework.boot</groupId>
  	<artifactId>spring-boot-devtools</artifactId>
  	<optional>true</optional>
  </dependency>
</dependencies>
```

#### 排除重启资源

```yaml
spring: 
 devtools: 
 restart: 
 exclude: /static/**,/templates/**
```

#### 禁止重启

```yaml
spring: 
 devtools: 
 restart: 
 enabled: false
```

#### 触发文件

```yaml
spring: 
  devtools: 
  restart: 
  trigger-file: .trigger
```

### LiveReload

```yaml
spring: 
  devtools: 
  livereload: 
  enabled: false
```

### 默认的开发属性

```
 spring.thymeleaf.cache
 spring.freemarker.cache
 spring.velocity.cache
 spring.mustache.cache
 spring.groovy.template.cache
```

### 全局配置开发者工具

```
spring.devtools.restart.trigger-file=.trigger 
spring.devtools.livereload.enabled=false 
```

#### 远程开发

不被热部署的文件有哪些？

### 总结	

```
#资源加载顺序
web.upload-path=/Users/jack/Desktop
spring.resources.static-locations=classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/,classpath:/public/,classpath:/test/,file:${web.upload-path}

#指定某些文件不进行监听，即不会进行热加载
#spring.devtools.restart.exclude=application.properties

#通过触发器，去控制什么时候进行热加载部署新的文件，改代码不重启，通过一个文本去控制
spring.devtools.restart.trigger-file=trigger.txt 			
```

链接：https://docs.spring.io/spring-boot/docs/2.1.0.BUILD-SNAPSHOT/reference/htmlsingle/#using-boot-devtools-restart-exclude

 	注意点：生产环境不要开启这个功能，如果用java -jar启动，springBoot是不会进行热部署的

# 配置文件

注入bean的方式，属性名称和配置文件里面的key一一对应，就用加@Value 这个注解
如果不一样，就要加@value("${XXX}")

## Environment

```java
@RestController
public class HelloWorldController {
	@Resource
	private Environment environment;
	@RequestMapping("info")
	public String info() {
	System.out.println(environment.getProperty("name"));
	System.out.println(environment.getProperty("url"));
	return "Hello world!";
	}
}
```

## 4.2.1 Configuring Random Values

```properties
my.secret=${random.value}
my.number=${random.int}
my.bignumber=${random.long} 
my.uuid=${random.uuid}
my.number.less.than.ten=${random.int(10)} 
my.number.in.range=${random.int[1024,65536]}
```

### @Value

```java
@RestController
public class HelloWorldController {
	@Value("${name}")
	private String name;

	@Value("${url}")
	private String url;

	@RequestMapping("info")
	public String info() {
		return "Hello world!";
	}
}
```

## 4.2.2 Accessing Command Line Properties

```java
//--server.port=9000
//禁用
SpringApplication.setAddCommandLineProperties(false);
```

## 4.2.3 Application Property Files

```java
// 源码解读
org.springframework.boot.context.config.ConfigFileApplicationListener
```

说明

```properties
1. A /config subdirectory of the current directory 
2. The current directory
3. A classpath /config package
4. The classpath root
```

配置

```properties
# redis.properties
redis.name=redisName
server.port=30002
my.secret=${random.value}
```

命令行

```shell
# 逗号分隔可指定多个
# spring.config.name 修改默认配置文件名称
# spring.config.location 指定配置文件位置 也可存放于系统指定位置
  #  file:/config/*
  #  classpath:/config
# /config/redis.properties，/config/default.properties
java -jar noxus-draven-externalized-configuration-0.0.1-SNAPSHOT.jar --spring.config.name=redis --spring.config.location=classpath:/config/redis.properties




# 2.4新特性配置 --spring.config.use-legacy-processing=true
java -jar noxus-draven-2.4.x-import-0.0.1-SNAPSHOT.jar --spring.config.name=default --spring.config.on-location-not-found=ignore --spring.config.location=classpath:/default.properties --spring.config.use-legacy-processing=true
```



### Config Data Imports

spring.config.import

#2.4新特性

```properties
# 默认追加前缀
spring.config.import = classpath:
spring.config.import = configtree: 
spring.config.import = file:
```



## 4.2.4 Profile-specific Properties

多环境配置

```shell
# 格式
application-{profile}.properties
# 默认值 application-default.properties
No active profile set, falling back to default profiles: default

# 配置 spring.profiles.active
```

## 4.2.5. Placeholders in Properties

```properties
app.name=MyApp
# 从当前existing Environment获取信息
app.description=${app.name} is a Spring Boot application
```

## 4.2.6. Encrypting Properties





## 4.2.7. Using YAML Instead of Properties

```yaml
# 一种文件格式 类似json等 掌握语法即可
```



### 配置文件加载

#### java配置

 特性
	@Configuration
		声明为配置类-->替代XML
	@Bean
		声明在方法上-->代替bean标签
	@PropertySource
		引入外部资源-->和下面配合使用
	@Value
		属性注入-->和上面配合使用

配置文件：
	application.properties
	application.yml

#### 加载顺序

```
数字越小，优先级越高
1.命令行中传入参数
2.spring_application_json 中的属性
	spring_application_json是以json格式配置在系统环境变量中的内容
3.java:comp/env中的JNDI属性
4.Java的系统属性，可以通过System.getProperties()获取
5.操作系统的环境变量
6.通过random.*配置的随机属性
7.位于jar包之外，针对不同{profiles}环境的配置文件内容
	例：application-{profiles}.properties/yml
8.位于房前应用jar包制备，针对不同{profiles}环境的配置文件内容，
	例:application-{profiles}.properties/yml
9.位于当前应用jar包之外的application.properties/yml
10.位于房前应用jar包之内的application.properties/yml
11.在@Configuration注解修改的类中，通过@PropertySource注解定义的属性
12.应用默认属性，使用SpringApplication.setDefaultProperties定义的内容
```



#### 外部配置文件

		1、Controller上面配置
		   @PropertySource({"classpath:resource.properties"})
		2、增加属性
			 @Value("${test.name}")
	 		 private String name;

```java
@RestController
@PropertySource({"classpath:resource.properties"})
public class HelloWorldController {
	@Value("${name}")
	private String name;
	
	@Value("${url}")
	private String url;

	@RequestMapping("info")
	public String info() {
         System.out.println("用户名："+name);
         System.out.println("用户名："+url);
		return name+""+url;
	}
}
```



#### 实体类配置文件



	说明：
		1、@PropertySource导入配置文件
		2、可以直接从application.properties中获取
	步骤：
		1、添加 @Component 注解；
		2、使用 @PropertySource 注解指定配置文件位置；
		3、使用 @ConfigurationProperties 注解，设置相关属性；
	
		4、必须 通过注入IOC对象Resource 进来 ， 才能在类中使用获取的配置文件值。
			@Autowired
			private ServerSettings serverSettings;

@ConfigurationProperties

##### 无前缀

```java
@Component
@ConfigurationProperties			@PropertySource(value="classpath:resource.properties")
public class ServerConstant {
	@value("{自定义key}")
	private xxx xxx；
}
```

##### 前缀

```java
@Component
@ConfigurationProperties(prefix="test")				@PropertySource(value="classpath:resource.properties")
public class ServerConstant {
	//注：此处不需要@Value
	private xxx xxx；
    //请设置 setter getter方法
    //若 配置数据库 则只设置getter方法
}
```

@EnableConfigurationProperties+@ConfigurationProperties

```java
// 第一步
// 若找不到EnableConfigurationProperties 则会报错
@ConfigurationProperties("enabled")
public class EnabledProperties {
    private String username;
    private String password;
}

// 第二步
@Configuration(proxyBeanMethods = false)
// 需要被扫描到
@EnableConfigurationProperties(EnabledProperties.class)
public class EnabledPropertiesConfiguration {

    private final EnabledProperties enabledProperties;

    public EnabledPropertiesConfiguration(EnabledProperties enabledProperties) {
        this.enabledProperties = enabledProperties;
    }

    @Bean
    public EnabledUser getUser() {
        EnabledUser enabledUser = new EnabledUser();
        enabledUser.setPassword(enabledProperties.getPassword());
        enabledUser.setUsername(enabledProperties.getUsername());
        return enabledUser;
    }

}


// 引入使用
private final EnabledProperties enabledProperties;

```



### 常见问题：

			1、配置文件注入失败，Could not resolve placeholder
				解决：根据springboot启动流程，会有自动扫描包没有扫描到相关注解, 
				默认Spring框架实现会从声明@ComponentScan所在的类的package进行扫描，来自动注入，
				因此启动类最好放在根路径下面，或者指定扫描包范围
				spring-boot扫描启动类对应的目录和子目录
			2、注入bean的方式，属性名称和配置文件里面的key一一对应，就用加@Value 这个注解
				如果不一样，就要加@value("${XXX}")



## 多环境配置

方便多环境切换

```yaml
# 格式：
# {application-{profile}.yml}

org.springframework.boot.SpringApplication#logStartupProfileInfo

```



```yml
# application.yml
test: 
 url: application-local

# 指定使用哪个环境
spring:
 profiles:
  active: dev # dev test pre pro
 
# application-dev.yml
test: 
 url: application-dev

# application-test.yml
test: 
 url: application-test

# application-pre.yml
test: 
 url: application-pre
 
# application-pro.yml
test: 
 url: application-pro
```

## Json

### jackson

1、常用框架 阿里 fastjson,谷歌gson等
		JavaBean序列化为Json，性能：Jackson > FastJson > Gson > Json-lib 同个结构
		Jackson、FastJson、Gson类库各有优点，各有自己的专长
		空间换时间，时间换空间

2、jackson处理相关自动
	指定字段不返回：@JsonIgnore
	指定日期格式：@JsonFormat(pattern="yyyy-MM-dd hh:mm:ss",locale="zh",timezone="GMT+8")
	空字段不返回：@JsonInclude(Include.NON_NUll)
	指定别名：@JsonProperty



## Gjson（待定）

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webflux</artifactId>
  <exclusions>
    <exclusion>
      <artifactId>jackson-databind</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<dependency>
  <groupId>com.google.code.gson</groupId>
  <artifactId>gson</artifactId>
</dependency>
```

## JSON-B

```http
http://www.1024sky.cn/blog/article/66
```

# NoSQL

Repositories

## Redis

## MongoDB

## Neo4j

## Solr(暂不考虑)

## Elasticsearch

## Cassandra

## Couchbase

## LDAP

## influxDB

# Caching

## Redis

## Caffeine

## EhCache 2.x

## Simple

Generic
JCache (JSR-107) (EhCache 3, Hazelcast, Infinispan, and others)
Hazelcast
Infinispan
Couchbase

# 优雅停机

 Graceful shutdown

```yaml
server:
 shutdown: graceful
spring:
 lifecycle:
  timeout-per-shutdown-phase: 20s
```





# 构建容器

## Layering Docker images

1.编写工程

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>
        <layers>
          <enabled>true</enabled>
        </layers>
      </configuration>
    </plugin>
  </plugins>
</build>
```

2.编写DockerFile

```dockerfile
# 指定基础镜像，这是分阶段构建的前期阶段
FROM openjdk:8u212-jdk-stretch as builder
# 执行工作目录
WORKDIR application
# 配置参数
ARG JAR_FILE=target/*.jar
# 将编译构建得到的jar文件复制到镜像空间中
COPY ${JAR_FILE} application.jar
# 通过工具spring-boot-jarmode-layertools从application.jar中提取拆分后的构建结果
RUN java -Djarmode=layertools -jar application.jar extract

# 正式构建镜像
FROM openjdk:8u212-jdk-stretch
WORKDIR application
# 前一阶段从jar中提取除了多个文件，这里分别执行COPY命令复制到镜像空间中，每次COPY都是一个layer
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
COPY --from=builder application/snapshot-dependencies/ ./
COPY --from=builder application/application/ ./
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
```

3.执行打包并构建镜像

```shell
mvn clean package -U -DskipTests

docker build -t dockerlayerdemo:0.0.1 .

# 运行
docker run --rm -p 8080:8080 dockerlayerdemo:0.0.1
```

4.查看分层信息

```shell
docker history dockerlayerdemo:0.0.1
```

## 整合web模板

### 总体描述

```shell
 实现了Spring的View接口的Bean，其 ID为error（由Spring的BeanNameViewResolver
所解析）。
 如果配置了Thymeleaf，则有名为error.html的Thymeleaf模板。
 如果配置了FreeMarker，则有名为error.ftl的FreeMarker模板。
 如果配置了Velocity，则有名为error.vm的Velocity模板。
 如果是用JSP视图，则有名为error.jsp的JSP模板。
错误属性。
 timestamp：错误发生的时间。
 status：HTTP状态码。
 error：错误原因。
 exception：异常的类名。
 message：异常消息（如果这个错误是由异常引起的）。
 errors：BindingResult异常里的各种错误（如果这个错误是由异常引起的）。
64 第 3 章 自定义配置
 trace：异常跟踪信息（如果这个错误是由异常引起的）。
 path：错误发生时请求的URL路径。
```

## SpringApplication

### Spring Framework

Spring 应用上下文

Spring工厂加载机制

Spring应用上下问初始器

Spring Environment抽象

Spring 应用事件/监听器

### Spring Boot

SpringApplication

SpringApplication Builder API

SpringApplication 运行监听器

SpringApplication 参数

SpringApplication 故障分析

Spring Boot 应用事件/监听器





## 特点

自动配置：针对很多Spring应用程序常见的应用功能，Spring Boot能自动提供相关配置。

起步依赖：告诉Spring Boot需要什么功能，它就能引入需要的库。

命令行界面：这是Spring Boot的可选特性，借此你只需写代码就能完成完整的应用程序，

无需传统项目构建。

Actuator：让你能够深入运行中的Spring Boot应用程序，一探究竟。

```
Spring应用程序上下文里配置的Bean 
Spring Boot的自动配置做的决策
应用程序取到的环境变量、系统属性、配置属性和命令行参数
应用程序里线程的当前状态
应用程序最近处理过的HTTP请求的追踪情况
```

## Spring Boot CLI

### 安装

```
用下载的分发包进行安装
用Groovy Environment Manager进行安装。
通过OS X Homebrew进行安装。
使用MacPorts进行安装
```

## 自动配置

### @Conditional

Spring4推出了专注于功能开发，继@Conditional注解后，又基于此注解推出了很多派生注解，比如@ConditionalOnBean、@ConditionalOnMissingBean、@ConditionalOnExpression、@ConditionalOnClass......动态注入bean变得更方便了
原文：https://blog.csdn.net/xcy1193068639/article/details/81517456 

## 覆盖自动配置

有点疑问

属性文件配置

```
(1) 命令行参数
(2) java:comp/env里的JNDI属性
(3) JVM系统属性
(4) 操作系统环境变量
(5) 随机生成的带random.*前缀的属性（在设置其他属性时，可以引用它们，比如${random. 
long}）
(6) 应用程序以外的application.properties或者appliaction.yml文件
(7) 打包在应用程序内的application.properties或者appliaction.yml文件
(8) 通过@PropertySource标注的属性源
(9) 默认属性
这个列表按照优先级排序，也就是说，任何在高优先级属性源里设置的属性都会覆盖低优先
级的相同属性。例如，命令行参数会覆盖其他属性源里的属性。
application.properties和application.yml文件能放在以下四个位置。
(1) 外置，在相对于应用程序运行目录的/config子目录里。
(2) 外置，在应用程序运行的目录里。
(3) 内置，在config包内。
(4) 内置，在Classpath根目录

同样，这个列表按照优先级排序。也就是说，/config子目录里的application.properties会覆盖
应用程序Classpath里的application.properties中的相同属性。
此外，如果你在同一优先级位置同时有application.properties和application.yml，那么application. 
yml里的属性会覆盖application.properties里的属性。
禁用ascii-art Banner只是使用属性的一个小例子。让我们再看几个例子，看看如何通过常用
途径微调自动配置的Bean。
```

例如：禁用模板缓存

```
1.$ java -jar readinglist-0.0.1-SNAPSHOT.jar --spring.thymeleaf.cache=false 
  $ java -jar readinglist-0.0.1-SNAPSHOT.jar --server.port=8000

2.spring: 
 thymeleaf: 
 cache: false
 
 server: 
 port: 8000 
 
3.$ export spring_thymeleaf_cache=false 

 spring.freemarker.cache（Freemarker）
 spring.groovy.template.cache（Groovy模板）
 spring.velocity.cache（Velocity）
```

### 配置数据源

datasource

```
driver-class-name：
 HikariCP 
 Commons DBCP 
 Commons DBCP 2 

spring.datasource.jndi-name：java:/comp/env/jdbc/readingListDS
```





## 深入Actuator

### Actuator 的端点

```
GET /autoconfig 提供了一份自动配置报告，记录哪些自动配置条件通过了，哪些没通过
GET /configprops 描述配置属性（包含默认值）如何注入Bean 
GET /beans 描述应用程序上下文里全部的Bean，以及它们的关系
GET /dump 获取线程活动的快照
HTTP方法 路 径 描 述
GET /env 获取全部环境属性
GET /env/{name} 根据名称获取特定的环境属性值
GET /health 报告应用程序的健康指标，这些值由HealthIndicator的实现类提供
GET /info 获取应用程序的定制信息，这些信息由info打头的属性提供
GET /mappings 描述全部的URI路径，以及它们和控制器（包含Actuator端点）的映射关系
GET /metrics 报告各种应用程序度量信息，比如内存用量和HTTP请求计数
GET /metrics/{name} 报告指定名称的应用程序度量值
POST /shutdown 关闭应用程序，要求endpoints.shutdown.enabled设置为true
GET /trace 提供基本的HTTP请求跟踪信息（时间戳、HTTP头等）
```

### 说明

```
 bean：Spring应用程序上下文中的Bean名称或ID。
 resource：.class文件的物理位置，通常是一个URL，指向构建出的JAR文件。这会随着
应用程序的构建和运行方式发生变化。
 dependencies：当前Bean注入的Bean ID列表。
 scope：Bean的作用域（通常是单例，这也是默认作用域）。
 type：Bean的Java类型。
```

#### 配置

建议根据不同版本参考官网

```
management:
 endpoints:
  web:
   exposure: # 这里用* 代表暴露所有端点只是为了观察效果，实际中按照需进行端点暴露
    include: "*"
  endpoint:
   health: # 详细信息显示给所有用户。
    show-details: always
  health:
   status:
    http-mapping: # 自定义健康检查返回状态码对应的http状态码
     FATAL: 503
```











## 集成测试

在Spring 4.2里，你可以选择基于规则的SpringClassRule和SpringMethodRule来代替SpringJUnit4ClassRunner

```
@RunWith(SpringJUnit4ClassRunner.class) 
@ContextConfiguration( classes=AddressBookConfiguration.class)

@RunWith(SpringJUnit4ClassRunner.class) 
@SpringApplicationConfiguration(classes=AddressBookConfiguration.class) 
```

### MockMvc

模拟 Spring MVC 

 Spring Mock MVC：能在一个近似真实的模拟Servlet容器里测试控制器，而不用实际启动
应用服务器。

```
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration( 
 classes = ReadingListApplication.class) 
@WebAppConfiguration
```

 Web集成测试：在嵌入式Servlet容器（比如Tomcat或Jetty）里启动应用程序，在真正的应
用服务器里执行测试



使用 Selenium 测试 HTML 页面



## Groovy与Spring Boot CLI 

略

## 在Spring Boot中使用Grails

略



### SpringBoot Starter

链接：https://docs.spring.io/spring-boot/docs/2.1.0.BUILD-SNAPSHOT/reference/htmlsingle/#using-boot-starter

```java
常用starter
spring-boot-starter-web
spring-boot-starter-activemq
spring-boot-starter-aop
spring-boot-starter-data-redis
spring-boot-starter-freemarker
spring-boot-starter-thymeleaf
spring-boot-starter-webflux
```

### thymeleaf

链接：https://www.thymeleaf.org/doc/articles/standarddialect5minutes.html

```
轻量级的模板引擎（负责逻辑业务的不推荐，解析DOM或者XML会占用多的内存）
可以直接在浏览器中打开且正确显示模板页面
直接是html结尾，直接编辑
xdlcass.net/user/userinfo.html
```

#### pom.xml

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

```yaml
#开发时关闭缓存,不然没法看到实时页面
spring.thymeleaf.cache=false
spring.thymeleaf.mode=HTML5
#前缀
spring.thymeleaf.prefix=classpath:/templates/
#编码
spring.thymeleaf.encoding=UTF-8
#类型
spring.thymeleaf.content-type=text/html
#名称的后缀
spring.thymeleaf.suffix=.html
```

#### 编写页面

```
resource/templates/index.html
```

#### 语法

### Freemaker

```
FreeMarker Template Language（FTL）  文件一般保存为 xxx.ftl
严格依赖MVC模式，不依赖Servlet容器（不占用JVM内存）
内建函数
```

#### pom.xml

```java
<dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-freemarker</artifactId></dependency>
```

```yaml
#是否开启thymeleaf缓存,本地为false，生产建议为true
spring.freemarker.cache=false

spring.freemarker.charset=UTF-8
spring.freemarker.allow-request-override=false
spring.freemarker.check-template-location=true
	
#类型
spring.freemarker.content-type=text/html

spring.freemarker.expose-request-attributes=true
spring.freemarker.expose-session-attributes=true
	
#文件后缀
spring.freemarker.suffix=.ftl
#路径
spring.freemarker.template-loader-path=classpath:/templates/
```

```
1)src/main/resources/templates/fm/user/
2)建立一个index.ftl
3)user文件夹下面建立一个user.html
```

#### 语法

### Jsp

（后端渲染，消耗性能）

springboot不推荐 https://docs.spring.io/spring-boot/docs/2.1.0.BUILD-SNAPSHOT/reference/htmlsingle/#boot-features-jsp-limitations

```
Java Server Pages 动态网页技术,由应用服务器中的JSP引擎来编译和执行，再将生成的整个页面返回给客户端
可以写java代码
持表达式语言（el、jstl）
内建函数
JSP->Servlet(占用JVM内存)permSize
javaweb官方推荐		
```





## 测试

### 测试类

```java
@RunWith(SpringRunner.class)  //底层用junit  SpringJUnit4ClassRunner
@SpringBootTest(classes={HttpApplication.class})//启动整个springboot工程
public class SpringBootTestDemo {
    @Test
	public void testOne(){
		System.out.println("test hello 1");
		TestCase.assertEquals(1, 1);
	}
	@Test
	public void testTwo(){
		System.out.println("test hello 2");
		TestCase.assertEquals(1, 1);
	}
}
```

### MockMvc

			perform：执行一个RequestBuilder请求
			andExpect：添加ResultMatcher->MockMvcResultMatchers验证规则
			andReturn：最后返回相应的MvcResult->Response

```java
@RunWith(SpringRunner.class)  //底层用junit  SpringJUnit4ClassRunner
@SpringBootTest(classes = {HttpApplication.class}) //启动整个springboot工程
@AutoConfigureMockMvc
public class MockMvcTestDemo {

   @Autowired
   private MockMvc mockMvc;

   @Test
   public void apiTest() throws Exception {
      MvcResult mvcResult = 
          mockMvc.perform(MockMvcRequestBuilders
          .get("/test/home_xxx"))
          .andExpect(MockMvcResultMatchers
          .status()
          .isOk())
          .andReturn();
      int status = mvcResult.getResponse().getStatus();
      System.out.println(status);
   }

}
```

## banner

自定义banner

application.properties

```
spring.banner.location=banner.txt
```



## 全局异常处理

```java
@ControllerAdvice/@RestControllerAdvice//类注解

@ExceptionHandler(value=Exception.class)//方法注解
    
@ExceptionHandler(value=CustomException.class)//自定义异常
    
//可以配置页面
//可以返回json
```

## 部署方式

### jar

```java
<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
		</plugin>
    </plugins>
</build>
```

```java
如果没有加，则执行jar包 ，报错如下
	java -jar spring-boot-demo-0.0.1-SNAPSHOT.jar
	no main manifest attribute, in spring-boot-demo-0.0.1-SNAPSHOT.jar
	如果有安装maven 用 mvn spring-boot:run
	项目结构
		example.jar
				 |
				 +-META-INF
				 |  +-MANIFEST.MF
				 +-org
				 |  +-springframework
				 |     +-boot
				 |        +-loader
				 |           +-<spring boot loader classes>
				 +-BOOT-INF
				    +-classes
				    |  +-mycompany
				    |     +-project
				    |        +-YourClasses.class
				    +-lib
				       +-dependency1.jar
				       +-dependency2.jar
```

### war

见《2 SpringBoot-war包.md》

测试知识

Jmter QPS TPS RT

链接：https://examples.javacodegeeks.com/enterprise-java/spring/tomcat-vs-jetty-vs-undertow-comparison-of-spring-boot-embedded-servlet-containers/



## Filter

# 其他知识

stopWacth

## HTTP请求配置讲解

```
    1、@RestController and @RequestMapping是springMVC的注解，不是springboot特有的	
	2、@RestController = @Controller+@ResponseBody	
	3、@SpringBootApplication = @Configuration+@EnableAutoConfiguration+@ComponentScan
```

工具：PostMan

### Get请求

#### @PathVariable 

获取路径：path = "/{id}" 中的参数；@PathVariable String id

```java
    /**
     * localhost:8080/getController/100/200
     * 说明
     * 若
     * 访问路径中的参数与目标参数名一致  【@PathVariable("depid") String depid】 ()中的参数名可省略不写
     * 访问路径中的参数与目标参数名一致  【@PathVariable("userid") userId】 ()中的参数名必须和路径中一致
     * @param depid
     * @param userId
     * @return
     */
    @RequestMapping(path = "/{depid}/{userid}", method = RequestMethod.GET)
    public Object getUser(@PathVariable String depid, @PathVariable("userid") String userId) {
        Map<Object, Object> hashMap = new HashMap<>();
//        hashMap.put("depid", departmentID);
        hashMap.put("depid", depid);
        hashMap.put("userid", userId);
        System.out.println(hashMap);
        return hashMap;
    }
```

#### @RequestParam

获取请求路径上的参数

@RequestParam(defaultValue='默认值"",name="别名",value = "", required="是否必填")

#### @RequestBody

需要指定http头为content-type为application/json

1.实体类

#### @RequestHeader

### @PostMapping

### @PutMapping

### @DeleteMapping





## SpringBoot2.x目录文件结构讲解

 简介：讲解SpringBoot目录文件结构和官方推荐的目录规范

```
 1、目录讲解
	 src/main/java：存放代码
	 src/main/resources
	 	static: 存放静态文件，比如 css、js、image, （访问方式 http://localhost:8080/js/main.js）
	 	templates:存放静态页面jsp,html,tpl
	 	config:存放配置文件,application.properties
	 	resources:

 2、引入依赖 Thymeleaf
 	<dependency>
	   <groupId>org.springframework.boot</groupId>
	   <artifactId>spring-boot-starter-thymeleaf</artifactId>
	</dependency>
	注意：如果不引人这个依赖包，html文件应该放在默认加载文件夹里面，
	比如resources、static、public这个几个文件夹，才可以访问

 3、同个文件的加载顺序,静态资源文件
 Spring Boot 默认会挨个从
 META/resources > resources > static > public  里面找是否存在相应的资源，如果有则直接返回。

 4、默认配置	
 	1）官网地址：https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-developing-web-applications.html#boot-features-spring-mvc-static-content

 	2）spring.resources.static-locations = classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/,classpath:/public/ 

 5、静态资源文件存储在CDN
```

### 

## 文件上传

### SpringBoot2.x文件上传实战

	简介：讲解HTML页面文件上传和后端处理实战
		1、讲解springboot文件上传 MultipartFile file，源自SpringMVC
	
		1）静态页面直接访问：localhost:8080/index.html
			注意点：
				如果想要直接访问html页面，则需要把html放在springboot默认加载的文件夹下面
		2）MultipartFile 对象的transferTo方法，用于文件保存（效率和操作比原先用FileOutStream方便和高效）
		
		访问路径 http://localhost:8080/images/39020dbb-9253-41b9-8ff9-403309ff3f19.jpeg



```java
@RequestMapping(value = "upload")
@ResponseBody
public JsonData upload(@RequestParam("head_img") MultipartFile file, HttpServletRequest request) {

    //file.isEmpty(); 判断图片是否为空
    //file.getSize(); 图片大小进行判断

    String name = request.getParameter("name");
    System.out.println("用户名："+name);

    // 获取文件名
    String fileName = file.getOriginalFilename();
    System.out.println("上传的文件名为：" + fileName);

    // 获取文件的后缀名,比如图片的jpeg,png
    String suffixName = fileName.substring(fileName.lastIndexOf("."));
    System.out.println("上传的后缀名为：" + suffixName);

    // 文件上传后的路径
    fileName = UUID.randomUUID() + suffixName;
    System.out.println("转换后的名称:"+fileName);

    File dest = new File(filePath + fileName);

    try {
        file.transferTo(dest);

        return new JsonData(0, fileName);
    } catch (IllegalStateException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
    return  new JsonData(-1, "fail to save ", null);
```

### 优化

#### 单个文件

```
@Bean
public MultipartConfigElement multipartConfigElement() {
    MultipartConfigFactory factory = new MultipartConfigFactory();
    //单个文件最大
    factory.setMaxFileSize("10240KB"); //KB,MB
    /// 设置总上传数据总大小
    factory.setMaxRequestSize("1024000KB");
    return factory.createMultipartConfig();
}
```

#### maven插件

如果没加相关依赖，执行maven打包，运行后会报错:no main manifest attribute, in XXX.jar

#### 测试上传

文件上传和访问需要指定磁盘路径
application.properties中增加下面配置
			1) web.images-path=/Users/jack/Desktop
			2) spring.resources.static-locations=classpath:/META-INF/resources/,classpath:/resources/,classpath:/static/,classpath:/public/,classpath:/test/,file:${web.upload-path}

#### 文件服务器

fastdfs，阿里云oss，nginx搭建一个简单的文件服务器













# 大纲 start

## 

## 核心问题

### 

### 组件自动装配

模式注解 @Enable模块 条件装配 加载机制

### 

### 外部化配置

environment抽象 生命周期 破坏性变更

### 

### 嵌入式容器

Servlet Web容器

Reactive Web容器

### 

### Spring Boot Starter

依赖管理 装配条件 装配顺序

### 

### Production-Ready

健康检查 数据指标 @Endpoint管控

# 

# 思路

Web Servlet JSR-315 JSR-340

SQL JDBC JSR-221

数据校验 Bean validation JSP 303 JSR 349

WebSockets JSR 356

Web Service JAX-WS JSR 224

Java 管理 JMX JSR3

消息 JMS JSR 914

# 

# 三大特性

## 

## 组件自动装配

Web MVC Web Flux  JDBC

```java
@EnableAutoConfiguration

/META-INF/spring.factories

XXXAutoConfiguration
```

## 

## 嵌入式容器



Web server tomcat jetty undertow

Web reactive netty web server

## 

## 生产准备特性

指标 /actuator/metrics

健康检查 /actuator/health

外部化配置 /actuator/configprops 

### 传统Servlet应用

#### Servlet 组件 

##### Servlet注解

servlet

Filter

Listener

##### SpringBean

servlet

Filter

Listener

##### RegistrationBean



#### 异步非阻塞 

异步Servlet 

非阻塞Servlet

# 

# SpringMVC

## 

## webmvc视图

ViewResolver

View

### 

### 模版引擎

Thymeleaf

Freemarker

JSP

### 

### 内容协商

ContenNegotiationConfigurer

ContenNegotiationStrategy

ContenNegotiationViewResolver

### 

### 异常处理

@ExceptionHandler

HandlerExceptionResolver

	ExceptionHandlerExceptionResolver

BasicErrorController(springboot)

## 

## REST

### 资源服务

注解

@REquestMapping

   @GetMapping

@ResponseBody

@RequestBody



### 资源跨域

#### 传统方案

	iframe
	
	jsonp

#### 建议采用

@CrossOrigin

WebMvcConfigurer#addCorsMappings



#### 服务发现

HateOS (Mapped)

## 

## 核心

## 

## 核心架构

## 

## 处理流程

## 

## 核心组件

```java
DispatcherServlet
HandlerMapping
HandlerAdapter
ViewResolver
```

# 

# Spring Web Flux

## 

## Reactor基础

### Java lambda、 

### mono

### flux

## 

## 核心

### 

### mvc注解

### 

### 函数式声明

RouterFunction

### 

### 异步非阻塞

Servlet3.1

Net Reactor

### 

### 场景

页面渲染

REST应用

# 

# Web server应用

1.切换web server(tomcat->jetty->undow)

2.web->webflux

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```

自定义 servlet web server

```
WebServerFactoryCustomizer
ServletWebServerFactoryCustomizer
```

自定义 Reactive web server

```
ReactiveWebServerFactoryCustomizer
```

# 

# 数据相关

## 

## 关系型

### 

### jdbc

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

### 

#### 数据源 

java.sql.DataSource

### 

#### JdbcTemplate

### 

##### 自动装配

DataSourceAutoConfiguration

## 

### JPA

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>
```

### 

#### 实体映射关系

@javax.persistence.OneToOne

@javax.persistence.OneToMany

@javax.persistence.ManyToOne

@javax.persistence.ManyToMany

### 

#### 实体操作

java.persistence.Entitymanager

### 

#### 自动装配

hibernateJpaAutoConfiguration

## 

### 事务

```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
</dependency>
```

### 

#### Spring事务抽象

```
PlatformTransactionManager
```

### 

#### JDBC事务处理

```
DataSourceTransactionManager
```

### 

#### 自动装配



# Springboot

## SpringApplication

### 失败分析

```java
FailureAnalysisReporter
```

### 应用特性

SpringApplication Fluent API

### 事件监听

## 配置

### 外部化配置

ConfigurationProperty

### @Profile

### 配置属性

PropertySources

## Starter

### 开发

### 实践

# 运维管理

# Spring Boot Actuator

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

## Endpoints

端点

```properties
# 启用端点
management.endpoint.shutdown.enabled=true
management.endpoints.enabled-by-default=false
management.endpoint.info.enabled=true
# 端点开启与否排除 
# include and exclude
```



#### Web Endpoints

#### JMX Endpoints



## Kubernetest Probes

### Readiness和Liveness

spring2.3.0.RELEASE新特性

为了更好的支持云原生springBoot支持K8S的就绪探针Readiness与存活探针Liveness

```yaml
# 开启
management:
 health:
  probes:
   enabled: true
```



## 健康检查

### Health

### healthIndicator

## 指标

### 内建 Metrics

### 自定义 Metrics





# 大纲 end





# 自动装配

## Spring Framework 手动装配

### 模式注解

https://github.com/spring-projects/spring-framework/wiki/Spring-Annotation-Programming-Model

@Component 2.5

	@Service 2.5
	
	@Respository 2.0
	
	@Controller 2.5

@Configuration 3.0

#### 装配

<context:component-scan>

@ComponentScan



#### 原理

##### 派生性

##### 层次性

### @Enable模块装配

3.1

@EnableWebMvc  

@EnableTransactionManagement 事务管理器

@EnableCaching   Caching模块

@EnableMbeanExport JMX模块

@EnableAsync 异步处理模块

@EnableFlux  WebFlux模块

@EnableAspectJAutoProxy AspectJ代理模块



@EnableAutoCOnfiguration

@EnableManagementContext

@EnableConfigurationProperties

@EnableAuto2Sso



@EnableEurekaServer

@EnableConfigServer

@EnableFeginClients

@EnableZuulProxy

@EnableCiruitBreaker

#### 原理

##### 注解驱动

```java
@xxx
@xxx
@Import(DelegatingWebMvcConfiguration.class)
public @interface EnableWebMvc{
  
}


@Configuration
public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport{
  //...
}
```



##### 接口编程

```java
@xxx
...
@Import(CachingConfigurationSelector.class) 
public @interface EnableCaching{
  
} 


public class CachingConfigurationSelector extend AdviceModeImportSelector<EnableCaching>{
  // ...
  public String[] selectImports(AdviceMode adviceMode){
    //...
  }
}
```

## 条件装配

### 注解编程

#### 基于配置方式

@Profile 

配置化条件装配

3.1

#### 基于编程方式

	@ConditionalOnSystemProperty

@Conditional

编程条件装配

4.0

### 编程方式

# SpringBoot 自动装配

## 模式注解

@Enable模块

条件装配

工厂加载机制

SpringFactoriesLoader

META/spring.factories

激活自动装配

实现自动装配

@EnableAutoConfiguration

xxxAutoConfiguration

META-INF/spring.factories









# 外部化配置

XMLBean占位符

@Value

Environment



@ConfigurationProperties



@ConditionalOnProperty



整合Mybatis

```
<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
		</plugin>
	</plugins>
</build>
```



# 未



# # 

## 



# SpringBoot2.5

## Environment Variable Prefixes

```java
SpringApplication application = new SpringApplication(MyApp.class);
application.setEnvironmentPrefix("myapp");
application.run(args);
```



```yaml
# 但是不生效 issuse
myapp:
	server:
		port: 8000
```



## HTTP/2 over TCP

```
# https://www.jianshu.com/p/7ddcdd3847d6?from=groupmessage

# https://github.com/spring-projects/spring-boot/tree/main/spring-boot-tests/spring-boot-smoke-tests/spring-boot-smoke-test-tomcat-multi-connectors

# https://github.com/spring-projects/spring-boot/blob/v2.1.9.RELEASE/spring-boot-samples/spring-boot-sample-tomcat-multi-connectors/src/main/java/sample/tomcat/multiconnector/SampleTomcatTwoConnectorsApplication.java
```



```java
@SpringBootApplication
public class Http2Application {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(Http2Application.class);
        application.setEnvironmentPrefix("myapp");
        application.run(args);
    }

    @Bean
    public ServletWebServerFactory servletContainer() {
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
        tomcat.addAdditionalTomcatConnectors(createStandardConnector());
        return tomcat;
    }

    //org.apache.coyote.http11.Http11Nio2Protocol
    // org.apache.coyote.http11.Http11NioProtocol
    private Connector createStandardConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11Nio2Protocol");
        connector.setPort(9000);
        return connector;
    }

}
```



```properties
myapp.server.port=8000
server.http2.enabled=true
server.compression.enabled=true
server.port=8443
server.ssl.key-store=classpath:sample.jks
server.ssl.key-store-password=secret
server.ssl.key-password=password
```

### 说明

# 未整合资源（暂时不需要）



## Spring Boot CLI

### 

### 安装

```
用下载的分发包进行安装
用Groovy Environment Manager进行安装。
通过OS X Homebrew进行安装。
使用MacPorts进行安装
```



## 自动配置

### 

### @Conditional

Spring4推出了专注于功能开发，继@Conditional注解后，又基于此注解推出了很多派生注解，比如@ConditionalOnBean、@ConditionalOnMissingBean、@ConditionalOnExpression、@ConditionalOnClass......动态注入bean变得更方便了 原文：<https://blog.csdn.net/xcy1193068639/article/details/81517456>

## 

## 覆盖自动配置

有点疑问

属性文件配置

```
(1) 命令行参数
(2) java:comp/env里的JNDI属性
(3) JVM系统属性
(4) 操作系统环境变量
(5) 随机生成的带random.*前缀的属性（在设置其他属性时，可以引用它们，比如${random. 
long}）
(6) 应用程序以外的application.properties或者appliaction.yml文件
(7) 打包在应用程序内的application.properties或者appliaction.yml文件
(8) 通过@PropertySource标注的属性源
(9) 默认属性
这个列表按照优先级排序，也就是说，任何在高优先级属性源里设置的属性都会覆盖低优先
级的相同属性。例如，命令行参数会覆盖其他属性源里的属性。
application.properties和application.yml文件能放在以下四个位置。
(1) 外置，在相对于应用程序运行目录的/config子目录里。
(2) 外置，在应用程序运行的目录里。
(3) 内置，在config包内。
(4) 内置，在Classpath根目录

同样，这个列表按照优先级排序。也就是说，/config子目录里的application.properties会覆盖
应用程序Classpath里的application.properties中的相同属性。
此外，如果你在同一优先级位置同时有application.properties和application.yml，那么application. 
yml里的属性会覆盖application.properties里的属性。
禁用ascii-art Banner只是使用属性的一个小例子。让我们再看几个例子，看看如何通过常用
途径微调自动配置的Bean。
```

例如：禁用模板缓存

```
1.$ java -jar readinglist-0.0.1-SNAPSHOT.jar --spring.thymeleaf.cache=false 
  $ java -jar readinglist-0.0.1-SNAPSHOT.jar --server.port=8000

2.spring: 
 thymeleaf: 
 cache: false
 
 server: 
 port: 8000 
 
3.$ export spring_thymeleaf_cache=false 

 spring.freemarker.cache（Freemarker）
 spring.groovy.template.cache（Groovy模板）
 spring.velocity.cache（Velocity）
```

### Bean 的配置外置

外部配置相关属性（通常是自定义的）

```
直接从外部配置文件引入
@ConfigurationProperties(prefix="xxx")

一个类里面 将该类定义为一个Bean 方便引用
@ConfigurationProperties("amazon") #注入带amazon 前缀的属性
```





# 其他

```shell
 # 依赖分析
 mvn dependency:tree
```

