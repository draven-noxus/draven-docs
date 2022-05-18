Nginx + lua

Kong

Tyk



# Zull

链接：https://github.com/Netflix/zuul

通过服务网关统一向外系统提供REST API的过程中，除了具备服务路由、均衡负载功能之外，它还具备了`权限控制`等功能。Spring Cloud Netflix中的Zuul就担任了这样的一个角色，为微服务架构提供了前门保护的作用，同时将权限控制这些较重的非业务逻辑内容迁移到服务路由层面，使得服务集群主体能够具备更高的可复用性和可测试性。

## 核心

一系列过滤器

身份认证与安全

审查与监控

动态路由

压力测试

负载分配

静态响应处理

多区域弹性

## 过滤器

### 前置

限流 

链接：https://github.com/marcosbarbero/spring-cloud-zuul-ratelimit

鉴权

​		前置过滤器中实现相关逻辑

​		分布式Session Vs OAuth2

参数校验

请求转发

```java
/**
 * Pre Post 过滤器
 */
package com.zuul.zuul.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.apache.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_DECORATION_FILTER_ORDER;
import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_TYPE;

@Component
public class TokenFilters extends ZuulFilter {
    @Override
    public String filterType() {
        return PRE_TYPE;
    }

    /**
     * 官方推荐
     * @return
     */
    @Override
    public int filterOrder() {
        return PRE_DECORATION_FILTER_ORDER -1;
    }
	//shouldFilter代表这个过滤器是否生效
    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() throws ZuulException {
        RequestContext currentContext = RequestContext.getCurrentContext();
        HttpServletRequest request = currentContext.getRequest();
        String token = request.getParameter("token");
        if(StringUtils.isEmpty(token)){
            currentContext.setSendZuulResponse(false);
            currentContext.setResponseStatusCode(HttpStatus.SC_UNAUTHORIZED);
        }
        return null;
    }
}



package com.zuul.zuul.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.POST_TYPE;
import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.SEND_RESPONSE_FILTER_ORDER;

@Component
public class AddResponseHeaderFilters extends ZuulFilter {
    @Override
    public String filterType() {
        return POST_TYPE;
    }

    @Override
    public int filterOrder() {
        return SEND_RESPONSE_FILTER_ORDER - 1;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() throws ZuulException {
        RequestContext currentContext = RequestContext.getCurrentContext();
        HttpServletResponse response = currentContext.getResponse();
        response.setHeader("X-Foo", "xxx");
        return null;
    }
}

```



### 路由

### 后置

统计

日志

### 错误

## 配置

### 依赖

```yaml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
</dependency>
```

### application.yml

```yaml
server:
  port: 10010 #服务端口
spring: 
  application:  
    name: api-gateway #指定服务名
```

### 启动类

```java
@SpringBootApplication
@EnableZuulProxy // 开启Zuul的网关功能
public class ZuulDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZuulDemoApplication.class, args);
	}
}
```

## 自定义路由

```yaml
zuul:
 routes:
  myProduct:
   path: # 定义路径
   serviceId: # 路由服务地址
   sensitiveHeaders: # 敏感过滤 zuul默认不会转发Cookie
# 简洁写法
  # 服务名：
   # 路径
  ignored-patterns: # 排除某些路由
   - /xxx
# 查看所有路由规则 权限问题   
management:
 security:
  enabled: false
  
  
# 也可全局设置 忽略敏感头
zuul:
 sensitive-headers: 
```

### 动态路由

```java
@Component
public class ZuulConfig{
    @ConfigurationProperties("zuul")
    @RefreshScope
    public ZuulProperties zuulProperties(){
        return new ZuulProperties();
    }
}
    
```



## 面向服务



## 解决问题

### 跨域问题

#### 方法一：局限性

被调用类或方法上增加@CrossOrigin注解

@CrossOrigin(allowCredentials = "true") # 允许cookie跨域

#### 方法二：全局性

在Zuul里增加CorsFilter过滤器



```java
@Configuration
public class CorsConfig{
 
    @Bean
    public CorsFilter corsFilter(){
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setMaxAge(300l);
        
        source.registerCorsConfiguration("/**",config);
        return new CorsFilter();
    }
}
```

