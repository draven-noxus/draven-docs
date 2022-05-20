# Elasticsearch

## 安装Elasticsearch

### 本地安装

```shell
# 下载安装包
https://www.elastic.co/cn/downloads/past-releases/elasticsearch-6-8-5
# 解压 进入 bin 执行命令
elasticsearch
# 测试
http:ip:9200/
# 结果
{
    "name" : "uV2glMR",
    "cluster_name" : "elasticsearch", "cluster_uuid" : "RdV7UTQZT1‐Jnka9dDPsFg", "version" : {
    "number" : "5.6.8",
    "build_hash" : "688ecce",
    "build_date" : "2018‐02‐16T16:46:30.010Z", "build_snapshot" : false,
    "lucene_version" : "6.6.1"
    },
    "tagline" : "You Know, for Search"
}

```

### Docker安装

```shell
# 获取镜像
docker pull docker.io/elasticsearch:6.8.5

# 指定内存
docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -di --name=elasticsearch -e "discovery.type=single-node" -p 9200:9200 -p 9300:9300 -v elasticsearch:6.8.5

# 获取elasticsearch.yml文件
# docker cp containername:source.yaml des.yaml
docker cp elasticsearch:/usr/share/elasticsearch/config/elasticsearch.yml /docker/elasticsearch/conf/elasticsearch.yml

# 删停容器
docker stop elasticsearch
docker rm  elasticsearch
docker restart elasticsearch

# 修改配置文件 提供springboot配置以连接9300端口

cluster.name: "elasticsearch"
network.host: 0.0.0.0
network.bind_host: 0.0.0.0
network.publish_host: localhost
# http.port: 9200
# transport.tcp.port: 9300
# head插件跨域
http.cors.enabled: true
http.cors.allow-origin: "*"
node.master: true
node.data: true

# 重新启动容器（挂载配置文件）
docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -di --name=elasticsearch -p 9200:9200 -p 9300:9300 -v /docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml elasticsearch


# 不挂载分词器目录
docker run \
-e ES_JAVA_OPTS="-Xms256m -Xmx256m" \
-di \
--name=elasticsearch \
-p 9200:9200 -p 9300:9300 \
-v /docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
elasticsearch:6.8.5

# 挂载分词器目录
docker run \
-e ES_JAVA_OPTS="-Xms256m -Xmx256m" \
-di \
--name=elasticsearch \
-p 9200:9200 -p 9300:9300 \
-v /docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /docker/elasticsearch/plugins/:/usr/share/elasticsearch/plugins/* \
elasticsearch:6.8.5


# test
http://116.196.77.250:9200/
```

## 安装Analysis-ik

### 本地安装

```shell
# 下载对应分词器
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v6.8.5/elasticsearch-analysis-ik-6.8.5.zip

wget https://artifacts.elastic.co/downloads/elasticsearch-plugins/ingest-attachment/ingest-attachment-6.8.5.zip

unzip -d . xxxx.zip
```

### Docker安装

```shell
# 进入容器内部  
docker exec -it elasticsearch /bin/bash
# 切换插件目录
cd usr/share/elasticsearch/plugins
# 安装对应版本插件
elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v6.8.5/elasticsearch-analysis-ik-6.8.5.zip
# 查看结果
analysis-ik

# 拼音插件
elasticsearch-plugin install https://artifacts.elastic.co/downloads/elasticsearch-plugins/ingest-attachment/ingest-attachment-6.8.5.zip

# 或者将宿主机解压好的插件copy至对应目录
docker cp ik elasticsearch:/usr/share/elasticsearch/plugins/
```

### 简单配置分词器

```shell
# 进入目录
elasticsearch/plugins/ik/config
# 修改IKAnalyzer.cfg.xml
# 请参考同目录 main.dic
```



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典 -->
        <entry key="ext_dict">my.dic</entry>
         <!--用户可以在这里配置自己的扩展停止词字典-->
        <entry key="ext_stopwords"></entry>
        <!--用户可以在这里配置远程扩展字典 -->
        <!-- <entry key="remote_ext_dict">words_location</entry> -->
        <!--用户可以在这里配置远程扩展停止词字典-->
        <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```



## 安装Head插件

```shell
# 获取镜像
# 只支持elasticsearch 5.x
docker pull  docker.io/mobz/elasticsearch-head:5
# 支持elasticsearch 6.x
docker pull yanliangzhong/elasticsearch-head(可用)

# 构建容器
docker run -d --name head-es -p 9100:9100 mobz/elasticsearch-head:5

docker run -d --name head-es -p 9100:9100 yanliangzhong/elasticsearch-head

# test
http://116.196.77.250:9101/
```



# 安装Kibana

```shell
# 编辑配置文件
    server.name: kibana
    server.host: "0"
    elasticsearch.hosts: [ "http://111.67.196.127:9200" ]
    xpack.monitoring.ui.container.elasticsearch.enabled: true

