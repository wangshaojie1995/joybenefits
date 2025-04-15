<template>
  <div class="captcha flex items-end">
    <FormItem label="图片验证码" v-model="model" />
    <img
      @click="handleRefresh"
      :src="`https://login.kcallme.com/Login/login/imgCode.do?timestap=${timestamp}`"
    />
  </div>
</template>
<script lang="ts" setup>
import FormItem from '@/components/FormItem/index.vue'
import { ref } from 'vue'
const model = defineModel<string>()
const timestamp = ref(Date.now())
function handleRefresh() {
  timestamp.value = Date.now()
}
</script>
<style lang="less" scoped>
img {
  width: 124px;
  height: 42px;
  border-radius: 30px;
  margin-bottom: 30px;
}
</style>
