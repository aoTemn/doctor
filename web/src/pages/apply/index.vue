<script setup>
import { ref, onMounted, computed, reactive, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import { useApplyStore } from '@/store/apply';
import { useAccountStore } from '@/store/account';
import { TextInput } from '@/components';
import { useI18n } from 'vue-i18n';
import { $api } from '@/utils/axios';
import { showFailToast } from 'vant';
const { t } = useI18n();
const router = useRouter();
const store = useApplyStore();
const accountStore = useAccountStore();
const props = defineProps({});
const formRef = ref();
const form = reactive({
  inviteCode: '',
});

const guestForm = computed(() => store.guestForm);
onMounted(() => {});
let list = computed(() => [
  { tiitle: t('apply.startList[0]') },
  { tiitle: t('apply.startList[1]') },
  { tiitle: t('apply.startList[2]') },
  { tiitle: t('apply.startList[3]') },
  { tiitle: t('apply.startList[4]') },
  { tiitle: t('apply.startList[5]') },
]);
onActivated(() => {
  console.log(store.applyForm, 'applyForm');
  if (!store.applyForm.inviteCode) {
    resetForm();
  }
});

const resetForm = () => {
  form.inviteCode = '';
};

const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};

const next = async () => {
  const values = await formRef.value.validate();
  if (values.errorFields) {
    return;
  }
  let params = {
    referral_id: form.inviteCode,
    step: 'verify-referral',
  };
  try {
    let url = 'apply/update';
    if (guestForm.value.isSuccessVerify && guestForm.value.areaCode && guestForm.value.phone) {
      url = 'apply/updateGuest';
    }
    const res = await $api[url](params);

    console.log('Success:', res);
    store.changeApplyForm(form);
    router.push({ name: 'apply-personal-data' });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      showFailToast(error.response.data.errors);
    }
  }
};
</script>
<script>
export default {
  name: 'apply',
};
</script>

<template>
  <div class="wrap">
    <div class="content-wrap">
      <h3>{{ $t('common.tip') }}</h3>
      <div class="tip">
        <p>{{ $t('apply.startTitle') }}</p>
        <p v-for="(item, index) in list" :key="index">&nbsp;{{ index + 1 }}.&nbsp;{{ item.tiitle }}</p>
      </div>
      <h3 class="apply-bumber">{{ $t('apply.applicationCode') }}</h3>
      <p class="tip">{{ $t('apply.codeContent') }}</p>
      <a-form :model="form" ref="formRef" layout="vertical">
        <TextInput
          type="number"
          :form="form"
          formKey="inviteCode"
          :label="$t('apply.applicationCode')"
          @change="changeForm"
        >
        </TextInput>
      </a-form>
      <van-button @click="next" class="btn">{{ $t('apply.startApply') }}</van-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .content-wrap {
    padding: 75px 16px 0;

    h3 {
      margin-bottom: 20px;
    }

    .apply-bumber {
      margin: 65px 0 7px;
    }

    .tip {
      font-size: 14px;
      color: #656060;
      margin-bottom: 15px;
    }

    .btn {
      margin: 57px 0 30px;
    }
  }
}
</style>
