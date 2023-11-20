上传
解压
tar -zxvf xxx.tar.gz -C /usr/local/src/xxx

进入解压目录，创建data文件夹
cd xxx.tar.gz
mkdir data

进入conf目录修改zoo_sample.cfg的名称为 zoo.cfg
cd conf
mv zoo_sample.cfg zoo-cfg

编辑zoo.cfg文件，将dataDir的路径修改为指定的data
vim zoo-cfg


启动zookeeper：/bin/zkServer.sh start

防火墙

service iptables stop

重启有效
chkconfig iptables off



保存并退出
I A O
shift+zz





touch myid
echo 1 > myid
cat myid





软件解压到zookeeper-cluster目录下
tar -zxvf zookeeper-3.4.6.tar.gz -C /usr/local/src/zookeeper-cluster/

修改解压后的目录的名称zookeeper01
mv zookeeper-3.4.6/ zookeeper01

在zookeeper01目录下创建data、logs
mkdir data
mkdir logs

修改zookeeper01/conf目录下配置文件名称
位置：/usr/local/src/zookeeper-cluster/zookeeper01/conf
mv zoo_sample.cfg zoo.cfg

编辑zoo.cfg文件
vim zoo.cfg

#example sakes
dataDir=/usr/local/src/zookeeper-cluster/zookeeper01/data
dataLogDir=/usr/local/src/zookeeper-cluster/zookeeper01/logs
server.1=192.168.200.136:2888:3888
server.2=192.168.200.136:4888:5888
server.3=192.168.200.136:6888:7888

指定zookeeper属于哪个节点
在data目录下创建myid文件
touch myid
echo 1 > myid
tail myid /cat myid

复制zookeeper01为zookeeper02/zookeeper03
cp -r zookeeper01/ zookeeper02

分别修改信息
vim zookeeper02/conf/zoo.cfg
vim zookepper02/data/myid

dataDir=/usr/local/src/zookeeper-cluster/zookeeper01/data
dataLogDir=/usr/local/src/zookeeper-cluster/zookeeper01/logs
clientPort=2183

echo 1 > myid
tail myid /cat myid


cat zookeeper03/data/myid

./zookeeper01/bin/zkServer.sh start

./zookeeper02/bin/zkServer.sh start

./zookeeper03/bin/zkServer.sh start


./zookeeper03/bin/zkServer.sh status


./ookeeper03/bin/zkServer.sh stop