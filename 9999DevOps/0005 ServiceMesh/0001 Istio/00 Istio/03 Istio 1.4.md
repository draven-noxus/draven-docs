# Istio

官网：https://istio.io/docs/

## 基础准备

```shell
# 下载安装包   注意版本号
wget https://github.com/istio/istio/releases/download/1.4.0/istio-1.4.0-linux.tar.gz

# 解压 
tar -zxvf istio-1.4.0-linux.tar.gz

# 配置环境变量
export PATH=$pwd/bin:$PATH
# 或者
vi /etc/profile
source /etc/profile
```

## 安装方式

### helm template

```shell
# helm template

kubectl create namespace istio-system

# 切换到解压目录install 上一级
$ cd istio-1.4.0
# 初始化
helm template install/kubernetes/helm/istio-init --name istio-init --namespace istio-system  > istio-init.yaml

# 部署
kubectl apply -f istio-init.yaml
# 删除
kubectl delete -f istio-init.yaml

# 组件
helm template install/kubernetes/helm/istio --name istio --namespace istio-system > istio.yaml

# 部署
kubectl apply -f istio.yaml

# 删除
kubectl delete -f istio.yaml


# 信息确认指令
kubectl -n istio-system wait --for=condition=complete job --all

# 相关组件
kubectl get pods -n istio-system

NAME                                      READY   STATUS      RESTARTS   AGE
grafana-6bb6bcf99f-2l8zc                  1/1     Running     0          7h51m
istio-citadel-66ddfd755-l58f6             1/1     Running     0          21h
istio-galley-5f49858479-ntwwr             1/1     Running     0          21h
istio-grafana-post-install-1.4.0-qb6jd    0/1     Completed   0          7h51m
istio-ingressgateway-74747c4b5b-dwffk     1/1     Running     0          21h
istio-init-crd-10-1.4.0-f852f             0/1     Completed   0          21h
istio-init-crd-11-1.4.0-lqbmv             0/1     Completed   0          21h
istio-init-crd-14-1.4.0-78r6t             0/1     Completed   0          21h
istio-pilot-75d8b87cbf-9pk8f              2/2     Running     2          21h
istio-policy-59499c9447-kfrs9             2/2     Running     2          21h
istio-security-post-install-1.4.0-56q58   0/1     Completed   0          21h
istio-sidecar-injector-7984b6f548-pq2kg   1/1     Running     0          21h
istio-telemetry-5c6bd8bb76-kbzcz          2/2     Running     2          21h
istio-tracing-56c7f85df7-k5gwc            1/1     Running     0          7h51m
kiali-7b5c8f79d8-hkrbj                    1/1     Running     0          7h51m
prometheus-74d8b55f54-msjh8               1/1     Running     0          21h


# 查看crd 23个
kubectl get crd|grep istio

adapters.config.istio.io                  2020-02-24T14:22:09Z
attributemanifests.config.istio.io        2020-02-24T14:22:07Z
authorizationpolicies.security.istio.io   2020-02-24T14:22:08Z
clusterrbacconfigs.rbac.istio.io          2020-02-24T14:22:08Z
destinationrules.networking.istio.io      2020-02-24T14:22:08Z
envoyfilters.networking.istio.io          2020-02-24T14:22:08Z
gateways.networking.istio.io              2020-02-24T14:22:08Z
handlers.config.istio.io                  2020-02-24T14:22:09Z
httpapispecbindings.config.istio.io       2020-02-24T14:22:08Z
httpapispecs.config.istio.io              2020-02-24T14:22:08Z
instances.config.istio.io                 2020-02-24T14:22:09Z
meshpolicies.authentication.istio.io      2020-02-24T14:22:08Z
policies.authentication.istio.io          2020-02-24T14:22:08Z
quotaspecbindings.config.istio.io         2020-02-24T14:22:08Z
quotaspecs.config.istio.io                2020-02-24T14:22:08Z
rbacconfigs.rbac.istio.io                 2020-02-24T14:22:08Z
rules.config.istio.io                     2020-02-24T14:22:08Z
serviceentries.networking.istio.io        2020-02-24T14:22:08Z
servicerolebindings.rbac.istio.io         2020-02-24T14:22:08Z
serviceroles.rbac.istio.io                2020-02-24T14:22:08Z
sidecars.networking.istio.io              2020-02-24T14:22:08Z
templates.config.istio.io                 2020-02-24T14:22:09Z
virtualservices.networking.istio.io       2020-02-24T14:22:08Z

# 确认个数
kubectl get crd|grep istio|wc -l
23


# 全部 crd
kubectl get crd
```

