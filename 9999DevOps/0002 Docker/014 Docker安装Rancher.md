# Rancher

​	Rancher是一个开源的企业级全栈化容器部署及管理平台。Rancher为容器提供一揽
子基础架构服务：CNI兼容的网络服务、存储服务、主机管理、负载均衡、防护墙……
Rancher让上述服务跨越公有云、私有云、虚拟机、物理机环境运行，真正实现一键式应
用部署和管理
1.拉取
docker pull rancher/server
2.运行

```shell
docker run -d --name=rancher --restart=always -p 9090:8080 rancher/server
```

3.访问
http://192.168.200.134:9090

4.使用以及部署相关环境
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







# Rancher2

```shell
docker run -d --restart=unless-stopped --name=rancher2 -v /docker/rancher/rancher2:/var/lib/rancher/ -p 9001:80 -p 9443:443 rancher/rancher:stable
```

安装教程

https://docs.rancher.cn/rancher2x/quick-start.html#_1-%E5%85%A5%E9%97%A8%E9%A1%BB%E7%9F%A5

