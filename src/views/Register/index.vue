<template>
  <LoginOrRegister title="注册">
    <div class="register">
      <FormItem label="用户名" v-model="form.username" :maxlength="20" />
      <FormItem label="手机号" v-model="form.phone" :maxlength="11" />
      <FormItem label="密码" v-model="form.password" />
      <FormItem label="确认密码" v-model="form.confirm_password" />
      <Captcha v-model="form.captcha" />
      <SmsCode v-model="form.sms" :captcha="form.captcha" :phone="form.phone" />
      <div class="btn text-center">
        <Button type="primary" shape="round" @click="handleRegister">立即注册</Button>
      </div>
      <div class="control flex justify-between items-center">
        <div class="cursor-pointer" @click="handleLogin">已有账号？立即登录</div>
      </div>
    </div>
  </LoginOrRegister>
</template>
<script lang="ts" setup>
import Captcha from '@/components/Captcha.vue'
import FormItem from '@/components/FormItem/index.vue'
import LoginOrRegister from '@/components/LoginOrRegister/index.vue'
import SmsCode from '@/components/SmsCode.vue'
import { escHTML, PasswordValidate, PhoneValidate, UsernameValidate } from '@/utils'
import { Button, message } from 'ant-design-vue'
import { Md5 } from 'ts-md5'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = reactive({
  username: '',
  phone: '',
  password: '',
  confirm_password: '',
  captcha: '',
  sms: '',
})
function handleRegister() {
  if (!form.username) {
    message.error('请输入用户名')
    return
  }
  if (!UsernameValidate(form.username)) {
    message.error('用户名格式错误,请输入6-20位字符')
    return
  }
  if (!form.phone) {
    message.error('请输入手机号')
    return
  }
  if (!form.password) {
    message.error('请输入密码')
    return
  }
  if (!form.confirm_password) {
    message.error('请输入确认密码')
    return
  }
  if (form.password !== form.confirm_password) {
    message.error('两次密码不一致')
    return
  }
  if (!form.sms) {
    message.warn('请输入短信验证码')
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
  const encryptedPassword = Md5.hashStr(form.password)
  const validatedUsername = escHTML(form.username)
  // TODO: 验证码也 escHTML
}
function handleLogin() {
  router.push({
    name: 'login',
  })
}
</script>
<style lang="less" scoped>
.register {
  background-image: url(https://login.kcallme.com/Login/webapp/images/login_black_downcolor.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 420px;
  margin: 0 auto;
  padding: 20px 40px;
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
}
</style>
