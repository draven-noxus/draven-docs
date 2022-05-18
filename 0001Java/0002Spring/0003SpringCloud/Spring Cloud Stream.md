# Spring Cloud Stream

```java
//
//
//
public interface StreamClient{
    @Input("myMessage")
	SubscribableChannel intput();    
    
    @Output("myMessage")
	MessageChannel output(); 
    
    @Input("myMessagex")
	SubscribableChannel intputx();    
    
    @Output("myMessagex")
	MessageChannel outputx();   
}


//接受端
@Component
@EnableBinding(xxx.class)
public class xxx(){
    @StreamListener(value = "myMessage")
    @SendTo(value = "xx") //消息后返回信息
    public void process(Object message){
        sout("xxx");
    }
}



//发送端

public class TestController(){
    @Autowired
    private StreamClient streamClient;
    
    @GetMapping()
    public void process(){
       streamClient.output().send(MessageBuilder.withPayload("").build());
    }
    
}
```





```yaml
# 消息分组
spring：
 cloud:
  stream：
   bindings:
    myMessage:
     group: xxx
     content-type: application/json  # 默认是base64位编码
```





