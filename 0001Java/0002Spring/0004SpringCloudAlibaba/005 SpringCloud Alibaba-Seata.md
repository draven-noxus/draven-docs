# Spring Cloud Alibaba-Seata

## 版本说明

```shell
# 剔除了ribbon 使用组件BanlanceLoader
# 版本适配 2020.0.2
```



## 版本依赖

```xml
  <!--注 当前版本整合seata 1.3版本 需要修改为 1.4-->
		<dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-seata</artifactId>
        <version>2.2.3.RELEASE</version>
        <exclusions>
          <exclusion>
            <groupId>io.seata</groupId>
            <artifactId>seata-spring-boot-starter</artifactId>
          </exclusion>
        </exclusions>
      </dependency>
      <dependency>
        <groupId>io.seata</groupId>
        <artifactId>seata-spring-boot-starter</artifactId>
        <version>1.4.0</version>
	  </dependency>
```



```yaml
seata:
  enabled: true
  application-id: applicationName
  tx-service-group: my_test_tx_group
  enable-auto-data-source-proxy: true
  use-jdk-proxy: false
  excludes-for-auto-proxying: firstClassNameForExclude,secondClassNameForExclude
  
  client:
    rm:
      async-commit-buffer-limit: 1000
      report-retry-count: 5
      table-meta-check-enable: false
      report-success-enable: false
      saga-branch-register-enable: false
      lock:
        retry-interval: 10
        retry-times: 30
        retry-policy-branch-rollback-on-conflict: true
    tm:
      commit-retry-count: 5
      rollback-retry-count: 5
    undo:
      data-validation: true
      log-serialization: jackson
      log-table: undo_log
    log:
      exceptionRate: 100
  service:
    vgroup-mapping:
      my_test_tx_group: default
    grouplist:
      default: 127.0.0.1:8091
    enable-degrade: false
    disable-global-transaction: false
  transport:
    shutdown:
      wait: 3
    thread-factory:
      boss-thread-prefix: NettyBoss
      worker-thread-prefix: NettyServerNIOWorker
      server-executor-thread-prefix: NettyServerBizHandler
      share-boss-worker: false
      client-selector-thread-prefix: NettyClientSelector
      client-selector-thread-size: 1
      client-worker-thread-prefix: NettyClientWorkerThread
      worker-thread-size: default
      boss-thread-size: 1
    type: TCP
    server: NIO
    heartbeat: true
    serialization: seata
    compressor: none
    enable-client-batch-send-request: true
  
  config:
    type: nacos
    nacos:
      namespace:
      serverAddr: 127.0.0.1:8848
      group: SEATA_GROUP
      userName: "nacos"
      password: "nacos"
    #type: file
    #    consul:
    #        server-addr: 127.0.0.1:8500
    #    apollo:
    #        apollo-meta: http://192.168.1.204:8801
    #        app-id: seata-server
    #        namespace: application
    #    etcd3:
    #       server-addr: http://localhost:2379
    #    nacos:
    #        namespace:
    #        serverAddr: localhost
    #        group: SEATA_GROUP
    #    zk:
    #        server-addr: 127.0.0.1:2181
    #        session-timeout: 6000
    #        connect-timeout: 2000
    #        username: ""
    #        password: ""
  registry:
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      namespace:
      userName: "nacos"
      password: "nacos"
  #registry:
    #type: file
    #  file:
    #    name: file.conf
    #  consul:
    #    cluster: default
    #    server-addr: 127.0.0.1:8500
    #  etcd3:
    #    cluster: default
    #    serverAddr: http://localhost:2379
    #  eureka:
    #    application: default
    #    weight: 1
    #    service-url: http://localhost:8761/eureka
    #  redis:
    #    server-addr: localhost:6379
    #    db: 0
    #    password:
    #    cluster: default
    #    timeout: 0
    #  sofa:
    #    server-addr: 127.0.0.1:9603
    #    application: default
    #    region: DEFAULT_ZONE
    #    datacenter: DefaultDataCenter
    #    cluster: default
    #    group: SEATA_GROUP
    #    addressWaitTime: 3000
    #  zk:
    #    cluster: default
    #    server-addr: 127.0.0.1:2181
    #    session-timeout: 6000
    #    connect-timeout: 2000
    #    username: ""
    #    password: ""
```

