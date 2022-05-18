```shell
# 基础环境配置
# 安装依赖包


#设置kubernetes软件源
cat>>/etc/yum.repos.d/kubrenetes.repo<<EOF
[kubernetes]
name=Kubernetes Repo
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
EOF

# 2.防火墙设置
systemctl stop firewalld && systemctl disable firewalld
yum -y install iptables-services && systemctl start iptables && systemctl enable ipdatbles && iptables -F && service iptables save

#3. 关闭交换分区
swapoff -a && sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

setenforce 0 && sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config

#4. 设置系统参数
# sysctl net.bridge.bridge-nf-call-iptables=1

$ cat <<EOF >  /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF

sysctl -p /etc/sysctl.d/k8s.conf


# 确认br_netfilter模块
lsmod | grep br_netfilter

modprobe br_netfilter

# 依赖命令行
yum install -y conntrack ntpdate ntp ipvsadm ipset jq iptables wget vi net-tools git

yum install -y conntrack ipvsadm ipset jq sysstat curl iptables libseccomp socat -y

# kube-proxy需要开启ipvs
cat /etc/sysconfig/modules/ipvs.modules <<EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF

# 权限
chmod 755 /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip\_vs -e nf\_conntrack\_ipv4

chmod 755 /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules && lsmod | grep -e ip_vs -e nf_conntrack_ipv4



yum install -y kubelet-1.17.0 kubeadm-1.17.0 kubectl-1.17.0

systemctl enable kubelet.service


kubeadm init \
--kubernetes-version=1.17.0 \
--pod-network-cidr=10.244.0.0/16 \
--image-repository registry.aliyuncs.com/google_containers

```

# 说明

基于Kubernetes1.17.4+istio1.5环境搭建

# Kubernetes

## kubeadm相关

```shell
# kubeadm、kubectl、kubelet、kubernetes-cni
yum install -y kubeadm kubectl kubelet kubernetes-cni
yum install -y kubelet-1.17.0 kubeadm-1.17.0 kubectl-1.17.0 kubernetes-cni-0.7.5


# 获取可用版本
$ kubeadm config images list

k8s.gcr.io/kube-apiserver:v1.17.4
k8s.gcr.io/kube-controller-manager:v1.17.4
k8s.gcr.io/kube-scheduler:v1.17.4
k8s.gcr.io/kube-proxy:v1.17.4
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.4.3-0
k8s.gcr.io/coredns:1.6.5

# 编辑脚本
$ vi getImages.sh
#!/bin/bash
# 下面的镜像应该去除"k8s.gcr.io/"的前缀，版本换成kubeadm config images list命令获取到的版本
images=(
    kube-apiserver:v1.17.4
    kube-controller-manager:v1.17.4
    kube-scheduler:v1.17.4
    kube-proxy:v1.17.4
    pause:3.1
    etcd:3.4.3-0
    coredns:1.6.5
)

for imageName in ${images[@]} ; do
    docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
    docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName k8s.gcr.io/$imageName
    docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
done


# 赋予权限
chmod +x getImages.sh
```

### 网络配置

```shell
vi /etc/cni/net.d/10-flannel.conf

cat >/etc/cni/net.d/10-flannel.conf <<-EOF
{
    "cniVersion": "0.3.0",
    "name": "mynet",
    "type": "bridge",
    "bridge": "cni0",
    "isGateway": true,
    "ipMasq": true,
    "ipam": {
        "type": "host-local",
        "subnet": "10.244.0.0/16",
        "routes": [
            {"dst": "0.0.0.0/0"}
        ]
    }
}
EOF


# 这个木有什么用
# cat /etc/cni/net.d/10-flannel.conflist   
{
  "name": "cbr0",
  "cniVersion": "0.3.1",
  "plugins": [
    {
      "type": "flannel",
      "delegate": {
        "hairpinMode": true,
        "isDefaultGateway": true
      }
    },
    {
      "type": "portmap",
      "capabilities": {
        "portMappings": true
      }
    }
  ]
}

# 这个也没有什么用
cat >/etc/cni/net.d/99-loopback.conf <<-EOF
{
    "cniVersion": "0.3.0",
    "type": "loopback"
}
```

