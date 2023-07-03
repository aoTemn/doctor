<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useI18n } from 'vue-i18n';
import { $api } from '@/utils/axios';
const { t } = useI18n();

let bannerList = ref([]);
let loading = ref(false);

onMounted(async () => {
  getData();
});

const getData = async () => {
  loading.value = true;
  const res = await $api['home/banner']();
  if (res.data) {
    bannerList.value = res.data.map(item => ({
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
  <div class="home-banner">
    <!-- <img src="@img/home/bg-banner.png" alt="" /> -->
    <div class="img-banner">
      <van-skeleton title avatar :row="3" :loading="loading">
        <template #template>
          <van-skeleton-image />
        </template>
        <van-swipe :touchable="false" class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in bannerList" :key="item.id"><img :src="item.img" alt="" /> </van-swipe-item>
        </van-swipe>
      </van-skeleton>
    </div>
    <div class="banner-box">
      <van-swipe autoplay="3000" :touchable="false" class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
          <h4>{{ item.title }}</h4>
          <span class="singe-line">{{ item.content }}</span>
        </van-swipe-item>
        <template #indicator="{ active, total }">
          <div class="custom-indicator flex-row">
            <div
              class="item-indicator"
              v-for="(item, index) in total"
              :key="index"
              :class="[index === active ? 'active-box' : '']"
            ></div>
          </div>
        </template>
      </van-swipe>
    </div>
  </div>
</template>
<style scoped lang="less">
.home-banner {
  position: relative;

  img {
    width: 100%;
  }

  .img-banner {
    width: 100%;
    height: 350px;
    .van-skeleton {
      width: 100%;
      height: 100%;
      padding: 0;
      .van-skeleton-image {
        width: 100%;
        height: 100%;
      }
    }

    .my-swipe {
      img {
        width: 100%;
        height: 350px;
      }
    }
  }

  .banner-box {
    width: 90%;
    margin: 0 auto;
    height: 144px;
    // background: red;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: -113px;
    background-color: #fff;

    .my-swipe {
      width: 100%;
      height: 100%;

      .van-swipe-item {
        padding: 30px;

        h4 {
          color: #034089;
          margin-bottom: 14px;
        }

        span {
          color: var(--font-color-p1);
          font-size: 12px;
          display: block;
          text-align: center;
          width: 100%;
        }
      }

      .custom-indicator {
        position: absolute;
        bottom: 17px;
        left: 0;
        right: 0;
        margin: auto;
        background-color: white;
        width: fit-content;

        .item-indicator {
          margin: 0 3px;
          background-color: #d9d9d9;
          width: 10px;
          height: 2px;
          border-radius: 2px;
        }

        .active-box {
          background-color: #000000;
        }
      }
    }
  }
}
</style>
