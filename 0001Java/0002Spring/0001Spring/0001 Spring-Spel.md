# SPEL

```shell
# 基于Spring5.3.2.RELEASE
```



```java
/** 关键字
technology-agnostic
SpEL into creating XML or annotation-based bean


        SpelExpressionParser parser = new SpelExpressionParser();
        Expression expression = parser.parseExpression("('Hello' + ' World').concat(#end)");
        EvaluationContext context = new StandardEvaluationContext();
        context.setVariable("end", "!");
        System.out.println(expression.getValue(context));


# && $
@Value
@Value("${server.port}")
    
```



## 概述

```shell
Spring表达式语言全称为“Spring Expression Language”，缩写为“SpEL”，类似于Struts2x中使用的OGNL表达式语言，能在运行时构建复杂表达式、存取对象图属性、对象方法调用等等，并且能与Spring功能完美整合，如能用来配置Bean定义。

SpEL是单独模块，只依赖于core模块，不依赖于其他模块，可以单独使用。

表达式语言一般是用最简单的形式完成最主要的工作，减少我们的工作量。



表达式

一、基本表达式： 字面量表达式、关系，逻辑与算数运算表达式、字符串连接及截取表达式、三目运算及Elivis表达式、正则表达式、括号优先级表达式；

二、类相关表达式： 类类型表达式、类实例化、instanceof表达式、变量定义及引用、赋值表达式、自定义函数、对象属性存取及安全导航表达式、对象方法调用、Bean引用；

三、集合相关表达式： 内联List、内联数组、集合，字典访问、列表，字典，数组修改、集合投影、集合选择；不支持多维内联数组初始化；不支持内联字典定义；

四、其他表达式：模板表达式。

注：SpEL表达式中的关键字是不区分大小写的。


```

## Dependency

```xml
<properties>
	<springframework.version>5.3.2.RELEASE</spring.version>
</properties>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>${springframework.version}</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-expression</artifactId>
    <version>${springframework.version}</version>
</dependency>
```

## 流程描述

```java
// Demo
// 创建解析器
// org.springframework.expression.ExpressionParser
// org.springframework.expression.spel.standard.SpelExpressionParser
ExpressionParser parser =  new SpelExpressionParser();

// 解析表达式
// 使用ExpressionParse的parseExpression来解析相应的表达式为Expression对象
Expression expression = parser.parseExpression("('Hello' + ' World').concat(#end)");

// 构造上下文 准备比如变量定义等等表达式需要的上下文数据
EvaluationContext context = new StandardEvaluationContext();

context.setVariable("end", "!");
// 求值
System.out.println(expression.getValue(context));

// 说明
/*
1.首先定义表达式：“1+2”；
2.定义解析器ExpressionParser实现，SpEL提供默认实现SpelExpressionParser；
  2.1.SpelExpressionParser解析器内部使用Tokenizer类进行词法分析，即把字符串流分析为记号流，记号在SpEL使用Token类来表示；
  2.2.有了记号流后，解析器便可根据记号流生成内部抽象语法树；在SpEL中语法树节点由SpelNode接口实现代表：如OpPlus表示加操作节点、IntLiteral表示int型字面量节点；使用SpelNodel实现组成了抽象语法树；
  2.3.对外提供Expression接口来简化表示抽象语法树，从而隐藏内部实现细节，并提供getValue简单方法用于获取表达式值；SpEL提供默认实现为SpelExpression；
3.定义表达式上下文对象（可选），SpEL使用EvaluationContext接口表示上下文对象，用于设置根对象、自定义变量、自定义函数、类型转换器等，SpEL提供默认实现StandardEvaluationContext；
4.使用表达式对象根据上下文对象（可选）求值（调用表达式对象的getValue方法）获得结果

```

## 接口

### ExpressionParser

### EvaluationContext

### Expression

```java
/**
ExpressionParser
表示解析器，默认实现是org.springframework.expression.spel.standard包中的SpelExpressionParser类，使用parseExpression方法将字符串表达式转换为Expression对象，对于ParserContext接口用于定义字符串表达式是不是模板，及模板开始与结束字符：
public interface ExpressionParser {

	Expression parseExpression(String expressionString) throws ParseException;

	
	Expression parseExpression(String expressionString, ParserContext context) throws ParseException;

}

public void test1() {
        ExpressionParser parser = new SpelExpressionParser();

        ParserContext parserContext = new ParserContext() {
            @Override
            public boolean isTemplate() {
                return true;
            }

            @Override
            public String getExpressionPrefix() {
                return "x{";
            }

            @Override
            public String getExpressionSuffix() {
                return "}";
            }
        };
        //
        String template = "x{'Hello '} x{'World!'}";
        Expression expression = parser.parseExpression(template, parserContext);
        System.out.println(expression.getValue());
    }


在此我们演示的是使用ParserContext的情况，此处定义了ParserContext实现：定义表达式是模块，表达式前缀为“#{”，后缀为“}”；使用parseExpression解析时传入的模板必须以“#{”开头，以“}”结尾，如"#{'Hello '}#{'World!'}"。
默认传入的字符串表达式不是模板形式，如之前演示的Hello World。



EvaluationContext接口

表示上下文环境，默认实现是org.springframework.expression.spel.support包中的StandardEvaluationContext类，使用setRootObject方法来设置根对象，使用setVariable方法来注册自定义变量，使用registerFunction来注册自定义函数等等。


Expression接口

表示表达式对象，默认实现是org.springframework.expression.spel.standard包中的SpelExpression，提供getValue方法用于获取表达式值，提供setValue方法用于设置对象值。

了解了SpEL原理及接口，接下来的事情就是SpEL语法了。
```

## 场景

```java
/**
基本表达式
	字面量表达式、关系
	逻辑与算数运算表达式
	字符串连接及截取表达式
	三目运算表达式及Elivis（Groovy）表达式
	正则表达式
	括号优先级表达式

类相关表达式
	类类型表达式
	类实例化
	instanceof表达式
	变量定义及引用
	赋值表达式
	自定义函数
	对象属性存取及安全导航表达式
	对象方法调用
	Bean引用
	
集合相关表达式
	内联List
	内联数组
	集合
	字典访问 列表
	字典
	数组修改 集合投影 集合选择
	不支持多维内联数组初始化 不支持内联字典定义
	
其他表达式
	模板表达式
org.springframework.expression.common.TemplateAwareExpressionParser


Bean定义中使用spel表达式
	xml
	
	注解


其中SpEL表达式中的关键字是不区分大小写的

```









































