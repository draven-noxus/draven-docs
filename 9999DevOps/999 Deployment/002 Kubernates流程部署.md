# Kubernates

Gitlab

maven

Jenkins

Scripts

git maven构建 发布到指定服务器 调用脚本



先停止 在启动-服务间断

环境不可控

多次构建





git 

maven 

buid image 

push image 

k8s deploy

HealthCheck





环境稳定

服务不间断

一次构建多环境运行



## cicd语法

```shell
node{
  env.BUILD_DIR = "/root/build-workspace/"
  env.MODULE = "web-demo"
	stage(){
		git from ''
	}
	stage("mvn clean"){
	  sh "mvn -pl web-demo -am clean package"
	}
	stage("build image"){
	  sh "root/script/build-image-web.sh"
	}
}
```



 

```shell
#!/bin/bash
if [ "${BUILD_DIR}" == ""]; then
  echo "env 'BUILD_DIR' is not set"
  exit 1
fi

DOCKER_DIR = ${BUILD_DIR}/${JOB_NAME}

if [ "${DOCKER_DIR}" == ""]; then
  echo "env 'DOCKER_DIR' is not set"
  mkdir -p ${DOCKER_DIR}
fi

echo "env 'DOCKER_DIR': ${DOCKER_DIR}"

JENKINS_DIR = ${WORKSPACE}/${MODULE}
echo "env jenkins workspace': ${JENKINS_DIR}"

if [! -f ${JENKINS_DIR}/target/*.war ]; then
echo "target war not found: ${JENKINS_DIR}/target/*.war"
exit
fi

cd ${DOCKER_DIR}
rm -fr *
unzip -oq ${JENKINS_DIR}/target/*.war -d ./ROOT

cp ${JENKINS_DIR}/Dockerfile.


if [ -d  ${JENKINS_DIR}/dockerfiles ] ;then 
 cp ${JENKINS_DIR}/dockerfiles .
fi

VERSION = $(dat2 + %Y%m%d%H%M%S)

IMAGE_NAME = hub.mooc.com/k8s/${JOB_HOME}:${VERSION}

echo "images name : ${IMAGE_NAME}"

docker build -t  ${IMAGE_NAME} .

docker push ${IMAGE_NAME}


```



## settings.xml

```xml
<server>
	<id>192.168.99.224</id>       
	<username>管理镜像的账号</username>
	<password>管理镜像的密码</password>
</server>
```



## pom.xml

```xml
 <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
        <docker.repostory>116.196.77.250:808</docker.repostory>
        <docker.registry.name>library</docker.registry.name>
    </properties>

<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.noxus.draven.k8s.EurekaApplication</mainClass>
                    <executable>true</executable>
                    <includeSystemScope>true</includeSystemScope>

                </configuration>
            </plugin>
<plugin>
                <groupId>com.spotify</groupId>
                <artifactId>docker-maven-plugin</artifactId>
                <version>1.0.0</version>
                <configuration>
                    <imageName>${docker.repostory}/${docker.registry.name}/${project.artifactId}:${project.version}
                    </imageName>
                    <!-- 指定Dockerfile所在的路径 -->

                    <dockerDirectory>${project.basedir}</dockerDirectory>
                    <dockerHost>http://116.196.77.250:2375</dockerHost>
                    <resources>
                        <resource>
                            <targetPath>/</targetPath>
                            <directory>${project.build.directory}</directory>
                            <include>${project.build.finalName}.jar</include>
                        </resource>
                    </resources>
                    <serverId>d116.196.77.250:808</serverId>
                    <registryUrl>${docker.repostory}</registryUrl>
                    <pushImage>true</pushImage>
                  <buildArgs>                     <JAR_FILE>./target/${project.build.finalName}.jar</JAR_FILE>
                    </buildArgs>
                </configuration>
            </plugin>
        </plugins>
    </build>
```



```shell
mvn clean package docker:build -e
```



