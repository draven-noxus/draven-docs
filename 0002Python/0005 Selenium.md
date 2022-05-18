# Selenium

```python
# Selenium
# WebDriver
# Selenium IDE
```

# Webdriver

```shell
# 资料
https://github.com/SeleniumHQ/selenium

# 
https://www.selenium.dev/
```

## web控件定位

```python
# 比较重要
```



```python
# xpath     selenium

# css selector


```

## web控件交互

```python
# ActionChains

# TouchActions
```

## Iframe

```shell
# 网页中存在iframe嵌套 需要切换iframe否则无法定位元素
# 切换iframe
```



## 三种等待方式

```python
# 直接等待
	# 强制等待
time.sleep(3)

# 隐式等待
# 默认轮巡查找（默认0.5ss）
self.driver.implicitly_wait(3)

# 显式等待

# 指定了哪一个具体的操作 等待

# 代码中定义等待条件 当条件发生时才继续进行代码

# `WebDriverWait` 配合until()和until_not()方法，根据判断条件进行等待

# 程序每隔一短时间 进行条件判断 若成立 则执行下一步 否则继续等待 知道超过设置的最长时间

```



# Selenium IDE

```python
# 暂时不做介绍
# 录制软件
```

# 环境搭建

```shell
# 0 python 环境
	python3.8 --version
# 1 配置pip工具
	pip3 --version
# 2 安装selenium
		pip install selenium
		pip install selenium==3.141.0
		1. 离线安装：

操作：1. 下载指定的selenium版本;2. 解压文件；3.使用cmd进入解压目录下执行命令：pip setup.py install

    2. 使用pip在线安装：

    操作：1. 安装：pip install selenium==指定版本号 如：pip install selenium==2.48.0

      3. 使用工具(pycharm)安装：

      操作：菜单File-->setting-->Project 当前工程名称-->Project Interpreter-->点击+号-->搜索(selenium)-->勾选 Specify version选项选择版本-->Install Package
		

# 3 浏览器对应的driver
https://www.selenium.dev/documentation/en/webdriver/driver_requirements/
# 4 driver环境配置
CDRIVER_HOME=/Users/draven/Documents/documents/python/software/selenium/driver/cdriver/
PATH=$PATH:$CDRIVER_HOME

# 5 import依赖管理


```

# 示例

```python
import selenium
from selenium import webdriver


def test_selenium():
    driver = webdriver.Chrome()
    driver.get("https://www.baidu.com/")
		driver.close()

if __name__ == '__main__':
    test_selenium()
```







