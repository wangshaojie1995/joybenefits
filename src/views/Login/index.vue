<template>
  <LoginOrRegister title="登录" btn="立即登录">
    <div class="main">
      <FormItem label="手机号" v-model="form.phone" :maxlength="11" />
      <template v-if="isSms">
        <Captcha v-model="form.captcha" />
        <SmsCode v-model="form.sms" :captcha="form.captcha" :phone="form.phone" />
      </template>
      <FormItem label="密码" v-model="form.password" type="password" v-else />
      <div class="btn text-center">
        <Button type="primary" shape="round" @click="login">立即登录</Button>
      </div>
      <div class="control flex justify-between items-center">
        <div class="cursor-pointer" @click="handleChangeSms">
          {{ isSms ? '密码登录' : '短信登录' }}
        </div>
        <div class="cursor-pointer register" @click="handleRegister">立即注册</div>
      </div>
    </div>
  </LoginOrRegister>
</template>
<script lang="ts" setup>
import Captcha from '@/components/Captcha.vue'
import FormItem from '@/components/FormItem/index.vue'
import LoginOrRegister from '@/components/LoginOrRegister/index.vue'
import SmsCode from '@/components/SmsCode.vue'
import { PasswordValidate, PhoneValidate } from '@/utils'
import { Button, message } from 'ant-design-vue'
import { Md5 } from 'ts-md5'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  phone: '',
  password: '',
  captcha: '',
  sms: '',
})
// 短信登录标识
const isSms = ref(false)
function login() {
  console.log(form)
  if (!form.phone) {
    message.error('请输入手机号')
    return
  }
  if (!form.password) {
    message.error('请输入密码')
    return
  }
  if (!PhoneValidate(form.phone)) {
    message.warn('请输入正确的手机号')
    return
  }
  if (!PasswordValidate(form.password)) {
    message.warn('密码格式错误,8-20位大小写字母数字格式')
    return
  }
  if (isSms.value && !form.sms) {
    message.warn('请输入短信验证码')
    return
  }
  const encryptedPassword = Md5.hashStr(form.password)
}
function handleRegister() {
  router.push({
    name: 'register',
  })
}
function handleChangeSms() {
  isSms.value = !isSms.value
}
</script>
<style lang="less" scoped>
.main {
  margin: 0 auto;
  width: 420px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  padding: 60px 40px;
  border: 1px solid #55bfbd;
}
.btn {
  margin-top: 30px;

  :deep(.ant-btn) {
    width: 140px;
    height: 42px;
    background-color: rgba(255, 116, 39, 1);
    &:hover {
      background-color: rgba(255, 116, 39, 0.9);
    }
  }
}
.control {
  color: #59bfbd;
  font-size: 18px;
  line-height: 40px;
  margin-top: 20px;

  .register {
    color: rgba(175, 172, 196, 1);
  }
}
</style>
