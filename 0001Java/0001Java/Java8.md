# Java8

## Lambda表达式

## 延迟加载

## 语法

```java
// 语法
(Object ...args) -> {}
()->{}
```

### 函数式接口

只包含一个抽象方法的接口

```
@FunctionalInterface
java.lang.FunctionalInterface
```

### 核心接口

```java
Consumer<T>
// 消费型接口  
// 对类型为T的对象应用操作，包含方法: void accept(T t)

Supplier<T>
// 供给型接口
// 返回类型为T的对象，包含方法: T get()
  
Function<T,R>
// 函数型接口
// 对类型为T的对象应用操作，并返回结果；结果是R类型的对象。包含方法: R apply(T t);
  
Predicate<T>
// 断言接口
// 确定类型为T的对象是否满足某约束，并返回boolean值。包含方法:boolean test(T t)
```

### 其他接口

```java
BiFunction<T, U, R>
// 对类型为 T, U 参数应用 操作，返回 R 类型的结 果。包含方法为: R apply(T t, U u);

UnaryOperator<T> 
// (Function子接口)
// 对类型为T的对象进行一元运算，并返回T类型的 结果。包含方法为:T apply(T t); 
  
BinaryOperator<T> 
// (BiFunction 子接口)
// 对类型为T的对象进行二 元运算，并返回T类型的 结果。包含方法为:T apply(T t1, T t2);

BiConsumer<T, U>
// 对类型为T, U 参数应用 操作。包含方法为:void accept(T t, U u)

ToIntFunction<T>
ToLongFunction<T> 
ToDoubleFunction<T>
// 分别计算int、long、 double、值的函数
  
IntFunction<R> 
LongFunction<R> 
DoubleFunction<R>
// 参数分别为int、long、 double 类型的函数
```

### 方法引用

```
Object::method
ClassName::method
对象::实例方法 
类::静态方法 
类::实例方法

this::method
super::method
```

### 构造器引用

```java
ClassName::new
```

### 数组引用

```java
type[]::new
```



## Stream API

```Java
java.util.stream.*
Stream 自己不会存储元素。
Stream 不会改变源对象。相反，他们会返回一个持有结果的新Stream。 
Stream 操作是延迟执行的。这意味着他们会等到需要结果的时候才执行。
```



## 便于并行

## Optional

最大化减少空指针异常

```java
Optional<T> 类(java.util.Optional) 是一个容器类，代表一个值存在或不存在， 原来用 null 表示一个值不存在，
现在 Optional 可以更好的表达这个概念。并且可以避免空指针异常。

 常用方法:
Optional.of(T t) : 创建一个 Optional 实例
Optional.empty() : 创建一个空的 Optional 实例
Optional.ofNullable(T t):若 t 不为 null,创建 Optional 实例,否则创建空实例 isPresent() : 判断是否包含值
orElse(T t) : 如果调用对象包含值，返回该值，否则返回t
orElseGet(Supplier s) :如果调用对象包含值，返回该值，否则返回 s 获取的值 map(Function f): 如果有值对其处理，并返回处理后的Optional，否则返回 Optional.empty() flatMap(Function mapper):与 map 类似，要求返回值必须是Optional
```

## 重复注解与类型注解