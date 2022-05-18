# Oracle

## 函数

### case when

```sql
-- 用法一：简单case函数 依次分类
case  field 
when 'value' then  'caseOne'
when 'value' then  'caseTwo'
else  'caseOthers' end

--用法二：case搜索函数 归类
-- 一定要注意Case函数只返回第一个符合条件的值，剩下的Case部分将会被自动忽略
case when field = 'value' then 'caseOne'
when field = 'value' then 'caseTwo'
else 'caseOthers' end

--例如： 得到的结果
SELECT 
case when field in ('value1','value2') then  'caseOne'
-- 此种情况被忽略，按照第一种情况处理
when field in ('value2') then  'caseTwo'
else  'caseOthers' end
FROM tableName
```

### SYS_GUID()

```plsql
--生成全球唯一的id
select SYS_GUID() id,c.* from `TABLENAME` c
```

### vm_concat()

```plsql
--多列数据拼接
```

```plsql
--先以sys用户授权：
grant execute on dbms_lob to xxx;

CREATE OR REPLACE TYPE typ_concat_clob AS OBJECT
(
  concat_str CLOB,
  splitstr CLOB,
  --ODCIAggregateInitialize做一些初始化操作
  STATIC FUNCTION ODCIAggregateInitialize(cs_ctx In Out typ_concat_clob) return number,
  --ODCIAggregateIterate是主要的处理逻辑所在，这里定义一个迭代操作
  member function ODCIAggregateIterate(self In Out typ_concat_clob,srcvalue in VARCHAR2) return number,
  -- ODCIAggregateMerge是一个合并函数，如果在使用时指定了partition enabled，就必须定义此函数，用来把并行处理的结果进行合并
  member function ODCIAggregateMerge(self In Out typ_concat_clob,ctx2 In Out typ_concat_clob) return number,
  --ODCIAggregateTerminate是一个终止函数，顾名思义，在这个函数中对结果做最后处理并返回
  member function ODCIAggregateTerminate(self In Out typ_concat_clob,returnValue Out CLOB,flags IN NUMBER) return number
)

CREATE OR REPLACE TYPE BODY typ_concat_clob IS
  STATIC FUNCTION ODCIAggregateInitialize(cs_ctx In Out typ_concat_clob) return NUMBER
  IS
  BEGIN
    cs_ctx := typ_concat_clob(to_clob(','),to_clob(','));
    RETURN ODCICONST.SUCCESS;
  END;

  member function ODCIAggregateIterate(self In Out typ_concat_clob,srcvalue IN VARCHAR2) return NUMBER
  IS
  BEGIN
    dbms_lob.append(self.concat_str,to_clob(srcvalue));
    dbms_lob.append(self.concat_str,self.splitstr);
    RETURN ODCICONST.SUCCESS;
  END;

  member function ODCIAggregateMerge(self In Out typ_concat_clob,ctx2 In Out typ_concat_clob) return NUMBER
  IS
  BEGIN
    IF ctx2 IS NOT NULL THEN
      dbms_lob.append(self.concat_str,ctx2.concat_str);
    END IF;
    RETURN ODCICONST.SUCCESS;
  END;

  member function ODCIAggregateTerminate(self In Out typ_concat_clob,returnValue Out CLOB,flags IN NUMBER) return NUMBER
  IS
  BEGIN
    dbms_lob.trim(self.concat_str,dbms_lob.getlength(self.concat_str)-1);
    self.concat_str := dbms_lob.substr(self.concat_str,dbms_lob.getlength(self.concat_str)-1,2);
    returnValue := self.concat_str;
    RETURN ODCICONST.SUCCESS;
  END;
END;

CREATE OR REPLACE FUNCTION fun_concat_clob(in_str VARCHAR2) RETURN CLOB
  AGGREGATE USING typ_concat_clob;
```

### XMLELEMENT()

解决vm_concat()字符串超过4000 以及超出系统限制问题

