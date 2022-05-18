# SpringBoot-WebSocket

```shell
# http://www.easyswoole.com/wstool.html
```



## 概念

```shell
@ServerEndpoint("/websocket/{uid}")
申明这是一个websocket服务
需要指定访问该服务的地址，在地址中可以指定参数，需要通过{}进行占位 

@OnOpen
用法:public void onOpen(Session session, @PathParam("uid") String uid) throws IOException{} 该方法将在建立连接后执行，会传入session对象，就是客户端与服务端建立的长连接通道 通过@PathParam获取url申明中的参数

@OnClose
用法:public void onClose() {}
      该方法是在连接关闭后执行
      
@OnMessage
用法:public void onMessage(String message, Session session) throws IOException {} 该方法用于接收客户端发来的消息
message:发来的消息数据
session:会话对象(也是通道)

发送消息到客户端 
用法:session.getBasicRemote().sendText("你好");
通过session进行发送。
```



## Server

```java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    MyHandshakeInterceptor myHandshakeInterceptor;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myHandler(), "/myHandler/{uid}")
                .addInterceptors(new HttpSessionHandshakeInterceptor()).addInterceptors(myHandshakeInterceptor)
                .setAllowedOrigins("*");
    }

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(8192);
        container.setMaxBinaryMessageBufferSize(8192);
        return container;
    }

    @Bean
    public WebSocketHandler myHandler() {
        return new MyHandler();
    }
}
```

```java
public class MyHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        System.out.println("获取到消息 >> " + message.getPayload());
        session.sendMessage(new TextMessage("消息已收到"));
        if (message.getPayload().equals("10")) {
            for (int i = 0; i < 10; i++) {
            }
        }
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws
            Exception {
        System.out.println(session.getAttributes().get("uid"));
        session.sendMessage(new TextMessage("欢迎连接到ws服务"));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        System.out.println("断开连接!");
    }
}
```



```java
@Component
public class MyHandshakeInterceptor implements HandshakeInterceptor {
    /**
     * 握手之前，若返回false，则不建立链接 *
     *
     * @param request
     * @param response
     * @param wsHandler
     * @param attributes
     * @return
     * @throws Exception
     */
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse
            response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws
            Exception {
        //将用户id放入socket处理器的会话(WebSocketSession)中
        attributes.put("uid", 1001);
        System.out.println("开始握手。。。。。。。");
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse
            response, WebSocketHandler wsHandler, Exception exception) {
        System.out.println("握手成功啦。。。。。。");
    }
}
```





Js

```html
<!doctype html>
<html dir="ltr" >
  <head>
    <meta charset="utf-8">
    <style>
    </style>
    <Title>咩咩羊</Title>
  </head>
  <script>
  	const socket = new WebSocket("ws://localhost:8082/websocket/1");
    socket.onopen = (ws) =>{
        	console.log("建立连接!", ws); 
    }
    
    socket.onmessage = (ws) =>{ 
      console.log("接收到消息 >> ",ws.data);
    }
    
    socket.onclose = (ws) =>{ 
      console.log("连接已断开!", ws);
    }
    
    socket.onerror = (ws) => {
        console.log("发送错误!", ws); }
        // 2秒后向服务端发送消息 
    		setTimeout(()=>{
        		socket.send("发送一条消息试试");
        },2000);
    
        // 5秒后断开连接 
    		setTimeout(()=>{
            socket.close();
    		},5000);

  </script>

  </body>
</html>
<!--
ws://127.0.0.1:10010/myHandler/1
-->
```





