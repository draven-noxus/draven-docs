## Config-server

命名格式

```yaml
# /{name}-{profiles}.yml
# /{label}/{name}-{profile}.yml

# name 服务名  
# profies 环境
# label 分支（branch）

# 格式
http://ip:port/{application}/{profile}/{label}
# 例如
http://ip:port/config-server/dev/master

# 格式
http://ip:port/{label}{application}-{profile}.json
# 例如
http://ip:port/config-server-dev.yaml
http://ip:port/config-server-dev.properties
http://ip:port/config-server-dev.json
http://ip:port/master/config-server-dev.json
```

```xml
<dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
<dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config-server</artifactId>
</dependency>
```



```java
@EnableDiscoveryClient
@EnableConfigServer
```



```yaml
# github
spring:
 cloud:
  config:
   server:
    git:
     uri:
     username:
     password:
     basedir: # 配置文件拉取到指定位置
env:
 test # 具体环境

# native
spring:
  application:
    name: config-server
  profiles:
    active: native
  cloud:
    config:
      server:
        native:
          search-locations: [ file:/path/]

# 指定eureka注册中心的地址
# 暴露端口
management:
 endpoints:
  web:
   expose: "*"
```

配置webHook 执行动态刷新



## Config-client

```xml
<dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
<dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```



```yaml
# bootstrap.yml
spring:
 cloud:
  config:
    discovery:
     enable: true # 若指定通过服务发现必须填写service-id
     service-id:  # 配置中心名称
    profile: # 指定环境 
 rabbitmq:
  host: ip
  port: 5672
  username: name
  password: password
  

# native
spring:
  application:
    name: resilience4j-demo
  cloud:
    config:
      uri: http://localhost:30000
      fail-fast: true
      profile: native
      discovery:
        enabled: true
        serviceId: config-server
  config: # springboot2.4.1
    import: optional:config-server:http://localhost:30000/
```



```java
// 增加注解
@RefreshScope
```



加密

JCE

key:  '{cipher}加密后字符串'













# FQA

```
INFO 1 --- [nio-8888-exec-4] .c.s.e.MultipleJGitEnvironmentRepository : Cannot pull from remote https://github.com/the-glorious-executione-noxus/draven-projects.git, the working tree is not clean.


https://github.com/spring-cloud/spring-cloud-config/blob/master/docs/src/main/asciidoc/spring-cloud-config.adoc#force-pull-in-git-repositories


spring.cloud.config.server.git.force-pull=true

```





