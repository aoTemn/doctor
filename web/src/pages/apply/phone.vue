<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { CodeInput } from '@/components';
import { useAccountStore } from '@/store/account';
const router = useRouter();
const store = useAccountStore();
const registerForm = computed(() => store.registerForm);
const phoneNumber = computed(() => registerForm.value.phone);

let form = reactive({
  code: '',
});
const goPage = () => {
  router.push({ name: 'apply-password' });
};
const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};
</script>
<template>
  <div class="wrap">
    <GoBack />
    <div class="wrap-content">
      <h3>電話認證</h3>
      <p class="tip">
        已發出一個短訊到你的電話號碼 (<span>****{{ phoneNumber.substring(phoneNumber.length - 4) }}</span
        >)，請輸入6位數字認證號碼
      </p>
      <!-- <van-button @click="goPage" class="btn">发送验证码</van-button> -->
      <CodeInput :form="form" formKey="code" @change="changeForm"></CodeInput>
      <van-button @click="goPage" class="btn">下一步</van-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .wrap-content {
    margin-top: 76px;
    .tip {
      color: var(--font-color-p1);
      font-size: 14px;
      margin: 20px 0 13px;
    }
    .btn {
      margin-top: 69px;
    }
  }
}
</style>
