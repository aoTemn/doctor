<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { CodeInput } from '@/components';
import { useApplyStore } from '@/store/apply';
import { useAccountStore } from '@/store/account';
import { showSuccessToast, showFailToast } from 'vant';
import { $api } from '@/utils/axios';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
const store = useApplyStore();
const accountStore = useAccountStore();
const guestForm = computed(() => store.guestForm || {});
const phoneNumber = computed(() => guestForm.value.phone);

let form = reactive({
  code: '',
});
let tab = reactive({
  isDisable: true,
});
let timeRef = ref(null);
const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};
const next = async () => {
  // if (form.code != guestForm.value.otp) {
  //   showFailToast(t('common.inputTip4'));
  //   return;
  // }
  let result = await $api['apply/updateGuest']({
    step: 'verify-otp',
    guest_country_code: guestForm.value.areaCode,
    guest_phone_no: guestForm.value.phone,
    otp: form.code,
  });
  if (result.message) {
    store.changeGuestForm({ isSuccessVerify: true });
    accountStore.changeUserInfo({ phone_no: guestForm.value.phone });
    router.push({ name: 'apply' });
  }
};
const send = async () => {
  tab.isDisable = true;
  timeRef.value.reset();
  console.log(store.guestForm);
  $api['apply/updateGuest']({
    step: 'send-otp',
    name: store.guestForm.name,
    guest_country_code: store.guestForm.areaCode,
    guest_phone_no: store.guestForm.phone,
  });
};
</script>
<template>
  <div class="wrap">
    <GoBack />
    <div class="wrap-content">
      <h3>{{ $t('apply.applyPhone') }}</h3>
      <p class="tip">
        {{ $t('account.codePhone', [phoneNumber.substring(phoneNumber.length - 4)]) }}
      </p>
      <!-- <van-button @click="goPage" class="btn">发送验证码</van-button> -->
      <CodeInput :form="form" formKey="code" @change="changeForm"></CodeInput>
      <van-button :disabled="tab.isDisable" class="btn" @click="send">
        {{ $t('apply.resend') }}
        <div class="time-box">
          (
          <van-count-down
            :auto-start="true"
            ref="timeRef"
            @finish="tab.isDisable = false"
            :time="30 * 1000"
            format="ss"
          />
          )
        </div>
      </van-button>
      <van-button @click="next" class="btn">{{ $t('common.nextStep') }}</van-button>
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
      :deep(.van-button__text) {
        .flex-row;
      }
      margin-top: 69px;
      .time-box {
        .flex-row;
        .van-count-down {
          color: white;
        }
      }
    }
  }
}
</style>
