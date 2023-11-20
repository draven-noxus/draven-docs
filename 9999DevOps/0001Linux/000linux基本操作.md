# linux

完全在CentOS7进行操作的，基本的编辑修改等操作就不提了

## 重置密码

```shell
sudo passwd root
[sudo] password for you ：#---> 输入你的密码，不回显
Enter new UNIX password: #--- > 设置root 密码
Retype new UNIX password: #--> 重复
```

## rpm

``` shell
# 查看
rpm -qa
rpm -qa | grep java
# 卸载指令
	rpm -e --nodeps （*）
# 例如
rpm -e --nodeps java-1.7.0-openjdk-1.7.0.45-2.4.3.3.el6.x86_64
rpm -e --nodeps  mysql-libs-5.1.71-1.el6.x86_64
```



## CentOS6

### 启动服务

```shell
service redis start
service redis stop
```

### 防火墙

```shell
# 查看防火墙状态
sudo service iptables status
# 关闭防火墙
sudo service iptables stop 
```

### alias

```shell
# 一般使用当前用户系统变量配置
vi .bash_profile
# 配置一些操作
 # 切换至指定目录
alias upload='cd /path/'
 # 快速浏览日志
alias taillog="tail -100f  /path/nohup.out"
# 配置生效(当前用户系统变量)
source .bash_profile
```

```shell
# 查看防火墙状态
sudo service iptables status
# 关闭防火墙
sudo service iptables stop 
```

### 重启网卡

```shell
service network restart
```

## CentOS7

### 基本操作

#### 修改 hostname

```shell
# 通过 hostnamectl 修改主机名、静态、瞬态、灵活主机名
hostnamectl set-hostname xxx
hostnamectl --pretty
hostnamectl --static
hostnamectl --transient

# 手动修改 host 主机解析
vim /etc/hosts
# 127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
127.0.0.1  xxx
# ::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
::1        xxx

# 重启 or 退出连接
reboot
hostnamectl # 查看主机信息
```

#### 文本替换

```shell
# 格式
$ vi test_file
$ :%s/h/h1/g
# 全量替换
:%s/116.196.77.250/172.16.244.128

```

#### 端口占用

```shell
netstat -tunlp | grep 8001
tcp        0      0 127.0.0.1:8001          0.0.0.0:*               LISTEN      28219/kubectl       

kill -9 28219
```



#### 防火墙

```shell
# 临时关闭防火墙
systemctl stop firewalld 
# 查看状态
firewall-cmd --state 
# 禁止开机启动
systemctl disable firewalld 
#开放端口
firewall-cmd --permanent --add-port=6443/tcp
firewall-cmd --permanent --remove-port=6443/tcp --permanent
```

### 配置网卡

#### 修改网卡文件

vim /etc/sysconfig/network-scripts/ifcfg-ens33中的IPADDR

```shell
TYPE="Ethernet"
#BOOTPROTO="dhcp"
BOOTPROTO="static"
#static
IPADDR="192.168.200.133"
#PREFIXO0=24  #设置子网掩码
NETMASK="255.255.255.0"
GATEWAY="192.168.200.2"
DNS1="192.168.200.2"
DEFROUTE="yes"
PEERDNS="yes"
PEERROUTES="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_PEERDNS="yes"
IPV6_PEERROUTES="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="1ff87a05-d1d2-4a6d-9114-4459fe165906"
DEVICE="ens33"
ONBOOT="yes
```

#### 配置公共DNS服务

(可选) 一般不需要这个操作
在/etc/resolv.conf文件里增加如下配置

```shell
nameserver 8.8.8.8
```

#### 重启网卡

```shell
systemctl restart network
```

###  SSH 登录<拒绝密码>

用于多终端操作

```shell
# scp fileName username@ip:<path>
```

互信

