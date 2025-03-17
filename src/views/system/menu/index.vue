<template>
  <el-card class="card-margin">
    <el-table :data="tableData" :border="true" stripe style="width: 100%">
      <el-table-column prop="title" label="菜单名称" width="180">
        <template #default="scope">{{ scope.row.meta.title }}</template>
      </el-table-column>
      <el-table-column prop="address" label="路由名称">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="path" label="路由路径" width="180" />
      <el-table-column prop="component" label="组件" width="180" />

      <el-table-column prop="redirect" label="重定向">
        <template #default="scope">{{ scope.row.redirect }}</template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column prop="status" label="状态" width="180" />

      <el-table-column prop="" label="操作">
        <template #default="scope">
          <el-button type="text" size="small" icon="Plus">新增</el-button>
          <el-button type="text" size="small" icon="Edit">编辑</el-button>
          <el-button type="danger" size="small" link icon="Delete">删除</el-button>
          <!-- <el-dropdown size="small">
            <el-button type="primary">
              操作菜单<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
import { useMenuStore } from '@/store'

defineOptions({
  name: 'Menu',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const useMenu = useMenuStore()

const tableData = reactive([])
const getMenu = async function () {
  console.log('12345')
  const result: any = await useMenu.getMenu({})
  console.log('=======>>>', result)
  Object.assign(tableData, result.rows)
}
onMounted(() => {
  getMenu()
})
</script>

<style scoped lang="scss"></style>