### 初始化

```shell
# 建议
kubeadm init --pod-network-cidr=10.244.0.0/16 \
  --image-repository registry.aliyuncs.com/google_containers
  
# 或者
kubeadm init --pod-network-cidr=10.244.0.0/16
  
#注释：
#–pod-network-cidr 指定了网络段，后续网络插件会使用到（本文使用 flannel）。
#–image-repository 指定了镜像地址，默认为 k8s.gcr.io，此处指定为阿里云镜像地址 registry.aliyuncs.com/google_containers。
# 注意，其它参数默认。
#上述命令等同如下命令：
kubeadm init \
  --apiserver-advertise-address=192.168.0.102 \
  --image-repository registry.aliyuncs.com/google_containers \
  --kubernetes-version v1.17.0 \
  --service-cidr=10.1.0.0/16\
  
```

### 提示信息

```shell
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.0.102:6443 --token 1rpp8b.axfud1xrsvx4q8nw \
    --discovery-token-ca-cert-hash sha256:6bf952d45bbdc121fa90583eac33f11f0a3f4b491f29996a56fc289363843e3c 
```

### 加入集群命令

```shell
# kubeadm token create --print-join-command

# mkdir -p $HOME/.kube
# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
# sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 部署flannel

```shell
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

## 集群运维

### 重置

```shell
# 重置
kubeadm reset

# 删除网络设备
rm -rf $HOME/.kube/config
rm -rf /var/lib/cni/
rm -rf /var/lib/kubelet/*
rm -rf /etc/kubernetes/
rm -rf /etc/cni/
ifconfig cni0 down
ifconfig flannel.1 down
ip link delete cni0
ip link delete flannel.1

# node节点
ifconfig cni0 down
ip link delete cni0
ifconfig flannel.1 down
ip link delete flannel.1
rm /var/lib/cni/ -rf
rm /etc/kubernetes/ -rf
rm /var/lib/kubelet/ -rf  
```



```shell

```



## Dashboard

```shell
# 参考地址
https://github.com/kubernetes/dashboard/releases

# 获取资源
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc6/aio/deploy/recommended.yaml

# 修改 svc
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  type: NodePort #新增
  ports:
    - port: 443
      nodePort: 30001 #新增
      targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
    
    
# 修改镜像拉取规则    
spec:
  containers:
    - name: kubernetes-dashboard
      image: kubernetesui/dashboard:v2.0.0-beta8
      # imagePullPolicy: Always 
      imagePullPolicy: IfNotPresent #不存在再下载
      ports:
        - containerPort: 8443
          protocol: TCP
          
# 查看状态
kubectl get pods,svc -n kubernetes-dashboard -o wide
```

### 访问

