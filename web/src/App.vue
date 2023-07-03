<script setup>
import { provide, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TabBar from '@/components/TabBar.vue';
import ContactsX from 'cordova-plugin-contacts-x';
import { useAccountStore } from '@/store/account';
import { useCommonStore } from '@/store';
const name = 'App';
const route = useRoute();
const store = useAccountStore();
const commonStore = useCommonStore();

console.log(route, 'route');

onMounted(() => {
  store.getUserInfo();
  commonStore.getOptionsConfig();
  commonStore.getUnread();
  commonStore.checkVersion();
});

const noShowTabBar = computed(() => {
  return route.meta && route.meta.tabbar === false;
});
</script>
<template>
  <!-- <router-view></router-view> -->
  <router-view v-slot="{ Component }">
    <keep-alive :include="['home', 'setting', 'apply', 'personalData', 'contactData']">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>

  <TabBar v-if="!noShowTabBar"></TabBar>
</template>
