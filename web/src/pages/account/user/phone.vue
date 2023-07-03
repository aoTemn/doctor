<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { CodeInput, TextInput, PhoneInput } from '@/components';
import { showToast, showFailToast, showSuccessToast } from 'vant';
import { $api } from '@/utils/axios';
import { useAccountStore } from '@/store/account';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = useAccountStore();
const router = useRouter();
const props = defineProps({});
const formRef = ref();
const timeRef = ref();
let form = reactive({
  isShow: false,
  areaCode: '+852',
  phone: '',
  code: '',
  otp: '',
});
let tab = reactive({
  isDisable: false,
  saveBtnLoad: false,
});

const btnText = computed(() => (tab.isDisable ? t('common.alginSave') : t('common.send')));
const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};
const finish = () => {
  tab.isDisable = false;
  timeRef.value.reset();
};
const send = async () => {
  const values = await formRef.value.validate();
  if (values.errorFields) {
    return;
  }

  console.log(form);
  let res = await $api['account/updatePhoneNumber']({
    step: 'send-otp',
    country_code: form.areaCode,
    phone_no: form.phone,
  });
  if (res.message) {
    form.isShow = true;
    tab.isDisable = true;
    timeRef.value.start();

    showSuccessToast(res.message);
    form.otp = res.otp;
  }
};
const save = async () => {
  if (form.code != form.otp) {
    showFailToast('驗證碼錯誤');
    return;
  }
  tab.saveBtnLoad = true;
  let res = await $api['account/updatePhoneNumber']({
    step: 'verify-otp',
    country_code: form.areaCode,
    phone_no: form.phone,
    otp: form.code,
  });
  if (res.message) {
    store.getUserInfo();
    router.back();
  }
  tab.saveBtnLoad = false;
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <div class="content-wrap">
      <h3>{{ $t('common.userPhoneTitle') }}</h3>
      <div class="phone-wrap">
        <a-form :model="form" ref="formRef" layout="vertical">
          <PhoneInput :form="form" :label="$t('common.userPhoneTitle')" @change="changeForm"> </PhoneInput>
        </a-form>
        <van-button :disabled="tab.isDisable" class="btn" @click="send">
          {{ btnText }}
          <div v-if="tab.isDisable" class="time-box">
            (
            <van-count-down :auto-start="true" ref="timeRef" @finish="finish" :time="30 * 1000" format="ss" />
            s)
          </div>
        </van-button>
      </div>

      <div class="code-wrap" v-if="form.isShow">
        <p>{{ $t('account.codePhone') }}</p>
        <p class="input-title">{{ $t('common.certificateNumber') }}</p>
        <CodeInput :form="form" formKey="code" @change="changeForm"></CodeInput>
        <van-button :loading="tab.saveBtnLoad" class="btn" @click="save">{{ $t('common.save') }}</van-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .content-wrap {
    padding: 75px 16px 0;

    h3 {
      margin-bottom: 25px;
    }

    .phone-wrap {
      .btn {
        margin-top: 10px;

        &.van-button--disabled {
          background-color: #bdbdbd;
        }

        :deep(.van-button__text) {
          .flex-row;

          .van-count-down {
            color: white;
          }

          .time-box {
            .flex-row;
          }
        }
      }
    }

    .code-wrap {
      margin-top: 37px;

      .input-title {
        margin-top: 25px;
      }

      .btn {
        margin: 90px 0;
      }
    }
  }
}
</style>
