# Fegin

接Hystix

链接：https://github.com/OpenFeign/feign

Feign可以把Rest的请求进行隐藏，伪装成类似SpringMVC的Controller一样。你不用再自己拼接url，拼接参数等等操作，一切都交给Feign去做。



Restemplate

LoadBalancerClient



### 依赖<消费方>

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

### Feign的客户端

```java
@FeignClient("user-service")
public interface UserFeignClient {
	@GetMapping("/user/{id}")
	User queryUserById(@PathVariable("id") Long id);
}
```

- 首先这是一个接口，Feign会通过动态代理，帮我们生成实现类。这点跟mybatis的mapper很像
- `@FeignClient`，声明这是一个Feign客户端，类似`@Mapper`注解。同时通过`value`属性指定服务名称
- 接口中的定义方法，完全采用SpringMVC的注解，Feign会根据注解帮我们生成URL，并访问获取结果

### 改为Feign调用

```java
@Service
public class UserService {

@Autowired
private UserFeignClient userFeignClient;

public List<User> queryUserByIds(List<Long> ids) {
    List<User> users = new ArrayList<>();
    ids.forEach(id -> {
        // 我们测试多次查询，
        users.add(this.userFeignClient.queryUserById(id));
    });
    return users;
}
}
```

### 开启Feign功能

```
@SpringBootApplication
@EnableDiscoveryClient
@EnableHystrix //开启熔断
@EnableFeignClients // 开启Feign功能
public class ClientSumerDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientSumerDemoApplication.class, args);
    }
}

```

### application.yml

#### Ribbon

Feign中本身已经集成了Ribbon依赖和自动配置：

我们不需要额外引入依赖，也不需要再注册`RestTemplate`对象。

```yaml
user-service:
  ribbon:
    ConnectTimeout: 250 # 连接超时时间(ms)
    ReadTimeout: 1000 # 通信超时时间(ms)
    OkToRetryOnAllOperations: true # 是否对所有操作重试
    MaxAutoRetriesNextServer: 1 # 同一服务不同实例的重试次数
    MaxAutoRetries: 1 # 同一实例的重试次数
```

#### Hystix

默认关闭Hytrix

```
feign:
  hystrix:
    enabled: true # 开启Feign的熔断功能
```

#### Feign中的Fallback

```java
@Component
public class UserFeignClientFallback implements UserFeignClient {
    @Override
    public User queryUserById(Long id) {
        User user = new User();
        user.setId(id);
        user.setName("用户查询出现异常！");
        return user;
    }
}
```

#### 指定实现类

```java
@FeignClient(value = "user-service", fallback = UserFeignClientFallback.class)
public interface UserFeignClient {

    @GetMapping("/user/{id}")
    User queryUserById(@PathVariable("id") Long id);
}
```

## 请求压缩(了解)

Spring Cloud Feign 支持对请求和响应进行GZIP压缩，以减少通信过程中的性能损耗。通过下面的参数即可开启请求与响应的压缩功能：

```yaml
feign:
  compression:
    request:
      enabled: true # 开启请求压缩
    response:
      enabled: true # 开启响应压缩
```

同时，我们也可以对请求的数据类型，以及触发压缩的大小下限进行设置：

```yaml
feign:
  compression:
    request:
      enabled: true # 开启请求压缩
      mime-types: text/html,application/xml,application/json # 设置压缩的数据类型
      min-request-size: 2048 # 设置触发压缩的大小下限
```

注：上面的数据类型、压缩大小下限均为默认值。



## 日志级别

### java配置方式

前面讲过，通过`logging.level.xx=debug`来设置日志级别。然而这个对Fegin客户端而言不会产生效果。因为`@FeignClient`注解修改的客户端在被代理时，都会创建一个新的Fegin.Logger实例。我们需要额外指定这个日志的级别才可以。

1）设置com.leyou包下的日志级别都为debug

```yaml
logging:
  level:
    # 此处填写所配置的日志级别类的全限定类，并指定日志级别
    com.leyou: debug
```

2）编写配置类，定义日志级别

```java
/**
* @Configuration 上下文重复问题
*/
@Configuration
public class FeignConfig {
    @Bean
    Logger.Level feignLoggerLevel(){
        return Logger.Level.FULL;
    }
}
```

此处 依然存在spring上下文重叠的问题要注意

这里指定的Level级别是FULL，Feign支持4种级别：

- NONE：不记录任何日志信息，这是默认值。
- BASIC：仅记录请求的方法，URL以及响应状态码和执行时间
- HEADERS：在BASIC的基础上，额外记录了请求和响应的头信息
- FULL：记录所有请求和响应的明细，包括头信息、请求体、元数据。



3）在FeignClient中指定配置类：

```java
@FeignClient(value = "user-service", fallback = UserFeignClientFallback.class, configuration = FeignConfig.class)
public interface UserFeignClient {
    @GetMapping("/user/{id}")
    User queryUserById(@PathVariable("id") Long id);
}
```

4）重启项目，即可看到每次访问的日志：

### 属性配置方式

```yaml
# 位置 调用方配置此文件
fegin:
 client:
  config:
   # 被调用的微服务名称
   service-name:
    loggerLevel: full # 指定日志级别
```

## 全局配置

### java代码

不建议

```java
// 此处指定日志配置类的配置类
@EnableFeginClients(defaultConfiguration=FeignConfig.class)
public class xxx{
  
}
```

### 属性方式

```yaml
feign:
 client:
  config:
   # 全局配置
   default: # 此处default 则为全局配置生效
    loggerLever: full
```

## 继承

该特性官方不推荐使用

## 多参数构造请求

### Fegin脱离Ribbon

```java
@FeginClient(name="xxx-Name", url="指定跳转位置")
public interface TestFegin{
  
}
```

## RestTemplate vs Fegin

性能 r=2f

#### 优化

配置链接池

```xml
<dependency>
  <groupId>io.github.openfegin</groupId>
  <artifactId>fegin-httpclient</artifactId>
</dependency>

<dependency>
  <groupId>io.github.openfegin</groupId>
  <artifactId>fegin-okhttp</artifactId>
  <version>10.1.0</version>
</dependency>
```



```yaml
fegin:
 httpclient:
  enabled: true
# 默认 urlconnection  
# 还支持 okhttp 等 
 okhttp:
  enabled: true
```

## 常见问题

上传文件

表单提交

...