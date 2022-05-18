# MyBatis_TK

详细信息请多查询官网

https://gitee.com/free

https://gitee.com/free/Mapper/wikis/Home

## 注解

@Id

需要使用@Id 主键明确标记和数据库表主键字段对应的实体类字段，否则通用Mapper 会将所有实体类字段作为联合主键

@GeneratedValue  主键回显

@Table 

@Column 

@Transient

## 常用方法

selectOne()

xxxByPrimaryKey 方法

xxxSelective 方法

非主键字段如果为 null 值，则不加入到 SQL 语句中

## QBC 查询

## 

```mysql
CREATE TABLE `tabple_emp` (
	`emp_id` INT NOT NULL AUTO_INCREMENT,
	`emp_name` VARCHAR ( 500 ) NULL,
	`emp_salary` DOUBLE ( 15, 5 ) NULL,
	`emp_age` INT NULL,
	PRIMARY KEY ( `emp_id` ) 
);
INSERT INTO `tabple_emp` ( `emp_name`, `emp_salary`, `emp_age` )
VALUES
	( 'tom', '1254.37', '27' );
INSERT INTO `tabple_emp` ( `emp_name`, `emp_salary`, `emp_age` )
VALUES
	( 'jerry', '6635.42', '38' );
INSERT INTO `tabple_emp` ( `emp_name`, `emp_salary`, `emp_age` )
VALUES
	( 'bob', '5560.11', '40' );
INSERT INTO `tabple_emp` ( `emp_name`, `emp_salary`, `emp_age` )
VALUES
	( 'kate', '2209.11', '22' );
INSERT INTO `tabple_emp` ( `emp_name`, `emp_salary`, `emp_age` )
VALUES
	( 'justin', '4203.15', '30' )
```

## 二级缓存

```yaml
mybatis:
 configuration:
  cache-enabled: true # @CacheNamespace 需要在改删查中对缓存刷新操作
```



```java
/**
* 增加注解
*/
@CacheNamespace(flushInterval=30000)
public interface EmployeeMapper extends Mapper<Employee> {
}

/**
* 需要序列化支持
*/
public class Employee implements Serializable {
    
}


/**

eviction：缓存的回收策略
LRU - 最近最少使用，移除最长时间不被使用的对象
FIFO - 先进先出，按对象进入缓存的顺序来移除它们
SOFT - 软引用，移除基于垃圾回收器状态和软引用规则的对象
WEAK - 弱引用，更积极地移除基于垃圾收集器和弱引用规则的对象
默认的是LRU 
flushInterval：缓存刷新间隔
缓存多长时间清空一次，默认不清空，设置一个毫秒值
readOnly：是否只读
true：只读：mybatis认为所有从缓存中获取数据的操作都是只读操作，不会修改数据。
 mybatis为了加快获取数据，直接就会将数据在缓存中的引用交给用户 。不安全，速度快
false：读写(默认)：mybatis觉得获取的数据可能会被修改
mybatis会利用序列化&反序列化的技术克隆一份新的数据给你。安全，速度相对慢
size：缓存存放多少个元素
type：指定自定义缓存的全类名(实现Cache接口即可) 
*/
```



### 自定义Mapper接口

```yaml
mapper:
  mappers: #自定义的mappers 配置在这个地方
    - tk.mybatis.mapper.common.Mapper
```



```java
@RegisterMapper
public interface MyEmpMapper<T> {

    /**
     * 查询全部结果
     *
     * @return
     */
    @SelectProvider(type = MySelectProvider.class, method = "dynamicSQL")
    List<T> selectAll();
}

public class MySelectProvider extends MapperTemplate {
    public MySelectProvider(Class<?> mapperClass, MapperHelper mapperHelper) {
        super(mapperClass, mapperHelper);
    }


/**
* 查询全部结果
* @param ms
* @return
*/
public String selectAll(MappedStatement ms) {
     final Class<?> entityClass = getEntityClass(ms);
     //修改返回值类型为实体类型
     setResultType(ms, entityClass);
     StringBuilder sql = new StringBuilder();
     sql.append(SqlHelper.selectAllColumns(entityClass));
     sql.append(SqlHelper.fromTable(entityClass, tableName(entityClass)));
        sql.append(SqlHelper.orderByDefault(entityClass));
        return sql.toString();
    }
}


/**
*  使用
*/
public interface MyE extends MyEmpMapper<Employee> {

}
```





