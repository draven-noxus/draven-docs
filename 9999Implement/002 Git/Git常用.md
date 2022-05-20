# Git

```shell
# 确保.gitignore的存在
$ git rm -r --cached 文件名 移除控制
$ git commit -m "移除对xxx的控制"
# 检查.gitignore文件中配置



git clone https://gitee.com/mirrors/Kubernetes.git

# 1.查看所有分支
  git branch -a

# 2.查看当前使用分支(结果列表中前面标*号的表示当前使用分支)
 git branch
 
# 3.切换分支
 git checkout 分支名
```
https://github.com/Alvin9999/new-pac

## 网络问题
http://github.com.ipaddress.com

http://github.global.ssl.fastly.net.ipaddress.com

140.82.113.4    github.com
199.232.69.194  github.global.ssl.fastly.net

sudo dscacheutil -flushcache


# FQA

```shell
Filename too long in Git for Windows
```



```shell
git config --system core.longpaths true
```
