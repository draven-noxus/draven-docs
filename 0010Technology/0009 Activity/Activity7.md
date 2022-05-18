# Flowable

1.集成swagger

2.集成modeler



# 使用流程

制作流程图

组件使用（后续补充）

# FAQ

1.单纯集成modeler 存在以下问题

权限问题

获取不到用户问题



2.改用 ACT_DE_MODEL

https://github.com/flowable/flowable-engine/blob/master/modules/flowable-ui-modeler/flowable-ui-modeler-logic/src/main/resources/META-INF/liquibase/flowable-modeler-app-db-changelog.xml

flowable-modeler-app-db-changelog.xml

3.

在整合Flowable的项目中大家肯定会遇到创建表却显示表不存在的错误吧（自己明明在创建怎么可能有嘛…）
大家可以这么做：

当然这句也可以加入到Flowable的配置xml中：

```xml
 <property name="databaseSchemaUpdate" value="true" />
```

如果还是不行，就这样：

就是在数据库的URL后面加上nullCatalogMeansCurrent=true



4. mybatis版本问题-这不是根本原因

Caused by: java.lang.IllegalArgumentException: No enum constant org.apache.ibatis.type.JdbcType.${blobType}

```xml
<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>2.0.1</version>
</dependency>
```

```yaml
mybatis:
  configuration-properties:
      prefix:
      blobType: BLOB
      boolValue: TRUE
```

5. 包扫描问题-无法扫描到mapper.xml

 java.lang.IllegalArgumentException: Mapped Statements collection does not contain value for org.flowable.ui.modeler.domain.Model.selectModelByParameters

```yaml
mybatis:
 mapper-locations: classpath:/META-INF/modeler-mybatis-mappings/**.xml
```

6.No message available-获取不到用户

```java
org.flowable.ui.modeler.service.ModelServiceImpl
```









# 任务拆分

```shell
1. 整合流程设计器
	 已完成，需接入用户操作
2. 整合工作流操作
	 还有许多bug
```

