# SpringBoot-CXF

```xml
<properties>
  <cxf.version>3.4.2</cxf.version>
</properties>

<dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!--<version>2.4.1</version> -->
  </dependency>
  <groupId>org.apache.cxf</groupId>
  <artifactId>cxf-spring-boot-starter-jaxws</artifactId>
  <version>${cxf.version}</version>
</dependency>
```



## Server

```java
import com.noxus.draven.cxfserver.interceptors.CxfAuthInterceptor;
import com.noxus.draven.cxfserver.service.UserService;
import org.apache.cxf.Bus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.apache.cxf.transport.servlet.CXFServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.xml.ws.Endpoint;

/**
 * @author draven
 * 一定注意导入的包
 */
@Configuration
public class CXFConfig {

    @Autowired
    private Bus bus;

    @Autowired
    private UserService userService;

    /**
     * 此方法被注释后:wsdl访问地址为http://127.0.0.1:8080/services/user?wsdl
     * 去掉注释后：wsdl访问地址为：http://127.0.0.1:8080/soap/user?wsdl
     * dispatcherServlet
     */
    @Bean
    public ServletRegistrationBean createServletRegistrationBean() {
        return new ServletRegistrationBean(new CXFServlet(), "/soap/*");
    }


  /*  @Bean(name = Bus.DEFAULT_BUS_ID)
    public isd springBus() {
        String id = new SpringBus().getId();
        return null;
    }*/

    /**
     * 发布服务
     * 指定访问url
     *
     * @return
     */
    @Bean
    public Endpoint userEndpoint() {
        EndpointImpl endpoint = new EndpointImpl(bus, userService);
        endpoint.getInInterceptors().add(new CxfAuthInterceptor());//添加校验拦截器
        endpoint.publish("/user");
        return endpoint;
    }
}
```

```java
public class CxfAuthInterceptor extends AbstractPhaseInterceptor<SoapMessage> {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String USERNAME = "root";
    private static final String PASSWORD = "admin";

    public CxfAuthInterceptor() {
        //定义在哪个阶段进行拦截
        super(Phase.PRE_PROTOCOL);
    }

    @Override
    public void handleMessage(SoapMessage soapMessage) throws Fault {
        List<Header> headers = null;
        String username = null;
        String password = null;
        try {
            headers = soapMessage.getHeaders();
        } catch (Exception e) {
            logger.error("getSOAPHeader error: {}", e.getMessage(), e);
        }

        if (headers == null) {
            throw new Fault(new IllegalArgumentException("找不到Header，无法验证用户信息"));
        }
        //获取用户名,密码
        for (Header header : headers) {
            SoapHeader soapHeader = (SoapHeader) header;
            Element e = (Element) soapHeader.getObject();
            NodeList usernameNode = e.getElementsByTagName("username");
            NodeList pwdNode = e.getElementsByTagName("password");
            username = usernameNode.item(0).getTextContent();
            password = pwdNode.item(0).getTextContent();
            if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
                throw new Fault(new IllegalArgumentException("用户信息为空"));
            }
        }
        //校验用户名密码
        if (!(username.equals(USERNAME) && password.equals(PASSWORD))) {
            SOAPException soapExc = new SOAPException("认证失败");
            logger.debug("用户认证信息错误");
            throw new Fault(soapExc);
        }

    }
}
```

```java
/**
 * @author draven
 * 指定webservice命名空间
 * No operation was found with the name
 * 两种解决方案
 * 客户端-服务端
 * 服务端-客户端
 *  1.修改接口类与实现类的包位置，保持在同包下。
 *  2.修改实现类的@Webservice注解，添加属性targetNamsespace,使得namespace保持一致。
 */
@WebService(targetNamespace = "http://impl.service.cxfserver.draven.noxus.com/",
        endpointInterface = "com.noxus.draven.cxfserver.service.UserService")
public interface UserService {

    /**
     * 在wsdl文档中显示的方法名，可不指定默认与方法相同；@WebMethod可不指定
     *
     * @param paramss
     * @return
     */
    @WebMethod(operationName = "getHello")
    String getHello( String paramss);

}

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    private ObjectMapper objectMapper;


    @Override
    public String getHello(String paramss) {
        Map map = objectMapper.convertValue(paramss, Map.class);
        return "hello " + map;
    }
}
```

## Client

