# Kubernetes

## 简单入门

```shell
# 由于新版本没有提供设置默认sc的方式
# https://kubernetes.io/zh/docs/tasks/administer-cluster/change-default-storage-class/

# kubernetes和docker版本兼容性问题
# vim 编辑 /var/lib/kubelet/kubeadm-flags.env文件
添加
--runtime-cgroups=/systemd/system.slice --kubelet-cgroups=/systemd/system.slice

https://blog.csdn.net/u013218587/article/details/111186022
```

## 环境准备

```shell
# 准备
0、如果没有虚拟机，windows电脑使用vmvare，mac电脑使用virtual-box
1、准备3台，2G或更大内存，2核或以上CPU，20G以上硬盘 物理机或云主机或虚拟机
2、系统centos 7.x

#根据规划设置主机名
hostnamectl set-hostname master
hostnamectl set-hostname node1
hostnamectl set-hostname node2

#在添加hosts
cat >> /etc/hosts << EOF
192.168.0.120 master
192.168.0.178 node1
192.168.0.49 node2
EOF

#本地host同样添加，觉得麻烦的同学可以下载switch-host软件管理本地域名解析
192.168.0.120  master
192.168.0.178   node1
192.168.0.49   node2

#关闭防火墙
systemctl stop firewalld && systemctl disable firewalld

#关闭selinux(在3台机运行)
sed -i 's/enforcing/disabled/' /etc/selinux/config && setenforce 0

#关闭swap
swapoff -a && sed -ri 's/.*swap.*/#&/' /etc/fstab


#时间同步
yum install ntpdate -y && ntpdate time.windows.com

#配置内核参数，将桥接的IPv4流量传递到iptables的链
cat > /etc/sysctl.d/k8s.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system

```



## 卸载kubeadm

```shell
sudo kubeadm reset -f
sudo rm -rvf $HOME/.kube
sudo rm -rvf ~/.kube/
sudo rm -rvf /etc/kubernetes/
sudo rm -rvf /etc/systemd/system/kubelet.service.d
sudo rm -rvf /etc/systemd/system/kubelet.service
sudo rm -rvf /usr/bin/kube*
sudo rm -rvf /etc/cni
sudo rm -rvf /opt/cni
sudo rm -rvf /var/lib/etcd
sudo rm -rvf /var/etcd
sudo apt-get remove kube*
```

## 安装Docker

```shell
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3: 更新并安装Docker-CE
sudo yum makecache fast
sudo yum -y install docker-ce
# Step 4: 开启Docker服务
sudo systemctl start docker && systemctl enable docker

# 可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://s2q9fn53.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload && sudo systemctl restart docker

```



## 安装kubeadm kubectl

```shell


添加kubernetes阿里YUM源
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

yum install -y kubelet-1.20.0 kubeadm-1.20.0 kubectl-1.20.0

systemctl enable kubelet && systemctl start kubelet
```



## 部署Master

```shell
#初始化k8s集群 注意此参数更改为主机ip
kubeadm init --kubernetes-version=1.20.0  \
--apiserver-advertise-address=192.168.0.120   \
--image-repository registry.aliyuncs.com/google_containers  \
--service-cidr=10.10.0.0/16 --pod-network-cidr=10.122.0.0/16

#提示initialized successfully!表示初始化成功
##注意提示：to start using you cluster,you need to run the following as a regular user:
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
#按提示执行以上三条命令（控制台输出信息里面复制的）
#执行完后可以运行,查看node节点情况
kubectl get nodes

#还有一条提示：
#then you can join any number of worker nodes by running the following on each as root
#翻译：然后，您可以通过在每个worker节点上以root身份运行以下命令来连接任意数量的worker节点
#接着把提示如下的语句复制到node节点运行
kubeadm join 192.168.0.120:6443 --token ...
以上条命令（控制台输出信息里面复制的）

#执行下面命令，使kubectl可以自动补充，看你是否需要，选择性执行
source <(kubectl completion bash)

#查看node节点
kubectl get node
#当前node状态均为noReady，属于正常
kubectl get node
#node节点为NotReady，因为corednspod没有启动，缺少网络pod

```

