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
      <el-table-column prop="title" :label="$t('menuPage.menuTitle')" width="180">
        <template #default="scope">{{
          translateRouteTitle(scope.row.name, scope.row.meta.title)
        }}</template>
      </el-table-column>
      <el-table-column prop="address" :label="$t('menuPage.routeName')">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="path" :label="$t('menuPage.routePath')" width="180" />
      <el-table-column prop="component" :label="$t('menuPage.component')" width="180" />

      <el-table-column prop="redirect" :label="$t('menuPage.redirect')">
        <template #default="scope">{{ scope.row.redirect }}</template>
      </el-table-column>
      <el-table-column prop="status_name" :label="$t('menuPage.status')" width="180" />
      <el-table-column prop="sort" :label="$t('menuPage.sort')" width="180" />

      <el-table-column prop="" label="操作" width="110px">
        <template #default="scope">
          <el-dropdown size="default" type="primary" @command="handleDropdownClick">
            <el-button type="primary" size="small" icon="Setting">
              操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="Plus" command="add">{{
                  $t('common.add')
                }}</el-dropdown-item>
                <el-dropdown-item icon="Edit" command="edit">{{
                  $t('common.edit')
                }}</el-dropdown-item>
                <el-dropdown-item icon="Delete" command="del">{{
                  $t('common.del')
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <AddEdit ref="addEdit" :menu="tableData" />
</template>
<script setup lang="ts">
import { translateRouteTitle } from '@/utils/i18n'
import { useMenuStore } from '@/store'
import AddEdit from './AddEdit.vue'
defineOptions({
  name: 'Menu',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const useMenu = useMenuStore()

const tableData = reactive<any[]>([])
const getMenu = async function () {
  const result: any = await useMenu.getMenu({})
  console.log('=======>>>', result)
  Object.assign(tableData, result.rows)
}
onMounted(() => {
  getMenu()
})

const addEdit: any = ref(null)
function handleDropdownClick(val: any) {
  if (['add', 'edit'].includes(val)) {
    addEdit.value.open(val)
  } else if (['del'].includes(val)) {
    console.log('删除')
  }
}
</script>

<style scoped lang="scss"></style>
