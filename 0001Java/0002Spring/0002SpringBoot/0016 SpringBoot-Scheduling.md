# SpringBoot-Scheduling

来源：精讲Java定时任务框架Elastic-Job和Quartz



2018版本3.4.13

# Elastic-job

```shell
分布式调度方案
一个任务 拆分成多个独立的任务项 每个服务获得一个或几个分片项
不直接提供数据处理能力

作业高可用

遍历数据库某张表的作业 两台服务器
每台服务器执行任务的一般  奇数 偶数


3种类型

Simple

Dataflow流式任务及流式任务概念

Script类型任务

依赖Zookeeper
```

```xml
<properties>
  <elastic-job.version>2.1.5</elastic-job.version>
</properties>
<dependency>
    <groupId>com.dangdang</groupId>
    <artifactId>elastic-job-lite-core</artifactId>
    <version>2.1.5</version>
</dependency>
```

## Simple

```shell
提供了弹性扩容和分片功能
实现SimpleJob接口，只需要实现execute方法即可

配置作业
定义作业核心配置
	作业名称 定时策略 分片总数
定义作业类型
	Simple Dataflow 实现类的全包名
定义Lite作业根配置
	overwrite属性的重要性
	
配置注册中心
	Zookeeper ip 端口 namespace

```

## Dataflow

```shell
用于处理流式作业
	数据抓取 fetchData 
	数据处理 processData
	
定时任务根据规则触发
抓取
处理数据
处理完数据 再次抓取
若数据存在 则继续处理 若不存在 则本次任务结束
等待任务规则 下次触发

场景
	适用于不间歇的数据处理
		比如第三方订单抓取
		
		
	实现DataflowJob接口
		注意DataflowJob<T>范型 
			规定了抓取数据的返回值类型
			规定了处理数据的传入参数
			
```

## Script

```shell
支持 Shell Python perl等
			
```

