# Kubernetes

```Shell
# 关闭swap
swapoff -a
vi /etc/fstab
#/dev/mapper/centos-swap swap                    swap    defaults        0 0

# Docker 建议使用  19.03.0
# 不再赘述
# 参考文档 sudo yum install -y yum-utils
https://docs.docker.com/engine/install/centos/
# 切换镜像源
wget -O /etc/yum.repos.d/CentOS-Base.repo  http://mirrors.aliyun.com/repo/Centos-7.repo

# vim /etc/yum.repos.d/kubernetes.repo
[kuberneten]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg

yum makecache

# 使用kubeadm
yum install -y kubelet-1.20.0 kubeadm-1.20.0 kubectl-1.20.0 kubernetes-cni

systemctl enable docker && systemctl start docker
systemctl enable kubelet && systemctl start kubelet

# 获取所需要的镜像清单
$ kubeadm config images list

k8s.gcr.io/kube-apiserver:v1.18.16
k8s.gcr.io/kube-controller-manager:v1.18.16
k8s.gcr.io/kube-scheduler:v1.18.16
k8s.gcr.io/kube-proxy:v1.18.16
k8s.gcr.io/pause:3.2
k8s.gcr.io/etcd:3.4.3-0
k8s.gcr.io/coredns:1.6.7
# 安装初始化 
# calico  10.96.0.0/12
# flannel 10.244.0.0/16
kubeadm init --kubernetes-version=1.20.0 --pod-network-cidr=10.244.0.0/16

# master参与调度
kubectl taint nodes --all node-role.kubernetes.io/master-


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

kubeadm join 192.168.160.103:6443 --token o4bjbs.7du65ipd36iirlwg \
    --discovery-token-ca-cert-hash sha256:979848d170a59d658fab94d67a022c3321e25c480315b1fff84b029fe0ada784
# end

# 配置网络插件
	mkdir -p /etc/cni/net.d/
	
	vi /etc/cni/net.d/10-flannel.conf
  
  {"name":"cbr0","type":"flannel","delegate": {"isDefaultGateway": true}}

	mkdir /usr/share/oci-umount/oci-umount.d -p
	mkdir /run/flannel/
	
	# 部署网络插件 请前往官网获取新的 kube-flannel
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.9.1/Documentation/kube-flannel.yml

root@k8s-master ~]# kubectl get nodes
NAME         STATUS   ROLES    AGE     VERSION
k8s-master   Ready    master   6m20s   v1.18.0
```



# Kubernetes-Dashbord

```shell
https://github.com/kubernetes/dashboard
https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md
```



# 卸载

```shell l
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
yum install -y kubelet-1.20.0 kubeadm-1.20.0 kubectl-1.20.0 kubernetes-cni

# 初始化
kubeadm init  --kubernetes-version=1.20.0  --pod-network-cidr=10.8.0.0/16


```





```shell
# 镜像脚本

# 1.脚本
#!/bin/bash
# 下面的镜像应该去除"k8s.gcr.io/"的前缀，版本换成kubeadm config images list命令获取到的版本
images=(
    kube-apiserver:v1.20.15
    kube-controller-manager:v1.20.15
    kube-scheduler:v1.20.15
    kube-proxy:v1.20.15
    pause:3.2
    etcd:3.4.13-0
    coredns:1.7.0
)

for imageName in ${images[@]} ; do
    docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
    docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName k8s.gcr.io/$imageName
    docker rmi registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
done



docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.20.15
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kube-proxy:v1.20.15 k8s.gcr.io/kube-proxy:v1.20.15


# kubernetes-dashboard
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/kubernetes-dashboard-amd64:v1.10.1
docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/kubernetes-dashboard-amd64:v1.10.1 k8s.gcr.io/kubernetes-dashboard-amd64:v1.10.1
```

```shell
 



# 获取最新flannel
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml


kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kubernetes-dashboard-token | awk '{print $1}')

kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep kubernetes-dashboard-admin-token | awk '{print $1}')
```





