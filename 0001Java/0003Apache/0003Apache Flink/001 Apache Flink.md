# Apache Flink

## 参考

```shell
# https://flink.apache.org/

# curl https://mirrors.bfsu.edu.cn/apache/flink/flink-1.11.2/flink-1.11.2-bin-scala_2.12.tgz

# tar -zxvf flink-1.11.2-bin-scala_2.12.tgz /


# 页面链接
# http://localhost:8081/#/overview
```

## 搭建模式

```shell
# Local
./bin/start-cluster.sh

./bin/stop-cluster.sh


# Standalone
vi flink-conf.yaml

# 主要更改的位置有: 
jobmanager.rpc.address: 172.17.0.143 taskmanager.numberOfTaskSlots: 2 
parallelism.default: 4
#取消下面两行的注释 
rest.port: 8081 
rest.address: 0.0.0.0

# 参数解释
# jobManager 的IP地址 
jobmanager.rpc.address: 172.17.0.143
# JobManager 的端口号 
jobmanager.rpc.port: 6123
# JobManager JVM heap 内存大小 
jobmanager.heap.size: 1024m
# TaskManager JVM heap 内存大小 
taskmanager.heap.size: 1024m
# 每个 TaskManager 提供的任务 slots 数量大小，默认为1
taskmanager.numberOfTaskSlots: 2
# 程序默认并行计算的个数，默认为1 
parallelism.default: 4


# 配置 masters文件
vi masters
localhost:8081


# 配置 workers文件
localhost
localhost
localhost


# 启动
./start-cluster.sh

./bin/stop-cluster.sh
```

## 实例工程

```shell
#  打开端口 
yum -y install nc
# nc -l port
nc -l 9010
```

### 提交应用

```shell
# 1 命令行
# ./bin/flink run /xxx/demo.jar --port [args]
./bin/flink run /xxx/demo.jar --port 9010

# 2 界面操作
# http://localhost:8081/#/submit-> add view
```

## 创建工程

```shell
mvn archetype:generate -DarchetypeGroupId=org.apache.flink -DarchetypeArtifactId=flink-quickstart-java -DarchetypeVersion=1.11.2
```







# 基本概念

## DataStream 与 DataSet

将它们视为可以包含重复项的**不可变**数据集合。

DataSet是有限数据集(比如某个数据文件)；

DataStream的数据可以是无限的(比如kafka队列中 的消息)。

# 数据类型

java元组 Scala案例

Java POJO

原始类型

常规类

值

Hadoop Writables

## 数据操作

## 窗口含义

EventTime: 事件发生的时间 

IngestionTime:事件进入 Flink 的时间 

ProcessingTime:事件被处理时的时间

## 有状态的流处理





# DataStream编程

流之间的相互转换

## 输入流

## 数据流转换

## 输出流

# DataSet







```java
Java HotSpot(TM) 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended

// idea -> async -> instrumenting agent(requires debugger restart)
  
错误: 无法初始化主类 com.noxus.draven.flink.StreamingJob
原因: java.lang.NoClassDefFoundError: org/apache/flink/api/common/functions/FlatMapFunction
  
// 查找 当前范围内的 
// edit configurations
// 勾选 Include dependencies with “Provided” scope
  
  
  
Exception in thread "main" java.lang.RuntimeException: No data sinks have been created yet. A program needs at least one sink that consumes data. Examples are writing the data set or printing it.

```





# Apache Druid

