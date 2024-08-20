# PostgreSQL

[PostgreSQL](https://www.postgresql.org/)

## install

```bash
brew install postgresql
```

## 配置 PostgreSQL

- 初始化数据库

```bash
initdb /usr/local/var/postgres
```

- 启动 PostgreSQL 服务

```bash
pg_ctl -D /usr/local/var/postgres start
# or
brew restart postgresql
```

- 设置管理员密码

```bash
psql postgres
ALTER USER postgres PASSWORD ms   # ms为密码
```

## 命令行工具

1. psql

```bash
psql postgres   # 超级用户角色 连接 默认数据库
\h              # 获取帮助信息，输入
\?              # 获取命令列表等
\q | exit       # 退出
```

```bash
psql postgres
>>>
psql (14.11 (Homebrew))
Type "help" for help.

\l    # 列出当前 PostgreSQL 服务器中的所有数据库
>>>
                         List of databases
   Name    | Owner | Encoding | Collate | Ctype | Access privileges
-----------+-------+----------+---------+-------+-------------------
 postgres  | ms    | UTF8     | C       | C     |
 template0 | ms    | UTF8     | C       | C     | =c/ms            +
           |       |          |         |       | ms=CTc/ms
 template1 | ms    | UTF8     | C       | C     | =c/ms            +
           |       |          |         |       | ms=CTc/ms
(3 rows)
```

## 系统中执行命令

2. pg_dump 和 pg_restore
   pg_dump 和 pg_restore 是用于备份和恢复 PostgreSQL 数据库的命令行工具。

```bash
# 备份数据库
# 导出指定数据库的内容，并将其保存到指定的文件中
pg_dump -U username -d database_name -f backup_file.sql

# 恢复数据库
# 从备份文件中恢复数据库的内容
pg_restore -U username -d database_name backup_file.sql
```

3. createdb 和 dropdb
   创建 和 删除 PostgreSQL 数据库

```bash
createdb database_demo    # 创建
ropdb database_demo       # 删除
```

### 库 操作

```bash
\c database_demo   # 切换数据库
You are now connected to database "database_demo" as user "ms".

\dt   # 展示数据库中的数据表
Did not find any relations.
```

### 表 操作

```bash
#  创建表
CREATE TABLE table_name (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);
>>>
CREATE TABLE

# 删除
DROP TABLE table_name;
>>>
DROP TABLE
```

### 数据操作

```bash
# 插入数据
INSERT INTO users (username, email) VALUES ('user1', 'user1@example.com');
>>>
INSERT 0 1

# 查询数据
SELECT * FROM users;
>>>
 id | username |       email
----+----------+-------------------
  1 | user1    | user1@example.com
(1 row)

# 更新
UPDATE users SET email = 'newemail@example.com' WHERE username = 'user1';
>>>
UPDATE 1

# 删除
DELETE FROM users WHERE username = 'user2';
>>>
DELETE 1
```
