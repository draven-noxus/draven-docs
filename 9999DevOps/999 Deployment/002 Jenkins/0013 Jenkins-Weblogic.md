# Jenkins-Weblogic

```shell
# 前置知识
# 安装Jenkins
# 配置 JDK
# 配置 Maven


# 插件
# Weblogic Deploy Plugin
```



## 安装插件

### WebLogic Deployment Plugin

```shell
# 安装 Weblogic Deploy Plugin
# 如果不会请百度
```

## 全局配置

```shell
# 启用weblogic插件
# Additional classpath 配置与weblogic通信
	wlthint3client.jar(官网推荐并不准确) -> wlfullclient.jar
# Configuration File 配置weblogic基本信息
	configuration.xml
# Disable 不要勾选
```



## 项目配置

```shell
# >构建maven工程
# 选择 Deploy the artifact to any WebLogic environments
# 填写配置
# Task name
	# 任务名称 不做要求
# Environment
	# 根据配置文件读取
# Name
	# 部署包名称
# Base directory where the resource to deploy can be found	
	# 部署包源路径
# Built resource to deploy
	# 部署位置
# Targets
	# 不知道干嘛的
# WebLogic deployment plan		
	# 未知
# WebLogic libraries	
	# 作为组件

# 命令行 后面有修复 FQA
Command Line	
-adminurl http://ip:port/console -user xxx -password xxxx -debug -remote -verbose  -upload -name xxx.war -source sources/path/xxx.war -targets targets/xxx.war -deploy
```



# 配置

## 通信包

wlthint3client.jar  wlfullclient.jar

## 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config xmlns="http://org.jenkinsci.plugins/WeblogicDeploymentPlugin"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://org.jenkinsci.plugins/WeblogicDeploymentPlugin plugin-configuration.xsd">
    <weblogic-targets>
        <weblogic-target>
            <name>domainName</name>
            <target></target>
            <host>ip</host>
            <port>port</port>
            <login>username</login>
            <password>password</password>
            <authMode>BY_LOGIN</authMode>
        </weblogic-target>
    </weblogic-targets>
</config>  
```



# FQA

```
# error
task completed abnormally (exit code = 1). Check your Weblogic Deployment logs.
```

## 通信包错误

```shell
# 1.----------------  TASK EXECUTION -----------
# 错误: 找不到或无法加载主类 weblogic.Deployer
# weblogic 12c 生成wlfullclient.jar

	# 官网解释 weblogic12 -- wlthint3client.jar 不靠谱

# 1.1 Change directories to the server/lib directory.
cd WL_HOME/server/lib

# 1.2 Use the following command to create wlfullclient.jar in the server/lib directory:
java -jar wljarbuilder.jar

# 1.3 You can now copy and bundle the wlfullclient.jar with client applications.


# 通信包改为命令行生成的 wlfullclient.jar

# 参考链接
# https://docs.oracle.com/cd/E12840_01/wls/docs103/client/jarbuilder.html
```

## 协议错误

```shell
# 2. java.net.ProtocolException: Tunneling result unspecified - is the HTTP server at host: 'ip' and port: 'port' a WebLogic Server?; No available router to destination. Ensure the url represents a running admin server and that the credentials are correct. If using http protocol, tunneling must be enabled on the admin server.

# 协议不对 weblogic 控制台默认使用t3协议

Deploy the artifact to any WebLogic environment
-> 高级 # 注意使用t3协议
-> 
Protocol t3

-> WebLogic Deployment Command # 自己编写命令行 注意使用t3协议
Command Line
-adminurl t3://ip:port -user xxx -password xxxx -debug -remote -verbose  -upload -name xxxx -source path\xxx.war   -deploy

# 协议来源
weblogic控制台->域结构(根目录)->高级 ->
查看获取
管理协议: t3
```

```shell
# 待定
# 3.java.rmi.ConnectException: Destination ip, port unreachable; nested exception is: java.net.ProtocolException: Tunneling result unspecified - is the HTTP server at host: 'ip' and port: 'port' a WebLogic Server?; No available router to destination

# configuration.xml中临时添加
<port>port</port> -> <port>port/console</port>


```

## 堆内存问题

```shell
# 4. weblogic.deploy.api.tools.deployer.DeployerException: Java heap space

Jenkins
->Manage Jenkins
->Configure System
->WebLogic Deployment Plugin
->高级
->添加参数
Java Options to use	 -Xms512M -Xmx512M 
```

## Jenkins控制台乱码

```
->系统管理
->Configure System
->全局属性：
->新增
KEY: LANG; VALUE:zh.CH.UTF-8
```



## SVN配置

```shell
# 5.jenkins如何配置SVN

# 建议使用小乌龟来定位 SVN的路径
```

## 脚本demos


```shell
# 可在Pre Steps 此步执行 避免脚本权限问题
echo '时间戳'
time1=$(date "+%Y%m%d%H%M%S")
echo 'start time is '$time1
echo "文件夹"
deploypath="/Users/draven/Documents/documents/java/software/weblogic/Oracle_Home/user_projects/domains/base_domain/servers/AdminServer/upload/demos/app/"
echo "文件"
deploypathwar="/Users/draven/Documents/documents/java/software/weblogic/Oracle_Home/user_projects/domains/base_domain/servers/AdminServer/upload/demos/app/weblogic-demo.war"

echo '检查文件夹是否存在'
if [ ! -d "$deploypath"]; then
echo 'result：文件夹不存在存在'
mkdir "$deploypath"
fi


echo '检查文件是否存在'


if [ ! -f "$deploypathwar" ]; then
echo 'the file is not extits'
touch "$deploypathwar"
fi

echo '开始备份文件'
mv ${deploypath}weblogic-demo.war ${deploypath}weblogic-demo.war_bak_$time1
sleep 2
time2=$(date "+%Y%m%d%H%M%S")
echo 'over time is ' $time2
echo "文件备份结束"
```

