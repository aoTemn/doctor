import { defineStore } from 'pinia';
import { useAccountStore } from './account';
import { $api } from '@/utils/axios';

const initApplyForm = {
  inviteCode: '',
  name: '',
  idCard: '',
  areaCode: '',
  phone: '',
  birthday: '',
  area: '',
  address: '',
  type: '',
  addressAreaCode: '',
  addressPhone: '',
  liveYear: '',
  companyName: '',
  position: '',
  companyArea: '',
  companyAddress: '',
  companyAreaCode: '',
  companyPhone: '',
  workYear: '',
  salary: '',
  paymentMethod: '',
  paymentDay: '',
  isFundOut: -1,
  fundCompanyName: ['', ''],
  contact: [],
  unContact: [],
  finance: [],
  isFinanceUsed: -1,
  bankruptcy: -1,
  upload_hkid: '',
  upload_photo_hkid: '',
  upload_bank_card: '',
  upload_address_proof: '',
  upload_income_proof: '',
  upload_mpf: '',
};
export const useApplyStore = defineStore('apply', {
  state: () => ({
    applyForm: initApplyForm,
    guestForm: {
      areaCode: '',
      phone: '',
      name: '',
      isSuccessVerify: false,
    },
    recommendList: [],
  }),
  getters: {},
  actions: {
    async submitApplication() {
      const accountStore = useAccountStore();
      const params = {
        referral_id: this.applyForm.inviteCode,
        name: this.applyForm.name,
        hkid_no: this.applyForm.idCard,
        country_code_phone_no: this.applyForm.areaCode,
        phone_no: this.applyForm.phone,
        dob: this.applyForm.birthday,
        district: this.applyForm.area,
        address: this.applyForm.address,
        residence_type: this.applyForm.type,
        country_code_home_phone_no: this.applyForm.addressAreaCode,
        home_phone_no: this.applyForm.addressPhone,
        residence_length: this.applyForm.liveYear,
        company_name: this.applyForm.companyName,
        position: this.applyForm.position,
        company_district: this.applyForm.companyArea,
        company_address: this.applyForm.companyAddress,
        country_code_company_phone_no: this.applyForm.companyAreaCode,
        company_phone_no: this.applyForm.companyPhone,
        company_employment_length: this.applyForm.workYear,
        company_monthly_salary: this.applyForm.salary,
        company_salary_method: this.applyForm.paymentMethod,
        company_payment_day: this.applyForm.paymentDay,
        mpf_coverage: this.applyForm.isFundOut,
        bankruptcy: this.applyForm.bankruptcy,
        past_loan: this.applyForm.isFinanceUsed,
        status: 0,
        upload_hkid: this.applyForm.upload_hkid.file,
        upload_photo_hkid: this.applyForm.upload_photo_hkid.file,
        upload_bank_card: this.applyForm.upload_bank_card.file,
        upload_address_proof: this.applyForm.upload_address_proof.file,
        upload_income_proof: this.applyForm.upload_income_proof.file,
        upload_mpf: this.applyForm.upload_mpf.file,
      };

      if (this.guestForm.isSuccessVerify && this.guestForm.areaCode && this.guestForm.phone) {
        params.guest_country_code = this.guestForm.areaCode;
        params.guest_phone_no = this.guestForm.phone;
        params.step = 'submit-application';
      }

      console.log(this.applyForm.upload_hkid.file, 'this.applyForm.upload_hkid.file');
      const formData = new FormData();
      for (const key in params) {
        // 处理其他类型的属性
        formData.append(key, params[key]);
      }

      console.log(formData.get('upload_hkid'), 'formData');
      const { fundCompanyName, contact, unContact, finance } = this.applyForm;
      fundCompanyName.forEach((item, index) => {
        formData.append(`mpf_company[${index}]`, item);
      });
      contact.forEach((item, index) => {
        formData.append(`resident_family_name[${index}]`, item.name);
        formData.append(`resident_family_relationship[${index}]`, item.relation);
        formData.append(`resident_family_age[${index}]`, item.age);
        formData.append(`country_code_resident_family_phone_no[${index}]`, item.areaCode);
        formData.append(`resident_family_phone_no[${index}]`, item.phone);
        formData.append(`resident_family_work_district[${index}]`, item.companyArea);
        formData.append(`resident_family_work_address[${index}]`, item.companyAddress);
        formData.append(`country_code_resident_family_work_phone_no[${index}]`, item.companyAreaCode);
        formData.append(`resident_family_work_phone_no[${index}]`, item.companyPhone);
      });
      unContact.forEach((item, index) => {
        formData.append(`non_resident_family_name[${index}]`, item.name);
        formData.append(`non_resident_family_relationship[${index}]`, item.relation);
        formData.append(`non_resident_family_age[${index}]`, item.age);
        formData.append(`country_code_non_resident_family_phone_no[${index}]`, item.areaCode);
        formData.append(`non_resident_family_phone_no[${index}]`, item.phone);
        formData.append(`non_resident_family_work_district[${index}]`, item.companyArea);
        formData.append(`non_resident_family_work_address[${index}]`, item.companyAddress);
        formData.append(`country_code_non_resident_family_work_phone_no[${index}]`, item.companyAreaCode);
        formData.append(`non_resident_family_work_phone_no[${index}]`, item.companyPhone);
      });
      finance.forEach((item, index) => {
        formData.append(`loan_company_name[${index}]`, item.bank);
        formData.append(`loan_amount[${index}]`, item.amount);
        formData.append(`loan_monthly_payment[${index}]`, item.perAmount);
        formData.append(`loan_total_amount[${index}]`, item.totalNumber);
        formData.append(`loan_remaining_payment[${index}]`, item.notNumber);
      });

      let url = 'apply/update';
      if (this.guestForm.isSuccessVerify && this.guestForm.areaCode && this.guestForm.phone) {
        url = 'apply/updateGuest';
      }

      let res = await $api[url](formData);
      console.log(res, 'resss');
      if (res.application_id) {
        this.resetApplyForm();
        this.resetGuestForm();
      }
      return res;
    },
    changeApplyForm(form) {
      this.applyForm = { ...this.applyForm, ...form };
    },
    resetApplyForm(form) {
      this.applyForm = { ...initApplyForm };
    },
    changeGuestForm(form) {
      this.guestForm = { ...this.guestForm, ...form };
    },
    resetGuestForm(form) {
      this.guestForm = { areaCode: '', phone: '', name: '', otp: '', isSuccessVerify: false };
    },
    addRecommendList(value) {
      this.recommendList.push(value);
    },
  },
});