# 工作模式

## AT

## TCC

## Saga

# 环境搭建

```shell
# 参考链接
# 主页
https://github.com/seata/seata
https://github.com/seata/seata/tree/1.4.0
https://github.com/seata/seata/tree/1.4.0/script
https://github.com/seata/seata/tree/1.4.0/script/config-center
http://seata.io/zh-cn/docs/overview/what-is-seata.html
http://seata.io/zh-cn/docs/dev/mode/at-mode.html
http://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html
```



```shell
# 说明
# 见 registry.conf
# https://github.com/seata/seata/tree/1.4.0/script/config-center
# store.mode
# 支持 file、nacos 、apollo、zk、consul、etcd3、custom
# 本次安装以 nacos 作为 注册中心与配置中心
# seata-nacos
```

## 注册中心

### Nacos

application.properties

```shell
# 启动nacos服务 并 选择合适的数据持久化（mysql）
# 新建namespace : seata-group
# 开启auth验证
# 端口地址正确一致
```



### Seata

registry.conf

```shell
# 本次只摘录修改部分
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  # 修改为nacos
  type = "nacos"
  loadBalance = "RandomLoadBalance"
  loadBalanceVirtualNodes = 10

  nacos {
  	# 服务端应用名称 注册到nacos服务名 用于服务发现
    application = "seata-server"
    # 指定nacos的连接地址
    serverAddr = "127.0.0.1:8848"
    # 指定注册到nacos分组 默认值
    group = "SEATA_GROUP"
    # 指定注册到那个namespace中 修改为 seata-group
    namespace = "seata-group"
    cluster = "default"
    # since nacos1.2 支持验证，若nacos开启验证，此处必须指定 修改为nacos nacos
    username = "nacos"
    password = "nacos"
  }
}
```



## 配置中心

### Nacos

```shell
# 环境准备
# 可执行脚本
# 配置文件
# 数据库脚本


# 参数配置 
# 参考资料 https://github.com/seata/seata/tree/1.4.0/script/config-center  
# 配置信息 config.txt

# 本次只摘录修改部分
# 指定数据库存储
store.mode=db

store.db.dbType=mysql
# mysql-connector-java-8.0.15.jar
# 默认不支持需要将此驱动复制 seata/lib/目录下 并修改 驱动
store.db.driverClassName=com.mysql.cj.jdbc.Driver

# 支持 mysql-connector-java-8.0.15.jar连接
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?characterEncoding=utf8&zeroDateTimeBehavior=CONVERT_TO_NULL&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8&allowMultiQueries=true&allowPublicKeyRetrieval=true

# 数据库账户/密码 请自行修改
store.db.user=username
store.db.password=password



# 执行脚本
# 参考资料 https://github.com/seata/seata/tree/1.4.0/script/config-center/nacos #
# 脚本 nacos-config.sh
# 脚本位置 nacos/bin (本次位置)

# 示例
# sh ${SEATAPATH}/script/config-center/nacos/nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 5a3c7d6c-f497-4d68-a71a-2e5e3340b3ca -u username -w password

# 执行脚本（注意参数信息 比如ip port group 默认值-localhost 8848 SEATA_GROUP）
cd nacos
./nacos-config.sh -h 127.0.0.1 -p 8849 -g SEATA_GROUP -t seata-groups -u nacos -w nacos


# 执行脚本找不到文件 请修改文件位置config.txt 或者 脚本nacos-config.sh指定config.txt的位置
for line in $(cat $(dirname "$PWD")/config.txt | sed s/[[:space:]]//g); do
  (( count++ ))
	key=${line%%=*}
    value=${line#*=}
	addConfig "${key}" "${value}"
done

# 数据库准备
CREATE SCHEMA `seata` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
# https://github.com/seata/seata/tree/1.4.0/script/server/db
# mysql
# 执行SQL语句

```



### Seata

registry.conf

```shell
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"
  
  nacos {
    # 指定nacos的连接地址
    serverAddr = "127.0.0.1:8848"
    # 指定注册到那个namespace中 修改为 seata-group
    namespace = "seata-group"
    # 指定注册到nacos分组 默认值
    group = "SEATA_GROUP"
    # since nacos1.2 支持验证，若nacos开启验证，此处必须指定 修改为nacos nacos
    username = "nacos"
    password = "nacos"
  }
}
```



