# SpringBoot使用笔记


1. SpringBoot实现war包部署

Restful 风格

```
@RestController
```

打包启动

```
mvn install
java -jar xxx.jar
```

单元测试

```
@RunWith(SpringJunit4ClassRunner.class)
@SpringApplicationConfiguration(classes=xxx.class)
@WebAppConfiguration
```

## yaml配置

###  分割线

```
---
```

### @Value

```
获取方式placeHodler
${}
SpEL表达式
#{}：获取变量值
```

### 随机数

```
${random} #随机数
${ranom.value} #随机字符串
${random.int} #随机int
```

### 命令行参数

```
-- :属性赋值

指定端口
java -jar xxx.jar --server.port=8888
```

### 多环境配置

```
规范
application-{profile}.properties

application-dev
application-test
application-prod

激活
spring.profiles.active=xxx

实例：
java -jar xxx.jar --spring.profiles.active=test
```

### 加载顺序

```

```

### 监控与管理

spring-boot-starter-actuator

## pom.xml

```xml
<!-- 一些配置资源无法加载到classes中解决方案 -->
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
                <include>**/*.yaml</include>
                <include>**/*.yml</include>
                <include>**/*.html</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>

    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <!-- java jar 启动时 找不到主类-->
            <configuration>
                <mainClass>com.noxus.draven.Application</mainClass>
            </configuration>
        </plugin>
    </plugins>
</build>
```
