# Windows10

## 端口占用

```powershell
# 查看端口
netstat -aon|findstr "端口"

# 通过PID查找程序
tasklist|findstr "PID"

# 关闭程序
taskkill /f /t /im 进程名
```

