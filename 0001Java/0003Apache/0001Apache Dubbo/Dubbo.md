# Dubbo

https://github.com/apache/dubbo

https://github.com/apache/dubbo/tree/2.7.8-release

http://dubbo.apache.org/en-us/

http://dubbo.apache.org/zh-cn/docs/user/quick-start.html

该手册讲解非常仔细，请按照手册中讲解进行环境搭建配置

# Dubbo-admin

### Maven方式部署

```shell
git clonehttps://github.com/apache/dubbo-admin.git
cd dubbo-admin
mvn clean package
cd dubbo-admin-distribution/target
java -jar dubbo-admin-0.1.jar
```

### 分离部署

#### 前端

```shell
cd dubbo-admin-ui 
npm install 
npm run dev 
```

#### 后端

```shell
cd dubbo-admin-server
mvn clean package 
cd target
java -jar dubbo-admin-server-0.1.jar
```



#### 配置文件

```sh
# https://github.com/apache/dubbo-admin
```

```properties
# dubbo-admin-server/src/main/resources/application.properties

admin.config-center=zookeeper://127.0.0.1:2181
admin.registry.address=zookeeper://127.0.0.1:2181
admin.metadata-report.address=zookeeper://127.0.0.1:2181


# 注册中心/dubbo/config/dubbo/dubbo.properties
dubbo.registry.address=zookeeper://127.0.0.1:2181
dubbo.metadata-report.address=zookeeper://127.0.0.1:2181
```

http://ip:port/swagger-ui.html



# Arthas

https://arthas.aliyun.com/en-us/

https://arthas.aliyun.com/doc/quick-start.html

https://github.com/alibaba/arthas

https://github.com/alibaba/arthas/releases

https://github.com/alibaba/arthas/releases/download/arthas-all-3.4.1/arthas-tunnel-server-3.4.1.jar

https://github.com/alibaba/arthas/releases/download/arthas-all-3.4.1/arthas-bin.zip

```shell
# 启动 arthas-tunnel-server
java -jar  arthas-tunnel-server.jar --server.port=port

# 连接至 server
java -jar arthas-boot.jar --tunnel-server 'ws://ip:7777/ws' --agent-id 'agent-id' # 默认监听7777 

# 访问 server  http://ip:port Web Console

# session 若顺序启动错误 或没有及时连接server 可使用session命令获取agentid
```

## 项目集成

引入依赖

```xml
<dependency>
    <groupId>com.taobao.arthas</groupId>
    <artifactId>arthas-spring-boot-starter</artifactId>
    <version>${arthas.version}</version>
</dependency>
```

# FQA

## Git

```shell
# 首先通过
$ git branch -a 

# 来查看所在目录的分支
$ git branch -a
  master
* trunk
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
  remotes/origin/zhanghanlun
  
# 然后输入命令切换分支
$ git checkout -b zhanghanlun origin/zhanghanlun

```