```shell
# 将本机的 id_rsa.pub 复制到服务器中 ~/.ssh/authorized_keys
vim ~/.ssh/authorized_keys

# 更改权限
chown -R 700 ~/.ssh # 在本机也执行一次该命令
chown -R 644 ~/.ssh/authorized_keys

# 修改配置
vim /etc/ssh/sshd_config

# 允许密钥认证,此三项在原配置中被注释，可以直接添加到文件末尾
RSAAuthentication yes
PubkeyAuthentication yes
StrictModes no
# 公钥保存文件
AuthorizedKeysFile .ssh/authorized_keys # 文件默认
# 拒绝密码登录
PasswordAuthentication no # 源文件中最后一行，默认为 yes

# 重启服务
systemctl restart sshd.service

# 此时可以 ssh 登录
sudo ssh -i id_rsa root@xxx # mac 示例，将本机的 id_rsa 复制到 / 路径下就好
```



## 问题

虚拟机是必不可少的

### 网卡问题丢失处理方式

一般发生在网络环境变化的情况下

```shell
systemctl stop NetworkManager
systemctl disable NetworkManager
ifup ifcfg-ens33
```

### IPv4 forwarding is disabled

```
解决办法：
vi  /usr/lib/sysctl.d/00-system.conf
添加如下代码：
net.ipv4.ip_forward=1
重启network服务
systemctl restart network
```

## 基础命令

### 开关机

```
reboot 重启命令
halt   立刻关机 
poweroff  立刻关机 
shutdown -h now 立刻关机(root用户使用) 
shutdown -h 10 10分钟后自动关机 
```

### 网络通讯命令

```
ifconfig  显示或设置网络设备。
ifconfig  显示网络设备
ifconfig eth0 up 启用eth0网卡
ifconfig eth0 down  停用eth0网卡 ping   探测网络是否通畅。
ping 192.168.0.1ifconfig
```

### 文件操作

#### 上传

```
Alt + P
图像化软件
yum -y install lrzsz 打开窗口:rz 上传:rz
```

#### 删除

```
rm -rf ./xxx
例：rm -rf  ./product

rm
rm  删除文件
用法：rm [选项]... 文件...
rm a.txt	删除a.txt文件
删除需要用户确认，y/n rm 删除不询问
rm -f a.txt	不询问，直接删除 rm 删除目录
rm -r a		递归删除 不询问递归删除（慎用）
rm -rf  a	不询问递归删除
rm -rf *	删除所有文件
rm -rf /*	自杀
```

#### cp(copy)功能

复制文件或目录

```
语法：cp [参数][源文件或目录][目标文件或目录]
 -r或--recursive 递归处理，将指定目录下的文件与子目录一并处理。
cp 需要复制的文件 复制到哪里去
  例如：cp -r test.txt test1 复制test.txt到子目录test1中去
cp -r test.txt /test1 复制test.txt到根目录test1中去
cp 需要复制的文件 复制到哪里去/改什么名字
  例如：cp -r test.txt test1/hehe.txt 复制test.txt到子目录test1中,并改名为hehe.txt
```

#### mv(move) 功能

移动或更名现有的文件或目录

```
mv 需要移动的文件 移动的位置
例如：mv hehe.txt test 把hehe.txt移动到test子目录中
	 mv a.txt b.txt		将a.txt文件重命名为b.txt
	 mv a.txt ../		将a.txt文件移动到上一层目录中
	 
rm(remove) rm 功能：删除文件或目录。
rm –rf 需要删除的文件/目录
```

#### find功能

查找文件或目录

```
语法：find [目录...] [参数] 
 -name 指定字符串作为寻找文件或目录的范本样式。
find /root/ -name 'test*' 查看指定目录下面的满足条件的文件或目录
```

### 目录

```
cd app	切换到app目录 
cd ..	切换到上一层目录 
cd /	切换到系统根目录 
cd ~	切换到用户主目录 
cd -	切换到上一个所在目录
clear 伪清屏命令
man tar 查看命令说明
	q 退出查看
	Tab 自动补全
```

mkdir(make directory)命令可用来创建子目录

```
mkdir app	在当前目录下创建app目录
mkdir –p app2/test	级联创建aap2以及test目

rmdir(remove directory)命令可用来删除“空”的子目录

rmdir app	删除app目录
```

### 文件大小

友好显示文件大小

```
ll -h
```

### 编辑

#### vim

```
切换到插入模式：按 i 、o、a键；
    i 在当前位置前插入
    a 在当前位置后插入
    o 在当前行之后插入一行
快捷键：
dd – 快速删除一行
yy2 - 复制当前行
p - 粘贴
切换到底行模式：按 :（冒号）；
```



