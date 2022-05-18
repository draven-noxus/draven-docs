# WebFlux

Reactive响应式编程

Reactive

https://projectreactor.io/docs/core/release/reference/

官网：

https://docs.spring.io/spring-boot/docs/2.1.0.BUILD-SNAPSHOT/reference/htmlsingle/#boot-features-webflux
SpingBoot2底层是用spring5,开始支持响应式编程，Spring又是基于Reactor试下响应式。

## 基础

## 

### 异步非阻塞

```shell
同步：串行
异步：并行 或 并发

非阻塞：当前执行不会阻塞
阻塞：

# 串行 -> 并行 必须保证数据的依赖性

```

### 两种异步编程模型

```java
Callbacks
  EventListener
  // 是解决非阻塞的方案，但是他们之间很难组合
  
  
Futures
  // 相对于Callbacks好一点 但仍然无法组合 不过CompletableFuture提升这方面的不足
```

## Callbacks

## Future

```java
//1. future.get()  任务从 并行 变为 串行

//2. future 链式问题 
```



### 实现方式

```shell
# 1.RxJava
Reactive Extensions
# 2.Reactor
Spring WebFlux Reactive类库
# 3.Flow API
Java 9 Flow API
```



# Reactive

```java
// 1.The Reactive Manifesto
  // Responsive响应性的
	// Resilient适应性强的
	// Elastic弹性的
	// Message Driven详细驱动的

		// 面向Reactive 系统
		// Reactive 系统原则
// 2.Spring Framework
/**	reacting to change 变化响应 
		non-blocking 非阻塞

		响应通知
			operations complete 操作完成
			data becomes available 数据可用
			
		技术链接
			非阻塞
			 Servlet3.1  ReadListener/WriteListener
			响应通知
			 Servlet 3.0  AsyncListener

*/

// 3.ReactiveX
		/**
		Observer Pattern			观察者模式
		Sequences of data and/or events 			数据/事件序列
		Opeators	序列操作符
		abstracting away...	屏蔽并发细节
		
		
		设计模式
		数据结构
		数据操作
		并发模型
		
		
		观察者模式
 		java Observable/observer 		
 		数据/事件序列
 		Java 8 Stream
 		数据操作
 		Java 8 Stream
 		屏蔽并发细节
 		Exectuor Futrue Runnable
		*/

// 4.Reactor
		/**
		Observer pattern 		观察者模式
 		Reactive stream pattern 响应流模式
 		Iterator pattern 迭代模式
 		pull-based 拉模式
 		push-based 推模式
 		
 		
 		
 		设计模式
 		数据获取方式
 		
 		
 		
 		观察者模式
 		java Observable/observer 		
		响应流模式
 		Java 8 Stream
 		迭代器模式
 		Java 8 iterator
		*/






// 5.维基百科
	/**
	data stream 数据流
	propagation of change 传播变化
	
	
	数据结构
		arrays 数组
		event emitters 事件发射器
	数据变化
	
	链接
		数据流
		java 8
		传播变化
		java Observable/Observer
		事件
		Java EventObject/EventListener
	*/




```



## 编程模型

语言模型： 响应式编程+函数式编程

并发模型：多线程编程

对立模型：命令式编程/响应式编程

## 数据结构

Streams 流式

Sequences 序列

Event 事件

## 设计模式

扩展模式：观察者 Observer  	推模式 push-based

对立模式：迭代器模式 Iterator  拉模式 pull-based

混合模式：Reactor Proactor

## 并发模型

非阻塞

​	同步

​	异步



屏蔽了 并发编程细节 

​		线程 同步 线程安全 以及 并发结构

## 使用场景

xxx



## Reactive Streams

### 规范

潜在无界性

序列

异步传递

非阻塞背压

### API

#### Publisher

```java
public interface Publisher<T>{
  public void subscribe(Subscriber<? super T>s);
}
```

#### Subscriber

##### 	信号事件

​	onSubscribe

​	onNext

​	onComplete

​    onError

```java
public interface Subscriber<T>{
  public void onSubscribe(Subscriber<T>);
  public void onNext(T t);
  public void onComplete(Throwable t);
  public void onError();
}
```

#### Subscription

​	request

​    cancel

```java
public interface Subscription{
  public void request(long n);
  public void cancel();
}
```



#### Processor  

Publisher  Subscriber 混合体

```java
public interface Processor<T,R> extends Subscriber<T>,Publisher<R> {
}
```

## 背压



# Reactor框架

```java
Mono 0-1的异步结果（非阻塞）

Flux  0-N的异步序列（非阻塞）
  
// Scheduler Reactor调度线程池  需要对比java线程理解
```