## 部署CNI网络插件

```shell
#安装flannel网络插件
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
#发送admin.conf到所有节点，可以在任何一个节点管理集群
scp /etc/kubernetes/admin.conf root@node1:/etc/kubernetes/admin.conf
scp /etc/kubernetes/admin.conf root@node2:/etc/kubernetes/admin.conf
#在node节点上加入环境变量
echo "export KUBECONFIG=/etc/kubernetes/admin.conf" >> /etc/profile
source /etc/profile
#执行完成以后可以在任意node节点上管理集群，查看节点是否正常
kubectl get nodes

```

## 安装kubernetes-dashboard

```shell
kubectl create -f https://gitee.com/yaochengzhu/k8s-install/blob/master/dashboad.yml
#通过页面访问，推荐使用firefox浏览器,其他浏览器可能会因为证书问题无法访问
生产环境使用公网信任的证书不会有问题
https://master:30000
#这是选择token方式登录，下面获取token
kubectl create serviceaccount dashboard-admin -n kube-system
kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=kube-system:dashboard-admin
kubectl describe secrets -n kube-system $(kubectl -n kube-system get secret | awk '/dashboard-admin/{print $1}')
#以上命令解释：创建admin账号，授权管理集群，复制控制台最后输出的token用于登录即可
#如果忘记token，使用以下命令获取
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')

```



# Kubesphere

## Release Notes For 3.1.0

```shell
https://kubesphere.io/zh/docs/quick-start/all-in-one-on-linux/

https://kubesphere.io/zh/docs/installing-on-linux/persistent-storage-configurations/understand-persistent-storage/
```



## 配置默认 StorageClass

```shell
# 入门建议使用 localPV
kubectl get sc

https://kubesphere.io/zh/docs/installing-on-linux/persistent-storage-configurations/understand-persistent-storage/

https://docs.openebs.io/docs/next/uglocalpv-hostpath.html

kubectl apply -f https://openebs.github.io/charts/openebs-operator.yaml


https://kubernetes.io/zh/docs/tasks/administer-cluster/change-default-storage-class/

kubectl patch storageclass <your-class-name> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

```shell
# 注意修改镜像的策略 imagePullPolicy: "Always" -> imagePullPolicy: "IfNotPresent"
```

## 基础版

```shell
kubectl apply -f https://github.com/kubesphere/ks-installer/releases/download/v3.1.0/kubesphere-installer.yaml

# 注意修改 PV大小（见附录）安装时导致资源不足 比如磁盘
kubectl apply -f https://github.com/kubesphere/ks-installer/releases/download/v3.1.0/cluster-configuration.yaml

# 日志
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f

# 控制台
kubectl get svc/ks-console -n kubesphere-system
```



## 完全版-需要高配置

complete installation

```shell
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/master/kubesphere-complete-setup.yaml
```

## 日志

```shell
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f
```

```shell
#####################################################
###              Welcome to KubeSphere!           ###
#####################################################
Console: http://10.128.0.34:30880
Account: admin
Password: P@88w0rd

NOTE：Please modify the default password after login.
#####################################################
```

# 附录



## 3.1.0

https://github.com/kubesphere/ks-installer/releases/download/v3.1.0/kubesphere-installer.yaml

```yaml
---
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: clusterconfigurations.installer.kubesphere.io
spec:
  group: installer.kubesphere.io
  versions:
  - name: v1alpha1
    served: true
    storage: true
  scope: Namespaced
  names:
    plural: clusterconfigurations
    singular: clusterconfiguration
    kind: ClusterConfiguration
    shortNames:
    - cc

---
apiVersion: v1
kind: Namespace
metadata:
  name: kubesphere-system

---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ks-installer
  namespace: kubesphere-system

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: ks-installer
rules:
- apiGroups:
  - ""
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - apps
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - extensions
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - batch
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - rbac.authorization.k8s.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - apiregistration.k8s.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - apiextensions.k8s.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - tenant.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - certificates.k8s.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - devops.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - monitoring.coreos.com
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - logging.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - jaegertracing.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - storage.k8s.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - policy
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - autoscaling
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - networking.istio.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - config.istio.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - iam.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - notification.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - auditing.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - events.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - core.kubefed.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - installer.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - storage.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - security.istio.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - monitoring.kiali.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - kiali.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - networking.k8s.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - kubeedge.kubesphere.io
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - types.kubefed.io
  resources:
  - '*'
  verbs:
  - '*'

