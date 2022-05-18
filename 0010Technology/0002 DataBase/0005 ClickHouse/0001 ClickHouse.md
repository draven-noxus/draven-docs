# ClickHouse

```shell
# 资料
https://clickhouse.tech/docs/en/getting-started/install/
#
https://github.com/ClickHouse/ClickHouse/tree/master/programs/server
#
https://repo.clickhouse.tech/tgz/
```

# 安装

## Docker

```shell
# 拉取镜像
docker pull yandex/clickhouse-server
docker pull yandex/clickhouse-client
# 运行镜像
	# demo
docker run -d --name demo-clickhouse-server -p 8123:8123 yandex/clickhouse-server
	# 配置
docker run -d --name ch-server --ulimit nofile=262144:262144 -p 8123:8123 -p 9000:9000 -p 9009:9009 yandex/clickhouse-server


# 1.开始配置
docker run -d --name ch-server --ulimit nofile=262144:262144 -p 8123:8123 -p 9000:9000 -p 9009:9009 yandex/clickhouse-server
# 2.查看容器
		docker ps -a 
# 3.进入容器
    docker exec -it docker-clickhouse /bin/bash 
# 4.进入clickhouse命令行    
    clickhouse-client 
# 5.查看所有的数据库
    show databases 
# 6.clickhouse 允许远程访问，将clickhouse的配置文件拷贝出来
    docker cp clickhouse-server:/etc/clickhouse-server/ /etc/clickhouse-server/
# 7.修改 /etc/clickhouse-server/config.xml 中 65行 注释去掉<listen_host>::</listen_host>
# 8.用自定义配置文件启动容器
    docker run -d --name docker-clickhouse --ulimit nofile=262144:262144 -p 8123:8123 -p 9000:9000 -p 9009:9009 -v /etc/clickhouse-server/config.xml:/etc/clickhouse-server/config.xml yandex/clickhouse-server
# 9.注意 端口必须映射出来，不然远程访问不到端口



```

## 其他

```shell
#config.xml
#user.xml
```





# FQA
```shell
std::exception. Code: 1001, type: std::__1::__fs::filesystem::filesystem_error, e.what() = filesystem error
# 看着是和存储端对接失败，识别不了存储类型

```

