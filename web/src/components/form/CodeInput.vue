<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  form: {
    required: true,
  },
  formKey: String,
});
const emit = defineEmits(['change']);
let inputValue = ref(props.form[props.formKey]);
let showKeyboard = ref(false);
onMounted(() => {});

watch(inputValue, newV => {
  console.log(newV, 'newV');
  onChange(newV);
});

const onChange = v => {
  emit('change', { [props.formKey]: v });
};
</script>
<template>
  <van-password-input
    length="6"
    :mask="false"
    :value="inputValue"
    :gutter="15"
    :focused="showKeyboard"
    @focus="showKeyboard = true"
  />
  <van-number-keyboard v-model="inputValue" :show="showKeyboard" @blur="showKeyboard = false" />
</template>
<style scoped lang="less">
:deep(.van-password-input__item) {
  background-color: #ededed;
  border-radius: 10px;
  overflow: hidden;
}
</style>
<style lang="less">
.van-password-input {
  margin: 0 !important;
}
</style>
