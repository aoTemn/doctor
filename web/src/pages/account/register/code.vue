<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { CodeInput } from '@/components';
import { useAccountStore } from '@/store/account';
import { isEmpty, compact, values } from 'lodash';
import { $api } from '@/utils/axios';
import { showSuccessToast, showFailToast } from 'vant';

const router = useRouter();
const store = useAccountStore();

const form = reactive({
  code: '',
});

const registerForm = computed(() => store.registerForm);
const phoneNumber = computed(() => registerForm.value.phone);

const disabled = computed(() => {
  return form.code.length !== 6;
});

onMounted(() => {
  const isRefresh = isEmpty(compact(values(registerForm.value)));
  console.log(isRefresh, registerForm, values(registerForm), 'registerForm');
  if (isRefresh) {
    router.replace('/account/register');
  }
});
const changeForm = form_ => {
  console.log(form_, 'form_');
  Object.assign(form, { ...form_ });
};
const next = async () => {
  console.log(store.registerForm);

  let result = await $api['account/register']({
    step: 'verify-otp',
    country_code: store.registerForm.areaCode,
    phone_no: store.registerForm.phone,
    otp: form.code,
  });
  if (result.message) {
    router.push({ name: 'account-register-password' });
  }
};
</script>
<template>
  <div class="wrap">
    <GoBack />
    <div class="wrap-content">
      <h3>{{ $t('account.registerTitle2') }}</h3>
      <p class="tip">
        {{ $t('common.goCodeContent') }}
        (<span>****{{ phoneNumber.substring(phoneNumber.length - 4) }}</span
        >) {{ $t('common.goCodeContent2') }}
      </p>
      <CodeInput :form="form" formKey="code" @change="changeForm"></CodeInput>
      <van-button :disabled="disabled" @click="next" class="btn">{{ $t('common.nextStep') }}</van-button>
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
      margin-top: 50px;
    }
  }
}
</style>
