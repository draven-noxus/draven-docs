# nacos

链接：https://nacos.io/zh-cn/docs/quick-start.html

链接：https://github.com/alibaba/nacos/releases

单机启动：

./startup.sh -m standalone

./startup.sh -m standalone&

## windows环境

找到目录的bin目录，里面有个startup.cmd这个文件，双击执行，然后出现cmd控制台窗口此时不要关闭，

然后我们可以看得到他的console路径，复制下来放到浏览器上，进入浏览器，默认账户密码都为nacos，

## Linux

找到当前目录，进入bin目录下执行sh startup.sh -m standalone

然后等待启动，然后也能直接访问了

后台启动使用nohup sh startup.sh -m standalone &

## Docker

建议按照nacos官方文档安装

```shell
# 先搜索镜像
$ docker search nacos（选择官方版）
# 然后下载镜像
$ docker pull docker.io/nacos/nacos-server
# 然后运行容器
$ docker run -d --name nacos -e MODE=standalone -p 8844:8848 docker.io/nacos/nacos-server
```



## Nacos-Docker

```powershell
git clone https://github.com/nacos-group/nacos-docker.git
cd nacos-docker
```



```
单机模式
docker-compose -f example/standalone.yaml up
docker-compose -f example/standalone-derby.yaml up

集群模式
docker-compose -f example/cluster-hostname.yaml up 
```

