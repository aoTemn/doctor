<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils';
import { showConfirmDialog } from 'vant';
import { useAccountStore } from '@/store/account';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({});
const router = useRouter();
const store = useAccountStore();
let list = computed(() => {
  let list_ = [
    { title: t('setting.tabBar[0]'), route: '/setting/notice', img: 'install/icon-installitem1.png' },
    { title: t('setting.tabBar[1]'), route: '/setting/language', img: 'install/icon-installitem2.png' },
    { title: t('setting.tabBar[2]'), route: '/setting/about', img: 'install/icon-installitem3.png' },
    // { title: t('setting.tabBar[3]'), route: '/setting/native', img: 'install/icon-installitem4.png' },
  ];
  if (store.token) {
    list_.push({ title: t('setting.tabBar[4]'), handle: logout, img: 'install/icon-installitem4.png' });
  }
  return list_;
});

const logout = () => {
  showConfirmDialog({
    title: t('common.logout'),
    message: t('common.logoutContent'),
    confirmButtonText: t('common.logout'),
    cancelButtonText: t('common.no'),
    confirmButtonColor: '#007aff',
    cancelButtonColor: '#007aff',
  })
    .then(() => {
      store.logout();
      router.push('/');
    })
    .catch(() => {});
};
const clickItem = item => {
  // console.log(index);

  if (item.handle) {
    item.handle();
    return;
  }

  if (item.route) {
    router.push(item.route);
    return;
  }
};
</script>
<template>
  <div class="wrap">
    <h2>{{ $t('setting.indexTitle') }}</h2>
    <div class="con-wrap">
      <div v-for="(item, index) in list" :key="index" class="flex-row" :class="{ red: item.handle }">
        <img :src="getImageUrl(item.img)" alt="" />
        <span @click="clickItem(item)">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'setting',
};
</script>
<style scoped lang="less">
.wrap {
  h2 {
    font-size: 32px;
    color: #034078;
    margin: 30px 0 25px;
    padding: 0 30px;
  }

  .con-wrap {
    padding: 0 35px 0 25px;

    div {
      height: 92px;
      justify-content: start;
      border-bottom: 1px solid #e2e2e2;

      img {
        margin-right: 16px;
      }

      span {
        font-size: 15px;
      }
    }

    .red {
      color: red;
      border: none;
    }
  }
}
</style>
<style lang="less">
.van-button.van-button--default.van-button--large.van-dialog__confirm.van-hairline--left {
  .van-button__content {
    .van-button__text {
      font-weight: 700;
    }
  }
}

.van-popup.van-popup--center.van-dialog,
.van-button.van-button--default.van-button--large.van-dialog__cancel,
.van-button.van-button--default.van-button--large.van-dialog__confirm.van-hairline--left {
  background: rgba(242, 242, 242, 0.8);
  backdrop-filter: blur(11px);
}
</style>
