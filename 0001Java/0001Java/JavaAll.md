# Java

```java
@Annotation //since1.5



  
  

```

## 文档相关注解

```java
@author
@param
```

## 编译相关注解

```java
@Override-方法
@Deprecated-类/方法
@SuppressWarnings-抑制编译器警告
  	unused 
  	rawtypes
//@WebServlet
```

## 单元测试注解

```

```

## 自定义注解

```java
public @interface Myinterface{
  
  
  
}
```

## 元注解

```java
//对现有的注解进行修饰的注解
Retention-生命周期
 		 	RetentionPolicy.SOURCE
    	RetentionPolicy.CLASS 默认
    	RetentionPolicy.RUNTIME 支持反射

Target-申明位置
  		TYPE
  		FIELD
  		METHOD
  		PACKAGE
  		...

Documented-被元注解修饰的类被javadoc工具提取为文档
  		RUNTIME

Inherited-具有继承性
  		通过反射获取相关信息
```

## 可重复注解

```java
@Repeatable
		成员值为-ClassName.class
    				Target	  必须一致
 			      Retention 必须一致
```

## 类型注解

```java
	使用在Target中	
			TYPE_PARAMETER
			TYPE_USE
```







# 反射

## 功能

```java
运行时
  判断任意一个对象所属的类
  构造任意一个类的对象
  判断任意一个类所具有的成员变量和方法
  获取泛型信息
  调用任意一个对象的成员变量和方法
  处理注解
  生成动态代理
  

```

## 反射API

```java
java.lang.Class - 一个类
java.lang.reflect.Method - 类的方法
java.lang.reflect.Field - 代表类的成员变量
java.lang.reflect.Contstructor - 类构造器
  ...
```



## 概述

堆内存的方法区中产生一个Class类型的对象

## 获取Class实例

```java
四种方式
  // 调用运行时类的属性 class
  类.class;
  // 通过运行时类的对象
  object.getClass();
	// 调用Class的静态方法
	Class.forName("类的全类名");
	// 类的加载器
	ClassName.class.getClassLoader().loadClass("类的全类名");
   
    
  // 加载到内存中运行时类 会在缓存区缓存一段时间
```

## Class

```java
理解Class
  类的加载过程
  字节码文件-javac.exe
  运行class文件-java.exe
  
  Class的实例就是对应着一个类
  
  
  
  
Class的实例有哪些
  外部类 成员（成员内部类 静态内部类 ），局部内部类 匿名内部类
  interface
  []: 数组
  enum
  void
  annotation
  primitive type
  
  
```

## Class的加载过程

```java
类的加载
  Load 
  	将类的class文件读入内存，并为之创建一个java.lang.Class对对象，此过程由类加载器完成
	  	描述
  			将class文件字节码内容加载到内存中，并将这些惊涛数据转换成方法区的运行时数据结构，然后生成一个代表这个类的java.lang.Class对象，作为方法区中类数据的访问入口（引用地址）。所需要访问和使用类数据只能通过这个Class对象，这个加载的过程需要类加载去参与
  
类的链接
  Link 
  	将类的二进制数据合并到JRE中
  		描述
  			将java类的二进制代码合并到JVM的运行状态之中的过程
  			验证
  				确保加载的类信息符合JVM规范 例如 以cfae开头，没有安全方面的问题
  			准备
  				正式为类变量(static)分配内存并设置类变量默认初始值的阶段，这些内存都将在方法区中进行分配
  			解析
  				虚拟机常量池内的符号引用（常量名）替换为直接引用（地址）的过程
  
  
类的初始化
  Initialize 
  	JVM负责对类进行初始化
  		执行类构造器<clinit>()方法的过程。类构造器<clinit>()方法是由编译器自动收集类中所有类变量的赋值动作和代码块中的语句合并产生的（类构造器是构造类信息的，不是构造该类对象的构造器）
  		当初始化一个类的时候，如果发现其父类还没有进行初始化，则需要先出发其父类的初始化
  		虚拟机会保证一个类的<clinit>()方法在多线程环境中被正确加锁和同步
  
```

## 类加载器

```java
类加载的作用
  将class文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时结构，然后在堆中生成一个代表这个类的java.lang.Class对象，作为方法区中类数据的访问入口

类缓存
  标准的JavaSE类加载器可以按照要求查找类，但一旦某个类被加载到类加载器中，他将维持加载（缓存）一段时间，不过JVM垃圾回收机制可以回收这些Class对象
```

### CLassLoader

```java
Bootstap ClassLoader
  引导类加载器 不能加载自定义类
  	用C++编写的，是JVM自带的类加载器，负责Java平台和辛苦，用来转载核心类库，该加载器无法直接获取
  
Extension Classloader
  扩展类加载器
  	负责jre/lib/ext目录下的jar包或 -D java.ext.dirs制定目录下的jar包装入工作库
  

System Classloader
  系统类加载器
  	负责java -classpath或-D java.class.path所指目录下的类与jar包装如工作库，是最常用的加载器
      
自定义类加载器
      
      

使用
	加载配置文件
      jdbc.properties - 必须是src下
     	ClassName.getClassLoader().getResourceAsStream();
      
      
  
```





## 创建运行时对象

```java
Class clazz = Object.class;
// 创建对应的运行时类的对象 调用的是空参构造
// 运行时类必须提供空参构造器 Å
// 空餐构造器的访问权限必须足够-一般是public

Object obj = clazz.newInstance()
sout;
  
```



# 反射结合注解

注解结合信息处理流程（反射）

# 枚举类enum

```java
// 实现接口的枚举类
// 类的对象只有有限个，确定
// 当需要一组常量时，建议使用枚举

public enum EnumTest{
  // 当前枚举类的对象 多个对象之间使用逗号 末尾使用分号
  SPRING("",""),
  WINTER("","");
  
  
  // 同时提供私有构造
  // 声明属性字段
  // setter/getter
  
  
  // enum的常用方法
  // 获取当枚举类的常量 SPRING WINTER
  EnumTest[] values = EnumTest.values()
  // 重写
  toString() 
   
  // 根据具体值(SPRING)获取当前对象   SPRING("",""),
  EnumTest spring =  EnumTest.valueOf("SPRING");
 
}



  
```