```
打开文件：	vim file
退出：esc	:q
修改文件：	输入i进入插入模式
保存并退出：esc	:wq

不保存退出：esc	:q!
```

### 浏览文件

#### cat

```
cat 用于显示文件的内容。格式 cat[参数]<文件名>

cat yum.conf  查看etc目录下的 services文件  
more 一般用于要显示的内容会超过一个画面长度的情况。按空格键显示下一个画面。
回车显示下一行内容。
按 q 键退出查看。
```

#### more

```
more services
空格显示下一页数据 回车显示下一行的数据 
less 用法和more类似，不同的是less可以通过PgUp、PgDn键来控制。
less services
PgUp 和 PgDn 进行上下翻页.
```

#### less

分页显示文件内容，操作更详细。

```
 语法：less [参数] 文件
    -m 显示类似more命令的百分比
    -N 显示每行的行号
   操作
 空格键：前进一页 或 page down
 b：后退一页 或 page up
 d：前进半页
 u：后退半页
 回车键：前进一行 或方向键向下
 y：后退一行 或 方向键向上
 /字符串：向下搜索
 字符串：向上搜索
 v：进入vim编辑器
 左右方向键：相当于水平滚动条
 q：退出
```

#### tail

tail命令是在实际使用过程中使用非常多的一个命令，它的功能是：用于显示文件后几行的内容。

```
用法:
tail -10 /etc/passwd	查看后10行数据
tail -f catalina.log	动态查看日志(*****)
```

### 解压功能

#### tar

```
tar命令位于/bin目录下，它能够将用户所指定的文件或目录打包成一个文件，但不做压缩。
一般Linux上常用的压缩方式是选用tar将许多文件打包成一个文件，再以gzip压缩命令压缩成xxx.tar.gz(或称为xxx.tgz)的文件。  常用参数： 
-c：创建一个新tar文件 
-v：显示运行过程的信息 
-f：指定文件名 
-z：调用gzip压缩命令进行压缩 
-t：查看压缩文件的内容 
-x：解开tar文件
```

```
打包：
tar –cvf xxx.tar ./*
打包并且压缩：
tar –zcvf xxx.tar.gz ./*  a  

解压  -zxvf
tar –xvf xxx.tar
tar -xvf xxx.tar.gz -C /usr/aaa 解压到指定目录  注：C要大写
```

#### zip

```
要备份的当前目录执行
备份包
zip -r product_201803011531_bak.zip ./product
解压
unzip -d   ./  压缩包.zip
```

### 历史指令

history

```shell
# 记录之前操作过的一些指令，再也不用用箭头翻阅指令了
# 检索历史命令
history | grep yum 
```

### 修改时间

```
date -s "2018-07-18 15:00:00"
```

### 文件权限

```
chmod 命令
chmod(change mode) 功能：变更文件或目录的权限。
语法：chmod [参数] [<权限范围><符号><权限代号>]
-R或--recursive 　递归处理，将指定目录下的所有文件及子目录一并处理。
权限范围的表示法如下： 
u：User，即文件或目录的拥有者。 
g：Group，即文件或目录的所属群组。 
o：Other，除了文件或目录拥有者或所属群组之外，其他用户皆属于这个范围。 
a：All，即全部的用户，包含拥有者，所属群组以及其他用户。
符号：

- 添加权限
  -取消权限
  有关权限代号的部分，列表于下： 
  r：读取权限，数字代号为"4"。 
  w：写入权限，数字代号为"2"。 
  x：执行或切换权限，数字代号为"1"。 
  -：不具任何权限，数字代号为"0"。

mkdir
ll | grep xxx
chmod u-rwx xxx
chmod g-rwx xxx
chmod 777xxx	添加权限
chmod  531  a.tar    -r-x-wx--x
```

### 系统管理命令

```
ps 正在运行的某个进程的状态
ps –ef  查看所有进程
ps –ef | grep ssh 查找某一进程 kill 杀掉某一进程
kill 2868  杀掉2868编号的进程
kill -9 2868  强制杀死进程
```

### 管道

