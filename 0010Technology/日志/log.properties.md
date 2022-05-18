# log4j.properties

自定义日志文件

```properties
log4j.logger.cenInfoDiscLog= DEBUG, cenInfoDiscLog
log4j.appender.cenInfoDiscLog=org.apache.log4j.DailyRollingFileAppender
log4j.appender.cenInfoDiscLog.File=/data/logs/infodisc/infodiscDeal.log
log4j.appender.cenInfoDiscLog.layout=org.apache.log4j.PatternLayout
log4j.appender.cenInfoDiscLog.layout.ConversionPattern=%d %p [%c] - %m%n
```



```java
private static Log cenInfoDiscLog=LogFactory.getLog("cenInfoDiscLog");
```

