# Spring

# 特性总览

## Core

### IoC Container

### Events

### Resources

### i18n

### Validation

### Data Binding

### Type Conversion

### SpEL

### AOP



## Data Access

### JDBC

### Transactions

### DAO Support

### R2DBC

### O/R Mapping

### XML Marshalling(编列)

JAXB

## Web

### Spring MVC

#### WebSocket

#### SockJS

### Web Reactive

#### Spring WebFlux

#### WebClient

异步回调

#### WebSocket

## Integration

### Remoting

RMI ,Hession, Thrift

Dubbo 

### JMS

activeMQ

### JCA

### JMX

@ManagedResource

#### 标准bean

#### 动态bean

##### 标准动态Bean

##### 模型Bean

##### 开放Bean



### Email

### Tasks

### Scheduling

### Caching



## Test

### Mock Objects

### TestContext Framework

### Spring MVC Test

### WebTestClient



# 版本特性

| Spring FrameWork | Java SE | Java EE         | Spring Boot |
| ---------------- | ------- | --------------- | ----------- |
| 1.x              | 1.3+    | J2EE 1.3+       |             |
| 2.x              | 1.4.2+  | J2EE 1.3+       |             |
| 3.x              | 5+      | J2EE 1.4 J2EE 5 |             |
| 4.x              | 6+      | J2EE 6 7        | 1.x         |
| 5.x              | 8+      | J2EE 7          | 2.x         |



# 模块化设计

20个模块

## AOP

## aspects

## beans

## core

## expression

## instrument

## jcl

统一日志管理

## JDBC

## JMS

## messaging

## orm

jpa

## oxm

xml

## test

## tx

## web

## webflux

## webmvc

## websocket

# 技术整合 

## Java语言特性运用



| Java SE | 特性                             |      |
| ------- | -------------------------------- | ---- |
| 5       | 注解 范型 枚举                   | 2004 |
| 6       | @Override                        | 2006 |
| 7       | Diamond  Catch try with resource | 2011 |
| 8       | Lambda 可重复注解 类型注解       | 2014 |
| 9       | 模块化 接口私有方法              | 2017 |
| 10      | 局部变量                         | 2018 |



| Java版本 | 语法特性           | spring版本 | 代表实现                      |
| -------- | ------------------ | ---------- | ----------------------------- |
| 5        | Annotation         | 1.2 +      | @Transactional                |
|          | Enumeration        | 1.2 +      | Propagation                   |
|          | for-each           | 3.0 +      | AbstracApplicationContext     |
|          | AutoBoxing         | 3.0 +      |                               |
|          | 泛型 Gneric        | 3.0 +      | ApplicationListener           |
| 6        | @Override          | 4.0 +      |                               |
| 7        | Diamond            | 5.0 +      | DefaultListableBeanFactory    |
|          | Try with resources | 5.0 +      | ResourceBundleMessageSource   |
| 8        | Lambda             | 5.0 +      | PropertyEditorRegistrySupport |



## JDK API实践







## Java EE API 整合

```shell
JSP https://jcp.org
https://github.commercyblitz/jsr
https://docs.spring.io/spring/docs/
```



# 编程模型

## 面向对象

## 契约接口

## 面向切面

动态代理 字节码提升

### ASM

### CGLIB

### Aspectj

## 面向元编程



### 配置元信息



### 注解



### 属性配置



## 面向模块化编

## Maven

## OSGI Bundles

不支持了

## Java9 Automatic Modules

## Spring @Enable*



## 面向函数编程

## Lambda

## Reactive

# IOC

```java
1.主要实现策略

2.职责

依赖处理

​	依赖查找

​	依赖注入

生命周期管理

​	容器

​	托管资源 Java Beans or 其他


配置

​	容器

​	外部化配置

​	托管资源 Java Beans or 其他

  
3.主要实现
Java SE
   JavaBeans
   Java ServiceLoader SPI
   JNDI(Java Naming and Directory Interface)
Java EE
  EJB 
  Servlet

开源
  Apache Avalon
  PicoContainer
  Goole Guice
  Spring Framework
  
  
  
4.Java Beans 作为IOC容器
  特性：
   	依赖查找
  	生命周期管理
  	配置元信息
  	事件
   	自定义
  	资源管理
  	持久化
  规范：
  	Javabean
  		https://www.oracle.com/technetwork/java/javase/tech/index-jsp-138795.html
  	BeanContext
      https://docs.oracle.com/javase/8/docs/technotes/guides/beans/spec/beancontext.html
```

