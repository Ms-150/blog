# MySQL

一个流行的开源关系型数据库管理系统。
[https://www.mysql.com](https://www.mysql.com)

## 安装

- [社区版下载](https://dev.mysql.com/downloads/mysql/)

```sh
brew install mysql
```

## 启动数据库

```sh
brew services start mysql
```

## 命令

```bash
mysql -u root -p	# 连接mysql

help; | ? | \h      # ; 必须写

exit; | \q          # 退出 sql
```

使用反引号 `` ` `` 的作用是将标识符（如数据库名、表名、列名等）括起来，防止与 MySQL 的保留关键字冲突，同时也支持在标识符中使用一些特殊字符如 `-`。

## 入门

```bash
# 显示所有库
show databases;
# 创建数据库 database_name
create database database_name;
# 进入数据库 database_name
use database_name;
# 创建数据表 table_name
create table table_name(
    id int not null auto_increment,
    primary key(id)
);
>>>
Query OK, 0 rows affected, 1 warning (0.01 sec)

# 显示数据表头结构
desc table_name;
>>>
+-------+------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra          |
+-------+------+------+-----+---------+----------------+
| id    | int  | NO   | PRI | NULL    | auto_increment |
+-------+------+------+-----+---------+----------------+
1 row in set (0.01 sec)

# 插入数据
insert into table_name
(id, name)
values
(2, "lisi");
```

## 数据类型

- #### 数值型

  ##### 包含：整数型 浮点型

  ##### 整数型：tinyint smallint mediumint int bigint

  ##### 浮点型：float double decimal

  #### 1Bytes (字节) = 8bit (比特)

  | 类型           | 大小                                          | 范围                                                  |      用途       |
  | -------------- | --------------------------------------------- | ----------------------------------------------------- | :-------------: |
  | tinyint        | 1Bytes                                        | (0,255)                                               |    大整数值     |
  | smallint       | 2Bytes                                        | (0,65535)                                             |    大整数值     |
  | mediumint      | 3Bytes                                        | (0,16777215)                                          |    大整数值     |
  | int 或 integer | 4Bytes                                        | (0,4294967295)                                        |    大整数值     |
  | bigint         | 8Bytes                                        | (0, 18446744073709551615)                             |   极大整数值    |
  | float          | 4Bytes                                        | 0, (1.175494351E-38,3.402823466E+38)                  | 单精度 浮点数值 |
  | double         | 8Bytes                                        | 0, (2.2250738585072014E-308，1.7976931348623157E+308) | 双精度 浮点数值 |
  | decimal        | 对 DECIMAL(M,D) ，如果 M>D，为 M+2 否则为 D+2 | 依赖于 M 和 D 的值                                    |     小数值      |

- #### 日期和时间类型

  ##### 表示时间值的日期和时间：date time year datetime timestamp

  | 类型      | 大小(Bytes) | 格式                | 用途                   |
  | --------- | :---------: | ------------------- | ---------------------- |
  | date      |      3      | YYYY-MM-DD          | 日期值                 |
  | time      |      3      | HH:MM:SS            | 时间值                 |
  | year      |      1      | YYYY                | 年份值 ｜              |
  | datetime  |      8      | YYYY-MM-DD hh:mm:ss | 混合日期和时间         |
  | timestamp |      4      | YYYY-MM-DD hh:mm:ss | 混合日期时间值，时间戳 |

- #### 字符串类型

  #### char varchar tinytext text mediumtext longtext tinyblob blob mediumblob longblob

  | 类型       | 大小 无符号(unsigned) | 用途                    |
  | ---------- | --------------------- | ----------------------- |
  | char       | 0-255                 | 定长字符串              |
  | varchar    | 0-65535               | 变长字符串              |
  | tinytext   | 0-255                 | 短文本字符串            |
  | text       | 0-65335               | 长文本数据              |
  | mediumtext | 0-16777215            | 中等长度文本数据        |
  | longtext   | 0-4294967295          | 极大长度文本数据        |
  | tinyblob   | 0-255                 | 二进制不超过 255 个字符 |
  | blob       | 0-65335               | 二进制长文本数据        |
  | mediumblob | 0-16777215            | 二进制中等长度文本数据  |
  | longblob   | 0-4294967295          | 二进制极大长度文本数据  |

#### 显示全部数据库 show database

```bash
show databases;
>>>
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```

### 创建数据库 create database

```bash
create database [if not exists] 数据库名;
# [if not exists] 防止创建已存在的新表而产生错误。
>>>
mysql> create database database_name;
Query OK, 1 row affected (0.01 sec)
```

### 查询当前所在数据库 select

```bash
select database();
>>>
+--------------+
| database()   |
+--------------+
| database_name|
+--------------+
1 row in set (0.00 sec)
```

### 删除数据库 drop databases

```bash
drop database [if not exists] database_name;
>>>
Query OK, 0 rows affected (0.03 sec)
```

### 选择数据苦 use

```bash
use database_name;
>>>
Database changed
```

### 创建数据表 create table

```bash
create table [if not exists] 表名(
    字段名 字段类型[(大小)] [unsigned] [not null][defalut_value] [auto_increment] [PRIMARY KEY],
    # primary key(字段名)
);

CREATE TABLE table_name (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

# eg
# id字段名 int整型 unsigned 无符号数 not null非空 auto_increment自增 default 1 默认值1 comment "年龄" 备注"年龄"
# primary key(id) 主键 id

create table table_name(
    id int not null auto_increment primary key,
    name char(100) not null,
    sex integer(1) not null default 0
);
>>>
Query OK, 0 rows affected (0.06 sec)
```

### 查看表头结构

```bash
desc table_name;
>>>
+-------+------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra          |
+-------+------+------+-----+---------+----------------+
| id    | int  | NO   | PRI | NULL    | auto_increment |
+-------+------+------+-----+---------+----------------+
1 row in set (0.02 sec)
```

### 删除数据表

```bash
drop table table_name;
>>>
Query OK, 0 rows affected (0.01 sec)
```

### ALTER 命令 修改数据表

#### 添加列 add

```bash
alert table table_name
add
name int not null;
```

#### 修改列 modify

```bash
alter table table_name
modify name char(10) not null default (1);
```

#### 修改列名 change

```bash
alter table table_name
change name newName varchar(20);
```

#### 删除列 drop

```bash
alter table table_name
drop newName;
```

#### 修改表名 rename to

```bash
alter table table_name
rename to table_name;
```

#### 添加约束

- 添加主键

```bash
alter table table_name
add primary key (id);
```

### 插入数据 insert into

```bash
insert into table_name
    (column_name1, value1)
values
    (column_name2, value2);

# example
insert into table_name
    (id, name, age)
values
    (2, "lisi", 20);
>>>
Query OK, 1 row affected (0.01 sec)
```

### 更新数据 update ... set

```bash
update table_name set   # update 表名 set
column_name1=value, # 字段1=值,
column_name2=value  # 字段1=值,
[where id=1];       # 条件可选 不带条件 更新全部

# example
update table_name set
id=3,
age=16
where id = 2;
```

### 删除数据 delete from

```bash
delete from table_name
[where age>18]; # 条件 不带条件 删除标中全部数据

# example
delete from table_name
where age>18;
```

### 查询数据 select

```bash
# 查询数据表的 所有字段数据
select * from table_name;

# 查询数据表id字段数据
select [distinct] id from table_name; # distinct去重

#example
select distinct id from table_name;
>>>
+----+------+
| id | name |
+----+------+
|  1 | ms   |
|  2 | 123  |
+----+------+
2 rows in set (0.00 sec)
```

#### 条件查询

| 操作符          | 备注                            |
| --------------- | ------------------------------- | ---- | --- |
| =               |                                 |
| != / <>         |                                 |      |
| >               |                                 |
| <               |                                 |
| >=              |                                 |
| <=              |                                 |
| && / and        |                                 |
|                 |                                 | / or |     |
| !               |
| is null         |                                 |
| between 1 and 2 | [min,max]                       |
| like \_ %       | 模糊查询 \_一个字符 %任意个字符 |

```bash
select * from table_name where age=18;

select * from table_name where age is null;
select * from table_name where age is not null;

select * from table_name where age >=13 && age <20;
select * from table_name where age between 15 and 20;

select * from table_name where age>15 && name='zhangsan';

select * from table_name where age=15 or age=18 or age=20;
select * from table_name where age in(15,18,20);

# like 模糊查询
select * from table_name where name like '____' # 查询4个字符长度
select * from table_name where name like '%x'; # 查询末位为x
```

### 聚合函数

将一列数据作为一个整体进行纵向计算

所有 null 不参与聚合函数

| 函数  | 作用   |
| ----- | ------ |
| count | 统计   |
| max   | 最大   |
| min   | 最小   |
| avg   | 平均数 |
| sum   | 求和   |

```bash

# 统计 id 的总条数
select count(*) from table_name;
select count(id) from table_name;

select avg(age) from table_name;

select max(age) from table_name;

select min(age) from table_name;

select sum(age) from table_name where name like '%f';
```

### 分组查询 group by

where 和 having 的区别

- 执行时机不同
  - where 分组前过滤
  - having 分组后过滤
- 判断条件不同
  - where 不能 用聚合函数
  - having 能用聚合函数

```bash
# 性别分组查询
select sex,count(sex) from table_name group by sex;
# 性别分组 求年龄的平均值 别名as age_avg
select sex, avg(age) as age_avg from table_name group by sex;


# 年龄>15 地址分组 地址数量>1 的地址 最终结果都是 分组的
select address, count(address) from table_name where age>=15 group by address having count(address)>1;

```
