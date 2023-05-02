# 基础语法

## 注释

```python
'''
这只是一个demo标记
'''

# 中文编码声明注释
# _*_ coding:utf-8_*_

# 代码缩进

```

## 变量

```python
  # 直接赋值即可-类型推断
  # 变量名 不需要声明 变量类型

  # 标识符 
  # 关键字  33个
 draven:demo draven$ python3.8
Python 3.8.5 (v3.8.5:580fbb018f, Jul 20 2020, 12:11:27) 
[Clang 6.0 (clang-600.0.57)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import keyword
>>> keyword.kwlist
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
>>>

# 驼峰命名法
 # 小驼峰
  	myName
 # 大驼峰
		MyName # 类
 # 下弧线
		my_name
```

## 输入输出

```python
  # 比较宽泛
  print()
  print(a,b,c)
  print('a')
  print(char(97))
  
  # input()
  # 变量=input("提示文字")
```

## 基本数据类型

```python

  # 整数
  	# 十进制 八进制 十六进制 二进制
 
  # 浮点数
    # 
  
  # 字符串
  
  # 转义字符
  
  # 布尔类型
  
  # 数据类型转换 
      # str
      # chr
      # ord
      # hex
      # oct
```

## 运算符

```python
 # 操作数 运算符 结果数
 # 运算符
    # + 
    # - 
    # * 
    # /
    # % 求余
    # // 求商 
    # ** 幂 
  
  
    # = += -= *= /= %= **= //=
  
    # > < == != >= <=
  
    # and or not
  
  # 成员运算符
  	# in 		not in 
  
  # 身份运算符 -是否引用同一个对象
  	# is    is not
    
  # 运算符的优先级
```


## 通用序列操作

```python

 # 索引
 # 从右到左 0递增  从右到左-1递减
  # 分片
  	#   indexX:indexY  不包含结束[)
  # 序列相加 
  
  # 乘法 
  
  # 成员资格 
  
  # 长度 
  
  # 最小值 
  
  # 最大值

  
# 列表 - 数组
	# remove 移除第一个匹配项
  
# 元组 - 数组 
	# 元素不可修改
  # list(元组)

# 集合 -  Set 
	# Set

# 字典 - Map
	# 

```

