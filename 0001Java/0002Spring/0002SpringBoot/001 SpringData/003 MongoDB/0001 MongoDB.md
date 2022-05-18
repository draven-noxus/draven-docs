# MongoDB

https://www.mongodb.com/

​		MongoDB 是一个跨平台的，面向文档的数据库，是当前 NoSQL 数据库产品中最热门的一种。它介于关系数据库和非关系数据库之间，是非关系数据库当中功能最丰富，最像关系数据库的产品。它支持的数据结构非常松散，是类似 JSON 的 BSON 格式，因此可以存储比较复杂的数据类型。

## 特点

​	它是一个面向集合的,模式自由的文档型数据库

 	(1)面向集合存储，易于存储对象类型的数据

 	(2)模式自由

 	(3)支持动态查询

 	(4)支持完全索引，包含内部对象

 	(5)支持复制和故障恢复 

 	(6)使用高效的二进制数据存储，包括大型对象(如视频等)

​	 (7)自动处理碎片，以支持云计算层次的扩展性

​	 (8)支持 Python，PHP，Ruby，Java，C，C#，Javascript，Perl 及 C++语言的驱动程序,社区中也提供了对 Erlang 及.NET 等平台的驱动程序

​	 (9) 文件存储格式为 BSON(一种 JSON 的扩展)

## 体系结构

​		文档(document)、集合(collection)、数据库(database)这三部分组成的逻辑结构是面向用户的，用户使用 MongoDB 开发应用程序使用的就是逻辑结构。

  		(1)MongoDB 的文档(document)，相当于关系数据库中的一行记录。 

​		  (2)多个文档组成一个集合(collection)，相当于关系数据库的表。 

​		  (3)多个集合(collection)，逻辑上组织在一起，就是数据库(database)。 

​          (4)一个 MongoDB 实例支持多个数据库(database)。

与关系型数据库对比

​		数据库 	databases-- databases

​        集合 		collections -- table

 	   文档 		document -- row

## 数据类型

### 	基本数据类型

​	null  		用于表示控制或者不存在的字段 {"x":null}

​    布尔型 	布尔类型有两个值true/false {"x":true}

​    数值		 shell默认使用64为浮点型数值。{"x":3.14}{"x":3},整数值 可以使用 NumberInt NumberLong  {“x”:NumberInt(“3”)}{“x”:NumberLong(“3”)}

​	字符串	UTF-8字符串都可以表示为字符串类型的数据 {"x":"哈哈"}

   日期		 日期被存储为自新纪元依赖经过的毫秒数，不存储时区，{“x”:new Date()}

​	正则表达式	查询时，使用正则表达式作为限定条件，语法与JavaScript的正则表达式相同 {"x",'[abc]'}

​	数组		数据列表或数据集可以表示为数组 {“x”: [“a“，“b”,”c”]}

​	内嵌文档	文档可以嵌套其他文档，被嵌套的文档作为值来处理，{“x”:{“y”:3 }}

​	二进制数据	二进制数据是一个任意字节的字符串 他不能直接在shell中使用，若将非utf-字符保存到数据库中，二进制数据是唯一的方式

​	代码	查询和文档中可以包括任何JavaScript代码，{"x":function(){/.../}}

## 简单操作命令

```sql
mongo 192.168.184.134
use database
db.collection.insert(value)
db.collection.find()
db.collection.find({field:value})
db.collection.find().limit(3)
db.collection.update(where，data)
db.collection({},{$set:{data}})
db.collection.remove({where})
db.collection.count({where})
db.collection.find({field:/value/})
db.collection.find({field:/^value/})
db.collection.find({field:{$gt:value}})
db.collection.find({field:{$lt:value}})
db.collection.find({field:{$gte:value}})
db.collection.find({field:{$lte:value}})
db.collection.find({field:{$nt:value}})
db.collection.find({field:{$in:[value,value]}})
db.collection.find({field:{$nin:[value,value]}})
db.collection.find({$and:[{field:{$gte:value},{field:{$lt:value}}}]})
db.collection.find({$or:[{field:{$gte:value},{field:{$lt:value}}}]})
db.collection.update({{where},{$inc:{field:value}}})
```

