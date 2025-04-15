<template>
  <div class="login w-full">
    <div class="title text-center">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  btn: String,
})
</script>
<style lang="less" scoped>
.login {
  background-image: url(@/assets/images/bg.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100%;
  padding: 40px 0;
}
.title {
  font-size: 30px;
  font-weight: 500;
  padding-bottom: 36px;
}
</style>
