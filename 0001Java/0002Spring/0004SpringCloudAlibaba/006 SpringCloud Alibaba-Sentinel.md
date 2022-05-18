# Spring Cloud Alibaba Sentinel



```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```



```yaml
spring:
  cloud:
    sentinel:
      transport:
        port: 8719
        dashboard: localhost:8080

```



```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```



```yaml
spring:
  cloud:
    sentinel:
      transport:
        port: 8719
        dashboard: localhost:8080
        
feign:
  sentinel:
    enabled: true
```





```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```







```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
</dependency>
```



# 数据持久化

```shell
# 三种模式
# 1.原始模式
	# 内存
	# 扩展写数据源 WritableDataSource
	
# 2. pull模式
  # Client主动拉取
  # RDBMS file 等
	# 扩展写数据源 WritableDataSource
	
# 3. push模式
	# 扩展读数据源 
	# 规则中心统一推送
	# 能够保证更好的实时性和一致性
	# Nacos Zookeeper Apollo
```



## 使用文件配置规则

```xml
<dependency>
  <groupId>com.alibaba.csp</groupId>
  <artifactId>sentinel-datasource-extension</artifactId>
</dependency>
```



## 注册中心Nacos

### Sentinel

```xml
<!-- 见代码-->
<dependency>
  <groupId>com.alibaba.csp</groupId>
  <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```

### 客户端

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
<dependency>
  	<groupId>com.alibaba.cloud</groupId>
 	 <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
<dependency>
 	 <groupId>com.alibaba.cloud</groupId>
  	<artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```



```yaml
# 这里是通用配置
# 指定sentinel规则配置链接
nacos:
  server-addr: 127.0.0.1:8848
  username: nacos
  password: nacos
  namespace: native-group

spring:
  application:
    name: alibaba-provider
  profiles:
    active: native
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yaml
        group: NATIVE_GROUP
        #namespace: 7d7282e8-1906-460e-8729-0492358c4b2b
        namespace: native-group
        extension-configs[0]: # 括号内的值越大优先级越高
          refresh: true # 自动刷新
          data-id: redis.yaml # 扩展文件名称
          group: NATIVE_GROUP # 分组
        shared-configs[0]:
          data-id: mysql.yaml
          group: NATIVE_GROUP
          refresh: true
        username: nacos
        password: nacos
      discovery:
        server-addr: 127.0.0.1:8848
        service: ${spring.application.name}
        group: NATIVE_GROUP
        #namespace: 7d7282e8-1906-460e-8729-0492358c4b2b
        namespace: native-group
        #        ip: 116.196.77.250
        #        port: 8848
        #
        username: nacos
        password: nacos
    # 开始配置sentinel相关
    sentinel:
      transport:
        port: 8719
        client-ip: localhost
        dashboard: localhost:8849
      eager: true
      datasource:
        flow:
          nacos:
            server-addr: localhost:8848
            namespace: native-group
            group-id: NATIVE_GROUP
#            username: nacos
#            password: nacos
            data-id: ${spring.application.name}-flow-rules
            # 规则类型，取值见：
            # org.springframework.cloud.alibaba.sentinel.datasource.RuleType
            rule-type: flow
            data-type: json
        degrade:
          nacos:
            server-addr: ${nacos.server-addr}
            username: ${nacos.username}
            password: ${nacos.password}
            namespace: ${nacos.namespace}
            groupId: NATIVE_GROUP
            dataId: ${spring.application.name}-degrade-rules
            rule-type: degrade
          param-flow:
            nacos:
              server-addr: ${nacos.server-addr}
              username: ${nacos.username}
              password: ${nacos.password}
              namespace: ${nacos.namespace}
              groupId: NATIVE_GROUP
              dataId: ${spring.application.name}-param-rules
              rule-type: param-flow
          system:
            nacos:
              server-addr: ${nacos.server-addr}
              username: ${nacos.username}
              password: ${nacos.password}
              namespace: ${nacos.namespace}
              groupId: NATIVE_GROUP
              dataId: ${spring.application.name}-system-rules
              rule-type: system
          authority:
            nacos:
              server-addr: ${nacos.server-addr}
              username: ${nacos.username}
              password: ${nacos.password}
              namespace: ${nacos.namespace}
              groupId: NATIVE_GROUP
              dataId: ${spring.application.name}-authority-rules
              rule-type: authority
     # 结束配置
```



# 环境搭建

## Dashboard

```shell
# 参考资料
# https://github.com/alibaba/Sentinel/releases
```

### Linux

```shell
java -Dserver.port=8080 -Dcsp.sentinel.dashboard.server=localhost:8080 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard.jar
```

### Docker

```shell
docker run --name sentinel-dashboard -p 8858:8080 -d sentinel-dashboard:1.8.0
```

Dockerfile

```dockerfile
FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD sentinel-dashboard.jar app.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
```



# 环境示例

```java
/**
 * 限流规则获取
 */
