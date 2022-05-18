# 设计模式

# 策略模式

## 概念

只关心结果，不关心具体怎么实现

## 条件



## 实现

```java
/**
* 定义一个接口 定义一些行为
*/
public interface IGetNames{
  
  String fecthKey();
  Object getNames(String key,List<T> args);
}


@Service
public class BondNamesImpl implements IGetNames{
  
  //这里注入了具体的实现策略
  
  @Autowired
  private BondinfoDiscImpl bondinfoDiscImpl; 
  
   @Override
   String fecthKey(){
     //唯一标识的key
     return  EventTypeEnum.ADD_USER_AFTER.getKey();
   }
  
  @Override
  public Object getNames(String key, List args){
    // 这里可以做一些判断
    if(args != null && !args.size()>0){
      return ages;
    }
    List argsResult = bondinfoDiscImpl.getNamesByIds(String key, List args);
  }
}


@Service
public class DiscNamesImpl implements IGetNames{
  
  //这里注入了具体的实现策略
  
  @Autowired
  private BondinfoDiscImpl bondinfoDiscImpl; 
  
   @Override
   String fecthKey(){
     //唯一标识的key
     return  EventTypeEnum.PLACE_ORDER_AFTER.getKey();
   }
  
  @Override
  public Object getNames(String key, List args){
    // 这里可以做一些判断
    if(args != null && !args.size()>0){
      return ages;
    }
    // 这里是另外一种实现策略
    List argsResult = bondinfoDiscImpl.getNamesByIds(String key, List args);
  }
}


/**
* 结合Spring实现组件的管理
*/
@Component
public class CreateNames implements InitializingBean, ApplicationContextAware {

    // 注入的策略
    //@Autowired
    private static Map<String, IGetNames> giftInfoStrategyServiceMap = new HashMap<>();

    private ApplicationContext applicationContext;

    // 对外暴露的统一获取返回信息
    public Object getGiftInfo(String type, List data) {
        IGetNames giftInfoStrategyService = giftInfoStrategyServiceMap.get(type);
      	//这里要判断 是否实现了某种策略 也就是非空判断
        Assert.assertNotNull(giftInfoStrategyService);
        return giftInfoStrategyService.getNames(type, data);
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Map<String, IGetNames> matchBeans = applicationContext.getBeansOfType(IGetNames.class);
        Assert.assertNotNull(matchBeans);
        matchBeans.forEach((key, value) -> giftInfoStrategyServiceMap.put(value.fetchkey(), value));
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    /**
     * 通过key获取对应的策略实现 - 预留操作
     *
     * @param key key
     * @return strategyService
     */
    public IGetNames getStrategy(String key) {
        return giftInfoStrategyServiceMap.get(key);
    }
  
  
  /**
  * 枚举类 定义不同类型的key
  * 
  */
  public enum EventTypeEnum {
    ADD_USER_AFTER("ADD_USER_AFTER"),
    PLACE_ORDER_AFTER("PLACE_ORDER_AFTER");

    private String key;

    EventTypeEnum(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
  
// 如何使用 注入即可使用
```

