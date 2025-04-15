<template>
  <div class="sms flex items-end">
    <FormItem label="短信验证码" v-model="model" />
    <div class="btn">
      <Button shape="round" @click="handleSend" :disabled="disabled" :loading="loading">
        <template v-if="disabled">重新获取（{{ seconds }}s）</template>
        <template v-else>获取短信验证码</template>
      </Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { SmsApi } from '@/api/auth'
import FormItem from '@/components/FormItem/index.vue'
import useRequest from '@/hooks/useRequest'
import { escHTML, PhoneValidate } from '@/utils'
import { Button, message } from 'ant-design-vue'
import { ref } from 'vue'
const props = defineProps({
  captcha: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
})
const model = defineModel<string>()
const seconds = ref(0)
const disabled = ref(false)

const { request, loading } = useRequest(SmsApi, {
  manual: true,
  onSuccess(res) {
    message.success(`验证码为：${res}`)
    seconds.value = 60
    disabled.value = true
    const timer = setInterval(() => {
      seconds.value--
      if (seconds.value <= 0) {
        clearInterval(timer)
        disabled.value = false
      }
    }, 1000)
  },
})
function handleSend() {
  if (!props.phone) {
    message.error('请输入手机号')
    return
  }
  if (!PhoneValidate(props.phone)) {
    message.warn('请输入正确的手机号')
    return
  }
  if (!props.captcha) {
    message.error('请输入图形验证码')
    return
  }
  const captcha = escHTML(props.captcha)
  request({
    phone: props.phone,
    captcha_code: captcha,
  })
}
</script>
<style lang="less" scoped>
.btn {
  margin-bottom: 30px;

  :deep(.ant-btn) {
    height: 42px;
    &:disabled {
      background-color: #fff;
    }
  }
}
</style>
