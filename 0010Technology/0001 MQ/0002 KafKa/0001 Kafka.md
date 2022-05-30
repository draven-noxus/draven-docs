# Apache Kafka

是消息引擎系统，也是一个分布式流处理平台（Distributed Streaming Platform）。

# 介绍

		使用的是纯二进制的字节序列。当然消息还是结构化的，只是在使用之前都要将其转换成二进制的字节序列

## 三层消息

	第一层是主题层，每个主题可以配置M个分区，而每个分区又可以配置N个副本。
	第二层是分区层，每个分区的N个副本中只能有一个充当领导者角色，对外提供服务；其他N-1个副本是
追随者副本，只是提供数据冗余之用。
	第三层是消息层，分区中包含若干条消息，每条消息的位移从0开始，依次递增。
最后，客户端程序只能与分区的领导者副本进行交互。

### 高可用

#### 集群

	将不同的Broker分散运行在不同的机器上

#### 备份机制

	Leader-Follower

	工作机制：生产者总是向领导者副本写消息；而消费者总是从领导者副本读消息。至于追随
者副本，它只做一件事：向领导者副本发送请求，请求领导者把最新生产的消息发给它，这样它能保持与领
导者的同步

	领导者副本（Leader Replica） 对外提供服务

	追随者副本（Follower Replica）不对外提供服务



	？解决伸缩性？

#### Partitioning

	Kafka中的分区机制指的是将每个主题划分成多个分区（Partition），每个分区是一组有序的消息日志。生产者生产的每条消息只会被发送到一个分区中，也就是说如果向一个双分区的主题发送一条消息，这条消息要么在分区0中，要么在分区1中。如你所见，Kafka的分区编号是从0开始的，如果Topic有100个分区，那
么它们的分区号就是从0到99

## 持久化数据

	使用消息日志（Log）来保存数据，一个日志就是磁盘上一个只能追加写（Append-only）消息的物理文件。

	因为只能追加写入，故避免了缓慢的随机I/O操作，改为性能较好的顺序I/O写操作，这也是实现Kafka高吞

吐量特性的一个重要手段。不过如果你不停地向一个日志写入消息，最终也会耗尽所有的磁盘空间，因此

Kafka必然要定期地删除消息以回收磁盘。怎么删除呢？简单来说就是通过日志段（Log Segment）机制。

在Kafka底层，一个日志又近一步细分成多个日志段，消息被追加写到当前最新的日志段中，当写满了一个

日志段后，Kafka会自动切分出一个新的日志段，并将老的日志段封存起来。Kafka在后台还有定时任务会定

期地检查老的日志段是否能够被删除，从而实现回收磁盘空间的目的

## 三个方面的特性

提供一套API实现生产者和消费者；

降低网络传输和磁盘存储开销；

实现高伸缩性架构。

## 版本

### Apache Kafka

	优势在于迭代速度快，社区响应度高，使用它可以让你有更高的把控度；缺陷在于仅提供基础核心组件，缺失一些高级的特性。

### Confluent Kafka

	跨数据中心备份、Schema注册中心以及集群监控工具等

	优势在于集成了很多高级特性且由Kafka原班人马打造，质量上有保证；缺陷在于相关文档资料不全，普及率较低，没有太多可供参考的范例

### Cloudera/Hortonworks Kafka (CDH/HDP Kafka)

	大数据云公司提供的Kafka，内嵌Apache Kafka。优势在于操作简单，节省运维成本；
缺陷在于把控度低，演进速度较慢。

## 版本号

略

## 部署环境(linux)

需考虑以下三个方面

### I/O模型的使用

	Kafka客户端底层使用了Java的selector，selector在Linux上的实现机制是epoll，而在Windows平台上的实现机制是select。因此在这一点上将Kafka部署在Linux上是有优势的，因为能够获得更高效的I/O性能。

### 数据网络传输效率

	零拷贝（Zero Copy）技术，就是当数据在磁盘和网络进行传输时避免昂贵的内核态数据拷贝从而实现快速地数据传输。Linux平台实现了这样的零拷贝机制，但有些令人遗憾的是在Windows平台上必须要等到Java 8的60更新版本才能“享受”到这个福利。一句话总结一下，在Linux部署Kaffaa能够受到到零贝贝术术所带来快速数据传输特性。

### 社区支持度

