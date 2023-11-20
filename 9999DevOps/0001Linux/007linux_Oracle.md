1/home/oracle/app/oralnventory/orainstRoot.sh
2/home/oracle/app/oracle/product/11.2.0/dbhome_1/root.sh

参考网站：http://www.linuxidc.com/Linux/2017-05/143918.htm

CentOS6.7_x64_minimal_desktop的虚拟机一台（安装Oracle需要图形界面，所以选择安装minimal_desktop版本的）。
xftp5。
linux.x64_11gR2_database_1of2.zip。
linux.x64_11gR2_database_2of2.zip。

为了方便在虚拟机中复制粘贴，先安装WMware Tools，具体方法请看上一篇教程Linux安装VMware Tools教程。http://www.linuxidc.com/Linux/2017-05/143917.htm

简单的步骤见这里具体的请查看参考网页
具体遇到几个问题重点说明一下

注意

约定格式

命令提示符#和$:执行命令之前注意看命令面前的提示符，如果是#表示这个命令是需要root用户执行的，如：# vi /etc/sysconfig/network-scripts/ifcfg-eth0；如果是$则表示命令需要使用普通用户oracle来执行,如：$ lsnrctl start，别搞混了!!!

1.执行完两个脚本文件以后会提醒输入一个完整的路径
此时直接回车即可，

2.安装时注意oracle和root用户的切换

一些命令步骤：

一、
二、配置静态网卡（按照情况而定）
命令vi /etc/sysconfig/network-scripts/ifcfg-eth0

先编辑再重启网络服务 service network restart

最后测试一下 是否正确 ifconfig
ping 一下查看结果

DEVICE=eth0
TYPE=Ethernet
UUID=7923b5af-d111-4c2f-9d0e-10d6378c5b1e
ONBOOT=yes
NM_CONTROLLED=yes
BOOTPROTO=dhcp
#This is the static name
HWADDR=192.168.200.130
DEFROUTE=yes
IPV4_FAILURE_FATAL=yes
IPV6INIT=no
NAME="System eth0"
HWADDR=00:0C:29:BD:7F:AE
PEERDNS=yes
PEERROUTES=yes
LAST_CONNECT=1505066026

三、修改主机名（视情况而定）
修改本机名称，一般用于生产环境能够方便区分服务器的用途，如果是自己测试，此步骤可做可不做。
# vi /etc/sysconfig/network打开配置文件，修改HOSTNAME=dbserver.localdomain

保存退出，然后再执行# hostname dbserver.localdomain,再注销重新登陆系统，就可以看到修改结果了

四、修改系统标识(本次使用的就是Oracle6 所以和资料完全一致)
（oracle默认不支持CentOS系统安装），否则oracle将无法识别本系统导致安装失败。
执行# vi /etc/RedHat-release打开文件，注释掉# CentOS release 6.7(final),在下面添加
Red Hat Enterprise Linux 6。注意具体修改成red hat成哪个版本需要根据你系统的版本来看

结果
#CentOS release 6.7(Final)
Red Hat Enterprise Linux 6

五、关闭selinux
# vi /etc/selinux/config，
修改SELINUX=enforcing的值为disabled
注意将原来的部分进行注释 不要进行删除

六、关闭防火墙
# chkconfig iptables off，#service iptables stop：

七、修改内核参数，文件最后加上
# vi /etc/sysctl.conf
最后要将重复的部分进行注释
# 标记的是要注释的而不是要复制进去的文件

再执行# sysctl –p使参数生效。

fs.aio-max-nr = 1048576
fs.file-max = 6815744
kernel.shmall = 2097152  #
kernel.shmmax = 536870912 #
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
net.ipv4.ip_local_port_range = 9000 65500
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048586

八、修改/etc/pam.d/login，# vi /etc/pam.d/login,在文本末尾加上：

session    required /lib64/security/pam_limits.so
session    required pam_limits.so

九、创建用户，用户组
# groupadd oinstall 创建用户组oinstall
# groupadd dba 创建用户组dba
# useradd -g oinstall -G dba oracle 创建用户oracle，并加入oinstall和dba附属组
# passwd oracle 设置用户oracle的登录密码，根据提示输入两次密码

十、打开文件# /etc/profile，修改oracle用户的最大进程数：

