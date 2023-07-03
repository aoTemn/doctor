<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/store/account';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({});
const router = useRouter();
const store = useAccountStore();
const userInfo = computed(() => store.userInfo);

let list = reactive([
  { title: t('account.userList[0]'), route: '/account/user/name', key: 'name' },
  // { title: t('account.userList[1]'), route: '/account/user/id-card', key: 'hkid' },
  { title: t('account.userList[2]'), route: '/account/user/phone', key: 'phone_no' },
]);
const goEdit = item => {
  if (item.route) {
    router.push(item.route);
  }
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <div class="content-wrap">
      <h3>{{ $t('account.userTitle') }}</h3>
      <h5>{{ $t('account.userSmallTitle') }}</h5>
      <div v-for="(item, index) in list" :key="index" class="info-item">
        <p class="itemname">{{ item.title }}</p>
        <div>
          <p>{{ userInfo[item.key] }}</p>
          <img @click="goEdit(item)" src="@img/account/icon-editinfo.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .content-wrap {
    padding: 0 30px;

    h3 {
      margin: 75px 0 40px;
    }

    h5 {
      color: var(--primary-color);
    }

    .info-item {
      .flex-col;
      align-items: normal;
      height: 85px;
      border-bottom: 1px solid #e2e2e2;
      font-size: 14px;

      .itemname {
        margin-bottom: 11px;
        font-weight: 600;
      }

      div {
        .flex-row;
        justify-content: space-between;

        p {
          color: #8e8e8e;
          margin: 0;
        }
      }
    }
  }
}
</style>