```shell
 .c.s.e.MultipleJGitEnvironmentRepository : Dirty files found: [tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/config/WebSecurityConfig.java, tensquare_parent/tensquare_base/src/main/java/com/noxus/draven/base/controller/exceptions/BaseExceptionHandler.java, tensquare_parent/tensquare_common/pom.xml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/pojo/Channel.java, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/controller/UsergathController.java, changgou_parent/changgou_eureka/src/main/resources/application.yaml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/CommentService.java, tensquare_parent/tensquare_search/src/main/java/com/noxus/draven/search/SearchApplication.java, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-search-dev.yaml, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/pojo/Gathering.java, tensquare_parent/docs/utils/IdWorker(1).java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/config/ApplicationConfig.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/impl/ChannelServiceImpl.java, changgou_parent/changgou_service_api/changgou_service_goods_api/pom.xml, tensquare_parent/tensquare_web/pom.xml, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/pojo/Usergath.java, tensquare_parent/tensquare_common/src/main/java/com/noxus/draven/common/utils/JwtUtil.java, tensquare_parent/tensquare_gathering/src/main/resources/bootstrap.yaml, tensquare_parent/docs/db_qa, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/.DS_Store, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-web-dev.yml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/controller/exceptions/BaseExceptionHandler.java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/clients/impl/LabelClientImpl.java, tensquare_parent/tensquare_search/src/main/java/com/noxus/draven/search/service/ArticleSearchService.java, changgou_parent/changgou_gateway/changgou_gateway_system/src/main/java/com/noxus/draven/gateway/config/IpFilter.java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/repository/ProblemRepository.java, tensquare_parent/tensquare_spit/src/main/java/com/noxus/draven/spit/repository/SpitRepository.java, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/repository/UserRepository.java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/pojo/Pl.java, tensquare_parent/tensquare_user/pom.xml, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-eureka-dev.yaml, tensquare_parent/docs/db_base.sql, changgou_parent/changgou_service/changgou_service_file/src/main/java/com/noxus/draven/file/FileApplication.java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/controller/ProblemController.java, tensquare_parent/tensquare_config/src/main/resources/config/._tensquare?config-dev.yaml5354061741364119452.tmp, tensquare_parent/tensquare_web/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/pojo/.DS_Store, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/config/WebSecurityConfig.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/controller/EnterpriseController.java, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/repository/AdminRepository.java, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/service/GatheringService.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/pojo/Comment.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/repository/ArticleRepository.java, tensquare_parent/tensquare_spit/pom.xml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/.DS_Store, tensquare_parent/tensquare_config/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/service/UsergathService.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/RecruitApplication.java, tensquare_parent/tensquare_eureka/pom.xml, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-qa-dev.yaml, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/controller/GatheringController.java, tensquare_parent/tensquare_common/src/main/java/com/noxus/draven/common/entity/PageResult.java, changgou_parent/changgou_eureka/pom.xml, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/.DS_Store, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/pojo/Admin.java, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/repository/UsergathRepository.java, tensquare_parent/tensquare_friend/pom.xml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/repository/CommentRepository.java, tensquare_parent/tensquare_common/src/main/java/com/noxus/draven/common/CommonApplication.java, tensquare_parent/tensquare_config/src/main/java/com/noxus/draven/config/ConfigServerApplication.java, tensquare_parent/tensquare_base/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/ArticleService.java, tensquare_parent/tensquare_base/src/main/java/com/noxus/draven/base/service/LabelService.java, changgou_parent/changgou_eureka/src/main/java/com/noxus/draven/goods/EurekaApplication.java, tensquare_parent/docs/db_recruit, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/pojo/Problem.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/repository/EnterpriseRepository.java, tensquare_parent/tensquare_base/src/main/java/com/noxus/draven/base/BaseApplication.java, tensquare_parent/tensquare_eureka/src/main/.DS_Store, changgou_parent/changgou_service/changgou_service_goods/src/main/resources/application.yaml, tensquare_parent/tensquare_search/src/main/java/com/noxus/draven/search/pojo/Article.java, tensquare_parent/tensquare_manager/pom.xml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/impl/ColumnServiceImpl.java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/QAApplication.java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/clients/LabelClient.java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/service/impl/ProblemServiceImpl.java, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/controller/AsminController.java, .gitignore, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/.DS_Store, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/pojo/Friend.java, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/repository/NoFriendRepository.java, tensquare_parent/tensquare_article/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/repository/FriendRepository.java, tensquare_parent/tensquare_article/.DS_Store, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-base-dev.yaml, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/service/impl/UsergathServiceImpl.java, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/pojo/NoFriend.java, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/controller/UserController.java, tensquare_parent/tensquare_article/src/main/java/com/.DS_Store, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/repository/ColumnRepository.java, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-eureka-native.yaml, tensquare_parent/tensquare_spit/src/main/java/com/noxus/draven/spit/service/SpitService.java, tensquare_parent/tensquare_sms/pom.xml, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-spit-dev.yaml, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-manager-dev.yaml, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/service/impl/FriendServiceImpl.java, tensquare_parent/tensquare_search/src/main/java/com/noxus/draven/search/repository/ArticleSearchRepository.java, tensquare_parent/tensquare_article/src/.DS_Store, tensquare_parent/tensquare_common/src/main/java/com/noxus/.DS_Store, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/service/FriendService.java, tensquare_parent/docs/db_gathering, tensquare_parent/tensquare_spit/src/main/java/com/noxus/draven/spit/pojo/Spit.java, tensquare_parent/tensquare_web/src/main/java/com/boxus/draven/web/config/filter/WebFilter.java, tensquare_parent/tensquare_spit/src/main/java/com/noxus/draven/spit/SpitApplication.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/.DS_Store, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/filter/JwtFilter.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/pojo/Recruit.java, changgou_parent/changgou_service/changgou_service_file/src/main/resources/fdfs_client.conf, tensquare_parent/tensquare_gathering/pom.xml, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/pojo/Enterprise.java, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/clients/UserClient.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/.DS_Store, tensquare_parent/tensquare_base/pom.xml, tensquare_parent/tensquare_web/src/main/java/com/boxus/draven/web/WebApplication.java, changgou_parent/changgou_service/changgou_service_goods/src/main/java/com/noxus/draven/goods/mapper/BrandMapper.java, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/config/ApplicationConfig.java, tensquare_parent/tensquare_common/src/main/java/com/noxus/draven/common/utils/IdWorker.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/impl/ArticleServiceImpl.java, tensquare_parent/tensquare_config/src/main/resources/config/tensquare?config-dev.yaml, tensquare_parent/tensquare_eureka/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/controller/TestController.java, tensquare_parent/tensquare_common/src/main/java/com/noxus/draven/common/entity/StatusCode.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/ArticleApplication.java, tensquare_parent/tensquare_manager/src/main/java/com/noxus/draven/manager/config/filter/ManagerFilter.java, tensquare_parent/tensquare_base/src/main/java/com/noxus/draven/base/controller/LabelController.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/controller/ColumnController.java, tensquare_parent/docs/db_article.sql, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/pojo/Follow.java, tensquare_parent/tensquare_search/src/main/java/com/noxus/draven/search/controller/ArticleSearchController.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/repository/ChannelRepository.java, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/config/ApplicationConfig.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/ChannelService.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/service/EnterpriseService.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/utils/application.yaml, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/controller/RecruitController.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/controller/exceptions/BaseExceptionHandler.java, changgou_parent/changgou_service/changgou_service_goods/src/main/java/com/noxus/draven/goods/service/impl/BrandServiceImpl.java, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/service/impl/AdminServiceImpl.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/controller/ChannelController.java, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/FriendApplication.java, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/service/UserService.java, tensquare_parent/docs/utils/SmsUtil.java, tensquare_parent/tensquare_qa/pom.xml, tensquare_parent/tensquare_base/src/main/java/com/noxus/draven/base/service/impl/LabelServiceImpl.java, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/service/impl/UserServiceImpl.java, tensquare_parent/tensquare_base/src/main/java/com/noxus/draven/base/pojo/Label.java, tensquare_parent/tensquare_common/src/main/java/com/noxus/draven/common/entity/Result.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/service/impl/RecruitServiceImpl.java, tensquare_parent/tensquare_base/src/main/java/com/noxus/draven/base/repository/LabelRepository.java, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/filter/JwtFilter.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/repository/RecruitRepository.java, tensquare_parent/tensquare_article/pom.xml, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/service/AdminService.java, tensquare_parent/docs/db_user, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/service/impl/GatheringServiceImpl.java, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/controller/exceptions/BaseExceptionHandler.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/service/RecruitService.java, tensquare_parent/docs/utils/JwtUtil.java, tensquare_parent/tensquare_eureka/src/main/resources/application.yaml, tensquare_parent/.DS_Store, tensquare_parent/tensquare_spit/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/ColumnService.java, tensquare_parent/tensquare_spit/src/main/java/com/noxus/draven/spit/service/impl/SpitServiceImpl.java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/pojo/Column.java, tensquare_parent/tensquare_config/pom.xml, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/filter/JwtFilter.java, tensquare_parent/tensquare_sms/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_sms/src/main/java/com/noxus/draven/sms/config/SmsListener.java, tensquare_parent/tensquare_user/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/GatheringApplication.java, tensquare_parent/docs/utils/WebSecurityConfig(1).java, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/pojo/Article.java, tensquare_parent/tensquare_config/src/main/resources/.DS_Store, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-article-dev.yaml, README.md, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/controller/ArticleController.java, tensquare_parent/tensquare_manager/src/main/resources/bootstrap.yaml, changgou_parent/changgou_gateway/changgou_gateway_system/src/main/resources/application.yaml, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/UserApplication.java, tensquare_parent/pom.xml, tensquare_parent/tensquare_config/src/main/resources/config/tensquare?config-native.yaml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/controller/CommentController.java, tensquare_parent/tensquare_recruit/src/main/java/com/noxus/draven/recruit/service/impl/EnterpriseServiceImpl.java, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-article-native.yaml, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/service/ProblemService.java, tensquare_parent/docs/db_friend, tensquare_parent/tensquare_eureka/src/main/java/com/noxus/draven/eureka/EurekaServerApplication.java, tensquare_parent/tensquare_gathering/src/main/java/com/noxus/draven/gathering/repository/GatheringRepository.java, tensquare_parent/tensquare_search/src/main/java/com/noxus/draven/search/service/impl/ArticleSearchServiceImpl.java, tensquare_parent/tensquare_eureka/tensquare_eureka.iml, tensquare_parent/tensquare_article/src/main/java/com/noxus/draven/article/service/impl/CommentServiceImpl.java, tensquare_parent/tensquare_manager/src/main/java/com/noxus/draven/manager/ManagerApplication.java, tensquare_parent/tensquare_spit/src/main/java/com/noxus/draven/spit/controller/SpitController.java, tensquare_parent/tensquare_base/.DS_Store, tensquare_parent/tensquare_recruit/pom.xml, tensquare_parent/tensquare_recruit/src/main/resources/bootstrap.yaml, tensquare_parent/tensquare_search/pom.xml, tensquare_parent/tensquare_user/src/main/java/com/noxus/draven/user/pojo/User.java, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-sms-dev.yml, tensquare_parent/tensquare_search/src/main/resources/bootstarp.yaml, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-recruit-dev.yaml, tensquare_parent/tensquare_sms/src/main/java/com/noxus/draven/sms/SmsApplication.java, tensquare_parent/tensquare_qa/src/main/resources/bootstrap.yaml, changgou_parent/.gitignore, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-friend-dev.yaml, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-user-dev.yml, tensquare_parent/tensquare_config/src/main/resources/config/tensquare-gathering-dev.yaml, tensquare_parent/tensquare_qa/src/main/java/com/noxus/draven/qa/config/WebSecurityConfig.java, tensquare_parent/tensquare_friend/src/main/java/com/noxus/draven/friend/controller/FriendController.java]

```



