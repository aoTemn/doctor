<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { Form } from 'ant-design-vue';
const formItemContext = Form.useInjectFormItemContext();
const props = defineProps(['label']);
const emit = defineEmits(['change']);
const inputRef1 = ref();
const inputRef2 = ref();
const inputRef3 = ref();
const formRef = ref();
const form = reactive({
  inputValue1: '',
  inputValue2: '',
  inputValue3: '',
});

onMounted(() => {});

watch(
  form,
  newV => {
    const { inputValue1, inputValue2, inputValue3 } = newV;
    console.log(inputValue1, inputValue2, inputValue3, 'inputValue1');
    if (inputValue1.length === 1 && inputValue2.length === 6 && inputValue3.length === 1) {
      const str = inputValue1 + inputValue2 + inputValue3;
      console.log('change');
      emit('change', { idCard: str });
    }
  },
  { deep: true }
);
defineExpose({ formRef });

const changeFirst = e => {
  const str = e.target.value;
  if (str.length === 1) {
    inputRef2.value.focus();
  }
};
const changeSecond = e => {
  const str = e.target.value;
  if (str.length === 6) {
    inputRef3.value.focus();
  }
};
const changeThird = e => {};
</script>
<template>
  <a-form ref="formRef" :model="form" class="form-id-card">
    <a-form-item :label="props.label">
      <div class="show-wrap">
        <a-form-item
          name="inputValue1"
          class="form-item-input"
          :rules="[{ pattern: '[a-zA-Z]', required: true, message: $t('common.idInputTip[0]'), trigger: 'blur' }]"
        >
          <a-input :maxlength="1" ref="inputRef1" @input="changeFirst" v-model:value="form.inputValue1" class="input" />
        </a-form-item>
        <div class="line">-</div>
        <a-form-item
          name="inputValue2"
          class="form-item-input"
          :rules="[
            // { required: true, message: '6個數字', trigger: 'blur' },
            { pattern: '^\\d+$', required: true, len: 6, message: $t('common.idInputTip[1]'), trigger: 'blur' },
          ]"
        >
          <a-input
            type="number"
            ref="inputRef2"
            @input="changeSecond"
            v-model:value="form.inputValue2"
            class="input input-2"
          />
        </a-form-item>
        <div class="circle">(</div>
        <a-form-item
          name="inputValue3"
          class="form-item-input last-input"
          :rules="[{ pattern: '[a-zA-Z\\d]', required: true, message: $t('common.idInputTip[2]'), trigger: 'blur' }]"
        >
          <a-input :maxlength="1" ref="inputRef3" @input="changeThird" v-model:value="form.inputValue3" class="input" />
        </a-form-item>
        <div class="circle">)</div>
      </div>
    </a-form-item>
  </a-form>
</template>
<style scoped lang="less">
.form-id-card {
  margin-bottom: 20px;

  :deep(.ant-col) {
    min-height: auto;
  }

  .show-wrap {
    .flex-row;
    align-items: flex-start;

    .form-item-input {
      margin-bottom: 0;
    }

    .form-item-input:nth-child(3) {
      flex: 1;
    }

    .input {
      height: 48px;
      background: #ededed;
      border-radius: 10px;
      width: 48px;
      padding: 0 10px;
      text-align: center;

      &.input-2 {
        width: 100%;
        text-align: left;
      }
    }

    .line {
      font-weight: 600;
      font-size: 36px;
      line-height: 48px;
      color: #000000;
    }

    .circle {
      font-weight: 600;
      font-size: 36px;
      line-height: 48px;
      color: #000000;
      // margin: 0 5px;
    }
  }

  .input-hidden {
    visibility: hidden;
  }

  :deep(.ant-form-item-label) {
    font-size: 14px;
    color: var(--font-color-h1);
    font-weight: 600;
  }
  :deep(.ant-form-item-explain.ant-form-item-explain-connected) {
    position: relative;
    // width: fit-content;
    bottom: 0;
    right: 0;
    div {
      position: absolute;
      width: fit-content;
      white-space: nowrap;
    }
  }
  .last-input {
    :deep(.ant-form-item-explain.ant-form-item-explain-connected) {
      div {
        position: absolute;
        right: -50%;
        width: fit-content;
        white-space: nowrap;
      }
    }
  }
}
</style>
<style lang="less"></style>