### Helm and Title

```shell
# 略
```



# 组件配置

```shell
a）开启grafana
参考其它属性配置，修改/home/istio-1.4.0/install/kubernetes/helm/istioalues.yaml中的【grafana->enabled: true】
修改/home/istio-1.4.0/install/kubernetes/helm/istioarts/kiali/templatesrvice.yaml中的【grafana（Service）->spec->type:NodePort】,添加属性【grafana（Service）->spec->ports->nodePort:30005】

b）开启prometheus
修改/home/istio-1.4.0/install/kubernetes/helm/istioalues.yaml中的【prometheus->enabled: true】
修改/home/istio-1.4.0/install/kubernetes/helm/istioarts/prometheusalues.yaml中的【service->nodePort->enabled:true,port:30002】
c）开启tracing
修改/home/istio-1.4.0/install/kubernetes/helm/istioalues.yaml中的【tracing->enabled: true】
修改/home/istio-1.4.0/install/kubernetes/helm/istioarts/tracing/templatesrvice.yaml中的【tracing（Service）->spec->type:NodePort】,添加属性【tracing（Service）->spec->ports->(http-query)->nodePort:30003】
d）开启kiali
修改/home/istio-1.4.0/install/kubernetes/helm/istioalues.yaml中的【kiali->enabled: true】
修改/home/istio-1.4.0/install/kubernetes/helm/istioarts/kiali/templatesrvice.yaml中的【tracing（Service）->spec->type:NodePort】,添加属性【kiali（Service）->spec->ports->nodePort:30004】
修改/home/istio-1.4.0/install/kubernetes/helm/istioarts/kialialues.yaml中的【createDemoSecret：true】
F)修改采样率（开发阶段，用于监控，生产环境或压力测试应该还原）
          修改/home/istio-1.4.0/install/kubernetes/helm/istioarts/pilotalues.yaml中【traceSampling->100.0】
G)开启策略控制（用于黑白名单，ip地址过滤等功能）
修改/home/istio-1.4.0/install/kubernetes/helm/istioalues.yaml中的【proxy->disablePolicyChecks: false】


H) 执行helm template /home/istio-1.4.0/install/kubernetes/helm/istio --name istio --namespace istio-system | kubectl apply -f -
I)访问地址,推荐用Firefox打开
Dashboard: https://IP:30001
prometheus: http://IP:30002
jaeger: http://IP:30003
kiali: http://IP:30004    缺省用户名 admin 密码 admin
grafana: http://IP:30005 登陆后按照提示创建用户


helm template --name istio --namespace istio-system ./install/kubernetes/helm/istio --set gateways.istio-egressgateway.type=NodePort > istio-1.2.4.yaml
```



## grafana

```shell
 #type: ClusterIP
  type: NodePort
  nodePort: 30001
  externalPort: 3000
        
nodePort: {{ .Values.service.nodePort }}
                
service:
  annotations: {}
  name: http
  #type: ClusterIP
  type: NodePort
  nodePort: 30001
  externalPort: 3000
  loadBalancerIP:
  loadBalancerSourceRanges: []
```



## naftis