### 启动seata

```shell
# 启动查看日志
```

## Docker

```shell
# 
docker pull seataio/seata-server:1.4.0

# 配置数据库信息
https://github.com/seata/seata/blob/1.4.0/script/server/db/mysql.sql

# 客户端
https://github.com/seata/seata/blob/1.4.0/script/client/at/db/mysql.sql


# 启动镜像
# docker run --name seata-server -e SEATA_IP=192.168.1.180 -p 8091:8091 -d  镜像ID
docker run --name seata-server \
-d \
-p 8091:8091 \
-e SEATA_IP=10.211.55.5 \
-e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
-v /docker/seata/seata-config/:/root/seata-config \
seataio/seata-server:1.4.0
# docker run \
	#	// 容器名
	#	--name seata-server \
	# 暴露服务器端口
	#	-e SEATA_IP=192.168.1.180 \
	# 指定使用配置文件的位置
	# -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
	# 配置文件挂载
	# -v /docker/seata/seata-config/:/root/seata-config
	#	// 宿主机与容器端口映射
	#	-p 8091:8091 \ 
	# 启动方式
	#	-d \ 
	# 镜像ID
	
docker run --name seata-server \
        -p 8091:8091 \
        -e SEATA_CONFIG_NAME=file:/root/seata-config/registry \
        -v /PATH/TO/CONFIG_FILE:/root/seata-config  \
        seataio/seata-server
        
# 修改配置文件        
 docker exec -it 容器ID sh
	
	cd /resources/
	
	vi file.conf
	store {
  		mode = "db"
  		db {
            datasource = "druid"
            dbType = "mysql"
            driverClassName = "com.mysql.jdbc.Driver"
            url = "jdbc:mysql://192.168.1.180:3306/seata"
            user = "root"
            password = "123456"
            minConn = 5
            maxConn = 30
            globalTable = "global_table"
            branchTable = "branch_table"
            lockTable = "lock_table"
            queryLimit = 100
            maxWait = 5000
         }
	}
	-------------------------------------------------------
	vi registry.conf
	
    registry {
      type = "nacos"
      nacos {
        application = "seata-server"
        serverAddr = "192.168.1.180:8848"
        namespace = ""
        cluster = "default"
        username = "nacos"
        password = "nacos"
      }
    }

    config {
      type = "nacos"
      nacos {
        serverAddr = "192.168.1.180:8848"
        namespace = ""
        group = "SEATA_GROUP"
        username = "nacos"
        password = "nacos"
      }
    }
```



# 附录

## 参数脚本

### registry.conf

```shell
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "file"
  loadBalance = "RandomLoadBalance"
  loadBalanceVirtualNodes = 10

  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "SEATA_GROUP"
    namespace = ""
    cluster = "default"
    username = ""
    password = ""
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = 0
    password = ""
    cluster = "default"
    timeout = 0
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
  }
  consul {
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
  }
  etcd3 {
    cluster = "default"
    serverAddr = "http://localhost:2379"
  }
  sofa {
    serverAddr = "127.0.0.1:9603"
    application = "default"
    region = "DEFAULT_ZONE"
    datacenter = "DefaultDataCenter"
    cluster = "default"
    group = "SEATA_GROUP"
    addressWaitTime = "3000"
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "file"

  nacos {
    serverAddr = "127.0.0.1:8848"
    namespace = ""
    group = "SEATA_GROUP"
    username = ""
    password = ""
  }
  consul {
    serverAddr = "127.0.0.1:8500"
  }
  apollo {
    appId = "seata-server"
    apolloMeta = "http://192.168.1.204:8801"
    namespace = "application"
    apolloAccesskeySecret = ""
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
  }
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
  file {
    name = "file.conf"
  }
}

```

### config.txt

