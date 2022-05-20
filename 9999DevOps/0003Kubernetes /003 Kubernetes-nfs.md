# Kubernetes-NFS

## 服务端安装

```shell
# 1.安装服务
# 安装nfs服务
yum install -y nfs-utils
# 安装rpc服务
yum -y install nfs-utils rpcbind


# 2.启动服务
# 启动服务和开机启动

# 先启动rpc服务
systemctl start rpcbind  
systemctl start nfs


# 设置开机启动
# systemctl enable rpcbind  systemctl enable nfs 
# systemctl start nfs-server nfs-secure-server  

#启动nfs服务和nfs安全传输服务
systemctl enable nfs-server nfs-secure-server


#配置防火墙放行nfs服务
firewall-cmd --permanent --add-service=nfs
# 使配置生效
firewall-cmd  --reload

# 3.配置共享文件目录，编辑配置文件

# 创建共享目录
mkdir -p /path/pv{1,2,3,4,5}

# 配置目录
# 要学会使用该命令
                  cat >>/etc/exports<<EOF 
                  > /data/nfs 172.16.1.0/24(rw,sync)
                  > EOF

vi /etc/exports

/nfs/nfs1	10.8.192.3/24(rw,no_root_squash,no_all_squash,sync)
/nfs/nfs2	10.8.192.3/24(rw,no_root_squash,no_all_squash,sync)
/nfs/nfs3	10.8.192.3/24(rw,no_root_squash,no_all_squash,sync)
/nfs/nfs4	10.8.192.3/24(rw,no_root_squash,no_all_squash,sync)
/nfs/nfs5	116.196.77.0/24(rw,no_root_squash,no_all_squash,sync)
/nfs/nfs6	116.196.77.0/24(rw,no_root_squash,no_all_squash,sync)

# 重新加载NFS服务，使配置文件生效
systemctl reload nfs
# 均可
exportfs -r

# 赋予权限 - 根据情况而定
chmod 777 /nfs/nfs6

# ip 10.8.192.3
```

## 客户端安装配置

```shell
# 1.使用showmount命令查看nfs服务器共享信息。输出格式为“共享的目录名称 允许使用客户端地址
showmount -e ip
#
Export list for JD:
/k8s/redis/pv6 10.8.192.3/24
/k8s/redis/pv5 10.8.192.3/24

# 2.在客户端创建目录，并挂载共享目录
mkdir /mnt/public
mkdir /mnt/data

#在该文件中挂载，使系统每次启动时都能自动挂载
vi /etc/fstab 
# example serverip:/path /clientpath/xx/
192.168.245.128:/public  /mnt/public       nfs    defaults 0 0
192.168.245.128:/protected /mnt/data     nfs    defaults  0 1
# 使文件/etc/fstab生效
mount -a

```



# 附录

## 配置文件说明

```java
/**
格式： 共享目录的路径 允许访问的NFS客户端（共享权限参数）

如上，共享目录为/public , 允许访问的客户端为192.168.245.0/24网络用户，权限为只读。

请注意，NFS客户端地址与权限之间没有空格。

NFS输出保护需要用到kerberos加密（none，sys，krb5，krb5i，krb5p），格式sec=XXX

none：以匿名身份访问，如果要允许写操作，要映射到nfsnobody用户，同时布尔值开关要打开，setsebool nfsd_anon_write 1

sys：文件的访问是基于标准的文件访问，如果没有指定，默认就是sys， 信任任何发送过来用户名

krb5：客户端必须提供标识，客户端的表示也必须是krb5，基于域环境的认证

krb5i：在krb5的基础上做了加密的操作，对用户的密码做了加密，但是传输的数据没有加密

krb5p：所有的数据都加密

*/


```



| 参数           | 作用                                                         |
| -------------- | ------------------------------------------------------------ |
| ro             | 只读                                                         |
| rw             | 读写                                                         |
| root_squash    | 当NFS客户端以root管理员访问时，映射为NFS服务器的匿名用户     |
| no_root_squash | 当NFS客户端以root管理员访问时，映射为NFS服务器的root管理员   |
| all_squash     | 无论NFS客户端使用什么账户访问，均映射为NFS服务器的匿名用户   |
| sync           | 同时将数据写入到内存与硬盘中，保证不丢失数据                 |
| async          | 优先将数据保存到内存，然后再写入硬盘；这样效率更高，但可能会丢失数据 |



## showmount命令

