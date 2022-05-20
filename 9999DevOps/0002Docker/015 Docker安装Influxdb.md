Influxdb
	influxDB是一个分布式时间序列数据库。cAdvisor仅仅显示实时信息，但是不存储
	监视数据。因此，我们需要提供时序数据库用于存储cAdvisor组件所提供的监控信息，
	以便显示除实时信息之外的时序数据。
1.拉取
docker pull tutum/influxdb

2.运行

```shell
docker run -di \
-p 8083:8083 \
-p 8086:8086 \
-v influxdb:/var/lib/influxdb \
--expose 8090 \
--expose 8099 \
--name influxsrv \
tutum/influxdb 
# docker.io/influxdb
```

3.访问
http://192.168.200.134:8083

4.相关操作

创建数据库
CREATE DATABASE "cadvisor"
回车创建数据库
SHOW DATABASES
