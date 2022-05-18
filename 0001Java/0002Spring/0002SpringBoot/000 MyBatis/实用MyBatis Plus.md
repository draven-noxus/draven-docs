环境搭建
	1.先搭建MyBatis环境
	2.再集成MyBatis Plus
	此时注意
	替换session工厂
	com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean

测试
	问题一：nested exception is org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.reflection.ReflectionException: Could not set property 'id' of 'class com.zhixiong.ssm.web.model.Employee' with value '1114209710992523266' Cause: java.lang.IllegalArgumentException: argument type mismatch
	解决方案：设置主键策略
		@TableId
		idType.AUTO

	问题二：Cause: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: Table 'mp.employee' doesn't exist
	 	The error may involve com.zhixiong.ssm.web.mapper.EmployeeMapper.insert-Inline
	 	The error occurred while setting parameters
	解决方案：指定实体类与数据库表名的关系
	
	问题三：java.lang.IllegalArgumentException: Unknown return value type: java.lang.Integer] with root cause
	解决方案：编写@ResponseBody 即可解决

全局策略配置
	全局策略配置能够解决 主键、和对数据库表的映射关系

获取主键值
	默认是返回主键的值 不需要MyBatis繁琐的配置

查询方法
 一：接口继承BaseMapper 即通用Mapper

 insert方法 insertAllColumn
	insert：没有设置值时，默认不插入未设置值的字段，非空字段才入库
	insertAllColumn：字段全部进行插入操作

 updateById updateAllColumnById

 配置SQL动态打印
	<settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>
 查询操作
	select---Page Help
	MP--分页插件	
 MP启动注入SQL原理分析
	问题：继承了BaseMapper，并提供了通用方法，那么SQL 语句怎么来的
	
	AutoSqlInjector(SQL自动注入器)-->

 条件构造器
	EntityWrapper
  带条件的增删改操作
	.last("拼接的SQL")
	拼接到最后-->但是有SQL注入的风险

 模糊查询时条件like的使用
	SqlLike.DEFAULT

 or() 与 orNew()
	or:		与之前的条件判断where在同一个条件中()
	orNew:	与之前的条件判断where并列条件 另起一个条件()

 Condition的方式打开


MyBatis MBG 是什么玩意


ActiveRecord
	deleteById()进行操作时，若传入的主键值是数据库中不存在的值，仍然显示删除成功的提示 
	这里最好再删除之前自己做一些判断，删除之前进行确认

 AP的复杂selectPage查询

代码生成器
	MP 的代码生成器 和 Mybatis MBG 代码生成器:
	MP 的代码生成器都是基于 java 代码来生成。MBG 基于 xml 文件进行代码生成
	MyBatis 的代码生成器可生成: 实体类、Mapper 接口、Mapper 映射文件
	MP 的代码生成器可生成: 实体类(可以选择是否支持 AR)、Mapper 接口、Mapper 映射
	文件、 Service 层、Controller 层

插件扩展