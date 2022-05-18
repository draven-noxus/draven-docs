# SpringBoot-War

## War-Tomcat

由于要求jar包改用war部署

### 1.pom.xml

将pom.xml文件首部的jar改成war

```xml
<packaging>war</packaging>
<!--<packaging>jar</packaging>-->
```

排除内置tomcat

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!--该配置排除tomcat start-->
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
    <!--该配置排除tomcat end-->
</dependency>
```

添加servlet-api的依赖

```xml
方式一：
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>

方式二：
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-servlet-api</artifactId>
    <version>8.0.36</version>
    <scope>provided</scope>
</dependency>

方式三（推荐）：
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

war包插件

```xml
<build>
    <finalName>managerment</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
		<!-- 解决[ERROR] Failed to execute goal org.apache.maven.plugins:maven-war-plugin:3.1.0:war (default-war) on project management_bjs: Error assembling WAR: webxml attribute is required (or pre-existing WEB-INF/web.xml if executing in update mode) -> [Help 1]  -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.0.0</version>
            <configuration>
                <failOnMissingWebXml>false</failOnMissingWebXml>
            </configuration>
        </plugin>
    </plugins>
    <!-- mybatisPlus存在无法找到mapper的情况 -->
    <resources>
        <!--拷贝xml文件到classpath下-->
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

### 2.修改启动类

```java
我们需要类似于web.xml的配置方式来启动spring上下文了，在Application类的同级添加一个SpringBootStartApplication类

@SpringBootApplication
public class DataInterfaceApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(DataInterfaceApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(DataInterfaceApplication.class);
    }
}
```

### 3.使用maven打包

```shell
mvn clean package
```

## War-Weblogic

### 1.pom.xml

将pom.xml文件首部的jar改成war

```xml
<packaging>war</packaging>
<!--<packaging>jar</packaging>-->
```

排除内置tomcat

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!--该配置排除tomcat start-->
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
    <!--该配置排除tomcat end-->
</dependency>
```

添加servlet-api的依赖

```xml
方式一：
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>

方式二：
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-servlet-api</artifactId>
    <version>8.0.36</version>
    <scope>provided</scope>
</dependency>

方式三（推荐）：
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

### 2.修改启动类

```java
我们需要类似于web.xml的配置方式来启动spring上下文了，在Application类的同级添加一个SpringBootStartApplication类

@SpringBootApplication
public class WeblogicApplication extends SpringBootServletInitializer implements WebApplicationInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WeblogicApplication.class);
    }
    public static void main(String[] args) {
        SpringApplication.run(WeblogicApplication.class, args);
    }
}

```

### 

### 3.使用maven打包

```shell
mvn clean package
```

## War-jndi

### 1.pom.xml

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
<!-- 若使用 jdbcTemplate-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

### 2.application.yaml

```yaml
spring:
  datasource:
    jndi-name: jndi/demo
    data-username: root
    data-password: 12345678
    driver-class-name: com.mysql.cj.jdbc.Driver

envs: linuxdeploy # localdeploy

server:
  port: 10088

```

3.数据源配置

```java
package com.noxus.draven.deploy.jndi.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jndi.JndiLocatorSupport;
import org.springframework.jndi.JndiObjectFactoryBean;

import javax.naming.NamingException;
import javax.sql.DataSource;

/**
 * 〈功能概述〉<br>
 *
 * @className: DataSourceConfig
 * @package: com.noxus.draven.deploy.jndi.config
 * @author: draven
 * @date: 2020/12/22 22:52
 */
@Configuration
@EnableConfigurationProperties
@Slf4j
public class DataSourceConfig {

    private static final String ENVVARLINUX = "linuxdeploy";
    private static final String ENVVARLOCAL = "localdeploy";
    @Value("${spring.datasource.jndi-name}")
    private String jndiName;

    @Value("${envs}")
    private String envs;


    @Bean("dataSource")
    @Primary
    public DataSource primaryDataSource() throws NamingException {
        JndiObjectFactoryBean bean = new JndiObjectFactoryBean();
        if (ENVVARLINUX.equals(envs)) {
            log.info("环境linux：{}", envs);
            bean.setJndiName(jndiName);
        } else if (ENVVARLOCAL.equals(envs)) {
            log.info("环境local：{}", envs);
            bean.setJndiName(JndiLocatorSupport.CONTAINER_PREFIX + jndiName);
        }
        bean.setProxyInterface(DataSource.class);
        bean.setLookupOnStartup(false);
        bean.afterPropertiesSet();
        return (DataSource) bean.getObject();
    }
}

```

### 3.使用maven打包

```shell
mvn clean package
```

# Tomcat

## 配置jndi数据源

```xml
<!-- conf/context.xml 注意转义字符-->
<Resource auth="Container" 
	driverClassName="com.mysql.cj.jdbc.Driver" 
	maxActive="100" 
	maxIdle="30" 
	maxWait="10000" 
	name="jndi/demo" 
	password="12345678" 
	type="javax.sql.DataSource" 
	url="jdbc:mysql://127.0.0.1:3306/nacos14?characterEncoding=utf8&amp;serverTimezone=UTC&amp;useSSL=false&amp;allowPublicKeyRetrieval=true" 
	username="root"/>
```



# weblogic

## 安装

## 部署war

## 配置数据源jndi

