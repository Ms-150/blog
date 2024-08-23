# ffmpeg

用于录制、转换和传输音频和视频的完整跨平台解决方案。

[https://www.ffmpeg.org/](https://www.ffmpeg.org/)

## install

```sh
brew install ffmpeg

ffmpeg -version # 查看 FFmpeg 版本
ffmpeg -h       # 显示帮助信息
ffmpeg -codecs  # 查看支持的编解码器
ffmpeg -formats # 查看支持的格式
```

## Common Commands

```sh
ffmpeg -i input_video.mp4   # 查看视频信息

# 格式转换 提取音频
ffmpeg -i input.mp4 output.avi
# 提取音频
ffmpeg -i input.mp4 -vn -acodec copy output.mp3
# 裁剪 10-20s `-ss 10 -to 20`
ffmpeg -i input.mp4 -ss 10 -to 20 -c copy output.mp4

# 添加文字水印 -vf (video filter) drawtext
ffmpeg -i input.mp4 -vf drawtext="text='水印':fontsize=30:x=30:y=30:fontcolor=white" output.mp4
# 删除文字水印
ffmpeg -i input.mp4 -vf delogo=w=60:h=30:x=30:y=30 output.mp4

# 添加图片水印 overlay=x:y 指定水印的位置
# x 和 y 表示水印相对于视频左上角的水平和垂直偏移量（像素值）。
# W 和 H 代表视频的宽度和高度
ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=x:y" output.mp4

# 水印在正中心 透明度50%
ffmpeg -i input.mp4 -i watermark.png -filter_complex "overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2,format=rgba,colorchannelmixer=aa=0.5" output.mp4

```
