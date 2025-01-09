# watermark 水印

1. CSS 背景图
2. SVG 背景图
3. Canvas

## Css background

```html
<div class="watermark-container">
  <h1>Welcome to My Website</h1>
  <p>This content is protected by a watermark.</p>
</div>

<style>
  .watermark-container {
    position: relative;
    padding: 40px;
    /* 设置背景水印的样式 */
    overflow: hidden;
  }

  /* 使用伪元素来实现重复旋转水印 */
  .watermark-container::after {
    content: ""; /* 伪元素无内容 */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="10" y="50" fill="rgba(0,0,0,0.1)" font-size="20">Your Watermark</text></svg>');
    background-repeat: repeat; /* 背景图像重复 */
    background-size: 150px 150px; /* 设置水印的大小 */
    transform: rotate(-25deg); /* 旋转水印 */
    pointer-events: none; /* 防止影响交互 */
    opacity: 0.5; /* 设置水印透明度 */
    z-index: 1; /* 确保水印在其他内容上 */
  }
</style>
```

## svg

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <text
    x="50%"
    y="50%"
    font-size="50"
    text-anchor="middle"
    fill="rgba(0, 0, 0, 0.1)"
  >
    Watermark
  </text>
</svg>
```

## canvas

```html
<canvas id="watermarkCanvas" width="800" height="600"></canvas>
<script>
  var canvas = document.getElementById("watermarkCanvas");
  var ctx = canvas.getContext("2d");

  // 设置水印字体和样式
  ctx.font = "48px sans-serif";
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 绘制水印文本
  ctx.save();
  ctx.rotate((-45 * Math.PI) / 180); // 旋转水印
  ctx.fillText("Watermark", canvas.width / 2, canvas.height / 2);
  ctx.restore();
</script>
```
