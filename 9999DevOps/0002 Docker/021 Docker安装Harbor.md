# Harbor

## 入门级别的安装

## 环境准备

docker docker-compose 简单的docker操作指令

```shell
# 获取安装文件
wget https://github.com/goharbor/harbor/releases/download/v1.10.0/harbor-offline-installer-v1.10.0.tgz
wget https://github.com/goharbor/harbor/releases/download/v2.2.2/harbor-offline-installer-v2.2.2.tgz
```

```shell
# 最好解压到自己的文件目录
tar -zxvf harbor-offline-installer-v1.10.0.tgz 

# eg:
tar -zxvf harbor-offline-installer-v1.10.0.tgz  -C /xxx/xxx
```



```yaml
# 修改以下地方
hostname: your hostname or ip

# 先把https注释掉<先用起来不要研究你们深入>
https:
  # https port for harbor, default is 443
 port: 443
  # The path of cert and key files for nginx
 certificate: /your/certificate/path
 private_key: /your/private/key/path
```



```shell
# 进行一系列的检查 包括镜像下载等
# 这里可能会存在error 自己耐心查看日志
# 该步骤执行完以后会生成对应的一些配置文件
./install

eg:
$ harbor/common/config
root root  Dec 31 05:40 docker-compose.yml

$ harbor/common/config
drwxr-xr-x 3 root  root  53 Dec 31 05:40 core
drwxr-xr-x 2 root  root  17 Dec 31 05:40 db
drwxr-xr-x 2 10000 10000 35 Dec 31 05:40 jobservice
drwxr-xr-x 2 root  root  55 Dec 31 05:40 log
drwxr-xr-x 3 root  root  38 Dec 31 05:40 nginx
drwxr-xr-x 2 root  root  40 Dec 31 05:40 registry
drwxr-xr-x 2 root  root  35 Dec 31 05:40 registryctl


# 若没有问题会自动启动

docker-compose restart
docker-compose start
docker-compose stop


# 登陆
ip:80

# 默认账户密码
admin
Harbor123456
```