| 参数 | 作用                                      |
| ---- | ----------------------------------------- |
| -e   | 显示NFS服务器的共享列表                   |
| -a   | 显示本机挂载的文件资源的情况NFS资源的情况 |
| -v   | 显示版本号                                |

## 其他

```shell
rpcinfo -p localhost
```

## windows

```shell
第三步：如果权限有问题，打开注册表：regedit, 在HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\ClientForNFS\CurrentVersion\Default 下新建两个OWORD（64）位值，添加值AnonymousGid，值默认为0，AnonymousUid，值默认为0。
```

# 原理

## 什么是NFS

	NFS就是Network File System的缩写，它最大的功能就是可以通过网络，让不同的机器、不同的操作系统可以共享彼此的文件。
	NFS服务器可以让PC将网络中的NFS服务器共享的目录挂载到本地端的文件系统中，而在本地端的系统中来看，那个远程主机的目录就好像是自己的一个磁盘分区一样，在使用上相当便利；
	NFS一般用来存储共享视频，图片等静态数据。
## RPC与NFS通讯原理

```shell
# 我们在NFS服务器设置好一个共享目录/home/public后，其他的有权访问NFS服务器的NFS客户端就可以将这个目录挂载到自己文件系统的某个挂载点，这个挂载点可以自己定义，如上图客户端A与客户端B挂载的目录就不相同。并且挂载好后我们在本地能够看到服务端/home/public的所有数据。如果服务器端配置的客户端只读，那么客户端就只能够只读。如果配置读写，客户端就能够进行读写。挂载后，NFS客户端查看磁盘信息命令：#df –h。

# 既然NFS是通过网络来进行服务器端和客户端之间的数据传输，那么两者之间要传输数据就要有想对应的网络端口，NFS服务器到底使用哪个端口来进行数据传输呢？基本上NFS这个服务器的端口开在2049,但由于文件系统非常复杂。因此NFS还有其他的程序去启动额外的端口，这些额外的用来传输数据的端口是随机选择的，是小于1024的端口；既然是随机的那么客户端又是如何知道NFS服务器端到底使用的是哪个端口呢？这时就需要通过远程过程调用（Remote Procedure Call,RPC）协议来实现了！

# 因为NFS支持的功能相当多，而不同的功能都会使用不同的程序来启动，每启动一个功能就会启用一些端口来传输数据，因此NFS的功能对应的端口并不固定，客户端要知道NFS服务器端的相关端口才能建立连接进行数据传输，而RPC就是用来统一管理NFS端口的服务，并且统一对外的端口是111，RPC会记录NFS端口的信息，如此我们就能够通过RPC实现服务端和客户端沟通端口信息。PRC最主要的功能就是指定每个NFS功能所对应的port number,并且通知客户端，记客户端可以连接到正常端口上去。

# 那么RPC又是如何知道每个NFS功能的端口呢？

# 首先当NFS启动后，就会随机的使用一些端口，然后NFS就会向RPC去注册这些端口，RPC就会记录下这些端口，并且RPC会开启111端口，等待客户端RPC的请求，如果客户端有请求，那么服务器端的RPC就会将之前记录的NFS端口信息告知客户端。如此客户端就会获取NFS服务器端的端口信息，就会以实际端口进行数据的传输了。


# 在启动NFS SERVER之前，首先要启动RPC服务（即portmap服务，下同）否则NFS SERVER就无法向RPC服务区注册，另外，如果RPC服务重新启动，原来已经注册好的NFS端口数据就会全部丢失。因此此时RPC服务管理的NFS程序也要重新启动以重新向RPC注册。特别注意：一般修改NFS配置文档后，是不需要重启NFS的，直接在命令执行systemctl reload nfs或exportfs –rv即可使修改的/etc/exports生效
```



## 启动过程

```shell
# 首先服务器端启动RPC服务，并开启111端口

# 服务器端启动NFS服务，并向RPC注册端口信息

# 客户端启动RPC（portmap服务），向服务端的RPC(portmap)服务请求服务端的NFS端口

# 服务端的RPC(portmap)服务反馈NFS端口信息给客户端。

# 客户端通过获取的NFS端口来建立和服务端的NFS连接并进行数据的传输。

```



## 安装NFS服务

### 两个软件

#### RPC主程序：rpcbind

