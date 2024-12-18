# watermark 水印

1. CSS 背景图
2. SVG 背景图
3. Canvas

## Css background

```html
<div id="watermark"></div>

<style>
  #watermark {
    width: 150%;
    height: 150%;
    position: fixed;
    top: -20%;
    left: -20%;
    pointer-events: none;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="10" y="50" fill="rgba(0,0,0,0.1)" font-size="20">Your Watermark</text></svg>');
    z-index: 9999;
    transform: rotate(-25deg);
  }
</style>
```

## svg

```

```

## canvas

```

```