依赖 查找 注入

构造器注入

Setter 注入



## IOC容器



## 依赖查找

### 	根据Bean名称

#### 		实时查找

#### 		延迟查找

### 	根据bean类型

#### 		单个Bean对象

#### 		集合Bean对象

### 	根据Bean名称+类型查找

### 	根据Java注解查找

#### 		单个Bean对象

#### 		集合Bean对象



## 依赖注入

## 依赖来源



```java
IoC配置元信息
  Bean定义配置
  	基于XML文件
  	基于Properties文件
  	基于Java注解
  	基于Java API
  	DSL（Groovy）
  
	Ioc容器配置
  	基于XML文件
  	基于Java注解
    基于Java API
  
  外部化属性配置
  	基于Java注解
```



## 生命周期



# Bean

## 实例

## 作用域

## 生命周期





# 元信息



## 注解



## 配置元信息



## 外部化配置



# 基础

## 资源管理

## 类型转换

基于JavaBeans接口的类型转换实现

​	基于java.beans.PropertyEditor扩展接口

​	org.springframework.beans.propertyeditors

Spring 3.0+ 通用类型转换实现



| 场景               | 基于JavaBean接口的类型转换实现 | Spring3.0+通用类型转换实现 |
| ------------------ | ------------------------------ | -------------------------- |
| 数据绑定           | YES                            | YES                        |
| BeanWrappper       | YES                            | YES                        |
| Bean属性类型转换   | YES                            | YES                        |
| 外部化属性类型转换 | NO                             | YES                        |
|                    |                                |                            |
|                    |                                |                            |



## 数据绑定

## 校验

## 国际化

普通国际化文案

Bean Validation 校验国际化文案

Web 站点页面渲染

Web MVC 错误消息提示

```java
/**

org.springframework.context.MessageSource

code
文案模版编码

args
文案模板参数

Locale
区域
 
 
层次性 MessageSource 
org.springframework.context.HierarchicalMessageSource
// ClassLoader
```

```java
/**

Java标准化
1.抽象实现 
java.util.ResourceBundle

2.Properties 资源实现 
java.util.PropertyResourceBundle

	key-value 设计
	
	层次性设计
	
	缓存设计
		java.util.ResourceBundle#getBundleImpl(java.lang.Module, java.lang.Module, java.lang.String, java.util.Locale, java.util.ResourceBundle.Control)
	
	字符编码控制 
		java.util.ResourceBundle.Control
	
	Control SPI扩展
		java.util.spi.ResourceBundleControlProvider
	

3.例举实现
java.util.ListResourceBundle
```



```java
/**

Java 文本格式化

核心接口
	java.text.MwssageFormat

基本用法
	设置消息格式模式 new MessageFormat(...)
	格式化 format(new Object[]{...})
	
消息格式模式
	
	格式元素
	
	FormatType
	
	FormatStyle
	
高级特性
	
	重置消息格式
	
	重置 java.util.Locale
	
	重置 java.text.Format
	
```



## 事件

## 范型处理







# Spring Ioc依赖注入



## 依赖注入的模式和类型

### 模式

#### 手动模式

##### XML资源配置元信息

##### Java注解配置元信息

##### API配置元信息

#### 自动模式

实现方式提供依赖自动关联的方式，按照内建的注入规则



## 类型

### Setter方法依赖注入

#### 手动模式

##### XML资源配置元信息

##### Java注解配置元信息

##### API配置元信息

#### 自动模式

##### byName

##### byType



### 构造器依赖注入

#### 手动模式

##### XML资源配置元信息

##### Java注解配置元信息

##### API配置元信息

#### 自动模式

##### constructor

### 字段注入

#### 手动模式

##### Java注解配置元信息

##### 	@Autowired

