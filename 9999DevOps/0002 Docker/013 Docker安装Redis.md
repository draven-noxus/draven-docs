首先先搜索镜像

docker search redis

自己选择一个版本
然后我们把镜像下载下拉

docker pull docker.io/redis

然后我们给他修改名字

docker tag 看他的id  redis

然后我们删除原来的

docker rmi docker.io/redis

然后运行Docker容器

	-d 		后台
	--name		指定容器名字
	-p		映射端口
	然后启动容器镜像名字
	然后我们指定Redis的密码
	--requirepass "bigkang"
	
	这样就运行完成了

docker run -d --name redis -p 6379:6379 redis --requirepass "bigkang"

```shell
docker run -id -v /docker/redis/conf/redis.conf:/usr/local/etc/redis/redis.conf --name=redis --appendonly yes

docker run -id -v /docker/redis/conf/redis.conf:/usr/local/etc/redis/redis.conf -v /docker/redis/data/:/data --name=redis -p 6379:6379 --appendonly yes

docker run -p 6379:6379 --name redis01 -v /app/redis/redis.conf:/etc/redis/redis.conf -v /app/redis/data:/data -d redis redis-server /etc/redis/redis.conf --appendonly yes
```







记得别忘了开放自己的端口


firewall-cmd --permanent --add-port=6379/tcp

然后刷新防火墙
firewall-cmd --reload 