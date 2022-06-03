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

# Zookeeper

https://cwiki.apache.org/confluence/display/ZOOKEEPER

https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.5.8/apache-zookeeper-3.5.8-bin.tar.gz



## ZkUI

https://github.com/DeemOpen/zkui

```shell
# 打包
mvn clean install -U
# 复制配置文件(此配置文件包含登录时所需要的账户密码)
cp config target config.cfg
# 启动程序 
java -jar zkui-2.0-SNAPSHOT-jar-with-dependencies.jar [--server.port=port]
nohup java -jar zkui-2.0-SNAPSHOT-jar-with-dependencies.jar & 
# 页面访问（默认 用户 admin  密码 manager）
http://ip:port
# 根据界面查看 新增 或 修改信息
```



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

## Zookeeper

### 查看日志

```powershell
# 修改
zkServer.sh
zkServer.cmd


setlocal
call "%~dp0zkEnv.cmd"

set ZOOMAIN=org.apache.zookeeper.server.quorum.QuorumPeerMain
set ZOO_LOG_FILE=zookeeper-%USERNAME%-server-%COMPUTERNAME%.log

echo on
call %JAVA% "-Dzookeeper.log.dir=%ZOO_LOG_DIR%" "-Dzookeeper.root.logger=%ZOO_LOG4J_PROP%" "-Dzookeeper.log.file=%ZOO_LOG_FILE%" "-XX:+HeapDumpOnOutOfMemoryError" "-XX:OnOutOfMemoryError=cmd /c taskkill /pid %%%%p /t /f" -cp "%CLASSPATH%" %ZOOMAIN% "%ZOOCFG%" %*
pause # 增加此配置 便于查看控制台日志
endlocal


```



### 端口问题

```powershell
# zookeeper修改端口
# 修改conf/zoo.cfg文件，添加没被占用的端口号
admin.serverPort=port
./zkServer.sh restart
./zkServer.cmd restart

```

### 找不到主类

```powershell
# 找不到或无法加载主类 org.apache.zookeeper.server.quorum.QuorumPeerMain

# 包下载错误
apache-zookeeper-3.5.5-bin.tar.gz

```

## 依赖问题

java.lang.ClassNotFoundException: org.apache.curator.framework.recipes.cache.TreeCacheListener

java.lang.NoClassDefFoundError: org/apache/curator/framework/CuratorFrameworkFactory

```xml
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
    <version>2.12.0</version>
</dependency>

```





