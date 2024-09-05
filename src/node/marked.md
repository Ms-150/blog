# Marked

一个轻量级的 Markdown 解析器和编译器，用于将 `Markdown` 格式的文本转换为 `HTML`。它在 Node.js 和浏览器环境中都可以使用，且性能高效、支持扩展性。

[https://github.com/markedjs/marked](https://github.com/markedjs/marked)

## install

```bash
npm install marked
```

## usage

```js
import { marked } from "marked";

// 示例 Markdown 文本
const markdownText = `
# Hello World

This is a **Markdown** document.

- Item 1
- Item 2
- Item 3
`;

// 将 Markdown 转换为 HTML
const htmlOutput = marked(markdownText);

console.log(htmlOutput);
>>>
<h1>Hello World</h1>
<p>This is a <strong>Markdown</strong> document.</p>
<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ul>
```

### example

```js
import ejs from "ejs";
import { marked } from "marked";
import fs from "fs";

const mdContent = fs.readFileSync("./content.md", "utf-8");

ejs.renderFile(
  "./template.ejs",
  { content: marked(mdContent) },
  (err, html) => {
    if (err) throw err;
    console.log(html);
  }
);
```
