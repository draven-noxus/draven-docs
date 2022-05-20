Jenkins集合Gogs来进行持续集成

一.配置jenkins
1.安装Gogs webhook插件
2.可选配置插件搜索gogs
3.下载完成后，确认是否安装成功	


二.Gogs配置
1.选中所建项目->仓库设置->管理web钩子

2.推送地址的格式为
	示例：http(s)://<你的Jenkins地址>/gogs-webhook/?job=<你的Jenkins任务名>

	http://192.168.200.134:8889/gogs-webhook/?job=test
	https://192.168.200.134:8889/gogs-webhook/?job=test
  数据格式默认 json
  一般只推送push事件
  是否激活->“激活”
3.更新Web钩子
4.点击测试推送
	查看推推送记录 并 确认记录成功  并确认jenkins是否开始构建

