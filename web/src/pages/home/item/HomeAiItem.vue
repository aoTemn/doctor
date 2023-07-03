<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useI18n } from 'vue-i18n';
import { $api } from '@/utils/axios';
const { t } = useI18n();
const props = defineProps({});
let AiItemList = ref([]);
let loading = ref(false);
onMounted(async () => {
  getData();
});

const getData = async () => {
  loading.value = true;
  const res = await $api['home/box']();
  if (res.data) {
    AiItemList.value = res.data.map(item => ({
      title: item.title,
      content: item.description,
      img: item.image,
      id: item.id,
    }));
  }
  loading.value = false;
};

defineExpose({
  getData,
});
</script>
<template>
  <div class="home-ai-item">
    <van-skeleton title :row="3" :loading="loading">
      <div class="ai-item" v-for="(item, index) in AiItemList" :key="index">
        <img :src="item.img" alt="" />
        <h5>{{ item.title }}</h5>
        <p class="three-line">{{ item.content }}</p>
      </div>
    </van-skeleton>
  </div>
</template>
<style scoped lang="less">
.home-ai-item {
  margin-top: 138px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 33px 18px;

  .ai-item {
    .flex-col;
    img {
      width: 90px;
    }
    h5 {
      margin: 16px 0;
    }

    p {
      margin: 0;
      color: var(--font-color-p1);
      font-size: 12px;
    }
  }
}
</style>
