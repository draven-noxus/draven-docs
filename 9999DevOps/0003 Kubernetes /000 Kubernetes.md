[搭建教程]()：https://gitee.com/pa



# Kubernetes(k8s)

Docker Machine

Docker Compose

```yaml
# docker-compose.yml
```

Docker Swarm







https://blog.csdn.net/smart9527_zc/article/details/82493375

kubectl -s http://apiserverIP:8080 version

官网链接：https://kubernetes.io/zh/

https://kubernetes.io/zh/docs/concepts/

go语言编写

yum install docker-engine 

-y 安装docker

<https://jimmysong.io/kubernetes-handbook/>

https://github.com/etcd-io/etcd/releases

# 特征

以服务为中心

自动化

# 解决

调度

生命周期及健康状况

服务发现

监控

认证

容器耦合

# 概述

模块化 modular

可插拔化 pluggable

可挂接 hookable

可组合 composable

# 核心组件

etcd：保存了整个集群的状态；
apiserver：提供了资源操作的唯一入口，并提供认证、授权、访问控制、API注册和发现等机制；
controller manager：负责维护集群的状态，比如故障检测、自动扩展、滚动更新等；
scheduler：负责资源的调度，按照预定的调度策略将Pod调度到相应的机器上；
kubelet：负责维护容器的生命周期，同时也负责Volume（CVI）和网络（CNI）的管理；
Container runtime：负责镜像管理以及Pod和容器的真正运行（CRI）；
kube-proxy：负责为Service提供cluster内部的服务发现和负载均衡；

# 设计理念

核心层：Kubernetes最核心的功能，对外提供API构建高层的应用，对内提供插件式应用执行环境
应用层：部署（无状态应用、有状态应用、批处理任务、集群应用等）和路由（服务发现、DNS解析等）
管理层：系统度量（如基础设施、容器和网络的度量），自动化（如自动扩展、动态Provision等）以及策略
管理（RBAC、Quota、PSP、NetworkPolicy等）
接口层：kubectl命令行工具、客户端SDK以及集群联邦
生态系统：在接口层之上的庞大容器集群管理调度的生态系统，可以划分为两个范畴
Kubernetes外部：日志、监控、配置管理、CI、CD、Workflow、FaaS、OTS应用、ChatOps等
Kubernetes内部：CRI、CNI、CVI、镜像仓库、Cloud Provider、集群自身的配置和管理等

# 基本概念

## 总体描述

### Kind

## Pod

```shell
根容器-Pause
1.代表整个容器组的状态

2.容器之间的通信 文件共享问题
	Pod里的多个业务容器共享Pause容器的IP，共享Pause容 器挂接的Volume
```

```yaml
apiVersion: v1
kind: pod
metadata:
 name: myweb
 labels:
  name: myweb
spec:
 containers:
```





创建，调度以及管理的最小单元

共存的一组容器的集合

容器共享PID 网络 IPC 以及UTS命名空间、容器共享存储卷

短暂存在

```yaml
# pod.yml
# for example
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: myapp-container
    image: busybox
    command: ['sh', '-c', 'echo Hello Kubernetes! && sleep 3600']
```



```shell
$ kubectl create pod.yml
$ kubectl get pods
$ kubectl delete pods 'podsName'
```

## Volumes

链接：https://kubernetes.io/docs/concepts/storage/volumes/

数据持久化

Pod中容器共享数据

生命周期（有）

支持多种类型的数据卷

```yaml
# Volumes
# for example
apiVersion: v1
kind: Pod
metadata:
  name: test-ebs
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /test-ebs
      name: test-volume
  volumes:
  - name: test-volume
    # This AWS EBS volume must already exist.
    awsElasticBlockStore:
      volumeID: <volume-id>
      fsType: ext4
```

```shell
$ kubectl create -f volumes.yml

$ kubectl get pods

$ kubectl get pods 'podsName' -o yml
```

## Services

抽象一系列Pod并定义其访问规则

固定IP地址和DNS域名

通过环境变量和DNS发现服务

负载均衡

外部服务 -ClusterIP，NodePort，LoadBalancer

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
```

### Labels 

用以表示对象（如Pod）的key/value对

组织并选择对象子集

pod

deployment

service

nodes





## Replication Controllers

确保在任意时刻运行指定数目的Pod

容器重新调度

规模调整

在线升级

多发布版本跟踪

# API

## APIServer



## Kubernates API

```java
get

