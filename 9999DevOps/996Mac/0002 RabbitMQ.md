# RabbitMQ

## 

```shell
# 获取openssl
git clone git://git.openssl.org/openssl.git
git clone https://github.com/openssl/openssl

# 列出所有的分支
git branch -a

# 选择合适的版本
git checkout -b   remotes/origin/OpenSSL_1_1_1-stable

# 切换至
sudo ./config --prefix=/usr/local/openssl

# 如果权限不够 sudo
make

make install

openssl version
```

```shell
# 获取erlang 自己下载 注意和RabbitMQ版本对应关系
# 一般rabbitmq官网都有说明
# 进入解压目录
# 一定要注意安装过程中是否会有error
./configure   

make

sudo make install

erl

# 卸载命令
sudo rm -rf /usr/local/lib/erlang/

```

```shell
# 开启管理控制台
rabbitmq-plugins enable rabbitmq_management
```


# FAQ

```shell
# Error1 
# 这个错误是由于 新版mac 不支持openssl
# 由于openssl的漏洞导致的
Crash dump is being written to: erl_crash.dump...done
 
 
 
# 可能需要配置 
export KERL_CONFIGURE_OPTIONS="--disable-hipe --with-ssl=$(brew --prefix openssl)"
export CFLAGS="-O2 -g -fno-stack-check -Wno-error=implicit-function-declaration"

```

