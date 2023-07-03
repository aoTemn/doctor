<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { sendSms } from '@/utils';
import axios from 'axios';
import { $api } from '@/utils/axios';
const props = defineProps({});
onMounted(() => {});
const contactList = ref();
const fileList = ref();
const location = ref({});
const id = 'AP202306170001';
const recommend = () => {
  if (window.ContactsX) {
    window.ContactsX.requestPermission(
      function (success) {
        console.log(success, 'requestPermission');
        window.ContactsX.find(
          function (success) {
            console.log(success, 'find');
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

const getGeo = async () => {
  let res = await axios({
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCga08wyTWsMyIiRRH52o1vFr0dK9xA_mI`,
  });
  console.log(res, 'res');
};

onMounted(() => {
  getContact();
  getGeoLocation();
});

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
    formData.append(`contact[${index}][contact_name]`, item);
    item.phoneNumbers.forEach((phone, phoneIndex) => {
      formData.append(`contact[${index}][contact_no${phoneIndex + 1}]`, phone.value);
    });
  });
  const res = $api['common/contact'](formData);
  console.log(res, 'res');
};

const getGeoLocation = () => {
  console.log(navigator.geolocation, 'navigator.geolocation');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        location.value = position.coords;
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
const handleRecommend = () => {
  sendSms('1234', '我的天呐');
};
</script>
<template>
  <div class="wrap">
    <GoBack></GoBack>
    <h3>原生相关功能</h3>
    <div class="content-wrap">
      <div class="cell-wrap">
        <span>上載</span>
        <van-uploader :preview-image="false" v-model="fileList">
          <div class="load-btn" type="default">
            <img src="@img/apply/icon-upload.png" />
            <span>上載</span>
          </div>
        </van-uploader>
      </div>
      <div class="cell-wrap" @click="recommend">
        <span>获取通讯录</span>
        <van-icon name="arrow" />
      </div>
      <div class="cell-wrap" @click="getGeoLocation">
        <span>获取地址</span>
        <van-icon name="arrow" />
      </div>
      <!-- <div class="cell-wrap" @click="getGeo">
        <span>获取坐标</span>
        <van-icon name="arrow" />
      </div> -->
      <div class="cell-wrap" @click="handleRecommend">
        <span>测试发送短信功能</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="result-list">
      <div class="file-wrap">
        <h4>我是文件列表</h4>
        <div class="name-wrap" v-for="item in fileList" :key="item.title">
          <img class="icon-pass" src="@img/apply/icon-pass.png" alt="" />
          <p>{{ item.file && item.file.name }}</p>
        </div>
      </div>
      <div class="contact-wrap">
        <h4>我是通讯录</h4>
        <div class="contact-item" v-for="item in contactList" :key="item.id">
          <p>{{ item.displayName || item.familyName }}</p>
          <div class="phone-number-list">
            <p v-for="phone in item.phoneNumbers" :key="phone.id">{{ phone.value }}</p>
          </div>
        </div>
      </div>
      <div class="location-wrap">
        <h4>我是坐标</h4>
        <div>{{ location.latitude }}</div>
        <div>{{ location.longitude }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  h3 {
    font-size: 32px;
    padding: 30px;
  }
  .content-wrap {
    border-top: 1px solid #e2e2e2;
    .cell-wrap {
      .flex-row;
      justify-content: space-between;
      height: 63px;
      border-bottom: 1px solid #e2e2e2;
      padding: 0 30px;
      span {
        font-size: 15px;
      }
      .icon-pass {
        width: 26px;
        height: 26px;
      }

      .load-btn {
        width: 80px;
        height: 30px;
        color: #034078;
        background-color: #f0f0f0;
        padding: 0;
        .flex-row;
        gap: 10px;
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }
  .result-list {
    .contact-wrap {
      .contact-item {
        border-bottom: 1px solid #ccc;
      }
    }
    .file-wrap {
      .name-wrap {
        .flex-row;
        gap: 20px;
        color: var(--primary-color);
        .icon-pass {
          width: 26px;
        }
        p {
          color: var(--primary-color);
          margin: 0;
        }
      }
    }
  }
}
</style>