```java
public class LoginInterceptor extends AbstractPhaseInterceptor<SoapMessage> {

    @Autowired
    private CxfClientProperties cxfClientProperties;

    private String username;

    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LoginInterceptor() {
        //设置在发送请求前阶段进行拦截
        super(Phase.PREPARE_SEND);
    }

    @Override
    public void handleMessage(SoapMessage soapMessage) throws Fault {
        //String username = cxfClientProperties.getUsername() == null ? "" : cxfClientProperties.getUsername();
        List<Header> headers = soapMessage.getHeaders();
        Document doc = DOMUtils.createDocument();
        // createElementNS namespace
        Element auth = doc.createElementNS(cxfClientProperties.getAddress(), "SecurityHeader");
        Element UserName = doc.createElement("username");
        Element UserPass = doc.createElement("password");

        UserName.setTextContent(cxfClientProperties.getUsername());
        UserPass.setTextContent(cxfClientProperties.getPassword());

        auth.appendChild(UserName);
        auth.appendChild(UserPass);

        headers.add(0, new Header(new QName("SecurityHeader"), auth));
    }
}
```

```properties
# cxfClient.properties
cxfclient.targetNamespace=http://impl.service.cxfserver.draven.noxus.com/
cxfclient.address=http://127.0.0.1:10090/soap/user?wsdl
cxfclient.password=admin
cxfclient.username=root
```



```java
@Component
@ConfigurationProperties(prefix = "cxfclient")
@PropertySource(value = "classpath:cxfClient.properties")
@Order(-1)
public class CxfClientProperties {

    private String targetNamespace;

    private String address;

    private String username;

    private String password;


    public String getTargetNamespace() {
        return targetNamespace;
    }

    public void setTargetNamespace(String targetNamespace) {
        this.targetNamespace = targetNamespace;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```



```java
@Configuration
@Import(CxfClientProperties.class)
public class ClientConfig {


    @Autowired
    CxfClientProperties cxfClientProperties;

   /* @Bean
    public JaxWsDynamicClientFactory getDcf() {
        return JaxWsDynamicClientFactory.newInstance();
    }*/

    @Bean
    public Client getDynamicClient() {
        JaxWsDynamicClientFactory dcf = JaxWsDynamicClientFactory.newInstance();
        Client client = dcf.createClient(cxfClientProperties.getAddress());
        client.getOutInterceptors().add(this.getLoginInterceptor());
        return client;
    }

    @Bean
    public JaxWsProxyFactoryBean getClient() {
        JaxWsProxyFactoryBean jaxWsProxyFactoryBean = this.jaxWsProxyFactoryBean();
        jaxWsProxyFactoryBean.getOutInterceptors().add(this.getLoginInterceptor());
        jaxWsProxyFactoryBean.setAddress(cxfClientProperties.getAddress());
        return jaxWsProxyFactoryBean;
    }


    @Bean
    public LoginInterceptor getLoginInterceptor() {
        LoginInterceptor loginInterceptor = new LoginInterceptor();
        loginInterceptor.setPassword(cxfClientProperties.getPassword());
        loginInterceptor.setUsername(cxfClientProperties.getUsername());
        return loginInterceptor;
    }

    @Bean
    protected JaxWsProxyFactoryBean jaxWsProxyFactoryBean() {
        return new JaxWsProxyFactoryBean();
    }

}
```

```java
@Component
public class ParaseCxf {

    @Autowired
    private ClientConfig clientConfig;

    @Autowired
    ObjectMapper objectMapper;

    public List<Object> parase(String method, Map params) throws Exception {
        String paramss = params.toString();
        paramss = objectMapper.writeValueAsString(params);
        Client dynamicClient = clientConfig.getDynamicClient();
        Object[] invoke = dynamicClient.invoke(method, paramss);
        List<Object> objects = Arrays.asList(invoke);
        return objects;
    }

    public Object parases(String method, Map params) throws Exception {
        String paramss = params.toString();
        paramss = objectMapper.writeValueAsString(params);
        JaxWsProxyFactoryBean client = clientConfig.getClient();
        client.setServiceClass(UserService.class);
        UserService us = (UserService) client.create();
        // 调用代理接口的方法调用并返回结果
        String result = us.getHello(paramss);
        System.out.println("返回结果:" + result);
        Map map = objectMapper.readValue(result, Map.class);
        return map;
    }
}
```



# FAQ

```shell
# No operation was found with the name
@WebService(targetNamespace = "http://impl.service.cxfserver.draven.noxus.com/")
```