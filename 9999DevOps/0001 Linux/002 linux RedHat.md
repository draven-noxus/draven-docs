## 搭建red-hat环境

修改用户命令

比如修改：

passwd ricci

输入密码多次确认

## RedHat6.5下yum功能不能用问题

https://my.oschina.net/u/2303177/blog/1632570

This system is not registered to  Red Hat Subscription Management. You can use subscription-manager to  register.

1、下载yum替换软件包（链接：<http://pan.baidu.com/s/1c2HoEC4> 密码：tyug）

2、卸载原生yum

```shell
rpm -qa | grep yum | xargs rpm -e --nodeps
```

3、重新安装yum

```shell
rpm -ivh python-iniparse-0.3.1-2.1.el6.noarch.rpm
rpm -ivh yum-metadata-parser-1.1.2-16.el6.x86_64.rpm
rpm -ivh yum-3.2.29-40.el6.centos.noarch.rpm yum-plugin-fastestmirror-1.1.30-14.el6.noarch.rpm
```

4、下载CentOS6-Base-163.repo文件

```
wget http://mirrors.163.com/.help/CentOS6-Base-163.repo
```

5、将该文件拷到/etc/yum.repo.d目录下。提示：在/etc/yum.repo.d下有一个原生的rhel-source.repo文件，建议对rhel-source.repo做一个备份，将拷贝过来的CentOS6-Base-163.repo重命名为rhel-source.repo

6、将rhel-source.repo文件中，$releasever全部替换成Centos的版本号。比如，我这个版本是Redhat6.5,那么将$releasever全部替换成6。

```shell
sed -i 's/\$releasever/6/g' rhel-source.repo
```

7、清楚缓存，获取yum列表

```shell
yum clean all
yum makecache
```

等待两分钟，会出现：Metadata Cache Created 至此，yum可正常使用

## 解决复制虚拟机以后网卡问题

copy一个新的虚拟机修改ip报错

Error:No suitable device found: no device found for connection "System eth0" 

方案一：

生成新的mac

右键--设置--网络适配器--高级--生成

将新生成的mac码复制到HWADDR

```shell
vim /etc/sysconfig/network-script/ifc-eth0
# 修改新的机器码
```

同时保证

```shell
# 生成新的不能和以下文件中的一致
vim /etc/udev/rules.d/70-persistent-net.rules
# 查看ATTR{address}=="value" 一致 
```

方案二：

删除网络适配器

重新执行以上操作