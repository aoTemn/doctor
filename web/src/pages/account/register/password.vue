<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { isEmpty, compact, values } from 'lodash';
import { useAccountStore } from '@/store/account';
import { TextInput } from '@/components';
import { $api } from '@/utils/axios';
import { showToast } from 'vant';
const router = useRouter();
const route = useRoute();

const store = useAccountStore();

const registerForm = computed(() => store.registerForm);

const form = reactive({
  password: '',
  passwordConfirm: '',
});

const disabled = computed(() => {
  console.log(form.passwordConfirm, form.password, 'form');
  return !form.password || !form.passwordConfirm || form.password !== form.passwordConfirm;
});

onMounted(() => {
  const isRefresh = isEmpty(compact(values(registerForm.value)));
  console.log(isRefresh, registerForm, values(registerForm), 'registerForm');
  if (isRefresh) {
    router.replace('/account/register');
  }
});

const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};

const register = async () => {
  console.log(store.registerForm);
  const param = {
    step: 'confim-password',
    name: store.registerForm.name,
    country_code: store.registerForm.areaCode,
    phone_no: store.registerForm.phone,
    password: form.password,
    confirm_password: form.passwordConfirm,
  };
  let result = await $api['account/register'](param);
  if (result.message) {
    store.resetRegisterForm();
    router.push({ name: 'account-login' });
  }
};
</script>
<template>
  <div class="wrap">
    <GoBack />
    <div class="con-wrap">
      <h3>{{ $t('account.registetTitle3') }}</h3>
      <div class="input-list">
        <a-form :model="form" layout="vertical">
          <div class="input-item">
            <TextInput :form="form" :label="$t('common.password')" formKey="password" @change="changeForm"></TextInput>
          </div>
          <div class="input-item">
            <TextInput :form="form" :label="$t('account.againPassword')" formKey="passwordConfirm" @change="changeForm">
            </TextInput>
          </div>
        </a-form>
      </div>

      <van-button :disabled="disabled" @click="register" class="btn">{{ $t('common.goRegistering') }}</van-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  padding: 0 16px;

  .con-wrap {
    margin-top: 76px;

    .input-list {
      margin-top: 25px;

      .input-item {
        margin-bottom: 20px;
      }
    }

    .btn {
      margin-top: 50px;
    }
  }
}
</style>