## 分区策略

### 轮询

### 随机策略

### 自定义策略

### 其他分区策略

### 按消息键保序策略

## 保证消息不丢失

### 核心要素

```
已提交

有限度的持久化保证
```

### 丢失案例

```java
1. 不要使用producer.send(msg)，而要使用producer.send(msg, callback)。记住，一定要使用带有回调通
知的send方法。
2. 设置acks = all。acks是Producer的一个参数，代表了你对“已提交”消息的定义。如果设置成all，则表
明所有副本Broker都要接收到消息，该消息才算是“已提交”。这是最高等级的“已提交”定义。
3. 设置retries为一个较大的值。这里的retries同样是Producer的参数，对应前面提到的Producer自动重
试。当出现网络的瞬时抖动时，消息发送可能会失败，此时配置了retries > 0的Producer能够自动重试消
息发送，避免消息丢失。
4. 设置unclean.leader.election.enable = false。这是Broker端的参数，它控制的是哪些Broker有资格竞选
分区的Leader。如果一个Broker落后原先的Leader太多，那么它一旦成为新的Leader，必然会造成消息
的丢失。故一般都要将该参数设置成false，即不允许这种情况的发生。
5. 设置replication.factor >= 3。这也是Broker端的参数。其实这里想表述的是，最好将消息多保存几份，
毕竟目前防止消息丢失的主要机制就是冗余。
6. 设置min.insync.replicas > 1。这依然是Broker端参数，控制的是消息至少要被写入到多少个副本才算
是“已提交”。设置成大于1可以提升消息持久性。在实际环境中千万不要使用默认值1。
7. 确保replication.factor > min.insync.replicas。如果两者相等，那么只要有一个副本挂机，整个分区就无
法正常工作了。我们不仅要改善消息的持久性，防止数据丢失，还要在不降低可用性的基础上完成。推
荐设置成replication.factor = min.insync.replicas + 1。
8. 确保消息消费完成再提交。Consumer端有个参数enable.auto.commit，最好把它设置成false，并采用手
动提交位移的方式。就像前面说的，这对于单Consumer多线程处理的场景而言是至关重要的。
 // 消费者丢失案例
//维持先消费消息（阅），再更新位移（书签）的顺序
//如果是多线程异步处理消费消息，Consumer程序不要开启自动提交位移，而是要应用程序手动提交位移
```

## Kafaka拦截器

### 生产者

```java
//继承org.apache.kafka.clients.producer.ProducerInterceptor
//onSend：该方法会在消息发送之前被调用。
//onAcknowledgement：该方法会在消息成功提交或发送失败之后被调用。还记得我在上一期中提到的发
//送回调通知callback吗？onAcknowledgement的调用要早于callback的调用。值得注意的是，这个方法和
//onSend不是在同一个线程中被调用的，因此如果你在这两个方法中调用了某个共享可变对象，一定要保
//证线程安全哦。还有一点很重要，这个方法处在Producer发送的主路径中，所以最好别放一些太重的逻
//辑进去，否则你会发现你的Producer TPS直线下降。
```

### 消费者

```java
//继承org.apache.kafka.clients.producer.ProducerInterceptor
//onConsume：该方法在消息返回给Consumer程序之前调用。也就是说在开始正式处理消息之前，拦截器会先拦截一，之后再返回

//onCommit：Consumer在提交位移之后调用该方法。通常你可以在该方法中做一些记账类的动作，比如打日志等
```



# 概念

消息：Record。Kafka是消息引擎嘛，这里的消息就是指Kafka处理的主要对象。

主题：Topic。主题是承载消息的逻辑容器，在实际使用中多用来区分具体的业务。

分区：Partition。一个有序不变的消息序列。每个主题下可以有多个分区。

消息位移：Offset。表示分区中每条消息的位置信息，是一个单调递增且不变的值。

副本：Replica。Kafka中同一条消息能够被拷贝到多个地方以提供数据冗余，这些地方就是所谓的副本。
副本还分为领导者副本和追随者副本，各自有不同的角色划分。副本是在分区层级下的，即每个分区可配
置多个副本实现高可用。

生产者：Producer。向主题发布新消息的应用程序。

消费者：Consumer。从主题订阅新消息的应用程序。

消费者位移：Consumer Offset。表征消费者消费进度，每个消费者都有自己的消费者位移。

