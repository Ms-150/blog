# Exiftool

Exchangeable Image File Format Tool

一款强大的开源工具，用于读取、写入和编辑图像、视频和其他文件的元数据。它支持多种文件格式（如 JPEG、PNG、RAW 文件、PDF、MP4 等），并且可以处理多种元数据标准（如 EXIF、IPTC、XMP 等）。

## feature

- 查看元数据：提取和显示文件的详细元数据信息。
- 编辑元数据：修改或添加元数据，例如更改照片的拍摄日期、地理位置等。
- 批量操作：支持对多个文件同时进行元数据的读取或修改操作。
- 支持多语言：可以读取和写入使用不同字符集的元数据。

## install

```bash
brew install exiftool

exiftool -ver
>>>
13.00
```

## usage

```bash
exiftool filename.jpg           # 查看文件全部元信息

exiftool -DateTimeOriginal filename.jpg  # 查看拍摄日期
exiftool -Model filename.jpg             # 查看相机型号
exiftool -GPSLatitude -GPSLongitude filename.jpg    # 查看 GPS 信息
exiftool -GPSLatitude="40.748817" -GPSLongitude="-73.985428" filename.jpg   # 修改 GPS 坐标


exiftool filename.jpg > metadata.txt    # 导出文件元信息
exiftool -all= filename.jpg             # 删除元信息

exiftool -DateTimeOriginal="2024:12:09 10:00:00" -Make="Canon" filename.jpg  # 同时修改多个字段
exiftool -Artist="Your Name" *.jpg      # 批量修改多个文件的元数据
```
