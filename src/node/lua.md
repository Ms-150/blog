# Lua

Lua 是一种轻量级、高效的脚本语言，常用于嵌入式开发、游戏开发和配置管理。

[www.lua.org](www.lua.org)

## install

```bash
brew install lua

lua -v
>>>
Lua 5.4.7  Copyright (C) 1994-2024 Lua.org, PUC-Rio
```

## start

::: code-group

```lua [hello.lua]
print("Hello, Lua!")
```

```bash
lua hello.lua
```

:::

## Basic Syntax 基本语法

### 变量和数据类型

```lua
-- 全局变量
name = "Lua"      -- 字符串
age = 30          -- 数字
isLearning = true -- 布尔值
null = nil        -- 空

obj = {           -- 对象
    nama = "ms",
    age = 18
}

-- 局部变量
local pi = 3.14


```

### 控制语句

```lua

local m = 0
if m < 5 then
    print("A")
else
    print("B")
end

-- 循环
for i = 1, 10, 1 do
    print(i)
end

local i = 1
while i <= 5 do
    print(i)
    i = i + 1
end

-- 代码块
do
    -- 局部变量
    local name = "do-end"
    print(name)
end

```
