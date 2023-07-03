<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { TextInput } from '@/components';
import { $api } from '@/utils/axios';
import { useAccountStore } from '@/store/account';
import { showSuccessToast, showFailToast } from 'vant';
import { showToast } from 'vant';
const store = useAccountStore();
console.log(store.userInfo);
const router = useRouter();
const props = defineProps({});
const name = store.userInfo.name.split(' ');
let form = reactive({
  firstName: name[0],
  lastName: name.slice(1).join(''),
});
let tab = reactive({
  isLoading: false,
});
let formRef = ref(null);
const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};

const save = async () => {
  try {
    await formRef.value.validateFields();
    tab.isLoading = true;
    const res = await $api['account/updateUser']({ first_name: form.firstName, last_name: form.lastName });
    store.getUserInfo();
    tab.isLoading = false;
    if (res.message) {
      showSuccessToast(res.message);
      router.back();
    }
  } catch (error) {
    formRef.value.resetFields();
    tab.isLoading = false;
    showFailToast('修改失败');
  }
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <div class="content-wrap">
      <h3>{{ $t('account.userNameTitle') }}</h3>
      <a-form ref="formRef" :model="form" layout="vertical">
        <TextInput :label="$t('account.userName[0]')" formKey="firstName" :form="form" @change="changeForm">
        </TextInput>
        <TextInput :label="$t('account.userName[1]')" :form="form" formKey="lastName" @change="changeForm"></TextInput>
      </a-form>
      <van-button :loading="tab.isLoading" class="btn" @click="save">{{ $t('common.save') }}</van-button>
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
      margin-top: 75px;
    }
  }
}
</style>
