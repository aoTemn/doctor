<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { $api } from '@/utils/axios';
import { useCommonStore } from '@/store';
const router = useRouter();
const route = useRoute();
const commonStore = useCommonStore();
const id = route.params.id;
let detail = ref({});
onMounted(async () => {
  const res = await $api['notice/detail'](null, { url: `/member/notification/${id}` });
  if (res.data) {
    detail.value = res.data;
  }

  await $api['notice/update']({ id });
  commonStore.getUnread();
});
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <div class="title">
      <h3>{{ $t('notic.noticTitle') }}</h3>
      <h5>{{ detail.title }}</h5>
      <span>{{ detail.updated_at }}</span>

      <div class="content-wrap">
        <p class="item-label">
          {{ detail.long_description }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .title {
    padding: 0 30px;

    h3 {
      padding: 30px 0 26px;
      font-size: 32px;
    }
    h5 {
      margin-bottom: 15px;
    }
    span {
      font-size: 15px;
      display: block;
    }

    .content-wrap {
      font-size: 15px;
      color: var(--font-color-p1);
      margin-top: 10px;
      .item-label {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
