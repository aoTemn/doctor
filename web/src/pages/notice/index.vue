<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
// import TabBar from '@/components/TabBar.vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { $api } from '@/utils/axios';
const { t } = useI18n();
const props = defineProps({});
const router = useRouter();
let list = ref([]);
onMounted(async () => {
  const res = await $api['notice/list']();
  if (res.data) {
    list.value = res.data.map(item => ({
      time: item.updated_at,
      content: item.short_description,
      isRead: item.read === 'Yes',
      id: item.id,
    }));
  }
});
const goDetails = id => {
  router.push(`notice/${id}`);
};
</script>
<template>
  <div class="wrap">
    <h3>{{ $t('notic.noticTitle') }}</h3>
    <div class="notice-list" v-if="list.length">
      <div class="notice-item" v-for="item in list" :key="item.id" @click="goDetails(item.id)">
        <span>{{ item.time }}</span>
        <p class="four-line">{{ item.content }}</p>
        <div class="isRead" v-if="!item.isRead"></div>
      </div>
    </div>
    <div v-else class="empty-wrap">
      <a-empty :description="t('common.emptyTip')"></a-empty>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  h3 {
    padding: 58px 30px 40px;
    font-size: 32px;
  }

  .notice-list {
    border-top: 1px solid #e2e2e2;

    .notice-item {
      padding: 20px 42px 24px 58px;
      border-bottom: 1px solid #e2e2e2;
      position: relative;

      span {
        display: block;
        font-size: 15px;
        margin-bottom: 11px;
      }

      p {
        margin: 0;
        color: var(--font-color-p1);
        font-size: 15px;
      }

      .isRead {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background-color: #c61f15;
        position: absolute;
        top: 26px;
        left: 30px;
      }
    }
  }
}
</style>