```plsql
MERGE INTO xxx A
USING (SELECT BOND_ID,'"consignGroupInfo":[' ||rtrim(xmlagg(XMLELEMENT(e,xxx,',').EXTRACT('//text()') ).GetClobVal(), ',')  || ']' xxx
       FROM 
(SELECT BOND_ID,
              TO_CLOB(
                      TO_CLOB('{"xxxx":"' ||
                                        bb.xxxx
                                        ||
                                        '","xxxx":"' ||
                                        bb.xxxx
                                        ||
                                         '"}')) AS xxx
         FROM (



​               
SELECT 
​    d.*
  from table D
  join (select T.xx, T.xxxx, T.xxxxx
  from table2 t
 WHERE t.xxxx like '兴业银行股份有限公司%'
   AND t.xxx IN (1, 2)) cc
   on cc.xx = d.xx --where cc.xx = ''
  ) bb 
  ) v GROUP BY v.xx ) B
ON (A.xx = B.xx)  
WHEN MATCHED THEN
 UPDATE SET A.xxx = B.xxx;

--替换特殊字符
update  xxx t set t.xxx=replace(t.xxx,'&'||'quot'||chr(59),'"');
```

## 获取时间问题

```plsql
--常用
(select to_char(trunc(sysdate,'MM'),'yyyy-mm-dd') from dual)
(select to_char(last_day(sysdate),'yyyy-mm-dd') from dual)
--格式化
(select to_char(trunc(sysdate,'MM'),'yyyymmdd') from dual)
(select to_char(last_day(sysdate),'yyyymmdd') from dual)
--最后一天
select last_day(sysdate) from dual;


select trunc(sysdate) from dual  --2011-3-18  今天的日期为2011-3-18
select trunc(sysdate, 'mm')   from   dual  --2011-3-1    返回当月第一天.
select trunc(sysdate,'yy') from dual  --2011-1-1       返回当年第一天
select trunc(sysdate,'dd') from dual  --2011-3-18    返回当前年月日
select trunc(sysdate,'yyyy') from dual  --2011-1-1   返回当年第一天
select trunc(sysdate,'d') from dual  --2011-3-13 (星期天)返回当前星期的第一天
select trunc(sysdate, 'hh') from dual   --2011-3-18 14:00:00   当前时间为14:41 
select trunc(sysdate, 'mi') from dual  --2011-3-18 14:41:00   TRUNC()函数没有秒的精确
```

## 字符串转多列（包含with as）

```plsql
select m.mc, trunc(dbms_random.value(100, 1000)) zbz
  from (select substr(t, 1, instr(t, '、', 1) - 1) mc
          from (select substr(s, instr(s, '、', 1, rownum) + 1) || ',' as t,
                       rownum as d,
                       instr(s, ',', 1, rownum) + 1
                  from (select '、宾阳县、上林县、横县、隆安县、马山县、武鸣区、邕宁区、青秀区、西乡塘区、兴宁区、江南区、' as s
                          from dual)
                connect by instr(s, '、', '1', rownum) > 1)) m
 where m.mc is not null;
 
 
 SELECT REGEXP_SUBSTR('1,2', '[^,]+', 1, LEVEL)
          FROM DUAL
        CONNECT BY REGEXP_SUBSTR('1,2', '[^,]+', 1, LEVEL) IS NOT NULL
        
        
 with tmp as (SELECT REGEXP_SUBSTR('1,2,3', '[^,]+', 1, LEVEL) as text
          FROM DUAL
        CONNECT BY REGEXP_SUBSTR('1,2,3', '[^,]+', 1, LEVEL) IS NOT NULL)
        select cc.text,dd.text from (SELECT REGEXP_SUBSTR('1,2,3,4', '[^,]+', 1, LEVEL) as text
          FROM DUAL
        CONNECT BY REGEXP_SUBSTR('1,2,3,4', '[^,]+', 1, LEVEL) IS NOT NULL)  cc
        inner join tmp dd
        on dd.text = cc.text
```
## 字符串转多列（翻译-拼接）
```plsql
select listagg(code, ',') within group(order by order_num) as code, 
       listagg(names, ',') within group(order by order_num) as results
  from (select *
          from (select distinct *
                  from (select regexp_substr(q.nums, '[^,]+', 1, Level, 'i') order_num,
                               names
                          from (select '11,12,13' nums, '张三' names
                                  from dual
                                union all
                                select '4,5' nums, '李四' names
                                  from dual
                                union all
                                select '5,6' nums, '王五' names
                                  from dual) q
                        connect by Level <=
                                   LENGTH(q.nums) -
                                   LENGTH(REGEXP_REPLACE(q.nums, ',', '')) + 1)
                 order by order_num) o
        
          left join (select code, name, type
                      from (select '11' as code,
                                   '哈哈' as name,
                                   'problem_type' as type
                              from dual
                            union all
                            select '12' as code,
                                   '嘻嘻' as name,
                                   'problem_type' as type
                              from dual
                            union all
                            select '13' as code,
                                   '嘿嘿' as name,
                                   'problem_type' as type
                              from dual
                             union all
                            select '4' as code,
                                   '呦吼' as name,
                                   'problem_type' as type
                              from dual
                             union all
                            select '5' as code,
                                   '啊哈' as name,
                                   'problem_type' as type
                              from dual
                             union all
                            select '6' as code,
                                   '巴扎嘿' as name,
                                   'problem_type' as type
                              from dual) g
                     where g.type = 'problem_type') k
            on k.code = o.order_num)
 group by names;



  -- 方式二
  select     dbms_lob.substr((SELECT  wm_concat(d.name)  AS "name"
  FROM t_dict d  WHERE d.type='problem_type' and  d.code IN
  (select   regexp_substr('1,2,3'||',null'  , '[^,]+', 1, level) codes from  DUAL
  connect by regexp_substr('1,2,3'||',null'  , '[^,]+', 1, level) is not null )
  )) AS "name" from dual
```


