# Python Test

```python
Unittest

Pytest

Nose

Mock





语句覆盖
	每个语句都被执行
判断覆盖
	整体
条件覆盖
	具体到每一个条件
路径覆盖
	
```



## Python-unittest

```python
内置标准库
常用于单元测试
HTMLTestRunner






test cases
test suites
test fixtures
test runner
```



```python
# 第一步 导入包
import unittest

# 第二步 继承unittest.TestCase
class TestDemos(unittest.TestCase):
    def setUp(self):
        ""
        pass
	# 3 方法以test_ 开头
    def testdemo(self):
        print('hello')

# 4 模块 类名 没有具体要求
```

## Python-pytest

```python
'''
比较主流
资料
https://docs.pytest.org/en/stable/

# 安装 不重要
pip install -U pytest

pytest --version


pip install pytest-returnfailures
pip install pytest-assume


比unittest更牛批
'''
```





# 数据驱动

app web 接口自动化测试



测试步骤的数据驱动



测试数据的数据驱动



配置的数据驱动

