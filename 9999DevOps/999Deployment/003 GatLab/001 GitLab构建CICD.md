# GitLab构建CI/CD

miniKube+Docker+GitLab

```shell
# 安装docker 略
 # 添加镜像源 略
cat > /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": [
        "https://registry.docker-cn.com"
    ]
}
EOF

# 构建基础镜像
docker build -t 172.16.244.134:5000/kubectl:1.18.0 . 
docker push 172.16.244.134:5000/kubectl:1.18.0

docker build -t 172.16.244.134:5000/k8s-ci:eureka-server-0.0.2 .

usermod –G 组名 用户名
usermod -G docker docker 

# 搭镜像仓库
sudo docker run \
--name registry \
-p 127.0.0.1:5000:5000 \
-d \
--restart=always \
-v /Users/draven/docker/registry:/var/lib/registry \
registry:latest
# 查看仓库
curl -XGET http://172.16.244.134:5000/v2/_catalog
curl -XGET http://172.16.244.134:5000/v2/镜像名/tags/list


# 安装minikube
# 下载地址
https://github.com/AliyunContainerService/minikube
# 官网版本
https://github.com/kubernetes/minikube/releases/tag/
 # linux
minikube start --image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers \
--cpus=4 \
--memory=4096 \
--vm-driver=none


# dashboard转发
kubectl proxy --port=8001 --address='172.16.244.134' --accept-hosts='^.*' &

# 安装GitLab
mkdir {config,logs,data}
# gitlab
sudo docker run \
--detach \
--hostname 172.16.244.134 \
--publish 443:443 \
--publish 80:80 \
--publish 1022:22 \
--name gitlab \
--restart always \
-d \
--volume /docker/gitlab/config:/etc/gitlab \
--volume /docker/gitlab/logs:/var/log/gitlab \
--volume /docker/gitlab/data:/var/opt/gitlab \
gitlab/gitlab-ce:latest


docker run \
--detach \
--hostname 127.0.0.1 \
--publish 443:443 \
--publish 80:80 \
--publish 1022:22 \
--name gitlab \
--restart always \
-d \
--volume /Users/draven/docker/gitlab/config:/etc/gitlab \
--volume /Users/draven/docker/gitlab/logs:/var/log/gitlab \
--volume /Users/draven/docker/gitlab/data:/var/opt/gitlab \
gitlab/gitlab-ce:latest


# 安装 gitlab-runner
sudo docker run -d --name gitlab-runner --restart always \
-v /Users/draven/docker/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \
gitlab/gitlab-runner:latest


# 可选参数
-p 8093:8093 \

# 注册runner
docker exec -it gitlab-runner /bin/bash
gitlab-runner register

# 实例
sudo gitlab-runner register \
--non-interactive \
--executor "docker" \
--docker-image "127.0.0.1:5000/ali-maven-docker:3.5.4-jdk-8-alpine" \
--url "http://127.0.0.1/" \
--registration-token "foyxtEiRkySr-mhihm2m" \
--description "Docker runner" \
--tag-list "shared-runner" \
--run-untagged \
--locked="false" \
--docker-privileged="false"

# 可添加
--clone-url='http://draven.gitlab.com/root/eureka-server.git' \
--non-interactive


# 关键参数
 # ip
http://172.16.244.134
 # token
6Luxom_KqvkSsps7oWiT


# 部分参数
cd /opt/gitlab/embedded/service/gitlab-rails/config


mkdir -p gitlab/{config,logs,data}
mkdir 

sudo docker run \
--detach \
--hostname 127.0.0.1 \
--publish 127.0.0.1:443:443 --publish 127.0.0.1:80:80 --publish 127.0.0.1:1022:22 \
--restart always \
--name gitlab \
-d \
--volume /Users/draven/docker/gitlab/config:/etc/gitlab \
--volume /Users/draven/docker/gitlab/logs:/var/log/gitlab \
--volume /Users/draven/docker/gitlab/data:/var/opt/gitlab \
gitlab/gitlab-ce:latest


docker build -t 172.16.244.134:5000/ali-maven-docker:3.5.4-jdk-8-alpine . docker push 172.16.244.134:5000/ali-maven-docker:3.5.4-jdk-8-alpine





docker run -d --name gitlab-runner --restart always \
-v /docker/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \
gitlab/gitlab-runner:latest



curl -XGET http://127.0.0.1:5000/v2/_catalog
curl -XGET http://127.0.0.1:5000/v2/镜像名/tags/list

mkdir {config}
   
sudo docker exec -it gitlab-runner /bin/bash
gitlab-runner register


docker run --rm -it -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register


docker run --rm -t -i -v /Users/draven/docker/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register


docker run --rm -v /Users/draven/docker/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image '127.0.0.1:5000/ali-maven-docker:3.5.4-jdk-8-alpine' \
  --url "http://127.0.0.1/" \
  --registration-token "xKSLgGEwmMYR5PvYL4sC" \
  --description "docker-runner" \
  --tag-list "docker" \
  --run-untagged="true" \
  --locked="false" \
  --access-level="not_protected"
  
sudo docker run -idt -v /Users/draven/docker/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register \
  --non-interactive \
  --executor "docker" \
  --docker-image '127.0.0.1:5000/ali-maven-docker:3.5.4-jdk-8-alpine' \
  --url "http://127.0.0.1" \
  --registration-token "1mzU9T66DZgxD94ZzUsh" \
  --description "docker-runner" \
  --tag-list "docker" \
  --run-untagged="true" \
  --locked="false" \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --access-level="not_protected"

sudo gitlab-runner register \
--non-interactive \
--executor "docker" \
--docker-image "127.0.0.1:5000/ali-maven-docker:3.5.4-jdk-8-alpine" \
--url "http://127.0.0.1/" \
--registration-token "1mzU9T66DZgxD94ZzUsh" \
--description "Docker runner" \
--tag-list "shared-runner" \
--run-untagged = true\
--locked="false" \
--docker-privileged="false"


cd /opt/gitlab/embedded/service/gitlab-rails/config

volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache", "/home/john/.m2:/root/.m2"]




docker run --rm -it -v /Users/draven/docker/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register


```



