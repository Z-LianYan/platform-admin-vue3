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
          @keyup.enter.native="getList"
          v-model="fetchOptions.keywords"
          :placeholder="$t('adminRolePage.listFilterForm.k_s_placeholder')"
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
    <el-button type="text" @click="add" icon="plus" style="float: right">{{
      $t('common.add', '新增')
    }}</el-button>
    <el-table v-loading="loading" :data="tableData" :border="true" stripe style="width: 100%">
      <el-table-column
        prop="role_name"
        :label="$t('adminRolePage.role_name', '名称')"
        mini-width="110"
      >
        <template #default="scope">
          <CustomInput
            :key="scope.row.role_name"
            v-model="scope.row.role_name"
            placeholder="点击输入内容"
            @change="handleConfirm($event, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="remark" :label="$t('adminRolePage.remark', '备注')" min-width="110">
        <template #default="scope">
          <CustomInput
            :key="scope.row.remark"
            v-model="scope.row.remark"
            placeholder="点击输入内容"
            @change="handleConfirm($event, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="status_name" :label="$t('common.status', '状态')" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'info'" round>{{
            scope.row.status === 1 ? $t('common.normal', '正常') : $t('common.disable', '禁用')
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="created_at" :label="$t('common.created_at', '创建时间')">
        <template #default="scope">{{
          scope.row.created_at ? dayjs(scope.row.created_at).format('YYYY-MM-DD HH:mm:ss') : ''
        }}</template>
      </el-table-column>
      <el-table-column prop="updated_at" :label="$t('common.updated_at', '更新时间')">
        <template #default="scope">{{
          scope.row.updated_at ? dayjs(scope.row.updated_at).format('YYYY-MM-DD HH:mm:ss') : ''
        }}</template>
      </el-table-column>

      <el-table-column prop="" :label="$t('common.operation', '操作')" width="160px">
        <template #default="scope">
          <el-button type="text" @click="edit(scope.row)" icon="edit">{{
            $t('common.edit', '编辑')
          }}</el-button>
          <el-button type="text" @click="del(scope.row)" style="color: #e6a23c" icon="delete">{{
            $t('common.del', '删除')
          }}</el-button>
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

  <AddEdit ref="addEditRef" />
</template>
<script setup lang="ts">
import { useAdminRoleStore } from '@/store'
import AddEdit from './AddEdit.vue'
import dayjs from 'dayjs'
const { t, te } = useI18n()
defineOptions({
  name: 'Role',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const useAdminRole = useAdminRoleStore()
const total = ref<number>(0)
const fetchOptions = reactive({
  page: 1,
  limit: 20,
  keywords: '',
})
const loading = ref<boolean>(false)
const tableData = ref<RouteRow[]>([])
const getList = async function () {
  loading.value = true
  const result: any = await useAdminRole.getList(fetchOptions)
  tableData.value = result.rows
  loading.value = false

  total.value = result.count
}

onMounted(() => {
  getList()
})

const addEditRef: any = ref(null)
function add() {
  addEditRef.value.open({
    op_type: 'add',
    fun: async () => {
      await getList()
    },
  })
}
function edit(row: any) {
  addEditRef.value.open({
    op_type: 'edit',
    row,
    fun: async () => {
      await getList()
    },
  })
}

function del(row: any) {
  ElMessageBox.confirm(t('common.delConfirm.describe'), t('common.delConfirm.title'), {
    confirmButtonText: t('common.sure'),
    cancelButtonText: t('common.cancel'),
    type: 'warning',
  })
    .then(async () => {
      await useAdminRole.del(
        {
          id: row.id,
        },
        {
          loading: true,
        },
      )
      getList()
    })
    .catch(() => {})
}
function handleSizeChange(val: number) {
  fetchOptions.limit = val
  getList()
}
function handleCurrentChange(val: number) {
  fetchOptions.page = val
  getList()
}
function onFilter() {
  getList()
}

async function handleConfirm(val: string, row: any) {
  try {
    await useAdminRole.edit(row, {
      loading: true,
    })
  } catch (err) {
    getList()
  } finally {
    // getList()
  }
}
</script>

<style scoped lang="scss"></style>