```yaml
# https://github.com/flannel-io/flannel/blob/v0.13.0/Documentation/kube-flannel.yml
---
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: psp.flannel.unprivileged
  annotations:
    seccomp.security.alpha.kubernetes.io/allowedProfileNames: docker/default
    seccomp.security.alpha.kubernetes.io/defaultProfileName: docker/default
    apparmor.security.beta.kubernetes.io/allowedProfileNames: runtime/default
    apparmor.security.beta.kubernetes.io/defaultProfileName: runtime/default
spec:
  privileged: false
  volumes:
  - configMap
  - secret
  - emptyDir
  - hostPath
  allowedHostPaths:
  - pathPrefix: "/etc/cni/net.d"
  - pathPrefix: "/etc/kube-flannel"
  - pathPrefix: "/run/flannel"
  readOnlyRootFilesystem: false
  # Users and groups
  runAsUser:
    rule: RunAsAny
  supplementalGroups:
    rule: RunAsAny
  fsGroup:
    rule: RunAsAny
  # Privilege Escalation
  allowPrivilegeEscalation: false
  defaultAllowPrivilegeEscalation: false
  # Capabilities
  allowedCapabilities: ['NET_ADMIN', 'NET_RAW']
  defaultAddCapabilities: []
  requiredDropCapabilities: []
  # Host namespaces
  hostPID: false
  hostIPC: false
  hostNetwork: true
  hostPorts:
  - min: 0
    max: 65535
  # SELinux
  seLinux:
    # SELinux is unused in CaaSP
    rule: 'RunAsAny'
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: flannel
rules:
- apiGroups: ['extensions']
  resources: ['podsecuritypolicies']
  verbs: ['use']
  resourceNames: ['psp.flannel.unprivileged']
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - nodes
  verbs:
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - nodes/status
  verbs:
  - patch
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: flannel
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: flannel
subjects:
- kind: ServiceAccount
  name: flannel
  namespace: kube-system
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: flannel
  namespace: kube-system
---
kind: ConfigMap
apiVersion: v1
metadata:
  name: kube-flannel-cfg
  namespace: kube-system
  labels:
    tier: node
    app: flannel
data:
  cni-conf.json: |
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
  net-conf.json: |
    {
      "Network": "10.244.0.0/16",
      "Backend": {
        "Type": "vxlan"
      }
    }
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: kube-flannel-ds
  namespace: kube-system
  labels:
    tier: node
    app: flannel
spec:
  selector:
    matchLabels:
      app: flannel
  template:
    metadata:
      labels:
        tier: node
        app: flannel
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: kubernetes.io/os
                operator: In
                values:
                - linux
      hostNetwork: true
      priorityClassName: system-node-critical
      tolerations:
      - operator: Exists
        effect: NoSchedule
      serviceAccountName: flannel
      initContainers:
      - name: install-cni
        image: quay.io/coreos/flannel:v0.13.0
        command:
        - cp
        args:
        - -f
        - /etc/kube-flannel/cni-conf.json
        - /etc/cni/net.d/10-flannel.conflist
        volumeMounts:
        - name: cni
          mountPath: /etc/cni/net.d
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
      containers:
      - name: kube-flannel
        image: quay.io/coreos/flannel:v0.13.0
        command:
        - /opt/bin/flanneld
        args:
        - --ip-masq
        - --kube-subnet-mgr
        resources:
          requests:
            cpu: "100m"
            memory: "50Mi"
          limits:
            cpu: "100m"
            memory: "50Mi"
        securityContext:
          privileged: false
          capabilities:
            add: ["NET_ADMIN", "NET_RAW"]
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        volumeMounts:
        - name: run
          mountPath: /run/flannel
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
      volumes:
      - name: run
        hostPath:
          path: /run/flannel
      - name: cni
        hostPath:
          path: /etc/cni/net.d
      - name: flannel-cfg
        configMap:
          name: kube-flannel-cfg
```



# 资料

```shell
# 获取dashbord 相关配置文件
wget https://raw.githubusercontent.com/kubernetes/kubernetes/release-1.18/cluster/addons/dashboard/dashboard-deployment.yaml

https://raw.githubusercontent.com/kubernetes/kubernetes/release-1.18/cluster/addons/dashboard/dashboard-configmap.yaml
```



# 获取token

```shell
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"


eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2dDdXUUhqNDQ3Tlh3YTdSRjJlMWVxRXlHTEVCNnJmRVNScWs1SjBtQ2MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLWZkbXJkIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJkN2ExYTU1OS03ODdlLTQyM2UtODQzMi0yZTk0ZjYwOTM4MGUiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.D9jmSXr9nsD6OjXDeccYNUAGl4n2ZM21_5BrxAbkIBWKJTeAS_Zrh0DMcZmLZZPJZZ1eY0MpBHbKkStIAYr3pBIJDV05HRgU161vCgRlAUUx3R5UO9srXyRlYaYwDmk7ffw9uk-t4nsUbmf5LHFSr7uC02Z_cyFYq0bkiEcLxScwashsJBx1Cbfget227kRKWTxrxz8uXrkC3w-GIJ1D3MaWE3NKU0c2nWuZxZbhul4M8vsl-rh2HSd96hblxVhGGOVLcdCWl-hstegopWOvoaMLpqw8caNHWua_puugoYOdvPFHOYZqXmCaZMVMWOpn6t1Kc7sIyuKgn4G_HO6U2A
```

