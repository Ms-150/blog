# TypeScript / TS

Typescript 是 Javascript 类型的超集，它可以编译成纯 Javascript。
Typescript 可以在任何浏览器、任何计算机和任何操作系统上运行，并且是开源的。

[官网](https://www.typescriptlang.org/)

## 安装

```bash
npm install -g typescript
tsc -v      # 查看版本号
```

### 初始化 tsconfig.json

```bash
tsc --init
```

### 安装声明文件

```bash
npm i @types/node -D
```

### 编译代码

```bash
tsc xxx.ts
```

## 数据类型

- 任意值 any

  ```ts
  let variable: any = "Hello, TypeScript!";
  variable = 42; // 不会报错，因为变量是 any 类型，可以赋值为任何类型
  ```

- 未知的类型 unknow

  ```ts
  let variable: unknown = "Hello, TypeScript!";

  // 使用 unknown 类型的值之前进行类型检查，可以使用类型断言或控制流程：
  if (typeof variable === "string") {
    // 在这个分支中，variable 被 TypeScript 推断为 string 类型
    variable.toUpperCase(); // 安全调用方法
  }
  ```

- Object / {} 全局类型

  ##### 表示具有任意属性的对象。它是所有非原始类型的父类型，包括字符串、数字、布尔、数组、函数等。

  ```ts
  let obj: Object;

  // 原始数据类型
  obj = 42;
  obj = "hello";
  obj = true;

  // 对象类型
  obj = { key: "value" };
  obj = [1, 2, 3];
  obj = (x: number) => x * 2;
  obj = new Date();
  obj = /^pattern$/;
  ```

- object 原始类型

  ##### 表示非原始类型的对象(string、number、boolean)

  ```ts
  obj = {}; // 合法，空对象
  obj = { key: "value" }; // 合法，包含属性的对象
  obj = (x: number) => x * 2; // 合法，函数
  obj = new Date(); // 合法，Date 对象
  obj = new RegExp("pattern"); // 合法，正则表达式对象
  ```

- 数字型 number

  ##### 双精度 64 位浮点值。它可以用来表示整数和分数。

  ```ts
  let ryLiteral: number = 0b1010; // 二进制
  let lLiteral: number = 0o744; // 八进制
  let iteral: number = 6; // 十进制
  let iteral: number = 0xf00d; // 十六进制
  ```

- 字符型 string

  ##### 一个字符系列，使用单引号（'）或双引号（"）来表示字符串类型。反引号（`）来定义多行文本和内嵌表达式

  let name: string = "Runoob";

- 布尔型 boolean

  ##### 表示逻辑值：true 和 false。

  let flag : boolean = true;

- 数组类型 number[] Array<number>

  ##### 声明变量为数组

  ```ts
  // 元素类型后面加上 []：
  let numbers: number[] = [1, 2, 3, 4];
  let strings: string[] = ["a", "b", "c"];

  // 泛型 Array<elementType>
  let numbers: Array<number> = [1, 2, 3, 4];
  let strings: Array<string> = ["a", "b", "c"];

  // 二维数组 [][]
  let numbers: number[][] = [
    [1, 2],
    [3, 4],
  ];
  let strings: Array<Array<string>> = [["a", "b"], ["c"]];
  ```

- tuple 元组

  ##### 表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。

  let x: [string, number] = ['runoob', 1];

- 枚举 enum

  ##### 定义数值集合

  ```ts
  // 未赋值枚举 默认下标 0 开始
  enum Color {
    red,
    green,
    blue,
  }
  let value: Color = Color.blue;
  console.log(value); // 输出 2
  ```

- void

  ##### 标识方法返回值的类型 标识该方法没有返回值

  function hello() :void {}

- null

  ##### 表示对象值的缺失

- undefined

  ##### 用于初始化变量为一个未定义的值

- never
  ##### 其他类型（包含 null 和 undefined）的字类型，代表从不会出现的值

#### 联合类型

通过 | 将变量设置多种类型，赋值时根据设置的类型来赋值。

```ts
var val: string | number;
val = 12;
val = "runoob";

// 联合类型数组
var arr: number[] | string[];
arr = [1, 2, 4];
arr = ["Runoob", "Google", "Taobao"];
```

#### 交叉类型

结合多个类型，创建一个包含这些类型所有特性的新类型。

```ts
type Point = { x: number; y: number };
type Color = { color: string };

type ColoredPoint = Point & Color;
let coloredPoint: ColoredPoint = { x: 1, y: 2, color: "red" };
```

### 断言类型

#### 用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型

- #### <类型>值
- #### 值 as 类型

```ts
let str: any = "runoob";
// <类型>值
let strLength: number = (<string>str).length;
// 值 as 类型
let strLength1: number = (str as string).length;
```

- #### ! 非空断言

```ts
let x: string | null | undefined;
user!.toUpperCase(); // ! 变量不为空
```

### 类型守卫

- #### in 判断是否包含某个属性

```ts
interface isObject1 {
  a: number;
  x: string;
}

interface isObject2 {
  a: number;
  y: string;
}

function isInObject(arg: isObject1 | isObject2) {
  if ("x" in arg) console.log(arg.x);
  if ("y" in arg) console.log(arg.y);
}
isInObject({ a: 1, x: "xxx" });
isInObject({ a: 1, y: "yyy" });
```

- #### typeof 判断参数的类型

```ts
function isTypeof(value: string | number) {
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
}
```

- #### 获取变量的类型

```ts
const user = {
  name: "Alice",
  age: 30,
};

type UserType = typeof user;
```

- #### 判断参数的类型

```ts
// typeof
function isTypeof(val: string | number) {
  if (typeof val === "number") return "number";
  if (typeof val === "string") return "string";
}

// instanceof
function createDate(date: Date | string) {
  if (date instanceof Date) {
    date.getDate();
  } else {
    return new Date(date);
  }
}
```

### 函数

- 函数返回值

  ##### 返回值的类型要与函数定义的返回类型一致。

  ```ts
  function add(x: number, y: number): number {
    return x + y;
  }
  ```

- 可选参数

  ##### 参数设置为可选，可选参数使用问号标识 ?

  ```ts
  function value(first: string, last?: string) {
    if (last) {
      return first + " " + last;
    } else {
      return first;
    }
  }

  let result1 = value("Bob");
  let result3 = value("Bob", "Adams");
  ```

- 默认参数

  ##### 设置参数的默认值，在调用函数时，如果不传入该参数的值，则使用默认参数

  ```ts
  function count(price: number, rate: number = 0.5): number {
    return price * rate;
  }
  count(1000);
  count(1000, 0.3);
  ```

- 剩余参数

  ##### 不知道要向函数传入多少个参数，就可以使用剩余参数来定义

  ```ts
  function newName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
  }

  newName("Jose", "Samu", "Luca", "MacK");
  ```

- 函数表达式

  ```ts
  let multiply: (a: number, b: number) => number = function (x, y) {
    return x * y;
  };
  ```

- 函数重载

  ```ts
  // 函数重载
  function greet(name: string): string;
  function greet(age: number): string;
  function greet(value: string | number): string {
    if (typeof value === "string") {
      return `Hello, ${value}!`;
    } else {
      return `Hello, you are ${value} years old!`;
    }
  }

  // 调用函数
  let result1 = greet("John"); // 编译器选择第一个重载，输出: Hello, John!
  let result2 = greet(25); // 编译器选择第二个重载，输出: Hello, you are 25 years old!
  ```

### 接口 interface

##### 接口是一系列抽象方法的声明，是一些方法特征的集合

```ts
interface Person {
  readonly name: string; // readonly 只读
  age?: number; // ? 可选属性
  [propName: string]: any; // 其它任意属性
  sayHi: () => string;
}

let customer: Person = {
  name: "Tom",
  lastName: "Hanks",
  sayHi: (): string => {
    return "Hi there";
  },
};

// 函数接口
interface Fn {
  (name: string): number[];
}

const fn: Fn = function (name: string) {
  return [1, 2, 3];
};
```

#### 接口继承 extend

##### 接口可以通过其他接口来扩展自己。允许接口继承多个接口

```ts
// 单继成
interface Person {
  age: number;
}

interface Musician extends Person {
  instrument: string;
}

let drummer = <Musician>{};
drummer.age = 27;
drummer.instrument = "Drums";

// 多继承
interface IParent1 {
  v1: number;
}

interface IParent2 {
  v2: number;
}

interface Child extends IParent1, IParent2 {}

let Iobj: Child = { v1: 1, v2: 2 };
```

### 命名空间 namespace

##### 解决重名问题

### 声明文件 declare

##### 以.d.ts 为后缀的文件被称为声明文件。

    tsc -d / --declaration  // 生成 .d.ts 文件

```ts
declare module Module_Name {
    export ...
}
```

### 内置工具类型

- #### Partial<T> 部分的

  将类型 T 的所有属性设置为可选。

  ```ts
  interface Person {
    name: string;
    age: number;
  }

  // 使用 Partial 将 Person 类型的属性都变成可选
  type PartialPerson = Partial<Person>;

  // 使用 PartialPerson 类型
  let partialPerson: PartialPerson = {};
  partialPerson.name = "Alice"; // 可选属性，不再强制要求
  ```

- #### Required<T> 必须的

  将类型 T 的所有属性设置为必选。

  ```ts
  interface Person {
    name?: string;
    age?: number;
  }

  // 使用 Required 将 Person 类型的所有属性都设置为必选
  type RequiredPerson = Required<Person>;

  // 使用 RequiredPerson 类型
  let requiredPerson: RequiredPerson = {
    name: "Alice",
    age: 25,
  };
  ```

- #### Readonly<T> 只读

  将类型 T 的所有属性设置为只读。

  ```ts
  interface Person {
    name: string;
    age: number;
  }

  // 使用 Readonly 将 Person 类型的所有属性都设置为只读
  type ReadonlyPerson = Readonly<Person>;

  // 使用 ReadonlyPerson 类型
  let readonlyPerson: ReadonlyPerson = {
    name: "Alice",
    age: 25,
  };

  // 下面的操作会导致编译时错误
  // readonlyPerson.name = "Bob";
  // readonlyPerson.age = 26;
  ```

- #### Pick<T, K> 选择

  从类型 T 中选择指定属性 K，形成一个新的类型。

  ```ts
  interface Person {
    name: string;
    age: number;
    address: string;
  }

  // 从 Person 类型中选择 name 和 address 属性，形成新类型
  type PersonInfo = Pick<Person, "name" | "address">;

  // 使用 PersonInfo 类型
  let personInfo: PersonInfo = {
    name: "Alice",
    address: "123 Main St",
  };

  // 下面的操作会导致编译时错误
  // personInfo.age = 25;
  ```

- #### Omit<T, K> 排除

  从类型 T 中排除指定属性 K，形成一个新的类型。

  ```ts
  interface Person {
    name: string;
    age: number;
    address: string;
  }

  type PersonWithoutAge = Omit<Person, "age">;

  let personWithoutAge: PersonWithoutAge = {
    name: "Alice",
    address: "123 Main St",
  };

  // 下面的操作会导致编译时错误
  // personWithoutAge.age = 25; // Error: Property 'age' does not exist on type 'PersonWithoutAge'.
  ```

- #### Record<K, T>

  创建一个包含指定键类型 K 和值类型 T 的对象类型。

  ```ts
  type PhoneNumbers = Record<string, string>;

  let phoneBook: PhoneNumbers = {
    Alice: "123-456-7890",
    Bob: "987-654-3210",
  };
  ```

- #### Exclude<T, U> 排除

  从类型 T 中排除可以赋值给类型 U 的所有属性。

  ```ts
  type Numbers = Exclude<number | string, string>; // 类型为 number
  ```

- #### Extract<T, U> 提取

  从类型 T 中提取可以赋值给类型 U 的所有属性。

  ```ts
  type Strings = Extract<number | string, string>; // 类型为 string
  ```

- #### NonNullable<T>
  从类型 T 中排除 null 和 undefined。
  ```ts
  type NotNullableStrings = NonNullable<string | null | undefined>; // 类型为 string
  ```
- #### ReturnType<T>

  获取函数类型 T 的返回类型。

  ```ts
  function greet(): string {
    return "Hello, TypeScript!";
  }

  type Greeting = ReturnType<typeof greet>; // 类型为 string
  ```