<script setup>
import CameraPreview from './CameraPreview.vue';
</script>

<CameraPreview />

---

这里是一个示例，通过获取摄像头视频流来实现视频预览和录制。

::: code-group

```html [index.html]
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>摄像头视频预览</title>
    <style>
      video {
        width: 100%;
        height: auto;
        border: 1px solid black;
      }
    </style>
  </head>

  <body>
    <h1>摄像头视频预览</h1>
    <div style="width: 300px;height: 300px">
      <video id="video" autoplay></video>
      <button id="startRecording">开始录制</button>
      <button id="stopRecording" disabled>停止录制</button>
    </div>
    <div style="width: 300px;height: 300px">
      <video id="preview" controls style="display: none;"></video>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

```js [script.js]
const video = document.getElementById("video");
const startRecordingButton = document.getElementById("startRecording");
const stopRecordingButton = document.getElementById("stopRecording");
const preview = document.getElementById("preview");

let mediaRecorder;
let recordedChunks = [];
let localStream; // 用于存储流

// 开始录制
startRecordingButton.addEventListener("click", () => {
  // 获取用户媒体设备
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      localStream = stream; // 保存流
      video.srcObject = stream;

      // 创建 MediaRecorder 实例
      mediaRecorder = new MediaRecorder(stream, { mimeType: "video/mp4" });

      // 处理录制数据
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      // 录制结束
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        preview.src = url;
        preview.style.display = "block";
        recordedChunks = []; // 清空数据

        // 关闭摄像头
        stopCamera();
      };

      // 开始录制
      mediaRecorder.start();
      startRecordingButton.disabled = true;
      stopRecordingButton.disabled = false;
    })
    .catch((err) => {
      console.error("获取摄像头失败:", err);
    });
});

// 停止录制
stopRecordingButton.addEventListener("click", () => {
  mediaRecorder.stop();
  startRecordingButton.disabled = false;
  stopRecordingButton.disabled = true;
});

// 关闭摄像头
function stopCamera() {
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }
}
```

:::

---
