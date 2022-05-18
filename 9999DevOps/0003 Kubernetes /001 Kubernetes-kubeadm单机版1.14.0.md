# Kubernetes(k8s)

单机版Kubernetes1.14.0，基于kubeadm

## 一 环境准备

```shell
#  1.修改主机名(没必要) reboot 生效
hostnamectl set-hostname  k8s-master
#  2.安装docker 自己安装

#  3.切换k8s源
vim /etc/yum.repos.d/kubernetes.repo

#  3.1输入以下内容 注意阿里云
[kuberneten]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg

#  3.2缓存生效
yum makecache

# 出现以下信息表示仓库设置成功
见提示信息

# 4 设置网桥（想知道为什么自己上网搜）
# RHEL / CentOS 7系统由于iptables被绕过而导致流量被错误路由的问题。所以应该确保net.bridge.bridge-nf-call-iptables的sysctl配置中被设置为1
sysctl net.bridge.bridge-nf-call-iptables=1
```

## 二 kubeadm安装

```shell
# 5. 安装 kubeadm 和相关工具
	# 这是一个安装最新kubelet的命令（不要用）
	yum install -y kubelet kubeadm kubectl kubernetes-cni

# 5.1最新的kubeadm可能拉取不到最新镜像 所以指定版本 kubeadm-1.14.0
yum install -y kubelet-1.14.0 kubeadm-1.14.0 kubectl-1.14.0 kubernetes-cni

# 5.2查看版本 kubectl version
  # 找不到命令请确认已经下载或者自己配置PATH
# start
Client Version: version.Info{Major:"1", Minor:"14", GitVersion:"v1.14.0", GitCommit:"641856db18352033a0d96dbc99153fa3b27298e5", GitTreeState:"clean", BuildDate:"2019-03-25T15:53:57Z", GoVersion:"go1.12.1", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"14", GitVersion:"v1.14.0", GitCommit:"641856db18352033a0d96dbc99153fa3b27298e5", GitTreeState:"clean", BuildDate:"2019-03-25T15:45:25Z", GoVersion:"go1.12.1", Compiler:"gc", Platform:"linux/amd64"}
# end

# 5.3 启动docker和kubectl
systemctl enable docker && systemctl start docker
systemctl enable kubelet && systemctl start kubelet

# 5.4 查看 kubeadm 会用到的镜像
$ kubeadm config images list

# 返回结果<注意我用的是 1.14.0版本>
k8s.gcr.io/kube-apiserver:v1.14.0
k8s.gcr.io/kube-controller-manager:v1.14.0
k8s.gcr.io/kube-scheduler:v1.14.0
k8s.gcr.io/kube-proxy:v1.14.0
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.3.10
k8s.gcr.io/coredns:1.3.1

# 6 初始化k8s（不要执行 请先看附录）
# 6.1先获取镜像
	# 见附录镜像 kube-apiserver相关
# 6.2注意版本 注意网段
kubeadm init --kubernetes-version=1.14.0 --pod-network-cidr=10.244.0.0/16
#  看到以下信息表示安装成功
见 初始化k8s

# 6.3 执进行配置：
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 7 配置K8s环境
	# 7.1 Master 节点默认不参与工作负载，可以执行下面的命令来搭建一个 all-in-one 的 kubernetes 环境。
kubectl taint nodes --all node-role.kubernetes.io/master-


# 加入集群(这里用不到单机)
kubeadm token create --print-join-command

kubeadm join --token 55c2c6.2a4bde1bc73a6562 192.168.1.144:6443 --discovery-token-ca-cert-hash sha256:0fdf8cfc6fecc18fded38649a4d9a81d043bf0e4bf57341239250dcc62d2c832


	# 7.2 查看node运行状态
[root@k8s-master software]# kubectl get nodes
NAME         STATUS     ROLES    AGE     VERSION
k8s-master   NotReady   master   3m39s   v1.14.0

	# 7.3 问题排查
  # 发现是NotReady状态，这是因为cni 网络插件没有安装的原因

	# 7.4 安装 cni 网络插件。
docker pull quay.io/coreos/flannel:v0.10.0-amd64

  # 7.5 配置网络插件
	mkdir -p /etc/cni/net.d/
	
	vi /etc/cni/net.d/10-flannel.conf
  
  {"name":"cbr0","type":"flannel","delegate": {"isDefaultGateway": true}}

	mkdir /usr/share/oci-umount/oci-umount.d -p
	mkdir /run/flannel/
	
	# 7.6 部署网络插件
	kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.9.1/Documentation/kube-flannel.yml

# 8 查看系统pod运行状态
[root@k8s-master ~]# kubectl get pods -n kube-system
NAME                                 READY   STATUS    RESTARTS   AGE
coredns-576cbf47c7-cpd4t             1/1     Running   1          4m22s
coredns-576cbf47c7-m46n6             1/1     Running   1          4m22s
etcd-k8s-master                      1/1     Running   0          3m45s
kube-apiserver-k8s-master            1/1     Running   0          3m23s
kube-controller-manager-k8s-master   1/1     Running   0          3m37s
kube-flannel-ds-bzql2                1/1     Running   0          2m7s
kube-proxy-7t97x                     1/1     Running   0          4m22s
kube-scheduler-k8s-master            1/1     Running   0          3m32s

#  8.1 可以看到所有pod都处于Running表示运行成功
#  再次查看node运行状态
[root@k8s-master ~]# kubectl get nodes
NAME         STATUS   ROLES    AGE     VERSION
k8s-master   Ready    master   6m20s   v1.12.3

# 查看日志
journalctl -f -u kubelet
```

