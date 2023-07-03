<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useAccountStore } from '@/store/account';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
const props = defineProps({});
let store = useAccountStore();
let list = computed(() => [
  { title: t('account.indexList[0]'), route: '/account/apply', img: 'account/icon-indexitem1.png' },
  { title: t('account.indexList[1]'), route: '/account/user', img: 'account/icon-indexitem2.png' },
  { title: t('account.indexList[2]'), route: '/account/password', img: 'account/icon-indexitem3.png' },
]);
const goPage = item => {
  if (item.route) {
    router.push(item.route);
  }
};
</script>
<script>
export default {
  name: 'account',
};
</script>

<template>
  <div class="wrap">
    <h2 class="user-name">{{ store.userInfo.name }}</h2>
    <div class="item-name">
      <div class="flex-col" v-for="(item, index) in list" :key="index" @click="goPage(item)">
        <img :src="getImageUrl(item.img)" alt="" />
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  padding: 25px 16px;

  .user-name {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 34px;
  }

  .item-name:nth-child(2) {
    div {
      width: 100%;
      padding: 13px;
      background-color: #ededed;
      border-radius: 10px;
      margin-bottom: 23px;

      img {
        margin-bottom: 13px;
      }
    }
  }
}
</style>
