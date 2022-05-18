


# 简单介绍 #



获取 调用 转发

针对linux安装的
缓冲级别

特点：
高并发
大数据
高扩展

概念：
集群

最多16个
系统默认0 库
只用一个库
误操作

关系型数据库：SQL
非关系型数据库NoSQL

web2.0:用户维护数据
web1.0:后台管理数据

SNS社交网站
BBS论坛网站


四类：
键值对：内容缓存，处理大量数据的高访问负载
列：分布式
文档：web应用
图形：社交网站


5大类 	
	字符串类型
	规范：

# linux安装redis单机版（非Docker版本） #
nosql
	什么是nosql
	nosql的作用
	nosql的分类
redis
	redis的由来
	什么是redis
	redis的应用场景
安装redis
简单应用
java操作redis(jedis)
redis中类型
redis中通用命令
redis的特性

	NoSQL概述：
	解决的问题：3高

	redis数据库：可以使用缓存

	make：此命令要在redis软件解压目录下执行。

	启动：
		./redis-server redis.conf
	登录：
		./redis-cli
	
	数据类型：
		String*****
			set  key value        get key
		hash
		list
		set
		sortedSet

	jedis技术：
		1、导包
		2、编写代码
		3、运行（打开防火墙）


启动多个redis
将解压目录复制一个
端口改一下
./redis-server ./redis.conf --port 6380（修改之后）


这个比较好指定了端口
cp -r redis/ redis6380


修改redis.conf
vim redis.conf


一个一个进行启动



测试ping   pang

查看进程
ps aux | grep -i redis

编译依赖c++环境
yum install gcc-c++

解压
tar -xvf redis-3.0.7.tar.gz 

进入
cd redis-3.0.7

执行
make

再执行
安装（位置可以自己选）
make PREFIX=/usr/local/src/x86/redis install


bin 目录下 启动 ./redis-server 
但是不能后台启动


cp redis.conf /usr/local/src/x86/redis 

vi redis.conf
本页码倒数第四行
no>>>>>yes
esc :qw


bin ./redis-server redis.conf

./redis-cli



登录别人的redis ./bin/redis-cli -h 192.xxx.xxx.xxx -p 6379（端口）


强制结束
kill -9 (154548)pid

查询pid 
ps aux | grep -i redis 

正确停止
默认端口
./bin/redis-cli shutdown
指定端口
./bin/redis-cli-p 端口 shutdown


java代码链接抛异常
设置防护墙
vim /etc/sysconfig/iptables

service iptables restart

# linux安装redis集群（非Docker版本） #
遇到两个问题
一、redis安装zmalloc.h:50:31: 致命错误：jemalloc/jemalloc.h：没有那个文件或目录
执行 make MALLOC=libc 可以解决

二、不识别gem命令
执行可以解决 yum install ruby
		yum install rubygems

查看进程
ps aux | grep -i redis

编译依赖c++环境
yum install gcc-c++

安装步骤

make PREFIX=/usr/local/src/redis-cluster/redis01 install


cp redis.conf /usr/local/src/redis-cluster/redis01/bin/


cd  /usr/local/src/redis-cluster/redis01/bin/
编辑redis.conf，完成以下三件事

	后台启动
daemonize no-->>yes

	端口
port (自己定)

	开启集群功能（去掉注释）
#cluster-enabled yes

./redis-server ./redis.conf

复制5份redis
cp -r redis01 /usr/local/src/redis-cluster/redis06
依次修改端口信息
vim redis06/bin/redis.conf 

加入集群环境
解压后redis中的复制到redis-cluster中
cp redis/src/redis-trib.rb /usr/local/src/redis-cluster/

安装gem（redis与ruby接口的脚本文件）

启动太麻烦 编写脚本一起启动

start-all.sh
cd redis01/bin/
./redis-server ./redis.conf
cd ../..
cd redis02/bin/
./redis-server ./redis.conf
cd ../..
cd redis03/bin/
./redis-server ./redis.conf
cd ../..
cd redis04/bin/
./redis-server ./redis.conf
cd ../..
cd redis05/bin/
./redis-server ./redis.conf
cd ../..
cd redis06/bin/
./redis-server ./redis.conf
cd ../..


查看进程
ps -ef | grep redis

安装redis-3.0.0.gem
gem install redis-3.0.0.gem 

cp redis-trib.rb /usr/local/src/redis-cluster/
执行
固定：./redis-trib.rb create --replicas
格式：192.168.200.128:7001

内容：
./redis-trib.rb create --replicas 1 192.168.124.129:6379 192.168.124.129:6380 192.168.124.129:6381 192.168.124.129:6382 192.168.124.129:6383 192.168.124.129:6384 

