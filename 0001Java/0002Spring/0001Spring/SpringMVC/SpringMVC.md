# SpringMVC

## 常用注解

### @Controller

```java
// 注册bean
```

### @RequestMapping

```java
// 控制器指定可以处理哪些 URL 请求
```

### @RequestBody

```java
//	该注解用于读取Request请求的body部分数据，使用系统默认配置的HttpMessageConverter进行解析，然后把相应的数据绑定到要返回的对象上 ,再把HttpMessageConverter返回的对象数据绑定到controller中方法的参数上
```

### @ResponseBody

```java
//	该注解用于将Controller的方法返回的对象，通过适当的HttpMessageConverter转换为指定格式后，写入到Response对象的body数据区
```

### @ModelAttribute

```java
//　　在方法定义上使用 @ModelAttribute 注解：Spring MVC 在调用目标处理方法前，会先逐个调用在方法级上标注了@ModelAttribute 的方法
//　　在方法的入参前使用 @ModelAttribute 注解：可以从隐含对象中获取隐含的模型数据中获取对象，再将请求参数 –绑定到对象中，再传入入参将方法入参对象添加到模型中 
```

### @RequestParam　

```java
//  在处理方法入参处使用 @RequestParam 可以把请求参 数传递给请求方法
@RequestParam(required=false,name="params",value="",defaultValue = "defaultValue") String params,@PageableDefault(page= , size = ,sort = "") Pageable pageable
```

### @PathVariable

```java
// 绑定 URL 占位符到入参
@RequestMapping(value="/xxx/{id:\\d+}")
@PathVariable(name="",value="") String id
```

### @ExceptionHandler

```java
//  注解到方法上，出现异常时会执行该方法
```

## 其他知识

```java
ReflectionToStringBuilder.toString()
    
jsonPath
  
// 控制字段显示 比如敏感字段password
@JsonView
// 方法控制
@Getters 
  
  
Hibernate Validator
@Valid 
@NotBlank
BindingResult erros
  
  
  
  
日期类型
  
  
  
自定义注解校验

public @Interface Xxx{


} 

public class Xxxx implements ConstraintValidator<>{
    
    initialize
        
        
    isValid
    
}



异常处理 Restlet Client模拟插件
BasicErrorController


resources/error
404.html
500.html


Restful拦截

切面处理Restful
过滤器
拦截器

Filter -> Interceptor -> ControllerAdvice -> Aspect -> Controller



文件下载


异步处理 REST服务

Runnable
	Callable

DeferredResult
	

异步处理配置

WireMock伪造REST服务


```

