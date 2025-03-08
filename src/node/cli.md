# NPM 脚手架

CLI 命令行界面 是 Node.js 包管理器 npm 的命令行工具，允许用户通过命令行与 npm 进行交互。

## 编写自定义 NPM 脚手架

- `commander` 一个强大的命令行参数解析工具，适用于处理命令、选项和参数。
- `inquirer` 一个用于与命令行用户进行交互的库，能够创建漂亮的命令行提示。
- `ora` 一个用于在命令行中显示加载动画（spinner）的库，常用于显示异步操作的进度。
- `download-git-repo` 一个用于从 Git 仓库（如 GitHub、GitLab 等）下载项目模板的库，常用于脚手架工具中自动拉取模板。

### install

```bash
npm i commander inquirer ora download-git-repo
```

### 编写脚手架

1. 自定义命令

```js
// cli.js
#!/usr/bin/env node
// Node.js 脚本的一个标准开头，它确保脚本可以在不同的环境和系统上找到正确的 Node.js 解释器来运行。

console.log("mycli run");
```

2. 挂载自定义命令 -> 创建软连接 挂载到全局

```diff
# package.json
+ "bin": {
+    "mycli": "src/cli.js"
+  },
```

```bash
npm link # 创建软连接 挂载到全局
```

3. 编写脚手架

::: code-group

```js [cli.js]
#!/usr/bin/env node
// Node.js 脚本的一个标准开头，它确保脚本可以在不同的环境和系统上找到正确的 Node.js 解释器来运行。

import { program } from "commander";
import inquirer from "inquirer";
import fs from "node:fs";
import { checkPath, downloadTemp } from "./util.js";

// console.log("mycli run");

let package_json = fs.readFileSync("./package.json");
package_json = JSON.parse(package_json);

program.version(package_json.version);

program
  .command("create <projectName>")
  .alias("c")
  .description("创建项目")
  .action((name) => {
    console.log(name);
    inquirer
      .prompt([
        {
          type: "input",
          name: "projectName",
          message: "请输入项目名名称",
          default: name,
        },
        { type: "confirm", name: "isTS", message: "是否启用 TS" },
      ])
      .then((res) => {
        // console.log(res);
        if (checkPath(res.projectName)) {
          console.log("文件夹已存在");
          return;
        }
        if (res.isTS) {
          downloadTemp("ts", res.projectName);
        } else {
          downloadTemp("js", res.projectName);
        }
      })
      .catch(() => {
        console.error("操作被取消");
        process.exit(1); // 处理异常后退出
      });
  });

program.parse(process.argv);
```

```js [util.js]
import fs from "fs";
import download from "download-git-repo";
import ora from "ora";

export const checkPath = (path) => {
  if (fs.existsSync(path)) {
    return true;
  } else {
    return false;
  }
};

export const downloadTemp = (branch, name) => {
  return new Promise((resolve, reject) => {
    const spinner = ora("Loading...").start();
    download(
      `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`,
      name,
      { clone: true },
      function (err) {
        if (err) reject(err);
        resolve();
        spinner.succeed("下载完成");
      }
    );
  });
};
```

:::

4. login

```bash
npm login
```

::: warning
note npm registry

```bash
npm config get registry

npm config set registry https://registry.npmjs.org/

# taobao
npm config set registry https://registry.npmmirror.com/
```

:::

5. publish

发布到 npmjs 搭建 [npm 私有仓库详见](./npm&yarn&npx&pnpm.md/#npm-私有仓库)

```bash
npm publish
```
