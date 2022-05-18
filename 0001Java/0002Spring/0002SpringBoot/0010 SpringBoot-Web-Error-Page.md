# Spring-boot-web

# 1.Error-page

## 1.配置

```java
/**
* 方案一
*/
@Configuration
public class ErrorPageConfiguration {
  @Bean
  public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
    return (container -> {
      ErrorPage error401Page = new ErrorPage(HttpStatus.UNAUTHORIZED, "/401.html");
      ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/error.html");
      ErrorPage error500Page = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/500.html");
      container.addErrorPages(error401Page, error404Page, error500Page);
    });
  }
}



/**
* 方案二
*/
@Controller("/error")
@RequestMapping("${server.error.path:${error.path:/error}}")
public class CustomizeErrorController implements ErrorController {
    @Override
    public String getErrorPath() {
        return "error";
    }

    @RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView errorHtml(HttpServletRequest request, Model model) {
        String contextPath = request.getContextPath();
        HttpStatus status = getStatus(request);

        if (status.is4xxClientError()) {
            model.addAttribute("message", "你这个请求错了吧，要不要换个姿势！！！");
        }
        if (status.is5xxServerError()) {
            model.addAttribute("message", "服务器冒烟了，要不然你稍后再试试！！！");
        }
        return new ModelAndView("error.html");

    }

    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        try {
            return HttpStatus.valueOf(statusCode);
        } catch (Exception ex) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
```

## 2.pom

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
## 3.静态资源

```html
<!--位置
		--resources
      --static
        --imgs.png
        --error.html
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>网页去外星球了</title>
</head>
<body>
		<h2>哇哈哈</h2>
		<img src="/imgs.png" alt=""/>
</body>
</html>
```

## 4.测试

```shell
...
```
