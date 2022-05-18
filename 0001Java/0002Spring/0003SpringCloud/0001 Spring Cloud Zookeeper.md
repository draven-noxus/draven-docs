# Spring Cloud Zookeeper

Zookeeper

# 环境搭建

此处使用单机

```shell
# 官网 
https://zookeeper.apache.org/

# 获取安装包
https://zookeeper.apache.org/releases.html
	## 注意3.6.x 版本下载 (此种目录结构apache-zookeeper-3.6.2-bin.tar.gz)

# 获取可视化工具
https://github.com/DeemOpen/zkui

# 获取
cd zkui-master
mvn clean install -U
# 运行 (可修改此配置文件 修改UI界面端口 登录账户密码 zookeeper服务端地址等信息  )
co config.cfg target/
java -jar zkui-2.0-SNAPSHOT-jar-with-dependencies.jar

# 默认账户密码 admin/manager
```



# 版本说明

```xml
<!-- 
		版本说明：
					cloud 版本 Hoxton.SR9
					boot  版本 2.3.5.RELEASE
-->
<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.3.5.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
</parent>

<spring-cloud.version>Hoxton.SR9</spring-cloud.version>
<spring.boot-version>2.3.5</spring.boot-version>

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>${spring-cloud.version}</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```



## 注册中心

```xml
<!--
		版本说明：	
					为了更好的版本管理

					此配置中已经包含
							org.springframework.cloud:spring-cloud-starter-zookeeper-config
					
							org.springframework.cloud:spring-cloud-starter-zookeeper-dicovery

					推荐使用
							zookeeper:3.5.x

							curator 4.0+ 兼容zookeeper:3.5.x + zookeeper:3.4.x
-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zookeeper-all</artifactId>
    <!-- 排除内置版本-->
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
  	<!-- 此处指定对应的版本 -->
    <version>3.6.2</version>
  	<!-- 此处会与spring-boot-starter-logging冲突 -->
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<!-- 健康检查必须开启 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

```yaml
# bootstarp.yaml
spring:
  application:
    name: zookeeper-config-server

  cloud:
    zookeeper:
    	# 集群使用","分隔
      connect-string: localhost:2181 
      # 此处指定服务注册时 服务所在位置
      discovery:
        root: /services
        enabled: true
   profiles:
    active: native
    
management:
  security:
    enabled: false
```



## 配置中心

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zookeeper-config</artifactId>
</dependency>
```



```yaml
spring:
  application:
    name: zookeeper-config-server
  cloud:
    zookeeper:
      connect-string: localhost:2181
      discovery:
        enabled: true
      # 此处以下配置貌似不生效
			config:
			  # 表示从zookeeper节点/CONFIG下开始读取
        root: config
        # 约定连接方式,（如应用名,环境）
        # 这里是/CONFIG/zookeeper-config-server,native/下去找相关配置项
        profileSeparator: ','
        defaultContext: garlic
        name: ${spring.application.name}
  profiles:
    active: native
management:
  security:
    enabled: false
```





```shell
# 新建文件 config.txt
# 规则
	# /config/{application-name},{profile}={key}={value}

##其中zookeeper-config-server是服务名称，注意关联
/config/zookeeper-config-server,native=timeout=10000

/config/zookeeper-config-server,native=namzk=testZookeeper

# 导入上述配置文件
```









# 

# Spring Cloud Consul

# 环境搭建

```shell
# Consul下载⻚⾯：
https://www.consul.io/downloads.html
# 官⽅⽂档：
https://www.consul.io/docs/agent/options.html
# Consul系列博客：
http://www.cnblogs.com/java-zhao/p/5378876.html
# 使⽤consul实现分布式服务注册和发现：
http://www.tuicool.com/articles/M3QFv
```

```shell
# 安装
cd	/usr/local/bin/
wget https://releases.hashicorp.com/consul/0.7.0/consul_0.7.0_linux_amd64.zip
unzip consul0.7.0linux_amd64.zip

# 启动
./consul agent -dev # 开发模式
./consul agent -server #服务模式运行

# 访问
http://127.0.0.1:8500/ui/

# 远程访问
http://192.168.11.143/ui/	
consul	agent	-dev	-client	192.168.11.143 # 指定客户端访问
```

常用命令

```shell
# 命令 解释 示例 帮助
# agent   
# 运⾏⼀个consul agent 	  	 
consul agent -dev 
consul agent --help	

# join
# 将agent加⼊到consul集群
consul join IP

# members
# 列出consul cluster集群中的members
consul members

# leave
# 将节点移除所在集群 consul
eave
```

## 注册中心

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>

```



```yaml
spring:
  application:
    name: cloud-consumer
  profiles:
    active: native
  cloud:
    consul:
      host: localhost
      port: 8500
```



```java
@EnableDiscoveryClient
```



## 配置中心

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-consul-config</artifactId>
</dependency>
```



```yaml
spring:
  application:
    name: cloud-consumer
  profiles:
    active: native
  cloud:
    consul:
      host: localhost
      port: 8500
      # 健康检查不推荐关闭
      discovery:
        register-health-check: true
        service-name: ${spring.application.name}
      config:
	      # 启用配置中心
        enabled: true
        # profile-separator: '::'
        # 默认前缀可不配置
        prefix: config
        # 可以理解 data-key 的上级目录
        #default-context: apps
        # 指定配置格式为 yaml
        format: yaml
        # 默认配置 consul 中 key/value 中的 key
        data-key: data
        watch:
          enabled: true
          delay: 1000
        # 实例名称
        service-name: ${spring.application.name}
```



```java
@EnableDiscoveryClient
```



```yaml
# 编写配置
# 登录控制台
# Key/Value -> Create
# 输入 key 配置前缀请保持一致
# 输入 value 若配置格式请保持格式一致
# 格式 此处以spring为例
# 		key: {prefix}/{spring.application.name,profiles}/{data-key}
# 		value: {format}对应格式配置文件
```





