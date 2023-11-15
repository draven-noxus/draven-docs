# Elasticsearch

# Elasticsearch-SQL

```shell
# 明确es与sql的对应关系
```



| 备注     | SQL              | ES               | 备注 |
| -------- | ---------------- | ---------------- | ---- |
| 字段     | column           | field            | 字段 |
| 行       | row              | document         | 文档 |
| 表       | table            | index            | 索引 |
| 创建语句 | schema           | Implicit         | 映射 |
| 数据库   | catalog/database | cluster instance | 实例 |
| 集群     | cluster          | cluster          | 集群 |

```shell
# 安全相关
# 暂时不做学习
```



```shell
# 启动SQL指令

./bin/elasticsearch-sql-cli

# 常用命令

# ./bin/elasticsearch-sql-cli
./bin/elasticsearch-sql-cli https://some.server:9200

# ./bin/elasticsearch-sql-cli https://username:password@host_name:port
./bin/elasticsearch-sql-cli https://sql_user:strongpassword@some.server:9200

#  位置: bin/elasticsearch-sql-cli-7.9.3.jar
./java -jar [PATH_TO_CLI_JAR]/elasticsearch-sql-cli-[VERSION].jar https://some.server:9200

# 
./java -cp [PATH_TO_CLI_JAR]/elasticsearch-sql-cli-[VERSION].jar org.elasticsearch.xpack.sql.cli.Cli https://some.server:9200

# DSL语法
POST /_sql?format=txt
{
  "query": "SELECT * FROM library WHERE release_date < '2000-01-01'"
}



# SQL语法
sql> SELECT * FROM library WHERE release_date < '2000-01-01';


```



```shell
# SQL Rest API

# 1.格式化-响应 
```

| 格式化 |           参数            | 备注 |
| :----: | :-----------------------: | :--: |
|  csv   |         text/csv          |      |
|  json  |     application/json      |      |
|  tsv   | text/tab-separated-values |      |
|  txt   |        text/plain         |      |
|  yaml  |     application/yaml      |      |
| cobra  |     application/cbor      |      |
| smile  |     application/smile     |      |

```shell
# 示例
POST /_sql?format=csv
{
  "query": "SELECT * FROM library ORDER BY page_count DESC",
  "fetch_size": 5
}
```





```shell l
# 分页复杂（大）响应  此处文档-实际情况错误
```





```shell
# 使用SQL+DSL(条件过滤)
POST /_sql?format=json
{
  "query": "SELECT * FROM library ORDER BY page_count DESC",
  "filter": {
    "range": {
      "page_count": {
        "gte" : 100,
        "lte" : 200
      }
    }
  },
  "fetch_size": 5
}


# 结果展示 Columnar results
# 查询结果会按照制定的格式展示
```



```shell
# 参数查询
# 占位符
POST /_sql?format=txt
{
	"query": "SELECT YEAR(release_date) AS year FROM library WHERE page_count > ? AND author = ? GROUP BY year HAVING COUNT(*) > ?",
	"params": [300, "Frank Herbert", 0]
}
```

|      | 名称类型                   | 默认值     | 备注 |
| ---- | -------------------------- | ---------- | ---- |
|      | query                      | Mandatory  |      |
|      | fetch_size                 | 1000       |      |
|      | filter                     | none       |      |
|      | request_timeout            | 90s        |      |
|      | page_timeout               | 45s        |      |
|      | time_zone                  | Z (or UTC) |      |
|      | columnar                   | false      |      |
|      | field_multi_value_leniency | false      |      |
|      | index_include_frozen       | fßalse     |      |
|      | params                     | none       |      |





```shell
# 可以将SQL翻译为DSL语法
# 如果你还不熟悉DSL语法可以使用这个API哦
# 示例
POST /_sql/translate
{
  "query": "SELECT * FROM library ORDER BY page_count DESC",
  "fetch_size": 10
}
```





SQL JDBC

SQL ODBC

主要包含一些界面软件





针对SQl语法的一些介绍

功能与运算符