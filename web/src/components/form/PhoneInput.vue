<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/store/account';
import { useCommonStore } from '@/store';
const props = defineProps({
  form: Object,
  label: String,
  disabled: Boolean,
  formKey: {
    default: '',
    type: String,
  },
});

const emit = defineEmits(['change']);

const commonStore = useCommonStore();
const actionArr = computed(() => commonStore.countryCodeOptions);

const areaCodeKey = computed(() => (props.formKey ? props.formKey + 'AreaCode' : 'areaCode'));
const phoneKey = computed(() => (props.formKey ? props.formKey + 'Phone' : 'phone'));

console.log(props.form, 'props.form');

const changeArea = area => {
  console.log('changeCode', areaCodeKey.value, area.value);
  emit('change', { [areaCodeKey.value]: area.value });
};
const changePhone = e => {
  console.log(e.target.value, 'vaue');
  emit('change', { [phoneKey.value]: e.target.value });
};
console.log(props.form, 'form');
</script>
<template>
  <a-form-item
    :label="label"
    class="text-input"
    :name="phoneKey"
    :rules="[{ required: true, min: 8, max: 10, message: $t('common.inputTip2'), trigger: 'blur' }]"
  >
    <div class="phone-number">
      <div class="select-wrap">
        <!-- <a-select
          optionLabelProp="value"
          :options="actionArr"
          @change="changeArea"
          :value="form[areaCodeKey]"
        ></a-select> -->
        <van-button :disabled="disabled" v-if="disabled" class="phone-area">
          {{ '🇭🇰 ' + form[areaCodeKey] }}
        </van-button>
        <van-popover
          placement="bottom-start"
          class="popover-wrap"
          @select="changeArea"
          v-model:show="show"
          :actions="actionArr"
          v-else
        >
          <template #reference>
            <van-button class="phone-area">
              {{ '🇭🇰 ' + form[areaCodeKey] }}
            </van-button>
          </template>
        </van-popover>
      </div>
      <div class="input-wrap">
        <a-input :disabled="disabled" :value="form[phoneKey]" @input="changePhone" type="number" class="input" />
      </div>
    </div>
    <!-- <a-input :type="type" @input="onChange" :value="form[formKey]" class="input" /> -->
  </a-form-item>
</template>
<style scoped lang="less">
.ant-form-item {
  margin-bottom: 20px;

  :deep(.ant-form-item-label) {
    font-size: 14px;
    color: var(--font-color-h1);
    font-weight: 600;
  }

  :deep(.phone-number) {
    .flex-row;
    .select-wrap {
      height: 48px;
      width: 113px;
      background-color: #ededed;
      margin-right: 7px;
      border-radius: 10px;
      overflow: hidden;
      .popover-wrap {
        width: 300px;
      }
      .phone-area {
        width: 113px;
        height: 48px;
        background-color: #ededed;
        border: none;
      }
    }
    .input-wrap {
      background-color: #ededed;
      height: 48px;
      flex: 1;
      border-radius: 10px;
    }
  }
}
</style>

<style lang="less">
.popover-wrap {
  .van-popover__content {
    width: 200px;
    overflow: scroll;
    .van-popover__action {
      width: 100%;
      .van-popover__action-text {
        justify-content: flex-start;
      }
    }
  }
}
</style>