# 附录

## Docker批量操作

```shell
# 方法一：

#显示所有的容器，过滤出Exited状态的容器，取出这些容器的ID，

sudo docker ps -a|grep Exited|awk '{print $1}'

#查询所有的容器，过滤出Exited状态的容器，列出容器ID，删除这些容器

sudo docker rm `docker ps -a|grep Exited|awk '{print $1}'`


# 方法二： 

#删除所有未运行的容器（已经运行的删除不了，未运行的就一起被删除了）

sudo docker rm $(sudo docker ps -a -q)


# 方法三：

#根据容器的状态，删除Exited状态的容器

sudo docker rm $(sudo docker ps -qf status=exited)

 

# 方法四：

#Docker 1.13版本以后，可以使用 docker containers prune 命令，删除孤立的容器。

sudo docker container prune

 批量删除容器
docker rm docker ps -a -q || docker rm $(docker ps -a -q)
2 批量删除镜像
docker rmi docker images -q
3 按条件过滤删除
docker rmi -f docker images | grep '<none>' | awk '{print $3}' #删除名称或标签为none的镜像

docker rmi  $(docker images | grep '<none>'  | awk '{print $3}')


4 查看所有容器id
docker ps -a -q
5 停止所有容器
docker stop $(docker ps -a -q)



#删除所有镜像

sudo docker rmi $(docker images -q)
```

## linux

```shell
groupadd mysql



#1 useradd -g mysql[用户组] mysql[用户名] 

#2 useradd mysql[用户名] -g mysql[用户组]
```



# FAQ

## Docker

```shell
docker: Error response from daemon: OCI runtime create failed
```

## minikube

```shell
 X Sorry, Kubernetes v1.18.0 requires conntrack to be installed in root's path
 
 
yum install conntrack







unable to find user docker: no matching entries in passwd file (docker.go:792:0s)
```

## ci/cd

```shell
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?


# 我们在创建Gitlab_Runner容器的时候，可以自行定义
# 将config.toml中volumes改为：
volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]

# 这样在容器中装载/var/run/docker.sock，使构建的容器保存在宿主机本身的镜像存储中。否则可能会报错误：

gitlab runner Cannot connect to the Docker daemon at unix ///var/run/docker.sock. Is the docker daemon running?

# 参考链接
https://blog.csdn.net/dario_op/article/details/98872977
```





```shell
RUN groupadd docker && useradd docker -g root
```









```shell
kubectl config view --raw -o yaml
作者：笑笑_xxred
链接：https://www.imooc.com/article/293003
来源：慕课网
本文首次发布于慕课网 ，转载请注明出处，谢谢合作
```





cat /opt/gitlab/embedded/service/gitlab-rails/VERSION



gitlab-runner --version





```shell
docker run --rm -it -v gitlab-runner-config:/etc/gitlab-runner gitlab/gitlab-runner:latest register
```
