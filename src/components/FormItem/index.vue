<template>
  <div class="phone formItem relative flex items-end" :class="{ fixedLabel: focus || model }">
    <div class="label absolute" :class="{ fixedLabel: false }">{{ label }}</div>
    <Input
      autoComplete="new-password"
      :bordered="false"
      allowClear
      v-if="type === 'text'"
      v-model:value="model"
      @focus="handleFocus"
      @blur="handleBlur"
      v-bind="$attrs"
    />
    <InputPassword
      autoComplete="new-password"
      type="password"
      :bordered="false"
      allowClear
      :maxlength="20"
      v-else
      v-model:value="model"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>
<script lang="ts" setup>
import { Input, InputPassword } from 'ant-design-vue'
import { ref } from 'vue'
defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})
const model = defineModel<string>()
const focus = ref(false)

function handleFocus() {
  focus.value = true
}
function handleBlur() {
  focus.value = false
}
</script>
<style lang="less" scoped>
.formItem {
  border-bottom: 2px solid #59bfbd;
  height: 60px;
  margin-bottom: 30px;
}
:deep(.ant-input) {
  color: #fff;
  font-size: 20px !important;
  height: 30px;
}
.label {
  transition: all 0.3s;
  bottom: 0;
  left: 11px;
  color: #59bfbd;
}
.fixedLabel {
  .label {
    bottom: 30px;
  }
}
</style>
