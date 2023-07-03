<script setup>
import { ref, onMounted, computed, reactive, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import Steps from './components/Steps.vue';
import FileItem from './components/FileItem.vue';
import { useApplyStore } from '@/store/apply';
import { showToast, showSuccessToast, showFailToast } from 'vant';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const store = useApplyStore();
const router = useRouter();
const props = defineProps({});
onMounted(() => {});

const loading = ref();
const formRef = ref();
const formInit = {
  upload_hkid: '',
  upload_photo_hkid: '',
  upload_bank_card: '',
  upload_address_proof: '',
  upload_income_proof: '',
  upload_mpf: '',
};
const form = reactive({ ...formInit });
const formList = computed(() => {
  let canCamera = !!(navigator.camera && navigator.camera.getPicture);

  return [
    {
      title: t('apply.upLoadList[0]'),
      require: true,
      key: 'upload_hkid',
      rules: [{ required: true, message: t('common.inputTip5') }],
      showCamera: canCamera ? true : false,
    },
    {
      title: t('apply.upLoadList[1]'),
      require: true,
      needTip: true,
      key: 'upload_photo_hkid',
      rules: [{ required: true, message: t('common.inputTip5') }],
      showSelfie: canCamera ? true : false,
    },
    {
      title: t('apply.upLoadList[2]'),
      require: true,
      key: 'upload_bank_card',
      rules: [{ required: true, message: t('common.inputTip5') }],
      showCamera: canCamera ? true : false,
    },
    {
      title: t('apply.upLoadList[3]'),
      require: true,
      key: 'upload_address_proof',
      rules: [{ required: true, message: t('common.inputTip5') }],
      showCamera: canCamera ? true : false,
    },
    {
      title: t('apply.upLoadList[4]'),
      require: true,
      key: 'upload_income_proof',
      rules: [{ required: true, message: t('common.inputTip5') }],
    },
    { title: t('apply.upLoadList[5]'), require: false, key: 'upload_mpf' },
  ];
});

onActivated(() => {
  if (!store.applyForm.upload_hkid) {
    resetForm();
  }
});

const resetForm = () => {
  Object.assign(form, { ...formInit });
};

const changeForm = form_ => {
  console.log(form_, 'form_');
  Object.assign(form, { ...form_ });
};

const submit = async () => {
  loading.value = true;
  try {
    await formRef.value.validate();
    store.changeApplyForm(form);
    let res = await store.submitApplication();
    if (res.message) {
      showSuccessToast(res.message);
      router.push({ path: '/apply/success', query: { id: res.id, application_id: res.application_id } });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      showFailToast(error.response.data.errors[0]);
    }
    // showFailToast(t('common.noMessage'));
  }

  loading.value = false;
};
</script>
<template>
  <div class="wrap">
    <GoBack />
    <Steps class="steps" :active="3" />
    <h3>{{ $t('apply.upLoadTitle') }}</h3>
    <div class="content-wrap">
      <a-form :model="form" ref="formRef">
        <a-form-item
          v-for="(item, index) in formList"
          :key="index"
          :label="label"
          class="content-item"
          :name="item.key"
          :rules="item.rules"
        >
          <FileItem :form="form" :item="item" @change="changeForm"></FileItem>
        </a-form-item>
      </a-form>
    </div>
    <div class="btn-box">
      <van-button :loading="loading" @click="submit" class="btn">{{ $t('common.submit') }}</van-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .steps {
    margin: 40px auto 30px;
  }
  h3 {
    padding: 0 16px;
  }
  .content-wrap {
    .content-item {
      border-bottom: 1px solid #e2e2e2;
      padding: 26px 20px 26px 20px;
      margin-bottom: 0;
    }
  }
  .btn-box {
    margin: 70px 0 30px;
    padding: 0 16px;
  }
}
</style>
