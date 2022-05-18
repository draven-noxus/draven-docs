# 配置Jenkins

初始化时虽然安装了一些插件但是并不一定是我们所需要的

## 安装maven插件

Maven Integration plugin

## 配置jdk

宿主机存放安装包即可

安装包：见JDK配置

位置：/docker/jenkins/home

宿主机执行以下命令

```shell
vim /etc/profile
----------------------
JAVA_HOME=/docker/jenkins/home/jdk1.8.0_211
export JAVA_HOME
export PATH=$PATH:$JAVA_HOME/bin

然后退出，然后刷新
source /etc/profile
使用命令查看版本，出
```

## 配置maven

宿主机存放安装包即可

建议maven不要使用最新的安装包

位置：/docker/jenkins/home

宿主机执行以下命令

```shell
wget http://mirror.bit.edu.cn/apache/maven/maven-3/3.6.1/binaries/apache-maven-3.6.1-bin.tar.gz
tar  -zxvf apache-maven-3.6.1-bin.tar.gz 
mv apache-maven-3.6.1 maven
rm -rf apache-maven-3.6.1-bin.tar.gz
```

maven配置

```shell
vim /docker/jenkins/home/maven/conf/settings.xml
```

```xml
<!--找到他的mirrors，将下面代码添加到最上面-->
<mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>        
    </mirror>
  </mirrors>
<!--然后设置仓库位置，我们放在var下，因为是容器内，我们又挂载了jenkins，所以这里写容器的目录-->
<localRepository>/var/jenkins_home/maven/repository</localRepository>
<!--并且我们后续需要使用docker的maven插件所以也要添加插件分组-->
  <pluginGroups>
    <pluginGroup>com.spotify</pluginGroup>
  </pluginGroups>
```

私服

```xml
<!--找到servers进行添加-->
        <server>
            <id>releases</id>
            <username>bigkang</username>
            <password>bigkang</password>
        </server>
        <server>
            <id>Snapshots</id>
            <username>bigkang</username>
            <password>bigkang</password>
        </server>
<!--然后找到profiles添加私有仓库地址-->
        <profile>
            <id>nexus</id>
            <repositories>
                <repository>
                    <id>nexus</id>
                    <name>local private nexus</name>
                    <url>http://111.67.196.127:8081/repository/maven-public/</url>
                </repository>
            </repositories>
        </profile>
        <profile>
            <id>nexus-snapshots</id>
            <repositories>
                <repository>
                    <id>nexus-snapshots</id>
                    <name>local private nexus snapshots</name>
                    <url>http://111.67.196.127:8081/repository/maven-snapshots/</url>
                </repository>
            </repositories>
        </profile>
	<!--然后引入-->
    <activeProfiles>
        <activeProfile>nexus</activeProfile>
        <activeProfile>nexus-snapshots</activeProfile>
    </activeProfiles>
```

配置仓库

```shell
# 要把仓库配置到挂载目录里
```

## 全局配置

注意配置maven和jdk时，一定要去jenkins内部去获取路径

```shell
docker -it jenkins /bin/bash
```

# 问题

### JDK与MAVEN时报错

```
err：
/var/jenkins_home/maven1 is not a directory on the Jenkins master (but perhaps it exists on some agents)
```

  解决方案	

```
1.在创建jenkins容器时一定要写清楚jenkins挂载目录
2.将对应的maven或jdk配置到该home下避免读取不到的问题
```

