# Jenkins安装 

## 宿主机安装

jenkins 加速器

```shell
https://www.cnblogs.com/hellxz/p/jenkins_install_plugins_faster.html

$ cd {你的Jenkins工作目录}/updates  #进入更新配置位置

$ vim default.json   #这个Json文件与上边的配置文件是相同的

:1,$s/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g

:1,$s/http:\/\/www.google.com/https:\/\/www.baidu.com/g

$ sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
```




### 下载jenkins

```
wget https://pkg.jenkins.io/redhat/jenkins-2.83-1.1.noarch.rpm
```

### 安装jenkins

#### 执行命令

```
-- rpm -ivh jenkins-2.83-1.1.noarch.rpm
```

##### 错误与警告

```
jenkins-2.83-1.1.noarch.rpm: 头V4 DSA/SHA1 Signature, 密钥 ID d50582e6: NOKEY
```

##### 解决方案

```
依次创建文件夹
mkdir /var/log/jenkins
mkdir /var/cache/jenkins
mkdir /var/lib/jenkins
```

### 配置jenkins

####  修改用户和端口

（防止权限等问题）

```
vim /etc/sysconfig/jenkins
```

```
JENKINS_USER="root" #我使用root
JENKINS_PORT="8889" #随意
启动
systemctl start jenkins
```

```
查找密码		
/var/lib/jenkins/secrets/initialAdminPassword
密码 500d8b18acef473f88d17f72fa45fa57
```

#### 配置插件

	配置插件（一般选左边）
	创建第一个管理员界面
	**此处插件安装不成功 升级了jenkins.war
##### maven插件

```
搜索关键字：maven In
```

### 环境准备

#### JDK安装

```
见linux.md
jdk-8u171-linux-x64.rpm
默认安装位置 /usr/java/
```

#### Maven安装

```
tar zxvf apaxxx
移动目录
配置/usr/local/repository
```

#### 全局工具配置

##### 	配置maven

##### 	配置JDK1.8