put

patch

GET/watch

Http Redirect

HTTP Proxy

//整合Swager-UI查看API
```

## kubectl CLI

# 源码

主要集中于pkg

K8s API Service: pkg/master/master.go

启动存在于cmd

Rest API--->go-restful

# 常用命令

## 指令语法

```shell
$ kubectl [command] [TYPE] [NAME] [flags]
# command: 操作create，get，describe，delete
# TYPE:  指定操作的资源类型
# NAME:  指定资源名称，如忽略则默认命名空间下所有同类资源
# flags:  命令行选型，如覆盖默认服务器地址，端口，输出样式等
```



| 命令                               | 解释                                |
| ---------------------------------- | ----------------------------------- |
| kubectl cluster-info               | 查看集群信息                        |
| kubectl version                    | 显示kubectl命令行及kube服务端的版本 |
| kubectl api-version                | 显示支持的API版本集合               |
| kubectl config view                | 显示当前kubectl配置                 |
| kubectl get no                     | 查看集群中节点                      |
| kubectl create -f <res.yaml>       | 按照yaml文件创建资源                |
| kubectl run <name> --image=<image> | 使用某镜像创建Deployment            |
| kubectl get <type> <name>          | 查看某种类型资源                    |
| kubectl describe <type> <name>     | 检查某特定资源实例                  |
| kubectl logs                       | 检查某POD的日志（标准输出）         |
| kubectl exec                       | 在容器内执行命令                    |
| kubectl scale                      | 实现水平扩展或收缩                  |
| kubectl rollout status             | 部署状态变更状态检查                |
| kubectl rollout history            | 部署的历史                          |
| kubectl rollout undo               | 回滚部署到最近或者某个版本          |
| kubectl delete <type> <name>       | 按照yaml文件删除资源                |
|                                    |                                     |

demo

```shell
# 集群状态查看
# 检查集群中节点状态和Kube的功能集
# 创建nginx的Deploy       
# 部署一个nginx的单实例
# 检查Deploy
# 服务发现
# 部署管理
# 删除资源
# 查看该部署的运行状况
# 如何从外部访问
# 水平扩展或收缩实例以及滚动升级和回滚
# 释放不再需要的资源
```



# 集群

```shell
# 集群状态
$ kubelet get nodes 

# 集群组件状态
$ kubelet get cs
```

# 认证与授权

## 认证基础

服务之间调用可能会被劫持

对称加密与非对称解密（公钥与私钥）public key

非对称算法 加密解密过程比较耗时

### SSL/TLS协议

​	将加密后的密钥（对称加密的密钥），告知接收方要使用对称加密的方式通信

### CA认证

​	

## K8s认证

### 客户端证书认证

（TLS双向认证）集群外部

kubectl访问ApiServer时

CA

给各个组件颁发证书

### BearerToken认证

集群外部

### ServiceAccount

集群内部 目录挂载到pod内部

namespace

token

ca

## 鉴权机制

### 鉴权基础

#### ABAC

#### WebHook

#### RBAC

##### User

##### Role

##### Aurhority

## K8S鉴权  todo 

User->ServiceAccount

Resource -> Verbs:crud



Role

Namespace 	CluserRolingBinding

Cluster 	ClusterRoleBinding



### AdmisionControl

alwaysadmit

alwaysDeny

ServiceAccount



# 环境搭建

## Kubeadm

优雅、简单、支持高可用、升级方便、不易维护

## Binary

易于维护、灵活、升级方便、没有文档、安装复杂



# namespace

资源对象的隔离 Service Deployment Pod

资源配额 Cpu Memory



dev test

```shell
kubectl get namespaces
kubectl get pods -n default # 指定namespace

kubectl exec -it xxx bash


kubectl get svc

kubectl get pods -o wide
```

# Resources

CPU  GPU 内存  持久化存储

ApiServer

## 核心设计

### Requests

```shell
vimdiff xxx  xxx # 文件对比命令
kubectl get nodes
kubectl describe nodeName

```

### Limits

```yaml
resources:
 requests:
  memory:
  cpu:
 limits:
  memory:
  cpu:
```

= 可靠

r>l

避免不合理的配置



# errors

```shell
$ journalctl -f -u kubelet

$ docker info |grep Cgroup

# 异常处理
 kubelet cgroup driver: "cgroupfs" is different from docker cgroup driver: "systemd"
 
 
