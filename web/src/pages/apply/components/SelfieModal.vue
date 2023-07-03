<script setup>
import { ref, onMounted, computed, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import { base64ToFile } from '@/utils/camera';

const props = defineProps({});
const emit = defineEmits(['afterCamera']);
const router = useRouter();
const show = ref(false);

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

onMounted(() => {});

const showPopup = () => {
  show.value = true;
};
const closePopup = () => {
  show.value = false;
};

const handleCamera = () => {
  navigator.camera.getPicture(
    imageUrl => {
      console.log(imageUrl, 'imageUrl');
      const imageFile = base64ToFile(imageUrl);
      console.log(imageFile, 'imageFile');
      emit('afterCamera', { file: imageFile });
      show.value = false;
    },
    e => {
      console.log(e);
    },
    {
      destinationType: 0,
      cameraDirection: 1,
    }
  );
};

defineExpose({
  showPopup,
});
</script>
<template>
  <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }">
    <div class="selfie-modal">
      <p class="title-box">
        <span class="go-back" @click="closePopup">關閉</span>
        <span class="title">自拍注意項目</span>
      </p>
      <img src="@img/apply/bg-startSelfie.png" alt="" />
      <div class="content-wrap">
        <div>
          <p class="input-title">拍照注意項目</p>
          <div v-for="(item, index) in correctList" :key="index" class="content-item">
            <div class="img-wrap"><img src="@img/apply/icon-correct.png" /></div>
            <p>{{ item.content }}</p>
          </div>
        </div>
        <div>
          <p class="input-title">拍照注意項目</p>
          <div v-for="(item, index) in errorList" :key="index" class="content-item">
            <div class="img-wrap"><img src="@img/apply/icon-error.png" /></div>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <van-button @click="handleCamera" class="btn">開始拍照</van-button>
      </div>
    </div>
  </van-popup>
</template>
<style scoped lang="less">
.selfie-modal {
  .title-box {
    padding: 16px 0;
    position: relative;
    font-size: 16px;
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
      margin-bottom: 18px;
      align-items: start;
      p {
        flex: 1;
        font-size: 14px;
        height: 100%;
        align-self: center;
        margin: 0;
      }
      .img-wrap {
        width: 26px;
        height: 26px;
        border-radius: 26px;
        border: 1px solid #000;
        margin-right: 16px;
        .flex-row;
        img {
          width: 14px;
        }
      }
    }
  }
  .btn-box {
    padding: 30px 17px;
  }
}
</style>
