# SpringBoot-Swagger

# 资料

```shell
# swagger 官网
swagger.io: https://swagger.io/
# springfox 官网
springfox: http://springfox.github.io/springfox/
# springfox Github 仓库 springfox:
https://github.com/springfox/springfox
# springfox-demos Github 仓库：
https://github.com/springfox/springfox-demos
# springfox Maven 仓库：Home io.springfox
https://mvnrepository.com/artifact/io.springfox

```

## 1.yaml

```yaml
server:
  port: 10090

spring:
  application:
    name: swagger-aplication

  # ===== 自定义swagger配置 start===== #
swagger:
  enable: false
  application-name: ${spring.application.name}
  application-version: 1.0
  application-description: springfox swagger 3.0整合Demo
  try-host: http://localhost:${server.port}
  scans: 'com.noxus.draven.swagger.controller' # 不适用
  author: draven
   # ===== 自定义swagger配置 end===== #
```

## 2.pom

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

## 3.config

```java
package com.noxus.draven.swagger.config;

import com.noxus.draven.swagger.properties.SwaggerProperties;
import io.swagger.models.auth.In;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.springframework.boot.SpringBootVersion;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.lang.reflect.Field;
import java.util.*;

/**
 * 〈功能概述〉<br>
 *
 * @className: SwaggerConfiguration
 * @package: com.noxus.draven.swagger.config
 * @author: draven
 * @date: 2020/12/23 09:12
 */

@Configuration
public class SwaggerConfiguration implements WebMvcConfigurer {
    private final SwaggerProperties swaggerProperties;

    public SwaggerConfiguration(SwaggerProperties swaggerProperties) {
        this.swaggerProperties = swaggerProperties;
    }

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.OAS_30).pathMapping("/")

                // 定义是否开启swagger，false为关闭，可以通过变量控制
                .enable(swaggerProperties.getEnable())

                // 将api的元信息设置为包含在json ResourceListing响应中。
                .apiInfo(apiInfo())

                // 接口调试地址
                .host(swaggerProperties.getTryHost())

                // 选择哪些接口作为swagger的doc发布
                .select()
                .apis(RequestHandlerSelectors.any())

                //.apis(RequestHandlerSelectors.basePackage(null == swaggerProperties.getScans() ? "" : swaggerProperties.getScans()))
                //.apis(RequestHandlerSelectors.basePackage("com.noxus.draven.swagger.contro"))
                //.apis(RequestHandlerSelectors.basePackage("com.noxus.draven.swagger.controller"))

                .paths(PathSelectors.any())
                .build()

                // 支持的通讯协议集合
                .protocols(newHashSet("https", "http"))

                // 授权信息设置，必要的header token等认证信息
                .securitySchemes(securitySchemes())

                // 授权信息全局应用
                .securityContexts(securityContexts());
    }

    /**
     * API 页面上半部分展示信息
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title(swaggerProperties.getApplicationName() + " Api Doc")
                .description(swaggerProperties.getApplicationDescription())
                .contact(new Contact("lighter", null, "123456@gmail.com"))
                .version("Application Version: " + swaggerProperties.getApplicationVersion() + ", Spring Boot Version: " + SpringBootVersion.getVersion())
                .build();
    }

    /**
     * 设置授权信息
     */
    private List<SecurityScheme> securitySchemes() {
        ApiKey apiKey = new ApiKey("BASE_TOKEN", "token", In.HEADER.toValue());
        return Collections.singletonList(apiKey);
    }

    /**
     * 授权信息全局应用
     */
    private List<SecurityContext> securityContexts() {
        return Collections.singletonList(
                SecurityContext.builder()
                        .securityReferences(Collections.singletonList(new SecurityReference("BASE_TOKEN", new AuthorizationScope[]{new AuthorizationScope("global", "")})))
                        .build()
        );
    }

    @SafeVarargs
    private final <T> Set<T> newHashSet(T... ts) {
        if (ts.length > 0) {
            return new LinkedHashSet<>(Arrays.asList(ts));
        }
        return null;
    }

    /**
     * 通用拦截器排除swagger设置，所有拦截器都会自动加swagger相关的资源排除信息
     */
    @SuppressWarnings("unchecked")
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        try {
            Field registrationsField = FieldUtils.getField(InterceptorRegistry.class, "registrations", true);
            List<InterceptorRegistration> registrations = (List<InterceptorRegistration>) ReflectionUtils.getField(registrationsField, registry);
            if (registrations != null) {
                for (InterceptorRegistration interceptorRegistration : registrations) {
                    interceptorRegistration
                            .excludePathPatterns("/swagger**/**")
                            .excludePathPatterns("/webjars/**")
                            .excludePathPatterns("/v3/**")
                            .excludePathPatterns("/doc.html");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}







package com.noxus.draven.swagger.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 〈功能概述〉<br>
 *
 * @className: SwaggerProperties
 * @package: com.noxus.draven.swagger.properties
 * @author: draven
 * @date: 2020/12/23 09:11
 */
//@EnableConfigurationProperties
@Component
@ConfigurationProperties("swagger")
public class SwaggerProperties {
    /**
     * 是否开启swagger，生产环境一般关闭，所以这里定义一个变量
     */
    private Boolean enable;

    /**
     * 项目应用名
     */
    private String applicationName;

    /**
     * 项目版本信息
     */
    private String applicationVersion;

    /**
     * 项目描述信息
     */
    private String applicationDescription;

    /**
     * 扫描包路径
     */
    private String scans;

    /**
     * 接口调试地址
     */
    private String tryHost;

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getApplicationVersion() {
        return applicationVersion;
    }

    public void setApplicationVersion(String applicationVersion) {
        this.applicationVersion = applicationVersion;
    }

    public String getApplicationDescription() {
        return applicationDescription;
    }

    public void setApplicationDescription(String applicationDescription) {
        this.applicationDescription = applicationDescription;
    }

    public String getTryHost() {
        return tryHost;
    }

    public void setTryHost(String tryHost) {
        this.tryHost = tryHost;
    }

    public String getScans() {
        return scans;
    }

    public void setScans(String scans) {
        this.scans = scans;
    }
}


```