```shell
kubectl  get sa,secrets -n kubernetes-dashboard


secret/admin-user-token-24njq             kubernetes.io/service-account-token   3      138m
secret/default-token-4w56j                kubernetes.io/service-account-token   3      3h1m
secret/istio.admin-user                   istio.io/key-and-cert                 3      102m
secret/istio.default                      istio.io/key-and-cert                 3      102m
secret/istio.kubernetes-dashboard         istio.io/key-and-cert                 3      102m
secret/kubernetes-dashboard-certs         Opaque                                0      3h1m
secret/kubernetes-dashboard-csrf          Opaque                                1      3h1m
secret/kubernetes-dashboard-key-holder    Opaque                                2      3h1m
secret/kubernetes-dashboard-token-fkfrd   kubernetes.io/service-account-token   3      3h1m


kubectl describe secrets kubernetes-dashboard-token-ls8l4 -n kubernetes-dashboard

$(kubectl  get sa,secrets -n kubernetes-dashboard | awk  '/admin-user-token/{print $1}' )

secret/admin-user-token-fcz7r

kubectl describe secrets secret/admin-user-token-fcz7r -n kubernetes-dashboard |sed -n '/token:.*/p'


kubectl describe secrets admin-user-token-fcz7r -n kubernetes-dashboard |sed -n '/token:.*/p'

 kubectl describe secrets  $(kubectl  get sa,secrets -n kubernetes-dashboard | awk  '/admin-user-token/{print $1}' ) -n kubernetes-dashboard |sed -n '/token:.*/p'
 
 $(kubectl  get sa,secrets -n kubernetes-dashboard | awk  '/admin-user-token/{print $1}' ) ｜sed -n /
 
  kubectl describe secrets  $(kubectl  get sa,secrets -n kubernetes-dashboard | awk  '/admin-user-token/{print $1}' ) -n kubernetes-dashboard |sed -n '/token:.*/p'


kubectl describe secrets  $(kubectl  get sa,secrets -n kubernetes-dashboard | awk  '/admin-user-token/{print $1}'|awk -F '/' '{print $NF}'  ) -n kubernetes-dashboard |sed -n '/token:.*/p'


# 一步到位
kubectl describe secrets  $(kubectl  get secrets -n kubernetes-dashboard | awk  '/kubernetes-dashboard-token/{print $1}' ) -n kubernetes-dashboard |sed -n '/token:.*/p'


# 权限不足
```

### 新增管理员

#### 方式一

```shell
# create-admin.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard

---

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
  
  
 
 # 部署 
 kubectl apply -f create-admin.yaml 
 
 kubectl get sa,secrets -n kubernetes-dashboard
 
 kubectl describe secret admin-user-token-t79xh -n kubernetes-dashboard
```

#### 方式二

```shell
# 创建serviceaccount
kubectl create serviceaccount admin-myuser -n kubernetes-dashboard
serviceaccount/admin-myuser created

# sa绑定集群管理员
kubectl create clusterrolebinding  dashboard-cluster-admin --clusterrole=cluster-admin --serviceaccount=kubernetes-dashboard:admin-myuser

kubectl get sa,secrets -n kubernetes-dashboard

# 获取token
kubectl describe secret admin-myuser-token-275f9 -n kubernetes-dashboard
```



# Helm+Tiller

## Helm

```shell
# 下载二进制文件
tar -zxf helm-v2.12.1-linux-amd64.tar.gz
chmod +x linux-amd64/helm
mv linux-amd64/helm /usr/local/bin

# 查看版本
$ kubectl version
Client: &version.Version{SemVer:"v2.14.0", GitCommit:"05811b84a3f93603dd6c2fcfe57944dfa7ab7fd0", GitTreeState:"clean"}
Error: could not find tiller


# 服务器补全指令
helm completion bash > .helmrc
echo "source .helmrc" >> .bashrc
source .bashrc
```

## Tiller

```shell
kubectl create serviceaccount --namespace=kube-system tiller

kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller


helm init -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.3 --stable-repo-url http://mirror.azure.cn/kubernetes/charts/ --service-account tiller --override spec.selector.matchLabels.'name'='tiller',spec.selector.matchLabels.'app'='helm' --output yaml | sed 's@apiVersion: extensions/v1beta1@apiVersion: apps/v1@' | kubectl apply -f -



# 低版本安装
helm init --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0 --stable-repo-url http://mirror.azure.cn/kubernetes/charts/ --service-account=tiller



# 检查一下是不是安装成功了
kubectl get pods -n kube-system | grep tiller

root@rancherk8sm1:~# helm version
Client: &version.Version{SemVer:"v2.14.0", GitCommit:"02a47c7249b1fc6d8fd3b94e6b4babf9d818144e", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.14.0", GitCommit:"02a47c7249b1fc6d8fd3b94e6b4babf9d818144e", GitTreeState:"clean"}

```



# Istio

```shell
# 下载二进制文件
tar -zxf istio-1.5.0-linux.tar.gz

cd istio-1.5.0

export PATH=$PWD/bin:$PATH
```

