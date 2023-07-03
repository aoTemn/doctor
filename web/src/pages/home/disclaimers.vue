<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStore } from '../../store/index';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
const store = useCommonStore();
const goBack = () => {
  router.back();
};
let content = reactive(['']);
let list = computed(() => [
  t('home.disclaimersContent[0]'),
  t('home.disclaimersContent[1]'),
  t('home.disclaimersContent[2]'),
  t('home.disclaimersContent[3]'),
  t('home.disclaimersContent[4]'),
  t('home.disclaimersContent[5]'),
  t('home.disclaimersContent[6]'),
  t('home.disclaimersContent[7]'),
  t('home.disclaimersContent[8]'),
  t('home.disclaimersContent[8]'),
]);
</script>
<template>
  <div class="wrap">
    <div class="title">
      <h3>{{ $t('home.disclaimersTitle') }}</h3>
      <p @click="goBack">{{ $t('common.closure') }}</p>
    </div>
    <div class="disclaimers-content">
      <p v-for="(item, index) in list" :key="index" v-html="index + 1 + '.' + item"></p>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .title {
    position: relative;
    .flex-row;
    padding: 16px;
    font-size: 14px;

    h3 {
      font-weight: 600;
      font-size: 14px;
    }

    p {
      position: absolute;
      top: 16px;
      left: 23px;
      font-weight: 300;
      color: #034078;
      margin: 0;
    }
  }

  .disclaimers-content {
    padding: 36px 30px;

    p {
      margin: 0;
      margin-bottom: 30px;
      font-size: 14px;
    }
  }
}
</style>
