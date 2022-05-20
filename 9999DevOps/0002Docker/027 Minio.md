# Minio

参考资料：https://docs.min.io/


```shell
docker run -p 9000:9000 --name minio1 \
  -e "MINIO_ACCESS_KEY=admin" \
  -e "MINIO_SECRET_KEY=12345678" \
  -v /minio/data:/data \
  minio/minio server /data
```



```shell
# 登陆
http://ip:9000/minio/
```

