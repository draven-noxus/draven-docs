# Docker

官网

https://docs.docker.com/

# 安装

## 初始化服务器

```shell
# 关闭SELinux
# 临时关闭（不用重启机器）：
setenforce 0

# 修改配置文件(重启机器)
# 将SELINUX=enforcing改为SELINUX=disabled
vi /etc/selinux/config

	# 或者
	# vi /etc/sysconfig/selinux
	selinux=false
	reboot

# 重启机器
reboot

# 查看状态
/usr/sbin/sestatus -v
$ SELinux status:                 disabled
```



## 安装（centos）

```shell
# 0.查看版本(大多数均使用7.4+)
uname -r
 $ 3.10.0-1062.el7.x86_64
	
# 1.安装所需的依赖包 提供了 yum-config-manager，可用来管理yum源
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2

# 2.仓库
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
    
# 3.更新yum（不建议）（1-8）若安装不成功从8往后开始安装
$	yum update

# 4. 添加yum源 使用阿里云
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 5. 更新索引
sudo yum makecache fast

# 6. 安装 docker-ce
sudo yum install -y docker-ce
 # 列出docker
sudo yum list docker-ce --showduplicates | sort -r
	docker-ce.x86_64    3:18.09.2-3.el7       docker-ce-stable 
  docker-ce.x86_64    3:18.09.1-3.el7       docker-ce-stable 
  docker-ce.x86_64    3:18.09.0-3.el7       docker-ce-stable 
  docker-ce.x86_64    18.06.3.ce-3.el7      docker-ce-stable 

# 7. 安装指定版本docker
yum install docker-ce-3:20.10.5-3.el7 docker-ce-cli-3:20.10.5-3.el7

# 8. 启动docker 开机启动
sudo systemctl start docker
systemctl enable docker
# 9. 验证是否安装成功
 docker info 
 docker version

# 在线更新安装源
curl -fsSL https://get.docker.com/ | sh

containerd.io
```

## 安装（Ubuntu）

```shell
# 前置检查 
 # 内核版本
$ uname -a
 # 检查Decvice Mapper
$ ls -l /sys/class/misc/device-mapper

# 自己维护的docker（不推荐）

# curl 安装
$ sudo apt-get install -y curl
# 安装docker
$ curl -sSL https://get.docker.com/ubuntu/|sudo sh

# 添加非root用户
 # 创建用户组
$ sudo groupadd docker
 # 将当前用户添加到docker用户组
$ sudo gpasswd -a ${USER}docker
 # 重新启动使配置生效
$ sudo service docker restart
```

## 安装（windows）

```shell
# 下载 Boot2Docker
# https:github.com/boot2docker/boot2docker
# docker-install.exe


# Windows Azure
# Windows Server的下一个版本
# Docker Windows CLI
```

## 安装（mac）

```shell
# 下载 Boot2Docker

# 打开命令行窗口
# 建立$HOME/.boot2docker
# 创建VirtualBox ISO
# 启动虚拟机并运行Docker守护进程
```

## Kitematic界面操作

```
不会
```

## 离线安装

```
不会
```

# Desktop for Docker

## Windows

### 1. 开启Hyper-V

新建`hyperv.cmd`文件，内容如下：

```bash
pushd "%~dp0"

dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt

for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"

del hyper-v.txt

Dism /online /enable-feature /featurename:Microsoft-Hyper-V-All /LimitAccess /ALL
```

`控制面板->程序和功能->启用或关闭Windows功能`打开Hyper-V

### 2. 伪装成win10专业版

以管理员身份打开cmd，也可以脚本放到启动项里面

```shell
REG ADD "HKEY_LOCAL_MACHINE\software\Microsoft\Windows NT\CurrentVersion" /v EditionId /T REG_EXPAND_SZ /d Professional /F

# 备份注册表 还原方式
REG ADD "HKEY_LOCAL_MACHINE\software\Microsoft\Windows NT\CurrentVersion" /v CoreCountrySpecific /T REG_EXPAND_SZ /d Professional /F
```

### 3.下载安装包

#### Docker for Windows

```shell
# 官网下载链接（需翻墙）：
https://store.docker.com/editions/community/docker-ce-desktop-windows

# 国内镜像：
 https://oomake.com/download/docker-windows （百度网盘）
 https://mirrors.ustc.edu.cn/docker-ce/ （版本更新不及时）

# 下载后直接安装，安装时注意取消勾选window容器（默认不会勾选）。

# Docker安装成功后，执行cmd命令
$ docker version
```

### 4.其他问题

使用docker toolbox卸载问题看这里

```shell
$ docker for windows could not read CA certificate 问题
```

问题原因：之前安装过 docker toolbox。

```shell
解决步骤：
1. 删掉四个docker 的环境变量
2. 执行cmd命令`docker-machine rm default`
3. 以管理员身份执行cmd命令`@FOR /f "tokens=*" %i IN ('docker-machine env -u') DO @%i`
```



# 配置

### 镜像加速

```shell
# 建议使用阿里云
vi /etc/docker/daemon.json

# 陆续添加中...

# 中国科技大学开源镜像站
https://docker.mirrors.ustc.edu.cn

http://f1361db2.m.daocloud.io

curl -sSL https://get.daocloud.io/daotools/set_mirror.sh

vim /etc/docker/daemon.json

{
  "registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]
}

# 重新载入文件重启
# 载入文件
systemctl daemon-reload
# 重新启动
systemctl restart docker
```





# Uninstall old versions

```shell
# 这句话描述了安装位置                  
The contents of /var/lib/docker/, including images, containers, volumes, and networks, are preserved

# 卸载旧的版本
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 清除内容包括镜像容器
yum remove docker-ce
rm -rf /var/lib/docker
```



# FAQ

## 问题一

```shell
Job for docker.service failed because the control process exited with error code

# 方案
vim /etc/sysconfig/docker  增加=false	
OPTIONS='--selinux-enabled=false --log-driver=journald --signature-verification=false'

# 重启
systemctl  restart  docker
```

## 问题二

```shell
# 拉取镜像 启动镜像报错
Error response from daemon: oci runtime error: container_linux.go:247: starting container process caused "process_linux.go:258: applying cgroup configuration for process caused \"Cannot set property TasksAccounting, or unknown property.\""
Error: failed to start containers: jenkins

# 升级系统到7.4，即可解决
docker run -it centos echo haha
docker version

cat /etc/redhat-release 
	CentOS Linux release 7.3.1611 (Core) 
yum update
	CentOS Linux release 7.6.1810 (Core)
```

# 维护脚本

```shell
docker system prune [OPTIONS]

--all , -a      Remove all unused images not just dangling ones
--filter        Provide filter values (e.g. ‘label==')
--force , -f    Do not prompt for confirmation
--volumes       Prune volumes

# 查看docker磁盘使用情况

docker system df

# 删除所有未使用的容器，网络，镜像（没有被使用的 image）以及缓存。

docker system prune -a --force

# 删除未被正在运行容器使用的卷

docker system prune -a --volumes --force


查找挖矿病毒
/var/lib/docker/overlay2/26e19b00f310f52fb9a6206f86277af529348c46402c6ba3be7779139819ad80/merged/bin/xmrig

lrwxrwxrwx 1 root root 0 3月  28 21:40 /proc/5823/exe -> /bin/xmrig
```

