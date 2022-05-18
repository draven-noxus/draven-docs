# Jenkins

```shell
# 资料
https://www.jenkins.io/
https://jenkins.io/zh/doc/

# 使用手册
https://www.jenkins.io/zh/doc/book/getting-started/

# 安装
https://www.jenkins.io/zh/doc/book/installing/
```

## Docker

```shell
docker run \
  -u root \
  --rm \  
  -d \ 
  -p 8080:8080 \ 
  -p 50000:50000 \ 
  -v jenkins-data:/var/jenkins_home \ 
  -v /var/run/docker.sock:/var/run/docker.sock \ 
  jenkinsci/blueocean
```



## WAR文件

```shell
java -jar jenkins.war --httpPort=9090
```



## 代码管理

### Git

Gogs

gitlab

### SVN



## Plugins

```shell
# 源代码管理工具
Git

Svn

# 部署至容器插件
Deploy to container Plugin	
	
Deploy WebLogic Plugin

# 项目构建
Maven Plugin
Ant Plugin
Pipeline
JDK
Ant
```



## Item

```shell
# Freestyle project 自由风格

# Maven

# Pipeline

# 多配置

# 多分支
```

