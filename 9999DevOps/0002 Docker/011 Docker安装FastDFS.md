安装FastDFS

首先下载镜像

```shell
docker pull morunchang/fastdfs
```

然后修改名字,修改为fastdfs

```shell
docker tag morunchang/fastdfs fastdfs
然后删除原来的
docker rmi morunchang/fastdfs
```

再来启动我们的storage，--name制定名称，-net不用修改，ip修改为自己的ip

```shell
docker run -d --name storage --net=host -e TRACKER_IP=140.143.0.227:22122 -e GROUP_NAME=storagegroup fastdfs sh storage.sh
```

然后启动tracker

```shell
docker run -d --name tracker --net=host fastdfs sh tracker.sh
```

然后开放端口

```shell
firewall-cmd --zone=public --add-port=8080/tcp --permanent

firewall-cmd --zone=public --add-port=22122/tcp --permanent

firewall-cmd --zone=public --add-port=23000/tcp --permanent

firewall-cmd --reload
```

然后修改storage的nginx配置文件,先进入容器内部

```shell
docker exec -it storage  /bin/bash
```

然后再编辑配置文件

```shell
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

```shell
# 先退出容器
exit
# 然后重新启动storage

docker restart storage
# 然后就能直接查看ip:8080了，如果出现nginx就成功了
```


