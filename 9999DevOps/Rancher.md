# Rancher

​	Rancher是一个开源的企业级全栈化容器部署及管理平台。Rancher为容器提供一揽
子基础架构服务：CNI兼容的网络服务、存储服务、主机管理、负载均衡、防护墙……
Rancher让上述服务跨越公有云、私有云、虚拟机、物理机环境运行，真正实现一键式应
用部署和管理

链接：https://www2.cnrancher.com/

https://rancher.com/

https://rancher.com/quick-start/



## rancher-server/rancher-client

```shell
$ docker pull rancher/server

$ sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher

$ docker run ‐d ‐‐name=rancher ‐‐restart=always ‐p 9090:8080 rancher/server

# 重启策略
# no，默认策略，在容器退出时不重启容器
# on-failure，在容器非正常退出时（退出状态非0），才会重启容器
# on-failure:3，在容器非正常退出时重启容器，最多重启3次
# always，在容器退出时总是重启容器
# unless-stopped，在容器退出时总是重启容器，但是不考虑在Docker守护进程启动
# 时就已经停止了的容器


```

访问：http://192.168.200.134:9090

运行过程

```shell
sudo docker run --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v1.2.11 http://192.168.200.134:9090/v1/scripts/42BBA1DCC1E34A206DB2:1546214400000:Z3QPtXrjT3ZhafzoYz1396mxo

INFO: Running Agent Registration Process, CATTLE_URL=http://192.168.200.134:9090/v1
INFO: Attempting to connect to: http://192.168.200.134:9090/v1
INFO: http://192.168.200.134:9090/v1 is accessible
INFO: Configured Host Registration URL info: CATTLE_URL=http://192.168.200.134:9090/v1 ENV_URL=http://192.168.200.134:9090/v1
INFO: Inspecting host capabilities
INFO: Boot2Docker: false
INFO: Host writable: true
INFO: Token: xxxxxxxx
INFO: Running registration
INFO: Printing Environment
INFO: ENV: CATTLE_ACCESS_KEY=8DACE6CBB4D2AF87613F
INFO: ENV: CATTLE_HOME=/var/lib/cattle
INFO: ENV: CATTLE_REGISTRATION_ACCESS_KEY=registrationToken
INFO: ENV: CATTLE_REGISTRATION_SECRET_KEY=xxxxxxx
INFO: ENV: CATTLE_SECRET_KEY=xxxxxxx
INFO: ENV: CATTLE_URL=http://192.168.200.134:9090/v1
INFO: ENV: DETECTED_CATTLE_AGENT_IP=172.17.0.1
INFO: ENV: RANCHER_AGENT_IMAGE=rancher/agent:v1.2.11
INFO: Deleting container rancher-agent
INFO: Launched Rancher Agent: a6fc3225211c5e28459dd54c19e78a83f4819eeb8f4c40b8e017939adbb80fa9
```



## 添加主机

搭建服务--->当前站点--->选择主机类型--->确认防火墙--->添加标签--->指定主机公网(必填agent的ip)--->复制脚本(客户端使用)--->搭建agent--->执行复制命令--->基础架构--->主机-->添加应用

## 扩容缩容

### 手动扩容

API-->WebHooks-->添加接收器-->扩容/缩容-->目标服务-->步长-->最小/最大数量-->创建-->复制触发-->POST请求

# Influxdb

​		influxDB是一个分布式时间序列数据库。cAdvisor仅仅显示实时信息，但是不存储
监视数据。因此，我们需要提供时序数据库用于存储cAdvisor组件所提供的监控信息，
以便显示除实时信息之外的时序数据。

```shell
$ docker pull tutum/influxdb

$ docker run -di \
-p 8083:8083 \
-p 8086:8086 \
--expose 8090 \
--expose 8099 \
--name influxsrv \
tutum/influxdb
```

3.访问
http://192.168.200.134:8083

4.相关操作

```shell
# 创建数据库

CREATE DATABASE "cadvisor"

# 回车创建数据库

# 查看数据库

SHOW DATABASES

# 创建用户并授权

# 创建用户
CREATE USER "cadvisor" WITH PASSWORD 'cadvisor' WITH ALL PRIVILEGES
# 查看用户
SHOW USRES
# 用户授权
grant all privileges on cadvisor to cadvisor
grant WRITE on cadvisor to cadvisor
grant READ on cadvisor to cadvisor

# 查看采集的数据
# 切换到cadvisor数据库，使用以下命令查看采集的数据
SHOW MEASUREMENTS
```

#  cAdvisor

​		Google开源的用于监控基础设施应用的工具，它是一个强大的监控工具，不需要任何配置就可以通过运行在Docker主机上的容器来监控Docker容器，而且可以监控Docker主机。更多详细操作和配置选项可以查看Github上的cAdvisor项目文档

链接：https://blog.csdn.net/ZHANG_H_A/article/details/530970

1.拉取

```shell
$ docker pull google/cadvisor
```

2.运行

```shell
$ docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=8084:8080 --detach=true --link influxsrv:influxsrv --name=cadvisor google/cadvisor -storage_driver=influxdb -storage_driver_db=cadvisor -storage_driver_host=influxsrv:8086
```

3.访问
http://192.168.200.134:8084/containers/

# Grafana

​		Grafana是一个可视化面板（Dashboard），有着非常漂亮的图表和布局展示，功能齐全的度量仪表盘和图形编辑器。支持Graphite、zabbix、InfluxDB、Prometheus和OpenTSDB作为数据源。
​		Grafana主要特性：灵活丰富的图形化选项；可以混合多种风格；支持白天和夜间模式；多个数据源。
1.拉取

```shell
$ docker pull grafana/grafana
```

2.运行

```shell
$ docker run -d -p 3001:3000 -e INFLUXDB_HOST=influxsrv -e INFLUXDB_PORT=8086 -e INFLUXDB_NAME=cadvisor -e INFLUXDB_USER=cadvisor -e INFLUXDB_PASS=cadvisor --link influxsrv:influxsrv --name grafana grafana/grafana
```

3.访问
http://192.168.200.134:3001

admin:admin

4.添加数据源

点击设置，DataSource

为数据源起个名称，指定类型、地址、以及连接的数据库名、用户名和密码

```shell
# name
# type
# url	InfluxDB 的配置
# access
# InfluxDB Details
	# InfluxDB 数据库名称
	# User
	# Password
```

5.添加仪表盘

```shell
# Dashboards --Manager
# 点击“添加”按钮
# 点击Graph 图标
# 点击Panel Title 选择Edit (编辑)

# General 修改panel名字
# Metrics
	# Data Source Influxdb（刚才配置的InfluxDB）
		# FROM defult memory_usage WHERE container_name 'xxx'
# Axes
# Legend
# Display
# Alert
# Time range

```

6.预警通知设置

```shell
# 选择菜单 alerting--> Notification channels
# 点击Add channel 按钮
	# Name
	# webhooks rancher 扩/缩容链接
	# 保存 并 测试
```

7.仪表盘预警设置

```shell
# 再次打开刚刚编辑的仪表盘
# 点击 Create Alert
# Alert Config 选择预警线
# Notifications 选择通知 选择刚才的 仪表信息
```

