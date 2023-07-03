<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps(['active']);
onMounted(() => {});
</script>
<template>
  <div class="steps">
    <div :class="[props.active >= 1 ? 'active' : '']">1</div>
    <div class="line" :class="[props.active >= 2 ? 'active' : '']"></div>
    <div :class="[props.active >= 2 ? 'active' : '']">2</div>
    <div class="line" :class="[props.active >= 3 ? 'active' : '']"></div>
    <div :class="[props.active >= 3 ? 'active' : '']">3</div>
  </div>
</template>
<style scoped lang="less">
.steps {
  .flex-row;
  width: 80%;
  margin: auto;
  .line {
    flex: 1;
    height: 4px;
    border-radius: 0;
  }
  div {
    .flex-row;
    font-size: 12px;
    color: white;
    height: 23px;
    width: 23px;
    border-radius: 50%;
    background-color: #bebdbd;
  }
  div.active {
    background-color: #1d1c1c;
  }
}
</style>