##  查询当前用户下所有表结构信息

```plsql
select *
  from (select k1.TABLE_NAME 表名称,
               k3.COMMENTS 表描述,
               k1.COLUMN_NAME 字段名,
               k2.COMMENTS 字段名称,
               case
                 when k1.DATA_TYPE = 'VARCHAR2' then
                  k1.DATA_TYPE || '(' || k1.DATA_LENGTH || ')'
                 when k1.DATA_TYPE = 'NUMBER' and k1.DATA_PRECISION is null and
                      k1.DATA_SCALE is null then
                  k1.DATA_TYPE
                 when k1.DATA_TYPE = 'NUMBER' and
                      k1.DATA_PRECISION is not null and
                      (k1.DATA_SCALE is null or k1.DATA_SCALE = 0) then
                  k1.DATA_TYPE || '(' || k1.DATA_PRECISION || ')'
                 when k1.DATA_TYPE = 'NUMBER' and
                      k1.DATA_PRECISION is not null and
                      k1.DATA_SCALE is not null and k1.DATA_SCALE <> 0 then
                  k1.DATA_TYPE || '(' || k1.DATA_PRECISION || ',' ||
                  k1.DATA_SCALE || ')'
                 else
                  k1.DATA_TYPE
               end 类型,
               decode(k1.NULLABLE, 'N', 'Not Null', 'Y', 'Null', k1.NULLABLE) 是否空
          from all_tab_columns k1, all_col_comments k2, all_tab_comments k3
         where k1.owner = '用户名'
           and k2.owner = '用户名'
           and k3.owner = '用户名'
           and k1.TABLE_NAME = k2.TABLE_NAME
           and k1.TABLE_NAME = k3.TABLE_NAME
           and k1.COLUMN_NAME = k2.COLUMN_NAME) 

       --where 表名称='ZQBA_FXSBAXX_TUPLE_FUJIAN' 
```



# PLSQL导出数据

```plsql
--PL/SQL 
--选择tool 
--export table
--选择所需要的table
--选择第二项 insert sql
--选择文件路径
--设置名字
```

##  数据导出导入

使用PL/SQL导入导出全量数据（demo）

```plsql
/**
label:
	From: test
	To:local
	include: user tablespace table
**/
--select TABLESPACE
--SELECT dbms_lob.substr(DBMS_METADATA.GET_DDL('TABLESPACE', TS.tablespace_name)) FROM DBA_TABLESPACES TS;

--Create the TABLESPACE
CREATE TABLESPACE "tablespace_name" DATAFILE 
  'path\tablespace_name.DBF' SIZE 52428800
  AUTOEXTEND ON NEXT 52428800 MAXSIZE 32767M
  LOGGING ONLINE PERMANENT BLOCKSIZE 8192
  EXTENT MANAGEMENT LOCAL AUTOALLOCATE DEFAULT NOCOMPRESS  SEGMENT SPACE MANAGEMENT AUTO
   ALTER DATABASE DATAFILE 
  'path\tablespace_name.DBF' RESIZE 262144000

-- Create the user 
create user username
  default tablespace tablespace_name
  temporary tablespace TEMP
  profile DEFAULT
  quota unlimited on tablespace_name
-- Grant/Revoke system privileges 
grant alter session to username;
grant create any procedure to username;
grant create sequence to username;
grant create session to username;
grant create table to username;
grant create view to username;
grant execute any procedure to username;
grant select any dictionary to username;

--Tools -> Export the UserObjects
/**
select the user INFODISC(All) -> export
**/

--Tools -> Export the Tables 
/**
SQL inserts 
select tables(All) -> export
**/
```




