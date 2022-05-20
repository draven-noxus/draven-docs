# 安装RabbitMQ

首先先下载mq

docker pull docker.io/rabbitmq:3.7-management

然后我们去给他更新下名字

docker tag d69a5113ceae rabbitmq

由于我们更新名字之后他并不会删除掉原来的镜像所以我们需要去删除掉他

这里我们需要去加上他的版本
docker rmi docker.io/rabbitmq:3.7-management

然后我们来运行我们改过之后的镜像

docker   

```
-d    		后台运行
-p    		映射端口（由于Rabbitmq有一个客户端和服务的所以要映射两个端口）一会还需要把这两个映射到本地的端口的防火墙设置一下
--name 		设置一个名称，这个可以和我们的镜像一样
```

docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq rabbitmq



这里我们先开启5672端口
firewall-cmd --permanent --add-port=5672/tcp
然后我们开启15672端口
firewall-cmd --permanent --add-port=15672/tcp
最后我们刷新防火墙
firewall-cmd --reload

然后我们就能直接访问我们的rabbitmq了

# 安装MySQL

首先先搜索镜像



​			docker search redis



自己选择一个版本
然后我们把镜像下载下拉



​			docker pull docker.io/redis



然后我们给他修改名字



​			docker tag 看他的id  redis



然后我们删除原来的



​			docker rmi docker.io/redis



然后运行Docker容器

```
-d 			后台
--name		指定容器名字
-p			映射端口
然后启动容器镜像名字
然后我们指定Redis的密码
--requirepass "bigkang"

这样就运行完成了
```



docker run -d --name redis -p 6379:6379 redis --requirepass "bigkang"



记得别忘了开放自己的端口

​			firewall-cmd --permanent --add-port=6379/tcp

然后刷新防火墙
			firewall-cmd --reload 

## 



# 安装FastDFS

首先下载镜像

```
docker pull morunchang/fastdfs
```

然后修改名字,修改为fastdfs

```
docker tag morunchang/fastdfs fastdfs
然后删除原来的
docker rmi morunchang/fastdfs
```

再来启动我们的storage，--name制定名称，-net不用修改，ip修改为自己的ip

```
docker run -d --name storage --net=host -e TRACKER_IP=140.143.0.227:22122 -e GROUP_NAME=storagegroup fastdfs sh storage.sh
```

然后启动tracker

```
docker run -d --name tracker --net=host fastdfs sh tracker.sh
```

然后开放端口

```
firewall-cmd --zone=public --add-port=8080/tcp --permanent

firewall-cmd --zone=public --add-port=22122/tcp --permanent

firewall-cmd --zone=public --add-port=23000/tcp --permanent

firewall-cmd --reload
```

然后修改storage的nginx配置文件,先进入容器内部

```
docker exec -it storage  /bin/bash
```

然后再编辑配置文件

```
vim /data/nginx/conf/nginx.conf
	在他的location中加上配置
-----------------------------------------------------------------------------------------
        location /group1/M00 {
            proxy_next_upstream http_502 http_504 error timeout invalid_header;
            proxy_cache http-cache;
            proxy_cache_valid  20030412h;
            proxy_cache_key $uri$is_args$args;
            proxy_pass http://fdfs_group1;
            expires 30d;
        }

```

然后重新启动

```
先退出容器
exit
然后重新启动storage

docker restart storage
然后就能直接查看ip:8080了，如果出现nginx就成功了
注：阿里云上需要开放安全组8080端口

```
