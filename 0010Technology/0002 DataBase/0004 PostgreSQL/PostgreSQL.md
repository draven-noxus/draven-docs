# PostgreSQL

## date_trunc/last_day

获取一个月的开始一天和最后一天

```sql
select to_char(date_trunc('month',current_date),'yyyy-mm-dd')

select to_char(last_day(current_date),'yyyy-mm-dd')
```

