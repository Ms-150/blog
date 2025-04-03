# Python

[https://www.python.org](https://www.python.org)

## 下载

### 安装 IDE PyCharm

### 命令

```bash
brew install python
python -V / python --version    # 查看版本
```

```bash
touch test.py
echo "print('hello python')" > test.py

python test.py  # 运行文件
```

## pip

### 注释

- 单行注释
- 多行注

```py
# 1. 单行注释

'''
2.1 多行注释
'''

"""
2.2 多行注释
"""
```

:::

### python 保留字

```py
import keyword

print(keyword.kwlist)
>>>
['False', 'None', 'True', '__peg_parser__', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

### 多行语句

通常是一行写完一条语句，但如果语句很长，我们可以使用反斜杠 `\`来实现多行语句

```py
total = 1 + \
        2 + \
        3

print(total)
>>> 6
```

### 输出

```py
print('hello', 'word')  # ,输出空格
>>>
hello word
```

### 输入

```py
name = input('输入名字 ：')  # Python大小写 敏感

print('hello', name)

>>>
输入名字 ：ms
hello ms
```

## 变量 & 数据类型

Python 是 动态类型语言，无需声明变量类型。

### 合法变量名：

- 只能包含 字母、数字、下划线`_`
- 不能以 数字开头
- 区分大小写（name 和 Name 是两个不同的变量）

### 标准数据类型

+ String（字符串）：使用 ' 或 "，支持切片、转义等操作
+ Number（数字）：int（整数）、float（浮点数）、bool（布尔）、complex（复数）
+ List（列表）：有序、可变的元素集合
+ Tuple（元组）：有序、不可变的元素集合
+ Dictionary（字典）：键值对（key-value）结构
+ Set（集合）：无序、不重复元素的集合

```py
name = "Alice"  # 字符串
age = 25        # 整数
height = 1.75   # 浮点数
is_happy = True # 布尔值
numbers = [1, 2, 3]  # 列表 list
person = {"name": "Alice", "age": 25}  # 字典 dict

print(name, age, height, is_happy)  # Alice 25 1.75 True
```

### 检查数据类型

```py
print(type(name))   # <class 'str'>
print(type(age))    # <class 'int'>
print(type(height)) # <class 'float'>
print(type(is_happy)) # <class 'bool'>
```

##### 不可变数据 Number String Tuple

##### 可变数据 List Dictionary Set

#### Number 数字型

- int 长整型 如：1
- float 浮点数 如 1.23、3E-1(3.0 的-1 次方=>0.3)
- bool 布尔 如 True
- complex 复数 如 1 + 2j

#### String 字符串

- ' 和 " 完全相同
- ''' 或 """ 可以指定一个多行字符串
- \ 转义字符
- r 使 \ 不转义 原始字符串
- 运算符\* 可以重复
- 两种索引方式 左到右从 0 开始 右到左-1 开始
- 没有单独的字符类型 一个字符是长度为 1 的字符串
- 变量[头下标:尾下标:步长] 字符串截取

```
str = 'Runoob'
print (str[0:-1])   # 输出第一个到倒数第二的所有字符
print (str[0])      # 输出字符串第一个字符
print (str[2:5])    # 输出从第三个开始到第个的字符
print (str[2:])     # 输出从第三个开始的后所有字符
print (str * 2)     # 输出字符串两次，也可写成 print (2 * str)
print (str + "TEST")    # 连接字符串
>>>
Runoo
R
noo
noob
RunoobRunoob
RunoobTEST

print('Ru\noob')
>>>
Ru
oob

print(r'Ru\noob')
>>>
Ru\noob
```

### List 列表

##### Python 中使用最频繁的数据类型

- ##### 索引值以 0 为开始值，-1 为从末尾的开始位置
- ##### 加号 + 是列表连接运算符，星号 \* 是重复操作
- ##### 元素是可以改变的 和字符串一样，可以被索引和切片

```
list = ['abc', 1, 'def', 2, 'ghi']
tinylist = [3, 'jkl']

print(list)         # 输出完整列表
print(list[0])      # 输出列表第一个元素
print(list[1:3])    # 从第二个开始输出到第三个素
print(list[2:])     # 输出从第三个元素开始的所元素
print(tinylist * 2)    # 输出两次列表
print(list + tinylist) # 连接列表
>>>
['abc', 1, 'def', 2, 'ghi']
abc
[1, 'def']
['def', 2, 'ghi']
[3, 'jkl', 3, 'jkl']
['abc', 1, 'def', 2, 'ghi', 3, 'jkl']
```

### Tuple 元组

##### 元组(tuple)与列表(list)类似

- ##### 不同之处在于元组的元素 不能修改。元组写在小括号 () 里，元素之间用逗号, 隔开
- ##### 元组中的元素类型也可以不相同

```
tuple = ('abcd', 786 , 2.23, 'runoob', 70.2)
tinytuple = (123, 'runoob')
tup2 = (20,)    # 一个元素，需要在元素后添加逗号

print (tuple)             # 输出完整元组
print (tuple[0])          # 输出元组的第一个元素
print (tuple[1:3])        # 输出从第二个元素开始到第三个元素
print (tuple[2:])         # 输出从第三个元素开始的所有元素
print (tinytuple * 2)     # 输出两次元组
print (tuple + tinytuple) # 连接元组
>>>
('abcd', 786, 2.23, 'runoob', 70.2)
abcd
(786, 2.23)
(2.23, 'runoob', 70.2)
(123, 'runoob', 123, 'runoob')
('abcd', 786, 2.23, 'runoob', 70.2, 123, 'runoob')
```

### Set 集合

##### 由一个或数个形态各异的大小整体组成的，构成集合的事物或对象称作元素或是成员。

- ##### 使用 { } 或者 set() 函数创建集合
- ##### 创建 空集合 必须使用 set()

```
sets = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}