error
1.ora-00054资源正忙,但指定以nowait方式
#解决方案
在system登录的情况下执行如下操作：

1.查询被锁的会话ID：
select session_id from v$locked_object;
查询结果result：SESSION_ID-------48

2.查询上面会话的详细信息：
SELECT sid, serial#, username, osuser FROM v$session where sid = 48;
序号    SID   SEARIAL#   USERNAME        OSUSER   
1	48	67	INFODISC	LAPTOP-IC0IKSOR\lenovo

3.将上面锁定的会话关闭：
ALTER SYSTEM KILL SESSION '48,67';


# Oracle

## explain plan

### 用法

```plsql
-- 示例
explain plan for + 目标SQL

select * from table(dbms_xplan.display);

SELECT plan_table_output FROM TABLE(DBMS_XPLAN.DISPLAY('PLAN_TABLE'))



-- plsql
-- 选中sql f5 获取查看执行计划
```

### 概念

```plsql
SELECT * FROM PLAN_TABLE

STATEMENT_ID
--为一条指定的SQL语句确定特定的执行计划名称。如果在EXPLAN PLAN语句中没有使用SET STATEMENT_ID，那么此值会被设为NULL。 

PLAN_ID

TIMESTAMP

REMARKS

OPERATION
--在计划的某一步骤执行的操作名称，例如：Filters，Index，Table，Marge Joins and Table等。 

OPTIONS
--对OPERATION操作的补充，例如：对一个表的操作，OPERATION可能是TABLE ACCESS，但OPTION可能为by ROWID或FULL。

OBJECT_NODE

OBJECT_OWNER
--拥有此database Object的Schema名或Oracle帐户名。 

OBJECT_NAME
--Database Object名 

OBJECT_ALIAS
OBJECT_INSTANCE

OBJECT_TYPE
--类型，例如：表、视图、索引等等 

OPTIMIZER
SEARCH_COLUMNS

ID
--指明某一步骤在执行计划中的位置

PARENT_ID
--指明从某一操作中取得信息的前一个操作。通过对与ID和PARENT_ID使用Connect By操作，我们可以查询整个执行计划树。

DEPTH
POSITION
COST
CARDINALITY
BYTES
OTHER_TAG
PARTITION_START
PARTITION_STOP
PARTITION_ID
OTHER
OTHER_XML
DISTRIBUTION
CPU_COST
IO_COST
TEMP_SPACE
ACCESS_PREDICATES
FILTER_PREDICATES
PROJECTION
TIME
QBLOCK_NAME

```

|                   |      |                |      |      |
| ----------------- | ---- | -------------- | ---- | ---- |
| STATEMENT_ID      | N    | VARCHAR2(30)   | Y    |      |
| PLAN_ID           | N    | NUMBER         | Y    |      |
| TIMESTAMP         | N    | DATE           | Y    |      |
| REMARKS           | N    | VARCHAR2(4000) | Y    |      |
| OPERATION         | N    | VARCHAR2(30)   | Y    |      |
| OPTIONS           | N    | VARCHAR2(255)  | Y    |      |
| OBJECT_NODE       | N    | VARCHAR2(128)  | Y    |      |
| OBJECT_OWNER      | N    | VARCHAR2(30)   | Y    |      |
| OBJECT_NAME       | N    | VARCHAR2(30)   | Y    |      |
| OBJECT_ALIAS      | N    | VARCHAR2(65)   | Y    |      |
| OBJECT_INSTANCE   | N    | INTEGER        | Y    |      |
| OBJECT_TYPE       | N    | VARCHAR2(30)   | Y    |      |
| OPTIMIZER         | N    | VARCHAR2(255)  | Y    |      |
| SEARCH_COLUMNS    | N    | NUMBER         | Y    |      |
| ID                | N    | INTEGER        | Y    |      |
| PARENT_ID         | N    | INTEGER        | Y    |      |
| DEPTH             | N    | INTEGER        | Y    |      |
| POSITION          | N    | INTEGER        | Y    |      |
| COST              | N    | INTEGER        | Y    |      |
| CARDINALITY       | N    | INTEGER        | Y    |      |
| BYTES             | N    | INTEGER        | Y    |      |
| OTHER_TAG         | N    | VARCHAR2(255)  | Y    |      |
| PARTITION_START   | N    | VARCHAR2(255)  | Y    |      |
| PARTITION_STOP    | N    | VARCHAR2(255)  | Y    |      |
| PARTITION_ID      | N    | INTEGER        | Y    |      |
| OTHER             | N    | LONG           | Y    |      |
| OTHER_XML         | N    | CLOB           | Y    |      |
| DISTRIBUTION      | N    | VARCHAR2(30)   | Y    |      |
| CPU_COST          | N    | INTEGER        | Y    |      |
| IO_COST           | N    | INTEGER        | Y    |      |
| TEMP_SPACE        | N    | INTEGER        | Y    |      |
| ACCESS_PREDICATES | N    | VARCHAR2(4000) | Y    |      |
| FILTER_PREDICATES | N    | VARCHAR2(4000) | Y    |      |
| PROJECTION        | N    | VARCHAR2(4000) | Y    |      |
| TIME              | N    | INTEGER        | Y    |      |
| QBLOCK_NAME       | N    | VARCHAR2(30)   | Y    |      |









