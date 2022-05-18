MyBatis
	基础知识：#编写SQL#  预编译 设置参数 执行SQL 封装结果

	github下载

##测试过程
 构建：
	MyBatis.xml
		数据源
	
	过程：
	1.根据全局配置文件创建一个SqlSessionFactory对象
	来源：通过MyBatis提供的方法Resource
	2.通过SqlSessionFactory对象获取SqlSession实例（执行已经映射的SQL语句）
	来源：.openSession()----## 非线程安全 ##
	3.编写SQL映射文件并注册到全局配置文件中
		参数一：唯一标识符号
		参数二：需要执行的SQL语句的参数
			解释一下什么叫已经映射的xxx	
				<mapper namespace=名称空间   与接口全限定类名进行绑定
					<select id = 唯一标识 resultType=返回结果值
	4.开始编写SQL	
		#{} 从参数中去取参数值
						
	5.数据不能映射解决方案
		方案一：起别名
		方案二：做结果集映射


动态绑定：--接口式编程--
	编写接口
	namespace=接口的全限定类名
	映射文件的唯一标识和和接口的方法名一致
	动态代理：cglib 
##

配置文件介绍
	约束文件：绑定约束文件 两个一个配置一个映射
	<configuration> 全局配置文件
	1.<properties> 
		--> 引入外部的配置文件 eg:db.perties 一般引用比较多的是数据库配置信息
		resource:引入类路径下的资源文件
		url:	引入网络路径或磁盘路径下的资源文件
	2.<settings> 
		--> setting name value
		-->驼峰命名
		-->打开SQL语句
	3.typeAliases ------别名不区分大小写     为我们提供了一些别名
		给java类型起别名
		方案一：为一个类起别名
		<typeAliaese>
			<typeAlias type=全限类名 （别名默认类小写）  alias=指定别名
		</typeAliaese>
		方案二：批量起别名
		<package name=指定包名 当前包以及子包下面
		方案三：在批量起别名的前提下 若有重复的类名 可在实体类上使用@Alias("类名")

	4.<typeHandlers> 数据类型转换--数据库Vs实体类	为我们提供了一些别名 3.4以前需要手动处理
		自定义类型处理器
	5.plugins
		四大对象的拦截
		Excutor				执行器
		ParameterHandler	参数转换器
		ResutSetHandler		结果集处理器
		StatementHandler	SQL语句处理器
	6.<environments default="development">  环境的切换
		必须含有
		<transactionManager type=JDBC（JdbcTransactionFactory）  MANAGED（ManagedTransactionFactory） 自定义实现TransactionFactory接口即可
			<datasource type= JNDI（JndiDataSourceFactory） POOLED（PooledDataSourceFactory） UNPOOLED（UnpooledDataSourceFactory）

	7.<databaseldProvider  可移植性
		<databaseldProvider type=得到数据数库厂商标识   (VendorDatabaseIdProvider)
			<property name=数据库类型 value=起别名
			最后在SQL 映射文件中指定 databaseId=上述的别名
	8.<mappers
		将sql映射注射到全局配置文件中
			<mapper  
				resource:	引入类路径下的资源文件
				url:		引入网络路径或磁盘路径下的资源文件
		存在疑问	class:  	注册接口
					存在映射文件+与接口同一包名下
					基于注解的，没有SQL映射文件	
				<package name=批量注册的包路径
		资源路径下创建相同的包路径  可以将.xml和实体类分开


##  *映射文件* ##
	---新增时，实体类主键为Integer 
		Could not set property 'id' of 'class com.zhixiong.ssm.web.model.Employee' with value '1115276273141215234' Cause: java.lang.IllegalArgumentException: argument type mismatch

		增删改 支持返回 Long boolean Integer
	获取自增主键-MySql
		useGeneratedKeys="true" keyProperty="id"
	采用序列自增-Oracle
		BEFORE ---<selectKey keyProperty="id" order="BEFORE" resultType="Integer">
						select EMPLOYEES_SEQ.nextval from dual
		AFTER  ---<selectKey keyProperty="id" order="AFTER" resultType="Integer"> ---尽量不要使用
						select EMPLOYEES_SEQ.currval from dual
参数处理
	一.单个参数 #{参数名}  随便写
	二.多个参数	#{参数名1} #{参数名2} 
		特殊处理：多个参数会被封装成一个map  	#{} 实际是获取map中key对应的值
				key:	param1...paramN   要写成这样--->#{param1} #{param2}
				value:	传入的参数值
		建议:使用命名参数的方法 其性质和上面是一样的
				@Param("id"),@Param("lastName")

	三.直接传入pojo
	#{属性名}
	
	四.不是pojo：为了方便：
		1.直接传入map
	#{}取出来的是map中key对应的值
		2.抽取pojo vo对象
	五.单个参数 和 pojo对象
	#{params}  #{pojo.属性名}

	六.集合类型List Set
	Collectoin（collection）
	List	list    		#{list[0]}
	Array	array			#{array[0]}
	#{}

参数处理(源码分析)
	org.apache.ibatis.binding.MapperProxy#invoke
	org.apache.ibatis.binding.MapperMethod#execute
	org.apache.ibatis.binding.MapperMethod.MethodSignature#convertArgsToSqlCommandParam
	org.apache.ibatis.reflection.ParamNameResolver#getNamedParams

