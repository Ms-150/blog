# Short Link / Short URL 短链接

短链接是一种缩短长网址的方法，将原始的长网址转换为更短的形式。它通常由一系列的字母、数字和特殊字符组成，比起原始的长网址，短链接更加简洁、易于记忆和分享。

类似 [TinyURL](https://tinyurl.com/)

## install

```bash
npm install nanoid
```

详见 [nanoid](../js/nanoid.md)

## usage

1. express + knex + mysql2 + nanoid

::: code-group

```sql [创建数据表]
CREATE TABLE shortcodes (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '短码记录的唯一标识',
  shortcode VARCHAR(255) NOT NULL COMMENT '生成的唯一短码',
  original_url TEXT NOT NULL COMMENT '用户提供的原始 URL',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '记录的创建时间'
) COMMENT = '存储短码与原始 URL 的映射';
```

```bash [install]
npm install express mysql2 knex nanoid
```

```js [app.js]
import express from "express";
import knex from "knex";
import { nanoid } from "nanoid";

// 创建 Express 应用
const app = express();

// 配置 knex 连接 MySQL
const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root", // MySQL 用户名
    password: "root", // MySQL 密码
    database: "short_link", // 数据库名
  },
});

// 解析 JSON 请求体
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to mysql2");
});

// 创建短码并保存原始 URL 的接口
app.post("/generate-short-id", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "Original URL is required" });
  }

  try {
    // 使用 shortid 生成一个唯一的短码
    const uniqueShortId = nanoid(5);

    // 将短码和原始 URL 保存到数据库
    await db("shortcodes").insert({
      shortcode: uniqueShortId,
      original_url: originalUrl,
    });

    // 返回生成的短码和原始 URL
    res.status(201).json({ shortcode: uniqueShortId, originalUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 根据短码重定向到原始 URL
app.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;

  try {
    // 根据短码从数据库查询对应的原始 URL
    const result = await db("shortcodes").where({ shortcode }).first();

    if (!result) {
      return res.status(404).json({ message: "Shortcode not found" });
    }

    // 重定向到原始 URL
    res.redirect(result.original_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 启动服务器
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

:::

2. express + prisma + nanoid

::: code-group

```bash [install]
npm install prisma -D
npm install express @prisma/client nanoid
```

```prisma [初始化 Prisma]
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model ShortUrl {
  id          Int      @id @default(autoincrement())
  url         String
  short_url   String   @unique
  create_time DateTime @default(now())
}
```

```bash [生成数据库表]
npx prisma migrate dev --name init
```

```js [app.js]
import express from "express";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

// 创建 Express 应用
const app = express();
const prisma = new PrismaClient();

// 解析 JSON 请求体
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to mysql2");
});

// 创建短码并保存原始 URL 的接口
app.post("/generate-short-id", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "Original URL is required" });
  }

  try {
    // 使用 shortid 生成一个唯一的短码
    const uniqueShortId = nanoid(5);

    // 将短码和原始 URL 保存到数据库
    await prisma.shortUrl.create({
      data: {
        url: originalUrl,
        short_url: uniqueShortId,
      },
    });

    // 返回生成的短码和原始 URL
    res.status(201).json({ short_url: uniqueShortId, url: originalUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 根据短码重定向到原始 URL
app.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;

  try {
    // 根据短码从数据库查询对应的原始 URL
    const result = await prisma.ShortUrl.findUnique({
      where: {
        short_url: shortcode,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Shortcode not found" });
    }

    // 重定向到原始 URL
    res.redirect(result.url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 启动服务器
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

:::
