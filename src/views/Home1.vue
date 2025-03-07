<template>
  <div>Home1</div>
  <div class="box">
    <!-- <div class="chil"></div> -->
    <div v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8]" :class="['chil']">
      <span>11111</span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'Home1',
  inheritAttrs: false,
})
onMounted(() => {
  // test();
  console.log('home1--------->>>')
})
</script>
<style scoped lang="scss">
// @use "../styles/variables.scss" as *;
.box {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: space-around;
  width: 200px;
  overflow-y: hidden;
  .chil {
    height: 50px;
    min-width: 500px;
    border: 1px solid blue;
  }
  // .p {
  //   background: red;
  // }
}

.custom-class {
  --el-tag-bg-color: blue;
}

.ptest {
  color: var(--el-color-primary);
}
</style>
