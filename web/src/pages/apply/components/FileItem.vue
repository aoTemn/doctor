<script setup>
import { ref, onMounted, watch, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useApplyStore } from '@/store/apply';
import { Form } from 'ant-design-vue';
import SelfieModal from './SelfieModal.vue';
import { base64ToFile } from '@/utils/camera';
const store = useApplyStore();
const formItemContext = Form.useInjectFormItemContext();
const props = defineProps({
  form: Object,
  item: Object,
});
const router = useRouter();
const emit = defineEmits(['change']);

const selfieRef = ref(null);

onMounted(() => {});

const fileList = computed(() => {
  console.log(props.form.key, store.applyForm, 'fileList');
  if (props.form[props.item.key]) {
    console.log([props.form[props.item.key]], 'fileList');
    return [props.form[props.item.key]];
  } else {
    return [];
  }
});

const deleteFile = () => {
  emit('change', { [props.item.key]: '' });
  formItemContext.onFieldChange();
};

const afterRead = file => {
  console.log(file, 'file');
  // emit('change', [file]);
  emit('change', { [props.item.key]: file });
  formItemContext.onFieldChange();
};

const handleUpload = () => {
  if (props.item.showSelfie) {
    showSelfie();
  } else if (props.item.showCamera) {
    handleCamera();
  }
};
const showSelfie = () => {
  selfieRef.value.showPopup();
};

const afterCamera = file => {
  emit('change', { [props.item.key]: file });
  formItemContext.onFieldChange();
};

const handleCamera = () => {
  navigator.camera.getPicture(
    imageUrl => {
      console.log(imageUrl, 'imageUrl');
      const imageFile = base64ToFile(imageUrl);
      console.log(imageFile, 'imageFile');
      afterCamera({ file: imageFile });
    },
    e => {
      console.log(e);
    },
    {
      destinationType: 0,
      cameraDirection: 0,
    }
  );
};

// watch(fileList, newV => {
//   console.log(newV.length);
//   if (newV.length) {
//     emit('change', newV);
//   }
// });
console.log(props.form.con);
</script>
<template>
  <div class="file-item">
    <div class="top-wrap">
      <p class="input-title">{{ item.title }}<span class="require" v-if="item.require">*</span></p>
      <div class="handle-item">
        <div v-if="item.showSelfie || item.showCamera" class="load-btn" type="default" @click="handleUpload">
          <img src="@img/apply/icon-upload.png" />
          <span>{{ $t('apply.Upload') }}</span>
        </div>
        <van-uploader v-else :preview-image="false" :value="fileList" :after-read="afterRead">
          <div class="load-btn" type="default">
            <img src="@img/apply/icon-upload.png" />
            <span>{{ $t('apply.Upload') }}</span>
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="con-wrap">
      <div class="con-list" v-if="fileList.length">
        <div class="con-item" v-for="item in fileList" :key="item.title">
          <div class="name-wrap">
            <img class="icon-pass" src="@img/apply/icon-pass.png" alt="" />
            <p>{{ item.file.name }}</p>
          </div>
          <img class="icon-delete" src="@img/apply/icon-delete.png" alt="" @click="deleteFile()" />
        </div>
      </div>
      <div class="empty-con" v-else>
        <img class="img" src="@img/apply/icon-issub.png" alt="" />
        <p>{{ $t('apply.noUpLoad') }}</p>
      </div>
    </div>
    <SelfieModal v-if="item.showSelfie" ref="selfieRef" :item="item" @afterCamera="afterCamera"></SelfieModal>
  </div>
</template>
<style scoped lang="less">
.file-item {
  .top-wrap {
    .flex-row;
    justify-content: space-between;
    .input-title {
      margin: 0;
      .require {
        color: red;
      }
    }
    .handle-item {
      .flex-row;
      .load-btn {
        width: 80px;
        height: 30px;
        color: #034078;
        background-color: #f0f0f0;
        padding: 0;
        .flex-row;

        font-size: 12px;
        border-radius: 5px;
        img {
          margin-right: 10px;
        }
      }
    }
  }
  .con-wrap {
    padding-top: 25px;
    .con-list {
      .con-item {
        .flex-row;
        justify-content: space-between;
        .name-wrap {
          .flex-row;

          color: var(--primary-color);
          .icon-pass {
            width: 26px;
            margin-right: 20px;
          }
          p {
            color: var(--primary-color);
            margin: 0;
          }
        }

        .icon-delete {
          width: 20px;
        }
      }
    }
    .empty-con {
      .flex-row;
      justify-content: flex-start;
      img {
        margin-right: 20px;
      }
    }
  }
}
</style>
