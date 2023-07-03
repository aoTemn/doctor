import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { $api } from '@/utils/axios';
import { getStorage, setStorage, removeStorage } from '@/utils';
export const useAccountStore = defineStore('account', {
  state: () => ({
    registerForm: {
      name: '',
      phone: '',
      areaCode: '',
      code: '',
      password: '',
    },
    userInfo: {},
    token: getStorage('token') || '',
  }),
  getters: {},
  actions: {
    async getUserInfo() {
      let res = await $api['account/user']();
      if (res) {
        this.userInfo = {
          ...res,
        };
      }
    },
    async login(form) {
      const params = {
        country_code: form.areaCode,
        phone_no: form.phone,
        password: form.password,
      };
      let res = await $api['account/login'](params);
      if (res.token) {
        this.token = res.token;
        setStorage('token', res.token);
        this.userInfo = {
          ...res.user,
        };
      }
      return res;
    },

    async logout() {
      this.userInfo = {};
      this.token = '';
      removeStorage('token');
    },
    changeRegisterForm(form) {
      this.registerForm = { ...this.registerForm, ...form };
    },
    resetRegisterForm(form) {
      this.registerForm = { name: '', phone: '', areaCode: '', code: '', password: '' };
    },
    changeUserInfo(form) {
      this.userInfo = { ...this.userInfo, ...form };
    },
  },
});
