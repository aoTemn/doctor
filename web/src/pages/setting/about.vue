<script setup>
import { reactive } from 'vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { $api } from '@/utils/axios';
import { useCommonStore } from '@/store';
const commonStore = useCommonStore();
const version = computed(() => {
  if (commonStore.version) {
    return 'v' + commonStore.version.split('').join('.');
  }
  return '';
});

onMounted(async () => {
  commonStore.checkVersion();
});
</script>
<script>
export default {
  name: 'about',
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <h3>{{ $t('setting.aboutTitle') }}</h3>
    <div class="content-wrap">
      <div class="cell-wrap">
        <span>{{ $t('setting.aboutContent') }}</span>
        <p>{{ version }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  h3 {
    font-size: 32px;
    padding: 30px;
  }

  .content-wrap {
    border-top: 1px solid #e2e2e2;

    .cell-wrap {
      .flex-row;
      justify-content: space-between;
      height: 63px;
      border-bottom: 1px solid #e2e2e2;
      padding: 0 30px;

      span {
        font-size: 15px;
      }

      p {
        margin: 0;
        color: #8e8e8e;
      }
    }
  }
}
</style>
