# Helm

## 一 Helm安装

```shell
# 解压
tar -zxvf helm-v2.14.0-linux-amd64.tar.gz
# 配置
mv linux-amd64/helm /usr/local/bin/helm
# 查看版本
helm version

# 结果
Client: &version.Version{SemVer:"v2.14.0", GitCommit:"05811b84a3f93603dd6c2fcfe57944dfa7ab7fd0", GitTreeState:"clean"}
Error: could not find tiller


#  目前只能查看到客户端的版本，服务器还没有安装。
#  helm 有很多子命令和参数，为了提高使用命令行的效率，通常建议安装 helm 的 bash 命令补全脚本，方法如下：

helm completion bash > .helmrc
echo "source .helmrc" >> .bashrc
source .bashrc
```

## 二 Tiller安装

### 1.rbac-config.yaml

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: tiller
    namespace: kube-system
```

### 2.部署

```shell
kubectl create -f rbac-config.yaml
serviceaccount/tiller created
clusterrolebinding.rbac.authorization.k8s.io/tiller created

# 低版本安装
helm init --service-account tiller --skip-refresh

# 高版本 tiller安装
helm init -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0 --stable-repo-url http://mirror.azure.cn/kubernetes/charts/ --service-account tiller --override spec.selector.matchLabels.'name'='tiller',spec.selector.matchLabels.'app'='helm' --output yaml | sed 's@apiVersion: extensions/v1beta1@apiVersion: apps/v1@' | kubectl apply -f -



# 编写为脚本 rbac-tiller.sh
kubectl apply -f rbac-config.yaml
echo "start tiller"
helm init -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0 --stable-repo-url http://mirror.azure.cn/kubernetes/charts/ --service-account tiller --override spec.selector.matchLabels.'name'='tiller',spec.selector.matchLabels.'app'='helm' --output yaml | sed 's@apiVersion: extensions/v1beta1@apiVersion: apps/v1@' | kubectl apply -f -

```

### 3.镜像

```shell
# 获取镜像并tag
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0

# 官方镜像
gcr.io/kubernetes-helm/tiller:v2.14.0

docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0 gcr.io/kubernetes-helm/tiller:v2.14.0
```

# 番外篇（参考资料）

```shell
1.docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.13.1

# 创建TLS
helm init --service-account tiller --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.13.1 --stable-repo-url https://kebernetes.oss-cn-hangzhou.aliyuncs.com/charts

helm init --service-account tiller --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0 --stable-repo-url https://kebernetes.oss-cn-hangzhou.aliyuncs.com/charts


helm init --service-account tiller --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0 --tiller-tls-cert /etc/kubernetes/ssl/tiller001.pem --tiller-tls-key /etc/kebernetes/ssl/tiller001-key.pem --tls-ca-cert /etc/kebernetes/ssl/ca.pem --tiller-namespace kube-system --stable-repo-url https://kebernetes.oss-cn-hangzhou.aliyuncs.com/charts


2.kubectl create serviceaccount --namespace kube-system tiller

3.kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

3 kubectl delete clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller


4，helm version
Client: &version.Version{SemVer:"v2.10.0", GitCommit:"9ad53aac42165a5fadc6c87be0dea6b115f93090", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.10.0", GitCommit:"9ad53aac42165a5fadc6c87be0dea6b115f93090", GitTreeState:"clean"}

5、查看tiller的Service
[^_^] linux02 ~# kubectl get services -n kube-system
tiller-deploy ClusterIP 10.103.12.239 <none> 44134/TCP 15m

查看tiller的Deployment
[^_^] linux02 ~# kubectl get deployment -n kube-system
tiller-deploy 1 1 1 1 16m

查看tiller的Pod
[^_^] linux02 ~# kubectl get pods -n kube-system
tiller-deploy-56dd949bd5-t7kq5 1/1 Running 0 16m
```



```shell

二、安装tiller服务端 （不能科学上网，使用国内镜像）
1、docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.13.1

2、 权限配置不然会报这种错 no release found
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}' （此项高版本或许不起效）

