# PostgreSQL

## 安装

```shell
docker pull postgres:14.8

docker run --name postgres-container -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:14.8
```



## date_trunc/last_day

获取一个月的开始一天和最后一天

```sql
select to_char(date_trunc('month',current_date),'yyyy-mm-dd')

select to_char(last_day(current_date),'yyyy-mm-dd')
```

