# Spring Cloud Alibaba

资料

https://github.com/spring-cloud-incubator/spring-cloud-alibaba/blob/master/README-zh.md

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>nacos.config.alibaba</groupId>
    <artifactId>nacos_config_alibaba</artifactId>
    <version>1.0.0-SNAPSHOT</version>
	<!-- boot父工程 版本对应关系见-->
	<!-- https://github.com/spring-cloud-incubator/spring-cloud-alibaba/wiki/版本说明 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.0.RELEASE</version>
        <relativePath/>
    </parent>
	<!-- Spring Cloud 版本-->
    <properties>
        <spring-cloud.version>Finchley.RELEASE</spring-cloud.version>

    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
		<!-- Spring cloud Alibaba -->	
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>0.9.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
            <version>0.9.0.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-autoconfigure</artifactId>
            <version>2.1.6.RELEASE</version>
        </dependency>
<!--        java.lang.NoClassDefFoundError: org/yaml/snakeyaml/LoaderOptions-->
        <dependency>
            <groupId>org.yaml</groupId>
            <artifactId>snakeyaml</artifactId>
        </dependency>

    </dependencies>
</project>
```

对应关系

Spring Cloud Alibaba Nacos Config 是 Config Server 和 Client 
的替代方案，客户端和服务器上的概念与 Spring Environment 和 PropertySource 有着一致的抽象，在特殊的 
bootstrap 阶段，配置被加载到 Spring 
环境中。当应用程序通过部署管道从开发到测试再到生产时，您可以管理这些环境之间的配置，并确保应用程序具有迁移时需要运行的所有内容。