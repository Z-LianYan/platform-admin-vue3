<template>
  <el-drawer
    v-model="drawer"
    :title="['add'].includes(type) ? $t('common.add') : $t('common.edit')"
    direction="rtl"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item :label="$t('menuPage.menuTitle')" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.routeName')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.routePath')" prop="path">
        <el-input v-model="ruleForm.path" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.component')" prop="component">
        <el-input v-model="ruleForm.component" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.redirect')" prop="redirect">
        <el-input v-model="ruleForm.redirect" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.status')" prop="status">
        <el-input v-model="ruleForm.status" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.sort')" prop="sort">
        <el-input v-model="ruleForm.sort" />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { useMenuStore } from '@/store'
import type { FormInstance, FormRules } from 'element-plus'
const drawer = ref(false)
const type = ref<string>('')
const { t, te } = useI18n()
defineOptions({
  name: 'MenuAddEdit',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const useMenu = useMenuStore()

const formSize = ref<any>('default')

interface RuleForm {
  title: string
  name: string
  path: string
  component: string
  redirect: string
  status: number
  sort: number
}
const ruleForm = reactive<RuleForm>({
  title: 'Hello',
  name: '',
  path: '',
  component: '',
  redirect: '',
  status: 0,
  sort: 0,
})
const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: t('menuPage.message.title.required'), trigger: 'blur' },
    { min: 3, max: 5, message: t('menuPage.message.title.limit'), trigger: 'blur' },
  ],
  name: [
    {
      required: true,
      message: t('menuPage.message.name.required'),
      trigger: 'change',
    },
  ],
  path: [
    {
      required: true,
      message: t('menuPage.message.path.required'),
      trigger: 'change',
    },
  ],
  component: [
    {
      type: 'date',
      required: true,
      message: t('menuPage.message.component.required'),
      trigger: 'change',
    },
  ],
  redirect: [
    {
      type: 'date',
      required: true,
      message: t('menuPage.message.redirect.required'),
      trigger: 'change',
    },
  ],
  status: [
    {
      type: 'array',
      required: true,
      message: t('menuPage.message.status.required'),
      trigger: 'change',
    },
  ],
  sort: [
    {
      required: true,
      message: t('menuPage.message.sort.required'),
      trigger: 'change',
    },
  ],
})
const open = function (op_type: string) {
  type.value = op_type
  drawer.value = true
}
const close = function () {
  drawer.value = true
}
onMounted(() => {})
function handleClose(val: any) {
  drawer.value = false
}

defineExpose({
  open,
  close,
})
</script>

<style scoped lang="scss"></style>
