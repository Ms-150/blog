# knex

一个 SQL 查询构建器，支持多种数据库，包括 MySQL。它提供了一个干净的 API 来构建和执行 SQL 查询，并且可以与 Node.js 一起使用来管理数据库操作。

[https://knexjs.org/](https://knexjs.org/)

## install

```bash
npm i knex

# 配合数据库驱动
npm install pg
npm install pg-native
npm install sqlite3
npm install better-sqlite3
npm install mysql
npm install mysql2
npm install oracledb
npm install tedious
```

## usage

knex + mysql2

::: code-group

```yaml [db.config.yaml]
db:
  user: root
  password: root
  host: localhost
  port: 3306
  database: my_database
```

```js [app.js]
import fs from "node:fs";
import mysql2 from "mysql2/promise";
import jsyaml from "js-yaml";
import express from "express";
import knex from "knex";

const yaml = fs.readFileSync("./db.config.yaml", "utf-8");

// 加载 yaml文件
const DB_CONFIG = jsyaml.load(yaml);

const app = express();

app.use(express.json());

// 连接数据库
const db = knex({
  client: "mysql2",
  connection: DB_CONFIG.db,
});

db.schema
  .createTableIfNotExists("list", (table) => {
    table.increments("id"),
      table.integer("age"),
      table.string("name"),
      table.string("hobby"),
      table.timestamps(true, true); // 创建时间 更新时间
  })
  .then(() => {
    console.log("创建成功");
  });

// const sql = await mysql2.createConnection({
//   ...DB_CONFIG.db,
// });

// 查询全部
app.get("/users", async (req, res) => {
  // const [data] = await sql.query("select * from user");
  const data = await db("list").select();
  const count = await db("list").count("* as total");
  res.json({
    count: count[0].total,
    data,
  });
});

// 查询单个
app.get("/user/:id", async (req, res) => {
  // const [data] = await sql.query(
  //   `select * from user where id = ${req.params.id}`
  // );
  // or
  // const [data] = await sql.query("select * from user where id = ?", [
  //   req.params.id,
  // ]);

  const data = await db("list").select().where({ id: req.params.id });
  res.send(data);
});

// 创建
app.post("/create", async (req, res) => {
  const { name, age, hobby } = req.body;
  await db("list").insert({ name, age, hobby });
  // await sql.query("insert into user (name) values (?)", [name]);
  res.send("ok");
});

// 更新
app.post("/update", async (req, res) => {
  const { id, name } = req.body;
  // await sql.query("update user set name = ? where id = ?", [name, id]);
  await db("list").update({ name }).where({ id: id });
  res.send("ok");
});

// 删除
app.post("/delete", async (req, res) => {
  // const { id } = req.body;
  // await sql.query("delete from user where id = ?", [id]);
  await db.del().where({ id: 1 });
  res.send("ok");
});

app.listen(3000, () => {});
```

:::

### 常用方法

- `toSQL().sql` 调试反编译

```js
app.get("/users", async (req, res) => {
  // const [data] = await sql.query("select * from user");
  const data = await db("list").select();
  const count = await db("list").count("* as total");
  res.json({
    count: count[0].total,
    data,
    sql: await db("list").select().toSQL().sql,
  });
});
```

- `raw()` 执行原始 SQL 查询

```js
db.raw("select * from `list`").then((data) => {
  console.log(data);
});
```

- 链表查询

```js
app.post("/all", async (req, res) => {
  const data = await db("user")
    .select()
    .rightJoin("order", "user.id", "order.user_id")
    .orderBy("user.id", "desc");

  const count = await db("user").count("* as total");
  res.send({ data, count: count[0].total });
});
```

### 事务 transaction

用于确保一组数据库操作要么全部成功，要么全部回滚（失败时撤销操作）。这有助于确保数据库的完整性。

- 可以使用 `trx.commit()` 和 `trx.rollback()` 来手动控制事务的提交和回滚。

::: code-group

```js [自动调用]
const addUserAndOrder = async () => {
  try {
    await db.transaction(async (trx) => {
      // 插入用户并获取生成的 ID
      const [userId] = await trx("user")
        .insert({ name: "alice" })
        .returning("id");

      // 使用生成的 userId 插入订单
      await trx("order").insert({ user_id: userId, item: "Book", quantity: 1 });

      // 如果所有操作成功，事务会自动提交
      console.log("事务成功提交");
    });

    // 如果事务提交成功
    console.log("success");
  } catch (err) {
    // 如果事务失败
    console.error("事务失败，已回滚:", err);
  }
};

addUserAndOrder();
```

```js [手动调用]
const addUserAndOrder = async () => {
  const trx = await db.transaction(); // 开启一个事务
  try {
    // 插入用户并获取生成的 ID
    const [userId] = await trx("user")
      .insert({ name: "alice" })
      .returning("id");

    // 使用生成的 userId 插入订单
    await trx("order").insert({ user_id: userId, item: "Book", quantity: 1 });

    // 手动提交事务
    await trx.commit();
    console.log("事务成功提交");
  } catch (err) {
    // 如果发生错误，手动回滚事务
    await trx.rollback();
    console.error("事务失败，已回滚:", err);
  }
};

addUserAndOrder();
```

:::
