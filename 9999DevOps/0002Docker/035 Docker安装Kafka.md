# Docker安装kafka

## Zookeeper

```shell
# 参考文档

# https://dlcdn.apache.org/zookeeper/zookeeper-3.5.9/apache-zookeeper-3.5.9-bin.tar.gz

# http://zookeeper.apacher.org/doc/r3.4.9/zookeeperStarted.html

```

## Kafka

```shell
tar -xzf kafka_2.13-3.1.1-SNAPSHOT.tgz
cd kafka_2.13-3.1.1-SNAPSHOT

# server.properties
vim server.properties
zookeeper.connect=zookeeperIp:port

# 启动kafka
bin/kafka-server-start.sh config/server.properties

```



## Kafka-manager

```shell
# 资料
# https://blog.csdn.net/qq_43631716/article/details/120109732
# https://github.com/yahoo/bandar-log
# https://github.com/yahoo/kafka-manager
# 更名为CMAK JAVA 11+
# https://github.com/yahoo/CMAK/releases

# 编译源码
$ ./sbt clean dist

vi conf/application.conf
kafka-manager.zkhosts="xxx.yyy.zzz.ddd:2181"


# 启动程序
nohup bin/kafka-manager -Dconfig.file=conf/application.conf &

# 指定端口号
-Dhttp.port
# 指定配置文件
-Dconfig.file=conf/application.conf
```



````shell
## 传统部署
# Docker
## 低版本部署
### zookeeper

```shell
FROM centos:6.6

RUN yum -y install vim lsof wget tar bzip2 unzip vim-enhanced passwd sudo yum-utils hostname net-tools rsync man git make automake cmake patch logrotate python-devel libpng-devel libjpeg-devel pwgen python-pip

RUN mkdir /opt/java &&\
   wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u102-b14/jdk-8u102-linux-x64.tar.gz -P /opt/java

RUN tar zxvf /opt/java/jdk-8u102-linux-x64.tar.gz -C /opt/java &&\
   JAVA_HOME=/opt/java/jdk1.8.0_102 &&\
   sed -i "/^PATH/i export JAVA_HOME=$JAVA_HOME" /root/.bash_profile &&\
   sed -i "s%^PATH.*$%&:$JAVA_HOME/bin%g" /root/.bash_profile &&\
   source /root/.bash_profile

ENV ZOOKEEPER_VERSION "3.4.6"

RUN mkdir /opt/zookeeper &&\
   wget http://mirror.olnevhost.net/pub/apache/zookeeper/zookeeper-$ZOOKEEPER_VERSION/zookeeper-$ZOOKEEPER_VERSION.tar.gz -P /opt/zookeeper

RUN tar zxvf /opt/zookeeper/zookeeper*.tar.gz -C /opt/zookeeper

RUN echo "source /root/.bash_profile" > /opt/zookeeper/start.sh &&\
   echo "cp /opt/zookeeper/zookeeper-"$ZOOKEEPER_VERSION"/conf/zoo_sample.cfg /opt/zookeeper/zookeeper-"$ZOOKEEPER_VERSION"/conf/zoo.cfg" >> /opt/zookeeper/start.sh &&\
   echo "/opt/zookeeper/zookeeper-$"ZOOKEEPER_VERSION"/bin/zkServer.sh start-foreground" >> /opt/zookeeper/start.sh

EXPOSE 2181

ENTRYPOINT ["sh", "/opt/zookeeper/start.sh"]
```

### kafka

```shell
FROM centos:6.6

ENV KAFKA_VERSION "0.8.2.2"

RUN yum -y install vim lsof wget tar bzip2 unzip vim-enhanced passwd sudo yum-utils hostname net-tools rsync man git make automake cmake patch logrotate python-devel libpng-devel libjpeg-devel pwgen python-pip

RUN mkdir /opt/java &&\
	wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u102-b14/jdk-8u102-linux-x64.tar.gz -P /opt/java

RUN mkdir /opt/kafka &&\
	wget http://apache.fayea.com/kafka/$KAFKA_VERSION/kafka_2.11-$KAFKA_VERSION.tgz -P /opt/kafka

RUN tar zxvf /opt/java/jdk-8u102-linux-x64.tar.gz -C /opt/java &&\
	JAVA_HOME=/opt/java/jdk1.8.0_102 &&\
	sed -i "/^PATH/i export JAVA_HOME=$JAVA_HOME" /root/.bash_profile &&\
	sed -i "s%^PATH.*$%&:$JAVA_HOME/bin%g" /root/.bash_profile &&\
	source /root/.bash_profile

RUN tar zxvf /opt/kafka/kafka*.tgz -C /opt/kafka &&\
	sed -i 's/num.partitions.*$/num.partitions=3/g' /opt/kafka/kafka_2.11-$KAFKA_VERSION/config/server.properties

RUN echo "source /root/.bash_profile" > /opt/kafka/start.sh &&\
	echo "cd /opt/kafka/kafka_2.11-"$KAFKA_VERSION >> /opt/kafka/start.sh &&\
	echo "sed -i 's%zookeeper.connect=.*$%zookeeper.connect=zookeeper:2181%g'  /opt/kafka/kafka_2.11-"$KAFKA_VERSION"/config/server.properties" >> /opt/kafka/start.sh &&\
	echo "bin/kafka-server-start.sh config/server.properties" >> /opt/kafka/start.sh &&\
	chmod a+x /opt/kafka/start.sh

EXPOSE 9092

ENTRYPOINT ["sh", "/opt/kafka/start.sh"]
```

```shell
docker run -itd --name zookeeper -h zookeeper -p 2181:2181 imagesName

docker run -idt --name kafka -h kafka -p9092:9092 --link zookeeper imagesName

lsof -i:port


# 测试语句

# 数据同步 outputtopic
```



# 
````

```shell

```







