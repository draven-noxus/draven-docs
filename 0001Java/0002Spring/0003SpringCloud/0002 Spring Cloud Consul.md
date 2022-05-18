# Spring Cloud Consul

consul

## 注册中心

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
```



```yaml
spring:
  application:
    name: cloud-consumer
  profiles:
    active: native
  cloud:
    consul:
      host: localhost
      port: 8500
```



```java
// 高版本可以不配置
@EnableDiscoveryClient
```



## 配置中心

```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-consul-config</artifactId>
</dependency>
```



```yaml
spring:
  application:
    name: cloud-consumer
  profiles:
    active: native
  cloud:
    consul:
      host: localhost
      port: 8500
      # 健康检查不推荐关闭
      discovery:
        register-health-check: true
        service-name: ${spring.application.name}
      config:
	      # 启用配置中心
        enabled: true
        # profile-separator: '::'
        # 默认前缀可不配置
        prefix: config
        # 可以理解 data-key 的上级目录
        #default-context: apps
        # 指定配置格式为 yaml
        format: yaml
        # 默认配置 consul 中 key/value 中的 key
        data-key: data
        watch:
          enabled: true
          delay: 1000
        # 实例名称
        service-name: ${spring.application.name}
```



```java
@EnableDiscoveryClient
```



```yaml
# 编写配置
# 登录控制台
# Key/Value -> Create
# 输入 key 配置前缀请保持一致
# 输入 value 若配置格式请保持格式一致
# 格式 此处以spring为例
# 		key: {prefix}/{spring.application.name,profiles}/{data-key}
# 		value: {format}对应格式配置文件
```





# 环境搭建

```shell
# Consul下载⻚⾯：
https://www.consul.io/downloads.html
# 官⽅⽂档：
https://www.consul.io/docs/agent/options.html
# Consul系列博客：
http://www.cnblogs.com/java-zhao/p/5378876.html
# 使⽤consul实现分布式服务注册和发现：
http://www.tuicool.com/articles/M3QFv
```

```shell
# 安装
cd	/usr/local/bin/
wget https://releases.hashicorp.com/consul/0.7.0/consul_0.7.0_linux_amd64.zip
unzip consul0.7.0linux_amd64.zip

# 启动
./consul agent -dev # 开发模式
./consul agent -server #服务模式运行

# 访问
http://127.0.0.1:8500/ui/

# 远程访问
http://192.168.11.143/ui/	
consul	agent	-dev	-client	192.168.11.143 # 指定客户端访问
```

常用命令

```shell
# 命令 解释 示例 帮助
# agent   
# 运⾏⼀个consul agent 	  	 
consul agent -dev 
consul agent --help	

# join
# 将agent加⼊到consul集群
consul join IP

# members
# 列出consul cluster集群中的members
consul members

# leave
# 将节点移除所在集群 consul
eave
```

## 

## 集群

未整理

```shell
consul agent  -data-dir=/Users/draven/Documents/documents/java/software/consul/data -server


consul agent  -data-dir=/Users/draven/Documents/documents/java/software/consul/data1 -server




#10.200.110.90启动consul
consul agent -server -bootstrap-expect=3 -data-dir=/tmp/consul -node=10.200.110.90 -bind=10.200.110.90 -client=0.0.0.0 -datacenter=shenzhen -ui
#10.200.110.91启动consul
consul agent -server -bootstrap-expect 3 -data-dir /tmp/consul -node 10.200.110.91 -bind=10.200.110.91 -client=0.0.0.0 -datacenter shenzhen -ui
#10.200.110.93启动consul
consul agent -server -bootstrap-expect 3 -data-dir /tmp/consul -node 10.200.110.93 -bind=10.200.110.93 -client=0.0.0.0 -datacenter shenzhen -ui




consul agent -server -bootstrap-expect=3 -data-dir=/Users/draven/Documents/documents/java/software/consul/data1 -node=localhost -bind=127.0.0.1 -client=0.0.0.0 -datacenter=shenzhen -ui
consul agent -server -bootstrap-expect 3 -data-dir=/Users/draven/Documents/documents/java/software/consul/data2 -node=localhost -bind=127.0.0.1 -client=0.0.0.0 -datacenter shenzhen -ui
consul agent -server -bootstrap-expect 3 -data-dir=/Users/draven/Documents/documents/java/software/consul/data3 -node=localhost -bind=127.0.0.1 -client=0.0.0.0 -datacenter shenzhen -ui





