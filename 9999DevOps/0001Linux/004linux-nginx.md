# Nginx

## 快速安装

```shell
# 快速安装
yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
yum install -y zlib-devel

# 编译安装
./configure
--prefix=/usr/local/webserver/nginx 
--with-http_stub_status_module 
--with-http_ssl_module 
--with-pcre=/usr/local/src/pcre-8.35

# 安装 
make && make install
```

## 离线安装

```shell
# 1.安装编译工具及库文件
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel

# 2.首先要安装 PCRE
	# PCRE 作用是让 Nginx 支持 Rewrite 功能。

# 下载 PCRE 安装包
# 下载地址
wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz

# 解压安装包:
tar zxvf pcre-8.35.tar.gz

# 进入安装包目录
cd pcre-8.35

# 编译安装 
./configure
make && make install

# 查看pcre版本
pcre-config --version

# 安装 Nginx
# 1、下载 Nginx
wget http://nginx.org/download/nginx-1.6.2.tar.gz

# 解压安装包
tar zxvf nginx-1.6.2.tar.gz

# 进入安装包目录
cd nginx-1.6.2

# 编译安装
./configure 
--prefix=/usr/local/webserver/nginx 
--with-http_stub_status_module 
--with-http_ssl_module 
--with-pcre=/usr/local/src/pcre-8.35 # 这里指定pcre的位置

# 安装 
make && make install
```

## 运行Nginx

```shell
# 创建运行用户
nginx

# 组
/usr/sbin/groupadd nginx 
# 用户
usr/sbin/useradd -g nginx nginx

# 配置nginx.conf
# 将/usr/local/webserver/nginx/conf/nginx.conf替换为以下内容

user nginx nginx;
# 设置值和CPU核心数一致
worker_processes 2; 
# 日志位置和日志级别
error_log /usr/local/webserver/nginx/logs/nginx_error.log crit; 
pid /usr/local/webserver/nginx/nginx.pid;

#Specifies the value for maximum file descriptors that can be opened by this process.
worker_rlimit_nofile 65535;
events
{
  use epoll;
  worker_connections 65535;
}
http
{
  include mime.types;
  default_type application/octet-stream;
  log_format main  '$remote_addr - $remote_user [$time_local] "$request" '
               '$status $body_bytes_sent "$http_referer" '
               '"$http_user_agent" $http_x_forwarded_for';

#charset gb2312;
     
     server_names_hash_bucket_size 128;
     client_header_buffer_size 32k;
     large_client_header_buffers 4 32k;
     client_max_body_size 8m;

      sendfile on;
      tcp_nopush on;
      keepalive_timeout 60;
      tcp_nodelay on;
      fastcgi_connect_timeout 300;
      fastcgi_send_timeout 300;
      fastcgi_read_timeout 300;
      fastcgi_buffer_size 64k;
      fastcgi_buffers 4 64k;
      fastcgi_busy_buffers_size 128k;
      fastcgi_temp_file_write_size 128k;
      gzip on; 
      gzip_min_length 1k;
      gzip_buffers 4 16k;
      gzip_http_version 1.0;
      gzip_comp_level 2;
      gzip_types text/plain application/x-javascript text/css application/xml;
      gzip_vary on;

#limit_zone crawler $binary_remote_addr 10m;
#下面是server虚拟主机的配置
 server
  {
	  #监听端口
    listen 80;
    #域名
    server_name localhost;
    index index.html index.htm index.php;
    #站点目录
    root /usr/local/webserver/nginx/html;
      location ~ .*\.(php|php5)?$
    {
    #fastcgi_pass unix:/tmp/php-cgi.sock;
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_index index.php;
      include fastcgi.conf;
    }
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ico)$
    {
      expires 30d;

  	# access_log off;
    }
    location ~ .*\.(js|css)?$
    {
      expires 15d;
      
   	# access_log off;
    }
    access_log off;
  }
}
```

## 常用命令

```shell
# 查看nginx版本
/path/nginx/sbin/nginx -v
# 启动命令
/path/nginx/sbin/nginx
# 检查配置文件ngnix.conf的正确性
/path/nginx/sbin/nginx -t
# 重新载入配置文件
/path/nginx/sbin/nginx -s reload
# 重启 Nginx
/path/nginx/sbin/nginx -s reopen
# 停止 Nginx
/path/nginx/sbin/nginx -s stop          
```

Demo


      location /k8s {
          access_log  /var/log/nginx/k8saccess.log;
          rewrite /jaeger https://116.196.77.250:30000 break;
          proxy_pass https://116.196.77.250:30000/;
          proxy_set_header   Host    $host;
          proxy_set_header   X-Real-IP   $remote_addr;
          proxy_set_header   X-Forwarded-For 				   $proxy_add_x_forwarded_for;
        }

# 介绍

```shell
# Nginx("engine x")是一款是由俄罗斯的程序设计师Igor Sysoev所开发高性能的 Web和 反向代理 服务器，也是一个 IMAP/POP3/SMTP 代理服务器。
# 在高连接并发的情况下，Nginx是Apache服务器不错的替代品。
```



# Nginx

# 应用场景

## 静态资源服务

通过本地文件系统提供服务

## 反向代理

缓存加速

负载均衡

## api服务

