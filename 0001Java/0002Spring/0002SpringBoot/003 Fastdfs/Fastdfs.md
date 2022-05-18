# FastDFS

## application.yaml

```yaml
server:
  port: 8083
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 100MB
fdfs:
  web-server-url: 116.196.77.250:8080
  connect-timeout: 601
  http:
    anti_steal_token: true
    secret_key: FastDFS1234567890
    so-timeout: 1501
    thumb-image:
      height: 150
      width: 150
  nginx-host: 116.196.77.250:8080
  tracker-list:
    - 116.196.77.250:22122
```



## pom.xml

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>com.github.tobato</groupId>
        <artifactId>fastdfs-client</artifactId>
        <version>1.26.2</version>
        <exclusions>
            <exclusion>
                <artifactId>logback-classic</artifactId>
                <groupId>ch.qos.logback</groupId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>net.oschina.zcx7878</groupId>
        <artifactId>fastdfs-client-java</artifactId>
        <version>1.27.0.0</version>
    </dependency>
</dependencies>
```

## java

```java
@SpringBootApplication
public class FastDFSApplication {
    public static void main(String[] args) {
        SpringApplication.run(FastDFSApplication.class, args);
    }
}



/**
* 配置类	
*/
package com.noxus.draven.fast.config;

import com.github.tobato.fastdfs.FdfsClientConfig;
import com.github.tobato.fastdfs.conn.FdfsWebServer;
import com.github.tobato.fastdfs.domain.FileInfo;
import com.github.tobato.fastdfs.domain.StorePath;
import org.csource.fastdfs.ProtoCommon;
import com.github.tobato.fastdfs.exception.FdfsUnsupportStorePathException;
import com.github.tobato.fastdfs.proto.storage.DownloadByteArray;
import com.github.tobato.fastdfs.service.FastFileStorageClient;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.context.annotation.Import;
import org.springframework.jmx.support.RegistrationPolicy;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.Charset;
import java.security.NoSuchAlgorithmException;

@Configuration
@Import(FdfsClientConfig.class)
// 解决jmx重复注册bean的问题
@EnableMBeanExport(registration = RegistrationPolicy.IGNORE_EXISTING)
public class FastDFSUtil {

    private final Logger logger = LoggerFactory.getLogger(FastDFSUtil.class);

    @Value(value = "${fdfs.nginx-host}")
    private String nginxHost;

    @Autowired
    private FastFileStorageClient storageClient;

    @Autowired
    private FdfsWebServer fdfsWebServer;


    @Value("${fdfs.web-server-url}")
    private String fastdfsUrl;


    @Value("${fdfs.http.secret_key}")
    private String fastdfsToken;


    /**
     * 上传文件
     *
     * @param file 文件对象
     * @return 文件访问地址
     * @throws IOException
     */
    public String uploadFile(File file) throws IOException {
        StorePath storePath = storageClient.uploadFile(new FileInputStream(file), file.length(),
                FilenameUtils.getExtension(file.getName()), null);
        return getResAccessUrl(storePath);
    }

    /**
     * 上传文件
     *
     * @param file 文件对象
     * @return 文件访问地址
     * @throws IOException
     */
    public String uploadFile(MultipartFile file) throws IOException {
        StorePath storePath = storageClient.uploadFile(file.getInputStream(), file.getSize(),
                FilenameUtils.getExtension(file.getOriginalFilename()), null);
        return getResAccessUrl(storePath);
    }

    /**
     * 将一段字符串生成一个文件上传
     *
     * @param content       文件内容
     * @param fileExtension
     * @return
     */
    public String uploadFile(String content, String fileExtension) {
        byte[] buff = content.getBytes(Charset.forName("UTF-8"));
        ByteArrayInputStream stream = new ByteArrayInputStream(buff);
        StorePath storePath = storageClient.uploadFile(stream, buff.length, fileExtension, null);
        return getResAccessUrl(storePath);
    }

    // 封装图片完整URL地址
    private String getResAccessUrl(StorePath storePath) {
        String fileUrl = storePath.getFullPath();
        return nginxHost + '/' + fileUrl;
    }

    /**
     * 传图片并同时生成一个缩略图 "JPG", "JPEG", "PNG", "GIF", "BMP", "WBMP"
     *
     * @param file 文件对象
     * @return 文件访问地址
     * @throws IOException
     */
    public String uploadImageAndCrtThumbImage(MultipartFile file) throws IOException {
        StorePath storePath = storageClient.uploadImageAndCrtThumbImage(file.getInputStream(), file.getSize(),
                FilenameUtils.getExtension(file.getOriginalFilename()), null);
        return getResAccessUrl(storePath);
    }

    /**
     * 删除文件
     *
     * @param fileUrl 文件访问地址
     * @return
     */
    public void deleteFile(String fileUrl) {
        if (StringUtils.isEmpty(fileUrl)) {
            return;
        }
        try {
            StorePath storePath = StorePath.praseFromUrl(fileUrl);
            storageClient.deleteFile(storePath.getGroup(), storePath.getPath());
        } catch (FdfsUnsupportStorePathException e) {
            logger.warn(e.getMessage());
        }
    }


