# Sentry


```shell
# 要求
docker-compose
# 拉取代码
git clone https://github.com/getsentry/onpremise.git


#  配置
# 1.进入clone的项目目录
cd onpremise 

# 2.创建对应的目录
mkdir -p data/{sentry,postgres}  

# 3.获取项目的 key
docker-compose run --rm web config generate-secret-key  获取项目的 key

# 4.复制获取到的 key 字符串 到 docker-compose.yml 文件中

# 5.创建项目的超级管理员（superUser） 这个步骤需要你填入账号和密码

# 6.开启Sentry服务
docker-compose up -d  







docker volume create --name=sentry-data && docker volume create --name=sentry-postgres && docker volume create --name=sentry-redis



rk(&qtbb%z14%9*@7^ujlw!7r%yg695s%g5obs=)42j00^921@


 ./install.sh 
 
 docker-compose build


docker-compose run --rm web upgrade



docker-compose up -d




docker-compose run --rm web createuser --email 18335927508@qq.com --password w1994z0115x --superuser
```



```shell
# 登陆
docker-compose run --rm web shell

from sentry.models import Project
from sentry.receivers.core import create_default_projects
create_default_projects([Project])
```

参考资料：[http://laiyuquan.com/2018/04/sentry%E6%9C%8D%E5%8A%A1-%E6%97%A5%E5%BF%97%E8%BF%BD%E8%B8%AA%E7%9A%84%E7%A5%9E%E5%99%A82%EF%BC%9A%E4%BD%BF%E7%94%A8docker%E5%AE%89%E8%A3%85sentry/](http://laiyuquan.com/2018/04/sentry服务-日志追踪的神器2：使用docker安装sentry/)