# 基础知识

```shell
# https://www.kernel.org/releases.html
uname -r
3.10.0-957.el7.x86_64
# 查看操作系统的位版本
uname -m
x86_64
# LSB 的相关版本
# yum install -y redhat-lsb
lsb_release -a

LSB Version:    :core-4.1-amd64:core-4.1-noarch:cxx-4.1-amd64:cxx-4.1-noarch:desktop-4.1-amd64:desktop-4.1-noarch:languages-4.1-amd64:languages-4.1-noarch:printing-4.1-amd64:printing-4.1-noarch
Distributor ID: CentOS
Description:    CentOS Linux release 7.6.1810 (Core) 
Release:        7.6.1810
Codename:       Core



```

版本

| Linux distributions | RPM 软件管理                                 | DPKG 软件管理           | 其他未分类 |
| ------------------- | -------------------------------------------- | ----------------------- | ---------- |
| 商业公司            | RHEL (Red Hat 公司) <br />SuSE (Micro Focus) | Ubuntu (Canonical Ltd.) |            |
| 社群单位            | Fedora <br />CentOS <br />OpenSuSE           | Debian B2D              | Gentoo     |

-   Red Hat: http://www.redhat.com 
-   SuSE: https://www.suse.com 
-   Fedora: https://getfedora.org/ 
-   CentOS: http://www.centos.org/ 
-   Debian: http://www.debian.org/ 
-   Ubuntu: http://www.ubuntu.com/ 
-   Gentoo: http://www.gentoo.org/ 





-   自由软件技术交流网: http://freesf.tw/ 
-   B2D: http://b2d-linux.com/ 
-   http://www.knoppix.net/ 
-   洪老师解释 KNOPPIX: http://people.ofset.org/~ckhung/b/sa/knoppix.php 
-   http://distrowatch.com/



-   VMWare 的虚拟化支持: https://www.vmware.com/support/ws55/doc/intro_supguest_ws.html 



```shell
/var/log/





man date

man man

/usr/share/man

/etc/man_db.conf


# man
whatis 	xxx  =  man -f xxx
apropos xxx  =  man -k xxx

# info --> Node
/usr/share/info



# documents
/usr/share/doc



# 文本编辑器 nano基本操作指令
 [ctrl]-G:取得联机帮助(help)，很有用的!
 [ctrl]-X:离开 naon 软件，若有修改过文件会提示是否需要储存喔!
 [ctrl]-O:储存文件，若你有权限的话就能够储存文件了;
 [ctrl]-R:从其他文件读入资料，可以将某个文件的内容贴在本文件中;
 [ctrl]-W:搜寻字符串，这个也是很有帮助的指令喔!
 [ctrl]-C:说明目前光标所在处的行数与列数等信息;
 [ctrl]-_:可以直接输入行号，让光标快速移动到该行;
 [alt]-Y:校正语法功能开启或关闭(单击开、再单击关)
 [alt]-M:可以支持鼠标来移动光标的功能
 
 
 
 
# 关机相关
目前有谁在在线，可以下达『who』这个指令
网络的联机状态，可以下达『 netstat -a 』
看背景执行的程序可以执行『 ps -aux 』
# 开关机指令
关机指令 shutdown
重新启动 reboot half poweroff
数据同步写入硬盘中 sync

# 用户切换
su - # 主用户
su root #主用户
su username #其他用户



# systemctl [指令]
halt			进入系统停止的模式，屏幕可能会保留一些讯息，这与你的电源管理模式有关
poweroff	进入系统关机模式，直接关机没有提供电力喔!
reboot		直接重新启动
suspend		进入休眠模式





# 调出万年历
最简单的方式直接使用 cal 5 2010 即可找出 2010 年 5 月份的月历。




root
user
group
others


# root 相关信息
/etc/passwd
# 密码相关
/etc/shadow
# 分组信息
/etc/group

# 语言信息
/etc/locale.conf
 LANG="zh_CN.UTF-8"


# 包含全新信息
ls -al
# 时间戳全部信息
ls -l --full-time


# 权限问题
- - - - - - - - - - -
第一个字符代表这个文件是『目录、文件或链接文件等等』:
o 当为[ d ]则是目录，例如上表档名为『.config』的那一行;
o 当为[ - ]则是文件，例如上表档名为『initial-setup-ks.cfg』那一行;
o 若是[ l ]则表示为连结档(link file);
o 若是[ b ]则表示为装置文件里面的可供储存的接口设备(可随机存取装置);
o 若是[ c ]则表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。


以三个为一组，且均为『rwx』 的三个参数的组合。其中，[ r ]代表可读(read)、[ w ]代表 可写(write)、[ x ]代表可执行(execute)

o 第一组为『文件拥有者可具备的权限』，以『initial-setup-ks.cfg』那个文件为例， 该文件的拥有者 可以读写，但不可执行;
o 第二组为『加入此群组之账号的权限』;
o 第三组为『非本人且没有加入本群组之其他账号的权限』。

# 权限修改指令
 chgrp :改变文件所属群组
 chown :改变文件拥有者
 chmod :改变文件的权限, SUID, SGID, SBIT 等等的特性


umask
0022

# 群组
chgrp [-R] dirname/filename ...
chgrp users initial-setup-ks.cfg

chown [-R] 账号名称 文件或目录
chown [-R] 账号名称:组名 文件或目录
chown root:root initial-setup-ks.cfg


# 数字
chmod [-R]  文件或目录
r:4 w:2 x:1

 
# 符号 
user		u
group		g
others	o

+
-
*

r
w
x



# 文件目录
/root()
/usr(unix software resource) 与软件安装/执行有关
/var(variable)  与系统运作有关




# linux自带任务调度脚本工具
crontab -e
cron表达式 + 执行脚本



# 文件目录

# 当前用户所在家目录
cd ~username

# 真实目录
pwd -P 

# 新建文件夹
mkdir [-mp] 目录名称
-m # 权限
-p # 递归

# 删除目录
rmdir 删除一个目录
-p # 递归


[root@localhost bin]# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin


# cp
-a :相当于 -dr --preserve=all 的意思，至于 dr 请参考下列说明;(常用)
-i :若目标文件(destination)已经存在时，在覆盖时会先询问动作的进行(常用)
-p :连同文件的属性(权限、用户、时间)一起复制过去，而非使用默认属性(备份常用);
-r :递归持续复制，用于目录的复制行为;(常用)


# rm
rm xxx
rm -r xxx
rm -rf xxx

# mv
-f :force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖; 
-i :若目标文件 (destination) 已经存在时，就会询问是否覆盖!
-u :若目标文件已经存在，且 source 比较新，才会更新 (update)


# 一般就是使用tail 比较多
	# 反向展示
	#	tac 
# 浏览
 cat		由第一行开始显示文件内容 
 tac		从最后一行开始显示，可以看出 tac 是 cat 的倒着写
 nl		显示的时候，顺道输出行号!
 more	一页一页的显示文件内容
 less	与 more 类似，但是比 more 更好的是，他可以往前翻页
 head  只看头几行
 tail 只看尾巴几行
 od 以二进制的方式读取文件内容


# cat [-AbEnTv] 选项与参数:
-A :相当于 -vET 的整合选项，可列出一些特殊字符而不是空白而已; -b :列出行号，仅针对非空白行做行号显示，空白行不标行号!
-E :将结尾的断行字符 $ 显示出来;
-n :打印出行号，连同空白行也会有行号，与 -b 的选项不同;
-T :将 [tab] 按键以 ^I 显示出来; -v :列出一些看不出来的特殊字符


# 文件时间
date; ll bashrc; ll --time=atime bashrc; ll --time=ctime bashrc
# modification time (mtime)：修改时间
# status time (ctime)：状态 包括权限
# access time (atime)：读取时间

# 文件寻找
which [-a]  command/document
whereis [-bmsu] 文件或目录名

# find [PATH] [option] [action]
find / -name caseword


# tar
  # 压缩
tar -cvf 压缩后文件 ./文件夹
  # 解压：
tar -xvf /root/jsk.tar -C jdk与Weblogic
```

