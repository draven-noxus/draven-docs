# Spring Security

集群环境 跨应用工作 SESSION控制 防护与身份认证相关的攻击

Spring Social  

Spring Security OAuth   (Token)

```xml
spring-cloud-starter-oauth2
spring-boot-starter-data-redis
spring-boot-starter-web
spring-social-config
spring-social-core
spring-social-security
spring-social-web
spring-session

```

```java
@RunWith(SpringRunner.class)
@PringBootTest
public class UserControllerTest{
    
    @Autowired 
    private WebApplicationContext wac;
    
    ptivate MockMvc mockMvc;
    
    @Before
    public void setup(){
        mokMvc = MockMvcBuilders.webAppContextSteup(wac).builder();
    }
   
    
}
```

# 知识点

## Mock测试

## SpringMVC注解

```java
@RequestParam(required=false,name="params",value="",defaultValue = "defaultValue") String params

@PageableDefault(page= , size = ,sort = "") Pageable pageable

ReflectionToStringBuilder.toString()
    
jsonPath

@RequestMapping(value="/xxx/{id:\\d+}")
@PathVariable(name="",value="") String id



// 控制字段显示 比如敏感字段password
@JsonView
// 方法控制
@Getters 



@RequestBody

日期类型

Hibernate Validator
@Valid 
@NotBlank
BindingResult erros


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

# Spring Security

```java
// 基本原理
Username Password Authentication
-> Basic Authentication Filter
.
.
.
-> Exception Translation Filter
-> FilterSecurity Interceptor


// 自定义用户认证逻辑
处理用户信息获取逻辑
interface UserDetailsService
// #AuthorityUtils.commaSeparatedStringToAuthorityList("xxx")

//处理用户校验逻辑
UserDetails  
// 各种状态 控制

//处理密码加密逻辑
 每次加密的 "盐" 不一样  那登陆时如何 找到对应的盐 进行解密呢
 passwordEncoder.encode("")
  
  
  
  
  
// 个性认证流程
@Override
protected void configure(HttpSecurity http) throws Exception{
  http.formLogin()
      // 跳转到指定的controller
      .loginPage("/loginPage")
      // 指定登陆拦截目录
      .loginProcessingUrl("/loginPage") 
      .antMacthers().permitAll()
      .csrf().disable()
       ;
}


// 自定义登录页面
// 自定义登陆成功
// 自定义登陆失败
```





## 源码详解

```java

```

# OAuth

```
# https://oauth.net/2/
```

