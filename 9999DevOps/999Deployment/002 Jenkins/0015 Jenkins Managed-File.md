# Jenkins Managed File

```shell
# 该插件每次只能配置一个文件 多文件比繁琐
# 获取并安装插件 
-> Plugin Manager
-> Config File Provider Plugin

# 管理配置文件
-> Manage Jenkins
-> Managed files

# 默认展示已有配置文件
Add a new Config

# 例如配置
	# properties
		Properties file
	# 自定义配置文件
		Custom file
		
# 确认后点击提交

# 开始配置信息
 # 主要配置
 	# Name 用于构建时 选择配置文件标识符
 	# Content 文件内容
 	
 	

# 配置项目构建
	# Provide Configuration files
	# 即可选择已有的配置文件
	# 注意 此路径是相对于 jenkins当前工作空间-具体情况具体分析
	Target
```

