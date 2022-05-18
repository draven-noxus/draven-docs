# Cadvisor

​	Google开源的用于监控基础设施应用的工具，它是一个强大的监控工具，不需要任
​	何配置就可以通过运行在Docker主机上的容器来监控Docker容器，而且可以监控Docker
​	主机。更多详细操作和配置选项可以查看Github上的cAdvisor项目文档
1.拉取
docker pull google/cadvisor

2.运行
docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=8084:8080 --detach=true --link influxsrv:influxsrv --name=cadvisor google/cadvisor -storage_driver=influxdb -storage_driver_db=cadvisor -storage_driver_host=influxsrv:8086

3.访问
http://192.168.200.134:8084/containers/
