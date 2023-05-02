# 函数

## 流程控制

```python  
	# 缩进
	# 条件语句
age = 18
if 17 > age > 10:
    print("ok")
elif 100 > age >= 18:
    print("nice")
else:
    print("你是妖怪吗")
		
    
    # 断言
    	# is
    	# 比较字符串和序列
    	# 布尔运算符
    
	# 循环控制
  	# while
  q = 1
	while q < 3:
   	 	print("aaa")
   	 	q += 1
		# for
    
    
  # break continue
  
```

## 函数

```python

# 函数
	# 定义与调用
		#	内置函数	
    # 自定义函数
    	# def 函数名(参数列表):
       			print()
        		return "xxx"
        
def 函数名 (参数列表):
    return [表达式]  # None

# 参数
  # 类型属于对象 变量是没有类型的
	# 可变类型
    	# 字典 列表
    # 不可变类型 
    	# 字符串 元组 数字 
 # 形参
 # 实参
    
    
 # 必须参数 一致性
 # 关键字参数  
    # python会自动识别
   def defName(var1='',var2='')
 # 默认值参数
    # 默认参数 参数列表最后
    def defName(var1='',var2='value2')
 # 不定长参数
	# 类似java重的可变参数
    # *var2  收集到元组重
    # **var2 接收字典类型的值
    def defName(var1='',*var2)
 # 组合参数
	# 以上参数组合
 
 # 匿名函数
    Lamada var1,var2:var1+var2
 # 变量
	global var # 函数中对该变量做的其他操作也是全局性的（提升为全局变量）
```

## 异常

```python
# https://docs.python.org/zh-cn/3/library/exceptions.html#bltin-exceptions

# 抛出异常
    	raise
    
    while True:
        try:
            x=int(input("test the number: "))
            break
        except ValueError:
            print("this is Exception")
# namespace
# 作用域
```

## 异常处理

```python
try/except

# 1.捕捉异常

# 2.捕捉多个异常
	try:
		xxx
	except ZeroDrivisionError:
		print("yyy")
	except Exception:
		print("xxx")
# 3.块捕捉异常
	try:
		xxx
	except （ZeroDrivisionError,TypeError）:
		print("yyy")
		
# 4.捕捉对象
	try:
		xxx
	except （ZeroDrivisionError,TypeError）as e:
		print(e)
# 5.全捕捉
	try:
		xxx
	except:
		print("")

# 6.else语句
	try:
    	print("")
	except:
    	print("")
	else:
		print("")
		
# 7.try-finally
	try:
		print()
	except:
		print()
	else:
		print("")
	finally:
		print("")
```

