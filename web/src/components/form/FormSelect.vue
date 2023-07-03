<script setup>
import { ref, onMounted, computed } from 'vue';
const props = defineProps({
  form: {
    required: true,
  },
  label: String,
  formKey: String,
  options: Array,
});
const emit = defineEmits(['change']);

onMounted(() => {});

const onChange = v => {
  console.log(v, 'vvv');
  emit('change', { [props.formKey]: v });
};
</script>
<template>
  <a-form-item
    class="form-select"
    :name="formKey"
    :label="label"
    :rules="[{ required: true, message: $t('common.inputTip1'), trigger: 'blur' }]"
  >
    <a-select :options="options" @change="onChange" :value="form[formKey]"> </a-select>
  </a-form-item>
</template>
<style scoped lang="less">
.form-select {
  margin-bottom: 20px;

  :deep(.ant-form-item-label) {
    font-size: 14px;
    color: var(--font-color-h1);
    font-weight: 600;
  }
  :deep(.ant-form-item-control) {
    .ant-select-selector {
      border: none;
      width: 100%;
      background-color: #ededed;
      border-radius: 10px;
      height: 48px;
      border: none;
      outline: none;
      padding: 0 20px;
      font-size: 16px;
      display: block;
      box-sizing: border-box;
      .ant-select-selection-item {
        line-height: 48px;
      }
    }
  }
}
</style>

<style>
.ant-form-item-has-error .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input) .ant-select-selector {
  background-color: #ededed;
  border: 1px solid;
}
</style>
