spring 获取request对象的三种方式

 第一种，最简单的方式，使用注解：
	@Autowired
	private  HttpServletRequest request;

 第二种，web.xml中配置一个监听器。
	<listener>  
        <listener-class>  
            org.springframework.web.context.request.RequestContextListener  
        </listener-class>  
	</listener>  

	HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();

 第三种，作为请求参数传进来。
	HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest(); 

 如果使用struts2，可以使用：

	HttpServletRequest request = ServletActionContext.getRequest(); 
