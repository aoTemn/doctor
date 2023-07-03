<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { $api } from '@/utils/axios';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { useAccountStore } from '@/store/account';
const props = defineProps({});
const router = useRouter();
const store = useAccountStore();
const form = reactive({
  idCard: '',
});
const tab = reactive({
  isLoading: false,
});
// let IDCard = ref();
const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};
let formRef = ref(null);
const save = async () => {
  tab.isLoading = true;
  let result = await $api['account/updateHkid']({ hkid: form.idCard });
  tab.isLoading = false;
  if (result.message) {
    store.changeUserInfo({ hkid: form.idCard });
    showSuccessToast('修改成功');
    router.back();
  }
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <div class="content-wrap">
      <h3>{{ $t('account.userIdCardTitle') }}</h3>
      <a-form ref="formRef" :model="form" layout="vertical">
        <IdInput :form="form" formKey="idCard" :label="$t('account.userIdCardTitle')" @change="changeForm"></IdInput>
      </a-form>
      <van-button class="btn" :loading="tab.isLoading" style="margin-top: 105px" @click="save">
        {{ $t('common.save') }}
      </van-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .content-wrap {
    padding: 75px 16px 0;
  }
}
</style>
