# Hystix

接Ribbon

Hystix是Netflix开源的一个延迟和容错库，用于隔离访问远程服务、第三方库，防止出现级联失败,

通过断路的方式，可以将后续请求直接拒绝掉，一段时间之后允许部分请求通过，弱国调用成功则返回电路闭合状态，否则继续断开

## 功能

### 服务降级

优先核心服务，非核心服务不可用

```java
@HystrixCommand // 指定降级
fallbackMethod // 回退函数 实现具体的逻辑
```

### 依赖隔离

线程池隔离

Hytrix 自动实现了依赖隔离

### 服务熔断

### 监控（Hystrix Dashboard）



示例：

```java
// 默认服务降级测试
@RestController
@DefaultProperties(defaultFallback="defaultFallback")
public class HystrixController{
	
    //服务降级
    @HystrixCommand(commandProperties = {
        // 超时时间
     	@HystrixProperty(name = "execution.isolation.thread.timeoutInMillisecond", value = "3000"), 
        // 设置熔断
        @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),
        // 设置熔断 短路请求中最小访问次数
        @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
        // 设置熔断 超过规定时间 会半开 继续访问得到结果
        @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000"), 
        // 设置熔断 百分比
        @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "60"),
    }) 
    
    public void getMethod(){
    	sout("测试异常");
	}

	private String defaultFallback(){
    	return "测试默认提示";
	}
}
```



```yaml
hystrix:
 command:
  default:
   execution:
    isolation:
     thread:
      timeoutInMillisecond: 6000 # 设置hystrix的超时时间为6000ms
  # 单独设置超时    
  xxxMethod:
   execution:
    isolation:
     thread:
      timeoutInMillisecond: 6000 # 设置hystrix的超时时间为6000ms
# 控制访问路径
management：
 context-path： /
```



## 依赖

配置于调用方（消费方）

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
```

改造（消费方）

 @HystrixCommand(fallbackMethod = "queryUserByIdFallback")

声明一个失败回滚处理函数queryUserByIdFallback，当queryUserById执行超时（默认是1000毫秒），就会执行fallback函数，返回错误提示。

改造(提供者)

```java
public User queryById(Long id) throws InterruptedException {
        // 为了演示超时现象，我们在这里然线程休眠,时间随机 0~2000毫秒
        Thread.sleep(new Random().nextInt(2000));
        return this.userMapper.selectByPrimaryKey(id);
}
```

为何重试未能触发？

​		其实这里是因为我们的Ribbon超时时间设置的是1000ms；而Hystix的超时时间默认也是1000ms，因此重试机制没有被触发，而是先触发了熔断；所以，Ribbon的超时时间一定要小于Hystix的超时时间。

hystrix.command.default.execution.isolation.thread.timeoutInMilliseconds`来设置Hystrix超时时间。

```yaml
hystrix:
  command:
  	default:
        execution:
          isolation:
            thread:
              timeoutInMillisecond: 6000 # 设置hystrix的超时时间为6000ms
```

## 开启熔断

```java
@SpringBootApplication
@EnableDiscoveryClient
@EnableHystrix //开启熔断
@EnableCircuitBreaker //？
public class ClientSumerDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientSumerDemoApplication.class, args);
    }
}
```





```java

```

