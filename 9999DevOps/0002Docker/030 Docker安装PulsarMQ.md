# PulsarMQ

```shell
# 示例 数据卷挂载
docker run -it \
  -p 6650:6650 \
  -p 8080:8080 \
  --mount source=pulsardata,target=/pulsar/data \
  --mount source=pulsarconf,target=/pulsar/conf \
  apachepulsar/pulsar:2.7.1 \
  bin/pulsar standalone
 
#  
docker run -it  \
-d \
--name pulsar \
-p 6650:6650 \
-p 10000:8080 \
apachepulsar/pulsar:2.7.2 \
/bin/bash \
bin/pulsar standalone

 
# pulsar-manager
docker run -it  -d   -p 9527:9527 -p 7750:7750  --name pulsar-manager    -e SPRING_CONFIGURATION_FILE=/pulsar-manager/pulsar-manager/application.properties     apachepulsar/pulsar-manager:v0.2.0


# 新增账户密码
curl    -H 'X-XSRF-TOKEN: $CSRF_TOKEN'    -H 'Cookie: XSRF-TOKEN=$CSRF_TOKEN;'    -H "Content-Type: application/json"    -X PUT http://10.211.55.5:7750/pulsar-manager/users/superuser    -d '{"name": "admin", "password": "apachepulsar", "description": "test", "email": "username@test.org"}'


# 开启 bkvm admin/admin
http://10.211.55.5:7750/bkvm


# 监控
# https://github.com/streamnative/apache-pulsar-grafana-dashboard

# https://github.com/streamnative/apache-pulsar-grafana-dashboard.git
```

## pulsar-admin

```shell
# 配置 更新
./pulsar-admin clusters list


./pulsar-admin brokers update standalone --url http://10.211.55.5:10000

./pulsar-admin clusters update standalone --broker-url  pulsar://10.211.55.5:6650 --url http://10.211.55.5:10000


./pulsar-admin clusters get standalone

{
  "serviceUrl" : "http://10.211.55.5:10000",
  "brokerServiceUrl" : "pulsar://10.211.55.5:6650"
}
```

# 附录

```shell
# 获取配置文件 pulsar-manager
docker cp pulsar-manager:/pulsar-manager/pulsar-manager/ /docker/pulsar/pulsar-manager/

# 获取配置文件 pulsar
docker cp pulsarx:/pulsar/conf/ /docker/pulsar/pulsar/conf/

# 挂载文件
docker run -it \
-d \
--name pulsar-manager \
-p 9527:9527 -p 7750:7750 \
-v /docker/pulsar/pulsar-manager/application.properties:/pulsar-manager/pulsar-manager/application.properties \
-v /docker/pulsar/pulsar-manager/bkvm.conf:/pulsar-manager/pulsar-manager/bkvm.conf \
-e SPRING_CONFIGURATION_FILE=/pulsar-manager/pulsar-manager/application.properties \
apachepulsar/pulsar-manager:v0.2.0 /bin/bash

# 挂载文件
docker run -it \
-d \
--name pulsar \
-p 6650:6650 \
-p 10000:8080 \
-v /docker/pulsar/pulsar/conf/:/pulsar/conf/ \
apachepulsar/pulsar:2.7.2 \
/bin/bash \
bin/pulsar standalone
```