---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: ks-installer
subjects:
- kind: ServiceAccount
  name: ks-installer
  namespace: kubesphere-system
roleRef:
  kind: ClusterRole
  name: ks-installer
  apiGroup: rbac.authorization.k8s.io

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ks-installer
  namespace: kubesphere-system
  labels:
    app: ks-install
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ks-install
  template:
    metadata:
      labels:
        app: ks-install
    spec:
      serviceAccountName: ks-installer
      containers:
      - name: installer
        image: kubesphere/ks-installer:v3.1.0
        imagePullPolicy: "Always"
        resources:
          limits:
            cpu: "1"
            memory: 1Gi
          requests:
            cpu: 20m
            memory: 100Mi
        volumeMounts:
        - mountPath: /etc/localtime
          name: host-time
      volumes:
      - hostPath:
          path: /etc/localtime
          type: ""
        name: host-time

```

kubectl apply -f https://github.com/kubesphere/ks-installer/releases/download/v3.1.0/cluster-configuration.yaml

```yaml
---
apiVersion: installer.kubesphere.io/v1alpha1
kind: ClusterConfiguration
metadata:
  name: ks-installer
  namespace: kubesphere-system
  labels:
    version: v3.1.0
spec:
  persistence:
    storageClass: ""        # If there is not a default StorageClass in your cluster, you need to specify an existing StorageClass here.
  authentication:
    jwtSecret: ""           # Keep the jwtSecret consistent with the host cluster. Retrive the jwtSecret by executing "kubectl -n kubesphere-system get cm kubesphere-config -o yaml | grep -v "apiVersion" | grep jwtSecret" on the host cluster.
  local_registry: ""        # Add your private registry address if it is needed.
  etcd:
    monitoring: false       # Whether to enable etcd monitoring dashboard installation. You have to create a secret for etcd before you enable it.
    endpointIps: localhost  # etcd cluster EndpointIps, it can be a bunch of IPs here.
    port: 2379              # etcd port
    tlsEnable: true
  common:
    redis:
      enabled: false
    openldap:
      enabled: false
    minioVolumeSize: 20Gi # Minio PVC size.
    openldapVolumeSize: 2Gi   # openldap PVC size.
    redisVolumSize: 2Gi # Redis PVC size.
    monitoring:
      endpoint: http://prometheus-operated.kubesphere-monitoring-system.svc:9090 # Prometheus endpoint to get metrics data
    es:   # Storage backend for logging, events and auditing.
      # elasticsearchMasterReplicas: 1   # total number of master nodes, it's not allowed to use even number
      # elasticsearchDataReplicas: 1     # total number of data nodes.
      elasticsearchMasterVolumeSize: 4Gi   # Volume size of Elasticsearch master nodes.
      elasticsearchDataVolumeSize: 20Gi    # Volume size of Elasticsearch data nodes.
      logMaxAge: 7                     # Log retention time in built-in Elasticsearch, it is 7 days by default.
      elkPrefix: logstash              # The string making up index names. The index name will be formatted as ks-<elk_prefix>-log.
      basicAuth:
        enabled: false
        username: ""
        password: ""
      externalElasticsearchUrl: ""
      externalElasticsearchPort: ""
  console:
    enableMultiLogin: true  # enable/disable multiple sign on, it allows an account can be used by different users at the same time.
    port: 30880
  alerting:                # (CPU: 0.1 Core, Memory: 100 MiB) Whether to install KubeSphere alerting system. It enables Users to customize alerting policies to send messages to receivers in time with different time intervals and alerting levels to choose from.
    enabled: false
    # thanosruler:
    #   replicas: 1
    #   resources: {}
  auditing:                # Whether to install KubeSphere audit log system. It provides a security-relevant chronological set of records，recording the sequence of activities happened in platform, initiated by different tenants.
    enabled: false
  devops:                  # (CPU: 0.47 Core, Memory: 8.6 G) Whether to install KubeSphere DevOps System. It provides out-of-box CI/CD system based on Jenkins, and automated workflow tools including Source-to-Image & Binary-to-Image.
    enabled: false
    jenkinsMemoryLim: 2Gi      # Jenkins memory limit.
    jenkinsMemoryReq: 1500Mi   # Jenkins memory request.
    jenkinsVolumeSize: 8Gi     # Jenkins volume size.
    jenkinsJavaOpts_Xms: 512m  # The following three fields are JVM parameters.
    jenkinsJavaOpts_Xmx: 512m
    jenkinsJavaOpts_MaxRAM: 2g
  events:                  # Whether to install KubeSphere events system. It provides a graphical web console for Kubernetes Events exporting, filtering and alerting in multi-tenant Kubernetes clusters.
    enabled: false
    ruler:
      enabled: true
      replicas: 2
  logging:                 # (CPU: 57 m, Memory: 2.76 G) Whether to install KubeSphere logging system. Flexible logging functions are provided for log query, collection and management in a unified console. Additional log collectors can be added, such as Elasticsearch, Kafka and Fluentd.
    enabled: false
    logsidecar:
      enabled: true
      replicas: 2
  metrics_server:                    # (CPU: 56 m, Memory: 44.35 MiB) Whether to install metrics-server. IT enables HPA (Horizontal Pod Autoscaler).
    enabled: false
  monitoring:
    storageClass: ""                 # If there is a independent StorageClass your need for prometheus, you can specify it here. default StorageClass used by default.
    # prometheusReplicas: 1            # Prometheus replicas are responsible for monitoring different segments of data source and provide high availability as well.
    prometheusMemoryRequest: 400Mi   # Prometheus request memory.
    prometheusVolumeSize: 20Gi       # Prometheus PVC size.
    # alertmanagerReplicas: 1          # AlertManager Replicas.
  multicluster:
    clusterRole: none  # host | member | none  # You can install a solo cluster, or specify it as the role of host or member cluster.
  network:
    networkpolicy: # Network policies allow network isolation within the same cluster, which means firewalls can be set up between certain instances (Pods).
      # Make sure that the CNI network plugin used by the cluster supports NetworkPolicy. There are a number of CNI network plugins that support NetworkPolicy, including Calico, Cilium, Kube-router, Romana and Weave Net.
      enabled: false
    ippool: # if calico cni is integrated then use the value "calico", "none" means that the ippool function is disabled
      type: none
    topology: # "weave-scope" means to use "weave-scope" to provide network topology information, "none" means that the topology function is disabled
      type: none
  openpitrix:
    store:
      enabled: false
  servicemesh:         # (0.3 Core, 300 MiB) Whether to install KubeSphere Service Mesh (Istio-based). It provides fine-grained traffic management, observability and tracing, and offer visualization for traffic topology.
    enabled: false     # base component (pilot)
  kubeedge:
    enabled: false
    cloudCore:
      nodeSelector: {"node-role.kubernetes.io/worker": ""}
      tolerations: []
      cloudhubPort: "10000"
      cloudhubQuicPort: "10001"
      cloudhubHttpsPort: "10002"
      cloudstreamPort: "10003"
      tunnelPort: "10004"
      cloudHub:
        advertiseAddress: # At least a public IP Address or an IP which can be accessed by edge nodes must be provided
          - ""            # Causion!: Leave this entry to empty will cause CloudCore to exit abnormally once KubeEdge is enabled.
        nodeLimit: "100"
      service:
        cloudhubNodePort: "30000"
        cloudhubQuicNodePort: "30001"
        cloudhubHttpsNodePort: "30002"
        cloudstreamNodePort: "30003"
        tunnelNodePort: "30004"
    edgeWatcher:
      nodeSelector: {"node-role.kubernetes.io/worker": ""}
      tolerations: []
      edgeWatcherAgent:
        nodeSelector: {"node-role.kubernetes.io/worker": ""}
        tolerations: []
```


