# Selenium-java



```xml
<!-- 这里采用springboot 2.4.3
		selenium-java 3.141.0
-->
<properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
    <selenimu.version>3.141.0</selenimu.version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
  </dependency>
  <dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>${selenimu.version}</version>
  </dependency>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
```



```java
package noxus.draven.selenium3;

import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * 〈功能概述〉<br>
 *
 * @className: SelenimuApplication
 * @package: noxus.draven.selenium3
 * @author: draven
 * @date: 2021/2/21 00:07
 */

@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class SelenimuApplicationTest {

    private WebDriver driver;
    private String baseUrl = "https://www.baidu.com/";
    private boolean acceptNextAlert = true;
    private StringBuffer verificationErrors = new StringBuffer();

    @Before
    public void setUp() throws Exception {
        //设置firefox.exe 路径
        //System.setProperty("webdriver.firefox.bin", "E:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe");
        //设置firefox驱动路经  selenium3.0之后需设置 firefox版本要求大于48
        //System.setProperty("webdriver.gecko.driver", "E:\\java\\javaTool\\driver\\geckodriver.exe");
        System.setProperty("webdriver.chrome.driver", "/Users/draven/Documents/documents/python/software/selenium/driver/cdriver/chromedriver");
        //driver = new FirefoxDriver();
        driver = new ChromeDriver();
        // baseUrl = "";
        // 隐式等待
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    }

    @Test
    public void testUntitledTestCase() throws Exception {
        driver.get("https://www.baidu.com/");
        driver.findElement(By.id("kw")).clear();
        driver.findElement(By.id("kw")).sendKeys("test");
        driver.findElement(By.id("form")).submit();
        System.out.println("----over---");
    }

    @Test
    public void testLogin() throws Exception {
        String LoginString = "登录";
        String RegisterString = "立即注册";
        String LoginUserNameString = "用户名登录";
        driver.get("https://www.baidu.com/");
        driver.findElement(By.linkText(LoginString)).click();
        driver.findElement(By.linkText(RegisterString)).click();
        String windowHandle = driver.getWindowHandle();
        log.info("{}", windowHandle);
        Set<String> windowHandles = driver.getWindowHandles();
        log.info("切换前的窗口： {}", windowHandles);

        Object[] objects = windowHandles.toArray();
        driver.switchTo().window(objects[1].toString());
        log.info("{}", driver.getWindowHandle());

        log.info("切换后的窗口： {}", driver.getWindowHandle());
        driver.findElement(By.id("TANGRAM__PSP_4__userName")).sendKeys("1213");

        driver.switchTo().window(objects[0].toString());
        log.info("切换回登录窗口： {}", driver.getWindowHandle());
        driver.findElement(By.id("TANGRAM__PSP_11__footerULoginBtn")).click();

        log.info("{}","----over---");
        Thread.sleep(3000);
        driver.close();
    }
}
```