```yaml
# eureka-statefulset.yaml
---
apiVersion: v1
kind: Service
metadata:
  name: eureka-service-test
  labels:
    app: eureka-service-test
spec:
  ports:
    - port: 9007                                    # service对外提供服务的端口
      targetPort: 9007 
      nodePort: 32007
      name: eureka-service-test
  # clusterIP: None
  type: NodePort
  selector:
    app: eureka-service-test
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: eureka-service-test
spec:
  serviceName: "eureka-service-test"
  replicas: 3
  selector:
    matchLabels:
      app: eureka-service-test
  template:
    metadata:
      labels:
        app: eureka-service-test
    spec:
      containers:
        - name: eureka-service-test
          image: 116.196.77.250:808/libr===ary/noxus-draven-k8s-demos:0.0.1-SNAPSHOT
          ports:
            - containerPort: 9007
          resources:
            limits:
              # jvm会自动发现该限制
              memory: 512Mi
          env:
            - name: MY_POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: JAVA_OPTS
              value: -XX:+UnlockExperimentalVMOptions
                -XX:+UseCGroupMemoryLimitForHeap
                -XX:MaxRAMFraction=2
                -XX:CICompilerCount=8
                -XX:ActiveProcessorCount=8
                -XX:+UseG1GC
                -XX:+AggressiveOpts
                -XX:+UseFastAccessorMethods
                -XX:+UseStringDeduplication
                -XX:+UseCompressedOops
                -XX:+OptimizeStringConcat
            - name: EUREKA_SERVER
              value: "http://eureka-service-test-0.eureka-service-test:9007/eureka/,http://eureka-service-test-1.eureka-service-test:9007/eureka/,http://eureka-service-test-2.eureka-service-test:9007/eureka/"
            - name: EUREKA_INSTANCE_HOSTNAME
              value: ${MY_POD_NAME}.eureka
  podManagementPolicy: "Parallel"
```

```csharp
              value: "http://**:****@eureka-0.eureka:8769/eureka/,http://**:****@eureka-1.eureka:8769/eureka/,http://**:****@eureka-2.eureka:8769/eureka/"
              value: "http://eureka-service-test-0.eureka-service-test:9007/eureka/,http://eureka-service-test-1.eureka-service-test:9007/eureka/,http://eureka-service-test-2.eureka-service-test:9007/eureka/"
                
```

# FAQ

## Docker开启远程访问

```shell
# error
Caused by: org.apache.http.conn.HttpHostConnectException: Connect to 116.196.77.250:2375 [/116.196.77.250] failed: Connection refused (Connection refused)

# 
vi /lib/systemd/system/docker.service

# centos 7
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock

# centos7以下
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375

systemctl daemon-reload

systemctl restart docker

curl http://localhost:2375/verion
```

## http访问

```shell
# error
Get https://116.196.77.250:808/v2/: http: server gave HTTP response to HTTPS client

vi /etc/docker/daemon.json


# 没有配置加速器的

# 单个私服的写法
{
    "insecure-registries": ["registry的IP地址:端口号"]
}
# 多个私服的写法
{
    "insecure-registries": ["registry1的IP地址:端口号","registry2的IP地址:端口号"]
}

# 配置加速器的

# 单个私服的写法
{
    "registry-mirrors": ["http://f1361db2.m.daocloud.io"],
    "insecure-registries": ["registry的IP地址:端口号"]
}
# 多个私服的写法
{
    "registry-mirrors": ["http://f1361db2.m.daocloud.io"],
    "insecure-registries": ["registry1的IP地址:端口号","registry2的IP地址:端口号"]
}


systemctl daemon-reload
systemctl restart docker
systemctl enable docker

# 访问
http://116.196.77.250:808/v2/
```

## 权限不足

```shell
Caused by: com.spotify.docker.client.exceptions.DockerException: denied: requested access to the resource is denied
# 需要登录
# docker login [IP地址或域名](Harbor地址,harbor.cfg文件中的hostname项)
docker login harbor:port
username:
password:

```





```shell
Request error: POST http://116.196.77.250:2375/build?t=116.196.77.250%3A808%2Flibrary%2Fnoxus-draven-k8s-demos%3A0.0.1-SNAPSHOT: 500, body: {"message":"Cannot locate specified Dockerfile: Dockerfile"}
```







```shell
# 推送命令
docker tag SOURCE_IMAGE[:TAG] 116.196.77.250:808/library/IMAGE[:TAG]

docker push 116.196.77.250:808/library/IMAGE[:TAG]

docker push 116.196.77.250:808/library/noxus-draven-k8s-demos:0.0.1-SNAPSHOT



# 未知原因
Failed to execute goal com.spotify:docker-maven-plugin:1.0.0:build (default-cli) on project noxus-draven-k8s-demos: Exception caught: received unexpected HTTP status: 502 Bad Gateway -> [Help 1]
org.apache.maven.lifecycle.LifecycleExecutionException: Failed to execute goal com.spotify:docker-maven-plugin:1.0.0:build (default-cli) on project noxus-draven-k8s-demos: Exception caught




```

