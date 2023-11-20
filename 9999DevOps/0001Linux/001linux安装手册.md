# JDK安装

```shell
# 查看版本
java -version
# 获取jdk 
# 免密下载
wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" https://download.oracle.com/otn-pub/java/jdk/8u231-b11/5b13a193868b4bf28bcb45c792fce896/jdk-8u231-linux-x64.tar.gz

# 卸载JDK
java -version
# 列出安装包rpm package
rpm -e --nodeps 	
# 卸载
rpm -qa | grep java
# 解压
tar -xvf
# (grep java)
rpm -qa | grep java

rpm -e --nodeps java-1.7.0-openjdk-1.7.0.45-2.4.3.3.el6.x86_64
rpm -e --nodeps java-1.6.0-openjdk-1.6.0.0-1.66.1.13.0.el6.x86_64

# 安装JDK
# 软连接安装
# 创建文件夹

mkdir /usr/local/java

tar -zxvf jdk-7u80-linux-x64.tar.gz -C /usr/local/java/

cd /usr/local/java

ln -s jdk1.7.0_80 current_version

vi /etc/profile

# 配置环境变量
export JAVA_HOME=/usr/local/java/current_version
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$PATH

# 生效
source /etc/profile 

# rpm 安装
rpm -ivh jdk-8u172-linux-x64.rpm 

# 配置环境变量
JAVA_HOME=/usr/java/jdk1.8.0_121
PATH=$JAVA_HOME/bin:$PATH
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME
export PATH
export CLASSPATH

# 配置生效 
source /etc/profile
# 确认环境变量
java -version
echo $JAVA_HOME
```



# Maven 安装

```shell
# 此处安装版本为 3.3.9
cd /platform

# 如需换版本，找到对应链接替换该命令即可
wget http://apache.fayea.com/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz

tar -zxvf apache-maven-3.3.9-bin.tar.gz

vim /etc/profile

# 末尾增加
export MAVEN_HOME=/platform/apache-maven-3.3.9
export PATH=${MAVEN_HOME}/bin:${PATH}

# 保存退出
source /etc/profile

# 检查
mvn -v
```

# 安装MySQL

```shell
#检测是否已经安装了mysql
rpm -qa | grep mysql  

#如果已经安装了，将其卸载，如：
rpm -e --nodeps  mysql-libs-5.1.71-1.el6.x86_64

# 安装mysql
mkdir /usr/local/mysql
cd /usr/local/mysql
tar -xvf MySQL-5.6.22-1.el6.i686.rpm-bundle.tar
# 安装插件
yum -y install libaio.so.1 libgcc_s.so.1 libstdc++.so.6 
# 需要升级libstdc++-4.4.7-4.el6.x86_64
yum  update libstdc++-4.4.7-4.el6.x86_64
# 安装server（mysql服务器）
rpm -ivh MySQL-server-5.6.22-1.el6.i686.rpm
# 安装mysql客户端
rpm -ivh MySQL-client-server-5.6.22-1.el6.i686.rpm
# 查询mysq服务运行状态
service mysql status
# 服务未启动。
MySQL is not running 
# 启动mysql服务
service mysql start
# 再次查看
service mysql status
# 使用root账号登录mysql
mysql -u root 
# 在安装mysql server时有句提示：
A RANDOM PASSWORD HAS BEEN SET FOR THE MySQL root USER !
You will find that password in '/root/.mysql_secret'.

# 查看密码
ll -a 
cat .mysql_secret

$ pKfZiUWKbTKWAME1

# 使用密码登录mysql账号
mysql -uroot -p
# 修改root密码
SET PASSWORD = PASSWORD('root');

# 开机自动启动
# 系统启动时自动启动mysql服务
# 加入到系统服务：
  chkconfig --add mysql
# 自动启动：
  chkconfig mysql on
  quit;

# 开启远程访问
# 先登录：
mysql -uroot –proot

# 设置远程访问（使用root密码）：
# 授权
grant all privileges on *.* to 'root' @'%' identified by 'root';
# 刷新
flush privileges;   

#（建议）防火墙打开3306端口
/sbin/iptables -I INPUT -p tcp --dport 3306 -j ACCEPT  添加到防火墙列表
# 保存一下 
/etc/rc.d/init.d/iptables save   
# 查看防火墙列表
/etc/init.d/iptables status   

# 如果需要关闭或开户防火墙：不用设置端口
# 1) 重启后生效 
# 开启： 
chkconfig iptables on 
# 关闭
chkconfig iptables off 

# 2) 即时生效，重启后失效 
# 开启
service iptables start 
# 关闭
service iptables stop
```