```plsql
full table scans
-- 这种方式会读取表中的每一条记录，顺序地读取每一个数据块直到结尾标志，对于一个大的数据表来说，使用全表扫描会降低性能，但有些时候，比如查询的结果占全表的数据量的比例比较高时，全表扫描相对于索引选择又是一种较好的办法。

table access by rowid
--通过ROWID值获取(table access by rowid)：行的rowid指出了该行所在的数据文件，数据块及行在该块中的位置，所以通过rowid来存取数据可以快速定位到目标数据上，是oracle存取单行数据的最快方法

index scan
--索引扫描(index scan)：先通过索引找到对象的rowid值，然后通过rowid值直接从表中找到具体的数据，能大大提高查找的效率。
```





```plsql
--执行顺序
-- 基础表
-- 基础表(Driving Table)是指被最先访问的表(通常以全表扫描的方式被访问). 根据优化器的不同, SQL语句中基础表的选择是不一样的.
-- 通常  基础表就是FROM 子句中列在最后的那个表
```





```plsql
--创建索引           
create index index_name on table_name(column_name);
--复合索引
create index index_name on table_name(column_name1, column_name2, column_name, ...);
--删除索引：
drop index index_name;
--查看某表的所有索引：
select * from all_index where table_name='表名';
--查看某表中带有索引的所有列：
select * from all_ind_columns where table_name='表名';

/**索引的建立原则：

    索引应该建立在WHERE子句中经常使用的列上。如果某个大表经常使用某个字段进行查询，并且检索的行数少于5%，则应该考虑在该列上建立索引。
    对于两个表连接的字段应该建立索引。
    如果经常在某个表的字段上进行order by 的话，则也应该在这个列上建立索引。
    小表数据很少使用全表扫描速度已经很快，没必要建立索引。

索引的优点：

    很大的提高了数据检索的速度；
    创建唯一索引能够保证数据库表中每一行数据的唯一性（唯一约束性）。
    提高表与表之间的连接速度。
*/



-- != / is not null 
-- INDEX FULL SCAN

```


## 修改密码

```sql
 -- 未配置环境变量
 -- 连接数据库
 ./sqlplus.exe /nolog
 -- 登录
 sql> conn /as sysdba
 	-- 此方式需要输入账户密码
 	--connect as sysdba;
 	
 -- 修改账户信息
 -- Demo alert user username identified by newpassword
 sql> alter user system identified by manager;
 
 -- 解锁账户
 sql> alter user XXXUSER identified by oracle account unlock;  
 
 
 
 -- 若有过期时间
SQL> SELECT * FROM dba_profiles WHERE profile='DEFAULT' AND resource_name='PASSWORD_LIFE_TIME'; 
PROFILE  
------------------------------------------------------------  
RESOURCE_NAME  
------------------------------------------------------------  
RESOURCE_TYPE  
----------------  
LIMIT  
------------------------------------------------------------  
    
DEFAULT  
PASSWORD_LIFE_TIME  
-- 看这里
PASSWORD  
180   
 
 
 -- 处理方案
    alter profile default  limit password_life_time unlimited;  
    commit;  
 
 
 -- 最终查询结果
 -- 若没有过期时间
SQL> SELECT * FROM dba_profiles WHERE profile='DEFAULT' AND resource_name='PASSWORD_LIFE_TIME';

PROFILE
------------------------------------------------------------
RESOURCE_NAME
----------------------------------------------------------------
RESOURCE_TYPE
----------------
LIMIT
--------------------------------------------------------------------------------
DEFAULT
PASSWORD_LIFE_TIME
PASSWORD
UNLIMITED
```

