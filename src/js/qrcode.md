# qrcode

QR Code（Quick Response Code，二维码）是一种二维条形码

二维条形码生成器

[https://github.com/soldair/node-qrcode](https://github.com/soldair/node-qrcode)

## install

```bash
npm intall qrcode
```

## usage

::: code-group

```js [字符串输出 toString]
const QRCode = require("qrcode");

// 生成终端 ASCII 二维码
QRCode.toString(
  "Hello, QR Code!",
  { type: "terminal" },
  function (err, string) {
    if (err) throw err;
    console.log(string); // 在终端输出二维码的ASCII形式
  }
);

// 生成 SVG 格式的二维码
QRCode.toString("https://example.com", { type: "svg" }, function (err, svg) {
  if (err) throw err;
  console.log(svg); // 输出二维码的 SVG 格式字符串
});
```

```js [图片文件输出 (toFile)]
const QRCode = require("qrcode");

// 生成并保存 PNG 文件
QRCode.toFile("./qrcode.png", "https://example.com", function (err) {
  if (err) throw err;
  console.log("QR Code saved as qrcode.png");
});

// 生成并保存 SVG 文件
QRCode.toFile("./qrcode.svg", "https://example.com", function (err) {
  if (err) throw err;
  console.log("QR Code saved as qrcode.svg");
});
```

```js [Base64 数据 URL 输出 (toDataURL)]
const QRCode = require("qrcode");

QRCode.toDataURL("Hello, QR Code!", function (err, url) {
  if (err) throw err;
  console.log(url); // 输出二维码的 Base64 数据 URL
});
```

```js [Buffer 输出 (toBuffer)]
const QRCode = require("qrcode");

QRCode.toBuffer("Hello, QR Code!", function (err, buffer) {
  if (err) throw err;
  console.log(buffer); // 输出二维码图像的 Buffer
});
```

```js [Canvas 输出 (toCanvas)]
const QRCode = require("qrcode");

QRCode.toCanvas(canvasElement, "https://example.com", function (error) {
  if (error) console.error(error);
  console.log("QR Code rendered on canvas");
});
```

:::

### 自定义 options

例如设置二维码的宽度、边距、颜色等

```js
const options = {
  width: 300,
  margin: 4,
  color: {
    dark: "#0000ff", // 蓝色前景色
    light: "#ffffff", // 白色背景
  },
  scale: 5, // 缩放比例
};
```

::: warning
不支持自定义 options
toString：生成 ASCII 或 SVG 字符串形式的二维码，不支持自定义颜色、宽度等。
:::

## example

::: code-group

```js [react]
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const App = () => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      QRCode.toCanvas(
        codeRef.current,
        "ms-150.github.io/blog/",
        { width: 300, height: 300 },
        function (error: unknown) {
          if (error) {
            console.error("Failed to generate QR code:", error);
          }
        }
      );
    }
  }, [codeRef]);
  return (
    <div>
      <canvas ref={codeRef}></canvas>
    </div>
  );
};

export default App;
```

```js [vue]
<template>
  <div>
    <h1>QR Code 示例</h1>
    <canvas ref="qrCanvas"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  data() {
    return {
      value: 'https://example.com' // 你想要编码的内容
    };
  },
  mounted() {
    QRCode.toCanvas(this.$refs.qrCanvas, this.value, (error) => {
      if (error) console.error(error);
    });
  }
};
</script>
```

:::
