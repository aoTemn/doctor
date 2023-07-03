<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { reactive } from 'vue';
import { TextInput } from '@/components';
const router = useRouter();
const route = useRoute();

let form = reactive({
  password: '',
  passwordConfirm: '',
});
const changeForm = form_ => {
  Object.assign(form, { ...form_ });
};
const goRegister = () => {
  router.push({ name: 'apply-tip' });
};
</script>
<template>
  <div class="wrap go-register">
    <GoBack />
    <div class="wrap-content">
      <h3>設置密碼</h3>
      <div class="form-wrap">
        <TextInput :form="form" formKey="password" label="密碼" @change="changeForm"></TextInput>
        <TextInput :form="form" formKey="passwordConfirm" label="再次輸入密碼" @change="changeForm"></TextInput>

        <van-button @click="goRegister" class="btn">登记</van-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.go-register {
  .wrap-content {
    margin-top: 76px;

    h3 {
      margin-bottom: 5px;
    }
    .form-wrap {
      margin-top: 25px;
    }
    .btn {
      margin-top: 75px;
    }
  }
}
</style>
