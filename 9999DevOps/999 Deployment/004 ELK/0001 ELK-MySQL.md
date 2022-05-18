# ELK-MySQL

```shell
# 参考资料
# https://www.elastic.co/guide/en/logstash/7.x/input-plugins.html
# https://github.com/alibaba/canal/releases/download/canal-1.1.4/canal.adapter-1.1.4.tar.gz
# https://github.com/alibaba/canal/releases/download/canal-1.1.4/canal.deployer-1.1.4.tar.gz
# 所需环境
logstash
elasticsearch
kibana
canal
# 流程
# 应用系统-->KafKa-->Logstash-->Elasticsearch-->Kibana-->查看日志
```





```shell
全量索引构建

增量索引构建

增量构建方式


# logstash-input-jdbc
# 监听mysql变化 获取数据 通过该组件 同步到 elasticsearch
	# 全量索引构建
		# 分页操作
	
# 核心步骤
	# 数据源 数据目标 同步方式

```

# 环境搭建

```shell
# 搭建logstash不涉及
cd bin
./logstash-plugin install logstash-input-jdbc

# 建议创建mysql目录
mkdir mysql
# 添加MySQL驱动
mv mysql-connector-java-x.x.x.jar mysql
touch jdbc.conf
touch jdbc.sql


vi jdbc.conf

input {
    jdbc {
      #设置timezone
      jdbc_default_timezone => "Asia/Shanghai"
      # mysql 数据库链接,dianpingdb为数据库名
      jdbc_connection_string => "jdbc:mysql://127.0.0.1:3306/dianpingdb"
      # 用户名和密码
      jdbc_user => "root"
      #jdbc_password => "root"
      jdbc_password => "root"
      # 驱动
      #jdbc_driver_library => "/Users/hzllb/Desktop/devtool/logstash-7.3.0/bin/mysql/mysql-connector-java-5.1.34.jar"
      jdbc_driver_libray => "/Users/draven/Documents/documents/java/software/elk/devtool/logstash-7.3.0/bin/mysql/mysql-connector-java-5.1.34.jar"

      # 驱动类名
      jdbc_driver_class => "com.mysql.jdbc.Driver"
      jdbc_paging_enabled => "true"
      jdbc_page_size => "50000"
      
      # -------分割线
      #last_run_metadata_path => "/Users/hzllb/Desktop/devtool/logstash-7.3.0/bin/mysql/last_value_meta" 
      last_run_metadata_path => "/Users/draven/Documents/documents/java/software/elk/devtool/logstash-7.3.0/bin/mysql/last_value_meta"
    # 执行的sql 文件路径+名称;
      #statement_filepath => "/Users/hzllb/Desktop/devtool/logstash-7.3.0/bin/mysql/jdbc.sql"
      # -------分割线
      
      statement_filepath => "/Users/draven/Documents/documents/java/software/elk/devtool/logstash-7.3.0/bin/mysql/jdbc.sql
      # 设置监听间隔  各字段含义（由左至右）分、时、天、月、年，全部为*默认含义为每分钟都更新
      schedule => "* * * * *"
    }
}




output {
    elasticsearch {
      # ES的IP地址及端口
        hosts => ["localhost:9200"]
      # 索引名称
        index => "shop"
  	document_type => "_doc"
      # 自增ID 需要关联的数据库中有有一个id字段，对应索引的id号
        document_id => "%{id}"
    }
    stdout {
     # JSON格式输出
        codec => json_lines
    }
}


vi jdbc.sql

select a.id,a.name,a.tags,concat(a.latitude,',',a.longitude) as location,a.remark_score,a.price_per_man,a.category_id,b.name as category_name,a.seller_id,c.remark_score as seller_remark_score,c.disabled_flag as seller_disabled_flag from shop a inner join category b on a.category_id = b.id inner join seller c on c.id = a.seller_id where a.updated_at > :sql_last_value or b.updated_at > :sql_last_value or c.updated_at > :sql_last_value



vi last_value_meta
--- !ruby/object:DateTime '2020-11-25 05:37:00.111498000 Z'

./logstash -f mysql/jdbc.conf




```



# Canal

待完善

```shell
# 环境要求
# mysql 开启log
# 可能没有这个文件
vi my.cnf

mysql -uroot -proot
show variables like 'log_bin'
```





# FAQ

```shell
# 1.Unknown setting 'jdbc_driver_libray' for jdbc
	
	# 1.1 配置文件中指定属性jdbc_driver_library 并制定驱动所在位置
	jdbc_driver_library => "/path/mysql-connector-java-5.1.34.jar"
	# 1.2 将驱动器拷贝到\logstash-core\lib\jars下
	cp /path/mysql-connector-java-xxxx-bin.jar /logstash-core/lib/jars/
```

