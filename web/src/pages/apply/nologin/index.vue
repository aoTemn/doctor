<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { TextInput, PhoneInput } from '@/components';
import { useApplyStore } from '@/store/apply';
import { showFailToast } from 'vant';
import { $api } from '@/utils/axios';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = useApplyStore();
const props = defineProps({});
const router = useRouter();

const formRef = ref();

let form = reactive({
  phone: '',
  areaCode: '+852',
  name: '',
});
const tabList = computed(() => [
  {
    tab: '會員申請',
    label: '申請會員能更快申請借錢並使用促銷代碼',
  },
  {
    tab: '一次性申請',
    label: '申請會員能更快申請借錢並使用促銷代碼',
  },
]);

const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};

const next = async () => {
  try {
    await formRef.value.validate();
    let res = await $api['apply/updateGuest']({
      step: 'send-otp',
      name: form.name,
      guest_country_code: form.areaCode,
      guest_phone_no: form.phone,
    });
    console.log(res.message, 'res');
    if (res.message) {
      store.changeGuestForm({ ...form });
      router.push({ path: '/apply/nologin-phone' });
    }
  } catch (error) {
    console.log(error, 'error');
    if (error.response && error.response.data && error.response.data.message) {
      showFailToast(error.response.data.message);
    }
  }
};
</script>
<template>
  <div class="wrap">
    <h3>{{ $t('apply.oneApply') }}</h3>

    <div class="tab-con">
      <!-- <a-form :model="form"> -->
      <div class="tab-con-item tab-1">
        <a-form :model="form" ref="formRef" layout="vertical">
          <TextInput :form="form" formKey="name" :label="$t('common.name')" @change="changeForm"></TextInput>
          <PhoneInput :form="form" :label="$t('common.userPhoneTitle')" @change="changeForm"></PhoneInput>
        </a-form>
        <van-button @click="next" class="btn">{{ $t('common.nextStep') }}</van-button>
        <p class="tip">
          {{ $t('apply.goLoginContent') }}
          <span @click="router.push('/account/login')">{{ $t('common.login') }}</span>
        </p>
      </div>
      <!-- </a-form> -->
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  padding: 103px 16px 0;

  h3 {
    text-align: center;
    margin-bottom: 32px;
  }

  .btn {
    margin-top: 75px;
  }

  .tip {
    margin: 20px 0 35px;
    font-size: 14px;
    text-align: left;
    color: #656060;

    span {
      color: var(--primary-color);
    }
  }
}
</style>
