RabbitMq

## 环境搭建

https://hub.docker.com/_/rabbitmq



```java
// 手动创建
@RabbitListener(queues = "myQueue")
// 自动新建
@RabbitListener(queuesToDeclare = @Queue("myQueue"))

//自动创建 exchange 和 Queue绑定
@RabbitListener（bindings = @QueueBinding(
    value = @Queue("myQueue")
    exchange = @Exchange("myExchange")
	
)）

//自动创建 exchange 和 Queue绑定 分组
@RabbitListener（bindings = @QueueBinding(
    key = "key" //路由
    value = @Queue("myQueue")
    exchange = @Exchange("myExchange")
	
)）
```

