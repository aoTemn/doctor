<script setup>
import { reactive } from 'vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCommonStore } from '@/store/index';
const route = useRoute();
const router = useRouter();
const store = useCommonStore();

//返回事件
const goBack = () => {
  router.back();
};
//当为通知页面时
let checked = ref(store.notify);
const checkChange = value => {
  store.changeNotify(value);
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <h3>{{ $t('setting.noticeTitle') }}</h3>
    <div class="content-wrap">
      <div class="cell-wrap">
        <span>{{ $t('setting.noticeTitle') }}</span>
        <van-switch active-color=" #034078" @change="checkChange" size="22px" v-model="checked" />
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
    }
  }
}
</style>