$ vim /data/app/consul/node1/basic.json
{  "datacenter": "dc1",  "data_dir": "/data/app/consul/node1",  "log_level": "INFO",  "server": true,  "node_name": "node1",  "ui": true,  "bind_addr": "10.208.1.10",  "client_addr": "10.208.1.10",  "advertise_addr": "10.208.1.10",  "bootstrap_expect": 3,  "ports":{    "http": 8500,    "dns": 8600,    "server": 8300,    "serf_lan": 8301,    "serf_wan": 8302
    }
}

$ nohup /usr/bin/consul agent -config-file=/data/app/consul/node1/basic.json > /data/app/consul/node1/consul.log 2>&1 &

$ tail -100f /data/app/consul/node1/consul.log


作者：慕码人8056858
链接：https://www.imooc.com/article/277290
来源：慕课网


$ vim /data/app/consul/node2/basic.json
{  "datacenter": "dc1",  "data_dir": "/data/app/consul/node2",  "log_level": "INFO",  "server": true,  "node_name": "node2",  "bind_addr": "10.208.1.10",  "client_addr": "10.208.1.10",  "advertise_addr": "10.208.1.10",  "ports":{    "http": 8510,    "dns": 8610,    "server": 8310,    "serf_lan": 8311,    "serf_wan": 8312
    }
}

$ nohup /usr/bin/consul agent -config-file=/data/app/consul/node2/basic.json  -retry-join=10.208.1.10:8301 > /data/app/consul/node2/consul.log 2>&1 &

$ tail -100f /data/app/consul/node2/consul.log


作者：慕码人8056858
链接：https://www.imooc.com/article/277290
来源：慕课网



$ vim /data/app/consul/node3/basic.json
{  "datacenter": "dc1",  "data_dir": "/data/app/consul/node3",  "log_level": "INFO",  "server": true,  "node_name": "node3",  "bind_addr": "10.208.1.10",  "client_addr": "10.208.1.10",  "advertise_addr": "10.208.1.10",  "ports":{    "http": 8520,    "dns": 8620,    "server": 8320,    "serf_lan": 8321,    "serf_wan": 8322
    }
}

$ nohup /usr/bin/consul agent -config-file=/data/app/consul/node3/basic.json  -retry-join=10.208.1.10:8301 > /data/app/consul/node3/consul.log 2>&1 &

$ tail -100f /data/app/consul/node3/consul.log


作者：慕码人8056858
链接：https://www.imooc.com/article/277290
来源：慕课网









$ vim /data/app/consul/node3/basic.json
{  "datacenter": "dc1",  "data_dir": "/Users/draven/Documents/documents/java/software/consul/consulcluster/node3",  "log_level": "INFO",  "server": true,  "node_name": "node3",  "bind_addr": "127.0.0.1",  "client_addr": "127.0.0.1",  "advertise_addr": "127.0.0.1",  "ports":{    "http": 8530,    "dns": 8630,    "server": 8330,    "serf_lan": 8331,    "serf_wan": 8332
    }
}

$ nohup /usr/bin/consul agent -config-file=/data/app/consul/node3/basic.json  -retry-join=127.0.0.1:8301 > /data/app/consul/node3/consul.log 2>&1 &

$ tail -100f /data/app/consul/node3/consul.log


{  "datacenter": "dc1",  "data_dir": "/Users/draven/Documents/documents/java/software/consul/consulcluster/node2",  "log_level": "INFO",  "server": true,  "node_name": "node3",  "bind_addr": "127.0.0.1",  "client_addr": "127.0.0.1",  "advertise_addr": "127.0.0.1",  "ports":{    "http": 8520,    "dns": 8620,    "server": 8320,    "serf_lan": 8321,    "serf_wan": 8322
    }
}


{  "datacenter": "dc1",  "data_dir": "/Users/draven/Documents/documents/java/software/consul/consulcluster/node1",  "log_level": "INFO",  "server": true,  "node_name": "node3",  "bind_addr": "127.0.0.1",  "client_addr": "127.0.0.1",  "advertise_addr": "127.0.0.1",  "ports":{    "http": 8510,    "dns": 8610,    "server": 8310,    "serf_lan": 8311,    "serf_wan": 8312
    }
}



consul agent -config-file=/Users/draven/Documents/documents/java/software/consul/consulcluster/node3/basic.json  -retry-join=127.0.0.1:8332

consul agent -config-file=/Users/draven/Documents/documents/java/software/consul/consulcluster/node2/basic.json  -retry-join=127.0.0.1:8332

consul agent -config-file=/Users/draven/Documents/documents/java/software/consul/consulcluster/node1/basic.json  -retry-join=127.0.0.1:8301
```

