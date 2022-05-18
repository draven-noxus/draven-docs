## AOP切面日志

### 切入点表达式

语法结构：   

```
execution(方法修饰符 方法返回值 方法所属类 匹配方法名 (方法中的形参表) 方法申明抛出的异常)
```

组合表达式

```
且（&&）、或（||）、非（！）
```

常用表达式
..：任意

*：通配

```
execution(* manager.data..*.*(..))
```

### 1.pom.xml

定义注解Log

```
<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

### 2.配置文件application.yml

```
spring:
    aop:
      auto: true
      proxy-target-class: true
```

### 方式一（注解）

注解

```
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
	String value() default "";
}
```

切面类

```
@Aspect
@Component
public class LogsAspect {
    private static final Logger logger = LoggerFactory.getLogger(LogAspect.class);
	//表达式
    @Pointcut("@annotation(com.example.springbootTest.common.annotation.Log)")
    public void logPointCut() {
    }
	//环绕通知
    @Around("logPointCut()")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        long beginTime = System.currentTimeMillis();
        // 执行方法 
        Object result = point.proceed();
        // 执行时长(毫秒) 
        long time = System.currentTimeMillis() - beginTime; //异步保存日志 	 saveLog(point, time); 
        return result;
    }
	//记录方法
    void saveLog(ProceedingJoinPoint joinPoint, long time) throws InterruptedException {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        // 请求的方法名 
        String methodName = signature.getName();
        String className = joinPoint.getTarget().getClass().getName();
        logger.info("------------------------接口日志-----------------------" + "\n" + "类名称:" + className + "\n" + "方法名:" + methodName + "\n" + "执行时间:" + time + "毫秒");
    }

```

测试

```java
@GetMapping("/test")
@Log
public String test(){
  return "hello  world";
}
```

### 方式二.非注解

```
//声明组件
@Component
//声明切面
@Aspect
//组件自动扫描
@ComponentScan
//spring自动切换JDK动态代理和CGLIB
@EnableAspectJAutoProxy
public class LogAspect {

    @Resource
    HttpServletRequest request;
    /**
     * 自定义日志
     */
    private Logger logger = LoggerFactory.getLogger(LogAspect.class);

    /**
     * 在方法执行前进行切面
     */
@Pointcut("execution(* com.example.springbootTest..*.*(..)) && (@annotation(org.springframework.web.bind.annotation.GetMapping)||@annotation(org.springframework.web.bind.annotation.PutMapping)||@annotation(org.springframework.web.bind.annotation.DeleteMapping)||@annotation(org.springframework.web.bind.annotation.PostMapping)||@annotation(org.springframework.web.bind.annotation.RequestMapping))")
    public void log() {
    }

    @Before("log()")
    public void before(JoinPoint point) {
        logger.info("---------------------请求开始---------------------");
        logger.info("请求地址:" + request.getRequestURL().toString());
        logger.info("请求方式:" + request.getMethod());
        logger.info("请求类方法:" + point.getSignature());
        logger.info("请求类方法参数:" + Arrays.toString(point.getArgs()));
        logger.info("-------------------------------------------------");
   	 }
	}
}
```
