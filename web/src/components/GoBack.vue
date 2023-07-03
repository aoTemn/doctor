<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['path']);
const goBack = () => {
  if (props.path) {
    router.push(props.path);
    return;
  }
  router.back();
};
</script>
<template>
  <div class="go-back" @click="goBack">
    <van-icon name="arrow-left" /><span>{{ $t('common.callBack') }}</span>
  </div>
</template>
<style scoped lang="less">
.go-back {
  padding: 20px 16px 0;

  span {
    margin-left: 5px;
  }
}
</style>
