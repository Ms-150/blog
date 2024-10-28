# Prisma

下一代 Node.js 和 TypeScript ORM（Object-Relational Mapping，对象关系映射）。
它提供了一种在编程语言中使用对象（通常是面向对象语言中的类和对象）来操作数据库而不直接使用 SQL 语句的方式。

[www.prisma.io](www.prisma.io)

## start

- node
- mysql

```bash
mkdir hello-prisma
cd hello-prisma

npm init -y
npm install prisma typescript ts-node @types/node --save-dev

npm i express
npm i --save-dev @types/express

npx tsc --init
```

## initialization

```bash
npx prisma
npx prisma init
```

创建了新目录 prisma，其中包含一个 schema.prisma 文件，其中包含带有数据库连接变量和架构模型的 Prisma 架构

```diff
tree ./ -a -L 2
$
  .
+ ├── .env
  ├── .gitignore
  ├── package.json
  ├── pnpm-lock.yaml
+ ├── prisma
+ │   └── schema.prisma
  └── tsconfig.json
```

## connect to mysql

::: code-group

```diff [prisma/schema.prisma]
generator client {
  provider = "prisma-client-js"
}

datasource db {
-  // provider = "postgresql"
+  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

```diff [.env]
- # DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
+ DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
```

:::

::: warning

url 是通过环境变量设置的，该变量在以下位置定义.env
DATABASE_URL="`mysql://USER:PASSWORD@HOST:PORT/DATABASE`"
:::

## create database schema 创建数据库架构

```bash
brew services start mysql

mysql -u root -p
```

1. 使用 Prisma Migrate 在数据库中创建表。

::: code-group

```diff [prisma/schema.prisma]
+ model Post {
+   id        Int      @id @default(autoincrement())
+   createdAt DateTime @default(now())
+   updatedAt DateTime @updatedAt
+   title     String   @db.VarChar(255)
+   content   String?
+   published Boolean  @default(false)
+   author    User     @relation(fields: [authorId], references: [id])
+   authorId  Int
+ }

+ model User {
+   id      Int      @id @default(autoincrement())
+   email   String   @unique
+   name    String?
+   posts   Post[]
+   profile Profile?
+ }
```

:::

2. 将数据模型映射到数据库模式

```bash
npx prisma db push
# 将 Prisma Schema 文件中的定义与数据库同步

# or
npx prisma migrate dev --name init
# 它为此迁移创建一个新的 SQL 迁移文件
# 它针对数据库运行 SQL 迁移文件
```

## install prisma-client

Prisma 客户端 `Prisma Client`是由 Prisma 自动生成的数据库访问库。

```bash
npm install @prisma/client
```

### use prisma-client

1. 开始编写查询以在数据库中读取和写入数据。

::: code-group

```ts [src/app.ts]
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const data = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.send(data);
});

app.get("/user/:id", async (req, res) => {
  const data = await prisma.user.findMany({
    where: {
      id: Number(req.params.id),
    },
  });
  res.send(data);
});

app.post("/create", async (req, res) => {
  const { name, email } = req.body;
  const data = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: [
          {
            title: "标题1",
            content: "内容1",
          },
          {
            title: "标题2",
            content: "内容2",
          },
        ],
      },
    },
  });
  res.send(data);
});

app.post("/update", async (req, res) => {
  const { id, name, email } = req.body;
  const data = await prisma.user.update({
    data: {
      name,
      email,
    },
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await prisma.post.deleteMany({
    where: {
      authorId: Number(id),
    },
  });
  const data = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
```

:::

::: warning
/create 可以嵌套创建
/delete 需要集联删除
:::
