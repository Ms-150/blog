---
title: JSON 格式化工具
---

<script setup>
import { ref } from 'vue'

const inputJson = ref('')
const formattedJson = ref('')
const errorMessage = ref('')

function formatJson() {
  errorMessage.value = ''
  if (!inputJson.value.trim()) {
    formattedJson.value = ''
    return
  }
  try {
    const parsedJson = JSON.parse(inputJson.value)
    formattedJson.value = JSON.stringify(parsedJson, null, 2)
  } catch (error) {
    errorMessage.value = error.message || '无效的 JSON 格式'
    formattedJson.value = ''
  }
}

function clearInput() {
  inputJson.value = ''
  formattedJson.value = ''
  errorMessage.value = ''
}

async function copyFormatted() {
  if (!formattedJson.value) return
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    alert('复制成功')
  } catch (err) {
    alert('复制失败')
  }
}
</script>

## JSON 格式化工具

将 JSON 代码粘贴到左侧编辑器中，点击格式化按钮，格式化后的 JSON 将显示在右侧。

<div class="json-formatter-container">
  <div class="formatter-wrapper">
    <div class="editor-container">
      <div class="editor-header">
        <span>原始 JSON</span>
        <button @click="clearInput">清空</button>
      </div>
      <textarea
        v-model="inputJson"
        rows="10"
        placeholder="请在此处粘贴需要格式化的 JSON 代码"
        class="json-textarea"
      ></textarea>
    </div>
    <div class="actions-container">
      <button @click="formatJson" :disabled="!inputJson.trim()">格式化 →</button>
    </div>
    <div class="editor-container">
      <div class="editor-header">
        <span>格式化后的 JSON</span>
        <button @click="copyFormatted" :disabled="!formattedJson">复制
        </button>
      </div>
      <pre class="json-textarea formatted">
      <code class="language-json">
      {{ formattedJson }}
      </code>
      </pre>
    </div>
  </div>

  <div v-if="errorMessage" class="error-message">
    <p>格式化错误: {{ errorMessage }}</p>
  </div>
</div>

<style scoped>
.json-formatter-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.formatter-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.editor-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.json-textarea {
  width: 100%;
  font-family: 'Courier New', Courier, monospace;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.json-textarea.formatted {
  background-color: #f9f9f9;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.actions-container {
  text-align: center;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>
