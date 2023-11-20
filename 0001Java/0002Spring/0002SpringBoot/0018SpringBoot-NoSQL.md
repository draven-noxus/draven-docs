# MongoDB

```xml
<dependency>
    <groupId>de.flapdoodle.embed</groupId>
    <artifactId>de.flapdoodle.embed.mongo</artifactId>
</dependency>

<dependency>
    <groupId>org.spring.framework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongoDB</artifactId>
</dependency>
```



```java
@Entity
public class City{
    
}

import org.springframework.data.domain.*;
import org.springframework.data.repository.*;

public interface CityRepository extends Repository<City, Long> {

    Page<City> findAll(Pageable pageable);

    City findByNameAndStateAllIgnoringCase(String name, String state);

}
```



# Neo4j

```shell
# https://neo4j.com/download-center/#community
# http://neo4j.com.cn/public/cypher/default.html
```



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-neo4j</artifactId>
</dependency>
```



```properties
spring.data.neo4j.uri=http://localhost:7474
spring.data.neo4j.username=neo4j
spring.data.neo4j.password=123123
```





```java
@MapperScan("com.fly.Mapper")
@EnableNeo4jRepositories(basePackages = "com.fly.UserDao")
public class SpringDemoApp{
    
}


import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Property;

@NodeEntity(label = "User")
public class UserNode {
    @GraphId
    private Long nodeId;
    @Property
    private String userId;
    @Property
    private String name;
    @Property
    private String age;

    public Long getNodeId() {
        return nodeId;
    }

    public void setNodeId(Long nodeId) {
        this.nodeId = nodeId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}



@RelationshipEntity(type = "UserRelation")
public class UserRelation {
    @GraphId
    private Long id;
    @StartNode
    private UserNode startNode;
    @EndNode
    private UserNode endNode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserNode getStartNode() {
        return startNode;
    }

    public void setStartNode(UserNode startNode) {
        this.startNode = startNode;
    }

    public UserNode getEndNode() {
        return endNode;
    }

    public void setEndNode(UserNode endNode) {
        this.endNode = endNode;
    }
}



import com.fly.pojo.UserRelation;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserRelationRepository extends GraphRepository<UserRelation> {
    @Query("match p=(n:User)<-[r:UserRelation]->(n1:User) where n.userId={firstUserId} and n1.userId={secondUserId} return p")
    List<UserRelation> findUserRelationsByEachId(@Param("firstUserId")String firstUserId,@Param("secondUserId")String secondUserId);

    @Query("match (fu:User),(su:User) where fu.userId={firstUserId} and su.userId={secondUserId} create p=(fu)-[r:UserRelation]->(su) return p")
    List<UserRelation> addUserRelation(@Param("firstUserId")String firstUserId,@Param("secondUserId")String secondUserId);

}


@Component
public interface UserRepository extends GraphRepository<UserNode> {
    @Query("MATCH (n:User) RETURN n")
    List<UserNode> getUserNodeList();

    @Query("create (n:User{age:{age},name:{name}}) RETURN n")
    List<UserNode> addUserNodeList(@Param("age")String age,@Param("name")String name);
    @Query("create (n:User{age:{age},name:{name},userId:{userId}}) RETURN n")
    List<UserNode> addUserNodeList(@Param("age")String age,@Param("name")String name,@Param("userId")String userId);
}


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void addUserNode(UserNode userNode){
        userRepository.addUserNodeList(userNode.getAge(),userNode.getName());
    }

    public List<UserNode> getUserNodeList(){
        return userRepository.getUserNodeList();
    }
}


@SpringBootTest(classes = SpringDemoApp.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRelationRepository userRelationRepository;
    @Test
    public void test1(){
        UserNode userNode = new UserNode();
        userNode.setNodeId(1L);
        userNode.setUserId("001");
        userNode.setName("张三儿");
        userNode.setAge("25");
        UserNode userNode2 = new UserNode();
        userNode2.setNodeId(2L);
        userNode2.setUserId("002");
        userNode2.setName("李四儿");
        userNode2.setAge("24");
        userService.addUserNode(userNode);
        userService.addUserNode(userNode2);
    }

    @Test
    public void test2(){
        List<UserNode> userNodeList = userService.getUserNodeList();
        for (UserNode userNode : userNodeList) {
            System.out.printf(userNode.getUserId());
        }
    }

    @Test
    public void test3(){
        userRelationRepository.addUserRelation("001","002");
    }
}
```

#  Solr

比较繁琐gg

# Elasticsearch

整合中。。

# Cassandra

```XML
<dependency>
    <groupId>org.spring.framework.boot</groupId>
    <artifactId>spring-boot-starter-data-cassandra</artifactId>
</dependency>

```



```properties
spring.data.cassandra.keyspace-name=mykeyspace
spring.data.cassandra.contact-points=cassandrahost1:9042,cassandrahost2:9042
spring.data.cassandra.local-datacenter=datacenter1
```



# Couchbase

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-couchbase</artifactId>
    <version>2.4.0</version>
</dependency>
```





```properties
spring.couchbase.connection-string=couchbase://192.168.1.123
spring.couchbase.username=user
spring.couchbase.password=secret
```



# LDAP

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-ldap</artifactId>
    <version>2.4.0</version>
    <scope>test</scope>
</dependency>


<dependency>
    <groupId>com.unboundid</groupId>
    <artifactId>unboundid-ldapsdk</artifactId>
    <version>5.1.1</version>
    <scope>test</scope>
</dependency>
```

# InfluxDB

貌似没什么用