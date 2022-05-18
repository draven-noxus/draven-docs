Activiti6.0工作流引擎深度解析与实战
	JBPM与Activiti
流程图
	技术架构和业务建模能力
	业务场景+抽象=工作流
工作流入门
	介绍
		审批业务场景
	 工作流：
		是对工作流程以及其各操作步骤之间业务规则的抽象 概括描述
	 工作流建模：
		即将工作流程种的工作如何前后组织在一起的逻辑和规则，在计算机中以恰当的模型表达并对其实施计算
	 解决问题：
		为实现某个业务目标，利用计算机在多个参与者之间按照某种预定规则自动传递文档 信息 或 任务
	 工作流管理系统WfMs
		是处理工作流的电脑软件系统
		主要功能是通过计算机技术的支持去定义 执行和管理工作流，协调工作流执行过程中工作之间以及群体成员之间的信息交互
		工作流需要依靠工作流管理系统来实现
	 计算机支持的系统工作：CSCW		
		普遍研究一个群体如何在计算机的帮助下实现协同工作的
		工作流属于计算机支持的系统工作的一部分
	 工作流管理脸懵WFMC
		工作流技术标准化的工业组织
		发布了用于工作流管理系统之间互相操作的工作流参考模型，并相继制定了一系列工业标准
	技术选型
		了解
		  jBPM Hibernate 
		  Activiti MyBatis
	快速体验
	    准备环境
			运行war包
			https://github.com/Activiti/Activiti/releases/download/activiti-6.0.0/activiti-6.0.0.zip
			sdkman 管理 jdk maven 等
			localhost:8080/activiti-app
			admin test
			创建用户：userdev userdev@126.com
			http://localhost:8080/activiti-admin
			admin admin
			http://localhost:8080/activiti-rest
			activiti-rest
		设计工作流及协同工作
		简单设计一个流程
Activiti源码初探
	源码概述
		Github clone代码 https://github.com/Activiti/Activiti.git
	
	计语源码运行activiti-app
	入门程序
		
Activiti引擎配置
	ProcessEnigneConfiguration 读取 activiti.cfg.xml（基础）
Activiti核心API
	ProcessEnigne
		RepositoryService
		RuntimeService
		TaskService
		IdentityService
		FormService
		HistoryService
		ManagementService
		DynamicBpmService（不推荐使用）
核心模块
	module/activiti-engine		核心引擎
	module/activiti-spring		spring集成模块 
	module/activiti-spring-boot	springboot集成模块
	module/activiti-rest		提供rest api
	module/activiti-form-engine 表单引擎模块
	module/activiti-ladap		集成ldap用户的模块		
数据库设计与模型映射
	五大类
		ACT_GE_*	通用GE
		ACT_RE_*	流程定义存储RE
		ACT_ID_*	身份信息ID
		ACT_RU_*	运行时RU
		ACT_HI_*	历史数据HI
模块

BPMN2.0规范
		一套业务流程模型与符号建模标准
		精准的执行语义来描述元素的操作
		以XML为载体，以符号可视化业务
	对象
		流对象 
		连接对象
		数据
		泳道
		描述对象
流程引擎配置
	4-1
集成SPring Boot2.0
		
搭建工作流平台
		需求分析 集成开发






注意

开源库研究能力