



# 快捷键提醒

macOS CheatSheet
Windows HotKey Explorer HotKey Commander


# 在线转换工具
## toyaml
https://www.toyaml.com/index.html



# PowerDesigner

设计表以及处理表间关系

导出建表语句

根据建表语句逆向生成模型

生成数据库报表文件



# 测试工具


# 1.PostMan

## 1.1 是一款功能强大的网页调试与发送网页HTTP请求的工具，有goole插件版

	--文档：https://www.getpostman.com/api-documentation-generator



# 2.Insomnia

## 2.1 模拟各种restful风格请求 包括文件上传等

  --文档：https://support.insomnia.rest/

## 2.2 JsonView
https://github.com/gildas-lormeau/JSONView-for-Chrome



# 文本编辑工具

# 1. Typora

## 1.1 一款好用的md文件工具

--文档：https://www.typora.io/



# 流程图

## Processon

https://www.processon.com/



# 项目管理

## 禅道

参见官方文档

http://www.zentao.net/book/zentaopmshelp/40.html

## maven

### 坐标相关

#### setting.xml

```xml

<!-- vim /docker/jenkins/home/maven/conf/settings.xml 
找到他的mirrors，将下面代码添加到最上面 -->

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
<!-- 并且我们后续需要使用docker的maven插件所以也要添加插件分组 -->
  <pluginGroups>
    <pluginGroup>com.spotify</pluginGroup>
  </pluginGroups>
```

#### pom.xml

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

阿里云仓库

```xml
<repositories>
    <repository>
        <id>aliyun</id>
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
```

基于maven命令行

```shell
# 连接启动器 指定 依赖 坐标 boot版本号 文件夹路径 指定名字
curl https://start.spring.io/starter.tgz \
  -d dependencies=webflux,actuator,data-neo4j  \
  -d bootVersion=2.4.0-RC1 \
  -d baseDir=Neo4jSpringBootExample \
  -d name=Neo4j%20SpringBoot%20Example | tar -xzvf -
```



# Idea

### 主题样式

Configure | Preferences | Appearance & Behavior | Appearance

### 字体设置

Configure ｜Preferences | Editor | Font 

### 控制台字体

Preferences | Editor | Color Scheme | Console Font

Preferences | Editor | Color Scheme | Console Colors

### 字体编码

Preferences | Editor | File Encodings 三个地方

### 滚轮控制大小

Preferences | Editor | General

Change font size with Command+Mouse Wheel

### 行号分割线

Preferences | Editor | General | Appearance

show line numbers

Show method separators

### 多余空行

Preferences | Editor | Code Style | Java | Blank  Lines

In declarations

In code

Before '}'

### 智能提醒

Preferences | Editor | General | Code Completion

### 自动导包

Preferences | Editor | General | Auto Import 

Insert imports on paste All

Add unambiguous imports on the fly

Optimize imports on the fly(for current project)

### 鼠标浮停

Preferences | Editor | General

Show quick documentation on mouse move Delay 0

### JDK设置

Configure | Project Defaults | Project Structure 

SDK 设置

### 配置JVM内存

Help ｜ Edit Custom VM Options...

```shell
# custom IntelliJ IDEA VM options

-Xms1024m
-Xmx2048m
-XX:ReservedCodeCacheSize=240m
-XX:+UseCompressedOops
-Dfile.encoding=UTF-8
-XX:+UseConcMarkSweepGC
-XX:SoftRefLRUPolicyMSPerMB=50
-ea
-Dsun.io.useCanonCaches=false
-Djava.net.preferIPv4Stack=true
-Djdk.http.auth.tunneling.disabledSchemes=""
-XX:+HeapDumpOnOutOfMemoryError
-XX:-OmitStackTraceInFastThrow
-Xverify:none

-XX:ErrorFile=$USER_HOME/java_error_in_idea_%p.log
-XX:HeapDumpPath=$USER_HOME/java_error_in_idea.hprof
```

### maven项目

在IDEA中,我们常用三种骨架

```shelll
org.apache.maven.archetypes:maven-archetype-quickstart : 打包方式为jar

org.apache.maven.archetypes:maven-archetype-webapp : 打包方式为war

org.apache.maven.archetypes:maven-archetype-site : 打包方式为pom
```

# Gradle介绍

Gradle是一个基于JVM的构建工具，它提供了：

    像Ant一样，通用灵活的构建工具
    可以切换的，基于约定的构建框架
    强大的多工程构建支持
    基于Apache Ivy的强大的依赖管理
    支持maven, Ivy仓库
    支持传递性依赖管理，而不需要远程仓库或者是pom.xml和ivy.xml配置文件。
    对Ant的任务做了很好的集成
    基于Groovy，build脚本使用Groovy编写
    有广泛的领域模型支持构建

Gradle 概述
1，基于声明和基于约定的构建。
2，依赖型的编程语言。
3，可以结构化构建，易于维护和理解。
4，有高级的API允许你在构建执行的整个过程当中，对它的核心进行监视，或者是配置它的行为。
5，有良好的扩展性。有增量构建功能来克服性能瓶颈问题。
6，多项目构建的支持。
7，多种方式的依赖管理。
8，是第一个构建集成工具。集成了Ant, maven的功能。
9，易于移值。
10，脚本采用Groovy编写，易于维护。
11，通过Gradle Wrapper允许你在没有安装Gradle的机器上进行Gradle构建。
12，自由，开源。

Gradle 安装
1，安装JDK，并配置JAVA_HOME环境变量。因为Gradle是用Groovy编写的，而Groovy基于JAVA。另外，Java版本要不小于1.5.
2，下载。地址是：http://www.gradle.org/downloads。在这里下载你要的版本。
3，解压。如果你下载的是gradle-xx-all.zip的完整包，它会有以下内容：

    二进制文件
    用户手册（包括PDF和HTML两种版本）
    DSL参考指南
    API手册（包括Javadoc和Groovydoc）
    样例
    源代码，仅供参考使用。

4，配置环境变量。配置GRADLE_HOME到你的gradle根目录当中，然后把%GRADLE_HOME%/bin（linux或mac的是$GRADLE_HOME/bin）加到PATH的环境变量。
linux用户可以在~/.bashrc文件中配置。

配置完成之后，运行gradle -v，检查一下是否安装无误。如果安装正确，它会打印出Gradle的版本信息，包括它的构建信息，Groovy, Ant, Ivy, 当前JVM和当前系统的版本信息。

另外，可以通过GRADLE_OPTS或JAVA_OPTS来配置Gradle运行时的JVM参数。不过，JAVA_OPTS设置的参数也会影响到其他的JAVA应用程序。


原文：https://blog.csdn.net/maosidiaoxian/article/details/40109337 


### SVN/Git

### ES6语法支持

Preferences | Languages & Frameworks | JavaScript 

ECMAScript 6