NFS 其实可以被视为一个 RPC 服务，因为启动任何一个 RPC 服务之前，我们都需要做好 port 的对应 (mapping) 的工作才行，这个工作其实就是『 rpcbind 』这个服务所负责的！也就是说， 在启动任何一个 RPC 服务之前，我们都需要启动 rpcbind 才行！ (在 CentOS 5.x 以前这个软件称为 portmap，在 CentOS 6.x 之后才称为 rpcbind 的！)。

#### NFS主程序：nfs-utils

就是提供 rpc.nfsd 及 rpc.mountd 这两个 NFS daemons 与其他相关 documents 与说明文件、执行文件等的软件！这个就是 NFS 服务所需要的主要软件。


### NFS的相关文件

#### 主要配置文件

```shell
/etc/exports

# 这是 NFS 的主要配置文件了。该文件是空白的，有的系统可能不存在这个文件，主要手动建立。NFS的配置一般只在这个文件中配置即可。
```

#### NFS 文件系统维护指令

```shell
/usr/sbin/exportfs

# 这个是维护 NFS 分享资源的指令，可以利用这个指令重新分享 /etc/exports 变更的目录资源、将 NFS Server 分享的目录卸除或重新分享。
```

#### 分享资源的登录档

```shell
/var/lib/nfs/*tab

# 在 NFS 服务器的登录文件都放置到 /var/lib/nfs/ 目录里面，在该目录下有两个比较重要的登录档， 一个是 etab ，主要记录了 NFS 所分享出来的目录的完整权限设定值；另一个 xtab 则记录曾经链接到此 NFS 服务器的相关客户端数据。
```

#### 客户端查询服务器分享资源的指令

```shell
/usr/sbin/showmount

# 这是另一个重要的 NFS 指令。exportfs 是用在 NFS Server 端，而 showmount 则主要用在 Client 端。showmount 可以用来察看 NFS 分享出来的目录资源
```

# 维护

```shell
# 检查系统中是否安装 NFS 和 RPC
rpm -qa nfs-utils rpcbind


# 查看NFS服务是否向rpc注册端口信息，主端口号是：111 
rpcinfo -p localhost

# 参数说明
# 选项与参数：
-p ：针对某 IP (未写则预设为本机) 显示出所有的port与porgram的信息；
-t ：针对某主机的某支程序检查其 TCP 封包所在的软件版本；
-u ：针对某主机的某支程序检查其 UDP 封包所在的软件版本；

# 检查nfs服务是否有注册端口信息
rpcinfo  -p     

# 进行nfs共享目录的挂载
mount -t nfs 172.16.1.9:/data/nfs /mnt
```

# FQA