```
管道是Linux命令中重要的一个概念，其作用是将一个命令的输出用作另一个命令的输入。 示例
ls --help | more  分页查询帮助信息
ps –ef | grep java  查询名称中包含java的进程

grep命令
查找符合条件的字符串。
用法: grep [选项]... PATTERN [FILE]... 

grep lang anaconda-ks.cfg  在文件中查找lang
grep lang anaconda-ks.cfg –color 高亮显示
```



## 目录结构

```
	bin	binaries	存放二进制可执行文件
	sbin	super user binaries 存放二进制可执行文件，只有root才能访问
	etc	etcetera	存放系统配置文件
	usr	unix shared resources 用于存放共享的系统资源
	home	存放用户文件的目录
	dev	devices	用于存放设备文件
	lib	libary	存放跟文件系统中的程序运行所需要的共享库及内核模块
	mnt	mount	系统管理员安装临时文件系统的安装点
	boot	存放用于系统引导时使用的各种文件
	tmp	temporary	用于存放各种临时文件
	var 	variable	用于存放运行时需要改变数据的文件	
/：根目录 一般根目录下只存放目录，不要存放文件

root管理员的home（家）目录root
其他用户的home（家）目录home目录中
```

## 查看软件配置信息

whereis mysql

# Linux扩容