3、 helm init -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.10.0 （我使用的）
或
helm init --service-account tiller --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.10.0 --skip-refresh

helm init常用配置项如下：
--canary-image：安装金丝雀build
--tiller-image：安装指定image
--kube-context：安装到指定的kubernetes集群
--tiller-namespace：安装到指定的namespace中
--upgrade：如果tiller server已经被安装了，可以使用此选项更新镜像
--service-account：用于指定运行tiller server的serviceaccount，该account需要事先在kubernetes集群中创建，且需要相应的rbac授权

4，helm version
Client: &version.Version{SemVer:"v2.10.0", GitCommit:"9ad53aac42165a5fadc6c87be0dea6b115f93090", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.10.0", GitCommit:"9ad53aac42165a5fadc6c87be0dea6b115f93090", GitTreeState:"clean"}

5、查看tiller的Service
[^_^] linux02 ~# kubectl get services -n kube-system
tiller-deploy ClusterIP 10.103.12.239 <none> 44134/TCP 15m

查看tiller的Deployment
[^_^] linux02 ~# kubectl get deployment -n kube-system
tiller-deploy 1 1 1 1 16m

查看tiller的Pod
[^_^] linux02 ~# kubectl get pods -n kube-system
tiller-deploy-56dd949bd5-t7kq5 1/1 Running 0 16m




作者：干嘛那么贪睡
出处：http://www.cnblogs.com/luoyan01/
github：https://github.com/luoyan321?tab=repositories/
签名：千江有水千江月 万里无云万里天



```



```shell
$ kubectl create serviceaccount --namespace kube-system tiller                               
serviceaccount "tiller" created

$ kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller 

clusterrolebinding.rbac.authorization.k8s.io "tiller-cluster-rule" created



helm init --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0  --stable-repo-url https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts


# 给 Tiller 的 deployments 添加刚才创建的 ServiceAccount
$ kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
deployment.extensions "tiller-deploy" patched
```



## 三 维护

### helm

```shell
kubectl get -n kube-system secrets,sa,clusterrolebinding -o name|grep tiller|xargs kubectl -n kube-system delete
kubectl get all -n kube-system -l app=helm -o name|xargs kubectl delete -n kube-system

大神就是不一样,果然 解决了我的问题

[root@k8s-master ceph]# kubectl delete deployment tiller-deploy -n k8s-tiller
Error from server (NotFound): deployments.extensions "tiller-deploy" not found
[root@k8s-master ceph]# kubectl delete deployment tiller-deploy -n k8s-tiller
Error from server (NotFound): deployments.extensions "tiller-deploy" not found
[root@k8s-master ceph]# kubectl get pods -n kube-sys
No resources found.
[root@k8s-master ceph]# kubectl get pods -n kube-system
NAME                                    READY   STATUS             RESTARTS   AGE
coredns-7db7dd9c7c-ltlnb                1/1     Running            3          2d16h
coredns-7db7dd9c7c-vmzhb                1/1     Running            5          3d
kube-apiserver-k8s-master               1/1     Running            15         3d
kube-controller-manager-k8s-master      1/1     Running            37         3d
kube-flannel-ds-fdvzr                   1/1     Running            5          3d
kube-flannel-ds-qnjcb                   1/1     Running            3          3d
kube-flannel-ds-v8jsx                   1/1     Running            3          3d
kube-proxy-mksfv                        1/1     Running            5          3d
kube-proxy-prkvf                        1/1     Running            3          3d
kube-proxy-rkwnf                        1/1     Running            3          3d
kube-scheduler-k8s-master               1/1     Running            35         3d
kubernetes-dashboard-7678b7c84f-99kb8   1/1     Running            5          3d
tiller-deploy-69ffbf64bc-c2gbj          0/1     ImagePullBackOff   0          4m7s
[root@k8s-master ceph]# kubectl delete deployment tiller-deploy -n kube-system
Error from server (NotFound): deployments.extensions "tiller-deploy" not found
[root@k8s-master ceph]# kubectl delete deployment tiller-deploy-69ffbf64bc-c2gbj -n kube-system
Error from server (NotFound): deployments.extensions "tiller-deploy-69ffbf64bc-c2gbj" not found
[root@k8s-master ceph]# kubectl delete service tiller-deploy -n kube-system
Error from server (NotFound): services "tiller-deploy" not found
[root@k8s-master ceph]# kubectl delete rs tiller-deploy-69ffbf64bc-c2gbj -n kube-system
Error from server (NotFound): replicasets.extensions "tiller-deploy-69ffbf64bc-c2gbj" not found
[root@k8s-master ceph]# kubectl get all --all-namespaces | grep tiller

kube-system   pod/tiller-deploy-69ffbf64bc-c2gbj          0/1     ImagePullBackOff   0          5m30s



kube-system   replicaset.apps/tiller-deploy-69ffbf64bc          1         1         0       10m
kube-system   replicaset.apps/tiller-deploy-6bcc84d88           0         0         0       2d20h
kube-system   replicaset.apps/tiller-deploy-6f8674fcd6          0         0         0       2d20h
[root@k8s-master ceph]# kubectl get -n kube-system secrets,sa,clusterrolebinding -o name|grep tiller|xargs kubectl -n kube-system delete
clusterrolebinding.rbac.authorization.k8s.io "tiller-cluster-rule" deleted
[root@k8s-master ceph]# kubectl get all -n kube-system -l app=helm -o name|xargs kubectl delete -n kube-system
pod "tiller-deploy-69ffbf64bc-c2gbj" deleted
replicaset.apps "tiller-deploy-69ffbf64bc" deleted
replicaset.apps "tiller-deploy-6bcc84d88" deleted
replicaset.apps "tiller-deploy-6f8674fcd6" deleted
[root@k8s-master ceph]# kubectl get all --all-namespaces | grep tiller

kube-system   pod/tiller-deploy-69ffbf64bc-8p5cx          0/1     Terminating   0          9s



[root@k8s-master ceph]# kubectl get all --all-namespaces | grep tiller




[root@k8s-master ceph]# kubectl get all --all-namespaces | grep tiller




[root@k8s-master ceph]# kubectl get all --all-namespaces | grep tiller

[root@k8s-master ceph]# kubectl get all --all-namespaces | grep tiller


[root@k8s-master ceph]# kubectl get pods -n kube-system
NAME                                    READY   STATUS    RESTARTS   AGE
coredns-7db7dd9c7c-ltlnb                1/1     Running   3          2d17h
coredns-7db7dd9c7c-vmzhb                1/1     Running   5          3d
kube-apiserver-k8s-master               1/1     Running   15         3d
kube-controller-manager-k8s-master      1/1     Running   37         3d
kube-flannel-ds-fdvzr                   1/1     Running   5          3d
kube-flannel-ds-qnjcb                   1/1     Running   3          3d
kube-flannel-ds-v8jsx                   1/1     Running   3          3d
kube-proxy-mksfv                        1/1     Running   5          3d
kube-proxy-prkvf                        1/1     Running   3          3d
kube-proxy-rkwnf                        1/1     Running   3          3d
kube-scheduler-k8s-master               1/1     Running   35         3d
kubernetes-dashboard-7678b7c84f-99kb8   1/1     Running   5          3d
```



# 获取资源

## 获取helm

```shell
https://github.com/kubernetes/helm/releases
链接:https://pan.baidu.com/s/1JjqYAX_qB1iIL1ueTNgSHg  密码:nokj
 
wget https://kubernetes-helm.storage.googleapis.com/helm-v2.14.0-linux-amd64.tar.gz
```

