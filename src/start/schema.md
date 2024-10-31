# MVC IOC DI

MVC（Model-View-Controller）、IoC（Inversion of Control 控制反转）和 DI（Dependency Injection 依赖注入）是现代软件开发中的三种重要架构和设计模式，它们用于提升代码的可维护性、可扩展性以及模块化。

## MVC 架构

`Model-View-Controller`

一种软件架构模式，用于分离应用程序的关注点。它将应用程序分为三部分：模型（Model）、视图（View）和控制器（Controller）。

## IOC

`Inversion of Control` 控制反转
IoC 是一种设计原则，它将对象创建和管理的责任交由外部容器，通常是框架来完成。
减少模块间的耦合，使代码更具扩展性和可测试性。
通过将依赖对象的控制权从内部反转给外部，实现模块解耦。

## DI

`Dependency Injection` 依赖注入

DI 是实现 IoC 的一种具体方法。它通过将依赖对象传递给需要它的类，而不是在类内部自行创建。
使得组件之间的依赖关系更加显式，同时允许通过配置轻松更改依赖对象。

## example

express inversify reflect-metadata inversify-express-utils prisma

```bash
npm install inversify reflect-metadata
npm install express @types/express
npm install inversify-express-utils
npm install prisma
```

```
tree ./ -L 2
>>>
./
├── package.json
├── pnpm-lock.yaml
├── prisma
│   └── schema.prisma
├── request.http
├── src
│   ├── db
│   │   └── index.ts
│   ├── post
│   │   ├── controller.ts
│   │   ├── post.dto.ts
│   │   └── services.ts
│   └── user
│       ├── controller.ts
│       ├── services.ts
│       └── user.dto.ts
├── main.ts
└── tsconfig.json
```

::: code-group

```ts [main.ts]
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";
import { User } from "./user/controller";
import { UserServices } from "./user/services";
import express from "express";

const container = new Container();

// user 模块
container.bind(User).to(User);
container.bind(UserServices).to(UserServices);

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
});

const app = server.build();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

```json [tsconfig.json]
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

```ts [user/controller.ts]
import {
  controller,
  httpGet as GetMapping,
  httpPost as PostMapping,
} from "inversify-express-utils";
import { UserServices } from "./services";
import { inject } from "inversify";
import type { Request, Response } from "express";

@controller("/user")
export class User {
  constructor(
    @inject(UserServices) private readonly UserServices: UserServices
  ) {}

  @GetMapping("/index")
  public getIndex(req: Request, res: Response) {
    console.log(req.query);

    let result = this.UserServices.getIndex();
    res.send(result);
  }

  @PostMapping("/create")
  public createUser(req: Request, res: Response) {
    console.log(req.body);
    let result = this.UserServices.createUser();
    res.send(result);
  }
}
```

```ts [user/services.ts]
import { injectable } from "inversify";

@injectable()
export class UserServices {
  public getIndex() {
    return {
      value: "index",
    };
  }
  public createUser() {
    return "create ok";
  }
}
```

:::

```bash [requset.http]
# GET http://localhost:3000/user/index?a=1 HTTP/1.1


POST http://localhost:3000/user/create HTTP/1.1
Content-Type: application/json

{
    "id": 1,
    "name":"xxx1",
    "email":"xxx1@qq.com"
}
```

2. prisma

::: code-group

```ts [db/index.ts]
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class PrismaDB {
  prisma: PrismaClient;
  constructor(@inject("PrismaClient") PrismaClient: () => PrismaClient) {
    this.prisma = PrismaClient();
  }
}
```

```diff [main.ts]
+ import { PrismaClient } from "@prisma/client";
+ import { PrismaDB } from "./src/db";

# // 封装prismaClient
+ container.bind<PrismaClient>("PrismaClient").toFactory(() => {
+   return () => {
+     return new PrismaClient();
+   };
+ });

+ container.bind(PrismaDB).to(PrismaDB);
```

```ts [user/services.ts]
import { injectable, inject } from "inversify";
import { PrismaDB } from "../db";

@injectable()
export class UserServices {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {}
  public async getIndex() {
    return await this.PrismaDB.prisma.user.findMany();
  }
  public async createUser(user: any) {
    return await this.PrismaDB.prisma.user.create({
      data: user,
    });
  }
}
```

```ts [user/controller.ts]
import {
  controller,
  httpGet as GetMapping,
  httpPost as PostMapping,
} from "inversify-express-utils";
import { UserServices } from "./services";
import { inject } from "inversify";
import type { Request, Response } from "express";

@controller("/user")
export class User {
  constructor(
    @inject(UserServices) private readonly UserServices: UserServices
  ) {}

  @GetMapping("/index")
  public async getIndex(req: Request, res: Response) {
    let result = await this.UserServices.getIndex();
    res.send(result);
  }

  @PostMapping("/create")
  public async createUser(req: Request, res: Response) {
    let result = await this.UserServices.createUser(req.body);
    res.send(result);
  }
}
```

:::

3. DTO

`Data Transfer Object` 是一种设计模式，用于在不同系统或层之间传输数据。它通常用于分离应用的各层，例如表示层、业务逻辑层和数据访问层。
DTO 的主要目的是减少每次数据传输的开销，特别是在远程调用、序列化和反序列化数据的场景中。

### DTO 的特点

- 简单：DTO 通常只包含属性和 getter/setter 方法，不包含业务逻辑。
- 独立性：DTO 独立于具体的业务逻辑或持久层结构，只用于数据的承载。
- 序列化：DTO 通常是可序列化的，以便能在网络上传输或在不同的系统之间交换数据。

```bash
npm i class-validator  # 用于对象属性验证的库
npm i class-transformer # 将普通的 JavaScript 对象转换为类实例，同时也可以将类实例转换回普通对象或 JSON。
```

```ts [user/user.dto.ts]

```
