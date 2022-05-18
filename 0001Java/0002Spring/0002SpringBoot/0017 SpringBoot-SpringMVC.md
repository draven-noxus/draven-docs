# SpringBoot SpringMVC

## SpringMVC 解决返回乱码问题

```YAMl
#application.yml文件下加一下内容：
#解决返回乱码问题

# 过期
spring:
  http:
    encoding:
      charset: utf-8
      enabled: true
      force: true

# 推荐
server:
	servlet:
		encoding:
			charset: UTF-8
			force: true
			enabled: true

```