# 获取镜像
docker pull docker.io/kibana:6.8.5
# 进入容器内部
docker exec -it kibana6.8 /bin/bash
# 查看配置文件 注意elasticsearch的地址
cd /usr/share/kibana/config

    server.name: kibana
    server.host: "0"
    elasticsearch.hosts: [ "http://116.196.77.250:9200" ]
    xpack.monitoring.ui.container.elasticsearch.enabled: true

# 运行容器
docker run -d \
--name kibana6.8 \
-p 15601:5601 \
-v /docker/kibana/conf/kibana.yml:/usr/share/kibana/config/kibana.yml \
-e ELASTICSEARCH_URL=http://116.196.77.250:9200 docker.io/kibana:6.8.5

# example
docker run -d \
--name kibana6.8 \
-p 5601:5601 \
docker.io/kibana:6.8.5
```

## 插件

### Logtrail

版本较多

```shell
# 进入容器
docker exec -it kibana6.8 /bin/bash

# 安装插件
./bin/kibana-plugin install https://github.com/sivasamyk/logtrail/releases/download/v0.1.31/logtrail-6.6.0-0.1.31.zip

# 查看位置
/usr/share/kibana/plugins/logtrail

# 重启应用
docker restart -it kibana6.8
```



# Logstash

## 安装Logstash

### 本地安装

```shell
wget ttps://github.com/elastic/logstash/archive/v6.8.5.tar.gz
tat -zxvf xxx..tar.gz

cd ${pwd}/logstash-6.8.5/bin/logstash -f xxx.conf


# demo
vi mysql.conf

input {
                jdbc {
                                        # mysql jdbc connection string to our backup databse 后面的test 对应mysql中的test数据库
                                        jdbc_connection_string=>"jdbc:mysql://116.196.77.250:3306/tensquare_article?characterEncoding=UTF8"
                                        # the user we wish to excute our statement as
                                        jdbc_user => "root"
                                        jdbc_password => "root"
                                        # the path to our downloaded jdbc driver
                                        jdbc_driver_library => "/docker/logstash/mysql-connector-java-8.0.15.jar"
                                        # the name of the driver class for mysql
                                        jdbc_driver_class => "com.mysql.jdbc.Driver"
                                        jdbc_paging_enabled => "true"
                                        jdbc_page_size => "50000" #以下对应着要执行的sql的绝对路径。
                                        statement => "select id,title,content from tb_article"
                                        #定时字段 各字段含义(由左至右)分、时、天、月、年，全部为*默认含义为 每分钟都更新
                                        schedule => "* * * * *" }
}
output {
    elasticsearch {
          #ESIP地址与端口
          hosts => "http://116.196.77.250:9200" #ES索引名称(自己定义的)
          index => "tensquare"
          #自增ID编号
          document_id => "%{id}"
          document_type => "article"
        }
                stdout {
          #以JSON格式输出
          codec => json_lines }
}

```

### docker安装

```shell
docker run -idt \
--name leon_logstash \
-p 5044:5044 \
-p 9600:9600 \
-v /docker/logstash/data/logstash.yml:/usr/share/logstash/config/logstash.yml \
-v /docker/logstash/data/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
-v /docker/logstash/data/jvm.options:/usr/share/logstash/config/jvm.options \
/docker.elastic.co/logstash/logstash:6.8.5 

# 其他文件
-v /docker/logstash/data/logstash.conf:/usr/share/logstash/config/logstash.conf \
-v /docker/logstash/log/:/usr/local/logs.log \



## JVM configuration

# Xms represents the initial size of total heap space
# Xmx represents the maximum size of total heap space

-Xms128m
-Xmx128m

################################################################
## Expert settings
################################################################
##
## All settings below this section are considered
## expert settings. Don't tamper with them unless
## you understand what you are doing
##
################################################################