# 安装Git

```shell
# 安装依赖包
yum install -y curl-devel expat-devel gettext-devel openssl-devel zlib-devel asciidoc gcc perl-ExtUtils-MakeMaker

# 卸载旧的 git
yum remove -y git

# 安装 git
cd /usr/local/src/
wget https://www.kernel.org/pub/software/scm/git/git-2.18.0.tar.xz
tar -vxf git-2.18.0.tar.xz
cd git-2.18.0
make prefix=/usr/local/git all
make prefix=/usr/local/git install
ln -s /usr/local/git/bin/git /bin/git

# 检查
git --version

```

# Node.js 安装

```shell
# 安装依赖
yum install -y epel-release 

# 安装 node
/usr/bin/yum install -y nodejs

# 安装 n<管理版本>
npm install -g n

# 安装最新长期维护版
n lts

# 此时 node -v or npm -v 均还是原来版本
cd /bin/
mv node node_bak
mv npm npm_bak
ln -s /usr/local/bin/node /bin/node
ln -s /usr/local/bin/npm /bin/npm

# 此时 node -v or npm -v 均是最新版本
node -v
npm -v
```

# SSH 密钥创建及密钥登录

```shell
# SSH有专门创建SSH密钥的工具ssh-keygen

cd /root/.ssh/

ssh-keygen -t rsa -b 4096

# copy 到指定客户端
ssh-copy-id -i /root/.ssh/id_rsa.pub root@192.168.100.10


# 
touch authorized_keys

chmod 600 /root/.ssh/authorized_keys

cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys



ssh -i ./id_rsa root@192.168.100.39
或者ssh root@192.168.100.39 -i ./id_rsa



# ssh-keygen可用的参数选项有：
 
     -a trials
             在使用 -T 对 DH-GEX 候选素数进行安全筛选时需要执行的基本测试数量。
 
     -B      显示指定的公钥/私钥文件的 bubblebabble 摘要。
 
     -b bits
             指定密钥长度。对于RSA密钥，最小要求768位，默认是2048位。DSA密钥必须恰好是1024位(FIPS 186-2 标准的要求)。
 
     -C comment
             提供一个新注释
 
     -c      要求修改私钥和公钥文件中的注释。本选项只支持 RSA1 密钥。
             程序将提示输入私钥文件名、密语(如果存在)、新注释。
 
     -D reader
             下载存储在智能卡 reader 里的 RSA 公钥。
 
     -e      读取OpenSSH的私钥或公钥文件，并以 RFC 4716 SSH 公钥文件格式在 stdout 上显示出来。
             该选项能够为多种商业版本的 SSH 输出密钥。
 
     -F hostname
             在 known_hosts 文件中搜索指定的 hostname ，并列出所有的匹配项。
             这个选项主要用于查找散列过的主机名/ip地址，还可以和 -H 选项联用打印找到的公钥的散列值。
 
     -f filename
             指定密钥文件名。
 
     -G output_file
             为 DH-GEX 产生候选素数。这些素数必须在使用之前使用 -T 选项进行安全筛选。
 
     -g      在使用 -r 打印指纹资源记录的时候使用通用的 DNS 格式。
 
     -H      对 known_hosts 文件进行散列计算。这将把文件中的所有主机名/ip地址替换为相应的散列值。
             原来文件的内容将会添加一个".old"后缀后保存。这些散列值只能被 ssh 和 sshd 使用。
             这个选项不会修改已经经过散列的主机名/ip地址，因此可以在部分公钥已经散列过的文件上安全使用。
 
     -i      读取未加密的SSH-2兼容的私钥/公钥文件，然后在 stdout 显示OpenSSH兼容的私钥/公钥。
             该选项主要用于从多种商业版本的SSH中导入密钥。
 
     -l      显示公钥文件的指纹数据。它也支持 RSA1 的私钥。
             对于RSA和DSA密钥，将会寻找对应的公钥文件，然后显示其指纹数据。
 
     -M memory
             指定在生成 DH-GEXS 候选素数的时候最大内存用量(MB)。
 
     -N new_passphrase
             提供一个新的密语。
 
     -P passphrase
             提供(旧)密语。
 
     -p      要求改变某私钥文件的密语而不重建私钥。程序将提示输入私钥文件名、原来的密语、以及两次输入新密语。
 
     -q      安静模式。用于在 /etc/rc 中创建新密钥的时候。
 
     -R hostname
             从 known_hosts 文件中删除所有属于 hostname 的密钥。
             这个选项主要用于删除经过散列的主机(参见 -H 选项)的密钥。
 
     -r hostname
             打印名为 hostname 的公钥文件的 SSHFP 指纹资源记录。
 
     -S start
             指定在生成 DH-GEX 候选模数时的起始点(16进制)。
 
     -T output_file
             测试 Diffie-Hellman group exchange 候选素数(由 -G 选项生成)的安全性。
 
     -t type
             指定要创建的密钥类型。可以使用："rsa1"(SSH-1) "rsa"(SSH-2) "dsa"(SSH-2)
 
     -U reader
             把现存的RSA私钥上传到智能卡 reader
 
     -v      详细模式。ssh-keygen 将会输出处理过程的详细调试信息。常用于调试模数的产生过程。
             重复使用多个 -v 选项将会增加信息的详细程度(最大3次)。
 
     -W generator
             指定在为 DH-GEX 测试候选模数时想要使用的 generator
 
     -y      读取OpenSSH专有格式的公钥文件，并将OpenSSH公钥显示在 stdout 上。
     
     
     
# ssh-copy-id的参数有：
 
    -i #指定密钥文件
    -p #指定端口，默认端口号是22
    -o <ssh -o options>
    user@]hostname #用户名@主机名
    -f: force mode -- copy keys without trying to check if they are already installed
    -n: dry run    -- no keys are actually copied
    -h|-?: 显示帮助

```

