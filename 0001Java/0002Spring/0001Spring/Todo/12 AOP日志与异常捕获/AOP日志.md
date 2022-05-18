AOP日志管理
	本章节涉及到两方面的知识
 日志
	Log4j Apache Log4j是一个基于Java的日志记录工具。它是由Ceki Gülcü首创的，现在则是Apache软件基金会的一个项目。 Log4j是几种Java日志框架之一。

	Log4j 2 Apache Log4j 2是apache开发的一款Log4j的升级产品。

	Commons Logging Apache基金会所属的项目，是一套Java日志接口，之前叫Jakarta Commons Logging，后更名为Commons Logging。

	Slf4j 类似于Commons Logging，是一套简易Java日志门面，本身并无日志的实现。（Simple Logging Facade for Java，缩写Slf4j）。

	Logback 一套日志组件的实现(Slf4j阵营)。

	Jul (Java Util Logging),自Java1.4以来的官方日志实现。

 AOP
	首先希望了解AOP的作用
	很多人对于Spring AOP的认识与使用，可能是在对Spring对事务控制的基础上
	
	那么，我们的日志管理其实也是可以避免这种大量繁琐的日志的编写

	首先，对于AOP的使用本人目前是停留在Controller这个层面进行处理的
	
 基础配置
	<!-- 扫描controller -->
	<context:component-scan base-package=""/>
	<!-- 开启aop,对controller类代理 强制使用cglib代理-->
	<aop:config proxy-target-class="true"></aop:config>
	<!-- 开启日志切面管理 -->
	<aop:aspectj-autoproxy />



	1.创建切面类处理日志
	2.本次实现的功能包括
		要求捕捉到controller层面的所有日志信息
	 2.1 记录本日志属于哪一个包下，哪个方法，哪个参数（入参结果等），并对记录人员等相关信息入库
	3.获取相关的记录的相关方法
	@Component
	@Aspect
	public class AopLog4j{

	}

 实现方法
  第一种:
	环绕通知
  第二种：
	各种通知
	@Before
	@After
	@AfterReturning
	@AfterThrowing
	
	关键参数值:
	JoinPoint
		通过它获取各种信息
	@Pointcut
		定义表达式
		示例：(value = "execution(* net.gbicc.otc.dc.controller.*.*(..))")