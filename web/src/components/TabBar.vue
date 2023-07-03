<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useI18n } from 'vue-i18n';
import { useCommonStore } from '@/store';
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
console.log(route, 'route');
const props = defineProps({});
const commonStore = useCommonStore();
const active = ref(0);
let list = computed(() => [
  {
    title: t('common.tabBarTitle[0]'),
    icon: 'common/icon-tabbar1.png',
    route: '/',
    routeName: 'home',
  },
  {
    title: t('common.tabBarTitle[1]'),
    icon: 'common/icon-tabbar2.png',
    route: '/notice',
    routeName: 'notice',
    unread: commonStore.unread,
  },

  {
    title: t('common.tabBarTitle[2]'),
    icon: 'common/icon-tabbar5.png',
    route: '/apply',
    routeName: 'apply',
    isBig: true,
  },
  {
    title: t('common.tabBarTitle[3]'),
    icon: 'common/icon-tabbar3.png',
    route: '/account',
    routeName: 'account',
  },
  {
    title: t('common.tabBarTitle[4]'),
    icon: 'common/icon-tabbar4.png',
    route: '/setting',
    routeName: 'setting',
  },
]);
const activeTabIndex = computed(() => {
  console.log(route, route.name, 'routename');
  let routeModule = route.name && route.name.split('-')[0];
  return list.value.findIndex(item => routeModule && routeModule === item.routeName);
});
const goPages = item => {
  router.push(item.route);
};
</script>
<template>
  <div class="tabbar">
    <div class="tabbar-wrap">
      <div
        class="tab-item"
        :class="{ isBig: item.isBig, active: activeTabIndex === index }"
        v-for="(item, index) in list"
        :key="index"
        @click="goPages(item)"
      >
        <div class="img-wrap">
          <img :src="getImageUrl(item.icon)" alt="" />
          <div class="unread" v-if="item.unread">
            {{ item.unread }}
          </div>
        </div>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.tabbar {
  padding-bottom: 120px;

  .tabbar-wrap {
    position: fixed;
    bottom: 0;
    height: 88px;
    left: 0;
    right: 0;
    background: #ffffff;
    border-top: 2px solid #e2e2e2;
    padding: 15px 10px 26px;
    .flex-row;
    justify-content: space-between;
    align-items: flex-end;

    @media screen and (min-width: 768px) {
      width: 750px;
      margin: 0 auto;
    }

    span {
      font-size: 12px;
      line-height: 150%;
    }

    .tab-item {
      flex: 1;
      .flex-col;

      &.isBig {
        margin: 0 10px;
        .img-wrap {
          .flex-row;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background-color: #034078;
          margin-bottom: 8px;
        }
      }

      &.active {
        color: var(--primary-color);
        font-weight: 800;
      }
      .img-wrap {
        margin-bottom: 4px;
        position: relative;
        .unread {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 20px;
          height: 20px;
          background-color: red;
          border-radius: 10px;
          .flex-row;
          color: #fff;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