# redis

```shell
# 安装环境
# 依赖
yum install gcc-c++
# 上传 解压
# 编译redis
# 进入cd 
	redis-3.0.7
# 执行
	make
# 安装 路径
	make PREFIX=/usr/local/redis install
# copy文件
	配置文件
	cp redis.conf /usr/local/redis
# 后台开启
	/usr/local/redis/bin/redis-server
# 停止前端
	ctrl + c
# 后端模式
	vim/usr/local/redis/redis.conf
# 启动时，配置文件
	cd/usr/local/redis/
	./bin/redis-server ./redis.conf
# 当前任务进行查找
	ps aux | grep - i redis
# 连接客户端
	redis-cli -h ip地址 -p端口

# 启动
/usr/local/redis/bin
./redis-server ./redis.conf

# 登录
 ./redis-cli
```

# Docker 安装

```shell
# 删除旧的 docker 
yum remove docker  docker-client  docker-client-latest  docker-common  docker-latest  docker-latest-logrotate  docker-logrotate  docker-selinux  docker-engine-selinux  docker-engine docker-ce -y

# 删除旧的 docker 文件
rm -rf /var/lib/docker

# 安装所需的依赖包
yum install -y yum-utils device-mapper-persistent-data lvm2

# 安装仓库地址
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 改用阿里源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 查看仓库内可选的版本包
yum list docker-ce --showduplicates | sort -r

# 选择其中一个安装
yum install docker-ce-18.06.1.ce -y

# 启动 docker，并设置开机自启
systemctl start docker
systemctl enable docker
```



# Docker-Compose 安装

```shell
# 官网<翻墙速度慢>
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version

# 国内源安装
pip -V # 检查有没有 python-pip 包

# 没有则安装
yum -y install epel-release 
yum -y install python-pip
pip install --upgrade pip

# 安装 docker-compose
pip install docker-compose
docker-compose -version
```



## SSH 登录<拒绝密码>

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

## 修改 hostname

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