## 三 kubernetes-dashboard

参见 ：kubernetes-dashboard.yaml文件

```shell
# 网路不稳定不建议使用
wget https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml

# 修改文件 添加 type: NodePort
spec:
  type: NodePort    # 新增
  ports:
    - port: 443
      targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
    
# 部署UI
kubectl create -f  kubernetes-dashboard.yaml

# 查看命令 用于排错
kubectl get pods --all-namespaces -o wide | grep dashboard

# 查看日志
kubectl logs kubernetes-dashboard-5f7b999d65-4f22m --namespace=kube-system

# 查看日志
kubectl describe kubernetes-dashboard-5f7b999d65-4f22m --namespace=kube-system

# 查看部署
kubectl get deployment kubernetes-dashboard -n kube-system

# 查看服务
kubectl get svc -n kube-system
```

参见：dashboard-adminuser.yaml文件

```shell
# 绑定
kubectl apply -f dashboard-adminuser.yaml

# 获取token
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kubernetes-dashboard-admin-token | awk '{print $1}')

```



## 四  ingress-nginx

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.29.0/deploy/static/mandatory.yaml
```



## 五 维护

### kubeadm

```shell
# 卸载kubeadm
kubeadm reset -f
modprobe -r ipip
lsmod
rm -rf ~/.kube/
rm -rf /etc/kubernetes/
rm -rf /etc/systemd/system/kubelet.service.d
rm -rf /etc/systemd/system/kubelet.service
rm -rf /usr/bin/kube*
rm -rf /etc/cni
rm -rf /opt/cni
rm -rf /var/lib/etcd
rm -rf /var/etcd

# 列出已经安装过的rpm包
yum list installed | grep kube

# 卸载 kubeadm rpm包
yum remove kubeadm.x86_64 kubectl.x86_64 kubelet.x86_64 -y

# 安装指定的kubeadm
yum install -y kubelet-1.14.0 kubeadm-1.14.0 kubectl-1.14.0 kubernetes-cni

# 初始化
kubeadm init  --kubernetes-version=1.14.0  --pod-network-cidr=10.8.0.0/16
```



# 附录

## 镜像

### kube-apiserver相关

```shell
# 拉取镜像并打标签
docker pull docker.io/mirrorgooglecontainers/kube-apiserver-amd64:v1.14.0
docker tag docker.io/mirrorgooglecontainers/kube-apiserver-amd64:v1.14.0 k8s.gcr.io/kube-apiserver:v1.14.0

docker pull docker.io/mirrorgooglecontainers/kube-controller-manager-amd64:v1.14.0
docker tag docker.io/mirrorgooglecontainers/kube-controller-manager-amd64:v1.14.0 k8s.gcr.io/kube-controller-manager:v1.14.0

docker pull docker.io/mirrorgooglecontainers/kube-scheduler-amd64:v1.14.0
docker tag docker.io/mirrorgooglecontainers/kube-scheduler-amd64:v1.14.0 k8s.gcr.io/kube-scheduler:v1.14.0

docker pull docker.io/mirrorgooglecontainers/kube-proxy-amd64:v1.14.0
docker tag docker.io/mirrorgooglecontainers/kube-proxy-amd64:v1.14.0 k8s.gcr.io/kube-proxy:v1.14.0

docker pull docker.io/mirrorgooglecontainers/pause-amd64:3.1
docker tag docker.io/mirrorgooglecontainers/pause-amd64:3.1 k8s.gcr.io/pause:3.1

docker pull docker.io/mirrorgooglecontainers/etcd-amd64:3.3.10
docker tag docker.io/mirrorgooglecontainers/etcd-amd64:3.3.10 k8s.gcr.io/etcd:3.3.10

