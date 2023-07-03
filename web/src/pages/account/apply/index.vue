<script setup>
import { reactive } from 'vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { accountStatusStragetyConst, formatTime } from '@/utils';
import { $api } from '@/utils/axios';
const props = defineProps({});
const router = useRouter();

const list = ref([]);

onMounted(() => {
  getData();
});

const getData = async () => {
  let res = await $api['apply/list']();
  console.log(res.data, 'list');
  if (res.data) {
    list.value = res.data.map(item => {
      return {
        ...item,
        time: formatTime(item.created_at),
      };
    });
  }
};
// let list = computed(() => [
//   { id: 'L22392123', time: '05/05/23', status: 'wait' },
//   { id: 'L22392125', time: '05/05/23', status: 'success' },
//   { id: 'L22392126', time: '05/05/23', status: 'fail' },
//   { id: 'L22392127', time: '05/05/23', status: 'success' },
//   { id: 'L22392128', time: '05/05/23', status: 'success' },
// ]);
const goToPage = item => {
  router.push(`/account/apply/${item.id}`);
};
</script>

<template>
  <div class="wrap">
    <GoBack></GoBack>
    <div class="content-wrap">
      <h3>{{ $t('account.indexList[0]') }}</h3>
      <div class="content-list" v-if="list.length">
        <div
          class="content-item"
          :class="[`status-${accountStatusStragetyConst[item.status]}`]"
          @click="goToPage(item)"
          v-for="item in list"
          :key="item.application_id"
        >
          <div class="line">
            <div>
              <p class="item-id">{{ item.application_id }}</p>
              <p class="item-time">{{ item.time }}</p>
            </div>
            <p class="item-status">{{ item.status }}</p>
          </div>
        </div>
      </div>
      <div v-else class="empty-list">
        <van-empty description="描述文字" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .content-wrap {
    padding: 35px 0 0;

    h3 {
      padding: 0 30px 30px;
    }

    .content-item {
      .line {
        .flex-row;
        border-bottom: 1px solid #e2e2e2;
        width: 100%;
        height: 85px;
        justify-content: space-between;
        padding: 0 30px;

        .item-id {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 11px;
        }

        .item-time {
          color: #8e8e8e;
          font-size: 14px;
        }

        .item-statee {
          font-size: 14px;
        }
      }

      &.status-waiting {
        .line {
          .item-status {
            color: #dc8d30;
          }
        }
      }

      &.status-success {
        .line {
          .item-status {
            color: #339946;
          }
        }
      }

      &.status-Unknown {
        .line {
          .item-status {
            color: #d03535;
          }
        }
      }
    }
  }
}
</style>
