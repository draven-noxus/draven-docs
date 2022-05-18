# Weblogic

```shell
# 开启配置
Add/Edit Configurations

+ Weblogic Server > local
# 填写name
name
# Application server 指定Weblogic位置
Server > Application server > Configure
# 选择正确会自动读取Welogic版本信息
/xxx/Oracle_Home

# 配置默认浏览器
Open browser > After Launch
# 指定默认打开url
Open browser > URL 


# 指定重启时，更新哪类资源 需要先配置Deployment
On 'Update' action: Update classes and resources
On frame deactivation: Update classes and resources

# Deployment
Deployment > + > Artifact... 
xxx.war
# 选择可以配置热部署
xxx.war exploded

# 指定访问路径
Deployment > Application context

# 配置自动编译
# 双击shift 搜索 register 勾选
compiler.automake.allow.when.app.running


```

