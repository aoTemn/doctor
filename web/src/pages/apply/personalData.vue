<script setup>
import { ref, onMounted, computed, reactive, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import Steps from './components/Steps.vue';
import { GoBack, TextInput, PhoneInput, TimeInput, FormSelect } from '@/components';
import { showToast } from 'vant';
import { useApplyStore } from '@/store/apply';
import { useAccountStore } from '@/store/account';
import { useCommonStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { paymentMethodOptions } from '@/utils';

const { t } = useI18n();
const store = useApplyStore();
const accountStore = useAccountStore();
const commonStore = useCommonStore();

const areaOptions = computed(() => commonStore.districOptions);
const typeOptions = computed(() => commonStore.residentTypeOptions);

const props = defineProps({});
const router = useRouter();
const formRef = ref();
const idInputRef = ref(null);
console.log(accountStore.userInfo.phone_no, 'accountStore.userInfo.phone_no,');
console.log(accountStore.userInfo, 'userinfo');
const formInit = {
  name: accountStore.userInfo.name || store.guestForm.name,
  idCard: '',
  areaCode: '+852',
  phone: accountStore.userInfo.phone_no,
  birthday: '',
  area: '',
  address: '',
  type: '',
  addressAreaCode: '+852',
  addressPhone: '',
  liveYear: '',
  companyName: '',
  position: '',
  companyArea: '',
  companyAddress: '',
  companyAreaCode: '+852',
  companyPhone: '',
  workYear: '',
  salary: '',
  paymentMethod: '',
  paymentDay: '',
  isFundOut: -1,
  fundCompanyName: ['', ''],
};
const form = reactive({ ...formInit });

onActivated(() => {
  if (!store.applyForm.name) {
    resetForm();
  }
});

const resetForm = () => {
  console.log(form, formInit);
  Object.assign(form, { ...formInit });
};

const changeForm = form_ => {
  console.log(form_, 'form_');
  Object.assign(form, { ...form_ });
};

const changeCompany = (e, index) => {
  console.log(form, index, 'index');
  form.fundCompanyName[index] = e.target.value;
};
const addFund = () => {
  form.fundCompanyName.push('');
};

const next = async () => {
  console.log(formRef, idInputRef.value.formRef, 'formRef');
  try {
    let res = await formRef.value.validate();
    console.log(res, 'res');
    let validres = await idInputRef.value.formRef.validate();
    console.log(validres, 'validres');
    // if (!form.idCard) {
    //   throw new Error('');
    // }
    store.changeApplyForm(form);
    router.push({ name: 'apply-contact-data' });
  } catch (error) {
    console.log(error, 'error');
    showToast(t('common.infoNot'));
  }
};
</script>
<script>
export default {
  name: 'personalData',
};
</script>
<template>
  <GoBack />
  <div class="wrap">
    <Steps :active="1" />
    <a-form :model="form" ref="formRef" layout="vertical">
      <div>
        <h3 class="personal">{{ $t('apply.userInfo') }}</h3>
        <!-- <a-form :model="form"> -->
        <TextInput disabled :form="form" formKey="name" :label="$t('common.name')" @change="changeForm"></TextInput>
        <IdInput
          ref="idInputRef"
          :form="form"
          formKey="idCard"
          :label="$t('common.idCard')"
          @change="changeForm"
        ></IdInput>
        <PhoneInput disabled :form="form" :label="$t('common.userPhoneTitle')" @change="changeForm"></PhoneInput>
        <TimeInput :form="form" formKey="birthday" :label="$t('common.birthday')" @change="changeForm"></TimeInput>
        <!-- <TextInput :form="form" formKey="birthday" label="出生日期" @change="changeForm"></TextInput> -->
        <FormSelect
          :form="form"
          formKey="area"
          :label="$t('common.area')"
          @change="changeForm"
          :options="areaOptions"
        ></FormSelect>
        <TextInput :form="form" formKey="address" :label="$t('common.address')" @change="changeForm"></TextInput>
        <FormSelect
          :form="form"
          formKey="type"
          :label="$t('common.type')"
          @change="changeForm"
          :options="typeOptions"
        ></FormSelect>
        <PhoneInput :form="form" formKey="address" :label="$t('common.addressPhone')" @change="changeForm"></PhoneInput>
        <TextInput
          :form="form"
          type="number"
          formKey="liveYear"
          :label="$t('common.liveYear')"
          @change="changeForm"
        ></TextInput>
        <!-- </a-form> -->
      </div>
      <div>
        <h3 class="work-data">{{ $t('apply.wordData') }}</h3>
        <!-- <a-form :model="form"> -->
        <TextInput :form="form" formKey="companyName" :label="$t('apply.companyName')" @change="changeForm"></TextInput>
        <TextInput :form="form" formKey="position" :label="$t('apply.position')" @change="changeForm"></TextInput>
        <FormSelect
          :form="form"
          formKey="companyArea"
          :label="$t('common.area')"
          @change="changeForm"
          :options="areaOptions"
        >
        </FormSelect>
        <TextInput :form="form" formKey="companyAddress" :label="$t('common.address')" @change="changeForm"></TextInput>
        <PhoneInput :form="form" formKey="company" :label="$t('common.companyPhone')" @change="changeForm"></PhoneInput>
        <TextInput
          :form="form"
          type="number"
          formKey="workYear"
          :label="$t('common.workYear')"
          @change="changeForm"
        ></TextInput>
        <TextInput
          :form="form"
          formKey="salary"
          type="number"
          :label="$t('common.salary')"
          @change="changeForm"
        ></TextInput>

        <FormSelect
          :form="form"
          formKey="paymentMethod"
          :label="$t('common.paymentMethod')"
          @change="changeForm"
          :options="paymentMethodOptions"
        ></FormSelect>
        <TextInput
          :form="form"
          formKey="paymentDay"
          type="number"
          :label="$t('apply.paymentDay')"
          @change="changeForm"
        ></TextInput>
        <!-- </a-form> -->
      </div>
      <div class="fund-wrap">
        <h3 class="fund-title">{{ $t('apply.MandatoryProvident') }}</h3>
        <p class="input-title">{{ $t('apply.isExtracted') }}</p>
        <div class="btn-box">
          <van-button class="btn" :class="{ active: form.isFundOut === 1 }" @click="form.isFundOut = 1">{{
            $t('common.yes')
          }}</van-button>
          <van-button class="btn" :class="{ active: form.isFundOut === 0 }" @click="form.isFundOut = 0">{{
            $t('common.no')
          }}</van-button>
        </div>
        <p class="input-title">{{ $t('apply.companyPastName') }}</p>
        <div class="fund-list">
          <!-- <a-form :model="form"> -->
          <div class="fund-item" v-for="(company, index) in form.fundCompanyName" :key="index">
            <span>{{ index + 1 }}.</span>

            <input :value="company" class="input" @input="e => changeCompany(e, index)" />
          </div>
          <!-- </a-form> -->
        </div>
        <van-button class="btn" @click="addFund">{{ $t('apply.addCompanyPastName') }}</van-button>
      </div>
    </a-form>

    <van-button @click="next" class="btn">{{ $t('common.nextStep') }}</van-button>
  </div>
</template>
<style scoped lang="less">
.wrap {
  padding: 40px 16px 0;

  .personal {
    margin: 30px 0 25px;
  }

  .input-title {
    margin-top: 20px;
  }

  .work-data {
    margin: 60px 0 5px;
  }

  .tip {
    font-size: 14px;
    color: #656060;
  }

  .fund-wrap {
    .fund-title {
      margin: 60px 0 25px;
    }

    .btn-box {
      .flex-row;
      justify-content: space-between;

      .btn {
        border-radius: 10px;
        flex: 1;
        color: var(--font-color-h1);
        background-color: #ededed;
        border: none;
        margin: 0;
        &:nth-child(2) {
          margin-left: 14px;
        }
        &.active {
          color: #fff;
          background-color: var(--primary-color);
        }
      }
    }

    .fund-list {
      .fund-item {
        margin-bottom: 14px;
        .flex-row;

        background: #ededed;
        border-radius: 10px;
        padding-left: 15px;
        font-size: 14px;

        .input {
          flex: 1;
          margin-left: 5px;
        }

        :deep(.ant-row.ant-form-item.text-input) {
          margin-bottom: 0;
          flex: 1;
        }
      }
    }

    .btn {
      background-color: #bdbdbd;
      margin: 35px 0 66px;
    }
  }

  .btn {
    margin: 66px 0 50px;
  }
}
</style>
