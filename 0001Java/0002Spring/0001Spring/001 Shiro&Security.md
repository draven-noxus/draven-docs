# 权限概念

​		权限管理实现对用户访问系统的控制，按照安全规则或者安全策略控制用户访问而且只能访问自己被授权的资源

## RBAC模型

### 认证

通过用户名密码成功登录系统后，让系统得到当前用户的角色身份

### 授权

系统根据用户的角色，给其授予对应可以操作的权限资源

### 用户

主要包含用户名，密码和当前用户的角色信息，可实现认证操作

### 角色

主要包含角色名称，角色描述和当前角色拥有的权限信息，可实现授权操作

### 权限

权限也可以称为菜单，主要包含当前权限名称 url地址信息 可实现动态菜单展示

## 脚本

一套user-role-perms脚本

# Apache Shiro

官网:http://shiro.apache.org/

```java
	Apache Shiro™ is a powerful and easy-to-use Java security framework that performs authentication,
authorization, cryptography, and session management. With Shiro’s easy-to-understand API, you can
quickly and easily secure any application – from the smallest mobile applications to the largest web
and enterprise applications.
```



## Why would you use Apache Shiro

## Authentication（认证）

### Subject

### Principal

### credential

## Authorization（授权）



## Session Management（会话管理）



## Cryptography（加密）



## Web Support



## Caching



## Concurrency（并发）



## Testing



## Run As



## Remember Me



## 关键字

认证策略

xxxRealm

Session manager

Session Dao

Cache Manager



Cache





# 缓存

CacheManager



## Ecache(默认实现)

```xml
<dependency>
  <groupId>org.apache.shiro</groupId>
  <artifacId>shiro-ecahe</artifacId>
  <version>1.6.0</version>
</dependency>
```

```java
public class CustomerRealm extends AuthorizingRealm {
  // CachingRealm implements Initializable
  // boolean cachingEnabled
  // CacheManager cacheManager
  // String name
  @Override
  protected AuriXXX  tests(){
    
    return null;
  }
}


@Configuration
public class ShiroConfig {
  
  /**
  *
  *
  */
 	 
  
  @Bean
  public Realm getRealm(){
   CustomerRealm customerRealm = new CustomerRealm();
    // 开启缓存管理
    customerRealm.setCacheManager(new EhCacheManager());
    // 开启全局缓存
    cusmtomerRealm.setCachingEnabled(true);
    // 开启认证缓存
    cusmtomerRealm.setAuthenticationCachingEnabled(true);
    // 
  cusmtomerRealm.AuthenticationCacheName("authenticationCache");
    // 开启授权缓存
    cusmtomerRealm.setAuthorizationCachingEnabled(true);
  	// 
        	cusmtomerRealm.setAuthorizationCacheName("authorizationCache");
  }
}
```



## Redis

```xml
<!--redis依赖 -->
<dependency>
  <groupId>org.springframwork.boot</groupId>
  <artifacId>spring-boot-starter-data-redis</artifacId>
</dependency>
```

```java
public class RedisCacheManager implements CacheManager{
  // s 认证或授权缓存的统一名称
  @Override
  public <K,V> Cache<K,V> getCache(String s) throws CacheException{
    System.out.println();
    return RedisCache<K,V>();
  }
}


public RedisCache<K,V>  implements Cache<K,V>{
  
  @Autower
  private RedisTemplte redisTemplte;
  /**
  * 重写若干方法
  *
  */
}
```



```properties
# 配置文件
spring.redis.port=6379
spring.redis.host=localhost
spring.redis.database=0
```

## Thymeleaf

```xml
<dependency>
  <groupId>com.github.theborakompanioni</groupId>
  <artifacId>thymeleaf-extra-</artifacId>
</dependency>
<dependency>
  <groupId>org.springframwork.boot</groupId>
  <artifacId>spring-boot-starter-thymeleaf</artifacId>
</dependency>

```

```java
// 处理方言
```



## Shiro标签

```java
结合JSP
```

## 图片验证

```java

```

# FQA

```java
salt 序列化问题
```

