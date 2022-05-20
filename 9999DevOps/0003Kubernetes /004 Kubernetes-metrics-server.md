# Kubernetes-Metrics-server

## 获取资源

参考资料

https://github.com/kubernetes-incubator/metrics-server

```shell
git clone https://github.com/kubernetes-incubator/metrics-server.git

# 1.查看所有分支
  git branch -a

# 2.查看当前使用分支(结果列表中前面标*号的表示当前使用分支)
 git branch
 
# 3.切换分支
git checkout 分支名

cd metrics-server/deploy/1.8+/


-rw-r--r-- 1 root root  397 6月  14 18:25 aggregated-metrics-reader.yaml
-rw-r--r-- 1 root root  303 6月  14 18:25 auth-delegator.yaml
-rw-r--r-- 1 root root  324 6月  14 18:25 auth-reader.yaml
-rw-r--r-- 1 root root  298 6月  14 18:25 metrics-apiservice.yaml
-rw-r--r-- 1 root root 1334 6月  14 18:49 metrics-server-deployment.yaml
-rw-r--r-- 1 root root  297 6月  14 18:25 metrics-server-service.yaml
-rw-r--r-- 1 root root  532 6月  14 18:25 resource-reader.yaml

```

## 修改资源

```yaml
metrics-server-deployment.yaml

 spec:
      serviceAccountName: metrics-server
      volumes:
      # mount in tmp so we can safely use from-scratch images and/or read-only containers
      - name: tmp-dir
        emptyDir: {}
      containers:
      - name: metrics-server
        image: k8s.gcr.io/metrics-server-amd64:v0.3.6 # 镜像建议修改
        #image: k8s.gcr.io/metrics-server:v0.3.7 
        imagePullPolicy: IfNotPresent # 策略要使用本地
        args:
          - --cert-dir=/tmp
          - --secure-port=4443
        command: # 修改此处 start
          - /metrics-server
          - --kubelet-preferred-address-types=InternalIP
          - --kubelet-insecure-tls # 修改此处 end
        ports:

```

## 监测结果

```shell
kubectl get pod -n kube-system
# result
metrics-server-6b7cb969c8-nfztl           1/1     Running   0          134m


kubectl top node

# result
NAME              CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%   
www.example.com   608m         15%    4922Mi          64%  

```

# HPA

