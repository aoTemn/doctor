<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { PhoneInput, TextInput } from '@/components';
import { reactive } from 'vue';
import { $api } from '@/utils/axios';
import { useAccountStore } from '@/store/account';
import { showFailToast } from 'vant';
// import TabBar from '@/components/TabBar.vue';
const router = useRouter();
const store = useAccountStore();
onMounted(() => {});

const form = reactive({
  name: '',
  phone: '',
  areaCode: '+852',
});
const tab = reactive({
  isLoading: false,
});
const disabled = computed(() => {
  return !form.name || !form.phone || !form.areaCode;
});
const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};

const goLogin = () => {
  router.push({ name: 'account-login' });
};

//按钮
const next = async () => {
  console.log(form);
  tab.isLoading = true;
  try {
    let result = await $api['account/register']({
      step: 'send-otp',
      name: form.name,
      country_code: form.areaCode,
      phone_no: form.phone,
    });

    if (result.message) {
      store.changeRegisterForm({ ...form });
      router.push({ path: '/account/register/code' });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      showFailToast(error.response.data.message);
    }
  }

  tab.isLoading = false;
};
</script>
<template>
  <div class="wrap">
    <h3 class="">{{ $t('account.register') }}</h3>
    <a-form :model="form" layout="vertical">
      <TextInput :label="$t('common.name')" formKey="name" :form="form" @change="changeForm" />
      <PhoneInput :label="$t('common.userPhoneTitle')" :form="form" @change="changeForm" />
    </a-form>

    <van-button :disabled="disabled" :loading="tab.isLoading" @click="next" class="btn">
      {{ $t('common.nextStep') }}
    </van-button>
    <p class="go-login">
      {{ $t('common.goLogin') }}<span @click="goLogin">{{ $t('common.goLogining') }}</span>
    </p>
  </div>
</template>
<style scoped lang="less">
.wrap {
  padding: 0 16px;

  h3 {
    color: #034078;
    margin: 98px 0 25px;
  }

  .input-title {
    margin-top: 20px;
  }

  .btn {
    margin-top: 50px;
  }
}
</style>
