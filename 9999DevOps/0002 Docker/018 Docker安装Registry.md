# Registry

```shell
# 获取镜像
docker pull registry
# 修改标记（可不执行）
docker tag docker.io/registry registry
# 运行容器
docker run -di --name=registry --restart=always -p 5000:5000 registry
# 测试是否运行
http://IP:port/v2/_catalog 
# 服务器测试
curl http://localhost:5000/v2/_catalog
# 示例（浏览器测试）
http://192.168.200.134:5000/v2/_catalog   --->{"repositories":[]}

# 修改daemon.json（若没有请创建）
# 默认docker-registry只允许https提交镜像，如下配置使docker-registry支持http
 vi /etc/docker/daemon.json 
 {"insecure-registries":["ip:port"]}
# 示例
vi /etc/docker/daemon.json
{"insecure-registries：["192.168.200.134:5000"]}
# 开启远程访问
vi /lib/systemd/system/docker.service
# 新增配置
-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock
# 重启服务
systemctl daemon-reload
systemctl restart docker
# 重启私服服务器
docker start registry
# 标记镜像
docker tag jdk1.8 192.168.200.134:5000/jdk1.8
# 上传镜像
docker push 192.168.200.134:5000/jdk1.8
```



