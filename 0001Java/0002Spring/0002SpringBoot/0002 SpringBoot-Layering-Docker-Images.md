# 构建镜像

Layering Docker Images

参考：

https://github.com/zq2599/blog_demos

```shell
# 由于重新编译代码的次数可能比升级所使用的springboot版本的次数要多，所以最好将代码分开一点。如果将jar文件放在应用程序类之前的层中，Docker通常只需要更改最底层，就可以从缓存中获取其他文件。

# 为了更容易地创建可以用dockerfile构建的优化Docker映像，springboot支持向jar添加一个层索引文件。它提供了一个层的列表以及应该包含在这些层中的jar部分。索引中的层列表是根据层添加到Docker/OCI映像的顺序排序的。开箱即用，支持以下层


dependencies (for regular released dependencies)

spring-boot-loader (for everything under org/springframework/boot/loader) 

snapshot-dependencies (for snapshot dependencies)

application (for application classes and resources)


#  layers.idx

- "dependencies":
    - BOOT-INF/lib/library1.jar
    - BOOT-INF/lib/library2.jar
  - "spring-boot-loader":
    - org/springframework/boot/loader/JarLauncher.class
    - org/springframework/boot/loader/jar/JarEntry.class
  - "snapshot-dependencies":
    - BOOT-INF/lib/library3-SNAPSHOT.jar
  - "application":
    - META-INF/MANIFEST.MF
    - BOOT-INF/classes/a/b/C.class

# 这种分层是为了根据代码在应用程序构建之间更改的可能性而设计的。库代码不太可能在构建之间更改，因此它被放在自己的层中，以允许工具重用缓存中的层。应用程序代码更可能在构建之间更改，因此它被隔离在一个单独的层中。



# 使用layertools jar模式启动jar
draven:target draven$ java -Djarmode=layertools -jar noxus-draven-2.3.x-layertools-0.0.1-SNAPSHOT.jar
Usage:
  java -Djarmode=layertools -jar noxus-draven-2.3.x-layertools-0.0.1-SNAPSHOT.jar

Available commands:
  list     List layers from the jar that can be extracted
  extract  Extracts layers from the jar for image creation
  help     Help about any command

# 使用jarmode的Dockerfile示例
# 见案例中的Dockerfile
```

# 问题

```shell
1. 2.3版本推荐的镜像构建方案，和旧版本比有什么不同？
2. pom.xml中spring-boot-maven-plugin插件新增的参数，到底做了什么？
3. Dockerfile中，java -Djarmode=layertools -jar application.jar extract这个操作啥意思?
```

## 问题一

```dockerfile
# 这里说的是boot的方式构建image 当然可以使用插件 docker-maven-plugin
	# 2.2.0.RELEASE
# 将SpringBoot工程编译构建，在target目录得到jar；
# 在target目录新建dependency文件夹；
# 将jar解压到dependency文件夹；
# 编写Dockerfile文件，内容如下：

FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=target/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.MyApplication"]

# 小总结
#  官方推荐的做法是将整个jar文件解压，在Dockerfile中多次用COPY命令分别复制，这样做的好处显而易见：多个layer，如果镜像的新版本中只修改了应用代码，那么下载镜像时只会下载/app这个layer，其他部分直接使用本地缓存，这是docker镜像的常规优化手段

	# 2.3.0.RELEASE
# 1.pom.xml中的spring-boot-maven-plugin插件增加一个配置项；
# 2.编译构建生成jar；
# 3.编写Dockerfile，里面用到了多阶段构建(multi-stage builds)，用工具从jar中提取拆分后，再多次执行COPY命令将拆分后的内容放入镜像，达到多个layer的目的；


# 方案对比
# 1.pom.xml中多了个参数；
# 2.构建好jar后，无需自己解压jar；
# 3.Dockefile内容不一样，旧版是手动解压jar，再在Dockerfile分别复制，2.3.0.RELEASE是通过java命令从jar中提取出各部分内容；
```

## 问题二/三

```shell
# 配置见案例中pom文件
java -Djarmode=layertools -jar noxus-draven-2.3.x-layertools-0.0.1-SNAPSHOT.jar

  list     List layers from the jar that can be extracted
  extract  Extracts layers from the jar for image creation
  help     Help about any command


java -Djarmode=layertools -jar noxus-draven-2.3.x-layertools-0.0.1-SNAPSHOT.jar  list

  dependencies
  spring-boot-loader
  snapshot-dependencies
  application

# 通过工具spring-boot-jarmode-layertools从application.jar中提取拆分后的构建结果
# 见Dockerfile
java -Djarmode=layertools -jar noxus-draven-2.3.x-layertools-0.0.1-SNAPSHOT.jar  extract



cat BOOT-INF/layers.idx
- "dependencies":
  - "BOOT-INF/lib/"
- "spring-boot-loader":
  - "org/"
- "snapshot-dependencies":
- "application":
  - "BOOT-INF/classes/"
  - "BOOT-INF/classpath.idx"
  - "BOOT-INF/layers.idx"
  - "META-INF/"

cat lib/*
spring-boot-jarmode-layertools-2.3.0.RELEASE.jar
```

## 总结

```shell
# SpringBoot-2.3.0.RELEASE推荐的镜像构建方案和旧版本相比有什么不同

# 1. pom.xml中的spring-boot-maven-plugin插件增加一个配置项；
# 2. 构建好jar后，旧版本要自己解压jar，新版不需要；
# 3. 新版本的jar中，多了个文件清单layers.idx和镜像文件处理工具spring-boot-jarmode-layertools-2.3.0.RELEASE.jar；
# 4. 旧版的Dockefile内容：因为前面解压好了，所有在Dockerfile里直接复制前面解压的内容，这里就有个风险：前一步解压和当前复制的文件位置要保证一致；
# 5. 新版的Dockerfile内容：使用工具spring-boot-jarmode-layertools-2.3.0.RELEASE.jar，根据的layers.idx内容从jar中提取文件，复制到镜像中；
# 6. 新版的Dockerfile中，由于使用了分阶段构建，因此从jar提取文件的操作不会保存到镜像的layer中；
```



## 案例

1.编写工程

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>
        <layers>
          <enabled>true</enabled>
        </layers>
      </configuration>
    </plugin>
  </plugins>
</build>
```

2.编写DockerFile

```dockerfile
# 指定基础镜像，这是分阶段构建的前期阶段
FROM openjdk:8u212-jdk-stretch as builder
# 执行工作目录
WORKDIR application
# 配置参数
ARG JAR_FILE=target/*.jar
# 将编译构建得到的jar文件复制到镜像空间中
COPY ${JAR_FILE} application.jar
# 通过工具spring-boot-jarmode-layertools从application.jar中提取拆分后的构建结果
RUN java -Djarmode=layertools -jar application.jar extract

# 正式构建镜像
FROM openjdk:8u212-jdk-stretch
WORKDIR application
# 前一阶段从jar中提取除了多个文件，这里分别执行COPY命令复制到镜像空间中，每次COPY都是一个layer
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
COPY --from=builder application/snapshot-dependencies/ ./
COPY --from=builder application/application/ ./
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
```

3.执行打包并构建镜像

```shell
mvn clean package -U -DskipTests

docker build -t dockerlayerdemo:0.0.1 .

# 运行
docker run --rm -p 8080:8080 dockerlayerdemo:0.0.1
```

4.查看分层信息

```shell
docker history dockerlayerdemo:0.0.1
```

## 

# 资料

## Maven配置

https://docs.spring.io/spring-boot/docs/2.4.0/maven-plugin/reference/htmlsingle/#repackage-layers