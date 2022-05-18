```shell
FROM centos:7

RUN yum install -y wget && yum install -y gcc-c++ openssl-devel openssl && yum install -y net-tools 
RUN wget http://www.keepalived.org/software/keepalived-2.0.8.tar.gz && tar zxvf keepalived-2.0.8.tar.gz && cd keepalived-2.0.8 && ./configure && make && make install 

CMD ["keepalived", "-n","--all", "-d", "-D", "-f", "/etc/keepalived/keepalived.conf", "--log-console"]









#mkdir -p /data/docker/keepalived
#cd /data/docker/keepalived
#vim Dockerfile  (写入Dockerfile 内容)
#docker build -t harbor.test.cn/aisearch_x86/keepalived:2.0.8 -f Dockerfile .



mkdir /data/keepalived/



/data/keepalived/keepalived.conf
! Configuration File for keepalived
   
global_defs {
  router_id LVS_Master
}
   
vrrp_instance VI_1 {
    state MASTER              #指定instance初始状态，实际根据优先级决定.backup节点不一样
    interface eth0            #虚拟IP所在网
    virtual_router_id 51      #VRID，相同VRID为一个组，决定多播MAC地址
    priority 100              #优先级，另一台改为90.backup节点不一样
    advert_int 1              #检查间隔
    authentication {
        auth_type PASS        #认证方式，可以是pass或ha
        auth_pass 1111        #认证密码
    }
    virtual_ipaddress {
        172.26.11.188/16        #VIP地址
    }
}
————————————————
版权声明：本文为CSDN博主「fxyfdf」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/fxyfdf/article/details/116739317





/data/keepalived/keepalived.conf
! Configuration File for keepalived
   
global_defs {
  router_id LVS_Backup
}
   
vrrp_instance VI_1 {
    state BACKUP         
    interface eth0       
    virtual_router_id 51
    priority 90         
    advert_int 1         
    authentication {
        auth_type PASS   
        auth_pass 1111   
    }
    virtual_ipaddress {
       172.26.11.188/16
    }
}
————————————————
版权声明：本文为CSDN博主「fxyfdf」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/fxyfdf/article/details/116739317



master
#docker run -it --name keepalived_master --net=host --cap-add NET_ADMIN -v /data/keepalived/keepalived.conf:/etc/keepalived/keepalived.conf /etc/keepalived/ -d fxyfdf/keepalived:2.0.8
backup
#docker run -it --name keepalived_backup --net=host --cap-add NET_ADMIN -v /data/keepalived/keepalived.conf:/etc/keepalived/keepalived.conf -d fxyfdf/keepalived:2.0.8
验证
master 节点（注意ifocnfig 无法查看）
————————————————
版权声明：本文为CSDN博主「fxyfdf」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/fxyfdf/article/details/116739317


sudo docker run -d -p 8082:80 --name nginx-test-web -v ~/nginx/www:/usr/share/nginx/html -v ~/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v ~/nginx/logs:/var/log/nginx nginx


docker run --name nginx-test -p 8081:80 -d nginx:1.20.0

/docker/nginx/


 docker run -d -p 10001:80 --name nginx-master \
 -v /docker/nginx/master/html:/usr/share/nginx/html \
 -v /docker/nginx/master/conf/nginx.conf:/etc/nginx/nginx.conf \
 -v /docker/nginx/master/logs:/var/log/nginx \
 nginx:1.20.0


docker run -d -p 10002:80 --name nginx-backup \
 -v /docker/nginx/backup/html:/usr/share/nginx/html \
 -v /docker/nginx/backup/conf/nginx.conf:/etc/nginx/nginx.conf \
 -v /docker/nginx/backup/logs:/var/log/nginx \
 nginx:1.20.0



docker cp nginx-test:/usr/share/nginx/html/ /docker/nginx/

docker cp nginx-test:/etc/nginx/nginx.conf /docker/nginx/

docker cp nginx-test:/var/log/nginx/ /docker/nginx/










docker run -it --name keepalived_master --net=host --cap-add NET_ADMIN -v /docker/keepalived/data/master/keepalived.conf:/etc/keepalived/keepalived.conf -v /docker/keepalived/data/master/nginx_check.sh:/etc/keepalived/nginx_check.sh -d keepalived:2.2.2



docker run -it --name keepalived_backup --net=host --cap-add NET_ADMIN -v /docker/keepalived/data/backup/keepalived.conf:/etc/keepalived/keepalived.conf -v /docker/keepalived/data/backup/nginx_check.sh:/etc/keepalived/nginx_check.sh -d keepalived:2.2.2
```


