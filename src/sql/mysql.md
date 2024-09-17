# MySQL

一个流行的开源关系型数据库管理系统。

[https://www.mysql.com](https://www.mysql.com)

## 安装

::: code-group

```sh [社区版下载]
https://dev.mysql.com/downloads/mysql/
```

```sh [brew]
brew install mysql
brew services start mysql
```

```sh [docker]
docker pull mysql
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p3306:3306 -d mysql
```

:::

## 命令

```sh
mysql -u root -p	# 连接mysql

help; | ? | \h      # ; 必须写

exit; | \q          # 退出 sql
```

使用反引号 `` ` `` 的作用是将标识符（如数据库名、表名、列名等）括起来，防止与 MySQL 的保留关键字冲突，同时也支持在标识符中使用一些特殊字符如 `-`。

## 入门

```sql
-- 显示所有库
SHOW DATABASES;
-- 创建数据库 database_name
CREATE DATABASE database_name;
-- 进入数据库 database_name
USE database_name;
-- 创建数据表 table_name
CREATE TABLE table_name(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
);
>>>
Query OK, 0 rows affected, 1 warning (0.01 sec)

-- 显示数据表头结构
desc table_name;
>>>
+-------+------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra          |
+-------+------+------+-----+---------+----------------+
| id    | int  | NO   | PRI | NULL    | auto_increment |
+-------+------+------+-----+---------+----------------+
1 row in set (0.01 sec)

-- 插入数据
INSERT INTO table_name
(id, name)
VALUES
(2, "lisi");
```

## 数据类型

- ### 数值类型

  包含：整数型 浮点型

  整数型：tinyint smallint mediumint int bigint

  浮点型：float double decimal

  ::: tip
  1Bytes (字节) = 8bit (比特)
  :::

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

- ### 日期和时间类型

  表示时间值的日期和时间：date time year datetime timestamp

  | 类型      | 大小(Bytes) | 格式                | 用途                   |
  | --------- | :---------: | ------------------- | ---------------------- |
  | date      |      3      | YYYY-MM-DD          | 日期值                 |
  | time      |      3      | HH:MM:SS            | 时间值                 |
  | year      |      1      | YYYY                | 年份值 ｜              |
  | datetime  |      8      | YYYY-MM-DD hh:mm:ss | 混合日期和时间         |
  | timestamp |      4      | YYYY-MM-DD hh:mm:ss | 混合日期时间值，时间戳 |

- ### 字符串类型

  char varchar tinytext text mediumtext longtext tinyblob blob mediumblob longblob

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

## 数据库操作

### 显示全部数据库 SHOW DATABASES

```sql
SHOW DATABASES;
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

### 创建数据库 CREATE DATABASE

```sql
CREATE DATABASE [IF NOT EXISTS] database_name;
-- [IF NOT EXISTS] 防止创建已存在的新表而产生错误。
DEFAULT CHARACTER SET = 'utf8mb4';
>>>
mysql> CREATE DATABASE database_name;
Query OK, 1 row affected (0.01 sec)
```

### 查看当前数据库 SELECT DATABASE()

```sql
SELECT DATABASE();
>>>
+--------------+
| database()   |
+--------------+
| database_name|
+--------------+
1 row in set (0.00 sec)
```

### 删除数据库 DROP DATABASE

```sql
DROP DATABASE [IF NOT EXISTS] database_name;
>>>
Query OK, 0 rows affected (0.03 sec)
```

### 选择数据库 USE

```sql
USE database_name;
>>>
Database changed
```

## 数据表操作

### 查看所有表

```sql
SHOW TABLES;
```

### 创建数据表 CREATE TABLE

```sql
CREATE TABLE IF NOT EXISTS table_name (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    name VARCHAR(255) COMMENT '姓名',
    age INT COMMENT '年龄'
) COMMENT '表注释';

-- 注释
-- ID 字段名
-- INT 整型
-- UNSIGNED 无符号数 该列只能存储非负值。
-- NOT NULL 非空
-- AUTO_INCREMENT 自增
-- DEFAULT 1 默认值 1
-- PRIMARY key 主键
-- COMMENT "年龄" 备注"年龄"


CREATE TABLE table_name(
    id int not null auto_increment primary key,
    name char(100) not null,
    sex integer(1) not null default 0
);
>>>
Query OK, 0 rows affected (0.06 sec)
```

### 查看表头结构 DESC

```sql
DESC table_name;
>>>
+-------+------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra          |
+-------+------+------+-----+---------+----------------+
| id    | int  | NO   | PRI | NULL    | auto_increment |
+-------+------+------+-----+---------+----------------+
1 row in set (0.02 sec)
```

### 删除数据表 DROP TABLE

```sql
DROP TABLE table_name;
>>>
Query OK, 0 rows affected (0.01 sec)
```

### ALTER 命令 修改数据表

#### 修改表名

```sql
ALTER TABLE old_table_name RENAME TO new_table_name;
-- or
RENAME TABLE old_table_name TO new_table_name;
```

#### 添加列 ADD

```sql
ALERT TABLE table_name
ADD
column_name column_type;
```

#### 删除列 DROP

```sql
ALTER TABLE table_name
DROP
column_name;
```

#### 修改列 MODIFY

```sql
ALTER TABLE table_name
MODIFY
column_name new_column_type;
```

#### 重命名列 CHANGE

```sql
ALTER TABLE table_name
CHANGE
old_column_name new_column_name column_type;
```

#### 添加主键

```sql
ALTER TABLE table_name
ADD PRIMARY KEY (id);
```

## 数据操作

### 插入数据 INSERT INTO

```sql
INSERT INTO table_name
(column_name1, value1)
VALUES
(column_name2, value2);

-- example
INSERT INTO table_name
(id, name, age)
VALUES
(2, "lisi", 20);
>>>
Query OK, 1 row affected (0.01 sec)
```

### 删除数据 DELETE FROM

```sql
DELETE FROM table_name
[WHERE condition];        -- condition 条件可选 不带条件 删除全部

-- example
DELETE FROM table_name
WHERE age>18;
```

### 更新数据 UPDATE SET

```sql
UPDATE table_name SET   -- UPDATE 表名 SET
column_name1=value,     -- 字段1=值,
column_name2=value      -- 字段2=值,
[WHERE condition];      -- condition 条件可选 不带条件 更新全部

-- example
UPDATE table_name SET
id=3,
age=16
WHERE id = 2;
```

### 查询数据 SELECT

```sql
-- 查询所有字段数据
SELECT * FROM table_name;
-- 查询特定字段数据 
SELECT [DISTINCT] column_name FROM table_name; -- DISTINCT 去重

-- example
SELECT DISTINCT id FROM table_name;
>>>
+----+------+
| id | name |
+----+------+
|  1 | ms   |
|  2 | 123  |
+----+------+
2 rows in set (0.00 sec)
```

#### 别名 AS

```sql
SELECT column_name AS alias_name
FROM table_name;

-- example 
-- 把 user 表中的 id 列返回为 user_i
SELECT id AS user_id
FROM user;
```

#### 排序 ORDER BY

- ASC 升序 默认
- DESC 降序

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;

-- example
SELECT id, name
FROM user
ORDER BY id DESC;
```

#### 限制查询结果 LIMIT

1. 限制返回的行数

```sql
SELECT * FROM column1
LIMIT number_of_rows;
```

2. 指定偏移量和返回的行数

```sql
SELECT column1, column2, ...
FROM table_name
LIMIT offset, number_of_rows;
-- or

```

3. 结合排序

```sql
SELECT * FROM table_name
ORDER BY column_name DESC
LIMIT 10;
```

4. 实现分页

```sql
SELECT * FROM table_name
ORDER BY column_name
LIMIT 20 OFFSET 10;
```

#### 条件查询

| 操作符        | 备注                            |
| ------------- | ------------------------------- |
| `=`           | 等于                            |
| `!=` / `<>`   | 不等于                          |
| `>`           | 大于                            |
| `<`           | 小于                            |
| `>=`          | 大于或等于                      |
| `<=`          | 小于或等于                      |
| `AND`         | 逻辑与（AND 操作符）            |
| `OR`          | 逻辑或（OR 操作符）             |
| `NOT`         | 逻辑非（NOT 操作符）            |
| `IS NULL`     | 检查值是否为 NULL               |
| `IS NOT NULL` | 检查值是否不为 NULL             |
| `BETWEEN`     | 在一个范围内（包含边界）        |
| `LIKE`        | 模糊查询，使用通配符 `_` 和 `%` |
| `IN`          | 匹配一组值中的任意一个          |
| `NOT IN`      | 不匹配一组值中的任意一个        |

```sql
SELECT * FROM table_name WHERE age=18;

SELECT * FROM table_name WHERE age is null;
SELECT * FROM table_name WHERE age is not null;

SELECT * FROM table_name WHERE age >=13 && age <20;
SELECT * FROM table_name WHERE age between 15 and 20;

SELECT * FROM table_name WHERE age>15 && name='zhangsan';

SELECT * FROM table_name WHERE age=15 or age=18 or age=20;
SELECT * FROM table_name WHERE age in(15,18,20);

-- like 模糊查询
SELECT * FROM table_name WHERE name like '____' -- 查询4个字符长度
SELECT * FROM table_name WHERE name like '%x';  -- 查询末位为x
```

### 聚合函数

将一列数据作为一个整体进行纵向计算

所有 null 不参与聚合函数

| 函数    | 作用   |
| ------- | ------ |
| `count` | 统计   |
| `max`   | 最大   |
| `min`   | 最小   |
| `avg`   | 平均数 |
| `sum`   | 求和   |

```sql
-- 统计 id 的总条数
SELECT count(*) FROM table_name;
SELECT count(id) FROM table_name;

SELECT avg(age) FROM table_name;

SELECT max(age) FROM table_name;

SELECT min(age) FROM table_name;

SELECT sum(age) FROM table_name WHERE name like '%f';
```

### 分组查询 group by

where 和 having 的区别

- 执行时机不同
  - where 分组前过滤
  - having 分组后过滤
- 判断条件不同
  - where 不能 用聚合函数
  - having 能用聚合函数

```sql
-- 性别分组查询
SELECT sex,count(sex) from table_name group by sex;
-- 性别分组 求年龄的平均值 别名as age_avg
SELECT sex, avg(age) as age_avg from table_name group by sex;


-- 年龄>15 地址分组 地址数量>1 的地址 最终结果都是 分组的
SELECT address, count(address) from table_name where age>=15 group by address having count(address)>1;
```