```shell
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.enableClientBatchSendRequest=false
transport.threadFactory.bossThreadPrefix=NettyBoss
transport.threadFactory.workerThreadPrefix=NettyServerNIOWorker
transport.threadFactory.serverExecutorThreadPrefix=NettyServerBizHandler
transport.threadFactory.shareBossWorker=false
transport.threadFactory.clientSelectorThreadPrefix=NettyClientSelector
transport.threadFactory.clientSelectorThreadSize=1
transport.threadFactory.clientWorkerThreadPrefix=NettyClientWorkerThread
transport.threadFactory.bossThreadSize=1
transport.threadFactory.workerThreadSize=default
transport.shutdown.wait=3
service.vgroupMapping.my_test_tx_group=default
service.default.grouplist=127.0.0.1:8091
service.enableDegrade=false
service.disableGlobalTransaction=false
client.rm.asyncCommitBufferLimit=10000
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
client.rm.lock.retryPolicyBranchRollbackOnConflict=true
client.rm.reportRetryCount=5
client.rm.tableMetaCheckEnable=false
client.rm.sqlParserType=druid
client.rm.reportSuccessEnable=false
client.rm.sagaBranchRegisterEnable=false
client.tm.commitRetryCount=5
client.tm.rollbackRetryCount=5
client.tm.defaultGlobalTransactionTimeout=60000
client.tm.degradeCheck=false
client.tm.degradeCheckAllowTimes=10
client.tm.degradeCheckPeriod=2000
store.mode=db
store.file.dir=file_store/data
store.file.maxBranchSessionSize=16384
store.file.maxGlobalSessionSize=512
store.file.fileWriteBufferCacheSize=16384
store.file.flushDiskMode=async
store.file.sessionReloadReadSize=100
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?characterEncoding=utf8&zeroDateTimeBehavior=CONVERT_TO_NULL&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8&allowMultiQueries=true&allowPublicKeyRetrieval=true
store.db.user=username
store.db.password=password
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000
store.redis.host=127.0.0.1
store.redis.port=6379
store.redis.maxConn=10
store.redis.minConn=1
store.redis.database=0
store.redis.password=null
store.redis.queryLimit=100
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackRetryTimeoutUnlockEnable=false
client.undo.dataValidation=true
client.undo.logSerialization=jackson
client.undo.onlyCareUpdateColumns=true
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000
client.undo.logTable=undo_log
client.log.exceptionRate=100
transport.serialization=seata
transport.compressor=none
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
```

### nacos-config.sh

```shell
#!/usr/bin/env bash
# Copyright 1999-2019 Seata.io Group.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at、
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

while getopts ":h:p:g:t:u:w:" opt
do
  case $opt in
  h)
    host=$OPTARG
    ;;
  p)
    port=$OPTARG
    ;;
  g)
    group=$OPTARG
    ;;
  t)
    tenant=$OPTARG
    ;;
  u)
    username=$OPTARG
    ;;
  w)
    password=$OPTARG
    ;;
  ?)
    echo " USAGE OPTION: $0 [-h host] [-p port] [-g group] [-t tenant] [-u username] [-w password] "
    exit 1
    ;;
  esac
done

if [[ -z ${host} ]]; then
    host=localhost
fi
if [[ -z ${port} ]]; then
    port=8848
fi
if [[ -z ${group} ]]; then
    group="SEATA_GROUP"
fi
if [[ -z ${tenant} ]]; then
    tenant=""
fi
if [[ -z ${username} ]]; then
    username=""
fi
if [[ -z ${password} ]]; then
    password=""
fi

nacosAddr=$host:$port
contentType="content-type:application/json;charset=UTF-8"

echo "set nacosAddr=$nacosAddr"
echo "set group=$group"

failCount=0
tempLog=$(mktemp -u)
function addConfig() {
  curl -X POST -H "${contentType}" "http://$nacosAddr/nacos/v1/cs/configs?dataId=$1&group=$group&content=$2&tenant=$tenant&username=$username&password=$password" >"${tempLog}" 2>/dev/null
  if [[ -z $(cat "${tempLog}") ]]; then
    echo " Please check the cluster status. "
    exit 1
  fi
  if [[ $(cat "${tempLog}") =~ "true" ]]; then
    echo "Set $1=$2 successfully "
  else
    echo "Set $1=$2 failure "
    (( failCount++ ))
  fi
}

count=0
for line in $(cat $(dirname "$PWD")/config.txt | sed s/[[:space:]]//g); do
  (( count++ ))
	key=${line%%=*}
    value=${line#*=}
	addConfig "${key}" "${value}"
done

echo "========================================================================="
echo " Complete initialization parameters,  total-count:$count ,  failure-count:$failCount "
echo "========================================================================="

if [[ ${failCount} -eq 0 ]]; then
	echo " Init nacos config finished, please start seata-server. "
else
	echo " init nacos config fail. "
fi
```



