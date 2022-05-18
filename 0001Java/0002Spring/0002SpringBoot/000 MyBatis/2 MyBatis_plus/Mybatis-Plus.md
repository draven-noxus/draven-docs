# MyBatis-Plus



安装
引入依赖
Maven：

```xml
	--Boot工程
	<dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.1.0</version>
    </dependency>
	--Spring
	<dependency>
    	<groupId>com.baomidou</groupId>
    	<artifactId>mybatis-plus</artifactId>
    	<version>3.1.0</version>
	</dependency>
	--Snapshot
	<repository>
	    <id>snapshots</id>	   <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
	</repository>
```

配置
	--Boot工程
	@SpringBootApplication
	//扫描Mapper所在包
	@MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
	public class Application {

	    public static void main(String[] args) {
	        SpringApplication.run(QuickStartApplication.class, args);
	    }
	
	}
	--Spring
		--配置 MapperScan
	<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
   		<property name="basePackage" value="com.baomidou.mybatisplus.samples.quickstart.mapper"/>
	</bean>
		--调整 SqlSessionFactory 为 MyBatis-Plus 的 SqlSessionFactory
	<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
		<property name="dataSource" ref="dataSource"/>
	</bean>

注解
	#
	@TableName
	描述：表名注解
	属性 	类型 	必须指定 	默认值 	意义 	解释
	value 	String 	否 	"" 	表名 	有值设置则按设置的值为准
	resultMap 	String 	否 	"" 	xml 中 resultMap 的 id 	设置此值则按指定的 resultMap 封装数据
	
	#
	@TableId
	描述：主键注解
	属性 	类型 	必须指定 	默认值 	意义 	解释
	value 	String 	否 	"" 	字段名 	有值设置则按设置的值为准
	type 	Enum 	否 	IdType.NONE 	主键类型 	主键是为何种类型
	
		#
		IdType
		值 	描述
		AUTO 	数据库自增
		INPUT 	自行输入
		ID_WORKER 	分布式全局唯一ID 长整型类型
		UUID 	32位UUID字符串
		NONE 	无状态
		ID_WORKER_STR 	分布式全局唯一ID 字符串类型
	
	#
	@TableField
	描述：字段注解(非主键)
	
	属性 	类型 	必须指定 	默认值 	意义 	解释
	value 	String 	否 	"" 	字段名 	有值设置则按设置的值为准
	el 	String 	否 	"" 	映射为原生 #{ ... } 逻辑 	相当于写在 xml 里的 #{ ... } 部分
	exist 	boolean 	否 	true 	是否为数据库表字段 	标识该字段是数据库表字段
	condition 	String 	否 	"" 	字段 where 实体查询比较条件 	有值设置则按设置的值为准,没有则为默认全局的 %s=#{%s},参考
	update 	String 	否 	"" 	字段 update set 部分注入 	该属性优先级高于 el 属性
	strategy 	Enum 	否 	FieldStrategy.DEFAULT 	字段验证策略 	构建的所有能根据 entity 产出 sql 的字段验证策略,类比于 xml 里的 if 标签
	fill 	Enum 	否 	FieldFill.DEFAULT 	字段自动填充策略 	启动自动填充功能所需要的注解
	select 	boolean 	否 	true 	是否进行 select 查询 	大字段可设置为 false 不自动加入 select 查询字段
		#
		FieldStrategy
		值 	描述
		IGNORED 	忽略判断
		NOT_NULL 	非NULL判断
		NOT_EMPTY 	非空判断(只对字符串类型字段,其他类型字段依然为非NULL判断)
		DEFAULT 	追随全局配置
		#
		FieldFill
		值 	描述
		DEFAULT 	默认不处理
		INSERT 	插入时填充字段
		UPDATE 	更新时填充字段
		INSERT_UPDATE 	插入和更新时填充字段
	
	#
	@Version
	描述：乐观锁注解、标记 @Verison 在字段上
	属性：无
	
	#
	@EnumValue
	描述：通枚举类注解
	属性：无
	
	#
	@TableLogic
	描述：表字段逻辑处理注解（逻辑删除）
	属性：value、delval
	
		#
		value
   	 描述：逻辑未删除值
   	 默认：该值可无、会自动获取全局配置

		#
		delval
		描述：逻辑删除值
		默认：该值可无、会自动获取全局配置
	
	#
	@SqlParser
	描述：租户注解 目前只支持注解在 mapper 的方法上
	属性：filter
	
		#
		filter	
		描述：过滤 SQL 解析
		默认：false 不处理 true 过滤
	
	#
	@KeySequence
	
	描述：序列主键策略 oracle
	属性：value、resultMap
	
		#
		value
	
		描述：序列名
		默认：空 可指定为数据库对应的序列
	
		#
		clazz
	
		描述：ID 类型
		默认：Long.class

