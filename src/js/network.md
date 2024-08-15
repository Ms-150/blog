# 网络状态

## 获取网路状态

1. `navigator.onLine` 属性

```js
if (navigator.onLine) {
  console.log("在线");
} else {
  console.log("离线");
}
```

2. 监听 online 和 offline 事件

```js
window.addEventListener("online", () => {
  console.log("网络连接已恢复");
});

window.addEventListener("offline", () => {
  console.log("网络连接已断开");
});
```

## 区分强网和弱网环境

`navigator.connection` 对象 返回 一个`NetworkInformation` 对象

### `NetworkInformation`

属性

- downlink // 下载带宽估算值，单位是 Mbps
- effectiveType // 有效连接类型，比如'slow-2g', '2g', '3g', '4g'等。
- rtt // Round-Trip Time 往返延迟时间，单位是毫秒
- saveData // 否启用数据节省模式

方法

- change

```js
if ("connection" in navigator) {
  const connection = navigator.connection;

  // 获取连接信息
  console.log("连接类型:", connection.effectiveType);
  console.log("下载速度:", connection.downlink, "Mbps");
  console.log("延迟:", connection.rtt, "ms");
  console.log("省电模式:", connection.saveData);

  // 根据下载速度判断网络环境
  if (connection.downlink > 5) {
    console.log("强网环境");
  } else {
    console.log("弱网环境");
  }

  // 监听网络状态变化
  connection.addEventListener("change", () => {
    console.log("网络连接信息发生变化");
    console.log("有效类型:", connection.effectiveType);
    console.log("下载速度:", connection.downlink, "Mbps");
    console.log("延迟:", connection.rtt, "ms");
    console.log("省电模式:", connection.saveData);
  });
} else {
  console.log("浏览器不支持网络信息API");
}
```
