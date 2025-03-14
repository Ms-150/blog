# ZIP GZIP XZ TAR

+ ZIP（.zip）：压缩 + 打包，可以独立解压，适用于 Windows & Linux。
+ GZIP（.gz）：仅压缩，但不能打包，通常与 tar 结合使用（.tar.gz）。
+ XZ（.xz）：高级压缩，比 GZIP 体积更小，但压缩速度较慢（.tar.xz）。
+ TAR（.tar）：仅打包，不压缩，但可配合 gzip/xz 进行压缩（.tar.gz、.tar.xz）。

| 格式   | 特点                                                              | 扩展名    |
| ------ | ----------------------------------------------------------------- | --------- |
| ZIP    | 同时支持压缩和打包，跨平台支持良好（Windows、Linux、macOS）       | `.zip`    |
| GZIP   | 仅压缩，不打包，通常与 `tar` 结合使用（`.tar.gz`）                | `.gz`     |
| XZ     | 高压缩比，比 `gzip` 更小，但压缩速度较慢，通常用于 `.tar.xz` 格式 | `.xz`     |
| TAR    | 仅打包，不压缩，常与 `gzip` 或 `xz` 配合使用进行压缩              | `.tar`    |
| TAR+GZ | `tar` 打包 + `gzip` 压缩                                          | `.tar.gz` |
| TAR+XZ | `tar` 打包 + `xz` 压缩                                            | `.tar.xz` |

## ZIP（打包 + 压缩）

- `.zip` 格式同时支持打包和压缩，适用于 Windows、macOS 和 Linux。
- 可独立压缩多个文件或整个目录。

```bash
# 压缩文件
zip archive.zip file1 file2 file3

# 压缩整个目录（包括子目录）
zip -r archive.zip mydir/

# 解压缩
unzip archive.zip

# 解压到指定目录
unzip archive -d /path/dir
```

## GZIP（仅压缩，不能打包）

```bash
# 压缩 file.txt 生成 file.txt.gzs  原文件 file.txt 会被删除
gzip file.txt

# 解压 .gz
gizp -d file.txt.gz
# or
gunzip file.txt.gz

# 保持原文件 压缩时不删除源文件
gzip -k file.txt
```

## XZ （更强的压缩）

```bash
# 压缩 生成 file.txt.xz 并删除 file.txt
xz file.txt

# 解压
unxz file.txt.xz
# or
xz -d file.txt.xz

# 保持原文件 压缩时不删除源文件
xz -k file.txt

# 并行压缩 加速 XZ 压缩
xz -T4 bigfile.tar
# -T 使用 4 个 CPU 线程提高压缩速度
```

## TAR（打包但不压缩）

```bash
# 打包
tar -cvf archive.tar file1 file2 directory/
# -c 创建打包文件 Create
# -v 显示过程 Verbose
# -f 指定文件名 File

# 解包
tar -xvf archive.tar
# -x 提取文件 Extract
```

## 打包 + 压缩

### `.tar.gz`

```bash
# 创建 .tar.gz
tar -czvf archive.tar.gz file1 file2 directory/
# -z 使用 gizp 压缩

# 解压 .tar.gz
tar -xzvf archive.tar.gz
```

### `.tar.xz`

```bash
# 创建 .tar.xz

tar -cJvf archive.tar.xz file1 file2 directory/
# -J 使用 xz 压缩

# 解压 .tar.xz
tar -xJvf archive.tar.xz
```
