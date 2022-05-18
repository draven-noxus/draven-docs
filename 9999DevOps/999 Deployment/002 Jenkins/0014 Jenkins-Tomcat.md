# Jenkins-Tomcat

```shell
# 前置知识
# 安装Jenkins
# 配置 JDK
# 配置 Maven

# 插件
# Deploy to container Plugin 
```



## 安装插件

### Deploy to container Plugin

```shell
# 安装 Deploy to container Plugin
# 如果不会请百度
```

### Publish Over SSH

```sh
# 安装 Publish Over SSH
# 如果不会请百度
```



## 项目配置



### 热部署

要求tomcat启动

```shell
# deploy to ear/war to a container
# WAR/EAR files
	**/target/*.war
# Context path
	XXX
# Containers
	# Credentials 	添加tomcat相关配置

	# Tomcat URL	热部署 Tomcat处于启动状态
	http://ip:port
```

# 配置

## 热部署

要求tomcat启动

### 配置文件

```xml
<!-- conf/context.xml -->
<role rolename="manager-gui"/>
  <role rolename="manager-status"/>
  <role rolename="manager-script"/>
  <user username="admin" password="123456" roles="manager-gui, mananger-status,manager-script"/>



<!-- webapps/manager/META-INF/context.xml -->
<Context antiResourceLocking="false" privileged="true" >
  <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="^.*$" />
</Context>


```



# FQA

## 权限问题

```shell
ERROR: Build step failed with exception
org.codehaus.cargo.container.ContainerException: The [cargo.remote.username] and [cargo.remote.password] properties are mandatory and need to be defined in your configuration


# 1 conf/context.xml 配置用户信息

# 2 Credentials 中添加tomcat中配置的用户信息
```

## 部署包为空war

```shell
ERROR: Step ‘Deploy war/ear to a container’ aborted due to exception: 
java.lang.InterruptedException: [DeployPublisher][WARN] No wars found. Deploy aborted. %n

# 采用通配符 定位  **/target/*.war
```



```shell
Jenkins.plugins.publish_over.BapPublisherException: Failed to connect and initialize SSH connection. Message: [Failed to connect session for config [mac]. Message [java.net.ConnectException: Connection refused (Connection refused)]]
```

## Mac开启ssh

```shell

```

```shell
Build step 'Send files or execute commands over SSH' changed build result to UNSTABLE


ERROR: Exception when publishing, exception message [Exec exit status not zero. Status [126]]
```



## 脚本demos

```shell
#这里需要加上JAVA_HOME的配置，虽然在本地的环境变量中已经配置了，但是远程调用的时候，还是需要配上的，否则执行脚本出错。
# export JAVA_HOME=/usr/java/jdk1.8.0_141-cloudera
# tomcat的位置
tomcat_home=/Users/draven/Documents/documents/java/software/apache-tomcat-8.5.57
#【3.1】 停止tomcat变量
SHUTDOWN=$tomcat_home/bin/shutdown.sh
#【3.2】 启动tomcat变量
STARTTOMCAT=$tomcat_home/bin/startup.sh
#【3.3】 删除所有项目文件包括war包和war解压后的文件 如果是局部发布这句不需要 这只是正对jenkins整个war发布
rm -rf /Users/draven/Documents/documents/java/software/apache-tomcat-8.5.57/webapps/deploy-war.war
#得到进程ID 这里也可以简写 如果你ps -ef|grep 项目名称 可以带出PID 那么可以直接写成这样
#之前为什么写那么长 是因为在用jenkins调用脚本的时候，也会带出jenkins调用脚本的那个进程 这样kill -9 就会killjenkins进程 导致一建发布中断
#所以这里一直写到了conf文件夹目录
#如果不需要用到jenkins可以用下面简洁版 得出PID命令
#PID=`ps -ef |grep 项目名称 |grep -v grep | awk '{print $2}'`
#【3.4】 获取进程ID
PID=`ps -ef |grep /Users/draven/Documents/documents/java/software/apache-tomcat-8.5.57/conf |grep -v grep | awk '{print $2}'`

echo `ps -ef |grep /Users/draven/Documents/documents/java/software/apache-tomcat-8.5.57/conf | grep -v grep  | awk '{print $2}'`

if [ ! "$PID" ];then # 这里判断TOMCAT进程是否存在
echo "进程不存在"
else
echo "进程存在 杀死进程PID：$PID"
kill -9 $PID
fi
#【3.5】启动项目
$STARTTOMCAT
echo "启动项目"
```



SSH: Transferred 0 file(s)
