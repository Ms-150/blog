# pngquant

用于对 PNG 图像进行有损压缩。它通过将 PNG 图像的颜色数量减少到指定的数量（通常是 256 色），来显著降低图像的文件大小。

[https://pngquant.org/](https://pngquant.org/)

## install

```sh
brew install pngquant

pngquant --version
```

## principle 原理

通过颜色量化算法 `Median Cut` 将 PNG 图像中的颜色数量减少到指定的数量（通常是 256 色以内）。

### Median Cut

Median Cut 算法是一种用于颜色量化的经典图像处理算法。它的主要作用是将图像中的颜色数量减少到一个指定的数量，同时尽可能保留图像的视觉效果。颜色量化在需要减少颜色数量的场景中非常有用，比如在图像压缩、减少图像文件大小、生成调色板等。

## usage

```sh
# -o --output
pngquant input.png -o output.png

# --quality min-max 质量 min-max 取值 0-100
pngquant input.png --quality 50-80 -o output.png
# --spedd N 调整压缩过程中的速度与质量之间的平衡
# N 的取值范围为 1 到 11 ，默认 4
# 1 压缩速度最慢，但质量最高
# 11 压缩速度最快，但质量相对较差
pngquant input.png --speed 1 -o output.png
```
