<script setup>
import { ref, onMounted, computed, reactive, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import Steps from './components/Steps.vue';
import { GoBack, TextInput, PhoneInput, FormSelect } from '@/components';
import { relationOptions, areaOptions } from '@/utils';
import { useApplyStore } from '@/store/apply';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import { cloneDeep } from 'lodash';
const { t } = useI18n();
const store = useApplyStore();
const router = useRouter();
const props = defineProps({});
onMounted(() => {});

const contactItem = {
  name: '',
  relation: '',
  age: '',
  areaCode: '+852',
  phone: '',
  companyArea: '',
  companyAddress: '',
  companyAreaCode: '+852',
  companyPhone: '',
};
const unContactItem = {
  name: '',
  relation: '',
  age: '',
  area: '',
  address: '',
  areaCode: '+852',
  phone: '',
  companyArea: '',
  companyAddress: '',
  companyAreaCode: '+852',
  companyPhone: '',
};

const financeItem = {
  bank: '',
  amount: '',
  perAmount: '',
  totalNumber: '',
  notNumber: '',
};
const formRef = ref();

const formInit = {
  contact: [{ ...contactItem }],
  unContact: [{ ...unContactItem }],
  finance: [{ ...financeItem }],
  isFinanceUsed: -1,
  bankruptcy: -1,
};

const formInit_ = cloneDeep(formInit);
const form = reactive(formInit_);

onActivated(() => {
  console.log(store.applyForm.contact.length);
  if (!store.applyForm.contact.length) {
    resetForm();
  }
});

const resetForm = () => {
  console.log(formInit, 'formInit');
  const formInit_ = cloneDeep(formInit);
  Object.assign(form, { ...formInit_ });
};
const changeContact = (form_, index) => {
  console.log(form_, 'changePhone');
  form.contact[index] = { ...form.contact[index], ...form_ };
};
const changeUnContact = (form_, index) => {
  console.log(form_, 'changePhone1');
  form.unContact[index] = { ...form.unContact[index], ...form_ };
  console.log(form, 'form');
};
const changeFinance = (form_, index) => {
  console.log(form_, 'changePhone');
  form.finance[index] = { ...form.finance[index], ...form_ };
  console.log(form, 'form');
};
const addContact = () => {
  form.contact.push({ ...contactItem });
};
const deleteContact = index => {
  form.contact.splice(index, 1);
};
const addUnContact = () => {
  form.unContact.push({ ...unContactItem });
};
const deleteUnContact = index => {
  form.unContact.splice(index, 1);
};
const addFinance = () => {
  form.finance.push({ ...financeItem });
};
const deleteFinance = index => {
  form.finance.splice(index, 1);
};
const next = async () => {
  console.log(formRef, 'contactFormRef');
  try {
    for (let val of formRef.value) {
      await val.validate();
    }
    store.changeApplyForm(form);
    router.push({ name: 'apply-file-data' });
  } catch (error) {
    showToast(t('common.noMessage'));
  }

  // const contactValues = await contactFormRef.value.validate();
  // const unContactValues = await unContactFormRef.value.validate();
  // const financeValues = await financeFormRef.value.validate();
};
</script>
<script>
export default {
  name: 'contactData',
};
</script>
<template>
  <div class="wrap">
    <GoBack />
    <Steps class="steps" :active="2" />
    <p class="tip">{{ $t('apply.Livingperson') }}</p>
    <div class="cohabitant">
      <h3>{{ $t('apply.peopleMaterial') }}</h3>
      <div class="cohabitant-item" v-for="(item, index) in form.contact" :key="index">
        <a-form :model="form.contact[index]" ref="formRef" layout="vertical">
          <h5>
            {{ $t('apply.livingPerson') }}{{ index + 1
            }}<van-icon class="icon" v-if="index > 0" name="cross" @click="deleteContact(index)" />
          </h5>
          <TextInput
            :form="item"
            formKey="name"
            :label="$t('common.name')"
            @change="form_ => changeContact(form_, index)"
          ></TextInput>
          <FormSelect
            :form="item"
            formKey="relation"
            :label="$t('common.relation')"
            @change="form_ => changeContact(form_, index)"
            :options="relationOptions"
          ></FormSelect>
          <TextInput
            :form="item"
            type="number"
            formKey="age"
            :label="$t('common.age')"
            @change="form_ => changeContact(form_, index)"
          ></TextInput>
          <PhoneInput
            :form="item"
            :label="$t('common.userPhoneTitle')"
            @change="form_ => changeContact(form_, index)"
          ></PhoneInput>
          <FormSelect
            :form="item"
            formKey="companyArea"
            :label="$t('common.district')"
            @change="form_ => changeContact(form_, index)"
            :options="areaOptions"
          ></FormSelect>
          <TextInput
            :form="item"
            :tip="$t('common.workAddressTip')"
            formKey="companyAddress"
            :label="$t('common.workAddress')"
            @change="form_ => changeContact(form_, index)"
          ></TextInput>
          <PhoneInput
            :form="item"
            formKey="company"
            :label="$t('common.companyPhone')"
            @change="form_ => changeContact(form_, index)"
          ></PhoneInput>
        </a-form>
      </div>
      <van-button class="btn" @click="addContact">{{ $t('apply.addLivingPerson') }}</van-button>
    </div>
    <div class="not-cohabitant">
      <h3>{{ $t('apply.noPeopleMaterial') }}</h3>
      <div class="cohabitant-item" v-for="(item, index) in form.unContact" :key="index">
        <a-form :model="form.unContact[index]" ref="formRef" layout="vertical">
          <h5>
            {{ $t('apply.noLivingPerson') }}{{ index + 1
            }}<van-icon class="icon" v-if="index > 0" name="cross" @click="deleteUnContact(index)" />
          </h5>
          <TextInput
            :form="item"
            formKey="name"
            :label="$t('common.name')"
            @change="form_ => changeUnContact(form_, index)"
          ></TextInput>
          <FormSelect
            :form="item"
            formKey="relation"
            :label="$t('common.relation')"
            @change="form_ => changeUnContact(form_, index)"
            :options="relationOptions"
          ></FormSelect>
          <TextInput
            :form="item"
            type="number"
            formKey="age"
            :label="$t('common.age')"
            @change="form_ => changeUnContact(form_, index)"
          ></TextInput>
          <FormSelect
            :form="item"
            formKey="area"
            :label="$t('common.area')"
            @change="form_ => changeUnContact(form_, index)"
            :options="areaOptions"
          ></FormSelect>
          <TextInput
            :form="item"
            :tip="$t('common.workAddressTip')"
            formKey="address"
            :label="$t('common.address')"
            @change="form_ => changeUnContact(form_, index)"
          ></TextInput>
          <PhoneInput
            :form="item"
            :label="$t('common.userPhoneTitle')"
            @change="form_ => changeUnContact(form_, index)"
          ></PhoneInput>
          <FormSelect
            :form="item"
            formKey="companyArea"
            :label="$t('common.district')"
            @change="form_ => changeUnContact(form_, index)"
            :options="areaOptions"
          ></FormSelect>
          <TextInput
            :form="item"
            :tip="$t('common.workAddressTip')"
            formKey="companyAddress"
            :label="$t('common.workAddress')"
            @change="form_ => changeUnContact(form_, index)"
          ></TextInput>
          <PhoneInput
            :form="item"
            formKey="company"
            :label="$t('common.companyPhone')"
            @change="form_ => changeUnContact(form_, index)"
          ></PhoneInput>
        </a-form>
      </div>
      <van-button class="btn" @click="addUnContact">{{ $t('apply.addNotLivingPerson') }}</van-button>
    </div>
    <div class="finance">
      <h3>{{ $t('apply.financialPosition') }}</h3>
      <p class="input-title">{{ $t('apply.bankruptcy') }}</p>
      <div class="btn-box">
        <van-button class="btn" :class="{ active: form.bankruptcy === 1 }" @click="form.bankruptcy = 1">{{
          $t('common.yes')
        }}</van-button>
        <van-button class="btn" :class="{ active: form.bankruptcy === 0 }" @click="form.bankruptcy = 0">{{
          $t('common.no')
        }}</van-button>
      </div>
    </div>
    <div class="financial-records">
      <h3>{{ $t('apply.FinancialRecords') }}</h3>
      <p class="input-title">{{ $t('apply.Previous') }}</p>
      <div class="btn-box">
        <van-button class="btn" :class="{ active: form.isFinanceUsed === 1 }" @click="form.isFinanceUsed = 1">
          {{ $t('common.yes') }}
        </van-button>
        <van-button class="btn" :class="{ active: form.isFinanceUsed === 0 }" @click="form.isFinanceUsed = 0">
          {{ $t('common.no') }}
        </van-button>
      </div>
      <p class="tip-item">{{ $t('apply.ifHave') }}</p>
      <div v-if="form.isFinanceUsed !== 0">
        <div class="cohabitant-item" v-for="(item, index) in form.finance" :key="index">
          <a-form :model="form.finance[index]" ref="formRef" layout="vertical">
            <h5>
              {{ $t('apply.FinancialRecords') }}{{ index + 1
              }}<van-icon class="icon" v-if="index > 0" name="cross" @click="deleteFinance(index)" />
            </h5>

            <div class="finance-item">
              <TextInput
                :form="item"
                formKey="bank"
                :label="$t('apply.financialList[0]')"
                @change="form_ => changeFinance(form_, index)"
              ></TextInput>
              <TextInput
                :form="item"
                type="number"
                formKey="amount"
                :label="$t('apply.financialList[1]')"
                @change="form_ => changeFinance(form_, index)"
              ></TextInput>
              <TextInput
                :form="item"
                type="number"
                formKey="perAmount"
                :label="$t('apply.financialList[2]')"
                @change="form_ => changeFinance(form_, index)"
              ></TextInput>
              <TextInput
                :form="item"
                type="number"
                formKey="totalNumber"
                :label="$t('apply.financialList[3]')"
                @change="form_ => changeFinance(form_, index)"
              ></TextInput>
              <TextInput
                :form="item"
                type="number"
                formKey="notNumber"
                :label="$t('apply.financialList[4]')"
                @change="form_ => changeFinance(form_, index)"
              ></TextInput>
            </div>
          </a-form>
        </div>
        <van-button class="btn" @click="addFinance">{{ $t('apply.addFinancialRecords') }}</van-button>
      </div>
    </div>
    <div class="last-btn-box">
      <van-button @click="next" class="btn">{{ $t('common.nextStep') }}</van-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .steps {
    margin-top: 40px;
    margin-top: 30px;
  }
  .tip {
    color: #656060;
    font-size: 14px;
    padding: 16px;
    margin: 20px 0 30px;
  }
  .tip-item {
    margin-top: 10px;
    color: #656060;
    font-size: 14px;
  }
  .cohabitant,
  .not-cohabitant,
  .finance,
  .financial-records {
    padding: 0 16px;
    .cohabitant-item {
      margin-bottom: 30px;
      h5 {
        .flex-row;
        justify-content: start;
        margin: 20px 0 25px;
        font-weight: 700;
        color: var(--primary-color);
      }

      .icon {
        margin-left: 15px;
      }
      .input-title {
        margin-top: 20px;
      }
    }
    .btn {
      margin-top: 17px;
      background-color: #bdbdbd;
    }
  }
  .not-cohabitant {
    margin-top: 60px;
  }
  .finance,
  .financial-records {
    h3 {
      margin: 60px 0 25px;
    }
    .btn-box {
      .flex-row;
      justify-content: space-between;

      .btn {
        background-color: #ededed;
        color: #0d0d0d;
        &:nth-child(2) {
          margin-left: 15px;
        }
        &.active {
          color: #fff;
          background-color: var(--primary-color);
        }
      }

      .btn {
        border-radius: 10px;
        flex: 1;
      }
    }
  }
  .last-btn-box {
    padding: 0 16px;
    margin: 66px 0 30px;
  }
}
</style>