docker pull docker.io/coredns/coredns:1.3.1
docker tag docker.io/coredns/coredns:1.3.1 k8s.gcr.io/coredns:1.3.1
```

### kubernetes-dashboard

```shell
# 无法拉取kubernetes-dashboard镜像
docker pull docker.io/mirrorgooglecontainers/kubernetes-dashboard-amd64:v1.10.1

docker tag docker.io/mirrorgooglecontainers/kubernetes-dashboard-amd64:v1.10.1 k8s.gcr.io/kubernetes-dashboard-amd64:v1.10.1
```

### flannel

```shell
docker pull quay.io/coreos/flannel:v0.9.1-amd64
```



## 提示信息

### 仓库配置成功

```shell
# start
Loaded plugins: fastestmirror, langpacks
Determining fastest mirrors
epel                                                                                                                                                                    | 3.2 kB  00:00:00     
extras                                                                                                                                                                  | 3.4 kB  00:00:00     
kuberneten                                                                                                                                                              | 1.4 kB  00:00:00     
os                                                                                                                                                                      | 3.6 kB  00:00:00     
updates                                                                                                                                                                 | 3.4 kB  00:00:00     
(1/14): epel/7/x86_64/prestodelta                                                                                                                                       |   75 B  00:00:00     
(2/14): extras/7/x86_64/prestodelta                                                                                                                                     | 100 kB  00:00:00     
(3/14): extras/7/x86_64/other_db                                                                                                                                        | 126 kB  00:00:00     
(4/14): extras/7/x86_64/filelists_db                                                                                                                                    | 603 kB  00:00:00     
(5/14): epel/7/x86_64/other                                                                                                                                             | 2.2 MB  00:00:00     
(6/14): kuberneten/filelists                                                                                                                                            |  14 kB  00:00:00     
(7/14): kuberneten/primary                                                                                                                                              |  39 kB  00:00:00     
(8/14): kuberneten/other                                                                                                                                                |  27 kB  00:00:00     
(9/14): updates/7/x86_64/prestodelta                                                                                                                                    | 679 kB  00:00:00     
(10/14): updates/7/x86_64/other_db                                                                                                                                      | 578 kB  00:00:00     
(11/14): os/7/x86_64/other_db                                                                                                                                           | 2.5 MB  00:00:00     
(12/14): updates/7/x86_64/filelists_db                                                                                                                                  | 3.4 MB  00:00:00     
(13/14): epel/7/x86_64/filelists                                                                                                                                        |  10 MB  00:00:00     
(14/14): os/7/x86_64/filelists_db                                                                                                                                       | 6.9 MB  00:00:00     
epel                                                                                                                                                                               12717/12717
epel                                                                                                                                                                               12717/12717
epel                                                                                                                                                                               12717/12717
kuberneten                                                                                                                                                                             284/284
kuberneten                                                                                                                                                                             284/284
kuberneten                                                                                                                                                                             284/284
Metadata Cache Created
#end
```

### 初始化K8s成功

```shell
# start
Your Kubernetes master has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of machines by running the following on each node
as root:

kubeadm join 10.104.230.95:6443 --token u5k24m.no52g5zx4qtcmzfx --discovery-token-ca-cert-hash sha256:571c3581a2c88eed50156b8c720d179d0499660643907fc0cb2cc5a940292694
# end
```

## Yaml文件

### dashboard-adminuser

```shell
# dashboard-adminuser.yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-admin
  namespace: kube-system

---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: kubernetes-dashboard-admin
  labels:
    k8s-app: kubernetes-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kubernetes-dashboard-admin
  namespace: kube-system

---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: kubernetes-dashboard-head
  labels:
    k8s-app: kubernetes-dashboard-head
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kubernetes-dashboard-head
  namespace: kube-system
```

### kubernetes-dashboard

```shell
# wget http://pencil-file.oss-cn-hangzhou.aliyuncs.com/blog/kubernetes-dashboard.yaml

# Copyright 2017 The Kubernetes Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# ------------------- Dashboard Secret ------------------- #

apiVersion: v1
kind: Secret
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-certs
  namespace: kube-system
type: Opaque

---
# ------------------- Dashboard Service Account ------------------- #

apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system

---
# ------------------- Dashboard Role & Role Binding ------------------- #

kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kubernetes-dashboard-minimal
  namespace: kube-system
rules:
  # Allow Dashboard to create 'kubernetes-dashboard-key-holder' secret.
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["create"]
  # Allow Dashboard to create 'kubernetes-dashboard-settings' config map.
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["create"]
  # Allow Dashboard to get, update and delete Dashboard exclusive secrets.
- apiGroups: [""]
  resources: ["secrets"]
  resourceNames: ["kubernetes-dashboard-key-holder", "kubernetes-dashboard-certs"]
  verbs: ["get", "update", "delete"]
  # Allow Dashboard to get and update 'kubernetes-dashboard-settings' config map.
