

https://github.com/mrsarm/log4jwebtracker

http://ip:port/xxxx/tracker/



```xml
<servlet>
       <servlet-name>Log4jInitServlet</servlet-name>
       <servlet-class>log4jwebtracker.servlet.init.Log4jInitServlet</servlet-class>
       <init-param>
              <param-name>log4jConfigLocation</param-name>
              <param-value>WEB-INF/classes/log4j.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
</servlet>
```



```xml-dtd
<dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>1.2.17</version>
</dependency>
<dependency>
    <groupId>log4jwebtracker</groupId>
    <artifactId>log4jwebtracker</artifactId>
    <version>1.0.2</version>
</dependency>

<repository>
     <id>log4jwebtracker-releases</id>
     <url>http://repo.log4jwebtracker.com/maven2</url>
</repository>
```

log4j.properties

```properties
#定义LOG输出级别
log4j.rootLogger=INFO,Console,File

#定义日志输出目的地为控制台
log4j.appender.Console=org.apache.log4j.ConsoleAppender
log4j.appender.Console.Target=System.out
#可以灵活的指定日志输出格式，下面一行是指定具体的格式
log4j.appender.Console.layout=org.apache.log4j.PatternLayout
log4j.appender.Console.layout.ConversionPattern=[%c]-%m%n

#mybatis显示SQL语句日志配置     net.cxp.blog.dao是你的dao接口所在的包名  
#log4j.logger.org.mybatis=DEBUG
log4j.logger.com.lymn.it.mapper=DEBUG

#文件大小到达指定尺寸的时候产生一个新的文件
log4j.appender.File=org.apache.log4j.RollingFileAppender
#指定输出目录
log4j.appender.File.File=d:/logs/ssm.log
#定义文件最大大小
log4j.appender.File.MaxFileSize=10MB
#输出所有日志，如果换成DEBUG表示输出DEBUG以上级别日志
log4j.appender.File.Threshold=DEBUG
log4j.appender.File.layout=org.apache.log4j.PatternLayout
log4j.appender.File.layout.ConversionPattern=[%p][%d{yyyy-MM-dd HH\:mm|\:ss}][%c]%m%n
```