代码生成器
	MyBatis-Plus 从 3.0.3 之后移除了代码生成器与模板引擎的默认依赖，需要手动添加相关依赖：

    添加 代码生成器 依赖
    
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-generator</artifactId>
        <version>3.1.0</version>
    </dependency>
    
    添加 模板引擎 依赖，MyBatis-Plus 支持 Velocity（默认）、Freemarker、Beetl，用户可以选择自己熟悉的模板引擎，如果都不满足您的要求，可以采用自定义模板引擎。
    
    Velocity（默认）：
    
    <dependency>
        <groupId>org.apache.velocity</groupId>
        <artifactId>velocity-engine-core</artifactId>
        <version>2.1</version>
    </dependency>
    
    Freemarker：
    
    <dependency>
        <groupId>org.freemarker</groupId>
        <artifactId>freemarker</artifactId>
        <version>2.3.28</version>
    </dependency>
    
    Beetl：
    
    <dependency>
        <groupId>com.ibeetl</groupId>
        <artifactId>beetl</artifactId>
        <version>2.9.9</version>
    </dependency>

​	

# 说明

##  BaseMapper<T>

```java
package com.noxus.draven.plus.mapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import org.apache.ibatis.annotations.Param;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * Mapper 继承该接口后，无需编写 mapper.xml 文件，即可获得CRUD功能
 * 这个 Mapper 支持 id 泛型*
 *
 * @author hubin
 * @since 2016-01-23
 */
public interface BaseMapper<T> {
    /**
     * <p>
     * 插入一条记录
     * </p>
     *
     * @param entity 实体对象
     */
    int insert(T entity);

    /**
     * <p>
     * 根据 ID 删除
     * </p>
     *
     * @param id 主键ID
     */
    int deleteById(Serializable id);

    /**
     * <p>
     * 根据 columnMap 条件，删除记录
     * </p>
     *
     * @param columnMap 表字段 map 对象
     */
    int deleteByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);

    /**
     * <p>
     * 根据 entity 条件，删除记录
     * </p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    int delete(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * <p>
     * 删除（根据ID 批量删除）
     *
     * @param idList 主键ID列表(不能为 null 以及 empty)
     */
    int deleteBatchIds(@Param(Constants.COLLECTION) Collection<? extends
            Serializable> idList);

    /**
     * <p>
     * 根据 ID 修改
     * </p>
     *
     * @param entity 实体对象
     */
    int updateById(@Param(Constants.ENTITY) T entity);

    /**
     * <p>
     * 根据 whereEntity 条件，更新记录
     * </p>
     *
     * @param entity        实体对象 (set 条件值,不能为 null)
     * @param updateWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where
     *                      语句）
     */
    int update(@Param(Constants.ENTITY) T entity, @Param(Constants.WRAPPER)
            Wrapper<T> updateWrapper);

    /**
     * <p>
     * 根据 ID 查询
     * </p>
     *
     * @param id 主键ID
     */
    T selectById(Serializable id);

    /**
     * <p>
     * 查询（根据ID 批量查询）
     * </p>
     *
     * @param idList 主键ID列表(不能为 null 以及 empty)
     */
    List<T> selectBatchIds(@Param(Constants.COLLECTION) Collection<? extends
            Serializable> idList);

    /**
     * <p>
     * 查询（根据 columnMap 条件）
     * </p>
     *
     * @param columnMap 表字段 map 对象
     */
    List<T> selectByMap(@Param(Constants.COLUMN_MAP) Map<String, Object>
                                columnMap);

    /**
     * <p>
     * 根据 entity 条件，查询一条记录
     * </p>
     *
     * @param queryWrapper 实体对象
     */
    T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * <p>
     * 根据 Wrapper 条件，查询总记录数
     * </p>
     *
     * @param queryWrapper 实体对象
     */
    Integer selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * <p>
     * 根据 entity 条件，查询全部记录
     * </p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * <p>
     * 根据 Wrapper 条件，查询全部记录
     * </p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T>
                                                 queryWrapper);

    /**
     * <p>
     * 根据 Wrapper 条件，查询全部记录
     * 注意： 只返回第一个字段的值
     * </p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * @param page         分页查询条件（可以为 RowBounds.DEFAULT）
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    IPage<T> selectPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T>
            queryWrapper);

    /**
     * <p>
     * 根据 Wrapper 条件，查询全部记录（并翻页）
     * </p>
     *
     * @param page         分页查询条件
     * @param queryWrapper 实体对象封装操作类
     */
    IPage<Map<String, Object>> selectMapsPage(IPage<T> page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
}
```

# FQA