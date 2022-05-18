# Elasticsearch

## 基础知识

简单的与关系型数据库类比

```shell
Relational DB -> Databases -> Tables -> Rows -> Columns
Elasticsearch -> Indices   -> Types  -> Documents -> Fields
```

## 基础概念

有些概念没有及时更新，请及时充电

比如type在未来的版本中将要废弃

## 检索操作

## API

### SpringdataElasticsearch

### java-rest-high-search

参考资料

https://www.elastic.co/guide/en/elasticsearch/client/java-rest/7.4/java-rest-high-search.html

## 分词器



# 基础概念

### 1.1索引 index

​		一个索引就是一个拥有几分相似特征的文档的集合。比如说，你可以有一个客户数据的索引，另一个产品目录的索引，还有一个订单数据的索引。一个索引由一个名字来标识（必须全部是小写字母的），并且当我们要对对应于这个索引中的文档进行索引、搜索、更新和删除的时候，都要使用到这个名字。在一个集群中，可以定义任意多的索引。

### 1.2 类型 type (8版本彻底废弃)

​		在一个索引中，你可以定义一种或多种类型。一个类型是你的索引的一个逻辑上的分类/分区，其语义完全由你来定。通常，会为具有一组共同字段的文档定义一个类型。比如说，我们假设你运营一个博客平台并且将你所有的数据存储到一个索引中。在这个索引中，你可以为用户数据定义一个类型，为博客数据定义另一个类型，当然，也可以为评论数据定义另一个类型。

### 1.3 字段Field

相当于是数据表的字段，对文档数据根据不同属性进行的分类标识

### 1.4 映射 mapping（重要）

​		mapping是处理数据的方式和规则方面做一些限制，如某个字段的数据类型、默认值、分析器、是否被索引等等，这些都是映射里面可以设置的，其它就是处理es里面数据的一些使用规则设置也叫做映射，按着最优规则处理数据对性能提高很大，因此才需要建立映射，并且需要思考如何建立映射才能对性能更好。

### 1.5 文档 document

​		一个文档是一个可被索引的基础信息单元。比如，你可以拥有某一个客户的文档，某一个产品的一个文档，当然，也可以拥有某个订单的一个文档。文档以JSON（Javascript Object Notation）格式来表示，而JSON是一个到处存在的互联网数据交互格式。

在一个index/type里面，你可以存储任意多的文档。注意，尽管一个文档，物理上存在于一个索引之中，文档必须被索引/赋予一个索引的type。

### 1.6 接近实时 NRT

​		Elasticsearch是一个接近实时的搜索平台。这意味着，从索引一个文档直到这个文档能够被搜索到有一个轻微的延迟（通常是1秒以内）

### 1.7 集群 cluster

​		一个集群就是由一个或多个节点组织在一起，它们共同持有整个的数据，并一起提供索引和搜索功能。一个集群由一个唯一的名字标识，这个名字默认就是“elasticsearch”。这个名字是重要的，因为一个节点只能通过指定某个集群的名字，来加入这个集群

### 1.8 节点 node

​		一个节点是集群中的一个服务器，作为集群的一部分，它存储数据，参与集群的索引和搜索功能。和集群类似，一个节点也是由一个名字来标识的，默认情况下，这个名字是一个随机的漫威漫画角色的名字，这个名字会在启动的时候赋予节点。这个名字对于管理工作来说挺重要的，因为在这个管理过程中，你会去确定网络中的哪些服务器对应于Elasticsearch集群中的哪些节点。

​		一个节点可以通过配置集群名称的方式来加入一个指定的集群。默认情况下，每个节点都会被安排加入到一个叫做“elasticsearch”的集群中，这意味着，如果你在你的网络中启动了若干个节点，并假定它们能够相互发现彼此，它们将会自动地形成并加入到一个叫做“elasticsearch”的集群中。

​		在一个集群里，只要你想，可以拥有任意多个节点。而且，如果当前你的网络中没有运行任何Elasticsearch节点，这时启动一个节点，会默认创建并加入一个叫做“elasticsearch”的集群。

### 1.9 分片和复制 shards&replicas