## Istioctl 

```shell
# 不太友好 参见
https://istio.io/zh/docs/setup/install/istioctl/
```

## Helm

```shell
# 创建命名空间 istio-system
kubectl create namespace istio-system

#  自定义资源 (CRDs)
helm template install/kubernetes/helm/istio-init --name istio-init --namespace istio-system | kubectl apply -f -

# 安装组件
helm template install/kubernetes/helm/istio --name istio --namespace istio-system | kubectl apply -f -
```

## Helm + Tiller

```shell
# 不会
```

# Images

## Helm

```shell
# https://github.com/helm/helm/releases/tag/v2.14.0

wget https://get.helm.sh/helm-v2.14.0-linux-amd64.tar.gz
```

# FQA

## Coredns

```shell
# kubectl edit cm coredns -n kube-system

apiVersion: v1
data:
  Corefile: |
    .:53 {
        errors
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        forward . /etc/resolv.conf
        cache 30
        loop # 修改此处
        reload
        loadbalance
    }
kind: ConfigMap
metadata:
  creationTimestamp: "2020-03-21T09:50:31Z"
  name: coredns
  namespace: kube-system
  resourceVersion: "171"
  selfLink: /api/v1/namespaces/kube-system/configmaps/coredns
  uid: 62485b55-3de6-4dee-b24a-8440052bdb66
  
```

### 删除所有

```shell
$ kubectl delete pod coredns-9d85f5447-67qtv coredns-9d85f5447-cg87c  -n kube-system

pod "coredns-9d85f5447-67qtv" deleted
pod "coredns-9d85f5447-cg87c" deleted

```

### 查看结果

```shell
# cat /run/flannel/subnet.env 
FLANNEL_NETWORK=10.244.0.0/16
FLANNEL_SUBNET=10.244.0.1/24
FLANNEL_MTU=1450
FLANNEL_IPMASQ=true
```



## Dashboard

### goole浏览器

```shell
# 10.XX.XX.52 通常会使用加密技术来保护您的信息。Google Chrome 此次尝试连接到 10.XX.XX.52 时，此网站发回了异常的错误凭据。这可能是因为有攻击者在试图冒充 10.XX.XX.52，或 Wi-Fi
# 登录屏幕中断了此次连接。请放心，您的信息仍然是安全的，因为 Google Chrome 尚未进行任何数据交换便停止了连接。
# 您目前无法访问 10.XX.XX.52，因为此网站发送了 Google Chrome
# 无法处理的杂乱凭据。网络错误和攻击通常是暂时的，因此，此网页稍后可能会恢复正常

# 删除资源
kubectl delete -f recommended.yaml


# 注释以下内容

# apiVersion: v1
# kind: Secret
# metadata:
#   labels:
#     k8s-app: kubernetes-dashboard
#   name: kubernetes-dashboard-certs
#   namespace: kubernetes-dashboard
# type: Opaque


# 自己生成kubernetes-dashboard-certs

$ openssl genrsa -out dashboard.key 2048

Generating RSA private key, 2048 bit long modulus
............................+++
.+++
e is 65537 (0x10001)

$ ll
total 4
-rw-r--r-- 1 root root 1675 Jan  7 17:31 dashboard.key


$ openssl req -days 36000   -new -out dashboard.csr    -key dashboard.key   -subj '/CN=**10.180.249.52**'

$ ll
total 8
-rw-r--r-- 1 root root  903 Jan  7 17:32 dashboard.csr
-rw-r--r-- 1 root root 1675 Jan  7 17:31 dashboard.key

# 生成自签证书
$ openssl x509 -req -in dashboard.csr -signkey dashboard.key -out dashboard.crt

Signature ok
subject=/CN=**10.180.249.52**
Getting Private key
[root@master create_cert]# ll
total 12
-rw-r--r-- 1 root root  997 Jan  7 17:32 dashboard.crt
-rw-r--r-- 1 root root  903 Jan  7 17:32 dashboard.csr
-rw-r--r-- 1 root root 1675 Jan  7 17:31 dashboard.key

# 使用自签证书创建secret
$ kubectl create secret generic kubernetes-dashboard-certs     --from-file=dashboard.key     --from-file=dashboard.crt      -n kubernetes-dashboard

secret/kubernetes-dashboard-certs created

# 再次部署
kubectl apply -f recommended.yaml
# 资源
kubectl get pods,svc -n kubernetes-dashboard -o wide
# 查看sa和secret
kubectl get sa,secrets -n kubernetes-dashboard
```



