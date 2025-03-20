<template>
  <el-card class="card-margin">
    <el-table
      :data="tableData"
      :border="true"
      stripe
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" :label="$t('menuPage.menuTitle', '菜单标题')" width="180">
        <template #default="scope">{{
          translateRouteTitle(scope.row.name, scope.row.meta.title)
        }}</template>
      </el-table-column>
      <el-table-column prop="address" :label="$t('menuPage.routeName', '路由名称')">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="path" :label="$t('menuPage.routePath', '路由路径')" width="180" />
      <el-table-column prop="component" :label="$t('menuPage.component')" width="180" />

      <el-table-column prop="redirect" :label="$t('menuPage.redirect', '重定向')">
        <template #default="scope">{{ scope.row.redirect }}</template>
      </el-table-column>
      <el-table-column prop="status_name" :label="$t('menuPage.status', '状态')" width="180">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" round>{{
            scope.row.status === 1 ? $t('common.normal', '正常') : $t('common.disable', '禁用')
          }}</el-tag>
        </template> </el-table-column
      >>
      <el-table-column prop="sort" :label="$t('menuPage.sort', '排序')" width="180" />

      <el-table-column prop="" :label="$t('common.operation', '操作')" width="110px">
        <template #default="scope">
          <el-dropdown
            size="default"
            type="primary"
            @command="handleDropdownClick($event, scope.row)"
          >
            <el-button type="primary" size="small" icon="Setting">
              {{ $t('common.operation', '操作')
              }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="Plus" command="add">{{
                  $t('common.add', '新增')
                }}</el-dropdown-item>
                <el-dropdown-item icon="Edit" command="edit">{{
                  $t('common.edit', '编辑')
                }}</el-dropdown-item>
                <el-dropdown-item icon="Delete" command="del">{{
                  $t('common.del', '删除')
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-button @click="getMenu">刷新</el-button>
  </el-card>

  <AddEdit ref="addEditRef" :menu="tableData" :getMenu="getMenu" />
</template>
<script setup lang="ts">
import { translateRouteTitle } from '@/utils/i18n'
import { useMenuStore } from '@/store'
import AddEdit from './AddEdit.vue'
import type { RouteRecordRaw } from 'vue-router'
defineOptions({
  name: 'Menu',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const useMenu = useMenuStore()

const tableData = reactive<any[]>([])
const getMenu = async function () {
  console.log('1234567')
  const result: any = await useMenu.getMenu({})
  console.log('=======>>>', result)
  Object.assign(tableData, result.rows)
}
onMounted(() => {
  getMenu()
})

const addEditRef: any = ref(null)
function handleDropdownClick(val: any, row: RouteRow) {
  if (['add', 'edit'].includes(val)) {
    addEditRef.value.open(val, row, async () => {
      console.log('我执行了====》〉》')
      await getMenu()
    })
  } else if (['del'].includes(val)) {
    console.log('删除')
  }
}
</script>

<style scoped lang="scss"></style>