消费者组：Consumer Group。多个消费者实例共同组成的一个组，同时消费多个分区以实现高吞吐。

重平衡：Rebalance。消费者组内某个消费者实例挂掉后，其他消费者实例自动重新分配订阅主题分区的
过程。Rebalance是Kafka消费者端实现高可用的重要手段。



## 优势

解耦.冗余.扩展.峰值处理.可恢复性.异步通信



当消息小于10kb，入队性能redis好于MQ

ActiveMQ：XA事物



高吞吐量：每秒100万

消息持久化

完全分布式

同事满足适应在线流处理和离线处理

# CAP理论

## Consistency

一致性

### 解决方案

Master-slave

RDBMS的读写分离即为典型的Master-slave方案

异步复制

同步复制

## Availability

可用性

## Partitioner tolerance

分区容忍性

# 基础知识

## Topic

## Partition

## 过期

删除Segment的方式

基于时间

基于大小

## 配置文件

```shell
$ log.dirs=
.index # 索引
.log # 日志
```

# 源码剖析

## 消费者

### 分区消费

![PartitionConsumer](/Users/draven/Documents/documents/java/projects/draven-docs/0010Technology/0001 MQ/0002 KafKa/images\PartitionConsumer.png)

		直接由客户端使用kafka提供的协议向服务器发送RPC请求获取数据，服务器接收到客户端的RPC请求后，将数据构造成RPC响应，返回给客户端，客户端解析相应的RPC响应获取数据

		获取消息的FetchRequest 和 FetchResponse

		获取offset的OffsetRequest 和 OffsetResponse

		提交offset的OffsetCommitRequest 和 OffsetCommitResponse

		获取Metadata的Metadata Request 和 Metadata Response

		生产者的ProducerRequest 和 Producer Response

### 组消费

![GroupConsumer](/Users/draven/Documents/documents/java/projects/draven-docs/0010Technology/0001 MQ/0002 KafKa/images\GroupConsumer1.png)

![GroupConsumer](/Users/draven/Documents/documents/java/projects/draven-docs/0010Technology/0001 MQ/0002 KafKa/images\GroupConsumer2.png)



### 对比

![GroupConsumer](/Users/draven/Documents/documents/java/projects/draven-docs/0010Technology/0001 MQ/0002 KafKa/images\PC.png)

# 模型

## 消费者

### 分区消费模型

一对一

自己处理各种异常情况

需要自己管理offset

### 组消费模型

肯定能消费全量

不需要自己处理异常情况，不需要自己管理offset

只能实现kafka默认的最少一次消息传递语义

#### 分配算法

let N = size(PT)/size(CG)

from i * N to (i+1) * N - 1    0-1/2-3

PT:kafka的Partion 0 1 2 3

CG:Consumer实例数量 1 2

结果:

## 生产者

### 同步

至少一次

低消息丢失率

高消息重复率

高延迟

### 异步

低延迟

高发送性能

高消息丢失率

# 客户端实现

## java



# 架构

## Producer

sdk

push

实例化时即指定了broker

主动触发机制

周期性的刷新

### Sync Producer

### Aync Producer

## Broker

server



## Consumer

sdk

主动pull

实例化时，从zookeeper中获取

### Pull Vs Push

Push

优势：延时低

劣势：可能造成Consumer来不及处理小时，网络拥塞

Pull

优势：根据自己的能力获取

劣势：处理不好实时性不好--long polling

### High Level



Rebalance

### Low Level







## Zookeeper

# 部署





## 工具

mobaxterm

clustershell



### 简单部署

```shell
$ lsof -i:2181
```

zookeeper

kafka



```shell
1、启动Kafka
bin/kafka-server-start.sh config/server.properties &

2、停止Kafka
bin/kafka-server-stop.sh

3、创建Topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic jiangzh-topic

4、查看已经创建的Topic信息
bin/kafka-topics.sh --list --zookeeper localhost:2181

5、发送消息
bin/kafka-console-producer.sh --broker-list 192.168.220.128:9092 --topic jiangzh-topic

6、接收消息
bin/kafka-console-consumer.sh --bootstrap-server 192.168.220.128:9092 --topic jiangzh-topic --from-beginning
bin/kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 --topic jiangzh-topic --from-beginning


{"orderId":"002","price":"80"}
```

