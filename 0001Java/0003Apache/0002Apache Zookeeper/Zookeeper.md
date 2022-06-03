# Zookeeper

https://cwiki.apache.org/confluence/display/ZOOKEEPER

https://www.apache.org/dyn/closer.lua/zookeeper/zookeeper-3.5.8/apache-zookeeper-3.5.8-bin.tar.gz

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



# Console

## ZkUI



```shell
# 下载
https://github.com/DeemOpen/zkui
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

## prettyZoo

```shell
# https://github.com/vran-dev/PrettyZoo

# https://github.com/vran-dev/PrettyZoo/releases/download/v1.9.7/prettyzoo-1.9.7-1.x86_64.rpm

# https://github.com/vran-dev/PrettyZoo/releases/download/v1.9.7/prettyZoo-mac.dmg

# 直接运行即可
```

