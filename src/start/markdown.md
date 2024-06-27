# MarkDown

## 简介

Markdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。  
Markdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。  
Markdown 编写的文档后缀为 .md, .markdown。

## 基本语法

## 构建状态 徽章

[![Build Status](https://img.shields.io/github/workflow/status/Ms-150/blog/CI)](https://github.com/Ms-150/blog/actions)

<a href="https://github.com/Ms-150/blog/actions" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/github/workflow/status/Ms-150/blog/CI" alt="Build Status">
</a>

```md
[![Build Status](https://img.shields.io/github/workflow/status/Ms-150/blog/CI)](https://github.com/Ms-150/blog/actions)

<a href="https://github.com/Ms-150/blog/actions" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/github/workflow/status/Ms-150/blog/CI" alt="Build Status">
</a>
```

生成徽章的网站
[https://shields.io/](https://shields.io/)

## 标题语法

# 一级标题

    ```md
    # 一级标题
    ```

## 二级标题

    ```md
    ## 二级标题
    ```

### 三级标题

    ```md
    ### 三级标题
    ```

#### 四级标题

    ```md
    #### 四级标题
    ```

##### 五级标题

    ```md
    ##### 五级标题
    ```

###### 六级标题

    ```md
    ###### 六级标题
    ```

## 字体语法

- **加粗**

  ```md
  **加粗**
  ```

- _斜体_

  ```md
  _斜体_
  ```

- **_加粗倾斜体_**

  ```md
  **_加粗倾斜体_**
  ```

- ~~删除线~~

  ```md
  ~~删除线~~
  ```

- <u>下划线</u>

  ```md
  <u>下划线</u>
  ```

- 脚注
  
  正文[^1]。
  
  [^1]: 脚注的内容，鼠标滑入显示。


  ```md
  正文[^1]。
  [^1]: 脚注的内容,鼠标滑入显示。
  <!-- 注释// 脚注标识符必须是数字 -->
  ```

- <font color="red">红色字体</font>

  ```md
  <font color="red">红色字体</font>
  ```

## 段落语法

<p style="color: blue">蓝色字体的段落.</p>

```md
<p style="color: blue">蓝色字体的段落.</p>
```

### 换行符

+ 两个空格
+ 空一行
+ `<br>`

段落后面 **两个空格加回车** 表示换行  

**空一行** 表示新的段落

<p>This is the first line.<br>
And this is the second line.</p>

```md
<p>This is the first line.<br>
And this is the second line.</p>


This is the first line.`  `
And this is the second line.


This is the first line.

And this is the second line.
```

### 列表语法

#### 无序列表
+ 第一项
+ 第二项

* 第一项
* 第二项

- 第一项
- 第二项

```md
+ 第一项
+ 第二项

* 第一项
* 第二项

- 第一项
- 第二项

<!-- 注释 + - * 都可以  -->
```
#### 有序列表
1. 第一项
2. 第二项

- 第 1 项
  - 第 1-1 项
    - 第 1-1-1 项

```md
1. 第一项
2. 第二项

- 第 1 项
  - 第 1-1 项
    - 第 1-1-1 项
```

## 引用语法

- > 块引用
- > > 块引用
- > > > 嵌套块引用

## 代码语法

### \`\`

At the command prompt, type `nano`.

```md
At the command prompt, type `nano`.
```
### 代码块

    `tab键` 也可以生成代码块

```
console.log('这是一个代码块!')
```

```bash
cd app
npm i
node app
```

```diff
+ console.log('diff语法高亮')
- console.log('这是一个代码块!')
```

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

### 链接

- [百度](https://www.baidu.com) / <https://www.baidu.com>

  ```md
  [链接名](链接地址)
  <https://www.baidu.com>
  ```

- 高级链接[1]，通过变量来设置一个链接，变量赋值在文档末尾进行。

  [1]: www.baidu.com

  ```md
  高级链接[1]，通过变量来设置一个链接，变量赋值在文档末尾进行。
  [1]: www.baidu.com
  ```

- 点击跳转到[高级技巧](#高级技巧)部分.

  ```md
  点击跳转到[高级技巧](#高级技巧)部分.
  ```

### 邮箱

<fake@example.com>

```md
<fake@example.com>
```

### 分割线

---

```md
---
```

### 图片

- ![alt 属性](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png "百度")

  ```md
  ![alt 属性](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png "百度")
  <!-- 注释// 无法调整高度与宽度 -->
  ```

- <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" width="30%" height="30%">

  ```md
  <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" width="30%" height="30%">
  ```

### 表格

| 表头   | 展示   | 默认左对齐 |
| ------ | ------ | ------- |
| 单元格 | 单元格 | 单元格     |

```md
| 表头   | 展示   | 默认左对齐 |
| ------ | ------ | ------- |
| 单元格 | 单元格 | 单元格     |
```

| 表头   |   展示   | 对其方式 |
| :----- | :------: | ----: |
| 左对齐 | 居中对齐 |   右对齐 |

```md
| 表头   |   展示   | 对其方式 |
| :----- | :------: | ----: |
| 左对齐 | 居中对齐 |   右对齐 |
```

### 任务列表

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

```md
+ [x] Write the press release
+ [ ] Update the website
+ [ ] Contact the media
```

## 高级技巧

支持的 **HTML 元素** 和 **转义字符 `\`**

| 字符 | 元素 |
| ---- | ---- |
| `\`  | 反斜线 |
| `` ` `` | 反引号 |
| `* ` | 星号 |
| `_`  | 下划线 |
| `{}` | 花括号 |
| `[]` | 方括号 |
| `()` | 小括号 |
| `#`  | 井号 |
| `+`  | 加号 |
| `-`  | 减号 |
| `.`  | 英文句点 |
| `!`  | 感叹号 |

// 注：复制到本地保存 .md 文件，vscode 打开 即可查看效果

## 上标 `<sup>` 下标 `</sup>`

- X<sup>2</sup>
- H<sub>2</sub>O

```md
X<sup>2</sup>
H<sub>2</sub>O
```
