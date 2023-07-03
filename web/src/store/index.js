import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { $api } from '@/utils/axios';
import { uniqBy } from 'lodash';
import { showConfirmDialog } from 'vant';
import { useI18n } from 'vue-i18n';
import { getStorage, setStorage, removeStorage } from '@/utils';
export const useCommonStore = defineStore('common', {
  state: () => ({
    notify: true,
    lang: 'zh',
    version: getStorage('version'),
    countryCodeOptions: getStorage('countryCodeOptions') || [],
    districOptions: getStorage('districOptions') || [],
    residentTypeOptions: getStorage('residentTypeOptions') || [],
    unread: 0,
  }),
  getters: {
    activeLang: state => state.lang,
  },
  actions: {
    changeNotify(value) {
      this.notify = value;
    },
    changeLang(value) {
      this.lang = value;
    },
    changeVersion(v) {
      this.version = v;
      setStorage('version', v);
    },
    async getUnread() {
      let res = await $api['notice/unread']();
      if (res.data) {
        this.unread = res.data && res.data.unread;
      }
    },
    async getOptionsConfig() {
      let promises = [$api['common/countryCode'](), $api['common/distric'](), $api['common/residentType']()];

      let [res1, res2, res3] = await Promise.all(promises);
      if (res1.data) {
        let data = uniqBy(res1.data, 'phone');

        data = data.map(item => ({
          label: item.name,
          value: item.phone,
          text: `+${item.phone} ${item.name}`,
        }));
        this.countryCodeOptions = data;
        setStorage('countryCodeOptions', data);
      }
      if (res2.data) {
        let data = uniqBy(res2.data, 'distric');
        data = data.map(item => ({
          label: item.distric,
          value: item.distric,
          text: item.distric,
        }));

        this.districOptions = data;
        setStorage('districOptions', data);
      }
      if (res3.data) {
        let data = uniqBy(res3.data, 'type');

        data = data.map(item => ({
          label: item.type,
          value: item.type,
          text: item.type,
        }));
        this.residentTypeOptions = data;
        setStorage('residentTypeOptions', data);
      }
    },
    async checkVersion() {
      const { t } = useI18n();

      const res = await $api['common/version']();
      if (res.data) {
        let value = '';
        let url = '';
        let isForceUpdate = 'No';

        const platform = window.device && window.device.platform;
        if (platform === 'iOS') {
          value = res.data.ios_version;
          url = res.data.ios_app_store_url;
          isForceUpdate = res.data.android_force_update;
        } else {
          value = res.data.android_version;
          url = res.data.android_app_store_url;
          isForceUpdate = res.data.ios_force_update;
        }
        value = value.split('.').join('');
        try {
          const cordova = window.cordova;
          let versionRes = await cordova.getAppVersion.getVersionNumber();
          this.version = versionRes.split('.').join('');
        } catch (error) {
          console.log(error, 'error');
        }

        console.log(this.version, value, isForceUpdate, 'versionRes');

        if (this.version && value > this.version) {
          if (isForceUpdate === 'Yes') {
            const beforeClose = action =>
              new Promise(resolve => {
                if (action === 'confirm') {
                  window.open(url, '_blank', 'locaiton=no');
                  console.log('confirm');
                }
                resolve(false);
              });

            showConfirmDialog({
              message: t('common.newVersion'),
              showCancelButton: false,
              confirmButtonText: t('common.confirm'),
              confirmButtonColor: '#007aff',
              beforeClose: beforeClose,
              closeOnPopstate: false,
            })
              .then(() => {
                window.open(url, '_blank', 'locaiton=no');
              })
              .catch(e => {
                console.log(e, 'e');
              });
          } else {
            showConfirmDialog({
              message: t('common.newVersion'),
              confirmButtonText: t('common.confirm'),
              cancelButtonText: t('common.cancellation'),
              confirmButtonColor: '#007aff',
              cancelButtonColor: '#007aff',
            })
              .then(() => {
                window.open(url, '_blank', 'locaiton=no');
              })
              .catch(e => {
                console.log(e, 'e');
              });
          }
        }
      }
    },
  },
});
