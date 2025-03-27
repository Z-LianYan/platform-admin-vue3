<template>
  <el-card>
    <el-form
      :model="fetchOptions"
      label-width="130px"
      class="demo-ruleForm"
      size="default"
      status-icon
      @submit.native.prevent
    >
      <el-form-item :label="$t('common.keywords')" prop="title">
        <el-input
          @keyup.enter.native="getMenu"
          v-model="fetchOptions.keywords"
          :placeholder="$t('menuPage.listFilterForm.k_s_placeholder')"
        />
      </el-form-item>
      <el-form-item label="" prop="">
        <el-button native-type="button" type="primary" @click="onFilter">{{
          $t('common.filter')
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="card-margin">
    <el-table
      v-loading="loading"
      :data="tableData"
      :border="true"
      stripe
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" :label="$t('menuPage.menuTitle', '菜单标题')" width="220">
        <template #default="scope">
          <el-icon
            v-if="scope.row.meta?.icon && scope.row.meta.icon.startsWith('el-icon')"
            class="sub-el-icon"
          >
            <component :is="scope.row.meta.icon.replace('el-icon-', '')" />
          </el-icon>
          <i
            v-else-if="scope.row.meta.icon.startsWith('iconfont')"
            :class="[scope.row.meta.icon, 'sub-el-icon']"
          ></i>
          <svg-icon v-else-if="scope.row.meta.icon" :icon-class="scope.row.meta.icon" />
          <svg-icon v-else icon-class="menu" />
          {{ scope.row.meta.title }}
        </template>
      </el-table-column>
      <el-table-column prop="address" :label="$t('menuPage.routeName', '路由名称')">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="path" :label="$t('menuPage.routePath', '路由路径')" width="180" />
      <el-table-column prop="component" :label="$t('menuPage.component', '组件')" width="180" />

      <el-table-column prop="redirect" :label="$t('menuPage.redirect', '重定向')">
        <template #default="scope">{{ scope.row.redirect }}</template>
      </el-table-column>
      <el-table-column prop="sort" :label="$t('menuPage.sort', '排序')" width="80" />
      <el-table-column prop="status_name" :label="$t('common.status', '状态')" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" round>{{
            scope.row.status === 1 ? $t('common.normal', '正常') : $t('common.disable', '禁用')
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="" :label="$t('common.operation', '操作')" width="140px">
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
    <el-pagination
      style="justify-content: center; margin-top: 20px"
      v-model:current-page="fetchOptions.page"
      v-model:page-size="fetchOptions.limit"
      :page-sizes="[20, 50, 100, 500]"
      :small="false"
      :disabled="false"
      :background="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <AddEdit ref="addEditRef" :menu="tableData" />
</template>
<script setup lang="ts">
import { translateRouteTitle } from '@/utils/i18n'
import { useMenuStore } from '@/store'
import AddEdit from './AddEdit.vue'
import type { RouteRecordRaw } from 'vue-router'
import { filterOption } from 'element-plus/es/components/mention/src/helper.mjs'
import router from '@/router'
defineOptions({
  name: 'Menu',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const useMenu = useMenuStore()
const total = ref<number>(0)
const fetchOptions = reactive({
  page: 1,
  limit: 20,
  keywords: '',
})
const loading = ref<boolean>(false)
const tableData = ref<RouteRow[]>([])
const getMenu = async function () {
  loading.value = true
  const result: any = await useMenu.getMenu(fetchOptions)
  console.log('result=====>>>', result)
  tableData.value = result.rows
  loading.value = false

  total.value = result.count
}

onMounted(() => {
  getMenu()
})

const addEditRef: any = ref(null)
function handleDropdownClick(val: any, row: RouteRow) {
  if (['add', 'edit'].includes(val)) {
    addEditRef.value.open({
      op_type: val,
      row,
      fun: async () => {
        await getMenu()
      },
      menu: tableData.value,
    })
  } else if (['del'].includes(val)) {
    console.log('删除')
  }
}
function handleSizeChange(val: number) {
  console.log('handleSizeChange====>>', val)
  fetchOptions.limit = val
  getMenu()
}
function handleCurrentChange(val: number) {
  console.log('handleCurrentChange====>>', val)
  fetchOptions.page = val
  getMenu()
}
function onFilter() {
  getMenu()
}
</script>

<style scoped lang="scss"></style>
