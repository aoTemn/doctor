<script setup>
import { ref, onMounted, computed } from 'vue';
import { Form } from 'ant-design-vue';
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
  tip: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['change']);
onMounted(() => {});
const onChange = e => {
  emit('change', { [props.formKey]: e.target.value });
};
</script>
<template>
  <a-form-item
    :label="label"
    class="text-input"
    :name="formKey"
    :rules="[{ required: true, message: $t('common.inputTip3'), trigger: 'blur' }]"
  >
    <a-input :disabled="props.disabled" :type="type" @input="onChange" :value="form[formKey]" class="input" />
    <p class="tip" v-if="props.tip">{{ props.tip }}</p>
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
  .tip {
    margin-top: 5px;
    color: #656060;
  }
}
</style>
