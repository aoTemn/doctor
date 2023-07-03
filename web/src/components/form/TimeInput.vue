<script setup>
import { ref, onMounted, computed } from 'vue';
import { Form } from 'ant-design-vue';
import dayjs from 'dayjs';
const formItemContext = Form.useInjectFormItemContext();
const props = defineProps({
  form: {
    required: true,
  },
  label: String,
  formKey: String,
  type: {
    default: 'text',
    type: String,
  },
});
const emit = defineEmits(['change']);
onMounted(() => {});
const onChange = (e, str) => {
  console.log(e, str, 'eee');
  emit('change', { [props.formKey]: str });
};
const disabledDate = current => {
  // Can not select days before today and today
  return current && current > dayjs().subtract(18, 'year');
};
const defaultPickerValue = dayjs().subtract(18, 'year');
</script>
<template>
  <a-form-item
    :label="label"
    class="text-input"
    :name="formKey"
    :rules="[{ required: true, message: $t('common.inputTip3'), trigger: 'blur' }]"
  >
    <a-date-picker
      :defaultPickerValue="defaultPickerValue"
      :disabled-date="disabledDate"
      valueFormat="YYYY-MM-DD"
      @change="onChange"
      :value="form[formKey]"
    />
  </a-form-item>
</template>
<style scoped lang="less">
.ant-form-item {
  margin-bottom: 20px;

  :deep(.ant-form-item-label) {
    font-size: 14px;
    color: var(--font-color-h1);
    font-weight: 600;
  }

  :deep(.ant-form-item-control) {
    .ant-picker {
      border: none;
      width: 100%;
      background-color: #ededed;
      border-radius: 10px;
      height: 48px;
      border: none;
      outline: none;
      padding: 0 20px;

      .ant-picker-input {
        input {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