```shell
./kafka-manager 

vi conf/application.conf

127.0.0.1:2181
```

```shell
## connect启动命令
bin/connect-distributed.sh -daemon config/connect-distributed.properties
bin/connect-distributed.sh config/connect-distributed.properties


http://127.0.0.1:8083/connector-plugins

http://127.0.0.1:8083	


curl -X POST -H 'Content-Type: application/json' -i 'http://127.0.0.1:8083/connectors' \
--data \
'{"name":"imooc-upload-mysql","config":{
"connector.class":"io.confluent.connect.jdbc.JdbcSourceConnector",
"connection.url":"jdbc:mysql://127.0.0.1:3306/db_account?user=root&password=12345678",
"table.whitelist":"account_tbl",
"incrementing.column.name": "uuid",
"mode":"incrementing",
"topic.prefix": "imooc-mysql-"}}'

bin/kafka-console-consumer.sh --bootstrap-server 192.168.220.128:9092 --topic imooc-mysql-users --from-beginning

bin/kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 --topic imooc-mysql-account_tbl --from-beginning

curl -X POST -H 'Content-Type: application/json' -i 'http://192.168.220.128:8083/connectors' \
--data \
'{"name":"imooc-download-mysql","config":{
"connector.class":"io.confluent.connect.jdbc.JdbcSinkConnector",
"connection.url":"jdbc:mysql://192.168.0.104:3306/kafka_study?user=root&password=123456",
"topics":"imooc-mysql-users",
"auto.create":"false",
"insert.mode": "upsert",
"pk.mode":"record_value",
"pk.fields":"uuid",
"table.name.format": "users_bak"}}'


bin/kafka-console-consumer.sh --bootstrap-server 192.168.220.128:9092 --topic test-mysql-jdbc-users --from-beginning


curl -X DELETE -i 'http://192.168.220.128:8083/connectors/load-mysql-data'
```







```shell
# 下载export
https://github.com/danielqsj/kafka_exporter/releases
# 运行export
./kafka_exporter --kafka.server=127.0.0.1:9092

# 
```



# Partitioner

```java
/**
* HashPartitiner
*/
public class HashPartitioner implements Partitioner{
   
    public HashPartitioner(){}
    
    @Override
    public int partitioner(Onject key,int numPartitions){
        if((key instanceof Integer)){
            return Math.abs(Integer.parseInt(key.toString()))% numPartitions;
        }
        return Math.abs(key.hashCode()% numPartitions);
    }
}       
    
// RoundRobinPartitioner
```







# kafka API



## Consumer

```shell
org.apache.kafka.clients.consumer.ConsumerConfig
```



## Producer

```shell
org.apache.kafka.clients.producer.ProducerConfig
```



## AdminClient

```shell
org.apache.kafka.clients.admin.AdminClientConfig
```



## Stream

```shell
# StreamsConfig
org.apache.kafka.streams.StreamsConfig
```

## Connector

```shell
# Connector
```



# 参数介绍

## Broker参数

### 数据存储

log.dirs：这是非常重要的参数，指定了Broker需要使用的若干个文件目录路径。要知道这个参数是没
有默认值的

​	CSV格式

​	例如：/home/kafka1,/home/kafka2,/home/kafka3

log.dir：注意这是dir，结尾没有s，说明它只能表示单个路径，它是补充上一个参数用的。



### zookeeper

zookeeper.connect



### Broker连接相关

listeners

advertised.listeners

### Topic管理

auto.create.topics.enable：是否允许自动创建Topic。
unclean.leader.election.enable：是否允许Unclean Leader选举。
auto.leader.rebalance.enable：是否允许定期进行Leader选举。

### 数据留存

log.retention.{hour|minutes|ms}：这是个“三兄弟”，都是控制一条消息数据被保存多长时
间。从优先级上来说ms设置最高、minutes次之、hour最低。
log.retention.bytes：这是指定Broker为消息保存的总磁盘容量大小。
message.max.bytes：控制Broker能够接收的最大消息大小。

### JVM

KAFKA_HEAP_OPTS：指定堆大小。
KAFKA_JVM_PERFORMANCE_OPTS：指定GC参数。





# Kafka



高吞吐率 100万/s

消息持久化 所有消息均被持久化到磁盘 无消息丢失 支持消息重放

完全分布式  Producer Broker Consumer

