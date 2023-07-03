<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useI18n } from 'vue-i18n';
import { useCommonStore } from '../../../store/index';
import { $api } from '@/utils/axios';
const { t } = useI18n();
const router = useRouter();
const store = useCommonStore();
const props = defineProps({});
let list = ref([]);

onMounted(async () => {
  getData();
});

const getPage = item => {
  console.log(item);
  if (item.slug) {
    window.open(item.slug);
  }
};

const getData = async () => {
  const res = await $api['home/page']();
  if (res.data) {
    list.value = res.data;
  }
};

defineExpose({
  getData,
});
</script>
<template>
  <div class="home-footer">
    <div class="list-item" v-for="item in list" :key="item.title" @click="getPage(item)">
      <img :src="item.icon" alt="" />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>
<style scoped lang="less">
.home-footer {
  padding: 26px 30px;
  .flex-row;
  justify-content: space-between;

  .list-item {
    .flex-col;

    p {
      .singe-line;
      margin: 0;
      font-size: 10px;
    }
  }
}
</style>
