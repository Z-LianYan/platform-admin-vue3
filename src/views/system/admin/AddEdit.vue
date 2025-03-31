<template>
  <el-drawer
    v-model="drawer"
    :title="['add'].includes(opType) ? $t('common.add') : $t('common.edit')"
    direction="rtl"
    :before-close="close"
    size="30%"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
      class="demo-ruleForm"
      size="default"
      status-icon
    >
      <el-form-item :label="$t('adminPage.name')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <el-form-item :label="$t('adminPage.phone')" prop="phone">
        <el-input v-model="ruleForm.phone" type="phone" maxlength="11" minlength="11" />
      </el-form-item>

      <el-form-item :label="$t('adminPage.password')" prop="phone">
        <el-input
          v-model="ruleForm.password"
          type="password"
          show-password
          maxlength="50"
          minlength="6"
        />
      </el-form-item>

      <el-form-item :label="$t('adminPage.role_id')" prop="role_id">
        <el-select
          v-model="ruleForm.role_id"
          filterable
          remote
          reserve-keyword
          :placeholder="$t('adminPage.role_id_placeholder')"
          :remote-method="roleIdsRemoteMethod"
          :loading="adminIdsLoading"
          style="width: 240px"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.role_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('common.status')" prop="status">
        <!-- <el-input v-model="ruleForm.status" /> -->
        <el-radio-group v-model="ruleForm.status" class="ml-4">
          <el-radio :label="1" size="large">{{ $t('common.normal') }}</el-radio>
          <el-radio :label="0" size="large">{{ $t('common.disable') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('adminPage.avatar')" prop="role_id">
        <QiniuUpload />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{ $t('common.submit') }}
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">{{ $t('common.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { useMenuStore, useAdminStore, useAdminRoleStore, useAppStore } from '@/store'
import type { FormInstance, FormRules, TransferDataItem } from 'element-plus'
import { translateRouteTitle } from '@/utils/i18n'
import type { RouteRecordRaw } from 'vue-router'
import _, { truncate } from 'lodash'

const drawer = ref(false)
const opType = ref<string>('')
const { t, te } = useI18n()
defineOptions({
  name: 'AdminAddEdit',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})

const useAdmin = useAdminStore()

const props = defineProps({})

const ruleFormRef = ref<FormInstance>()

interface RuleForm {
  name: string
  phone: string
  avatar: string
  status: number
  id?: number
  role_id?: string
  password?: string
}
const originRuleForm = {
  name: '',
  phone: '',
  avatar: '',
  status: 1,
  id: 0,
  role_id: '',
  password: '',
}
const ruleForm = reactive<RuleForm>(_.cloneDeep(originRuleForm))

const rules = reactive<FormRules<RuleForm>>({
  name: [
    {
      required: true,
      message: t('adminPage.message.name.required'),
      trigger: 'change',
    },
  ],
  phone: [{ required: true, message: t('adminPage.message.phone.required'), trigger: 'blur' }],
  avatar: [
    {
      required: true,
      message: t('adminPage.message.avatar.required'),
      trigger: 'blur',
    },
  ],
  role_id: [
    {
      required: true,
      message: t('adminPage.message.role_id.required'),
      trigger: 'blur',
    },
  ],

  status: [
    {
      type: 'number',
      required: true,
      message: t('adminPage.message.status.required'),
      trigger: 'change',
    },
  ],
})

const openFn = ref<Function>(() => {})
const open = async function ({ op_type, row, fun }: { op_type: string; row?: any; fun: Function }) {
  openFn.value = fun
  opType.value = op_type
  drawer.value = true
  if (['edit'].includes(op_type)) {
    ruleForm.name = row?.name || ''
    ruleForm.avatar = row?.avatar || 0
    ruleForm.phone = row?.phone || 0
    ruleForm.role_id = row?.role_id || ''
    ruleForm.status = row?.status || ''

    ruleForm.id = row?.id || 0

    await getRoleList({
      keywords: '',
      need_ids: row.role_ids || [],
    })
  } else {
  }
}
const close = function () {
  ruleForm.name = originRuleForm.name
  ruleForm.avatar = originRuleForm.avatar
  ruleForm.phone = originRuleForm.phone
  ruleForm.status = originRuleForm.status
  ruleForm.id = originRuleForm.id
  ruleForm.role_id = originRuleForm.role_id

  drawer.value = false
}

onMounted(async () => {})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!', opType.value)
      // return
      if (['add'].includes(opType.value)) {
        await useAdmin.add(ruleForm, {
          loading: true,
        })
      }

      if (['edit'].includes(opType.value)) {
        await useAdmin.edit(ruleForm, {
          loading: true,
        })
      }

      openFn.value()
    } else {
      console.log('error submit!', fields)
    }
  })
}
function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
}

const adminIdsLoading = ref<boolean>(false)

const useAdminRole = useAdminRoleStore()
const roleList = ref<any[]>([])
async function getRoleList(param: { keywords?: string; need_ids?: number[] }) {
  adminIdsLoading.value = true
  const result: any = await useAdminRole.getList({
    keywords: param?.keywords || '',
    need_ids: param?.need_ids || [],
  })
  roleList.value = result.rows
  adminIdsLoading.value = false
}

function roleIdsRemoteMethod(query: string) {
  getRoleList({
    keywords: query,
    need_ids: ruleForm.role_id ? [Number(ruleForm.role_id)] : [],
  })
}
defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>
