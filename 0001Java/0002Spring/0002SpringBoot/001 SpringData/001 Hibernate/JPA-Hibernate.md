# JPA-hibernate

## SpringBoot整合

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-jpa</artifactId>
  </dependency>
<dependencies>
```

application.yaml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost/test
    username: dbuser
    password: dbpass
    driver-class-name: com.mysql.jdbc.Driver
```