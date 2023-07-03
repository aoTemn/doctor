<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({});
const router = useRouter();
onMounted(() => {});
let correctList = computed(() => [
  { content: '頭像照約佔2／3， 證件照約佔1／3' },
  { content: '頭像照臉部請保持平視正面，盡量以素顏或淡妝拍攝' },
  { content: '證件內容及文字需清晰' },
]);
let errorList = computed(() => [
  { content: '身份證比例過少導致內容無法辦識' },
  { content: '身份證過度模糊導致內容無法辦識' },
  { content: '身份證反光導致內容無法辦識' },
]);
const goBack = () => {
  router.back();
};
const goPage = () => {
  router.push({ name: 'apply-success' });
};
</script>
<template>
  <div class="wrap">
    <p class="title-box">
      <span class="go-back" @click="goBack">關閉</span>
      <span class="title">自拍注意項目</span>
    </p>
    <img src="@img/apply/bg-startSelfie.png" alt="" />
    <div class="content-wrap">
      <div>
        <p class="input-title">拍照注意項目</p>
        <div v-for="(item, index) in correctList" :key="index" class="content-item">
          <img src="@img/apply/icon-pass.png" />
          <p>{{ item.content }}</p>
        </div>
      </div>
      <div>
        <p class="input-title">拍照注意項目</p>
        <div v-for="(item, index) in errorList" :key="index" class="content-item">
          <div><img src="@img/apply/icon-error.png" /></div>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <van-button @click="goPage" class="btn">開始拍照</van-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .title-box {
    padding: 16px 0;
    position: relative;
    .flex-row;
    .go-back {
      position: absolute;
      height: fit-content;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 23px;
      font-size: 14px;
      font-weight: 300;
      color: var(--primary-color);
    }
    .title {
      font-weight: 700;
    }
  }
  img {
    margin: 0 auto;
    display: block;
  }
  .content-wrap {
    margin-top: 25px;
    padding: 0 40px;
    .input-title {
      font-weight: 700;
      margin: 20px 0 14px;
    }
    .content-item {
      .flex-row;
      margin-bottom: 14px;
      align-items: start;
      p {
        flex: 1;
        font-size: 14px;
        height: 100%;
        align-self: center;
        margin: 0;
      }
      img {
        width: 26px;
      }
    }
  }
  .btn-box {
    padding: 30px 17px;
  }
}
</style>
