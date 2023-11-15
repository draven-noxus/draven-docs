# Arthas

```ini
arthas-tunnel-server-3.5.2-fatjar.jar



arthas-boot.jar
```





# Web Console

## arthas-boot

```shell
java -jar arthas-boot
# attach之后
		## arthas只listen 127.0.0.1
# 访问ip：http://127.0.0.1:3658/
# 没有AgentId
```

## arthas tunnel server

```shell
java -jar  arthas-tunnel-server.jar

http://127.0.0.1:8080/

http://127.0.0.1:8080/actuator/arthas

as.sh --tunnel-server 'ws://127.0.0.1:7777/ws'

# 
java -jar  arthas-tunnel-server.jar --tunnel-server 'ws://127.0.0.1:7777/ws'

# --telnet-port 9999 指定暴露ip
$ java -jar arthas-boot.jar --tunnel-server 'ws://127.0.0.1:7777/ws' --http-port -1 --telnet-port 9999



```

```shell
https://blog.csdn.net/alitech2017/article/details/113990603


# demo dockerfile
FROM openjdk:8-jdk-alpine
ADD target/*.jar app.jar
# copy arthas
COPY --from=hengyunabc/arthas:latest /opt/arthas /opt/arthas
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
MAINTAINER Montos 1367654518@qq.com
```

