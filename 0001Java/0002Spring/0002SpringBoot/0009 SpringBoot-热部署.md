# Spring-boot-devtools

## Idea 配置热部署

1、首先我们先添加依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <optional>true</optional>
  <scope>true</scope>
</dependency>
```

2、然后我们在添加插件支持

```xml
<plugin>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-maven-plugin</artifactId>
	<configuration>
    <fork>true</fork>
    <addResources>true</addResources>
	</configuration>
</plugin>
```
3、然后我们在设置中配置一下

```shell
# idea
setting –> compiler  将 Build project automatically 勾选上
然后alt + shift + crel + / 搜索 registry 选第一个，
弹出框后下拉找到 compiler.automake.allow.when.app.running 勾选上即可
CTRL + SHIFT + A --> 查找make project automatically --> 选中 
CTRL + SHIFT + A --> 查找Registry --> 找到并勾选
compiler.automake.allow.when.app.running 
然后我们运行下我们的Boot项目进行修改即可实现热部署
```
