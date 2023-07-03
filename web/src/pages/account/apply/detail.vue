<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { formatTime } from '@/utils';
import { data } from './const';
import { $api } from '@/utils/axios';
import DetailItem from './components/detailItem.vue';
const props = defineProps({});
const route = useRoute();
const id = route.params.id;
const status = 'wait';

const detail = ref({});
const activeList = ref([]);

const dataColumn = computed(() => {
  return data.map(item => {
    return {
      ...item,
      con: item.con.filter(con => con.key),
    };
  });
});
console.log(dataColumn, 'dataColumn');
console.log(detail, 'detail');
onMounted(() => {
  getData();
});

const getData = async () => {
  let res = await $api['apply/detail'](null, { url: `/member/application/${id}` });
  if (res.data) {
    detail.value = res.data;
    // list.value = res.data.map(item => {
    //   return {
    //     ...item,
    //     time: formatTime(item.created_at),
    //   };
    // });
  }
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <div class="content-wrap">
      <h3>{{ $t('account.applyTitle') }}</h3>
      <div class="state-box" :class="[status]">{{ $t('account.applyTab') }}</div>
      <van-collapse v-model="activeList" :border="false">
        <van-collapse-item :name="index" class="collapse-item" v-for="(item, index) in dataColumn" :key="index">
          <template #title>
            <div class="title-wrap">
              <h5>{{ item.title }}</h5>
              <img v-if="activeList.includes(index)" src="@img/account/icon-down.png" alt="" />
              <img v-else src="@img/account/icon-up.png" alt="" />
            </div>
          </template>
          <div>
            <template v-if="item.key">
              <div v-for="(detailItem, detailIndex) in detail[item.key]" :key="detailItem.id">
                <h5 class="sub-title">{{ item.title + (detailIndex + 1) }}</h5>
                <div v-for="(conItem, conIndex) in item.con" :key="conIndex">
                  <DetailItem :detail="detailItem" :item="conItem" />
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="(conItem, conIndex) in item.con" :key="conIndex">
                <DetailItem :detail="detail" :item="conItem" />
              </div>
            </template>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .content-wrap {
    padding: 45px 30px 0;
    .state-box {
      .flex-row;
      width: 90px;
      height: 24px;
      border-radius: 10px;
      color: white;
      font-size: 10px;
      margin: 10px 0 40px;
      &.wait {
        background-color: #dc8d30;
      }
      &.success {
        background-color: #339946;
      }
      &.fail {
        background-color: #d03535;
      }
    }

    :deep(.van-collapse) {
      .van-collapse-item,
      .van-collapse-item__content,
      .van-cell {
        padding: 0;
      }
      .van-cell {
        &:after {
          display: none;
        }
      }

      .van-collapse-item--border:after {
        display: none;
      }
      .van-collapse-item--border {
        &::after {
          border: none;
        }
      }
      .van-badge__wrapper {
        display: none;
      }

      .collapse-item {
        margin-bottom: 45px;
        h5 {
          color: var(--primary-color);
        }

        .title-wrap {
          margin-bottom: 15px;
          .flex-row;
          justify-content: start;
          img {
            margin-left: 10px;
          }
        }
        .sub-title {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
