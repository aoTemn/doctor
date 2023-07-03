<script setup>
import { reactive } from 'vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCommonStore } from '@/store/index';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const store = useCommonStore();
const { locale } = useI18n();
let list = computed(() => [
  { title: '中文', value: 'zh' },
  { title: 'English', value: 'en' },
]);

//语言
let lang = computed(() => store.lang);
const changeLang = value => {
  store.changeLang(value);
  locale.value = value;
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <h3>{{ $t('setting.langTitle') }}</h3>
    <div class="content-wrap">
      <div class="cell-wrap" v-for="(item, index) in list" :key="index" @click="changeLang(item.value)">
        <span>{{ item.title }}</span>
        <img v-if="lang === item.value" class="icon-pass" src="@img/apply/icon-pass.png" alt="" />
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

      .icon-pass {
        width: 26px;
        height: 26px;
      }
    }
  }
}
</style>