```shell
# 系统环境 linux --- centos 7
# 案例：经查看 根分区 空间不足，需要扩容

[root@localhost ysl]# df -h
Filesystem        Size Used Avail Use% Mounted on
/dev/mapper/centos-root  23G 9.6G  13G 43% /
devtmpfs         478M   0 478M  0% /dev
/dev/sda1        497M 158M 340M 32% /boot

# 扩容步骤
# 机器新增一块20G硬盘 （重启机器，执行 fdisk –l 命令可以识别）
#  如果不可以重启服务器，执行以下命令（具体情况具体分析）
#  查看当前磁盘设备
[root@localhost ~]# cat /proc/scsi/scsi 
Attached devices:
Host: scsi0 Channel: 00 Id: 00 Lun: 00
 Vendor: VMware, Model: VMware Virtual S Rev: 1.0 
 Type:  Direct-Access          ANSI SCSI revision: 02

Host: scsi2 Channel: 00 Id: 00 Lun: 00
 Vendor: NECVMWar Model: VMware IDE CDR10 Rev: 1.00
 Type:  CD-ROM              ANSI SCSI revision: 05

Host: scsi0 Channel: 00 Id: 01 Lun: 00
 Vendor: VMware, Model: VMware Virtual S Rev: 1.0 
 Type:  Direct-Access          ANSI SCSI revision: 02

# type 类型为CDROM的光驱类型，不用考虑
# 我们要查看 类型为 Direct-Access的项，我们要根据已有的数据，添加新的数据
# 可以看到 

Host: scsi0 Channel: 00 Id: 00 Lun: 00

Host: scsi0 Channel: 00 Id: 01 Lun: 00

# 这两块盘 只有id不一样，也就是说我们新增的盘，要从id：02 开始

# 验证一下，把磁盘插好，执行一下命令

echo "scsi add-single-device 0 0 2 0" > /proc/scsi/scsi
# 这4个数字，与已有的是一一对应的
# 再次执行 cat /proc/scsi/scsi 可以看到新增的磁盘

[root@localhost ~] cat /proc/scsi/scsi 
Attached devices:
Host: scsi0 Channel: 00 Id: 00 Lun: 00
  Vendor: VMware,  Model: VMware Virtual S Rev: 1.0 
  Type:   Direct-Access                    ANSI  SCSI revision: 02
Host: scsi2 Channel: 00 Id: 00 Lun: 00
  Vendor: NECVMWar Model: VMware IDE CDR10 Rev: 1.00
  Type:   CD-ROM                           ANSI  SCSI revision: 05
Host: scsi0 Channel: 00 Id: 01 Lun: 00
  Vendor: VMware,  Model: VMware Virtual S Rev: 1.0 
  Type:   Direct-Access                    ANSI  SCSI revision: 02
Host: scsi0 Channel: 00 Id: 02 Lun: 00
  Vendor: VMware,  Model: VMware Virtual S Rev: 1.0 
  Type:   Direct-Access                    ANSI  SCSI revision: 02
#（是不是印证了linux系统一切都是文件的说法）
# 再次执行 fdisk –l 命令 就可以看到 新的磁盘了
 
Disk /dev/sdc: 21.5 GB, 21474836480 bytes, 41943040 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
 
#  不用重启服务器就可以识别硬盘操作完成
 
#  现在进入 正题 扩容
 
# 新增文件系统的总体流程：
# 新增的硬盘要创建分区才可以使用，在分区的基础上，创建pv，几个pv可以总成vg，在vg上划分 lv，格式化lv，挂载lv
# 根分区不够用，先查看，根分区属于那个vg，给这个vg添加pv，添加pv的过程就是扩容vg的过程，vg中有足够的pv，就可以给lv扩容了，lv扩容后，要执行命令重新识别分区大小
 
#  第一步： 创建分区
fdisk  /dev/sdc   (没有 –l选项，分区必须带绝对路径)
 
fdisk /dev/sdc
Welcome to fdisk (util-linux 2.23.2).
Command (m for help): 
# 输入n开始新建，一下几步都是默认回车,直到再次出现Command (m for help):
# 这几步意思就是 该磁盘要主分区，还是扩展分区，分区大小，我全部是默认，一块盘就是一个pv，如果想更详细的划分，可以网上搜索具体步骤（centos6版本会有小小的不同）
 
# lvm分区类型是8e，默认的分区类型是linux，所以我们要改变一下分区类型
# Command (m for help): 此处输入 t ，接着输入 8e ，就可以把分区类型变成
# linux lvm了
   Device Boot      Start         End      Blocks   Id  System
/dev/sdc1            2048    41943039    20970496   8e  Linux LVM
 
# 再次输入 w，保存退出 （一定要输入w）
# 好的，现在分区做好了，名字是 sdc1 
# 第二步： 创建pv
pvcreate /dev/sdc1
[root@localhost ~]# pvcreate /dev/sdc1
  Physical volume "/dev/sdc1" successfully created
# 第三步：将创建的pv加入vg中，查看vg列表，看看要加入哪个vg中
# 执行df 可以看到根目录所属的vg名字是centos，lv名字是root
[root@localhost ~]# df -h
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root   23G  9.6G   13G  43% /
# 执行vgdisplay 可以看到vg的名字，状态，vg的大小，最小单位pe的大小，数量，已经使用的，空闲的等等
[root@localhost ~]# vgdisplay
  --- Volume group ---
  VG Name               centos
  System ID             
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  5
  VG Access             read/write
  VG Status             resizable
  VG Size               24.50 GiB
  PE Size               4.00 MiB
  Total PE              6273
  Alloc PE / Size       6264 / 24.47 GiB
  Free  PE / Size       9 / 36.00 MiB
 
# 关键步骤：vg扩容
vgextend  centos /dev/sdc1
[root@localhost ~]# vgextend centos /dev/sdc1
Volume group "centos" successfully extended
# vg扩容完毕 可以display查看
 
# 第四步
lvextend –L +20G /dev/centos/root 
[root@localhost ~]# lvextend -L +20G /dev/centos/root 
  Size of logical volume centos/root changed from 22.47 GiB (5752 extents) to 42.47 GiB (10872 extents).
  Logical volume root successfully resized.

# 再次查询 df –h
[root@localhost ~]# df -h
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root   23G  9.6G   13G  43% /
 
# 发现 容量并没有增加，因为系统没有识别 执行以下识别命令
resize2fs /dev/centos/root
xfs_growfs /dev/centos/root
 
resize2fs # 适用于非根分区
xfs_growfs # 适用于根分区
# centos 6用resize2fs即可
[root@localhost ~]# xfs_growfs /dev/centos/root
data blocks changed from 5890048 to 11132928
# 再次df查看 
[root@localhost ~]# df -h
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root   43G  9.6G   33G  23% /
 
# 至此 扩容完毕
```

## 修改时区

```shell
rm -f /etc/localtime
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

timedatectl

timedatectl   set-timezone  [时区参数]
```



# 其他

```shell
# 编译为可执行脚本
gcc -static hello.c shname
```





./redis-cli --raw 编码中文(启动)
