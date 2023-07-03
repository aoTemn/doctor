<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { $api } from '@/utils/axios';
const { t } = useI18n();

let list = ref([]);
const activeNames = ref([]);

onMounted(async () => {
  getData();
});

const getData = async () => {
  const res = await $api['home/faq']();
  if (res.data) {
    list.value = res.data;
  }
};

defineExpose({
  getData,
});
</script>
<template>
  <div class="home-problem">
    <h4>{{ $t('home.problemTitle') }}</h4>

    <van-collapse v-model="activeNames">
      <van-collapse-item :name="index" v-for="(item, index) in list" :key="item.id" :is-link="false">
        {{ item.description }}
        <template #title>
          <p>{{ item.title }}</p>
        </template>
        <template #value>
          <img src="@img/home/icon-choose.png" alt="" />
        </template>
      </van-collapse-item>
    </van-collapse>
    <!-- <van-popover v-for="item in list" :key="item.id" :show-arrow="false">
      <div>
        {{ item.description }}
      </div>
      <template #reference>
        <div class="choose-box">
          <p>{{ item.title }}</p>
          <img src="@img/home/icon-choose.png" alt="" />
        </div>
      </template>
    </van-popover> -->
  </div>
</template>
<style scoped lang="less">
.home-problem {
  background-color: #034078;
  padding: 37px 47px 37px;

  h4 {
    font-size: 16px;
    font-weight: 500;
    color: white;
    margin-bottom: 27px;
  }

  :deep(.van-collapse-item) {
    display: block;
    margin-top: 18px;
    width: 100%;
    border-radius: 5px;
    .van-collapse-item__title {
      border-radius: 5px;
      &.van-collapse-item__title--expanded {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    p {
      .singe-line;
      margin: 0;
      font-size: 12px;
      font-weight: 500;
      color: #373636;
    }
  }
}
</style>
<style lang="less">
.van-popup.van-popover.van-popover--light {
  width: calc(100% - 100px);

  .van-popover__content {
    padding: 20px 16px;
  }
}
</style>