​		一个索引可以存储超出单个结点硬件限制的大量数据。比如，一个具有10亿文档的索引占据1TB的磁盘空间，而任一节点都没有这样大的磁盘空间；或者单个节点处理搜索请求，响应太慢。为了解决这个问题，Elasticsearch提供了将索引划分成多份的能力，这些份就叫做分片。当你创建一个索引的时候，你可以指定你想要的分片的数量。每个分片本身也是一个功能完善并且独立的“索引”，这个“索引”可以被放置到集群中的任何节点上。分片很重要，主要有两方面的原因： 
1）允许你水平分割/扩展你的内容容量。 
2）允许你在分片（潜在地，位于多个节点上）之上进行分布式的、并行的操作，进而提高性能/吞吐量。

​		至于一个分片怎样分布，它的文档怎样聚合回搜索请求，是完全由Elasticsearch管理的，对于作为用户的你来说，这些都是透明的。

​		在一个网络/云的环境里，失败随时都可能发生，在某个分片/节点不知怎么的就处于离线状态，或者由于任何原因消失了，这种情况下，有一个故障转移机制是非常有用并且是强烈推荐的。为此目的，Elasticsearch允许你创建分片的一份或多份拷贝，这些拷贝叫做复制分片，或者直接叫复制。

​		复制之所以重要，有两个主要原因： 在分片/节点失败的情况下，提供了高可用性。因为这个原因，注意到复制分片从不与原/主要（original/primary）分片置于同一节点上是非常重要的。扩展你的搜索量/吞吐量，因为搜索可以在所有的复制上并行运行。总之，每个索引可以被分成多个分片。一个索引也可以被复制0次（意思是没有复制）或多次。一旦复制了，每个索引就有了主分片（作为复制源的原来的分片）和复制分片（主分片的拷贝）之别。分片和复制的数量可以在索引创建的时候指定。在索引创建之后，你可以在任何时候动态地改变复制的数量，但是你事后不能改变分片的数量。

​		默认情况下，Elasticsearch中的每个索引被分片5个主分片和1个复制，这意味着，如果你的集群中至少有两个节点，你的索引将会有5个主分片和另外5个复制分片（1个完全拷贝），这样的话每个索引总共就有10个分片。

# 检索操作

## 检索语法

### url 检索

```shell
curl -X<VERB> '<PROTOCOL>://<HOST>:<PORT>/<PATH>?<QUERY_STRING>' -d '<BODY>'
```

其中：

| 参数           | 解释                                                         |
| -------------- | ------------------------------------------------------------ |
| `VERB`         | 适当的 HTTP *方法* 或 *谓词* : `GET`、 `POST`、 `PUT`、 `HEAD` 或者 `DELETE`。 |
| `PROTOCOL`     | `http` 或者 `https`（如果你在 Elasticsearch 前面有一个 `https` 代理） |
| `HOST`         | Elasticsearch 集群中任意节点的主机名，或者用 `localhost` 代表本地机器上的节点。 |
| `PORT`         | 运行 Elasticsearch HTTP 服务的端口号，默认是 `9200` 。       |
| `PATH`         | API 的终端路径（例如 `_count` 将返回集群中文档数量）。Path 可能包含多个组件，例如：`_cluster/stats` 和 `_nodes/stats/jvm` 。 |
| `QUERY_STRING` | 任意可选的查询字符串参数 (例如 `?pretty` 将格式化地输出 JSON 返回值，使其更容易阅读) |
| `BODY`         | 一个 JSON 格式的请求体 (如果请求需要的话)                    |

### Query DSL

参考资料

https://www.elastic.co/guide/en/elasticsearch/reference/7.4/getting-started-search.html

# 检索入门

默认分页

## match

```shell
# 1.match_all 全匹配
# 2.match 匹配
	# 2.1 非字符串  精确匹配
	# 2.2 模糊匹配  全文检索匹配 默认按照_source 排序 对检索条件进行分词匹配
# 3.match_phrase 短语匹配   完整匹配 不进行分词
# 4.multi_match  多字段匹配  也会进行分词

GET bank/_search
{
  "query": {
    "match": {
      "balance": 28838
    }
  }
}

GET bank/_search
{
  "query": {
    "match_phrase": {
      "address": "mill lane"
    }
  }
}


GET bank/_search
{
  "query": {
    "multi_match": {
      "query": "mill Movico"
      , "fields": ["address","city"]
    }
  }
}


# 精确匹配 不分词 绝对匹配
# 说明：条件中必须匹配该value中的字段，集合中 相等范畴
GET bank/_search
{
  "query": {
    "match": {
      "address.keyword":"789"
    }
  }
}

# 精确匹配 不分词 部分匹配
# 说明：条件中必须匹配该value中的整体字段，集合中 属于范畴
GET bank/_search
{
  "query": {
    "match_phrase": {
      "address":"789"
    }
  }
}
```

