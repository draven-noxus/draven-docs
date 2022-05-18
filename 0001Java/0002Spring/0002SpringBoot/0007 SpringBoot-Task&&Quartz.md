知识储备

## 表达式

http://cron.qqe2.com/

# SpringBoot-Task

```java
package com.springboot.quartz.quartz_demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class QuartzDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(QuartzDemoApplication.class, args);
    }
}
```

application.yaml

```yaml
spring:
 task:
  execution:
   pool:
    keep-alive: 10s
    max-size: 16
    queue-capacity: 100
```



```java
package com.springboot.quartz.quartz_demo.quartz;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Async
public class QuartzTest {
	//测试一下 能否获取配置文件中的相关信息
    @Value("${spring.task.execution.pool.max-size}")
    private String size;

    @Scheduled(cron = "0/4 * * * * ?")
    public void getlist() {
        System.out.println("哇哈哈" + System.currentTimeMillis());
        System.out.println(size);
    }

    /**
     * 固定间隔3秒，可以引用变量
     * fixedRate：以每次开始时间作为测量，间隔固定时间
     */
    @Scheduled(fixedRate = 3 * 1000)
    public void task1() {

        System.out.println("task1" + System.currentTimeMillis());
    }

    /**
     * 固定延迟3秒，从前一次任务结束开始计算，延迟3秒执行
     */
    @Scheduled(fixedDelay = 3000)
    public void task3() {
        System.out.println("do something" + System.currentTimeMillis());
    }

    /**
     * cron表达式，每5秒执行
     */
    @Scheduled(cron = "*/5 * * * * ?")
    public void task2() {
        System.out.println("当前时间 任务：cron task，每5秒执行一次" + System.currentTimeMillis());
    }

}
```





```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
	<groupId>com.songguoliang</groupId>
	<artifactId>spring-boot-scheduling</artifactId>
	<version>1.0-SNAPSHOT</version>

	<name>spring-boot-scheduling</name>
	<description>Spring Boot教程(二十)：Spring Boot使用String Task定时任务</description>

	<!-- Spring Boot启动器父类 -->
	<parent>
    	<groupId>org.springframework.boot</groupId>
    	<artifactId>spring-boot-starter-parent</artifactId>
    	<version>2.0.1.RELEASE</version>
    	<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<properties>
    	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   	 	<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    	<java.version>1.8</java.version>
	</properties>

	<dependencies>
    	<!-- Spring Boot web启动器 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
</project>
```





cron表达式是由7个域组成的字符串，它们描述了任务计划的各个细节，这些域用空格分隔，每个域代表的含义如下：

    Seconds(秒)
    Minutes(分)
    Hours(时)
    Day-of-Month(日)
    Month(月)
    Day-of-Week(星期)
    Year(可选字段)(年)

| 表达式 |   {秒}    |   {分}    |   {时}    |          {日}           |     {月}     |          {周}           | {年}(可选) |
| :----: | :-------: | :-------: | :-------: | :---------------------: | :----------: | :---------------------: | :--------: |
| 允许值 |   0~59    |   0~59    |   0~23    |          1~31           | 1~12 JAN~DEC |       1~7 SUN~SAT       | 1970~2099  |
| 特殊值 | `, - * /` | `, - * /` | `, - * /` | `, - * /`<br/>`? L W C` |  `, - * /`   | `, - * /`<br/>`? L C #` | `, - * /`  |

说明：下面描述中，XX域则表示cron表达式相应的位置，如秒域表示cron中第1个值，日域则表示cron表达式第4个值等等。

    月份简称：JAN，FEB，MAR，APR，MAY，JUN，JUL，AUG，SEP，OCT，NOV和DEC。
    星期简称：SUN，MON，TUE，WED，THU，FRI和SAT。其中，1表示SUN。
    ,：用来分割在域上指定的多个值。如：MON,WED,FRI在星期域里表示星期一、星期三、星期五。
    /：用于指定增量值。如分钟上使用0/15，表示从零开始，每隔15分钟，等价于0,15,30,45。如分钟上使用3/15，表示从第3分钟开始，每隔15分钟，等价于3,18,33,48，x/y中x表示开始值，y表示步长。
    *：表示匹配该域的任意值。如秒上使用*表示每秒触发一次。
    -：表示指定一个范围，如分钟域上10-13，表示10分、11分、12分、13分。
    ?：表示不关心的域，可用于日和周两个域上，主要用来解决日和周两个域的冲突。和*类似，区别在于*关心域，只是域的值可以任意,?则表示对该域不关心，不需要看该域的内容，直接忽略。
    L：表示最后，是单词last的首字母，可用于日和周两个域上，用在日和周上含义不同：
        日域上表示月份中日期的最后一天，如一月的第31天、非闰年二月的第28天。
        周域上单独使用仅表示7或SAT，即仅表示周六。但是如果跟在其他值后，如6L或FRIL则表示该月中最后一个星期五。
        L还可以指定偏移量，如日域指定L-3，表示该月倒数第3天。当使用L时其值尽量不要指定列表或范围，以免令人困惑。
    W：用于日域，表示距离指定日最近的星期几(周一至周五中的一个)，如：日域上值为15W则表示距离本月第15日最近的工作日。
    #：用于周域，表示该月的第n个星期几。如：周域值为6#3或FRI#3表示该月的第3个星期五。

常用表达式示例

    0 0 10，14，16 * * ？每天上午10点、下午两点、下午4点整触发
    0 0/30 9-17 * * ? 每天朝九晚五内每隔半小时触发
    0 15 10 ? * MON-FRI 周一至周五的上午10:15触发
    0 0/5 * * * ?每5分钟触发
    10 0/5 * * * ？每隔5分钟的第10秒触发(即10:00:10、10:05:10、10:10:10等)
    30 * * * * ? 每半分钟触发
    30 10 * * * ? 每小时的10分30秒触发
    30 10 1 * * ? 每天1点10分30秒触发
    30 10 1 20 * ? 每月20号1点10分30秒触发
    30 10 1 20 10 ? * 每年10月20号1点10分30秒触发
    30 10 1 20 10 ? 2011 2011年10月20号1点10分30秒触发
    30 10 1 ? 10 * 2011 2011年10月每天1点10分30秒触发
    30 10 1 ? 10 SUN 2011 2011年10月每周日1点10分30秒触发
    15,30,45 * * * * ? 每15秒，30秒，45秒时触发
    15-45 * * * * ? 15到45秒内，每秒都触发
    15/5 * * * * ? 每分钟的每15秒开始触发，每隔5秒触发一次
    15-30/5 * * * * ? 每分钟的15秒到30秒之间开始触发，每隔5秒触发一次
    0 0/3 * * * ? 每小时的第0分0秒开始，每三分钟触发一次
    0 15 10 ? * MON-FRI 星期一到星期五的10点15分0秒触发
    0 15 10 L * ? 每个月最后一天的10点15分0秒触发
    0 15 10 LW * ? 每个月最后一个工作日的10点15分0秒触发
    0 15 10 ? * 5L 每个月最后一个星期四的10点15分0秒触发
    0 15 10 ? * 5#3 每个月第三周的星期四的10点15分0秒触发