​	会忽略掉静态字段  byType

##### 	@Resource

​	byType

##### 	@Inject(可选)



### 方法注入

#### 手动模式

##### Java注解配置元信息

##### 	@Autowired

​	会忽略掉静态字段  byType

##### 	@Resource

​	byType

##### 	@Inject(可选)

#####     @Bean



### 回调注入-接口回调

注意：使用场景

Aware

| 内建接口                       | 说明                                                |
| ------------------------------ | --------------------------------------------------- |
| BeanFactoryAware               | 获取IoC容器，BeanFactory                            |
| ApplicationContextAware        | 获取Spring 应用上下文 ApplicationContext对象        |
| EnvironmentAware               | 获取Environment                                     |
| ResourceLoaderAware            | 获取资源加载器队形 ResourceLoader                   |
| BeanClassLoaderAware           | 获取家在当前BeanClass的ClassLoader                  |
| BeanNameAware                  | 获取当前Bean的名称                                  |
| MessageSourceAware             | 获取MessageSource 用于Spring国际化                  |
| ApplicationEventPublisherAware | 获取ApplicationEventPublishAware对象 用于Spring事件 |
| EmbeddedValueResolverAware     | 获取StringValueResolver队形 用于占位符处理          |



### 依赖注入类型选择

低依赖 构造器注入

多依赖 Setter方法注入

便利性 字段注入

声明类 方法注入

### 基础注入

原生 八大基本数据类型

标量 Number Character Boolean Enum Locale Charset Currency Properties UUID

常规类型 Object String TimeZone Calendar Optional

Spring类型 Resource InputSource Formatter



集合类型

​	数组类型 原生 标量 常规 Spring

​	集合类型 

​			Collection: List Set(SortedSet NavigavleSet EnumSet)

​			Map: Properties



限定注入

​	使用注解@Qualifier

​		通过Bean

​		通过分组

​	基于@Qualifier扩展

​		自定义注解 SpringCloud 

​		@Qualifier
​        @LoadBalanced

### 延迟注入

API ObjectFactory延迟注入

​	单一类型

​	集合类型

API ObjectProvider延迟注入（推荐）

​	单一类型

​	集合类型



## Autowiring-自动绑定



## @Autowiring

### 模式

#### no

#### byName

#### byType

#### constructor

特殊 byType

### 限制和不足





### 



基础类型注入

集合类型注入

限定注入

延迟依赖注入

依赖处理过程

@Autowried注入原理

JSP-330 @Inject注入原理

Java通用注解注入原理

自定义依赖注入注解





依赖处理过程

入口 

​	DefaultListableBeanFactory#resolveDependency

描述符

​	DependencyDescriptor

自动绑定候选对象处理器

​	AutowireCandidateResolver

@Autowired注入过程

​	元信息查找

​	依赖查找

​	依赖注入 字段 方法



@Inject

如果JSR-330 存在于ClassPath中复用AutowiredAnnotationBeanPostProcessor

<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>

org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor

org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor#AutowiredAnnotationBeanPostProcessor



CommonAnnotationBeanPostProcessor

​	注入注解

​		javax.xml.ws.WebServiceRef

​		javax.ejb.EJB

​		javax.annotation.Resource

​	生命周期注解

​		javax.annotation.PostConstruct

​		javax.annotation.PreDestory

# FQA

问题一：如何从spring官网下载jar以及相关源码
https://spring.io/

>projects
>spring dramework
>GitHub图标
>Access to Binaries
>Spring Framework Artifacts
>Spring Artifactory
>Virtual Repositories
>release - release versions
>选择自己想要的版本

问题二：怎么引入所需要的头文件
>登录官网优先引入bean的头文件信息
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
</bean>

>接着开始引入其他头文件
>比如：context
>xmlns="http://www.springframework.org/schema/beans"
> xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
> xmlns:context="http://www.springframework.org/schema/context"
> xsi:schemaLocation="http://www.springframework.org/schema/beans
> http://www.springframework.org/schema/beans/spring-beans.xsd
> http://www.springframework.org/schema/context
> http://www.springframework.org/schema/beans/spring-context.xsd">
>
>#### 依次引入

