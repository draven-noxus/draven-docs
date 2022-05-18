# Apache Kafka

是消息引擎系统，也是一个分布式流处理平台（Distributed Streaming Platform）。

# 介绍

​		使用的是纯二进制的字节序列。当然消息还是结构化的，只是在使用之前都要将其转换成二进制的字节序列

## 三层消息

​	第一层是主题层，每个主题可以配置M个分区，而每个分区又可以配置N个副本。
​	第二层是分区层，每个分区的N个副本中只能有一个充当领导者角色，对外提供服务；其他N-1个副本是
追随者副本，只是提供数据冗余之用。
​	第三层是消息层，分区中包含若干条消息，每条消息的位移从0开始，依次递增。
最后，客户端程序只能与分区的领导者副本进行交互。

### 高可用

#### 集群

​	将不同的Broker分散运行在不同的机器上

#### 备份机制

​	Leader-Follower

​	工作机制：生产者总是向领导者副本写消息；而消费者总是从领导者副本读消息。至于追随
者副本，它只做一件事：向领导者副本发送请求，请求领导者把最新生产的消息发给它，这样它能保持与领
导者的同步

​	领导者副本（Leader Replica） 对外提供服务

​	追随者副本（Follower Replica）不对外提供服务



​	？解决伸缩性？

#### Partitioning

​	Kafka中的分区机制指的是将每个主题划分成多个分区（Partition），每个分区是一组有序的消息日志。生产者生产的每条消息只会被发送到一个分区中，也就是说如果向一个双分区的主题发送一条消息，这条消息要么在分区0中，要么在分区1中。如你所见，Kafka的分区编号是从0开始的，如果Topic有100个分区，那
么它们的分区号就是从0到99

## 持久化数据

​	使用消息日志（Log）来保存数据，一个日志就是磁盘上一个只能追加写（Append-only）消息的物理文件。

​	因为只能追加写入，故避免了缓慢的随机I/O操作，改为性能较好的顺序I/O写操作，这也是实现Kafka高吞

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

​	优势在于迭代速度快，社区响应度高，使用它可以让你有更高的把控度；缺陷在于仅提供基础核心组件，缺失一些高级的特性。

### Confluent Kafka

​	跨数据中心备份、Schema注册中心以及集群监控工具等

​	优势在于集成了很多高级特性且由Kafka原班人马打造，质量上有保证；缺陷在于相关文档资料不全，普及率较低，没有太多可供参考的范例

### Cloudera/Hortonworks Kafka (CDH/HDP Kafka)

​	大数据云公司提供的Kafka，内嵌Apache Kafka。优势在于操作简单，节省运维成本；
缺陷在于把控度低，演进速度较慢。

## 版本号

略

## 部署环境(linux)

需考虑以下三个方面

### I/O模型的使用

​	Kafka客户端底层使用了Java的selector，selector在Linux上的实现机制是epoll，而在Windows平台上的实现机制是select。因此在这一点上将Kafka部署在Linux上是有优势的，因为能够获得更高效的I/O性能。

### 数据网络传输效率

​	零拷贝（Zero Copy）技术，就是当数据在磁盘和网络进行传输时避免昂贵的内核态数据拷贝从而实现快速地数据传输。Linux平台实现了这样的零拷贝机制，但有些令人遗憾的是在Windows平台上必须要等到Java 8的60更新版本才能“享受”到这个福利。一句话总结一下，在Linux部署Kaffaa能够受到到零贝贝术术所带来快速数据传输特性。

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

![PartitionConsumer](images\PartitionConsumer.png)

​		直接由客户端使用kafka提供的协议向服务器发送RPC请求获取数据，服务器接收到客户端的RPC请求后，将数据构造成RPC响应，返回给客户端，客户端解析相应的RPC响应获取数据

​		获取消息的FetchRequest 和 FetchResponse

​		获取offset的OffsetRequest 和 OffsetResponse

​		提交offset的OffsetCommitRequest 和 OffsetCommitResponse

​		获取Metadata的Metadata Request 和 Metadata Response

​		生产者的ProducerRequest 和 Producer Response

### 组消费

![GroupConsumer](images\GroupConsumer1.png)

![GroupConsumer](images\GroupConsumer2.png)



### 对比

![GroupConsumer](images\PC.png)

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