同时满足适应在线流处理和离线批处理



replication 4 > available brokers3 error



# 高性能

## 高效使用磁盘

1.高效使用磁盘

顺序写磁盘

2.Append Only

3.充分利用Page Cache

4.支持多Directory（可使用多Drive）

## 零拷贝

## 批处理和压缩

## Partition

## ISR

实现了可用性和一致性的动态平衡



# 环境搭建



## zookeeper

参考文档 http://zookeeper.apacher.org/doc/r3.4.9/zookeeperStarted.html

### Kafka







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



# 监控

https://github.com/habren/kafaka-docker





# 架构

如何建立关系 0.8之前依赖于zookeeper

## Producer

1.主动触发 刷新broker信息 

2.周期性的

## Broker 



## Consumer 

如何建立关系

pull 模式 consumer主动获取，根据实际处理能力消费消息

## Zookeeper



### Topic

同一个Topic的消息分布在一个



### Partition

过期策略 删除过期策略 删除一个或多个segment





## 配置文件

log.dirs=/xxx

### 解释说明

```shell
# 命名方式
*.index
*.log
```



# Partitioner

```java
// 策略
HashPartitioner
// key相同发送到同一个Broker

RoundRobinPartitioner
// 顺序
```





# 同步与异步

## Sync

低延迟

低吞吐率

无数据丢失

## Aync

高延迟

高吞吐率

可能会有数据丢失



# Replica

# 数据复制

面临问题

1.如何Propagate

2.何时commit

3.如何处理Replica恢复

4.如何处理Replica全部宕机

## Propagate

复制过程

leader->follower

follower保证leader挂了自己能及时对外提供服务



### ISR机制

Leader会维护一个与其基本保持同步的Replica列表 ISR

follower比leader落后太多，或超过一定时间未放弃数据复制请求 则Leader将其从ISR中移除

当ISR中所有Replica都想LEader发送ACK时，Leader即commit



## Commit

### commit策略

#### server配置

Replica.lag.time.max.ms=10000 # 移除超时时间

Replica.lag.max.messages=4000 # 存在落后条数

#### Topic配置

min.insync.replica=1

#### Producer配置

Request.required.acks=0

## Replica恢复

![kafka01](/Users/draven/Documents/documents/java/projects/draven-docs/0010Technology/0001 MQ/images/kafka01.png)



## Replica全部宕机

等待ISR中任一Replica恢复，并选它为Leader CP

1.等待时间较长

2.或ISR中的所有Replica都无法回复或者数据丢失，则该partition将永久不可用

选择第一个回复的Replica为新的Leader,无论它是否在ISR中 AP（默认配置）

1.并未包含所有已被之前Leader Commit过的消息，因此会造成消息丢失

2.可用性比较高





# kafka如何使用



# zookeeper

## 介绍

包含一个Leader，多个Follower

所有的follower都可提供服务

所写的擦欧哦都会被forward到Leader

Client与Server通过NIO通信

全局串行化所有的写操作

保证同一客户端的指令被FIFO执行

保证消息通知的FIFO

## Zab协议

### 广播模式

1.Leader将所有更新（proposal），顺序发送给follower

2.当leader收到半数以上的follower对此proposal的ACK时，向所有follower发送commit消息，并在本地commit该消息

3.Follower收到Proposal后即将该proposal写入磁盘，写入成功即返回ACK给Leader

4.每个Proposal都有一个唯一的单调递增proposal ID

### 恢复模式

进入恢复模式：当leader宕机或者丢失大多数follower后，即进入恢复模式

结束恢复模式：

恢复模式的意义：







# Cap理论

## Consistency

一致性

## Availablity

可用性 有限时间内返回合理的结果

## Partition tolerance

分区容忍性





cp强一致性 数据不一致 马上返回错误

ap保证可用 数据不一致时 保证返回结果





实例

CA

RDBMS

AP

Cassandra

CP

redis

## 一致性方案

## Master-slave

同步复制

异步复制

## WNR

P2P分布式

N代表赴本书 W代表每次读写要保证的最少些成功的副本数 R代表每次读至少读区的副本数

## Paxos

RAFT





![kafka02](/Users/draven/Documents/documents/java/projects/draven-docs/0010Technology/0001 MQ/images/kafka02.png)



# 参考资料

 http://www.jasongj.com
