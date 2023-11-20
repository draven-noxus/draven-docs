首先solr是一个独立的系统
那么就需要Tomcat
tomcat需要JDK

故上两个省略

上传solr 中文分词器 两个包

解压
一、
1.安装solr
直接解压即可
2.了解目录结构
example

3.将solr.war复制到tomcat/webapps中

4.进行手动解压
unzip xxx.war -d destfile

只要解压就可以使用。



防火墙打开 8080 端口
/sbin/iptables -I INPUT -p tcp --dport 8080 -j ACCEPT
/etc/rc.d/init.d/iptables save

最后在c3p0配置文件中 jdbcUrl后加上：?useUnicode=true&amp;characterEncoding=UTF8 中文就不会乱码了。

<!-- coustom field -->
<field name="name_ik" type="text_ik" indexed="true" stroed="true"/>

<!-- coustom fieldType -->
<fieldType name="text_ik" class="solr.TextField">
	<analyzer type="index" org.wltea.analyzer.lucene.IKAnalyzer />
	<analyzer type="query" org.wltea.analyzer.lucene.IKAnalyzer />
</fieldType>




2.1.1	在/usr/local/src/下创建solr-cluster目录
mkdir solr-cluster

2.1.2.1	将之前搭建好的solr服务复制到该目录下
tar -zxvf solr-4.10.3.tar  -C /usr/local/src/


2.1.2.2	将之前的solr home复制到该目录下
cp -rf solr /usr/local/src/solr-cluster/

2.1.2.3	删除历史solr home的数据
rm -rf data

2.1.2.4	指定solr服务中solr home的位置()
solrhome:/usr/local/src/solr-cluster/solrhome8080

vim /usr/local/src/solr-cluster/tomcat8080/webapps/solr/WEB-INF/web.xml

2.1.2.5	配置solrCloud
vim /usr/local/src/solr-cluster/solrhome/solr.xml

2.1.2.6	Solr服务的节点交给zookeeper管理
/tomcat/bin/catalina.sh
vim /usr/local/src/solr-cluster/tomcat8080/bin/catalina.sh
#!/bin/sh
JAVA_OPTS="-DzkHost=192.168.200.136:2181,192.168.200.136:2182,192.168.200.136:2183"

内容：
JAVA_OPTS="-DzkHost=192.168.200.136:2181,192.168.200.136:2182,192.168.200.136:2183"

JAVA_OPTS="-DzkHost=192.168.200.133:2181,192.168.200.133:2182,192.168.200.133:2183"

2.1.2.7	将solr的配置文件上传到zookeeper下
sh /usr/local/src/solr-4.10.3/example/scripts/cloud-scripts/zkcli.sh -zkhost 192.168.200.136:2181,192.168.200.136:2182,192.168.200.136:2183 -cmd upconfig -confdir /usr/local/src/solr-4.10.3/example/solr/collection1/conf/ -confname myconf -solrhome /usr/local/src/solr-4.10.3/example/solr

2.1.2.8	查看文件是否上传成功
/usr/local/src/zookeeper-cluster/zookeeper01/bin
./zkCli.sh
ls /configs/myconf
找solr的核心配置文件


2.1.3	依次复制三份solr服务
cp -r tomcat8080/ tomcat8081

2.1.4	依次复制三份solr home
cp -r solrhome8080/ solrhome8081

vim tomcat8083/conf/server.xml
2.1.5	配置solr的分片的规则
vim solrhome8080/collection1/core.properties

${solr_home}/collenction1/core.properties
numShards=2
name=collection1
shard=shard1
coreNodeName=core_node1
以上参数说明
numShards=2 //分片数量
name=collection1 //core名称
shard=shard1 //所属分片
coreNodeName=core_node1 //结点名称

2.1.6	依次去启动solr服务器
sh tomcat8080/bin/startup.sh

sh tomcat8080/bin/catalina.sh run

sh tomcat8080/bin/shutdown.sh





vim tomcat8081/webapps/solr/WEB-INF/web.xml

sh tomcat8080/bin/catalina.sh run
sh tomcat8080/bin/catalina.sh run

cp -r  solrhome8080/ solrhome8081



cd /usr/local/src/solr-cluster/tomcat8080/webapps/