# Shell Scripts

/ect/init.d/* 被 system 所替代



注意事项

空白+tab 均视为 空白

回车符号均视为执行该条命令

"#" 作为注释

"\\" 作为换行命令



执行命令

绝对路径	/全路径/xxx.sh

相对路径	./xxx.sh

变量『PATH』功能:将 shell.sh 放在 PATH 指定的目录内，例如: ~/bin/ 



以 bash 程序来执行:透过『 bash shell.sh 』或『 sh shell.sh 』来执行 









-   script 的功能; 
-   script 的版本信息; 

-   script 的作者与联络方式; 
-   script 的版权宣告方式; 
-   script 的 History (历史纪录); 
-   script 内较特殊的指令，使用『绝对路径』的方式来下达; 
-   script 运作时需要的环境变量预先宣告与设定。 



# shell应用

## Linux调度删除日志

### 1.linux调度

crontab -e

*/1 * * * * /home/bin/test.sh >/dev/null 2>&1

2.编写脚本 test.sh

```shell
!/bin/sh

searchPath=/home/bin/app
cd ${searchPath}

declare -i total=`ls app.log.* | wc -l`
declare -i nums=$total-5

if [ "${nums}" -ge 1 ];then
    rm -rf `ls -tr app.log.* | head -${nums}`
fi
```

3.准备示例数据

app.log

app.log.2019-11-31

chmod +x xx.sh

### 2.实战

```shell
# 1.创建目录
cd /data
# 2.新建脚本保存文件夹
mkdir bin
# 3.编辑脚本 也可上传
vim rm_infodisc_service.sh

# !/bin/sh
# remove infodisc_service_*.log
# the data source
searchPath=/data/logs/infodisc_service
cd ${searchPath}
# totals
declare -i total=`ls infodisc_service_*.log | wc -l`
# leave the days  0
declare -i nums=$total-1
# remove the logs
if [ "${nums}" -ge 1 ];then
    rm -rf `ls -tr infodisc_service_*.log | head -${nums}`
fi

# 4.可执行权限
chmod +x rm_infodisc_service.sh


# 添加定时任务
crontab -e
# 测试脚本
# */1 * * * * /data/bin/rm_infodisc_service.sh >/dev/null 2>&1
# 模拟脚本
15 00 * * * /data/bin/rm_infodisc_service.sh >/dev/null 2>&1

15 00 * * * /data/logs/infodisc_service/rm_infodisc_service.sh >/dev/null 2>&1

# 测试数据样例

# 若干
infodisc_service_2019-12-01_3.log ...
# 一个 当日生成文件
infodisc_service.log

# 查看日志 weblogic 用户没有权限 有日志文件生成
tail -f /var/log/cron-xxx

# 验证 查看是否只有一个 infodisc_service.log 日志
```