位置是在 unset -f pathmunge后面

保存退出之后再执行# source /etc/profile使其生效。
if [ $USER = "oracle" ]; then
if [ $SHELL = "/bin/ksh" ]; then
ulimit -p 16384
ulimit -n 65536
else
ulimit -u 16384 -n 65536
fi
fi

十一、配置oracle用户的环境变量，
必须切换到新创建的oracle用户下# su – oracle，再修改.bash_profile配置文件，在文件末尾加入如下配置：.

export ORACLE_BASE=/home/oracle/app
export ORACLE_HOME=$ORACLE_BASE/oracle/product/11.2.0/dbhome_1
export ORACLE_SID=orcl  #SID注意和自己即将建立的SID对应
export PATH=$PATH:$HOME/bin:$ORACLE_HOME/bin
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/usr/lib

十二、编辑/etc/security/limits.conf文件，修改操作系统对oracle用户资源的限制，# vim /etc/security/limits.conf在文件末尾加上：
oracle  soft  nproc 2047
oracle  hard  nproc 16384
oracle  soft  nofile  1024
oracle  hard  nofile  65536
oracle  hard  stack 10240

十三、这个是介绍 见下面安装
操作系统版本及补丁矩阵，需要安装以下RPM软件包（加32bit括号注解的是该软件包32位版本，对应同名未加注解的则是该软件包64位版本。在64位版本平台上，两种版本都要安装）:

- binutils-2.17.50.0.6
- compat-libstdc++-33-3.2.3
- compat-libstdc++-33-3.2.3 (32 bit)
- elfutils-libelf-0.125
- elfutils-libelf-devel-0.125
- gcc-4.1.2
- gcc-c++-4.1.2
- glibc-2.5-24
- glibc-2.5-24 (32 bit)
- glibc-common-2.5
- glibc-devel-2.5
- glibc-devel-2.5 (32 bit)
- glibc-headers-2.5
- ksh-20060214
- libaio-0.3.106
- libaio-0.3.106 (32 bit)
- libaio-devel-0.3.106
- libaio-devel-0.3.106 (32 bit)
- libgcc-4.1.2
- libgcc-4.1.2 (32 bit)
- libstdc++-4.1.2
- libstdc++-4.1.2 (32 bit)
- libstdc++-devel 4.1.2
- make-3.81
- sysstat-7.0.2

安装：
使用yum安装：系统默认的yum源网络支持不是很好，最好把它修改成阿里或网易的镜像YUM源，阿里的可以访问http://mirrors.aliyun.com/help/centos，这里也明确告诉了你怎么操作了：
首先备份原文件，# mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup，然后再使用# wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo下载阿里的YUM，最后在使用# yum makecache命令重新缓存

接下来依次执行下面的命令来安装需要lib包。

yum install -y binutils*
yum install -y compat-libstdc*
yum install -y elfutils-libelf*
yum install -y gcc*
yum install -y glibc*
yum install -y ksh*
yum install -y libaio*
yum install -y libgcc*
yum install -y libstdc*
yum install -y make*
yum install -y sysstat*
yum install -y libXp*
yum install -y glibc-kernheaders

检查下lib是否安装齐全# rpm -q --queryformat %-{name}-%{version}-%{release}.%{arch}"\n" \ compat-libstdc++-33 glibc-kernheaders glibc-headers libaio libgcc glibc-devel xorg-x11-deprecated-libs
检查结果如下：

package  compat-libstdc++-33 is not installed
package glibc-kernheaders is not installed
glibc-headers-2.12-1.192.el6-x86_64
libaio-0.3.107-10.el6-x86_64
libgcc-4.4.7-17.el6-x86_64
libgcc-4.4.7-17.el6-i686
glibc-devel-2.12-1.192.el6-x86_64
package xorg-x11-deprecated-libs is not installed


开始Oracle安装(Oracle用户权限)
一、压缩包解压至/home/oracle/下
执行./runInstaller
二、乱码问题解决
需要临时修改系统语言。

#查看Linux系统语言
$ echo $LANG  
#修改Linux系统语言
$ export LANG='en_US'

三、关闭安装程序，再重新执行安装命令#掉勾选I wish to receive security updates via My Oracle Support.选项，直接next。