```shell
kubectl label namespace naftis istio-injection=enabled


kubectl apply -n naftis -f mysql.yaml

wget -O - https://raw.githubusercontent.com/XiaoMi/naftis/master/tool/getlatest.sh | bash

```



## kiali

```shell
# 创建密钥
kubectl create secret generic kiali -n istio-system --from-literal "username=admin" --from-literal "passphrase=admin"
```



# Bookinfo Application

https://istio.io/docs/examples/bookinfo/

```shell
# 注入
kubectl label namespace default istio-injection=enabled

# 部署
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml

# 环境确认
kubectl get services
NAME          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
details       ClusterIP   10.98.189.190    <none>        9080/TCP   21h
kubernetes    ClusterIP   10.96.0.1        <none>        443/TCP    22h
productpage   ClusterIP   10.103.226.105   <none>        9080/TCP   21h
ratings       ClusterIP   10.107.188.122   <none>        9080/TCP   21h
reviews       ClusterIP   10.100.82.123    <none>        9080/TCP   21h

kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
details-v1-c5b5f496d-n7d92       2/2     Running   0          21h
productpage-v1-c7765c886-m6gll   2/2     Running   0          21h
ratings-v1-f745cf57b-56z69       2/2     Running   0          21h
reviews-v1-75b979578c-58kbs      2/2     Running   0          21h
reviews-v2-597bf96c8f-8fmhb      2/2     Running   0          21h
reviews-v3-54c6c64795-jpglm      2/2     Running   0          21h

# 测试是否成功
kubectl exec -it $(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}') -c ratings -- curl productpage:9080/productpage | grep -o "<title>.*</title>"

<title>Simple Bookstore App</title>

# 部署网关
kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml

kubectl get gateway
NAME               AGE
bookinfo-gateway   21h

# 网关访问配置
https://istio.io/docs/tasks/traffic-management/ingress/ingress-control/#determining-the-ingress-ip-and-ports


export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT


export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')


 kubectl exec -it $(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}') -c ratings -- curl productpage:9080/productpage | grep -o "<title>.*</title>"

kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml

# 先到这里
```



# FAQ

## 强制重启
```shell
# 指令
kubectl get pod {podname} -n {namespace} -o yaml | kubectl replace --force -f -

# istio-system
kubectl get pod naftis-mysql-test -n istio-system -o yaml | kubectl replace --force -f -

# kube-system
kubectl get pod kube-flannel-ds-2jjzt -n kube-system -o yaml | kubectl replace --force -f -

# naftis
kubectl get pod naftis-mysql-test -n naftis -o yaml | kubectl replace --force -f -
```

## 批量替换指令

```shell
# /xxx 寻找源对象  yyy 替换为
:%s/xxx/yyy
```

## Gateway访问方式

```shell
# 修改为负载均衡模式
kubectl edit  service istio-ingressgateway -n istio-system
# 此处以下添加
externalTrafficPolicy: Custer # 定位此处 注意对齐
externalIPs: 
 - xxx.xxx.xxx.xxx
 
# 确认是否生效 查看关键信息 EXTERNAL-IP是否存在配置的ip
kubectl get  service istio-ingressgateway -n istio-system
```

## 排错指南

https:www.orchome.com/1976

## cgroup-driver不匹配

```shell
Error while processing event 

yum安装的kubelet默认的是cgroupfs，而docker一般默认的是systemd。但是kubernetes安装的时候建议使用systemd，当然修改docker为cgroupfs也可以,先修改docker

#vim /etc/docker/daemon.json

{
  "exec-opts": ["native.cgroupdriver=cgroupfs"]
}
使修改生效：

#systemctl  daemon-reload

#systemctl restart docker


也可以修改kubelet的配置文件：

#vim /etc/systemd/system/kubelet.service.d/10-kubeadm.conf

Environment="KUBELET_CONFIG_ARGS=--config=/var/lib/kubelet/config.yaml --cgroup-driver=systemd"
#systemctl daemon-reload

#systemctl restart kubelet
```
