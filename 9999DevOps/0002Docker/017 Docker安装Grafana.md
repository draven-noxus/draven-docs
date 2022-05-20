# Grafana

​	Grafana是一个可视化面板（Dashboard），有着非常漂亮的图表和布局展示，功
​	能齐全的度量仪表盘和图形编辑器。支持Graphite、zabbix、InfluxDB、Prometheus和
​	OpenTSDB作为数据源。
​	Grafana主要特性：灵活丰富的图形化选项；可以混合多种风格；支持白天和夜间模式；
​	多个数据源。
1.拉取
docker pull grafana/grafana


2.运行
docker run -d -p 3001:3000 -e INFLUXDB_HOST=influxsrv -e INFLUXDB_PORT=8086 -e INFLUXDB_NAME=cadvisor -e INFLUXDB_USER=cadvisor -e INFLUXDB_PASS=cadvisor --link influxsrv:influxsrv --name grafana grafana/grafana

3.访问
http://192.168.200.134:3001

admin:admin




docker run -d -p 3000:3000 --name=grafana -v /docker/grafana:/var/lib/grafana grafana/grafana