## 类型处理

TypeHandler

 	通用 Mapper 默认情况下会忽略复杂类型，对复杂类型不进行“从类到表”的映射



### 方式一

```java
package com.noxus.draven.tk.handler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.noxus.draven.tk.entities.Address;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;


public class AddressTypeHandler extends BaseTypeHandler<Address> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Address address, JdbcType jdbcType)
            throws SQLException {

        //1.对address对象进行验证
        if (address == null) {
            return;
        }

        //2.从address对象中取出具体数据
        String province = address.getProvince();
        String city = address.getCity();
        String street = address.getStreet();

        //3.拼装成一个字符串
        //规则：各个值之间使用“,”分开
        StringBuilder builder = new StringBuilder();
        builder
                .append(province)
                .append(",")
                .append(city)
                .append(",")
                .append(street);

        String parameterValue = builder.toString();

        //4.设置参数
        ps.setString(i, parameterValue);

    }

    @Override
    public Address getNullableResult(ResultSet rs, String columnName) throws SQLException {

        //1.根据字段名从rs对象中获取字段值
        String columnValue = rs.getString(columnName);

        //2.验证columnValue是否有效
        if (columnValue == null || columnValue.length() == 0 || !columnValue.contains(",")) {
            return null;
        }

        //3.根据“,”对columnValue进行拆分
        String[] split = columnValue.split(",");

        //4.从拆分结果数组中获取Address需要的具体数据
        String province = split[0];
        String city = split[1];
        String street = split[2];

        //5.根据具体对象组装一个Address对象
        Address address = new Address(province, city, street);

        return address;
    }

    @Override
    public Address getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        //1.根据字段名从rs对象中获取字段值
        String columnValue = rs.getString(columnIndex);

        //2.验证columnValue是否有效
        if (columnValue == null || columnValue.length() == 0 || !columnValue.contains(",")) {
            return null;
        }

        //3.根据“,”对columnValue进行拆分
        String[] split = columnValue.split(",");

        //4.从拆分结果数组中获取Address需要的具体数据
        String province = split[0];
        String city = split[1];
        String street = split[2];

        //5.根据具体对象组装一个Address对象
        Address address = new Address(province, city, street);

        return address;
    }

    @Override
    public Address getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        //1.根据字段名从rs对象中获取字段值
        String columnValue = cs.getString(columnIndex);

        //2.验证columnValue是否有效
        if (columnValue == null || columnValue.length() == 0 || !columnValue.contains(",")) {
            return null;
        }

        //3.根据“,”对columnValue进行拆分
        String[] split = columnValue.split(",");

        //4.从拆分结果数组中获取Address需要的具体数据
        String province = split[0];
        String city = split[1];
        String street = split[2];

        //5.根据具体对象组装一个Address对象
        Address address = new Address(province, city, street);

        return address;
    }

}



package com.noxus.draven.tk.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CREATE TABLE `table_user` (
 * `user_id` INT NOT NULL AUTO_INCREMENT,
 * `user_name` VARCHAR (100) NULL,
 * `address` VARCHAR (100) NULL,
 * `season` VARCHAR (100) NULL,
 * PRIMARY KEY (`user_id`)
 * );
 *
 * @author Lenovo
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "table_user")
public class User {

    @Id
    private Integer userId;

    private String userName;

    @ColumnType(typeHandler=AddressTypeHandler.class)
    private Address address;

    private SeasonEnum season;

    @Override
    public String toString() {
        return "User [userId=" + userId + ", userName=" + userName + ", address=" + address + ", season=" + season
                + "]";
    }
}
```

### 方式二

```yaml
mybatis: # 全局类型处理器 实体类需要配合@Column使用
 type-handlers-package: com.noxus.draven.tk.handler
```



