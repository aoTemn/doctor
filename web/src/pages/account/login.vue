<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
// import { Number, Password } from '../../components/input/index';
import { PhoneInput, TextInput } from '@/components';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/store/account';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import { showFailToast } from 'vant';
const { t } = useI18n();
const store = useAccountStore();
const router = useRouter();
const form = reactive({
  loading: false,
  areaCode: '+852',
  phone: '',
  password: '',
});
//电话号码
const changeForm = form_ => {
  console.log(form_, 'changePhone');
  Object.assign(form, { ...form_ });
};

const goRegister = () => router.push({ name: 'account-register' });

const next = async () => {
  if (!form.areaCode) {
    showToast('請選擇區號');
    return;
  }
  if (!form.phone) {
    showToast('請輸入手機號碼');
    return;
  }
  if (!form.password) {
    showToast('請輸入密碼');
    return;
  }
  try {
    form.loading = true;
    let res = await store.login(form);

    if (res.token) {
      showToast('login success');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      showFailToast(error.response.data.message);
    }
  } finally {
    form.loading = false;
  }
  router.push('/account');
};
</script>
<template>
  <div class="wrap">
    <h3>{{ $t('account.loginTitle') }}</h3>
    <a-form :model="form" layout="vertical">
      <PhoneInput :form="form" :label="$t('common.userPhoneTitle')" @change="changeForm"></PhoneInput>

      <TextInput :form="form" formKey="password" :label="$t('common.password')" type="password" @change="changeForm">
      </TextInput>

      <a-form-item>
        <van-button :loading="form.loading" class="btn" @click="next">{{ $t('common.login') }}</van-button>
      </a-form-item>
    </a-form>

    <div class="go-login">
      {{ $t('common.goRegister') }}<span @click="goRegister">{{ $t('common.goRegistering') }}</span>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  padding: 98px 16px 0;

  h3 {
    margin-bottom: 25px;
  }

  .input-title {
    margin-top: 20px;
  }

  .btn {
    margin-top: 70px;
  }
}
</style>
