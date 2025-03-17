<template>
  <el-icon v-if="icon && icon.startsWith('el-icon')" class="sub-el-icon">
    <component :is="icon.replace('el-icon-', '')" />
  </el-icon>
  <i v-else-if="icon.startsWith('iconfont')" :class="[icon, 'sub-el-icon']"></i>
  <svg-icon v-else-if="icon" :icon-class="icon" />
  <svg-icon v-else icon-class="menu" />
  <span v-if="title" class="ml-1">{{ title }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.sub-el-icon {
  width: 14px !important;
  margin-right: 0 !important;
  font-size: 14px !important;
  color: currentcolor;
}

.hideSidebar {
  .el-sub-menu,
  .el-menu-item {
    .svg-icon,
    .sub-el-icon {
      margin-left: 20px;
    }
  }
}
</style>
