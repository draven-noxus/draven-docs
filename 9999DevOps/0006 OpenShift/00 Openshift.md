## Openshift

https://docs.okd.io/latest/install_config/index.html



```shell
# 安装 docker

# 下载 openshift-origin-server-vl.3.0
  tar -zxvf -C /opt/
  
  
  vi /etc/profile
  PATH=$PATH:/opt/openshift
  source /etc/profile
  
  
  # 检查版本
  openshift version
  
  https://master.example.com:8443



  oc version
  
  
  
  
  
  # 命令行
```







```shell
$ oc cluster up

Pulling image openshift/origin:v3.9.0
Pulled 1/4 layers, 26% complete
Pulled 2/4 layers, 53% complete
Pulled 2/4 layers, 91% complete
Pulled 3/4 layers, 87% complete
Pulled 4/4 layers, 100% complete
Extracting
Image pull complete
error: FAIL
   Error: did not detect an --insecure-registry argument on the Docker daemon
   Solution:

     Ensure that the Docker daemon is running with the following argument:
        --insecure-registry 172.30.0.0/16


$ vi /etc/docker/daemon.json
# 新增 172.30.0.0/16
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "insecure-registries":["172.16.244.128:5000","172.30.0.0/16"],
  "registry-mirrors": ["https://zuouzrfh.mirror.aliyuncs.com"]
}



$ oc cluster up --public-hostname=172.16.244.128
# 启动时指定 主机ip
Using nsenter mounter for OpenShift volumes
Using public hostname IP 172.16.244.128 as the host IP
Using 172.16.244.128 as the server IP
Starting OpenShift using openshift/origin:v3.9.0 ...
OpenShift server started.

The server is accessible via web console at:
    https://172.16.244.128:8443

You are logged in as:
    User:     developer
    Password: <any value>

To login as administrator:
    oc login -u system:admin

$ [root@www openshift]# oc login
Authentication required for https://172.16.244.128:8443 (openshift)
Username: developer
Password: developer
Login successful.

You have one project on this server: "myproject"

Using project "myproject"

$ https://www.example.com:8443
developer
developer




oc login 
Authentication required for https://172.16.244.128:8443 (openshift)
Username: admin
Password: admin
Login successful.

oc whoami




oc login -u system:admin -n default









--host-config-dir='/var/lib/origin/openshift.local.config' \
--host-volumes-dir='/var/lib/origin/openshift.local.volumes' \
--host-pv-dir='/var/lib/origin/openshift.local.pv' \
--public-hostname='172.16.244.128'
```







# FQA

## openshift start

```shell

failed to create kubelet: misconfiguration: kubelet cgroup driver: "systemd" is different from docker cgroup driver: "cgroupfs"

vi /etc/docker/daemon.json


"exec-opts": ["native.cgroupdriver=systemd"]

systemctl daemon-reload
systemctl restart docker
systemctl status docker


```





```shell
Scope libcontainer-2839-systemd-test-default-dependencies.scope has no PIDs. Refusing.
```







```shell
        
        
        
        
        --insecure-registry 172.30.0.0/16
```