```java
package com.noxus.draven.tk.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CREATE TABLE `table_user` (
 * `user_id` INT NOT NULL AUTO_INCREMENT,
 * `user_name` VARCHAR (100) NULL,
 * `address` VARCHAR (100) NULL,
 * `season` VARCHAR (100) NULL,
 * PRIMARY KEY (`user_id`)
 * );
 *
 * @author Lenovo
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "table_user")
public class User {

    @Id
    private Integer userId;

    private String userName;

    //@ColumnType(typeHandler=AddressTypeHandler.class)
    @Column
    private Address address;

    //在枚举类型这里无法使用@ColumnType注解注册MyBatis内置的枚举类型处理器
    //@ColumnType(typeHandler=EnumTypeHandler.class)
    @Column
    private SeasonEnum season;

    @Override
    public String toString() {
        return "User [userId=" + userId + ", userName=" + userName + ", address=" + address + ", season=" + season
                + "]";
    }
}

```



### 枚举

​	org.apache.ibatis.type.EnumTypeHandler<E>
​	在数据库中存储枚举值本身
​	org.apache.ibatis.type.EnumOrdinalTypeHandler<E>
​	在数据库中仅仅存储枚举值的索引

## 逆向工程（待定）

# FQA

mysql distinct和order by 一起用时，order by的字段必须在select中。

网上查了一下资料，原因总结如下：

    首先，在mysql中distinct 的执行顺序高于order by。
    第二，distinct执行时会对查询的记录进行去重，产生一张虚拟的临时表；
    第三，order by执行时对查询的虚拟临时表进行排序，产生新的虚拟临时表。

综合来看，如果order by的字段不在select中，执行sql语句时首先执行distinct，之后产生的虚拟临时表中没有order by的字段，所以再执行order by时会报错。



配置文件

```yaml
server:
  port: 8081
spring:
  # 配置数据源
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://116.196.77.250:3306/user?characterEncoding=utf8&serverTimezone=UTC&useSSL=false&allowPublicKeyRetrieval=true
    username: root
    password: root
#    type: com.alibaba.druid.pool.DruidDataSource
# mybatis-plus相关配置
mybatis:
  # xml扫描，多个目录用逗号或者分号分隔（告诉 Mapper 所对应的 XML 文件位置）
  mapper-locations: classpath:mappings/*.xml
  # 以下配置均有默认值,可以不设置
  global-config:
    db-config:
      #主键类型  auto:"数据库ID自增" 1:"用户输入ID",2:"全局唯一ID (数字类型唯一ID)", 3:"全局唯一ID UUID";
      id-type: auto
      #字段策略 IGNORED:"忽略判断"  NOT_NULL:"非 NULL 判断")  NOT_EMPTY:"非空判断"
      field-strategy: NOT_EMPTY
      #数据库类型
      db-type: MYSQL
  configuration:
    # 是否开启自动驼峰命名规则映射:从数据库列名到Java属性驼峰命名的类似映射
    map-underscore-to-camel-case: true
    # 如果查询结果中包含空值的列，则 MyBatis 在映射的时候，不会映射这个字段
    call-setters-on-nulls: true
    # 这个配置会将执行的sql打印出来，在开发或测试的时候可以用
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    cache-enabled: true # @CacheNamespace 需要在改删查中对缓存刷新操作
    safe-result-handler-enabled: true
  type-handlers-package: com.noxus.draven.tk.handler # 全局类型处理器 实体类需要配合@Column使用
  type-aliases-package: com.noxus.draven.tk.entities




mapper:
  mappers: #自定义的mappers 配置在这个地方
    - tk.mybatis.mapper.common.Mapper
    #- tk.mybatis.mapper.common.Mapper2
  notEmpty: true
  enum-as-simple-type: true # 枚举作为简单类型处理 org.apache.ibatis.type.EnumTypeHandler<E>
  check-example-entity-class: true # 检查表字段相同时，误操作
  safe-delete: true # 防止误操作
  safe-update: true # 防止误更新
  use-java-type: true # 实体类主键提取到父类需要识别泛型时使用
```