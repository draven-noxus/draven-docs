

```shell
# 获取镜像
docker pull memcached:1.6.9

# 运行容器 
docker run --name memcache -itd -p 11211:11211 memcached:1.6.9

# 监控工具
docker pull kitsudo/memadmin:latest

# 运行
docker run -d --name memadmin -p 11080:80 memadmin
docker run -d --name memadmin -p 11080:80 kitsudo/memadmin
```

```shell
# vim Dockerfile


FROM eboraas/apache-php
RUN apt-get update && apt-get -y install php5-memcache && apt-get clean && rm -rf /var/lib/apt/lists/*
ADD https://github.com/junstor/memadmin/archive/v1.0.12.tar.gz /var/www
RUN rm -fr /var/www/html && ln -s /var/www/memadmin-1.0.12 /var/www/html && cd /var/www/ && tar xvf v1.0.12.tar.gz


$ docker build -t memadmin .


$ docker run -it --rm -p 11080:80 memadmin


docker cp memadmin:/var/www/html/ /usr/local/memadmin
$ docker stop memadmin
$ docker run -d --name memadmin -v /usr/local/memadmin:/var/www/html/ -p 11080:80 memadmin
```