## _source

```shell
# 列出所需要的字段 类似关系型数据库中的 获取需要的 字段
```

## bool 查询

```shell
# 1.1 must 必须满足
# 1.2 must_not 必须不满足
# 1.3 shoud 应该匹配  满足最好
# 1.4 filter 结果过滤
  # 不会计算相关性得分
  
GET bank/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {
          "gender": "M"
        }}
        ,{
          "match": {
            "address": "mill"
          }
        } 
      ]
      , "must_not": [
        {"match": {
          "age": "28"
        }}
      ]
      , "should": [
        {"match": {
          "lastname": "Holland"
        }}
      ]
    }
  }
}


# filter
GET bank/_search
{
  "query": {
    "bool": {
      "filter": {"range": {
        "age": {
          "gte": 10,
          "lte": 20
        }
      }}
    }
  }
}
```

## term查询





# 分析聚合

## aggregation

```shell
GET bank/_search
{
 "query": {
   "match": {
     "address": "mill"
   }
 },
 "aggs": {
   "ageAgg": {
     "terms": {
       "field": "age",
       "size": 10
     }
   },
   "ageAvg":{
     "avg": {
       "field": "age"
     }
   },
   "balanceAvg":{
     "avg": {
       "field": "balance"
     }
   }
   
 },
 "size": 0

}
```

# 嵌套查询

参考资料

https://www.elastic.co/guide/en/elasticsearch/reference/7.4/nested.html

```shell
# 为什么要有嵌套查询

PUT my_index/_doc/1
{
  "group" : "fans",
  "user" : [ 
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}

# 数据会被扁平化处理
{
  "group" :        "fans",
  "user.first" : [ "alice", "john" ],
  "user.last" :  [ "smith", "white" ]
}

GET my_index/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "user.first": "Alice" }},
        { "match": { "user.last":  "Smith" }}
      ]
    }
  }
}


# 修正
PUT my_index
{
  "mappings": {
    "properties": {
      "user": {
        "type": "nested" 
      }
    }
  }
}

PUT my_index/_doc/1
{
  "group" : "fans",
  "user" : [
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}

GET my_index/_search
{
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [
            { "match": { "user.first": "Alice" }},
            { "match": { "user.last":  "Smith" }} 
          ]
        }
      }
    }
  }
}

GET my_index/_search
{
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [
            { "match": { "user.first": "Alice" }},
            { "match": { "user.last":  "White" }} 
          ]
        }
      },
      "inner_hits": { 
        "highlight": {
          "fields": {
            "user.first": {}
          }
        }
      }
    }
  }
}
```



## nested







# 其他操作

## mapping操作

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





# 一些废话

## 什么是ElasticSearch

Elaticsearch，简称为es， es是一个开源的高扩展的分布式全文检索引擎，它可以近乎实时的存储、检索数据；本身扩展性很好，可以扩展到上百台服务器，处理PB级别的数据。es也使用Java开发并使用Lucene作为其核心来实现所有索引和搜索的功能，但是它的目的是通过简单的RESTful API来隐藏Lucene的复杂性，从而让全文搜索变得简单。

## ElasticSearch对比Solr

- Solr 利用 Zookeeper 进行分布式管理，而 Elasticsearch 自身带有分布式协调管理功能;
- Solr 支持更多格式的数据，而 Elasticsearch 仅支持json文件格式；
- Solr 官方提供的功能更多，而 Elasticsearch 本身更注重于核心功能，高级功能多有第三方插件提供；
- Solr 在传统的搜索应用中表现好于 Elasticsearch，但在处理实时搜索应用时效率明显低于 Elasticsearch

## ElasticSearch的使用案例