$ vim /lib/systemd/system/docker.service

# cgroupfs


 kubelet does not have ClusterDNS IP configured and cannot create Pod using "ClusterFirst" policy. Falling back to "Default" policy.
 
 
 journalctl -xe
```





安装etcd和kubernetes软件

yum install -y etcd kubernetes







systemctl start docker

systemctl start etcd

systemctl start kube-apiserver
systemctl start kube-controller-manager
systemctl start kube-scheduler
systemctl start kubelet

systemctl start kube-proxy









systemctl daemon-reload



systemctl enable kubelet
systemctl start kubelet
systemctl status kubelet
systemctl enable kube-proxy
systemctl start kube-proxy
systemctl status kube-proxy





kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta1/aio/deploy/recommended.yaml



```shell
kubectl get pod --namespace=kube-system -o wide | grep dashboard

```

```shell
kubectl get service kubernetes-dashboard --namespace=kube-system

```

```
docker tag 192.168.200.138:5000/pod-infrastructure 192.168.200.138:5000/registry.cn-hangzhou.aliyuncs.com/google_containers/kubernetes-dashboard-amd64

```





kubectl get pods -n kube-system | grep -v Running



kubectl describe pod kubernetes-dashboard-584bd7ddc9-tfcht -n kube-system



kubectl logs  kubernetes-dashboard-584bd7ddc9-w6mqx -n kube-system





- --apiserver-host=http://my-address:port

https://feisky.gitbooks.io/kubernetes/troubleshooting/pod.html







 Could not init in cluster config: open /var/run/secrets/kubernetes.io/serviceaccount/token: no such file or directory







2019/08/20 09:17:57 Using in-cluster config to connect to apiserver
2019/08/20 09:17:57 Could not init in cluster config: open /var/run/secrets/kubernetes.io/serviceaccount/token: no such file or directory
2019/08/20 09:17:57 Using random key for csrf signing









在apiserver的启动参数中添加：

--admission_control=ServiceAccount

apiserver在启动的时候会自己创建一个key和crt（见/var/run/kubernetes/apiserver.crt和apiserver.key）

然后在启动./kube-controller-manager 时添加flag：

--service_account_private_key_file=/var/run/kubernetes/apiserver.key

























error

```shell
2019/08/21 13:32:09 Using in-cluster config to connect to apiserver
2019/08/21 13:32:09 Using service account token for csrf signing
2019/08/21 13:32:09 Starting overwatch
E0821 13:32:09.706028       1 config.go:326] Expected to load root CA config from /var/run/secrets/kubernetes.io/serviceaccount/ca.crt, but got err: open /var/run/secrets/kubernetes.io/serviceaccount/ca.crt: no such file or directory
2019/08/21 13:32:09 Error while initializing connection to Kubernetes apiserver. This most likely means that the cluster is misconfigured (e.g., it has invalid apiserver certificates or service account's configuration) or the --apiserver-host param points to a server that does not exist. Reason: Get https://169.169.0.1:443/version: x509: failed to load system roots and no roots provided
Refer to our FAQ and wiki pages for more information: https://github.com/kubernetes/dashboard/wiki/FAQ

```





```
  args:
      # Uncomment the following line to manually specify Kubernetes API server Host
      # If not specified, Dashboard will attempt to auto discover the API server and connect
      # to it. Uncomment only if the default does not work.
      - --apiserver-host=http://192.168.120.121:8080

```

创建证书

```shell
# 初始化
$ ./easyrsa init-pki

$ ./easyrsa --batch "--req-cn=192.168.200.137@`date +%s`" build-ca nopass Generating a 2048 bit RSA private key

# result
$ Generating a 2048 bit RSA private key
...............................................+++
.........................................................................................+++
writing new private key to '/home/easy-rsa-master/easyrsa3/pki/private/ca.key'


# 服务端
$ ./easyrsa --subject-alt-name="IP:192.168.200.137" build-server-full server nopass Generating a 2048 bit RSA private key

#Resutl
Generating a 2048 bit RSA private key
................................................+++
...................+++
writing new private key to '/home/easy-rsa-master/easyrsa3/pki/private/server.key'
-----
Using configuration from /home/easy-rsa-master/easyrsa3/openssl-1.0.cnf
Check that the request matches the signature
Signature ok
The Subject's Distinguished Name is as follows
commonName            :ASN.1 12:'server'
Certificate is to be certified until Aug 18 13:33:31 2029 GMT (3650 days)

Write out database with 1 new entries
Data Base Updated

```



cp pki/ca.crt pki/issued/server.crt pki/private/server.key /etc/kubernetes/pki/



chmod 644 /etc/kubernetes/pki/*



```
--client-ca-file=/etc/kubernetes/pki/ca.crt --tls-cert-file=/etc/kubernetes/pki/server.crt --tls-private-key-file=/etc/kubernetes/pki/server.key

```



```
--service_account_private_key_file=/etc/kubernetes/pki/server.key --root-ca-file=/etc/kubernetes/pki/ca.crt

```



























[root@localhost kubernetes]# kubectl logs kubernetes-dashboard-584bd7ddc9-9fk82 -n kube-system
2019/08/21 14:01:40 Using in-cluster config to connect to apiserver
2019/08/21 14:01:40 Using service account token for csrf signing
2019/08/21 14:01:40 Starting overwatch
2019/08/21 14:01:40 Error while initializing connection to Kubernetes apiserver. This most likely means that the cluster is misconfigured (e.g., it has invalid apiserver certificates or service account's configuration) or the --apiserver-host param points to a server that does not exist. Reason: Get https://169.169.0.1:443/version: x509: certificate is valid for 192.168.200.137, not 169.169.0.1
Refer to our FAQ and wiki pages for more information: https://github.com/kubernetes/dashboard/wiki/FAQ











```
openssl genrsa -out apiserver-wudang.key 2048

```



```
openssl x509 -noout -text -in apiserver.crt

```



Error: 'dial tcp 172.17.0.3:8443: getsockopt: no route to host' Trying to reach: 'https://172.17.0.3:8443/'





https://github.com/rootsongjc/kubernetes-handbook/issues/92 















kubectl get pod  -o wide  --all-namespaces









find -type f \( -newermt '2018-02-22 18:00' -a -not -newermt '2018-02-22 20:00' \)





/lib/systemd/system



https://blog.csdn.net/qq_22917163/article/details/84527420





https://blog.51cto.com/guoshaoliang789/2156509

https://blog.51cto.com/guoshaoliang789/2156509





https://m.aliyun.com/yunqi/articles/713036







https://www.colabug.com/3973167.html









# Container-ecosystem

![](.\images\container-ecosystem-1.png)

# 阅读K8S有感

## Master

### kube-apiserver

### kube-controller-manager

### kube-scheduler

## worker

### kubectl

### kube-proxy

# Kubernetes 对象

Pod

Service

Volume

Namespace

## 控制器

ReplicaSet

Deployment

StatefulSet

DaemonSet

Job

# 控制面

## Master

## Node







# 网络基础

## IP-per-Pod模型

​		IP是以Pod为单位进行分配的。一 个Pod内部的所有容器共享一个网络堆栈(相当于一个网络命名空间， 它们的IP地址、网络设备、配置等都是共享的)

很好地利 用了现有的各种域名解析和发现机制	

## Docker网络基础

### 网络命名空间（Network Namespace）

不同容器之间的网络隔离

#### 操作

```shell
# 创建命名空间
ip netns add <name>

ip netns exec <name> <command>

# 进入内部
ip netns exec <name> bash

exit
```

#### 设备转移

```shell
# lo设备、vxlan设 备、ppp设备、bridge设备等都是不可以转移的

# 属性:NETIF_F_ ETNS_LOCAL on 则不转移

$ ip link set bro netns ns1

# 查看是否可以转移
$ ethtool -k br0
netns-local: on [fixed]
```

### Veth设备对

打通互相看不到的协议栈之间的壁垒

其中一端称为另一端的peer

在Veth设备的一端发送数据时，她它将会数据直接发送到另一端，并触发另一端的接受操作

#### 操作

```shell
# 创建Veth设备对
ip link add veth0 type veth peer name veth1

# 查看所有网络接口
ip link show

# 但是在同一个命名空间中
ip link set veth1 netns netns1

# 查看另一个设备veth1
ip netns exec netns1 ip link show

# 分配网址
ip netns exec netns1 ip addr add 10.1.1.1/24 dev veth1
ip addr add 10.1.1.2/24 dev veth0

# 启动
ip netns exec netns1 ip link set dev veth1 up
ip link set dev veth0 up

# 测试
ping 10.1.1.1
 # 
  ip netns exec netnsl ping 10.1.1.2

# 查看对端
ip netns exec netnsq ethtool -S veth1
 #NIC statistics:
 #  peer_ifindex: 5
ip netns exec netns2 ip link | grep 5
 # veth0 
```

### 网桥

网桥是一个二层的虚拟网络设备，把若干个网络接口连接起来，使得网络接口之间的报文能够互相转发

在转发报文时，网桥只需要向特定的网 口进行转发，来避免不必要的网络交互。如果它遇到一个自己从未学习 到的地址，就无法知道这个报文应该向哪个网络接口转发，就将报文广 播给所有的网络接口(报文来源的网络接口除外)

运行着Linux内核的机器本身就是一台主机，有可能 是网络报文的目的地，其收到的报文除了转发和丢弃，还可能被送到网 络协议栈的上层(网络层)，从而被自己(这台主机本身的协议栈)消 化，所以我们既可以把网桥看作一个二层设备，也可以把它看作一个三 层设备。

#### 操作

```shell
# 新增网桥设备
brctl addbr xxxxx

# 物理网卡和网桥连接起来
brctl addif xxxxxx ethx

# 网桥的物理网卡作为一个网口，由于在链路层工作，就不再需要IP 地址了，这样上面的IP地址自然失效:
ifconfig ethx 0.0.0.0

# 分配一个IP地址
ifconfig brxxx xxx.xxx.xxx.xxx
```



### iptables

### 路由





来源-践行k8s



# 安装篇

见《见单机版本》

方式二   tectonic-sandbox

方三 kops



上下文切换

kubectl config get-context

config



# Pod整合篇

# 基础命令

```shell
 # 1.基础操作
 kubectl get pods -n kube-system
 kubectl get pods -o wide -n kube-system
 
 # 查看网络
 docker network ls
 docker network inspect bridge
 
 # 节点信息
 kubectl describe 
 kubectl exec pods pod-name
 
 kubectl delete pods  pod-name
 
# 2.deployment 
 kubectl get deployment
 
 -o wide
 
 # 回滚
 rollout history deployment deployment-name
 
 rollout undo deployment deployment-name


# 3.service
# 三种方式
  Cluster IP # 对内全部可以访问
  NodePort
  LoadBalancer
  
 # 创建方式
  3.1 kubectl expose -h
  
  # 对内 (cluster vip)
  kubectl expose pods pod-name

  kubectl expose deployment deployment-name

  # 对外  NodePort
  kubectl expose pods pod-name --type=NodePort
  
  3.2 kind Service yaml文件
  
   kubectl get node --show-labels
   kubectl label node  node-name key=value
  
  3.3 DNS add-on
  ExternalName
  external-dns 官网
  
 # 4 label 标签
   labels:
     app: value
  



# 4.cluster  network 官网关键字
https://kubernetes.io/docs/concepts/cluster-administration/networking/
  引入同节点下的pod之间可以 访问
  docker多机通信-overly

 
# 对外映射
# 1. kubectl port-forward pod-name  [对外]8080:80[容器]

# 2. VIP

# 3. 实际是创建了svc 
kubectl expose deployment deployment-name  --type=NodePort



# 自动补全
kubectl completion zsh
source <(kubectl completion zsh)>
```

## Pod调度

1.pod

2.RC

3.ReplicaSet

4.deployment 不能直接删除pod操作

```shell
# 不要直接操作和管理 Pods
# 适用于前三创建方式
kubctl scale rc pod-name --replicas=2

# 升级
kubectl set image deloyment   deloyment-name image-name=image:xxx

# 效果停机升级
kubectl edit deployment deployment-name
# 滚动更新
https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/

# 回滚
kubectl rollout history deployment deployment-name
 
kubectl rollout undo deployment deployment-name

```



```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80


apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox
```



```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    app: nginx
  template:
    metadata:
      name: nginx
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80

```



```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx
  labels:
    tier: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      name: nginx
      labels:
        tier: frontend
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80

```



```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.12.2
        ports:
        - containerPort: 80
```



实战

亚马逊

kubectl create secret generic mysql-pass --from-literal=password=imooc 

kubectl get secret





# Pod的升级和回滚

```shell
# 若Pod是通过Deployment创建
# 运行时修改Deployment的Pod定义-spec.template或镜像名称
```

```yaml

```









# 容器监控

## 单个-weavescope 

```shell
docker top




```



## 复杂监控

heapster







# 自动伸缩功能

HPA





elk+fluentd







