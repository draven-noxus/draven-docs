# 部署流程

## 本地推送

将一个项目制作镜像推送到私服

私服相关信息见《registry》

创建基础JDK镜像

```shell
mkdir –p /docker/jdk
```

上传jdk安装包

创建Dockerfile文件

```shell
#依赖镜像名称和ID 
FROM centos:7 
#指定镜像创建者信息
MAINTAINER CATLITTLE 
#切换工作目录 
WORKDIR /usr
RUN mkdir /usr/local/java
#ADD 是相对路径jar,把java添加到容器中
ADD jdk-8u231-linux-x64.tar.gz /usr/local/java/
#配置java环境变量
ENV JAVA_HOME /usr/local/java/jdk-8u231-linux-x64.tar.gz
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH ENV PATH $JAVA_HOME/bin:$PATH
```

构建镜像(注意 .)

```shell
docker build -t='jdk1.8' .
```

查看是否构建成功

```shell
docker images
```

标记此镜像为私有仓库的镜像

```shell
docker tag jdk1.8 116.196.77.250:5000/jdk1.8
```

上传标记的镜像

```shell
docker push 116.196.77.250:5000/jdk1.8
```

查看是否上传成功

```shell
http://116.196.77.250:5000/v2/_catalog
```

重启私服服务器（可能需要）

```shell
docker start registry
```

上传标记的镜像

```shell
docker push 192.168.200.134:5000/jdk1.8
```

上传镜像（案例）

```shell
mvn clean package docker:build ‐DpushImage
docker run -d --name=eureka -p 6868:6868
192.168.200.134:5000/tensquare_eureka:1.0‐SNAPSHOT
```

maven-docker插件

```xml
 <build>
        <finalName>app</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                    <include>**/*.yaml</include>
                    <include>**/*.yml</include>
                    <include>**/*.html</include>
                </includes>
                <filtering>false</filtering>
            </resource>
        </resources>
        <finalName>shiro</finalName>
        <plugins>
<!--            <plugin>-->
<!--                <groupId>org.springframework.boot</groupId>-->
<!--                <artifactId>spring‐boot‐maven‐plugin</artifactId>-->
<!--                &lt;!&ndash; 加入以下部分&ndash;&gt;-->
<!--                <configuration>-->
<!--                    <mainClass>com.cat.little.Application</mainClass>-->
<!--                </configuration>-->
<!--            </plugin>-->
            <plugin>
                <!-- docker的maven插件，官网: https://github.com/spotify/docker‐maven‐plugin-->
                <groupId>com.spotify</groupId>
                <artifactId>docker-maven-plugin</artifactId>
                <version>1.0.0</version>
                <configuration>
                    <imageName>116.196.77.250:5000/${project.artifactId}:${project.version}</imageName>
                    <baseImage>jdk1.8</baseImage>
                    <entryPoint>["java", "-jar", "/${project.build.finalName}.jar"]</entryPoint>
                    <directory>${project.build.directory}</directory>
                    <resources>
                        <resource>
                            <targetPath>/</targetPath>
                            <directory>${project.build.directory}</directory>
                            <include>${project.build.finalName}.jar</include>
                        </resource>
                    </resources>
                    <dockerHost>http://116.196.77.250:2375</dockerHost>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

本地推送镜像的命令

```shell
mvn clean package docker:build -DpushImage
```

