# Jenkins-IDEA

```shell
# 安装插件IDEA
Jenkins Control Plugin

# 配置Jenkins
Tools ->
Jenkins ->

# 1.获取 Crumb Data 此配置不生效
Crumb Data
# 获取方式
http://iup:port/crumbIssuer/api/xml?tree=crumb#

# 2.配置
登录Jenkiens ->
Manage Users ->
选择 UserId ->
设置 ->
API Token ->
添加新Token -> 
获取新Token
# 配置当前用户信息
Username # UserId
Password # Jenkins中获取的Token

# 测试连接
Test Connect
```

