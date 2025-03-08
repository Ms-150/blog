#

::: code-group

```js [1. then]
fetch(
  "http://console.hlt100.com/uac/auth/printWaybill?waybillCodes=null&orderCodes=DD23021503062264,DD23021502571723",
  {
    method: "get",
    headers: {
      "Content-Type": "application/pdf;charset=utf-8",
    },
    // body: JSON.stringify({
    //     billType: 123123,
    //     segmentCode: 123132,
    //     deliveryDistribution: 1231231
    // })
  }
)
  .then((response) => response.blob())
  .then((blob) => {
    const url = URL.createObjectURL(blob); // 创建指向 blob 的 URL
    console.log(url, "url");
    this.openPdfInNewTab(url); // 调用打开新页面的方法
  })
  .catch((error) => {
    console.error("发生错误:", error);
  });
```

```js [2. async await]
try {
  const response = await fetch(
    "http://console.hlt100.com/uac/auth/printWaybill?waybillCodes=null&orderCodes=DD23021503062264,DD23021502571723",
    {
      method: "get",
      headers: {
        "Content-Type": "application/pdf;charset=utf-8",
      },
    }
  );

  const blob = await response.blob(); // 等待响应并转换为 Blob

  const url = URL.createObjectURL(blob); // 创建指向 blob 的 URL

  
  this.openPdfInNewTab(url); // 调用打开新页面的方法
} catch (error) {
  console.error("发生错误:", error);
}
```

::::
