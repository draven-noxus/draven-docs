# Hytrix+Turbine

fegin中已经默认集成

```yaml
# fegin中集成了hytrix
feign:
  hystrix:
    enabled: true
```



# Hytrix

开启dashboard

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
</dependency>
```



```yaml
spring:
  application:
    name: hytrix-dashboard-server

management:
  endpoints:
    web:
      exposure:
        include: '*'
hystrix:
  dashboard:
    proxy-stream-allow-list: "*"
```



```java
/**
*	 此处将Hytrix与Turbine拆分（可以合并）
*
*/
@EnableHystrixDashboard
@EnableCircuitBreaker
@EnableHystrix
@EnableDiscoveryClient
public class TurbineHytrixDashboardApplication {
  	// 
    public static void main(String[] args) {
        SpringApplication.run(TurbineHytrixDashboardApplication.class, args);
    }

    // Boot2.0以后由于spring-boot-starter-web的改动需要手动适配
    @Bean
    public ServletRegistrationBean<HystrixMetricsStreamServlet> getServlet() {
      HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
      ServletRegistrationBean<HystrixMetricsStreamServlet> registrationBean = new ServletRegistrationBean<>(streamServlet);
      registrationBean.setLoadOnStartup(1);
      registrationBean.addUrlMappings("/actuator/hystrix.stream");
      registrationBean.setName("HystrixMetricsStreamServlet");
      return registrationBean;
    }
}
```



```shell
# 界面
http://localhost:60000/hystrix

# 监控路径
http://localhost:60000/actuator/hystrix.stream
```



# Turbine

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
  <!--	此处默认包含Eureka Client依赖 -->
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-turbine</artifactId>
  <exclusions>
    <exclusion>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
</dependency>
```



```yaml
spring:
  application:
    name: turbine-dashboard-server

management:
  endpoints:
    web:
      exposure:
        include: '*'
hystrix:
  dashboard:
    proxy-stream-allow-list: "*"
```

```java
/**
*	 此处将Turbine与Hytrix拆分（可以合并）
*
*/
@EnableHystrixDashboard
@EnableCircuitBreaker
@EnableTurbine
@EnableDiscoveryClient
public class TurbineHytrixDashboardApplication {
  	// 
    public static void main(String[] args) {
        SpringApplication.run(TurbineHytrixDashboardApplication.class, args);
    }

    // Boot2.0以后由于spring-boot-starter-web的改动需要手动适配
    @Bean
    public ServletRegistrationBean<HystrixMetricsStreamServlet> getServlet() {
      HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
      ServletRegistrationBean<HystrixMetricsStreamServlet> registrationBean = new ServletRegistrationBean<>(streamServlet);
      registrationBean.setLoadOnStartup(1);
      registrationBean.addUrlMappings("/actuator/hystrix.stream");
      registrationBean.setName("HystrixMetricsStreamServlet");
      return registrationBean;
    }
}
```

```shell
# 界面
http://localhost:8767/hystrix
# 监控链接
http://localhost:8767/turbine.stream 
```

# FAQ

```shell
# Turbine 中默认包含Eureka-Client依赖，注册中心不使用Eureka时需要排除
org.springframework.cloud:spring-cloud-starter-netflix-turbine
```

