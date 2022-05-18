# MyBatis

构建者模式

工厂模式

代理模式



占位符

#{}

${}



# 延迟加载

## oneToOne

association

## oneToMany

collection

# 缓存机制

经常查询并且不经常改变

数据的正确与否对最终结果影响不大的

## 一级缓存

### 介绍

存在于SqlSession中对象的缓存

该区域结构是一个map

再次查询时，先去sqlSession中获取

sqlSession.clearCache()

### 清空

当调用sqlSession的 

update insert delete 

commit() close()

就会清空一级缓存

## 二级缓存

### 介绍

存在于SqlSessionFactory对象，

由同一个SqlSessionFactory对象生成的sqlSession都会共享二级缓存

存放的数据，而不是对象（会重新创建对象封装对应的数据）

### 开启

配置二级缓存生效（全局）

当前映射文件（namespace）

当前操作（sql标签）





# 注解开发

## 环境介绍

```java
// 配置环境
// 指定接口位置 - Mapper接口
// 配置别名 - 实体类
```



```java
//注解开发
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Select {
    String[] value();
}

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Insert {
    String[] value();
}

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Delete {
    String[] value();
}


@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Update {
    String[] value();
}

// 二级缓存
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
public @interface CacheNamespace {
    Class<? extends Cache> implementation() default PerpetualCache.class;

    Class<? extends Cache> eviction() default LruCache.class;

    long flushInterval() default 0L;

    int size() default 1024;

    boolean readWrite() default true;

    boolean blocking() default false;

    Property[] properties() default {};
}



public interface Cache {
    String getId();

    void putObject(Object var1, Object var2);

    Object getObject(Object var1);

    Object removeObject(Object var1);

    void clear();

    int getSize();

    ReadWriteLock getReadWriteLock();
}



//接口方式
@CacheNamespace(blocking=true)
public interface XxxMapper{
//一对一
/**
* fetchType = FetchType.DEFAULT
* EAGER
* LAZY 
*/
@Select
@Results({
  @Result(id = true,property= "id" , column="id"),
  @Result(property= "x1" , column="y1"),
  @Result(property= "x2" , column="y2"),
  @Result(property= "object" , column="id",javaType=Object.class,
          one = @One(select = "sql.methodById",
          fetchType = FetchType.LAZY))
})



//一对多
/**
* fetchType = FetchType.DEFAULT
* EAGER
* LAZY 
*/
@Select
@Results({
  @Result(id = true,property= "id" , column="id"),
  @Result(property= "x1" , column="y1"),
  @Result(property= "x2" , column="y2"),
  @Result(property= "x3" , column="id",javaType=List.class,
          many = @Many(select = "sql.methodById",
          fetchType = FetchType.LAZY))
})

}


```