if 'Taobao' in sets:
    print('true')
else:
    print('false')

# set可以进行集合运算
a = set('abracadabra')
b = set('alacazam')

print(a)
print(a - b)     # a 和 b 的差集
print(a | b)     # a 和 b 的并集
print(a & b)     # a 和 b 的交集
print(a ^ b)     # a 和 b 中不同时存在的元素
>>>
{'Google', 'Zhihu', 'Runoob', 'Baidu', 'Taobao', 'Facebook'}
true
{'b', 'c', 'd', 'r', 'a'}
{'d', 'b', 'r'}
{'b', 'c', 'm', 'd', 'l', 'r', 'z', 'a'}
{'c', 'a'}
{'d', 'b', 'm', 'l', 'r', 'z'}
```

### 字典 Dictionary

##### 非常有用的内置数据类型 字典是一种映射类型，字典用 { } 标识，它是一个无序的 键(key) : 值(value) 的集合

- ##### 字典一种映射类型，它的元素是键值对
- ##### 字典的关键字必须为不可变类型，且不能重复
- ##### 创建 空字典使用 { } 或 dict()

```
dict = {}
dict['one'] = "1 - 菜鸟教程"
dict[2] = "2 - 菜鸟工具"

tinydict = {'name': 'runoob', 'code': 1, 'site': 'www.runoob.com'}

print(dict['one'])       # 输出键为 'one' 的值
print(dict[2])           # 输出键为 2 的值
print(tinydict)          # 输出完整的字典
print(tinydict.keys())   # 输出所有键
print(tinydict.values()) # 输出所有值
>>>
1 - 菜鸟教程
2 - 菜鸟工具
{'name': 'runoob', 'code': 1, 'site': 'www.runoob.com'}
dict_keys(['name', 'code', 'site'])
dict_values(['runoob', 1, 'www.runoob.com'])
```

### 数据类型转换

```
int(x[, base])      # 将x转换为一个整数
float(x)            # 将x转换为一个浮点数
complex(real[, base])   # 创建一个复数
str(x)          # 将对象x转换为字符串
repr(x)         # 将对象x转换为表达式字符串
eval(x)         # 计算在字符串中的有效python表达式 返回一个对象
tuple(x)        # 将序列x转换为一个元组
list(x)         # 将序列x转换为一个列表
set(x)          # 转换为可变集合
dict(x)         # 创建一个字典x必须是一个 (key, value)元组序列
frozenset(x)    # 转换为不可变集合
chr(x)          # 将整数转换为字符
ord(x)          # 将字符转换为的他的整数值
hex(x)          # 将整数转换为十六进制字符串
oct(x)          # 将整数转换为八进制字符串
```

### 判断数据类型

    type()
    isinstance()

### 数据运算

##### + - \* /

    +   # 加法
    -   # 减法
    *   # 乘法
    /   # 除法，得到一个浮点数
    //  # 除法，得到一个整数
    %   # 取余
    **  # 乘方