- 2013年初，GitHub抛弃了Solr，采取ElasticSearch 来做PB级的搜索。 “GitHub使用ElasticSearch搜索20TB的数据，包括13亿文件和1300亿行代码”
- 维基百科：启动以elasticsearch为基础的核心搜索架构
- SoundCloud：“SoundCloud使用ElasticSearch为1.8亿用户提供即时而精准的音乐搜索服务”
- 百度：百度目前广泛使用ElasticSearch作为文本数据分析，采集百度所有服务器上的各类指标数据及用户自定义数据，通过对各种数据进行多维分析展示，辅助定位分析实例异常或业务层面异常。目前覆盖百度内部20多个业务线（包括casio、云分析、网盟、预测、文库、直达号、钱包、风控等），单集群最大100台机器，200个ES节点，每天导入30TB+数据
- 新浪使用ES 分析处理32亿条实时日志
- 阿里使用ES 构建挖财自己的日志采集和分析体系





# ElasticSearch集群

​	ES集群是一个 P2P类型(使用 gossip 协议)的分布式系统，除了集群状态管理以外，其他所有的请求都可以发送到集群内任意一台节点上，这个节点可以自己找到需要转发给哪些节点，并且直接跟这些节点通信。所以，从网络架构及服务配置上来说，构建集群所需要的配置极其简单。在 Elasticsearch 2.0 之前，无阻碍的网络下，所有配置了相同 cluster.name 的节点都自动归属到一个集群中。2.0 版本之后，基于安全的考虑避免开发环境过于随便造成的麻烦，从 2.0 版本开始，默认的自动发现方式改为了单播(unicast)方式。配置里提供几台节点的地址，ES 将其视作 gossip router 角色，借以完成集群的发现。由于这只是 ES 内一个很小的功能，所以 gossip router 角色并不需要单独配置，每个 ES 节点都可以担任。所以，采用单播方式的集群，各节点都配置相同的几个节点列表作为 router 即可。

​	集群中节点数量没有限制，一般大于等于2个节点就可以看做是集群了。一般处于高性能及高可用方面来考虑一般集群中的节点数量都是3个及3个以上。

## 1.1 集群的相关概念

### 1.1.1 集群 cluster

一个集群就是由一个或多个节点组织在一起，它们共同持有整个的数据，并一起提供索引和搜索功能。一个集群由一个唯一的名字标识，这个名字默认就是“elasticsearch”。这个名字是重要的，因为一个节点只能通过指定某个集群的名字，来加入这个集群

### 1.1.2 节点 node

一个节点是集群中的一个服务器，作为集群的一部分，它存储数据，参与集群的索引和搜索功能。和集群类似，一个节点也是由一个名字来标识的，默认情况下，这个名字是一个随机的漫威漫画角色的名字，这个名字会在启动的时候赋予节点。这个名字对于管理工作来说挺重要的，因为在这个管理过程中，你会去确定网络中的哪些服务器对应于Elasticsearch集群中的哪些节点。

一个节点可以通过配置集群名称的方式来加入一个指定的集群。默认情况下，每个节点都会被安排加入到一个叫做“elasticsearch”的集群中，这意味着，如果你在你的网络中启动了若干个节点，并假定它们能够相互发现彼此，它们将会自动地形成并加入到一个叫做“elasticsearch”的集群中。

在一个集群里，只要你想，可以拥有任意多个节点。而且，如果当前你的网络中没有运行任何Elasticsearch节点，这时启动一个节点，会默认创建并加入一个叫做“elasticsearch”的集群。

### 1.1.3 分片和复制 shards&replicas

一个索引可以存储超出单个结点硬件限制的大量数据。比如，一个具有10亿文档的索引占据1TB的磁盘空间，而任一节点都没有这样大的磁盘空间；或者单个节点处理搜索请求，响应太慢。为了解决这个问题，Elasticsearch提供了将索引划分成多份的能力，这些份就叫做分片。当你创建一个索引的时候，你可以指定你想要的分片的数量。每个分片本身也是一个功能完善并且独立的“索引”，这个“索引”可以被放置到集群中的任何节点上。分片很重要，主要有两方面的原因： 
1）允许你水平分割/扩展你的内容容量。 
2）允许你在分片（潜在地，位于多个节点上）之上进行分布式的、并行的操作，进而提高性能/吞吐量。

至于一个分片怎样分布，它的文档怎样聚合回搜索请求，是完全由Elasticsearch管理的，对于作为用户的你来说，这些都是透明的。

在一个网络/云的环境里，失败随时都可能发生，在某个分片/节点不知怎么的就处于离线状态，或者由于任何原因消失了，这种情况下，有一个故障转移机制是非常有用并且是强烈推荐的。为此目的，Elasticsearch允许你创建分片的一份或多份拷贝，这些拷贝叫做复制分片，或者直接叫复制。

