# JPA-MongoDB

## 概念

```shell

```



## Docker 安装MongoDB

```shell
# 安装
docker run -di --name=mongo -p 27017:27017 mongo

# 远程登录
mongo IP

# 
use admin

# 创建数据库（不存在即创建）
use webflux

# 语法
db.collection.insert(data);

# 查询全部
db.collection.find()

# 条件查询
db.user.find({_id:"demoData"})
```



## SpringBoot整合

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
  </dependency>
<dependencies>
```

application.yaml

```yaml
spring:
  data:
    mongodb:
      host: ip
      database: xxx
```



```java
@Repository
public interface XxxRepository extends MongoRepository<Comment, String> {
  
}
```