@Component("flowRuleNacosProvider")
public class FlowRuleNacosProvider implements DynamicRuleProvider<List<FlowRuleEntity>> {

    @Autowired
    private ConfigService configService;
    @Autowired
    private Converter<String, List<FlowRuleEntity>> converter;

    @Override
    public List<FlowRuleEntity> getRules(String appName) throws Exception {
        String rules = configService.getConfig(appName + NacosConfigUtil.FLOW_DATA_ID_POSTFIX,
            NacosConfigUtil.GROUP_ID, 3000);
        if (StringUtil.isEmpty(rules)) {
            return new ArrayList<>();
        }
        return converter.convert(rules);
    }
}


/**
 * 限流规则推送
 */
@Component("flowRuleNacosPublisher")
public class FlowRuleNacosPublisher implements DynamicRulePublisher<List<FlowRuleEntity>> {

    @Autowired
    private ConfigService configService;
    @Autowired
    private Converter<List<FlowRuleEntity>, String> converter;

    @Override
    public void publish(String app, List<FlowRuleEntity> rules) throws Exception {
        AssertUtil.notEmpty(app, "app name cannot be empty");
        if (rules == null) {
            return;
        }
        configService.publishConfig(app + NacosConfigUtil.FLOW_DATA_ID_POSTFIX,
            NacosConfigUtil.GROUP_ID, converter.convert(rules));
    }
}


/* 针对流控规则 crud 与 nacos交互
 * 默认是基于内存 使用nacos取代
 * Copyright 1999-2018 Alibaba Group Holding Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.alibaba.csp.sentinel.dashboard.controller.v2;

import com.alibaba.csp.sentinel.dashboard.auth.AuthAction;
import com.alibaba.csp.sentinel.dashboard.auth.AuthService;
import com.alibaba.csp.sentinel.dashboard.auth.AuthService.PrivilegeType;
import com.alibaba.csp.sentinel.dashboard.datasource.entity.rule.FlowRuleEntity;
import com.alibaba.csp.sentinel.dashboard.domain.Result;
import com.alibaba.csp.sentinel.dashboard.repository.rule.InMemoryRuleRepositoryAdapter;
import com.alibaba.csp.sentinel.dashboard.rule.DynamicRuleProvider;
import com.alibaba.csp.sentinel.dashboard.rule.DynamicRulePublisher;
import com.alibaba.csp.sentinel.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Flow rule controller (v2).
 *
 * @author Eric Zhao
 * @since 1.4.0
 */
@RestController
@RequestMapping(value = "/v2/flow")
public class FlowControllerV2 {

    private final Logger logger = LoggerFactory.getLogger(FlowControllerV2.class);

    @Autowired
    private InMemoryRuleRepositoryAdapter<FlowRuleEntity> repository;

/*
    @Autowired
    @Qualifier("flowRuleDefaultProvider")
    private DynamicRuleProvider<List<FlowRuleEntity>> ruleProvider;
    @Autowired
    @Qualifier("flowRuleDefaultPublisher")
    private DynamicRulePublisher<List<FlowRuleEntity>> rulePublisher;
*/

    @Autowired
    @Qualifier("flowRuleNacosProvider")
    private DynamicRuleProvider<List<FlowRuleEntity>> ruleProvider;
    @Autowired
    @Qualifier("flowRuleNacosPublisher")
    private DynamicRulePublisher<List<FlowRuleEntity>> rulePublisher;

    @GetMapping("/rules")
    @AuthAction(PrivilegeType.READ_RULE)
    public Result<List<FlowRuleEntity>> apiQueryMachineRules(@RequestParam String app) {

        if (StringUtil.isEmpty(app)) {
            return Result.ofFail(-1, "app can't be null or empty");
        }
        try {
            List<FlowRuleEntity> rules = ruleProvider.getRules(app);
            if (rules != null && !rules.isEmpty()) {
                for (FlowRuleEntity entity : rules) {
                    entity.setApp(app);
                    if (entity.getClusterConfig() != null && entity.getClusterConfig().getFlowId() != null) {
                        entity.setId(entity.getClusterConfig().getFlowId());
                    }
                }
            }
            rules = repository.saveAll(rules);
            return Result.ofSuccess(rules);
        } catch (Throwable throwable) {
            logger.error("Error when querying flow rules", throwable);
            return Result.ofThrowable(-1, throwable);
        }
    }