## Tiller

### 无法安装

```shell
对于 Kubernetes v1.16.0 以上的版本，有可能会碰到 Error: error installing: the server could not find the requested resource 的错误。这是由于 extensions/v1beta1 已经被 apps/v1 替代。相信在2.15 或者 3 版本发布之后, 应该就不会遇到这个问题了。还是生态比较慢的原因
```

### 镜像仓库问题

```shell
root@rancherk8sm1:~# helm repo list
NAME    URL
stable  https://kubernetes-charts.storage.googleapis.com
local   http://127.0.0.1:8879/charts



root@rancherk8sm1:~# helm repo remove stable
"stable" has been removed from your repositories

root@rancherk8sm1:~# helm repo add stable https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts
"stable" has been added to your repositories
root@rancherk8sm1:~# helm repo update
Hang tight while we grab the latest from your chart repositories...
...Skip local chart repository
...Successfully got an update from the "stable" chart repository
Update Complete. ⎈ Happy Helming!⎈


root@rancherk8sm1:~# helm repo list
NAME    URL
local   http://127.0.0.1:8879/charts
stable  https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts
```

### 编辑文件安装

#### rbac-config.yaml

```shell
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

#### 部署

```shell
kubectl create -f rbac-config.yaml
serviceaccount/tiller created
clusterrolebinding.rbac.authorization.k8s.io/tiller created

# 失败
helm init --service-account tiller --skip-refresh


helm init -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.14.0 --stable-repo-url http://mirror.azure.cn/kubernetes/charts/ --service-account tiller --override spec.selector.matchLabels.'name'='tiller',spec.selector.matchLabels.'app'='helm' --output yaml | sed 's@apiVersion: extensions/v1beta1@apiVersion: apps/v1@' | kubectl apply -f -
```

## Istio

```shell
# 获取资源
https://github.com/istio/istio/releases/tag/1.5.0

wget https://github.com/istio/istio/releases/download/1.5.0/istio-1.5.0-linux.tar.gz
```

# 集群初始化

```shell
# 节点 	操作系统 	IP
master 	  CentOS7 	192.168.191.138
worker1 	CentOS7 	192.168.191.139
worker2 	CentOS7 	192.168.191.140

# 分别修改主机名
hostnamectl --static set-hostname master
hostnamectl --static set-hostname worker1
hostnamectl --static set-hostname worker2


# 设置主机名映射
vim /etc/hosts		#添加以下内容并ping测试
	192.168.191.138	master
	192.168.191.139	worker1
	192.168.191.140	worker2
	

```



# 安装Docker

```shell
# step 1: 安装必要的一些系统工具:
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息:
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3: 更新并安装 Docker-CE:
sudo yum makecache fast
sudo yum -y install docker-ce
# Step 4:开启Docker服务:
sudo systemctl start docker
sudo systemctl enable docker

sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{ 
  "exec-opts": ["native.cgroupdriver=systemd"],
  "insecure-registries":["172.16.244.128:5000","172.30.0.0/16"],
  "registry-mirrors": ["https://zuouzrfh.mirror.aliyuncs.com"],
  "log-driver": "json-file",
  "log-opts": {
     "max-size": "100m"
  }
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 开启代理

```shell
kubectl proxy --address='172.16.244.129' --port=8085 --accept-hosts='^*$'
​```shell
```