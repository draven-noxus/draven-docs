# Python

## 资料
```shell
  https://docs.python.org/zh-cn/3/
```

## 虚拟环境
### venv
```shell
  python -m venv 安装路径
  source activate 虚拟环境名字
  
```
    
### Anaconda
```shell
  # 安装了哪些包
  conda list
  
  # 查看当前存在哪些虚拟环境
  conda env list
  conda info -e
  
  # 创建虚拟环境
  conda create -n your_env_name python=x.x
  
  # 创建指定目录的虚拟环境 
  conda create -p /Users/draven/Documents/documents/python/project/envs/fastapis python=x.x
  
  # 激活环境
  conda activate your_env_nam
  
  # 删除环境
  conda remove -n your_env_name
  
  # 添加Anaconda的TUNA镜像
  conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  
  # 设置搜索时显示通道地址
  conda config --set show_channel_urls yes

  # 恢复默认镜像
  conda config --remove-key channels
```

## 安装包信息
```shell
  # pip 版本
  pip --version

  # 指定镜像源  
  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
  # 例如 pip install -i https://pypi.tuna.tsinghua.edu.cn/simple Django

  
  # 升级pip
  pip install -U pip  
  python -m pip install --upgrade pip
  
  # 安装包
  pip install package
  pip install -r requirements.txt
  
  # 安装本地安装包（.whl包）
  pip install <目录>/<文件名> 或 pip install --use-wheel --no-index  --find-links=wheelhous/<包名>      
  #例如：pip install requests-2.21.0-py2.py3-none-any.whl（注意.whl包在C:\\Users\\Administrator中才能安装）
  
  # 升级包
  pip install -U <包名>
  pip install <包名> --upgrade
  
  # 卸载安装包
  pip uninstall <包名> 
  pip uninstall -r requirements.txt     
  # 例如：pip uninstall requests
  
  # 已经安装清单
  pip list
  
  # 查询可升级包
  pip list -o
  
  # 显示包所在目录及信息
  pip show requests

```


