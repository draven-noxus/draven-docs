# 文件IO

```python
# open(filename[mode[buffering]])

# 文件打开
# 以特定编码打开
# fileopen('filePath','r',encoding='utf-8')

# 文件关闭
	# 首先刷新缓存区到文件中
file.close();


# with语句
	with expression as target:
        with-body
        
	with open() as file:

# 写文件
file.wirte()


# 读取文件
# 读取指定该字符串
	# file.read([size])

    file.seek(index) # 从执行开始处读取
	file.readline(size) # 读取个数
# 读取一行
# file.readline()
	with open() as file:
        number = 0
        where True:
            number+=1
            line=file.readline()
            if line==''
            	break
            print(number,line,end="\n")
    

# 读取全部行
file.readlines()
	with open() as file:
        message=file.readlines()
        print(message)
        
# 目录
# os
import os
os.name # nt
os.linesep # \r\n
os.sep # \\

listdir
nkdir

# os.path
import os.path

 # 路径
    os.getcwd()
    # 相对路径
    	
    # 绝对路径
    	os.path.abspath(path)
    # 拼接路径 如果拼接的路径中存在多个绝对路径以最后出现的一次为准，（会出现覆盖现象）
    	os.path.join(path1[path2[...]])
        
        
 # 目录操作
	os.path.exists("") # True
    os.mkdir("")
    os.mkdirs("")
    os.rmdir("")
    os.walk(top[topdown][onerror][rollowlinks])
```
