<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useI18n } from 'vue-i18n';
import { $api } from '@/utils/axios';
const { t } = useI18n();
const props = defineProps({});
let list = ref([]);

onMounted(async () => {
  getData();
});

const getData = async () => {
  const res = await $api['home/news']();
  if (res.data) {
    list.value = res.data.map(item => ({
      title: item.title,
      content: item.description,
      img: item.image,
      id: item.id,
    }));
  }
};

defineExpose({
  getData,
});
</script>
<template>
  <div class="home-news">
    <h4>{{ $t('home.newsTitle') }}</h4>
    <div class="news-list">
      <div class="news-item" v-for="(item, index) in list" :key="index">
        <img class="thumb" :src="item.img" alt="" />
        <h5 class="singe-line">{{ item.title }} <img src="@img/home/icon-news-go.png" alt="" /></h5>
        <span class="singe-line">{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.home-news {
  margin: 52px 0 60px;
  padding: 0 16px;

  h4 {
    color: #034078;
    text-align: start;
    font-size: 16px;
    margin-bottom: 13px;
  }

  .news-list {
    width: 100%;
    overflow: auto;
    .flex-row;
    justify-content: flex-start;

    &::-webkit-scrollbar {
      display: none;
    }

    .news-item {
      flex: 1;
      margin-right: 16px;
      .thumb {
        border-radius: 10px;
      }
      h5 {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 5px;

        img {
          margin-left: 10px;
        }
      }

      span {
        width: 100%;
        display: block;
        color: var(--font-color-p1);
        font-size: 12px;
        font-weight: 500;
        display: block;
        width: 231px;
      }
    }
  }
}
</style>