## GC configuration
```



# 安装Filebeat

##  filebeat.docker.yml

```shell
curl -L -O https://raw.githubusercontent.com/elastic/beats/7.1/deploy/docker/filebeat.docker.yml
```

```shell
filebeat.inputs:
- type: log
  enabled: true
  paths:
  - /var/log/nginx/*.log

output.logstash:
  hosts: ['{ip}:5044']
```

## 运行脚本

```shell
docker pull store/elastic/filebeat:6.8.5

# demo 挂载demo
docker run --name filebeat --user=root -d --net somenetwork --volume="{nginx-path}:/var/log/nginx/" --volume="{path}/filebeat.docker.yml:/usr/share/filebeat/filebeat.yml:ro" --volume="/var/lib/docker/containers:/var/lib/docker/containers:ro" --volume="/var/run/docker.sock:/var/run/docker.sock:ro" store/elastic/filebeat:7.1.1

# 运行镜像
docker run --name filebeat --user=root -d  --volume="/var/log/nginx/:/var/log/nginx/" --volume="/docker/filebeat/conf/filebeat.docker.yml:/usr/share/filebeat/filebeat.yml:ro" --volume="/var/lib/docker/containers:/var/lib/docker/containers:ro" --volume="/var/run/docker.sock:/var/run/docker.sock:ro" -e output.elasticsearch.hosts=["172.16.244.131:9200"] store/elastic/filebeat:6.8.5
```

# 体系

filebeat+logstash+elasticsearch+kibana

## 配置filebeat

见《安装filebeat》

```

```

## 配置logstash

### logstash.yml

```yaml
# logstash.yml
path.config: /usr/share/logstash/conf.d/*.conf
path.logs: /var/log/logstash
```

### test.conf

```shell
# test.conf

input {
    beats {
    port => 5044
    codec => "json"
 }
}

output {
  elasticsearch { hosts => ["elasticsearch:9200"] }
  stdout { codec => rubydebug }
}
```

### 运行脚本

```shell
docker run -it -d -p 5044:5044 --name logstash --net somenetwork -v {path}/logstash.yml:/usr/share/logstash/config/logstash.yml -v {path}/conf.d/:/usr/share/logstash/conf.d/ logstash:7.1.1


docker run -it -d -p 5044:5044 --name logstash  -v /docker/logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml -v /docker/logstash/config/conf.d/:/usr/share/logstash/conf.d/ logstash:6.8.5
```



## 配置Kibana

见《安装Kibana》



## 配置Elasticsearch

见《安装Elasticsearch》



# FQA

## 1.vm.max_map_count

```sh lesh l
[1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
```



```shell
# 切换到root用户
# 执行命令：
sysctl -w vm.max_map_count=262144
# 查看结果：
sysctl -a|grep vm.max_map_count
# 显示：
vm.max_map_count = 262144
# 上述方法修改之后，如果重启虚拟机将失效，所以：
# 解决办法：
#在/etc/sysctl.conf文件最后添加一行
vm.max_map_count=262144
# 即可永久修改
# 使修改生效
sysctl ‐p


# 第二处
vi /etc/security/limits.conf
# nofile是单个进程允许打开的最大文件个数
# soft nofile 是软限制
# hard nofile 是硬限制
* soft nofile 65536
* hard nofile 65536


sysctl ‐p
```

## 2.memory

```shell
ES_JAVA_OPTS="-Xms256m -Xmx256m"
```



```shell
# 修改容器内存大小，否则内存不够无法启动
docker run -e ES_JAVA_OPTS="-Xms256m -Xmx256m" -d -p 9200:9200 -p 9300:9300 --name elasticsearch  elasticsearch  
```

## 3.port9300

```shell
# 然后我们的9300是不能访问的，因为他不让我们访问我们需要修改配置文件，但是文件在内存中运行，所以我们先把配置文件复制出来改掉然后再运行
docker exec -it  elasticsearch /bin/bash

# 进入配置文件复制他的路径
cd config 
/usr/share/elasticsearch/config
# 然后找到他的yml配置文件
/usr/share/elasticsearch/config/elasticsearch.yml

# 退出
exit

# 文件复制出来 
docker cp elasticsearch:/usr/share/elasticsearch/config/elasticsearch.yml  /usr/share/elasticsearch.yml

# 复制到本地的
vim /usr/share/elasticsearch.yml

# 将他第二行的注释去掉

# 然后我们将以前的启动的容器停止掉
docker run --name=elasticsearch -p 9200:9200 -p 9300:9300 -v /usr/share/elasticsearch.yml:/docker/elasticsearch/config/elasticsearch.yml elasticsearch

# 验证
curl -H 'Content-Type: application/json'  -XGET 'localhost:9200/_analyze?pretty' -d '{"text":"白俊遥技术博客"}'

docker cp ik elasticsearch:/usr/share/elasticsearch/plugins/
```

## 4.系统调优

```shell
# 修改-追加内容
vi /etc/security/limits.conf
soft nofile 65536
hard nofile 65536
```

## 5.Head插件跨域

```shell
# error
No 'Access-Control-Allow-Origin' header is present on the requested resource
# 先从Es中将这个文件从这个容器中拷贝出来
docker cp elasticsearch6.7:/usr/share/elasticsearch/config/elasticsearch.yml /root/elasticsearch.yml

# 然后编辑拷贝出来的容器
vim /root/elasticsearch.yml 
	
# 将下面两行代码加入Es当中，开启Elasticsearch的跨域
http.cors.enabled: true
http.cors.allow-origin: "*"

# 然后把这个文件cp到容器中
docker cp /root/elasticsearch.yml elasticsearch6.7:/usr/share/elasticsearch/config/elasticsearch.yml

# 然后重启容器
docker restart elasticsearch
```

## 参考

https://www.cnblogs.com/fbtop/p/11005469.html