```shell
########################### nfs常见问题排错思 ############################### 
 nfs共享目录权限相关因素
①. 配置文件中的权限指定
②. 共享目录本身的权限，有w权限
③. 共享目录本身的所属用户与所属组的权限指定


### ######################  NFS客户端挂载排错思路  ###########################
客户端排查三部曲
①. 检查服务端房源信息是否还在
    rpcinfo -p 172.16.1.9
②. 检查服务端共享目录信息是否存在
    showmount -e 172.16.1.9
③. 直接进行目录挂载测试
    mount -t nfs 172.16.1.9:/data /mnt
	
#########################  服务端排查三部曲  ################################# 
①. 检查服务端房源信息是否还在
    rpcinfo -p localhost
	如果没有注册的房源信息了，会是什么情况？
	①. nfs服务没有启动
	②. nfs服务于rpc服务启动顺序不正确
②. 检查服务端共享目录信息是否存在
    showmount -e localhost
	①. nfs配置文件编写格式错误
③. 直接进行目录挂载测试
    mount -t nfs 172.16.1.9:/data /mnt


# 实现nfs客户端开机自动挂载方式
①. 将挂在命令追加到/etc/rc.local开机自启动文件中
②. 编写fstab文件，并且需要配合netfs服务使用，实现开机自动挂载




### nfs常见问题排错 
示例1：客户端挂载报错“No such file or directory”
[root@nfs-client ~]# showmount -e 172.16.1.9
Export list for 172.16.1.9:
/data    172.16.1.0/24
[root@nfs-client ~]# mount -t nfs 172.16.1.9:/data /mnt
mount.nfs: mounting 172.16.1.9:/data failed, reason given by server: No such file or directory
解答：原因是NFS服务器端没有共享目录/data，创建即可。命令如下：
[root@nfs-server ~]# mkdir /data


示例2：NFS服务器端启动失败，如下：
[root@nfs-server ~]# /etc/init.d/nfs start
Starting NFS services:								[  OK  ]
Starting NFS quotas: Cannot register service: RPC: Unable to receive; errno = Connection refused
rpc.rquotad: unable to register (RQUOTAPROG, RQUOTAVERS, udp).
 												    [FAILED]
Starting NFS mountd:								[FAILED]
Starting NFS daemon: rpc.nfsd: writing fd to kernel failed: errno 111 (Connection refused)
rpc.nfsd: unable to set any sockets for nfsd
 												    [FAILED]
解答：这是因为RPC服务没有在NFS前面启动，需要先启动RPC服务再启动NFS，解决方法为，按顺序启动rpcbind及NFS，命令如下：
[root@nfs-server ~]# /etc/init.d/rpcbind restart
[root@nfs-server ~]# /etc/init.d/nfs restart


示例3：注册RPC服务失败，出现failed：RPC Error：Program not registered错误。
[root@nfs-client ~]# mount -t nfs 172.16.1.9:/data /mnt
mount.nfs: requested NFS version or transport protocol is not supported
[root@nfs-client ~]# showmount -e 172.16.1.9
clnt_create: RPC: Program not registered
解答：服务器端的NFS没有启动，客户端没有收到服务器端发来的随机端口信息。
解决方法如下：
[root@nfs-server ~]# /etc/init.d/rpcbind restart
[root@nfs-server ~]# /etc/init.d/nfs restart


示例4：卸载挂载设备时显示device is busy。
[root@nfs-client mnt]# umount /mnt
umount.nfs: /mnt: device is busy
umount.nfs: /mnt: device is busy
解答：有可能是当前目录就是挂载的NFS目录（/mnt），也有可能是NFS Server挂了。对于第一种情况，解决办法为退出挂载目录/mnt，再执行umount /mnt卸载。对于第二种情况，NFS Server挂了，NFS Client就会出现问题（df -h窗口会死掉），这时只能强制卸载，方法为：
umount -lf /mnt     其中的参数-f为强制卸载，参数-l为懒惰的卸载。


示例5：CentOS 6.6客户端NFS挂载时遇到问题。
[root@nfs-client ~]# mount -t nfs 172.16.1.9:/data /mnt
mount：wrong fs type，bad option，bad option，bad superblock on 10.0.0.7:/data,
   missing codepage or helper program，or other error
   (for several filesystems (e.g. nfs, cifs) you might
need a /sbin/mount.<type> helper program )
In some cases useful info is found in syslog - try
meg | tail or so
排查思路：同样的机器，NFS服务器本地可以挂载，但是客户端挂载时wrong fs type，因此尝试所有客户端安装nfs-utils。CentOS6.5及以前的NFS没有遇到这个问题。
解决方法：执行yum install nfs-utils -y，客户端安装NFS软件，但不启动服务。


示例六：共享目录挂载很卡
mount -t nfs 172.16.1.9:/data /mnt
cd /mnt
time touch test.txt
原因分析：
	NFS服务端重启之后。立刻进行挂载会出现此问题，因为NFS自身重启的时候，拥有无敌的时间，默认是90秒；在无敌时间内，是不能对共享目录进行更改的操作；
	在系统配置中/etc/sysconfig/nfs中指定了无敌时间的配置参数
NFSD_V4_GRACE=90
NFSD_V4_LEASE=90
NLM_GRACE_PERI0D=90
find /proc -name | grep -i ” NLM_GRACE_PERIOD”
find /proc -iname ” NLM_GRACE_PERIOD”
	重启NFS服务没有按照顺序进行重启，一旦NFS重启了，需要确认rpcbind服务有没有接收，即rpcinfo -p localhost；先启动rpcbind服务再启动nfs服务


示例七：ls: cannot open directory .: Stale file handle
Stale file handle
客户端报错
mount -t nfs 172.16.1.9:/data  /mnt
mount.nfs: Stale file handle
服务端挂载报错
[root@nfs01 data]# mount -t nfs 172.16.1.9:/data /mnt/
mount.nfs: access denied by server while mounting 172.16.1.9:/data
查看配置文件发现
[root@nfs01 data]# cat /etc/exports
#share /data  by lidao  at 20160913
/data 173.16.1.0/24(rw,sync)
原因分析：

	/proc/mounts客户端挂载文件中已经存在了相应的挂载记录，没有正确卸载掉，就再次进行挂载，就会出现以上错误
```

