

```shell


chmod -R 777 /home/docker/

    
docker run -dit --name teamcity-server-instance \
-v /root/data/teamcity_server/datadir:/data/teamcity_server/datadir \
-v /root/data/teamcity_server/logs:/opt/teamcity/logs  \
-p 8111:8111 \
jetbrains/teamcity-server
    
    --restart=always
    
 docker run  --name=iot-team-city-agent -id  -v /root/data/teamcity_agent/conf:/data/teamcity_agent/conf  \
        -e SERVER_URL="http://192.168.73.105:8111" \
        jetbrains/teamcity-agent
```

