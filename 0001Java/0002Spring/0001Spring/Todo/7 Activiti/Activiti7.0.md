Activiti7.0
	2010-05-17
	JBPM4-->JBPM5

	Activiti5.x
	Activiti6.x

	flowable
官方文档
	https://activiti.gitbook.io/activiti-7-developers-guide/getting-started/getting-started-activiti-core



新特性整合：
	类进行了更新
与spring整合

与springBoot整合
	ProcessRuntime API
	TaskRuntime API
	


简单介绍：25张表
	15-07正式启动
	工作流-->工作流系统
	
	如何实现:
	编码实现
    activiti：只需要更新业务流程图即可
		按照流程依次读取节点
	画流程图--每个节点数据放入表中--读取表中的第一条记录并删除--->>>最终结束
 业务流程图（xml-->dom4j-->jdbc-->mysql）
  标准: 流程图要标准
  本质是一个XML文件
  解析xml节点解析的过程	
  最后读取并插入mysql表中
  设计完成后，只需要读取数据库中的数据即可
  那么就转换为读取表中的数据

BPM
	业务流程管理：不断优化流程
	
BPMN
	软件:BPMN 业务流程模型和符号（由BPMN指定）


使用Activiti
	整合activiti
	实现业务流程建模 并制定流程图
	部署业务流程到activiti
	启动流程实例
	查询代码任务...
	结束流程

开发准备
 eclipse
 Idea
	actiBPM插件安装
	官网下载：http://plugins.jetbrains.com/
		
数据库支持
	h2
	mysql
	oracle
	postgres
	db2
	mssql

表结构分析
  Activiti 的表都以 ACT_开头。 第二部分是表示表的用途的两个字母标识。 用途也和服务的 API 对
应。
	ACT_RE_*: 'RE'表示 repository。 这个前缀的表包含了流程定义和流程静态资源 （图片，
规则，等等）。
	ACT_RU_*: 'RU'表示 runtime。 这些运行时的表，包含流程实例，任务，变量，异步任务，
等运行中的数据。 Activiti 只在流程实例执行过程中保存这些数据， 在流程结束时就会删
除这些记录。 这样运行时表可以一直很小速度很快。
	ACT_HI_*: 'HI'表示 history。 这些表包含历史数据，比如历史流程实例， 变量，任务等
等。
	ACT_GE_*: GE 表示 general。通用数据， 用于不同场景下。
		
图片乱码（idea）
	idea64.exe.vmoptions
	 最后一行：-Dfile.encoding=UTF-8



流程实例
	获取runtimeService



流程部署的两种方式
	单个部署：
		流程图
		流程图片	
	zip包部署
		将以上两个压缩为zip包

	
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
	module/activiti-adap		集成ldap用户的模块		
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



与业务整合
	业务主键：bussinessKey

流程挂起和激活过程
	全部
		repositoryService
	单个
		RuntimeService

UEL表达式
UEL-Method


监听方式实现


流程变量作用域
	global变量
	作用域：当前的实例

使用方法
	线
	模块

示例：流程图
	创建流程图
	创建实体类 实现序列化



流程
 启动时设置任务设置变量
	部署：respositoryService
	启动（设置流程变量的值）：RuntimeService
	执行：TaskService
任务办理时设置变量（TaskService在任务执行时带入参数） 

通过当前流程实例的ID设置（RuntimeService，该实例未开始执行）

通过当前任务ID老设置流程变量



Local类型变量
	任务结束之前


组任务
	Candidate-users候选人

 流程
	查询组任务
	拾取任务
	退回任务
	执行个人任务
	办理个人任务

	任务交接

网关
	没有网关
		流程混乱
	排他网关X
		exclusiveGateway：当两个条件均满足，默认走id更小的分支：
	并行网关+
		parallelGateway：分支与合并
	包含网关O
		inclusiveGateway