<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { TextInput } from '@/components';
import { $api } from '@/utils/axios';
import { useAccountStore } from '@/store/account';
import { showSuccessToast } from 'vant';
const router = useRouter();
const store = useAccountStore();
let form = reactive({
  oldPassword: '',
  password: '',
  passwordConfirm: '',
});
let tab = reactive({
  isLoading: false,
});
let formRef = ref(null);
const disabled = computed(() => {
  return !form.oldPassword || !form.password || !form.passwordConfirm || form.password !== form.passwordConfirm;
});
const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};

const save = async () => {
  tab.isLoading = true;
  let res = await $api['account/resetPassword']({
    old_password: form.oldPassword,
    password: form.password,
    confirm_password: form.passwordConfirm,
  });
  tab.isLoading = false;
  if (res.message) {
    showSuccessToast(res.message);
    form.oldPassword = '';
    form.password = '';
    form.passwordConfirm = '';
  }
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <div class="content-wrap">
      <h3>{{ $t('account.editPasswordTitle') }}</h3>
      <a-form :model="form" ref="formRef" layout="vertical">
        <TextInput
          formKey="oldPassword"
          :label="$t('account.oldPassword')"
          :form="form"
          @change="changeForm"
          type="password"
        >
        </TextInput>
        <TextInput
          formKey="password"
          :label="$t('account.newPassword')"
          :form="form"
          @change="changeForm"
          type="password"
        ></TextInput>
        <TextInput
          formKey="passwordConfirm"
          :label="$t('account.againPassword')"
          :form="form"
          @change="changeForm"
          type="password"
        >
        </TextInput>
      </a-form>
      <van-button :loading="tab.isLoading" class="btn" :disabled="disabled" @click="save">{{
        $t('common.save')
      }}</van-button>
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

    .btn {
      margin: 55px 0;
    }
  }
}
</style>
