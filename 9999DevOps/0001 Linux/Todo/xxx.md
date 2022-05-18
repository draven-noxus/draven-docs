# cmd命令大全

cmd命令大全（第一部分）
　　winver---------检查Windows版本
　　wmimgmt.msc----打开windows管理体系结构(WMI)
　　wupdmgr--------windows更新程序
　　wscript--------windows脚本宿主设置
　　write----------写字板
　　winmsd---------系统信息
　　wiaacmgr-------扫描仪和照相机向导
　　winchat--------XP自带局域网聊天
2
cmd命令大全（第二部分）
　　mem.exe--------显示内存使用情况
　　Msconfig.exe---系统配置实用程序
　　mplayer2-------简易widnows media player
　　mspaint--------画图板
　　mstsc----------远程桌面连接
　　mplayer2-------媒体播放机
　　magnify--------放大镜实用程序
　　mmc------------打开控制台
　　mobsync--------同步命令
3
cmd命令大全（第三部分）
　　dxdiag---------检查DirectX信息
　　drwtsn32------ 系统医生
　　devmgmt.msc--- 设备管理器
　　dfrg.msc-------磁盘碎片整理程序
　　diskmgmt.msc---磁盘管理实用程序
　　dcomcnfg-------打开系统组件服务
　　ddeshare-------打开DDE共享设置
　　dvdplay--------DVD播放器
4
cmd命令大全（第四部分）
　　net stop messenger-----停止信使服务
　　net start messenger----开始信使服务
　　notepad--------打开记事本
　　nslookup-------网络管理的工具向导
　　ntbackup-------系统备份和还原
　　narrator-------屏幕“讲述人”
　　ntmsmgr.msc----移动存储管理器
　　ntmsoprq.msc---移动存储管理员操作请求
　　netstat -an----(TC)命令检查接口
5
cmd命令大全（第五部分）
　　syncapp--------创建一个公文包
　　sysedit--------系统配置编辑器
　　sigverif-------文件签名验证程序
　　sndrec32-------录音机
　　shrpubw--------创建共享文件夹
　　secpol.m转载自电脑十万个为什么http://www.qq880.com，请保留此标记sc-----本地安全策略
　　syskey---------系统加密，一旦加密就不能解开，保护windows xp系统的双重密码
　　services.msc---本地服务设置
　　Sndvol32-------音量控制程序
　　sfc.exe--------系统文件检查器
　　sfc /scannow---windows文件保护
6
cmd命令大全（第六部分）
　　tsshutdn-------60秒倒计时关机命令
　　tourstart------xp简介（安装完成后出现的漫游xp程序）
　　taskmgr--------任务管理器
　　eventvwr-------事件查看器
　　eudcedit-------造字程序
　　explorer-------打开资源管理器
　　packager-------对象包装程序
　　perfmon.msc----计算机性能监测程序
　　progman--------程序管理器
　　regedit.exe----注册表
　　rsop.msc-------组策略结果集
　　regedt32-------注册表编辑器
　　rononce -p ----15秒关机
　　regsvr32 /u *.dll----停止dll文件运行
　　regsvr32 /u zipfldr.dll------取消ZIP支持
7
cmd命令大全（第七部分）
　　cmd.exe--------CMD命令提示符
　　chkdsk.exe-----Chkdsk磁盘检查
　　certmgr.msc----证书管理实用程序
　　calc-----------启动计算器
　　charmap--------启动字符映射表
　　cliconfg-------SQL SERVER 客户端网络实用程序
　　Clipbrd--------剪贴板查看器
　　conf-----------启动netmeeting
　　compmgmt.msc---计算机管理
　　cleanmgr-------垃圾整理
　　ciadv.msc------索引服务程序
　　osk------------打开屏幕键盘
　　odbcad32-------ODBC数据源管理器
　　oobe/msoobe /a----检查XP是否激活
　　lusrmgr.msc----本机用户和组
　　logoff---------注销命令
　　iexpress-------木马捆绑工具，系统自带
　　Nslookup-------IP地址侦测器
　　fsmgmt.msc-----共享文件夹管理器
　　utilman--------辅助工具管理器
　　gpedit.msc-----组策略





yum -y install lrzsz		安装rzsz插件进行上传







运行tomcat

cd usr/local/tomcat/apache-tomcat-7.0.57/bin


直接启动，并输出文件
sh catalina.sh run

启动
sh startup.sh


关闭
sh shutdown.sh

cd usr/local/tomcat/apache-tomcat-7.0.57/bin/logs 

动态展示 需要克隆一个窗口
tail -f catalina.out

间接进去
cd /usr/local/tomcat/apache-tomcat-7.0.57

cd /webapps

直接进去webapps
cd /usr/local/tomcat/apache-tomcat-7.0.57/webapps

运行redis
由于没有配置conf
故克隆



cd usr/local/redis/redis/bin

./redis-server



运行activeMQ


cd usr/local/activemq/apache-activemq-5.14.0/bin


./activemq start

防火墙处理
/sbin/iptables -I INPUT -p tcp --dport 8161 -j ACCEPT&&/etc/init.d/iptables save&&service iptables restart&&/etc/init.d/iptables status
/sbin/iptables -I INPUT -p tcp --dport 61616 -j ACCEPT&&/etc/init.d/iptables save&&service iptables restart&&/etc/init.d/iptables status






防火墙状态
service itaples status


1. 查看Linux启动的服务
chkconfig --list 查询出所有当前运行的服务
chkconfig --list atd  查询atd服务的当前状态
2.停止所有服务并且在下次系统启动时不再启动，如下所示：
chkconfig --levels 12345 NetworkManager off
如果想查看当前处于运行状态的服务，用如下语句过滤即可
chkconfig --list |grep on
3.如果只是想当前的设置状态有效，在系统重启动后即不生效的话，可以用如下命令停止服务
service sshd stop。




Linux 教程
Linux 教程
Linux 简介
Linux 安装
Linux 系统启动过程
Linux 系统目录结构
Linux 忘记密码解决方法
Linux 远程登录
Linux 文件基本属性
Linux 文件与目录管理
Linux 用户和用户组管理
Linux 磁盘管理
Linux vi/vim
linux yum 命令

Shell 教程
Shell 教程
Shell 变量
Shell 传递参数
Shell 数组
Shell 运算符
Shell echo命令
Shell printf命令
Shell test 命令
Shell 流程控制
Shell 函数
Shell 输入/输出重定向
Shell 文件包含

Linux 参考手册
Linux 命令大全
Nginx 安装配置
MySQL 安装配置
Linux 命令大全
MySQL 安装配置
Nginx 安装配置