    /**
     * @param fileUrl
     * @return
     */
    public FileInfo queryFileInfo(String fileUrl) {
        StorePath storePath = StorePath.praseFromUrl(fileUrl);
        FileInfo fileInfo = storageClient.queryFileInfo(storePath.getGroup(), storePath.getPath());
        return fileInfo;
    }

    /**
     * 下载文件
     *
     * @param fileUrl 文件url
     * @return
     */
    public byte[] download(String fileUrl) {
        String group = fileUrl.substring(0, fileUrl.indexOf("/"));
        String path = fileUrl.substring(fileUrl.indexOf("/") + 1);
        byte[] bytes = storageClient.downloadFile(group, path, new DownloadByteArray());
        return bytes;
    }


    // 封装图片完整URL地址
    private String getResAccessUrls(StorePath storePath) {
        String fileUrl = fdfsWebServer.getWebServerUrl() + storePath.getFullPath();
        return fileUrl;
    }


    public static String getToken(String fid, String secret_key, String IP) {

        String substring = fid.substring(fid.indexOf("/") + 1);
        //unix时间戳 以秒为单位
        int ts = (int) (System.currentTimeMillis() / 1000);
        String token = new String();
        try {
            token = ProtoCommon.getToken(substring, ts, secret_key);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        StringBuilder sb = new StringBuilder();
        sb.append(IP);
        sb.append(fid);
        sb.append("?token=").append(token);
        sb.append("&ts=").append(ts);
        //System.out.println(sb.toString());

        return sb.toString();
    }


}


/**
* 测试类
*/
package com.noxus.draven.fast.controller;

import com.github.tobato.fastdfs.domain.FileInfo;
import com.github.tobato.fastdfs.proto.storage.DownloadByteArray;
import com.github.tobato.fastdfs.proto.storage.DownloadCallback;
import com.github.tobato.fastdfs.service.FastFileStorageClient;
import com.noxus.draven.fast.config.FastDFSUtil;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;

@RestController
public class FastController {
    @Resource
    private FastDFSUtil fastDFSUtil;

    @Value("${fdfs.web-server-url}")
    private String fastdfsUrl;

    @Value("${fdfs.http.secret_key}")
    private String fastdfsToken;

    /**
     * The field key exceeds its maximum permitted size of 1048576 bytes
     *
     * @param file
     * @return
     * @throws IOException
     */
    @PostMapping("upload")
    public String upload(@RequestBody MultipartFile file) throws IOException {
        String filePath = fastDFSUtil.uploadFile(file);
        return filePath;
    }

    @RequestMapping(value = "/downloads", method = {RequestMethod.GET})
    public void downloads(HttpServletResponse response, HttpServletRequest request) throws Exception {
        String fileUrl = request.getParameter("fileUrl");

        byte[] data = fastDFSUtil.download(fileUrl);

        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-disposition", "attachment;filename=" + URLEncoder.encode("test.jpg", "UTF-8"));
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-disposition", "attachment;filename=" + URLEncoder.encode("test.jpg", "UTF-8"));

        // 写出
        ServletOutputStream outputStream = response.getOutputStream();
        IOUtils.write(data, outputStream);
    }

    /**
     * 生成访问链接
     *
     * @param response
     * @param request
     * @param model
     * @return
     */
    @RequestMapping(value = "/location", method = {RequestMethod.GET})
    public String location(HttpServletResponse response, HttpServletRequest request, Model model) {
        String fileUrl = request.getParameter("location");
        System.out.println(fileUrl);
        //token
        String token = fastdfsToken;
        String IP = fastdfsUrl;
        fileUrl = FastDFSUtil.getToken(fileUrl, token, IP);
        model.addAttribute("Url", fileUrl);
        return "" + fileUrl;
    }
}
```

## postman测试

```
选择post请求,head选择file,填写key值，选择上传文件，发送请求
```

# 安装FastDFS

```shell
# 拉取镜像
docker pull morunchang/fastdfs

# 标记
docker tag morunchang/fastdfs fastdfs

# 启动我们的storage，--name制定名称，-net不用修改，ip修改为自己的ip
 # 创建目录 
mkdir -p /docker/fastdfs/data

 # 
docker run -d --name storage --net=host -e TRACKER_IP=ip:22122  -v /docker/fastdfs/data/storage:/data/fast_data/data -e GROUP_NAME=storagegroup fastdfs sh storage.sh

# 然后启动tracker
docker run -d --name tracker --net=host fastdfs sh tracker.sh


# 开放端口
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --zone=public --add-port=22122/tcp --permanent
firewall-cmd --zone=public --add-port=23000/tcp --permanent
firewall-cmd --reload


# 修改storage的nginx配置文件,先进入容器内部
docker exec -it storage  /bin/bash

$ vi /data/nginx/conf/nginx.conf

  # location中加上配置
  location /group1/M00 {
  	proxy_next_upstream http_502 http_504 error timeout invalid_header;
 	 proxy_cache http-cache;
  	proxy_cache_valid  20030412h;
  	proxy_cache_key $uri$is_args$args;
  	proxy_pass http://fdfs_group1;
  	expires 30d;
  }
  
# 推出重启
exit
docker restart storage

# 测试 出现nginx即可
ip:8080

# 运维
# 停删容器
docker stop	storage
docker stop	tracker

docker rm storage
docker rm tracker
# 删除挂在数据
rm -rf /docker/fastdfs/data

# 删除镜像
docker rmi fastdfs
```