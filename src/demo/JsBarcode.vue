<template>
  <div class="barcode-generator">
    <div class="input-container">
      <input
        v-model="barcodeText"
        placeholder="请输入条形码内容"
        @keydown.enter="generateBarcode"
        @blur="generateBarcode"
        class="input-field"
      />
      <button class="generate-button" @click="generateBarcode">
        生成条形码
      </button>
    </div>
    <canvas class="code" ref="barcodeContainer"></canvas>
  </div>
</template>

<script setup>
import { ref } from "vue";
import JsBarcode from "jsbarcode";

const barcodeText = ref("");
const barcodeContainer = ref(null);

const generateBarcode = () => {
  if (barcodeText.value) {
    JsBarcode(barcodeContainer.value, barcodeText.value, {
      format: "CODE128",
      displayValue: true,
      fontSize: 18,
      margin: 20,
    });
  }
};
</script>

<style scoped>
.barcode-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: var(--vp-code-tab-bg);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
}

.input-field {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.generate-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.generate-button:hover {
  background-color: #0056b3;
}

.code {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
