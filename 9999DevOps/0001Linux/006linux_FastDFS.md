```shell
# 存在2个有端口号的进程即启动成功
ps -ef|grep fdfs   			
# 监控状态
fdfs_monitor /etc/fdfs/storage.conf 	

# 查看进程
ps -ef |grep tomcat  			

# 端口监听
netstat -unltp|grep fdfs 		


/usr/bin/fdfs_test /etc/fdfs/client.conf upload /home/11.jpg 	
example file url: http://192.168.200.131/group1/M00/00/00/wKjIg1nDvemASzRAAAA9yj9VxJo911_big.jpg	上传图片(自带客户端)

/usr/local/src/FastDFS/FastDFS/

/usr/local/src/FastDFS/FastDFS/storage

cp fdfs_storaged /usr/bin/

http://192.168.200.131/group1/M00/00/00/wKjIg1nDiQiAU_1CAAA9yj9VxJo792.jpg

storage
base_path=/home/fastdfs/tracker


Store_path0=/home/fastdfs/storage/fdfs_storage

/usr/bin/fdfs_storaged /etc/fdfs/storage.conf restart
/usr/local/bin/fdfs_storaged /etc/fdfs/storage.conf restart


service fdfs_trackerd status、service fdfs_storaged status
启动指令


一、FastDFS安装环境
安装FastDFS需要先将官网下载的源码进行编译，编译依赖gcc环境，如果没有gcc环境，
需要安装gcc：

*yum install gcc-c++

二、安装libevent
FastDFS依赖libevent库，需要安装：
*yum -y install libevent

三、安装libfastcommon(我安装到了自己的目录)
libfastcommon是FastDFS官方提供的，libfastcommon包含了FastDFS运行所需要的一些基础库。

*将libfastcommonV1.0.7.tar.gz拷贝至/usr/local/下
*cd /usr/local
*tar -zxvf libfastcommonV1.0.7.tar.gz
*cd libfastcommon-1.0.7
*./make.sh
*./make.sh install


注意：libfastcommon安装好后会自动将库文件拷贝至/usr/lib64下，由于FastDFS程序引用usr/lib目录所以需要将/usr/lib64下的库文件拷贝至/usr/lib下。
要拷贝的文件如下：

cp libfastcommon.so /usr/lib


四、tracker编译安装
将FastDFS_v5.05.tar.gz拷贝至/usr/local/下
tar -zxvf FastDFS_v5.05.tar.gz

cd FastDFS

./make.sh
./make.sh install


/etc/fdfs/原来包含的文件
client.conf.sample
storage.conf.sample
tracker.conf.sample

安装成功将安装目录下的conf下的文件拷贝到/etc/fdfs/下。
cp client.conf /etc/fdfs
cp http.conf /etc/fdfs
cp mime.types /etc/fdfs
cp storage.conf /etc/fdfs
cp storage_ids.conf /etc/fdfs
cp tracker.conf /etc/fdfs
这两个是记录目录没用
/usr/local/src/FastDFS/FastDFS/conf
/etc/fdfs
这两个是记录目录没用


五、配置
安装成功后进入/etc/fdfs目录：

拷贝一份新的tracker配置文件：
cp tracker.conf.sample tracker.conf

修改tracker.conf
vi tracker.conf
base_path=/home/yuqing/FastDFS    第21行
改为：
base_path=/home/FastDFS
配置http端口：
http.server_port=80    第248行

六、启动


启动的日志显示先停止5619进程（实际环境不是5619）再启动，如下图：
waiting for pid [3557] exit ...
starting ...

注意：如果没有显示上图要注意是否正常停止原有进程。


七、FastDFS--storage安装

3.3.1	安装libevent
同tracker安装
3.3.2	安装libfastcommon
同tracker安装。

3.3.3	storage编译安装
同tracker编译安装。

配置
安装成功后进入/etc/fdfs目录：

拷贝一份新的storage配置文件：
cp storage.conf.sample storage.conf

修改storage.conf
vi storage.conf
group_name=group1		第11行
base_path=/home/yuqing/FastDFS改为：base_path=/home/FastDFS   第31行
store_path0=/home/yuqing/FastDFS改为：store_path0=/home/FastDFS/fdfs_storage 第17行
#如果有多个挂载磁盘则定义多个store_path，如下
#store_path1=.....
#store_path2=......
tracker_server=192.168.101.3:22122   #配置tracker服务器:IP    26行
#如果有多个则配置多个tracker
tracker_server=192.168.101.4:22122

#配置http端口
http.server_port=80     最后一行
```



