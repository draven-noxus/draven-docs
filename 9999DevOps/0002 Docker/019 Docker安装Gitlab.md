# 安装gitlab

```
此容器启动至少需要4G以上的内存才能保证完成初始化
```

## 拉取镜像

前两个为依赖包
	docker pull sameersbn/redis
	docker pull sameersbn/postgresql
	docker pull gitlab/gitlab‐ce:late

## 创建容器并启动

```
docker run --name redis -d --privileged=true -v /home/root/opt/redis/data:/var/lib/redis sameersbn/redis
```

	docker run --name postgresql -d --privileged=true -e 'DB_NAME=gitlabhq_production' -e 'DB_USER=gitlab' -e 'DB_PASS=password' -e 'DB_EXTENSION=pg_trgm' -v /home/root/opt/postgresql/data:/var/lib/postgresql sameersbn/postgresql
	sudo docker run --detach \
```
--此 方式不可用：
  --hostname gitlab.example.com \
  	--publish 443:443 --publish 80:80 --publish 10022:10022 \
  	--name gitlab \
  	--restart always \
  	--volume /srv/gitlab/config:/etc/gitlab \
  	--volume /srv/gitlab/logs:/var/log/gitlab \
  	--volume /srv/gitlab/data:/var/opt/gitlab \
  	gitlab/gitlab-ce:latest
```

```
此方式可用
docker run --name gitlab -d --link postgresql:postgresql --link redis:redisio --hostname 192.168.200.133 -p 10022:22 -p 8899:9090 -e 'GITLAB_PORT=8899' -e 'GITLAB_SSH_PORT=10022' -e 'GITLAB_SECRETS_DB_KEY_BASE=long-and-random-alpha-numeric-string' -e 'GITLAB_SECRETS_SECRET_KEY_BASE=long-and-random-alpha-numeric-string' -e 'GITLAB_SECRETS_OTP_KEY_BASE=long-and-random-alpha-numeric-string' -e 'GITLAB_HOST=192.168.200.133' -e 'SMTP_AUTHENTICATION=login' -v /home/root/opt/gitlab/data:/home/git/data docker.io/gitlab/gitlab-ce
```

## 进入容器内部

​	docker exec -it gitlab /bin/bash