复制之所以重要，有两个主要原因： 在分片/节点失败的情况下，提供了高可用性。因为这个原因，注意到复制分片从不与原/主要（original/primary）分片置于同一节点上是非常重要的。扩展你的搜索量/吞吐量，因为搜索可以在所有的复制上并行运行。总之，每个索引可以被分成多个分片。一个索引也可以被复制0次（意思是没有复制）或多次。一旦复制了，每个索引就有了主分片（作为复制源的原来的分片）和复制分片（主分片的拷贝）之别。分片和复制的数量可以在索引创建的时候指定。在索引创建之后，你可以在任何时候动态地改变复制的数量，但是你事后不能改变分片的数量。

默认情况下，Elasticsearch中的每个索引被分片5个主分片和1个复制，这意味着，如果你的集群中至少有两个节点，你的索引将会有5个主分片和另外5个复制分片（1个完全拷贝），这样的话每个索引总共就有10个分片。

## 2.2 集群的搭建

### 2.2.1 准备三台elasticsearch服务器

创建elasticsearch-cluster文件夹，在内部复制三个elasticsearch服务

### 2.2.2 修改每台服务器配置

修改elasticsearch-cluster\node*\config\elasticsearch.yml配置文件

#### node1节点：

```yaml
#节点1的配置信息：
#集群名称，保证唯一
cluster.name: my-elasticsearch
#节点名称，必须不一样
node.name: node-1
#必须为本机的ip地址
network.host: 127.0.0.1
#服务端口号，在同一机器下必须不一样
http.port: 9200
#集群间通信端口号，在同一机器下必须不一样
transport.tcp.port: 9300
#设置集群自动发现机器ip集合
discovery.zen.ping.unicast.hosts: ["127.0.0.1:9300","127.0.0.1:9301","127.0.0.1:9302"]
```

#### node2节点：

```yaml
#节点2的配置信息：
#集群名称，保证唯一
cluster.name: my-elasticsearch
#节点名称，必须不一样
node.name: node-2
#必须为本机的ip地址
network.host: 127.0.0.1
#服务端口号，在同一机器下必须不一样
http.port: 9201
#集群间通信端口号，在同一机器下必须不一样
transport.tcp.port: 9301
#设置集群自动发现机器ip集合
discovery.zen.ping.unicast.hosts: ["127.0.0.1:9300","127.0.0.1:9301","127.0.0.1:9302"]
```

#### node3节点：

```yaml
#节点3的配置信息：
#集群名称，保证唯一
cluster.name: my-elasticsearch
#节点名称，必须不一样
node.name: node-3
#必须为本机的ip地址
network.host: 127.0.0.1
#服务端口号，在同一机器下必须不一样
http.port: 9202
#集群间通信端口号，在同一机器下必须不一样
transport.tcp.port: 9302
#设置集群自动发现机器ip集合
discovery.zen.ping.unicast.hosts: ["127.0.0.1:9300","127.0.0.1:9301","127.0.0.1:9302"]
```

### 2.2.3 启动各个节点服务器

双击elasticsearch-cluster\node*\bin\elasticsearch.bat

#### 启动节点1：

![](C:/Users/lenovo/Desktop/image/21.png)

#### 启动节点2：

![](C:/Users/lenovo/Desktop/image/22.png)

#### 启动节点3：

![](C:/Users/lenovo/Desktop/image/23.png)

### 2.2.4 集群测试

#### 添加索引和映射

```json
PUT		localhost:9200/blog1
```

```json
{
    "mappings": {
        "article": {
            "properties": {
                "id": {
                	"type": "long",
                    "store": true,
                    "index":"not_analyzed"
                },
                "title": {
                	"type": "text",
                    "store": true,
                    "index":"analyzed",
                    "analyzer":"standard"
                },
                "content": {
                	"type": "text",
                    "store": true,
                    "index":"analyzed",
                    "analyzer":"standard"
                }
            }
        }
    }
}
```

#### 添加文档

```json
POST	localhost:9200/blog1/article/1
```

```json
{
	"id":1,
	"title":"ElasticSearch是一个基于Lucene的搜索服务器",
	"content":"它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。Elasticsearch是用Java开发的，并作为Apache许可条款下的开放源码发布，是当前流行的企业级搜索引擎。设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。"
}
```

#### 使用elasticsearch-header查看集群情况
