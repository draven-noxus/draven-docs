# RocketMQ

```shell
docker pull foxiswho/rocketmq:server-4.5.2
docker pull foxiswho/rocketmq:broker-4.5.2

vi /docker/rocketmq/rmqbroker/conf
brokerIP1=172.16.244.128
namesrvAddr=172.16.244.128:9876
brokerName=broker_test

#创建nameserver容器
docker create -p 9876:9876 --name rmqserver \
-e "JAVA_OPT_EXT=-server -Xms128m -Xmx128m -Xmn128m" \
-e "JAVA_OPTS=-Duser.home=/opt" \
-v /docker/rocketmq/rmqserver/logs:/opt/logs \
-v /docker/rocketmq/rmqserver/store:/opt/store \
foxiswho/rocketmq:server-4.5.2


# 创建broker容器
docker create -p 10911:10911 -p 10909:10909 --name rmqbroker \
-e "JAVA_OPTS=-Duser.home=/opt" \
-e "JAVA_OPT_EXT=-server -Xms128m -Xmx128m -Xmn128m" \
-v /docker/rocketmq/rmqbroker/conf/broker.conf:/etc/rocketmq/broker.conf \
-v /docker/rocketmq/rmqbroker/logs:/opt/logs \
-v /docker/rocketmq/rmqbroker/store:/opt/store \
foxiswho/rocketmq:broker-4.5.2


# styletang/rocketmq-console-ng
docker run -e "JAVA_OPTS=-Drocketmq.namesrv.addr=172.16.244.128:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" -p 8082:8080 -t styletang/rocketmq-console-ng
```