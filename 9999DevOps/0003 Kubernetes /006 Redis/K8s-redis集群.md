# k8s-redis集群

```shell

dbfilename dump.rdb

/k8s/redis/pv1  10.8.192.3/24(sync,wdelay,hide,no_subtree_check,sec=sys,rw,secure,no_root_squash,no_all_squash)
/k8s/redis/pv2  10.8.192.3/24(sync,wdelay,hide,no_subtree_check,sec=sys,rw,secure,no_root_squash,no_all_squash)
/k8s/redis/pv3  10.8.192.3/24(sync,wdelay,hide,no_subtree_check,sec=sys,rw,secure,no_root_squash,no_all_squash)
/k8s/redis/pv4  10.8.192.3/24(sync,wdelay,hide,no_subtree_check,sec=sys,rw,secure,no_root_squash,no_all_squash)
/k8s/redis/pv5  10.8.192.3/24(sync,wdelay,hide,no_subtree_check,sec=sys,rw,secure,no_root_squash,no_all_squash)
/k8s/redis/pv6  10.8.192.3/24(sync,wdelay,hide,no_subtree_check,sec=sys,rw,secure,no_root_squash,no_all_squash)





--cat pv.yaml 

apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv1
spec:
  capacity:
    storage: 200M
  accessModes:
    - ReadWriteMany
  nfs:
    server: 10.8.192.3
    path: "/k8s/redis/pv1"
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv2
spec:
  capacity:
    storage: 200M
  accessModes:
    - ReadWriteMany
  nfs:
    server: 10.8.192.3
    path: "/k8s/redis/pv2"
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv3
spec:
  capacity:
    storage: 200M
  accessModes:
    - ReadWriteMany
  nfs:
    server: 10.8.192.3
    path: "/k8s/redis/pv3"
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv4
spec:
  capacity:
    storage: 200M
  accessModes:
    - ReadWriteMany
  nfs:
    server: 10.8.192.3
    path: "/k8s/redis/pv4"
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv5
spec:
  capacity:
    storage: 200M
  accessModes:
    - ReadWriteMany
  nfs:
    server: 10.8.192.3
    path: "/k8s/redis/pv5"
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv6
spec:
  capacity:
    storage: 200M
  accessModes:
    - ReadWriteMany
  nfs:
    server: 10.8.192.3
    path: "/k8s/redis/pv6"
    
    
    
    
    
    
    
    
    root@ubuntu:/# cat > /etc/apt/sources.list << EOF
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
 
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
> EOF




pip install redis-trib==0.5.1








redis-trib.py create \
  `dig +short redis-app-0.redis-service.default.svc.cluster.local`:6379 \
  `dig +short redis-app-1.redis-service.default.svc.cluster.local`:6379 \
  `dig +short redis-app-2.redis-service.default.svc.cluster.local`:6379




redis-trib.py replicate \
  --master-addr `dig +short redis-app-0.redis-service.default.svc.cluster.local`:6379 \
  --slave-addr `dig +short redis-app-1.redis-service.default.svc.cluster.local`:6379 --slave-addr `dig +short redis-app-2.redis-service.default.svc.cluster.local`:6379
  
  
  redis-cli --cluster fix redis-app-0.redis-service.default.svc.cluster.local:6379

redis-trib.py replicate \
  --master-addr `dig +short redis-app-1.redis-service.default.svc.cluster.local`:6379 \
  --slave-addr `dig +short redis-app-4.redis-service.default.svc.cluster.local`:6379

redis-trib.py replicate \
  --master-addr `dig +short redis-app-2.redis-service.default.svc.cluster.local`:6379 \
  --slave-addr `dig +short redis-app-5.redis-service.default.svc.cluster.local`:6379




kubectl exec -it redis-app-2 /bin/bash





cat > /etc/apt/sources.list << EOF
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
 
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
> EOF





```

```
redis-trib.py create \
  `dig +short redis-app-0.redis-service.default.svc.cluster.local`:6379
  
redis-trib.py create \
  `dig +short redis-app-0.redis-service.default.svc.cluster.local`:6379
  
edis-trib.py create \
  `dig +short redis-app-0.redis-service.default.svc.cluster.local`:6379 \  
  
  
/usr/bin/python replicate \
  --master-addr `dig +short redis-app-0.redis-service.default.svc.cluster.local`:6379 \
  --slave-addr `dig +short redis-app-1.redis-service.default.svc.cluster.local`:6379

py replicate \
  --master-addr `dig +short redis-app-0.redis-service.default.svc.cluster.local`:6379 \
  --slave-addr `dig +short redis-app-1.redis-service.default.svc.cluster.local`:6379
  --slave-addr `dig +short redis-app-2.redis-service.default.svc.cluster.local`:6379
  
  
redis-trib.py replicate \
  --master-addr `dig +short redis-app-0.redis-service.default.svc.cluster.local`:6379 \
  --slave-addr `dig +short redis-app-1.redis-service.default.svc.cluster.local`:6379 \
  --slave-addr `dig +short redis-app-2.redis-service.default.svc.cluster.local`:6379
  
  
  
kubectl run -it ubunturedis --image=ubuntu  /bin/bash
```



```
curl -XPUT -u root 'http://127.0.0.1:9200/_xpack/license?acknowledge=true' -H "Content-Type: application/json" -d @license.json

curl -XPOST -u root 'http://127.0.0.1:9200/_xpack/license/start_basic?acknowledge=true' -H "Content-Type: application/json" -d @license.json

POST /_xpack/license/start_basic

curl -XPOST -u elastic http://ip:port/_xpack/license/start_basic?acknowledge=true -H "Content-Type: application/json" -d @license.json<br>Enter host password for user 'elastic':<br>{"acknowledged":true,"license_status":"valid"}　　



curl -XPUT -u elastic 'http://127.0.0.1:9200/_xpack/license?acknowledge=true' -H "Content-Type: application/json" -d @license.json


https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/3.5.3/binaries/apache-maven-3.5.3-bin.tar.gz
```