## 4.demo

```java
@EnableOpenApi
@SpringBootApplication
public class Swagger3Application {
    public static void main(String[] args) {
        SpringApplication.run(Swagger3Application.class, args);
    }

}



/**
*
*/
@RestController
@RequestMapping
public class Swagger3Controller {

    @Value("${swagger.application-description}")
    private String des;


    @ApiOperation("分页查询所有数据")
    @GetMapping("test")
    public String test() {
        return des;
    }
}


@Data
@Setter
@Getter
@ApiModel("实体类测试")
public class User {
    private String id;
    private String name;
    private String pass;
}
```

## 5.测试

```http
http://ip:port/swagger-ui/
```



# 注解

```java
/**
*
@Api：用在controller类，描述API接口
  	tags="说明该类的作用，可以在UI界面上看到的注解"
    value="该参数没什么意义，在UI界面上也看到，所以不需要配置"
    
@ApiOperation：描述接口方法
    value="说明方法的用途、作用"
    notes="方法的备注说明"
    
@ApiModel：描述对象 用于响应类上，表示一个返回响应数据的信息
     这种一般用在post创建的时候，使用@RequestBody这样的场景，请求参数无法使用
      @ApiModelProperty：用在属性上，描述响应类的属性
      
@ApiImplicitParams：描述接口参数 用在请求的方法上，表示一组参数说明
  @ApiImplicitParam 注解进行描述，用在@ApiImplicitParams注解中，指定一个请求参数的各个方面
  name：参数名
        value：参数的汉字说明、解释
        required：参数是否必须传
        paramType：参数放在哪个地方
             header --> 请求参数的获取：@RequestHeader
             query --> 请求参数的获取：@RequestParam
             path（用于restful接口）--> 请求参数的获取：@PathVariable
             div（不常用）
             form（不常用）    
        dataType：参数类型，默认String，其它值dataType="Integer"       
        defaultValue：参数的默认值

@ApiModelProperty：描述对象属性

@ApiResponses：描述接口响应 用在请求的方法上，表示一组响应
  	 @ApiResponse：用在@ApiResponses中，一般用于表达一个错误的响应信息
         code：数字，例如400
         message：信息，例如"请求参数没填好"
         response：抛出异常的类
         
@ApiIgnore：忽略接口方法

@ResponseHeader：响应头设置

@AuthorizationScope：OAuth2授权范围。

@ApiParam：用于方法，参数，字段说明，表示对参数的添加元数据（说明或是否必填等）
*/
```



# Knife4j

## 1.pom

```xml
<!-- 注意 springfox knife4j的依赖关系-->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
</dependency>


<!-- springfox 不可用-->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
</dependency>
```

## 2.config

```java
/**
* 在swagger基础上配置 
* SwaggerConfiguration配置如上
*/
@EnableKnife4j
public class SwaggerConfiguration implements WebMvcConfigurer {
	// ...
}
```

## 3.demo

```http
http://ip:port/doc.html
```

