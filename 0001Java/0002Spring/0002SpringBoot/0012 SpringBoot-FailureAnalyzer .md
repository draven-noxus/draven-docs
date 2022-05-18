# SpringBoot-FailureAnalyzer

```shell
# https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-failure-analyzer
```



```java
/**
 * 
 */
public class CheckFailureAnalyzer extends AbstractFailureAnalyzer<CheckException> implements BeanFactoryAware, EnvironmentAware {

    @Override
    protected FailureAnalysis analyze(Throwable rootFailure, CheckException cause) {
        return new FailureAnalysis(cause.getMessage(), "解决方案参考: http://www.baidu.com", cause);
    }

    @Override
    public FailureAnalysis analyze(Throwable failure) {
        String message = failure.getMessage();
        System.out.println(message);
        return super.analyze(failure);
    }

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {

    }

    @Override
    public void setEnvironment(Environment environment) {
    }
}



/**
 * 
 */
public class CheckException extends RuntimeException {

    public CheckException() {
    }

    public CheckException(String message) {
        super(message);
    }

    public CheckException(String message, Throwable cause) {
        super(message, cause);
    }

    public CheckException(Throwable cause) {
        super(cause);
    }

    public CheckException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}


/**
 * 
 */
@RestController
@RequestMapping
public class FailureAnalyzerController {


    /**
     * 模拟启动异常
     */
    public FailureAnalyzerController() {
        try {
            int i = 1;
            //i = i / 0;
        } catch (Exception e) {
            throw new CheckException("失败分析案例");
        }
    }

    @RequestMapping("/hello")
    public String test() {
        String hello = "hello";
        return hello;
    }
}

```
```properties
# spring.factories
# --resources
#   --META-INF
#			--spring.factories
org.springframework.boot.diagnostics.FailureAnalyzer=\
com.noxus.draven.failureAnalyzer.exception.CheckFailureAnalyzer

```



