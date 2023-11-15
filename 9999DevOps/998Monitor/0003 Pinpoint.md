# Pinpoint

```html
https://github.com/pinpoint-apm

https://github.com/pinpoint-apm/pinpoint-docker

https://pinpoint-apm.gitbook.io/pinpoint/
```



## Docker

```shell
git clone https://github.com/pinpoint-apm/pinpoint-docker.git

cd pinpoint-docker
# 切換至指定版本 git checkout {tag}
docker-compose pull

docker-compose -f docker-compose.yml -f docker-compose-metric.yml up -d
```





```shell
# 下载 agent 
https://github.com/pinpoint-apm/pinpoint/releases/latest
$ java -jar -javaagent:pinpoint-agent-2.2.1/pinpoint-bootstrap.jar -Dpinpoint.agentId=test-agent -Dpinpoint.applicationName=TESTAPP pinpoint-quickstart-testapp-2.2.1.jar

#Idea集成
-javaagent:$PATH\agent\pinpoint-agent-2.5.3/pinpoint-bootstrap.jar -Dpinpoint.agentId=test-agent -Dpinpoint.applicationName=ibp-its-hc-wind
```