- apiGroups: [""]
  resources: ["configmaps"]
  resourceNames: ["kubernetes-dashboard-settings"]
  verbs: ["get", "update"]
  # Allow Dashboard to get metrics from heapster.
- apiGroups: [""]
  resources: ["services"]
  resourceNames: ["heapster"]
  verbs: ["proxy"]
- apiGroups: [""]
  resources: ["services/proxy"]
  resourceNames: ["heapster", "http:heapster:", "https:heapster:"]
  verbs: ["get"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: kubernetes-dashboard-minimal
  namespace: kube-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kubernetes-dashboard-minimal
subjects:
- kind: ServiceAccount
  name: kubernetes-dashboard
  namespace: kube-system

---
# ------------------- Dashboard Deployment ------------------- #

kind: Deployment
apiVersion: apps/v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system
spec:
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      k8s-app: kubernetes-dashboard
  template:
    metadata:
      labels:
        k8s-app: kubernetes-dashboard
    spec:
      containers:
      - name: kubernetes-dashboard
        image: k8s.gcr.io/kubernetes-dashboard-amd64:v1.10.1
        ports:
        - containerPort: 8443
          protocol: TCP
        args:
          - --auto-generate-certificates
          # Uncomment the following line to manually specify Kubernetes API server Host
          # If not specified, Dashboard will attempt to auto discover the API server and connect
          # to it. Uncomment only if the default does not work.
          # - --apiserver-host=http://my-address:port
        volumeMounts:
        - name: kubernetes-dashboard-certs
          mountPath: /certs
          # Create on-disk volume to store exec logs
        - mountPath: /tmp
          name: tmp-volume
        livenessProbe:
          httpGet:
            scheme: HTTPS
            path: /
            port: 8443
          initialDelaySeconds: 30
          timeoutSeconds: 30
      volumes:
      - name: kubernetes-dashboard-certs
        secret:
          secretName: kubernetes-dashboard-certs
      - name: tmp-volume
        emptyDir: {}
      serviceAccountName: kubernetes-dashboard
      # Comment the following tolerations if Dashboard must not be deployed on master
      tolerations:
      - key: node-role.kubernetes.io/master
        effect: NoSchedule

---
# ------------------- Dashboard Service ------------------- #

kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system
spec:
  type: NodePort
  ports:
    - port: 443
      targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
```

# FAQ

##  cni错误

```shell
# cni错误
/run/flannel/subnet.env

kubectl edit cm coredns -n kube-system

subnet.env
```

```shell
# kubectl proxy(用不到)
kubectl proxy --address='<ip>' --port=<port> --accept-hosts='^*$' &
```



# 部署总结

```shell
# Kubernetes(k8s)

# 部署

部署指南：

https://github.com/kelseyhightower

https://github.com/kubernetes/minikube

https://github.com/kubernetes/kubeadm

https://github.com/kubernetes/kops

https://coreos.com/tectonic

https://labs.play-with-k8s.com
```



# 其他安装方式

```shell
# Minikube
0 链接
https://kubernetes.io/docs/getting-started-guides/minikube/

1.  安装虚拟机（Virtualbox，xhyve， VMWare）
2.  安装kubectl命令行工具
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s
https://storage.googleapis.com/kubernetes-
release/release/stable.txt`/bin/darwin/amd64/kubectl
3.  安装minikube命令行工具
curl -Lo minikube
https://storage.googleapis.com/minikube/releases/v0.22.3/minikube-darwin-
amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
4.  运行minikube start命令
5.  完成

# IBM Cloud Private
https://www.ibm.com/support/knowledgecenter/SSBS6K_1.2.0/installing/install_containers_CE.html

https://hub.docker.com/r/ibmcom/cfc-installer/

1.  安装Docker
2.  获取IBM Cloud Private镜像
 sudo docker pull ibmcom/cfc-installer:1.2.0
3.  准备安装配置
 cd /<installation_directory>
 sudo docker run -e LICENSE=accept -v "$(pwd)":/data ibmcom/cfc-
installer:1.2.0 cp -r cluster /data
 编辑config.yaml, hosts文件
 生成sshkey并分发到所有cluster中的节点
4.  运行docker run -e LICENSE=accept --net=host -t -v
"$(pwd)":/installer/cluster ibmcom/cfc-installer:1.2.0 install
5.  完成
```

# 指令

```shell
kubectl -n kube-system  get pods | grep Evicted |awk '{print$1}'|xargs kubectl -n kube-system delete


kubectl -n ingress-nginx  get pods | grep Evicted |awk '{print$1}'|xargs kubectl -n ingress-nginx  delete

kubectl   get pods | grep Evicted |awk '{print$1}'|xargs 

kubectl delete pods  xxx -n ingress-nginx
```

