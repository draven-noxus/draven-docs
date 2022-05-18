https://github.com/alibaba/spring-cloud-alibaba/tree/master/spring-cloud-alibaba-examples











```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-stream-rocketmq</artifactId>
</dependency>
```

# 环境搭建

```shell
# 参考资料
# http://rocketmq.apache.org/
# http://rocketmq.apache.org/docs/quick-start/
# https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.7.1/rocketmq-all-4.7.1-source-release.zip
# https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.7.1/rocketmq-all-4.7.1-bin-release.zip
# https://github.com/apache/rocketmq-externals
# https://github.com/apache/rocketmq-externals/tree/release-rocketmq-console-1.0.0/rocketmq-console
```



```shell
tar -zxvf rocketmq-rocketmq-all-4.7.0.tar.gz

mv rocketmq-rocketmq-all-4.7.0 rocketmq-all-4.7.1

cd rocketmq-all-4.7.1

mvn -Prelease-all -DskipTests clean install -U

cd distribution/target/rocketmq-4.7.1/

cd distribution/target/apache-rocketmq

# 配置地址 若需要
vim /home/prod/rocketmq-all-4.3.0/distribution/target/apache-rocketmq/conf/broker.conf


# Start Name Server
# sh bin/mqnamesrv
nohup sh bin/mqnamesrv &
	# tail -f ~/logs/rocketmqlogs/namesrv.log
	# The Name Server boot success...
	
# Start Broker
# sh bin/mqbroker -n localhost:9876 &
nohup sh bin/mqbroker -n localhost:9876 &
	# tail -f ~/logs/rocketmqlogs/broker.log 
  # The broker[%s, 172.30.30.233:10911] boot success...
  # 启动参数
  nohup sh mqbroker -n 192.168.1.23:9876 -c broker.p autoCreateTopicEnable=true
```





```shell

# https://github.com/apache/rocketmq-externals
# https://github.com/apache/rocketmq-externals/releases
# https://github.com/apache/rocketmq-externals/archive/rocketmq-console-1.0.0.tar.gz

# 解压压缩包
tar -zxvf rocketmq-console-1.0.0.tar.gz 
mv rocketmq-externals-rocketmq-console-1.0.0 rocketmq-console

cd rocketmq-console/rocketmq-console

# 指定server地址
vi src/main/resources/application.properties
rocketmq.config.namesrvAddr=localhost:9876

# 打包
mvn clean package -Dmaven.test.skip=true

# 运行
java -jar target/rocketmq-console-ng-1.0.0.jar
java -jar rocketmq-console-ng-1.0.0.jar --rocketmq.config.namesrvAddr=localhost:9876
```

