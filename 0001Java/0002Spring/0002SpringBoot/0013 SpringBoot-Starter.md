# SpringBoot-Starter

```shell
# https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-failure-analyzer
```

## AutoConfiguration

```java
/**
* 配置AutoConfiguration
*
*/
@Configuration
@EnableConfigurationProperties(AcmeProperties.class)
@ConditionalOnClass(Formatter.class)
@Slf4j
public class FormatterAutoConfiguration {

    private final AcmeProperties acmeProperties;

    public FormatterAutoConfiguration(AcmeProperties acmeProperties) {
        this.acmeProperties = acmeProperties;
    }

    @Bean
    @ConditionalOnMissingBean(DefaultFormartImpl.class)
    @ConditionalOnMissingClass(value = {"com.fasterxml.jackson.databind.ObjectMapper"})
    @ConditionalOnProperty(prefix = "acme", value = "checkLocation", havingValue = "true")
    public Formatter defaulttFormatter() {
        Date date = acmeProperties.getDate();
        boolean checkLocation = acmeProperties.isCheckLocation();
        String myDemo = acmeProperties.getMyDemo();
        return new DefaultFormartImpl();
    }

    @Bean
    @ConditionalOnMissingBean(JackonFormatImpl.class)
    @ConditionalOnClass(name = "com.fasterxml.jackson.databind.ObjectMapper")
    @ConditionalOnProperty(prefix = "acme", value = "checkLocation", havingValue = "false")
    public Formatter jackonFormatter() {
        Date date = acmeProperties.getDate();
        boolean checkLocation = acmeProperties.isCheckLocation();
        String myDemo = acmeProperties.getMyDemo();
        log.info("{}","{}","{}",checkLocation,date,myDemo);
        JackonFormatImpl jackonFormat = new JackonFormatImpl(acmeProperties);
        return new JackonFormatImpl();
    }
}




/**
* 编写配置实体类
*
*/
@ConfigurationProperties("acme")
public class AcmeProperties {

    private boolean checkLocation = false;

    private Date date = new Date();


    private String MyDemo = "demo";

    public boolean isCheckLocation() {
        return checkLocation;
    }

    public void setCheckLocation(boolean checkLocation) {
        this.checkLocation = checkLocation;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMyDemo() {
        return MyDemo;
    }

    public void setMyDemo(String myDemo) {
        MyDemo = myDemo;
    }
}





/**
* 定义一个接口
*
*/
public interface Formatter {
    /**
     * 格式化方法
     * @param object
     * @return
     * @throws Exception
     */
    String format(Object object) throws Exception;
}



/**
* 编写默认实现类
*
*/
@Service
@Slf4j
public class DefaultFormartImpl implements Formatter {

    @Autowired
    private AcmeProperties acmeProperties;

    public DefaultFormartImpl() {

    }


    @Override
    public String format(Object object) {
        Date date = acmeProperties.getDate();
        boolean checkLocation = acmeProperties.isCheckLocation();
        String myDemo = acmeProperties.getMyDemo();
        log.info("{} {} {} ", checkLocation, date, myDemo);
        return String.valueOf(object);
    }
}



/**
* 编写Jackon实现类
*
*/
@Service
@EnableConfigurationProperties(AcmeProperties.class)
@Slf4j
public class JackonFormatImpl implements Formatter {

    @Autowired
    private AcmeProperties acmeProperties;

    @Autowired
    private ObjectMapper objectMapper;

    public JackonFormatImpl() {

    }

    public JackonFormatImpl(AcmeProperties acmeProperties) {
        this.acmeProperties = acmeProperties;
    }

    @Override
    public String format(Object object) throws Exception {
        try {
            Date date = acmeProperties.getDate();
            boolean checkLocation = acmeProperties.isCheckLocation();
            String myDemo = acmeProperties.getMyDemo();
            log.info("{} {} {} ",checkLocation,date,myDemo);
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new Exception(e);
        }
    }

}

```
## 配置

```properties
# spring.factories
# --resources
#   --META-INF

org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.noxus.draven.starters.configuration.FormatterAutoConfiguration

# 待完善
# spring-autoconfigure-metadata.properties
# --resources
#   --META-INF

# 待完善
# spring-configuration-metadata.json
# --resources
#   --META-INF
```

## 依赖

```xml
<!-- 按照命名规范 自定义starter -->
<name>noxus-draven-2.4.x-starter</name>
<artifactId>noxus-draven-spring-boot-starter</artifactId>
<groupId>com.noxus.draven.boot</groupId>
<version>Draven1.0</version>


<!-- 依赖不向下传递 <optional>true</optional> -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <optional>true</optional>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <optional>true</optional>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>


 <build>
   <plugins>
     <plugin>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-maven-plugin</artifactId>
       <executions>
         <execution>
           <goals>
             <goal>repackage</goal>
           </goals>
         </execution>
       </executions>
       <!--<configuration>
         <excludes>
           <exclude>
             <groupId>org.springframework.boot</groupId>
             <artifactId>spring-boot-autoconfigure-
               processor
             </artifactId>
           </exclude>
         </excludes>
       </configuration>-->
     </plugin>
   </plugins>
</build>
```

## 打包

```shell
mvn clean install -U
```

# 测试

引入依赖

```xml
<dependency>
  <artifactId>noxus-draven-spring-boot-starter</artifactId>
  <groupId>com.noxus.draven.boot</groupId>
  <version>Draven1.0</version>
</dependency>
```

编写配置

```yaml
acme:
  checkLocation: false
  date: 1608433123268
  MyDemo: demo
server:
  port: 8081
```