Reactor 反应堆模式 同步非阻塞    同步完成-串行结果

Proactor模式 异步非阻塞   异步完成

Observer观察者模式

Iterator 迭代器模式

Java并发模型









依赖于事件，事件驱动(Event-driven)
		一系列事件称为“流”
		异步
		非阻塞

​	观察者模式

reactive-streams学习资料：http://www.reactive-streams.org/
web-flux相关资料：https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#spring-webflux

Keynote

​	Spring WebFlux是Spring Framework 5.0中引入的新的反应式Web框架与Spring MVC不同，它不需要Servlet API，完全异步和非阻塞，并 通过Reactor项目实现Reactive Streams规范。
推荐：RxJava

```
Spring WebFlux应用程序不严格依赖于Servlet API，因此它们不能作为war文件部署，也不能使用src/main/webapp目录
```

```
可以整合多个模板引擎
除了REST Web服务外，您还可以使用Spring WebFlux提供动态HTML内容。Spring WebFlux支持各种模板技术，包括Thymeleaf，FreeMarker
```





# WebFlux

Vert.x

## Annotated Controller

注解驱动

```java
@Controller

@RestController


@RequestMapping(post get delete put patch)


@RequestParam
@RequestHeader
@CookieValue
@RequestBody
@PathVariable
RequestEntity
  
  
@ResponseBody
ResponseEntity
ResponseCookie
  
  
  
@ControllerAdvice
@RestControllerAdvice
 
  
  
@Crossorgin
  
CrosFilter  
vs 
CrosWebFilter
  
WebMvcConfigurer#addCrosMappings 	
vs  
WebFluxConfigurer#addCrosMapping
  
  
```



## Functional Endpoints

函数式申明

## Mono

包含0或一个元素的异步序列

mono ->单一对象  T   redis->唯一id->唯一的Mono<T>

## Flux

表示的是包含 0 到 N个元素的异步序列

flux->数组列表对象 List<T>   redis->某类标志->Flux<T>



Flux 和 Mono之间进行相互转换







## 风格

### 基于功能和基于注解

基于注解非常接近Spring MVC模型

```java
@RestController 
@RequestMapping（“/ users”）
 public  class MyRestController {

	@GetMapping（“/ {user}”）
	 public Mono <User> getUser（ @PathVariable Long user）{
				 // ...
	 }
	 @GetMapping（“/ {user} / customers”）
	 public Flux <Customer> getUserCustomers（ @PathVariable Long user）{
				 // ...
	 }
	 @DeleteMapping（“/ {user}”）
	 public Mono <User> deleteUser（ @PathVariable Long user）{
				 // ...
	 }
 }
```
### 路由配置与请求的实际处理分开

```
@Configuration
public  class RoutingConfiguration {

	@Bean
	public RouterFunction <ServerResponse> 		    
	monoRouterFunction（UserHandler userHandler）{
		return route（GET（ “/{user}”）
	       .and（accept（APPLICATION_JSON）），userHandler :: getUser）
	     	.andRoute（GET（“/{user}/customers”）
	     	.and（accept（APPLICATION_JSON）），userHandler :: 	   
	     	getUserCustomers）
			.andRoute（DELETE（“/{user}”）
		.and（accept（APPLICATION_JSON）,userHandler::deleteUser）;
	}

}

@Component
public class UserHandler {
	//公共 
	Mono <ServerResponse> getUser（ServerRequest请求）{
					 // ...
	}

	public Mono <ServerResponse> getUserCustomers（ServerRequest request）{
					 // ...
	}
	公共 
	Mono <ServerResponse> deleteUser（ServerRequest请求）{
					 // ...
				}
}
```

## 案例

	1、WebFlux中，请求和响应不再是WebMVC中的ServletRequest和ServletResponse，而是ServerRequest和ServerResponse
	
	2、加入依赖，如果同时存在spring-boot-starter-web，则会优先用spring-boot-starter-web
	
	测试
	localhost:8080/api/v1/user/test
	
	3、启动方式默认是Netty,8080端口
	4、参考：https://spring.io/blog/2016/04/19/understanding-reactive-types

pom.xml

	<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-webflux</artifactId>
	</dependency>
```java
@RestCOntroller
@RequestMapping("/")
public class XXXController{
    @GetMapping("")
    public Mono<String> test(){
        return Mono.just("哇咔咔");
    }
}
```

代码暂时略



# 反应式客户端

​	官网地址：https://docs.spring.io/spring-boot/docs/2.1.0.BUILD-SNAPSHOT/reference/htmlsingle/#boot-features-webclient