    private <R> Result<R> checkEntityInternal(FlowRuleEntity entity) {
        if (entity == null) {
            return Result.ofFail(-1, "invalid body");
        }
        if (StringUtil.isBlank(entity.getApp())) {
            return Result.ofFail(-1, "app can't be null or empty");
        }
        if (StringUtil.isBlank(entity.getLimitApp())) {
            return Result.ofFail(-1, "limitApp can't be null or empty");
        }
        if (StringUtil.isBlank(entity.getResource())) {
            return Result.ofFail(-1, "resource can't be null or empty");
        }
        if (entity.getGrade() == null) {
            return Result.ofFail(-1, "grade can't be null");
        }
        if (entity.getGrade() != 0 && entity.getGrade() != 1) {
            return Result.ofFail(-1, "grade must be 0 or 1, but " + entity.getGrade() + " got");
        }
        if (entity.getCount() == null || entity.getCount() < 0) {
            return Result.ofFail(-1, "count should be at lease zero");
        }
        if (entity.getStrategy() == null) {
            return Result.ofFail(-1, "strategy can't be null");
        }
        if (entity.getStrategy() != 0 && StringUtil.isBlank(entity.getRefResource())) {
            return Result.ofFail(-1, "refResource can't be null or empty when strategy!=0");
        }
        if (entity.getControlBehavior() == null) {
            return Result.ofFail(-1, "controlBehavior can't be null");
        }
        int controlBehavior = entity.getControlBehavior();
        if (controlBehavior == 1 && entity.getWarmUpPeriodSec() == null) {
            return Result.ofFail(-1, "warmUpPeriodSec can't be null when controlBehavior==1");
        }
        if (controlBehavior == 2 && entity.getMaxQueueingTimeMs() == null) {
            return Result.ofFail(-1, "maxQueueingTimeMs can't be null when controlBehavior==2");
        }
        if (entity.isClusterMode() && entity.getClusterConfig() == null) {
            return Result.ofFail(-1, "cluster config should be valid");
        }
        return null;
    }

    @PostMapping("/rule")
    @AuthAction(value = AuthService.PrivilegeType.WRITE_RULE)
    public Result<FlowRuleEntity> apiAddFlowRule(@RequestBody FlowRuleEntity entity) {

        Result<FlowRuleEntity> checkResult = checkEntityInternal(entity);
        if (checkResult != null) {
            return checkResult;
        }
        entity.setId(null);
        Date date = new Date();
        entity.setGmtCreate(date);
        entity.setGmtModified(date);
        entity.setLimitApp(entity.getLimitApp().trim());
        entity.setResource(entity.getResource().trim());
        try {
            entity = repository.save(entity);
            publishRules(entity.getApp());
        } catch (Throwable throwable) {
            logger.error("Failed to add flow rule", throwable);
            return Result.ofThrowable(-1, throwable);
        }
        return Result.ofSuccess(entity);
    }

    @PutMapping("/rule/{id}")
    @AuthAction(AuthService.PrivilegeType.WRITE_RULE)

    public Result<FlowRuleEntity> apiUpdateFlowRule(@PathVariable("id") Long id,
                                                    @RequestBody FlowRuleEntity entity) {
        if (id == null || id <= 0) {
            return Result.ofFail(-1, "Invalid id");
        }
        FlowRuleEntity oldEntity = repository.findById(id);
        if (oldEntity == null) {
            return Result.ofFail(-1, "id " + id + " does not exist");
        }
        if (entity == null) {
            return Result.ofFail(-1, "invalid body");
        }

        entity.setApp(oldEntity.getApp());
        entity.setIp(oldEntity.getIp());
        entity.setPort(oldEntity.getPort());
        Result<FlowRuleEntity> checkResult = checkEntityInternal(entity);
        if (checkResult != null) {
            return checkResult;
        }

        entity.setId(id);
        Date date = new Date();
        entity.setGmtCreate(oldEntity.getGmtCreate());
        entity.setGmtModified(date);
        try {
            entity = repository.save(entity);
            if (entity == null) {
                return Result.ofFail(-1, "save entity fail");
            }
            publishRules(oldEntity.getApp());
        } catch (Throwable throwable) {
            logger.error("Failed to update flow rule", throwable);
            return Result.ofThrowable(-1, throwable);
        }
        return Result.ofSuccess(entity);
    }

    @DeleteMapping("/rule/{id}")
    @AuthAction(PrivilegeType.DELETE_RULE)
    public Result<Long> apiDeleteRule(@PathVariable("id") Long id) {
        if (id == null || id <= 0) {
            return Result.ofFail(-1, "Invalid id");
        }
        FlowRuleEntity oldEntity = repository.findById(id);
        if (oldEntity == null) {
            return Result.ofSuccess(null);
        }

        try {
            repository.delete(id);
            publishRules(oldEntity.getApp());
        } catch (Exception e) {
            return Result.ofFail(-1, e.getMessage());
        }
        return Result.ofSuccess(id);
    }

    private void publishRules(/*@NonNull*/ String app) throws Exception {
        List<FlowRuleEntity> rules = repository.findAllByApp(app);
        rulePublisher.publish(app, rules);
    }
}

```