# FQA

## Mysql连接配置问题

```shell
CONVERT_TO_NULL


JDBC driver for MySQL连接提示"The connection property 'zeroDateTimeBehavior' acceptable values are: 'CONVERT_TO_NULL', 'EXCEPTION' or 'ROUND'. The value 'convertToNull' is not acceptable."解决方案
1、使用了8.0以上版本的JDBC driver for MySQL，降回5.x版本。

2、不对JDBC driver for MySQL降级。修改数据库连接字符串，添加serverTimezone属性。例如：

zeroDateTimeBehavior=convertToNull&serverTimezone=UTC
```

## 版本问题

```shell
nested exception is io.seata.common.exception.FrameworkException: No available service
no available service 'default' found, please make sure registry config correct
lsof -i:9999
```

## 其他

（偷来的东西）

**1.xid未传递** 

一般常见于springcloud的用户,请注意是否只引入了seata-all或者seata-spring-boot-starter.如果是,请换为本文介绍给springcloud的依赖即可.

如果是自己实现了WebMvcConfigurer,那么请参考com.alibaba.cloud.seata.web.SeataHandlerInterceptorConfiguration#addInterceptors把xid传递拦截器加入到你的拦截链路中

**2.数据源未代理**

一般分为2种情况

数据源自己创建后,代理数据源的beanname为DataSourceProxy而不是dataSource,导致sqlsessionfactory注入的并不是被代理后的.

如果是已经开启了自动代理的用户,请确认是否手写了sqlsessionfactory此时注入的DataSource并未显示是DataSourceproxy代理的情况,请进行调整,保证注入是代理的数据源.

**3.事务分组配置出错导致无法找到tc**

一般由于对事务分组的理解出现偏差导致的,请仔细阅读官网的参数配置中的介绍.

TM端: seata.tx-service-group=自定分组名 seata.service.vgroup-mapping(配置中心中是叫:service.vgroupMapping).自定分组名=服务端注册中心配置的cluster/application的值

拿nacos举例子

比如我server中nacos的cluster

```
  nacos {
    application = "seata-server"
    serverAddr = "localhost"
    namespace = ""
    cluster = "testCluster"
    username = "nacos"
    password = "nacos"
  }
```

我的事务分组为

```
seata:
  tx-service-group: test
```

那么nacos中需要配置test事务分组

```
service.vgroupMapping.test=testCluster
```

**4.Global lock acquire failed**

一般这种情况也是分为两种

常见的就是并没有对select语句进行forupdate,如果你不开启forupdate,seata默认是遇到并发性竞争锁并不会去尝试重试,导致拿不到lock当前事务进行回滚.不影响一致性,如果你想没forupdate也开启竞争锁client.rm.lock.retryPolicyBranchRollbackOnConflict设置为false(有死锁风险)

还有一种就是由于大并发下对同一个数据并发操作时,前一个事务还未提交,后续的事务一直在等待,而seata默认的超时周期为300ms,此时超时后就会抛出Global lock acquire failed,当前事务进行回滚,如果你想保住竞争锁的周期足够长,请更改client.rm.lock.retryTimes和client.rm.lock.retryInterval来保证周期的合理性.

**5.Could not found global transaction xid**

一般出现这个提示与服务重试及超时有关,比如A->B此时A调B超时,A默认是重试的,B等于被调了2遍,第二次被调用的B进行了响应,A发起者接收到结果后进行了提交/回滚,这次超时的B因为网络问题现在才被调用,他也收到了一样的全局事务id,进行业务处理,直到注册分支,此时全局事务已经被提交/回滚,导致当前超时的分支事务B无法注册上.

这种问题一般保证你的业务不会去超时重试,如果你需要,请确认全局事务状态,做好幂等,反正已经做过的处理重复操作