./redis-trib.rb create --replicas 1 192.168.200.136:7001 192.168.200.136:7002 192.168.200.136:7003 192.168.200.136:7004 192.168.200.136:7005 192.168.200.136:7006



./redis-cli -p 7001 -c 启动任一


nodes-6379.conf

进入集群命令：./redis-cli -c -p 6382


由于shell脚本在windows机器上进行编辑，拷贝至服务器由于结束字符集的问题而造成。
解决方案：
使用vi命令进行编辑该文件，进入后输入:set ff=unix 回车，wq保存退出即可。
再次运行，则不会提示该错误信息。



https://blog.51cto.com/xiangcun168/1923302




## 其他未整理操作 ##
nosql	
	no only sql 不仅仅是sql
	一般称之为非关系型数据库
	web2.0存在一些问题:(3高)
		1.高并发
		2.大数据
		3.高扩展,高可用
	分类:
		key/value的格式
		文档型格式
		列类型
		图
redis是使用c语言开发的一个高性能键值对的数据库
	支持的数据类型如下
		String(★)
		hash(理解)
		list
		set
		sortedSet(zset)

redis的安装
	1.下载redis
	2.上传到linux
	3.安装redis	
		mkdir /usr/local/redis
		mv /root/redis.tar /usr/local/redis
		cd /usr/local/redis
		tar -xvf redis.tar
	4.编译redis 依赖 gcc
		yum install gcc-c++

	注：make要在自己解压的包下执行！！！
		make 编译
	5.安装redis
		make PREFIX=/usr/local/redis install
	6.配置
		复制一个redis.conf 到bin目录下
		启动服务器的方式1:	
			前台启动的方式:
				cd /usr/local/redis/bin
				./redis-server redis.conf
			后台的方式:
				配置一下redis.conf
					修改:daemonize yes
				保存退出:wq
		启动客户端
			简单的方式:
				./redis-cli    #连接本地端口号为 6379的服务器
			推荐的方式
				./redis-cli -h 连接ip -p 端口号
				
	redis的停止
		方式1:通过kill -9 进程号(不推荐)
		方式2:通过客户端发送命令
			./redis-cli -h ip -p port shutdown
			
数据类型
	string
		掌握的操作:
			赋值
				格式: set key value
				例如:set username tom
			取值
				格式: get key
				例如: get username
				
			先获取再设置
				getset key value
				例如: getset username jack
				
			删
				del key
				例如: del d
		
		了解:
			对于数字类型 自增和自减
			incr key   ++
			decr key   --
			
			增加或减少指定的数量
				incrby key int
				decrby key int
			拼接字符串
				append key value
					
			
	list
		赋值:
			左边:lpush key value value2 value3
			右边:rpush key value value2 value3
		取值:
			左边:lpop key  
			右边:rpop key
			
		获取所有元素
			lrange key  0 -1
		获取元素的个数
			llen key
			
		扩展:
			lpushx key value :若有则添加 若没有则不添加
			rpushx key value :若有则添加 若没有则不添加
			
			lrem key count value:从左边移除count个value
				若count>0 :从左边移除count个value
				若count<0 :从右边移除count个value
				若count=0 :从右边移除所有的value
			
			lset key index value
				设置链表中指定索引的元素值  0 代表是第一个
					-1代表的是最后一个
			linsert key before|after oldValue  newValue
				在oldValue之前或之后添加newValue  
		
	hash:
		了解
		即存入一个map集合
			user  	  username      tom
				  age 		18
				  sex		1
		存值:
			存入一个值
				hset key subkey subvalue
			存入多个值
				hmset key subkey1 subvalue1 subkey2 subvalue2
				
		获取:
			获取一个值
				hget key subkey
			获取多个值
				hmget key subkey1 subkey2
				
		移除值:
			hdel key subkey subkey
		给一个key添加指定的数字
			hincrby key subkey int
				
		
	set
		添加
			sadd key value1 valuse2
		删除
			srem key value1 valuse2
		获取
			smembers key 
		判断是否是是set中的一员
			sismember key value
		
		运算
			差集: sdiff s1 s2
			交集: sinter s1 s2 
			并集: sunion s3 s4
		
		获取数量
			scard key
			srandmember key:随机获取一个
			
			
		
		
	sortedSet
		添加元素
			zadd key score m1 score m2
		获取元素
			zscore key m:获取指定成员的得分
			zcard key:获取key的长度
			
			
		删除元素
			zrem
			
			
通用的操作:
	keys * :查看所有的key
	del key:删除指定的key
	exists key:判断一个key是否存在
	rename oldkey newkey:重命名
	expire key 秒数:
	ttl key :查看一个key剩余存活时间
		-1:持久存活
		-2:不存在
	type 判断一个可以属于什么类型
		
	
				
				
	
