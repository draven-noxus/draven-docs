# RabbitMQ

## docker安装

```shell
docker run -di --name=tensquare_rabbitmq -p 5671:5617 -p 5672:5672 -p 4369:4369 -p 15671:15671 -p 15672:15672 -p 25672:25672 rabbitmq:management
```



```shell
# 1 上传并解压
#上传rabbitmq-server-generic-unix-3.7.17.tar.xz到/usr/loca/tmp中
$ tar xf rabbitmq-server-generic-unix-3.7.17.tar.xz

# 2 复制到local下
# 复制解压文件到/usr/local下，命名为rabbitmq
$ cp -r rabbitmq_server-3.7.17 /usr/local/rabbitmq

# 3 配置环境变量
$ vim /etc/profile

# 在文件中添加
$ export PATH=$PATH:/usr/local/rabbitmq/sbin  

# 解析文件
$ source /etc/profile

# 4 开启web管理插件
# 进入rabbitmq/sbin目录
$ cd /usr/local/rabbitmq/sbin

# 查看插件列表
$ ./rabbitmq-plugins list

# 生效管理插件
$ ./rabbitmq-plugins enable rabbitmq_management

# 5 后台运行
# 启动rabbitmq。
$./rabbitmq-server -detached

# 停止命令
$ ./rabbitmqctl stop_app

# 6    查看web管理界面
# 默认可以在安装rabbitmq的电脑上通过用户名：guest密码guest进行访问web管理界面

# 端口号：15672（放行端口，或关闭防火墙）

# 在虚拟机浏览器中输入：
http://localhost:15672
```

 

 

 

 

 