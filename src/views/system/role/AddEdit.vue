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
      <el-form-item :label="$t('adminRolePage.role_name')" prop="role_name">
        <el-input v-model="ruleForm.role_name" />
      </el-form-item>

      <el-form-item :label="$t('adminRolePage.remark')" prop="remark">
        <el-input v-model="ruleForm.remark" type="textarea" maxlength="150" />
      </el-form-item>

      <el-form-item :label="$t('common.status')" prop="status">
        <el-radio-group v-model="ruleForm.status" class="ml-4">
          <el-radio :label="1" size="large">{{ $t('common.normal') }}</el-radio>
          <el-radio :label="0" size="large">{{ $t('common.disable') }}</el-radio>
        </el-radio-group>
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
import { useMenuStore, useAdminStore, useAdminRoleStore } from '@/store'
import type { FormInstance, FormRules, TransferDataItem } from 'element-plus'
import { translateRouteTitle } from '@/utils/i18n'
import type { RouteRecordRaw } from 'vue-router'
import _, { truncate } from 'lodash'

const drawer = ref(false)
const opType = ref<string>('')
const { t, te } = useI18n()
defineOptions({
  name: 'RoleAddEdit',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})

const useAdminRole = useAdminRoleStore()
const props = defineProps({})

const ruleFormRef = ref<FormInstance>()

interface RuleForm {
  role_name: string
  remark: string
  id?: number
  status: number
}
const originRuleForm = {
  role_name: '',
  remark: '',
  status: 1,
  id: 0,
}
const ruleForm = reactive<RuleForm>(_.cloneDeep(originRuleForm))

const rules = reactive<FormRules<RuleForm>>({
  role_name: [
    {
      required: true,
      message: t('adminRolePage.message.role_name.required'),
      trigger: 'change',
    },
  ],
  remark: [
    { required: false, message: t('adminRolePage.message.remark.required'), trigger: 'blur' },
  ],

  status: [
    {
      type: 'number',
      required: true,
      message: t('adminRolePage.message.status.required'),
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
    ruleForm.role_name = row?.role_name || ''
    ruleForm.remark = row?.remark || 0
    ruleForm.status = row?.status

    ruleForm.id = row?.id || 0
  } else {
  }
}
const close = function () {
  ruleForm.role_name = originRuleForm.role_name
  ruleForm.remark = originRuleForm.remark
  ruleForm.status = originRuleForm.status
  ruleForm.id = originRuleForm.id

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
        await useAdminRole.add(ruleForm, {
          loading: true,
        })
      }

      if (['edit'].includes(opType.value)) {
        await useAdminRole.edit(ruleForm, {
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

defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>
