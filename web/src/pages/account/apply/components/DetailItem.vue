<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/store/account';
const props = defineProps(['detail', 'item']);

const accountStore = useAccountStore();

const label = computed(() => {
  if (props.item.option) {
    let op = props.item.option.find(op => op.key == props.detail[props.item.key]) || {};
    return op.label || '';
  }
  return props.detail[props.item.key] || '';
});

onMounted(() => {});

// const handleDownload = () => {
//   window.requestFileSystem(
//     window.TEMPORARY,
//     5 * 1024 * 1024,
//     function (fs) {
//       var url = label;
//       const fileName = label.value.split('/')[-1];
//       console.log('file system open: ' + fs.name, url, fileName);
//       downloadFile(fs.root, url, fileName);
//     },
//     err => {
//       console.log('windowLoad', err);
//     }
//   );
// };
</script>
<template>
  <div class="cell-item" :key="conIndex">
    <div class="cell-left">
      <div class="title">{{ item.label }}</div>
      <div class="value-wrap">
        <!-- <template v-if="Array.isArray(item.value)">
                  <p v-for="labelItem in item.value" :key="labelItem">
                    {{ labelItem }}
                  </p>
                </template> -->

        <p>{{ label }}</p>
      </div>
    </div>
    <!-- <van-button class="cell-right" :disabled="!detail[item.key]" v-if="item.btn" @click="handleDownload">{{
      item.btn
    }}</van-button> -->
  </div>
</template>
<style scoped lang="less">
.cell-item {
  min-height: 85px;
  padding: 20px 0;
  border-bottom: 1px solid #e2e2e2;
  .flex-row;
  justify-content: space-between;
  .cell-left {
    .flex-col;
    align-items: flex-start;
    .title {
      margin-bottom: 10px;
      color: #0d0d0d;
      font-weight: 600;
      line-height: 17px;
    }
    .value-wrap {
      .flex-col;
      align-items: flex-start;

      p {
        color: #8e8e8e;
        margin: 0;
        word-break: break-all;
      }
    }
  }
  .cell-right {
    .flex-row;
    background: #034078;
    padding: 0 20px;
    height: 30px;
    margin-left: 20px;
    border-radius: 30px;
    line-height: 20px;
    font-weight: 600;
    font-size: 12px;
    white-space: nowrap;
    color: #ffffff;
  }
}
</style>
