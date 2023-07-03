<script setup>
import { ref, onMounted, computed, inject } from 'vue';
// import TabBar from '@/components/TabBar.vue';
import HomeBanner from './item/HomeBanner.vue';
import HomeAiItem from './item/HomeAiItem.vue';
import HomeNews from './item/HomeNews.vue';
import HomeProblem from './item/HomeProblem.vue';
import HomeFooter from './item/HomeFooter.vue';
import { $api } from '@/utils/axios';

const loading = ref(false);
const homeBannerRef = ref(null);
const homeAiItemRef = ref(null);
const homeNewsRef = ref(null);
const homeProblemRef = ref(null);
const homeFooterRef = ref(null);
const onRefresh = async () => {
  await Promise.all([
    homeBannerRef.value.getData(),
    homeAiItemRef.value.getData(),
    homeNewsRef.value.getData(),
    homeProblemRef.value.getData(),
    homeFooterRef.value.getData(),
  ]);
  loading.value = false;
};
</script>
<script>
export default {
  name: 'home',
};
</script>
<template>
  <div class="wrap">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <HomeBanner ref="homeBannerRef"></HomeBanner>
      <HomeAiItem ref="homeAiItemRef"></HomeAiItem>
      <HomeNews ref="homeNewsRef"></HomeNews>
      <HomeProblem ref="homeProblemRef"></HomeProblem>
      <HomeFooter ref="homeFooterRef"></HomeFooter>
    </van-pull-refresh>
  </div>
</template>
