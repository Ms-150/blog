# xlsx

简化电子表格
阅读、编辑和导出电子表格
适用于网络浏览器和服务器

[https://sheetjs.com/](https://sheetjs.com/)

## install

```bash
npm rm --save xlsx
# npm i --save https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz

curl -O https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz
mkdir -p vendor
mv xlsx-0.20.3.tgz vendor
git add vendor/xlsx-0.20.3.tgz


```

## usage

```bash
import { read, utils } from 'xlsx';
```