OpenResty



# 历史背景

### apache

一个服务只能服务一个链接

# 优势

高并发，高性能

可扩展性好-各种模块

高可靠性

热部署

BSD许可证-？

# 组成

## 二进制可执行文件

## nginx.conf

## access.log

## error.log

# 功能

feature

bufix

change

版本数

nginx plus 商业公司



2011

支持websocket TFO协议



2013

支持 thread pool

提供stream四层反向代理

支持reuseport特性

支持httpv2协议



2016

支持动态模块



2018

支持TLS1.3

# 版本

发行版本

阿里版本-Tengine

OpenRestry 



# 安装方式

选择模块

下载-configure-中间文件-编译

## auto

### cc

编译

### lib

### os

### type

## CHANGES

版本变化介绍

## CHANGES.ru

俄罗斯版本说明

## conf

## configure

## contrib

## html

## man

## src

源代码

## objs

编译之后的文件等

### ngx_modules.c

模块

# 语法

## nginx.conf

$

# 

正则表达式

时间表示

空间



example

## http

# 命令行

```xshell
nginx -s reload

-h help

-c 指定配置文件

-g 指定配置指令

-p 指定运行目录

-s 发送信号

-t -T 测试配置文件是否有语法错误

-v 版本信息

-V 编译信息


ngnix版本 升级
日志切割
```

# nginx-静态资源

参考文档

http://nginx.org/en/docs/

```shell
# 资源压缩
gzip  on; #压缩
gzip_min_length 1; #>1字节的进行压缩
gzip_comp_level 2; #压缩级别
gzip_types xxx； # 哪些类型的资源需要压缩



location /{
  autoindex on; #  列表展示
  set $limit_rate 1k; # 限制访问速度
}

# 日志
log_format main  xxx;


# 
server
  {
	  #监听端口
    listen 80;
    #域名
    server_name localhost;
    index index.html index.htm index.php;
    #站点目录
    root /usr/local/webserver/nginx/html;
      location ~ .*\.(php|php5)?$
    {
    #fastcgi_pass unix:/tmp/php-cgi.sock;
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_index index.php;
      include fastcgi.conf;
    }
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ico)$
    {
      expires 30d;

  	# access_log off;
    }
    location ~ .*\.(js|css)?$
    {
      expires 15d;
      
   	# access_log off;
    }
    access_log off;
  }
}
```

# nginx-反向代理

```shell
# 被代理服务器配置
server
{
  	listen ip:port
  
}


# 代理服务器配置
upstream local {
 server ip:port
}


# http://nginx.org/en/docs/http/ngx_http_proxy_module.html
# 缓存配置
server {

	localtion / {
	 .
	 .
	 proxy_pass http://local;
	}
}
```

# access日志监控

```shell
# https://goaccess.io/get-started 
GoAccess搭建

```

# TLS/SSL协议

![对称加密](/Users/draven/Documents/documents/java/document/draven-spring-doc/002 DevOps/000 Linux/nginx/对称加密.jpg)

![非对称加密](/Users/draven/Documents/documents/java/document/draven-spring-doc/002 DevOps/000 Linux/nginx/非对称加密.jpg)

![证书类型](/Users/draven/Documents/documents/java/document/draven-spring-doc/002 DevOps/000 Linux/nginx/证书类型.jpg)

![证书链](/Users/draven/Documents/documents/java/document/draven-spring-doc/002 DevOps/000 Linux/nginx/证书链.jpg)

![CA](/Users/draven/Documents/documents/java/document/draven-spring-doc/002 DevOps/000 Linux/nginx/CA.jpg)

![TLS](/Users/draven/Documents/documents/java/document/draven-spring-doc/002 DevOps/000 Linux/nginx/TLS.png)

![TLS:SSL](/Users/draven/Documents/documents/java/document/draven-spring-doc/002 DevOps/000 Linux/nginx/TLS:SSL.png)



# 简单的https

```shell
yum install python2-certbot-nginx
certbot --nginx --nginx-server-root=/path/nginx.conf -d 域名
```

# OpenResty

```shell
nginx.conf
# 引入lua
```

# 处理流程

# 进程结构

```shell
ps -ef| grep nginx
# 这就是为什么获取多个进程


```

# 信号管理父子进程

## master

### 监控worker 

CHLD信号

### 管理worker进程

TERM,INT.  QUIT. HUP USER1

USER2 WINCH



## worker

TERM,INT.  QUIT. HUP USER1

## nginx

### reload

HUP

### reopen

USER1

### stop

TERM

### quit

QUIT

# reload真相

最长等待时间

# 热升级流程

# 优雅关闭

设置定时器worker_xxx

针对worker进程对http进程的管理

# 网络收发与nginx事件

抓包工具

# 事件循环

# epoll

# 请求切换

 



# 模块是什么

何时被使用

提供哪些变量

src/http/modules/xxx



# 模块分类

# 如何使用连接池

# 内存池对性能的影响

## 连接内存池

## 请求内存池（较大）

# 进程-共享内存

# slab内存管理

下载tengine

# nginx 容器

哈希表 静态不变时常使用

红黑树 效率高

# 动态模块提升效率

## 静态库

全部编译

## 动态库



# Http模块

# listen

 正则表达式

