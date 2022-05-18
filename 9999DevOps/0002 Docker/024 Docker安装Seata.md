# Seata
https://seata.io/zh-cn/docs/overview/what-is-seata.html
```shell


[root@www seata]# docker cp  seata-server:/seata-server/resources/registry.conf /docker/seata/


docker exec -it seata-server sh

tail -f /root/logs/seata/seata-server.log


docker run -idt --name seata-server  \
-p 8091:8091 \
-e SEATA_IP=172.16.244.128  \
-v /docker/seata/registry.conf:/seata-server/resources/registry.conf \
seataio/seata-server



docker run -idt --name seata-server  \
-p 8091:8091 \
-e SEATA_IP=172.16.244.128  \
-v /docker/seata/registry.conf:/seata-server/resources/registry.conf \
seataio/seata-server:1.0.0

```





# FAQ

```shell
0101 can not connect to 127.0.0.1:8091 cause:can not register RM,err:can not connect to services-server.
```

