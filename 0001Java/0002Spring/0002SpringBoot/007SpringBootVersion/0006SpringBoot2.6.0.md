# SpringBoot2.6.0

## 主要更新

```html
循环依赖
```



## 文档

```shell
# 链接：
# https://spring.io
# https://start.spring.io
# https://spring.io/guides/gs/spring-boot
# https://github.com/spring-projects/spring-boot
# https://github.com/spring-projects/spring-boot/wiki
# https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.6-Release-Notes
```



## New and Noteworthy

### SameSite Cookie Attribute Servlet Support

### Reactive Server Session Properties

### Pluggable Sanitization Rules

### Java Runtime Information

### Build Info Property Exclusions



### Health Support

#### Additional Path on Main or Management Port

### Composite Contributor Include/Exclude Support

### Metrics Support

### Application Startup

#### Disk Space

#### Task Execution and Scheduling

#### Jetty Connection and SSL

#### Exporting to the Dynatrace v2 API

### Docker Image Building Support

#### Additional Image Tags

#### Network Configuration

#### Cache Configuration

### Auto-configuration for Spring Data Envers

### Redis Connection Pooling

### Auto-configuration for spring-rabbit-stream

### Support for PEM format in Kafka SSL Properties

### Improved Configuration of the Maven Plugin’s Start Goal

### Auto-configured Spring Web Service Server Tests

### MessageSource-based Interpolation of Bean Validation Messages

### Using WebTestClient for Testing Spring MVC

### Spring Integration PollerMetadata Properties

### Support for Log4j2’s Composite Configuration



## Deprecations in Spring Boot 2.6.0

```html

AbstractDataSourceInitializer has been deprecated in favor of DataSourceScriptDatabaseInitializer. Similarly, subclasses of AbstractDataSourceInitializer have been deprecated in favour of new DataSourceScriptDatabaseInitializer-based equivalents.

SpringPhysicalNamingStrategy has been deprecated in favor of Hibernate 5.5’s CamelCaseToUnderscoresNamingStrategy

Three methods on AbstractApplicationContextRunner have been deprecated in favor of new RunnerConfiguration-based equivalents

The started and running methods in SpringApplicationRunListener have been replaced with versions that accept a Duration.

Constructors in ApplicationStartedEvent and ApplicationReadyEvent have been replaced with versions that accept a Duration.

The EnvironmentEndpoint.sanitize has been deprecated for removal.
```

