# Kafka

## Consumer

```shell
org.apache.kafka.clients.consumer.ConsumerConfig
```



## Producer

```shell
org.apache.kafka.clients.producer.ProducerConfig
```



## AdminClient

```shell
org.apache.kafka.clients.admin.AdminClientConfig
```



## Stream

```shell
# StreamsConfig
org.apache.kafka.streams.StreamsConfig
```

## Connector

```shell
# Connector
```



```shell
1、启动Kafka
bin/kafka-server-start.sh config/server.properties &

2、停止Kafka
bin/kafka-server-stop.sh

3、创建Topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic jiangzh-topic

4、查看已经创建的Topic信息
bin/kafka-topics.sh --list --zookeeper localhost:2181

5、发送消息
bin/kafka-console-producer.sh --broker-list 192.168.220.128:9092 --topic jiangzh-topic

6、接收消息
bin/kafka-console-consumer.sh --bootstrap-server 192.168.220.128:9092 --topic jiangzh-topic --from-beginning
bin/kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 --topic jiangzh-topic --from-beginning


{"orderId":"002","price":"80"}
```

```shell
./kafka-manager 

vi conf/application.conf

127.0.0.1:2181
```

```shell
## connect启动命令
bin/connect-distributed.sh -daemon config/connect-distributed.properties
bin/connect-distributed.sh config/connect-distributed.properties


http://127.0.0.1:8083/connector-plugins

http://127.0.0.1:8083	


curl -X POST -H 'Content-Type: application/json' -i 'http://127.0.0.1:8083/connectors' \
--data \
'{"name":"imooc-upload-mysql","config":{
"connector.class":"io.confluent.connect.jdbc.JdbcSourceConnector",
"connection.url":"jdbc:mysql://127.0.0.1:3306/db_account?user=root&password=12345678",
"table.whitelist":"account_tbl",
"incrementing.column.name": "uuid",
"mode":"incrementing",
"topic.prefix": "imooc-mysql-"}}'

bin/kafka-console-consumer.sh --bootstrap-server 192.168.220.128:9092 --topic imooc-mysql-users --from-beginning

bin/kafka-console-consumer.sh --bootstrap-server 127.0.0.1:9092 --topic imooc-mysql-account_tbl --from-beginning

curl -X POST -H 'Content-Type: application/json' -i 'http://192.168.220.128:8083/connectors' \
--data \
'{"name":"imooc-download-mysql","config":{
"connector.class":"io.confluent.connect.jdbc.JdbcSinkConnector",
"connection.url":"jdbc:mysql://192.168.0.104:3306/kafka_study?user=root&password=123456",
"topics":"imooc-mysql-users",
"auto.create":"false",
"insert.mode": "upsert",
"pk.mode":"record_value",
"pk.fields":"uuid",
"table.name.format": "users_bak"}}'


bin/kafka-console-consumer.sh --bootstrap-server 192.168.220.128:9092 --topic test-mysql-jdbc-users --from-beginning


curl -X DELETE -i 'http://192.168.220.128:8083/connectors/load-mysql-data'
```







```shell
# 下载export
https://github.com/danielqsj/kafka_exporter/releases
# 运行export
./kafka_exporter --kafka.server=127.0.0.1:9092

# 
```

