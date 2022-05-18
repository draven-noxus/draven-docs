# JDK-Optional

@since 1.8

```java
/**
orElse 用的是括号内的对象
orElseGet 用的是Supplier接口返回的对象。 supplier接口就一个get方法。
无入参，出参要和Optional的对象同类型。
orElseThrow 用的是Supplier接口返回的对象，这个对象必须要实现Throwable。 supplier接口就一个get方法。 无入参，出参要实现Throwable.

public T orElse(T other)

Return the value if present, otherwise return other.

Parameters:
    other - the value to be returned if there is no value present, may be null
Returns:
    the value, if present, otherwise other 
    
    
    
    
public T orElseGet(Supplier<? extends T> other)

Return the value if present, otherwise invoke other and return the result of that invocation.

Parameters:
    other - a Supplier whose result is returned if no value is present
Returns:
    the value if present otherwise the result of other.get()
Throws:
    NullPointerException - if value is not present and other is null 
        
        
public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier)
                                    throws X extends Throwable

Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.

API Note:
    A method reference to the exception constructor with an empty argument list can be used as the supplier. For example, IllegalStateException::new
Type Parameters:
    X - Type of the exception to be thrown
Parameters:
    exceptionSupplier - The supplier which will return the exception to be thrown
Returns:
    the present value
Throws:
    X - if there is no value present
    NullPointerException - if no value is present and exceptionSupplier is null
    X extends Throwable 





System.out.println(Optional.ofNullable("正品").orElse("替代品"));
System.out.println(Optional.ofNullable(null).orElse("替代品"));


// 有宝马就不用走路
System.out.println(Optional.ofNullable("宝马").orElseGet(()->"走路")); 
// 没宝马，可以骑自行车
System.out.println(Optional.ofNullable(null).orElseGet(()->"自行车"));
// 没宝马，也可以骑电动车
System.out.println(Optional.ofNullable(null).orElseGet(()->"电动车"));  


// 有钱就没异常
try {
    System.out.println(Optional.ofNullable("钱").orElseThrow(()->new Exception()));  // 有钱不会抛异常
} catch (Throwable throwable) {
    throwable.printStackTrace();
}

// 没钱就会抛异常
try {
    System.out.println(Optional.ofNullable(null).orElseThrow(()->new Exception()));  // 没钱抛异常
} catch (Throwable throwable) {
    throwable.printStackTrace();
}


*/
```



```java
Optional<T> filter(Predicate<? super T> predicate)

<U> Optional<U> map(Function<? super T,? extends U> mapper)
    
<U> Optional<U> flatMap(Function<? super T,Optional<U>> mapper)
```

