# ServiceMesh

服务网格

​	linkerd：内存占用高

​	istio

# Istio说明

官网：https://istio.io/zh

平台：https://wuyuan.io/

github：https://github.com/istio



# 概念

# 核心

### 数据面

​	Sidecar通过注入的方式和业务容器共存于一个Pod中，会劫持业务应用容器的流量，并非接受控制面组件的控制，同时会向控制面输出日志、跟踪及监控数据。

### 控制面

​	是Istio的核心，管理Istio的所有功能

## Pilot

​	是Istio的主要控制点，Istio的流量就是由Pilot管理的 具体是由Sidecar完成的

​	职责

​	从Kubernetes或者其他平台的注册中心获取服务信息，完成服务发现过程

​    读取Istio的各项控制配置，在进行转换之后，将其发给数据面进行实施。

​	原理

​	Pilot的配置的内容会被转换为数据面能够理解的格式，下发给数据面的Sidecar，Sidecar根据Pilot指令，将路由、服务、监听、集群等定义信息转换为本地配置，完成控制行为的落地。

​    流程

​	用户通过kubectl或istioctl在K8s上创建CRD资源，对Istio控制平面发出指令；

​	Pilot监听CRD中的config、rbac、networking及authentication资源在检测到资源对象的变更之后，针对其中涉及的服务，发出指令给对应的服务Sidecar；

​	Sidecar根据这些指令更新自身配置，根据配置修正通信行为

## Mixcer

​	职责

​	预检 和 汇报

​	流程

​	将Mixer配置发送到K8s中

​	Mixer通过对K8s资源的监听，获取配置的变化

​	网格中的服务在每次调用之前，都向Mixer发出预检请求，查看调用是否允许执行，在每次调用之后，都发出报告信息，向Mixer汇报在调用过程中产生的监控跟踪数据

## Citadel

​	在集群中启用了服务之间的加密之后，Citadel负责为集群中的各个服务在统一CA的条件下生成证书，并下发给各个服务中的Sidecar，服务之间的TLS就依赖这些证书完成校验过程

## Sidecar

​	负责控制面对网格控制的实际执行

​	来源

​	Istio的默认Sidecar是由Envoy派生出来的，理论上，只要支持Envoy的xDS协议，其他类似的反向代理软件都可以代替Envoy来担当这一角色

​	Istio利用istio-init初始化容器中的iptables指令，对所在的Pod的流量进行劫持，从而接管Pod中应用的通信过程，获得了通信的控制权，达到了控制面控制的目的。

   接管对比

​	基础 同一个Pod内的多个容器之间，网络栈是共享的

​	前：container->container

​	后：container->Sidecar->Sidecar->container

# 配置对象

​	Istio安装过程中会进行CRD的初始化，在K8s集群中注册一列的CRD，CRD在初测成功之后，会建立一些基础对象，完成Istio的初始化设置

## networking.istio.io

​	该系列对象在Istio中使用频率最高

​	Istio的流量管理功能就是用这一组对象完成的

### 	

```
### VirtualService

​	一个控制中心

​	定义一组条件，将符合该条件的流量按照在对象中配置的对应策略进行处理，最后将路由转到匹配的目标中

​	应用场景

​	来自服务A版本1的服务，如果要访问服务B，则要将路由指向服务B的版本2

​	。。。
```



关键对象

### Gateway

​	访问微服务时，网格内部的服务互访/Ingress进入网格的外部流量，都需要经过gateway

​	该对象描述了边缘介入设备的概念

​	定义了 开放端口 主机名 可能存在的TLS证书的定义

### VirtaulService

​	host

​    gateway

​	路由对象

### tcp/tls/http Route

​	tcp

​	tls

​	http

### DestionationWeight

### Subset:Port

## config.istio.io

​	为Mixer组件提供配置

rule

action

instance

adapter

template

handler

## Authentication.istio.io