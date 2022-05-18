# Dockerfile

​		Dockerfile就是为了给我们的项目打包成一个镜像，Dockerfile实际上就是一串指令脚本，也就是将一个jdk或者mysql又或者是一个微服务打包成一个镜像，然后我们就可以通过打包好的镜像直接run容器，这样就可以快速部署，并且完全兼容不受环境的影响

## 常用命令

```shell
基础语法
# 定义了使用哪个基础镜像启动构建流程
1.FROM image_name:tag
# 声明镜像的创建者
2.MAINTAINER user_name
# 设置环境变量 (可以写多条)
3.ENV key value
# 是Dockerfile的核心部分(可以写多条)
4.RUN command
# 将宿主机的文件复制到容器内，如果是一个压缩文件，将会在复制后自动解压
5.ADD source_dir/file dest_dir/file
# 和ADD相似，但是如果有压缩文件并不能解压
6.COPY source_dir/file dest_dir/file 
# 设置工作目录
7.WORKDIR path_dir
# 用来指定端口，使容器内的应用可以通过端口和外界交互
8.EXPOSE port1 prot2
# 在构建容器时使用，会被docker run后的argument覆盖
9.CMD argument
# 和CMD相似，但是并不会被docker run指定的参数覆盖
10.ENTRYPOINT argument
# 将本地文件夹或者其他容器的文件挂载到容器中
11.VOLUME 
```



## 简单使用

### Base Image

```shell
from scratch
add xxx \
# 执行了一个脚本
CMD ["/hello"]
```

```shell
# 运行命令
docker build -t xxx/xxx .
```

```shell
# 构建过程
docker history imageID
# 分层查看信息
more imageID/imageName
```

### Container image

```shell
# 不推荐
docker commit container [REPOSITORY[:TAG]]
```

## 制作base Image	

```shell
# 1.首先我们先将jdk复制到一个目录下，然后再写一个Dockerfile文件，名字Dockerfile
# 2.下载jdk-8u171-linux-x64.tar.gz并上传到服务器（虚拟机）中的/usr/local/dockerjdk8目录
# 3.编写docker文件
#依赖镜像名称和ID
FROM centos:7
#指定镜像创建者信息
MAINTAINER root
#切换工作目录
WORKDIR /usr
RUN mkdir /usr/local/java
#ADD 是相对路径jar,把java添加到容器中
ADD jdk-8u201-linux-x64.tar.gz /usr/local/java/
#配置java环境变量
ENV JAVA_HOME /usr/local/java/jdk1.8.0_201
ENV JRE_HOME $JAVA_HOME/jre
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH
ENV PATH $JAVA_HOME/bin:$PATH

4.构建命令(注意 . 符号)
docker build -t='jdk1.8' .

5.查看是否制作成功
docker images

6.创建容器
docker run -it --name=myjdk jdk1.8 /bin/bash
```




---尽量不要用 未经实践

一.批量删除所有none的镜像
删除所有<none>版本的镜像
docker images|grep none|awk '{print $3}'|xargs docker rmi

$ docker ps // 查看所有正在运行容器 
$ docker stop containerId // containerId 是容器的ID 
$ docker ps -a // 查看所有容器 $ docker ps -a -q // 查看所有容器ID 
$ docker stop $(docker ps -a -q) //  stop停止所有容器 
$ docker rm $(docker ps -a -q) //   remove删除所有容器

# FQA