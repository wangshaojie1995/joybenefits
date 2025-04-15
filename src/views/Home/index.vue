<template>
  <div class="user">当前登录用户{{ data?.username }}</div>

  <RouterLink to="/login"><Button type="primary">登录</Button></RouterLink
  >&nbsp;&nbsp;&nbsp;
  <RouterLink to="/register"><Button>注册</Button></RouterLink>
</template>
<script lang="ts" setup>
import { UserApi } from '@/api/auth'
import useRequest from '@/hooks/useRequest'
import { Button } from 'ant-design-vue'

const { data } = useRequest(UserApi, {
  manual: false,
})
</script>
<style lang="less" scoped>
.user {
  color: #000;
  font-size: 40px;
}
</style>