#{} 与 ${}的区别
	${} 直接赋值 	排序  等不支持  即那些原生JDBC都不支持的情况
	#{} 预编译		防止SQL注入 

	#{} 规定参数的类型
		javaType
	
		model

		jdbcType	在数据为null  有些数据库不能识别mybatis null的处理  Oracle会报错
					若为Oracle 则会报错 无效的类型jdbcType OTHER
					默认将null 映射为OTHER 
					方案： 一.javaType  #{字段值,jdbcType=NULL}
						  二. 默认jdbcTypeForNull=OTHER
							  修改为jdbcTypeForNull=NULL
							  <setting name="jdbcTypeForNull" value="NULL"/>
		numericScale

标签
select
  resultType:
	POJO： resultType=""
	List：元素的类型 resultType="POJO" 
	一条记录的map(column:column)  resultType=map
	多条记录的map(column:column)  接口方法中添加注解@MapKey("id") 指定封装map时哪个字段作为key   resultType="POJO"
  resultMap:自定义结果集
	用法一：  <!--自定义POJO的封装类型-->
    <resultMap id="MyEmp" type="com.zhixiong.ssm.web.model.Employee">
        <id column="id" property="id"/>
        <result column="last_name" property="lastName"/>
    </resultMap>
	对此进行引用
	
	用法二：级联属性方式
		 <resultMap type="com.zhixiong.ssm.web.model.Employee" id="MydiffEmp">
        <id column="id" property="id"/>
        <result column="last_name" property="lastName"/>
        <result column="gender" property="gender"/>
        <result column="did" property="dept.did"/>
        <result column="dept_name" property="dept.departmentName"/>
    </resultMap>

	用法三：association-看作属性
	  <resultMap type="com.zhixiong.ssm.web.model.Employee" id="MyassEmp">
        <id column="id" property="id"/>
        <result column="last_name" property="lastName"/>
        <result column="gender" property="gender"/>
        <association property="dept" javaType="com.zhixiong.ssm.web.model.Department">
            <id column="did" property="did"/>
            <result column="dept_name" property="departmentName"/>
        </association>
    </resultMap>

	用法四：association--分步查询
		 <resultMap type="com.zhixiong.ssm.web.model.Employee" id="MyEmpByStep">
        <id column="id" property="id"/>
        <result column="last_name" property="lastName"/>
        <result column="gender" property="gender"/>
        <association property="dept" select="com.zhixiong.ssm.web.mapper.DepartmentMapper.selectById" column="d_id">
            <result column="dept_name" property="departmentName"/>
        </association>
    </resultMap>

	用法五：association--延迟加载
		全局配置：lazyLoadingEnable=true  aggressiveLazyLoading=false（false为按需加载---true为全部加载）

 collection
	用法六：collection--关联集合嵌套结果集
		<resultMap id="MyDept" type="com.zhixiong.ssm.web.model.Department">
        	<id column="" property=""></id>
        	<result column="" property=""></result>
        	<collection property="emps" ofType="com.zhixiong.ssm.web.model.Employee">
            <id column="" property=""></id>
            <result column="" property=""></result>
        	</collection>
    	</resultMap>

	用法七：collection--分步查询
		 <resultMap id="m" type="com.zhixiong.ssm.web.model.Department">
        	<id column="" property=""></id>
        	<result column="" property=""></result>
        	<collection property="emps" select="com.zhixiong.ssm.web.model.EmployeeMapper.selectById" column="did" fetchType="lazy>
            <id column="" property=""></id>
            <result column="" property=""></result>
        	</collection>
    	</resultMap>

	用法八：collection--延迟查询


	用法九：分步查询 多列查询时
		  column="did"-->{key1=value,key2=value2}   fetchType="lazy" 也可以控制

 鉴别器：
	discriminator判断某列的值
		在自定义resultMap的基础上 使用该标签对业务进行判断


#动态SQL
	特殊字符可以使用转义字符
	if
			<if test>
	where	
			方案一：1=1
			方案二：where标签
				 会自动去除第一个 的and or
	trim   截取
		
			<prefix="">			 给整个字符串加一个前缀
			<prefixOverrides=""> 去掉整个字符串 前面多余的 字符
			<suffix="">			 给整个字符串加一个后缀
			<suffixOverrides=""> 去掉整个字符串 后面多余的 字符

			where
			set		封装修改条件 去掉最后一个 ","
			
	choose	
			<choose> 
				<when test "!=null">
					
				</when>
				<when test "!=null"l>
					
				</when>

			</choose>

	

	foreach 
			collection 指定要遍历的集合  
			item 遍历出的元素要赋值给指定的变量  
			#{去取出变量值}
			separator "," 每个元素之间的分隔符
			open "(" close=")"
			index=""    list-->索引  map-->key

			
		 批量插入


    Configuration        MyBatis所有的配置信息都保存在Configuration对象之中，配置文件中的大部分配置都会存储到该类中
    SqlSession            作为MyBatis工作的主要顶层API，表示和数据库交互时的会话，完成必要数据库增删改查功能
    Executor               MyBatis执行器，是MyBatis 调度的核心，负责SQL语句的生成和查询缓存的维护
    StatementHandler 封装了JDBC Statement操作，负责对JDBC statement 的操作，如设置参数等
    ParameterHandler  负责对用户传递的参数转换成JDBC Statement 所对应的数据类型
    ResultSetHandler   负责将JDBC返回的ResultSet结果集对象转换成List类型的集合
    TypeHandler          负责java数据类型和jdbc数据类型(也可以说是数据表列类型)之间的映射和转换
    MappedStatement  MappedStatement维护一条<select|update|delete|insert>节点的封装
    SqlSource              负责根据用户传递的parameterObject，动态地生成SQL语句，将信息封装到BoundSql对象中，并返回
    BoundSql              表示动态生成的SQL语句以及相应的参数信息

