<template>
  <el-drawer
    v-model="drawer"
    :title="['add'].includes(type) ? $t('common.add') : $t('common.edit')"
    direction="rtl"
    :before-close="handleClose"
    size="50%"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item :label="$t('menuPage.pid')" prop="pid">
        <el-cascader
          v-model="pids"
          :options="menu"
          clearable
          :props="{
            multiple: false,
            label: 'name',
            value: 'id',
            children: 'children',
            checkStrictly: true, //checkStrictly = true 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的
            expandTrigger: 'click', //enum: 'click' | 'hover'
            emitPath: false,
          }"
          @change="handleCascaderChange"
        >
          <template #default="scope">
            {{ translateRouteTitle(scope.data.name, scope.data.meta.title) }}
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item :label="$t('menuPage.menuTitle')" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.routeName')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="" prop="path">
        <template #label>
          <div>
            {{ $t('menuPage.routePath') }}
            <el-popover
              placement="top-start"
              title=""
              :width="200"
              trigger="hover"
              :content="$t('menuPage.routePathTip')"
            >
              <template #reference>
                <el-icon><QuestionFilled /></el-icon>
              </template>
            </el-popover>
          </div>
        </template>
        <el-input v-model="ruleForm.path" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.component')" prop="component">
        <template #label>
          <div>
            {{ $t('menuPage.component') }}
            <el-popover
              placement="top-start"
              title=""
              :width="300"
              trigger="hover"
              :content="$t('menuPage.componentTip')"
            >
              <template #reference>
                <el-icon><QuestionFilled /></el-icon>
              </template>
            </el-popover>
          </div>
        </template>
        <el-input v-model="ruleForm.component" style="width: 90%">
          <template #prepend>src/views</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('menuPage.redirect')" prop="redirect">
        <el-input v-model="ruleForm.redirect" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.icon')" prop="icon">
        <el-input v-model="ruleForm.icon" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.sort')" prop="sort">
        <el-input v-model="ruleForm.sort" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.status')" prop="status">
        <!-- <el-input v-model="ruleForm.status" /> -->
        <el-radio-group v-model="ruleForm.status" class="ml-4">
          <el-radio :label="1" size="large">{{ $t('common.normal') }}</el-radio>
          <el-radio :label="0" size="large">{{ $t('common.disable') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('menuPage.hidden')" prop="hidden">
        <el-radio-group v-model="ruleForm.hidden" class="ml-4">
          <el-radio :label="1" size="large">{{ $t('common.yes') }}</el-radio>
          <el-radio :label="0" size="large">{{ $t('common.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="alwaysShow">
        <template #label>
          <div>
            {{ $t('menuPage.alwaysShow') }}
            <el-popover
              placement="top-start"
              title=""
              width="auto"
              trigger="hover"
              :content="$t('menuPage.alwaysShowTip')"
            >
              <template #reference>
                <el-icon><QuestionFilled /></el-icon>
              </template>
            </el-popover>
          </div>
        </template>
        <el-radio-group v-model="ruleForm.alwaysShow" class="ml-4">
          <el-radio :label="1" size="large">{{ $t('common.yes') }}</el-radio>
          <el-radio :label="0" size="large">{{ $t('common.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('menuPage.keepAlive')" prop="keepAlive">
        <el-radio-group v-model="ruleForm.keepAlive" class="ml-4">
          <el-radio :label="1" size="large">{{ $t('common.yes') }}</el-radio>
          <el-radio :label="0" size="large">{{ $t('common.no') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('menuPage.affix')" prop="affix">
        <template #label>
          <div>
            {{ $t('menuPage.affix') }}
            <el-popover
              placement="top-start"
              title=""
              :width="300"
              trigger="hover"
              :content="$t('menuPage.affixTip')"
            >
              <template #reference>
                <el-icon><QuestionFilled /></el-icon>
              </template>
            </el-popover>
          </div>
        </template>
        <el-radio-group v-model="ruleForm.affix" class="ml-4">
          <el-radio :label="1" size="large">{{ $t('common.yes') }}</el-radio>
          <el-radio :label="0" size="large">{{ $t('common.no') }}</el-radio>
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
import { useMenuStore } from '@/store'
import type { FormInstance, FormRules } from 'element-plus'
import { translateRouteTitle } from '@/utils/i18n'
import type { RouteRecordRaw } from 'vue-router'
const drawer = ref(false)
const type = ref<string>('')
const { t, te } = useI18n()
defineOptions({
  name: 'MenuAddEdit',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const useMenu = useMenuStore()
const props = defineProps({
  menu: {
    required: true,
    type: Array<any>,
    default: () => {
      return []
    },
  },
  getMenu: {
    required: false,
    type: Function,
    default: () => {},
  },
})

const ruleFormRef = ref<FormInstance>()
const formSize = ref<any>('default')

interface RuleForm {
  title: string
  name: string
  path: string
  component: string
  redirect: string
  status: number
  sort: number
  hidden: number
  alwaysShow: number
  keepAlive: number
  icon: string
  affix: number
  pid: number
  id?: number
}
const pids = ref<number[]>([])
const ruleForm = reactive<RuleForm>({
  title: '',
  name: '',
  path: '',
  component: '',
  redirect: '',
  status: 1,
  sort: 0,
  hidden: 0,
  alwaysShow: 1, //只有一个子路由时是否显示父级菜单
  keepAlive: 1,
  icon: '',
  affix: 1, //否一直显示在历史菜单不可关闭（TagsView中显示）
  pid: 0,
  id: 0,
})
const rules = reactive<FormRules<RuleForm>>({
  pid: [
    {
      required: true,
      message: t('menuPage.message.pid.required'),
      trigger: 'change',
    },
  ],
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
      type: 'string',
      required: true,
      message: t('menuPage.message.component.required'),
      trigger: 'change',
    },
  ],
  redirect: [
    {
      type: 'string',
      required: false,
      message: t('menuPage.message.redirect.required'),
      trigger: 'change',
    },
  ],
  status: [
    {
      type: 'number',
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
  hidden: [
    {
      required: true,
      message: t('menuPage.message.hidden.required'),
      trigger: 'change',
    },
  ],
  alwaysShow: [
    {
      required: true,
      message: t('menuPage.message.alwaysShow.required'),
      trigger: 'change',
    },
  ],
  keepAlive: [
    {
      required: true,
      message: t('menuPage.message.keepAlive.required'),
      trigger: 'change',
    },
  ],
  icon: [
    {
      required: true,
      message: t('menuPage.message.icon.required'),
      trigger: 'change',
    },
  ],
  affix: [
    {
      required: true,
      message: t('menuPage.message.affix.required'),
      trigger: 'change',
    },
  ],
})

function recursionMenu(menu: RouteRow[], filterId: number) {
  let pids: number[] = []
  if (!menu.length) return pids
  for (const item of menu) {
    const _pids = recursionMenu(item.children, filterId)
    if (filterId == item.id) {
      pids.push(item.id)
    } else if (_pids?.length) {
      pids.push(...[item.id, ..._pids])
    }
  }
  return pids
}
const openFn = ref<Function>(() => {})
const open = function (op_type: string, row: RouteRow, fun: Function) {
  openFn.value = fun
  type.value = op_type
  drawer.value = true

  if (['edit'].includes(op_type)) {
    ruleForm.title = row?.meta?.title || ''
    ruleForm.alwaysShow = row?.meta?.alwaysShow || 1
    ruleForm.hidden = row?.meta?.hidden || 0
    ruleForm.icon = row?.meta?.icon || ''
    ruleForm.keepAlive = row?.meta?.keepAlive || 0
    ruleForm.affix = row?.meta?.affix || 0

    pids.value = recursionMenu(props.menu, row.pid)
    ruleForm.pid = row?.pid || 0
    ruleForm.name = row?.name || ''
    ruleForm.path = row?.path || ''
    ruleForm.component = row?.component || ''
    ruleForm.redirect = row?.redirect || ''
    ruleForm.status = row?.status || 1
    ruleForm.sort = row?.sort || 0
    ruleForm.id = row?.id || 0
  }
}
const close = function () {
  drawer.value = true
}
onMounted(() => {})
function handleClose(val: any) {
  drawer.value = false
}
// function addMenu() {}
async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      if (['add'].includes(type.value))
        useMenu.addMenu({
          ...ruleForm,
          meta: {
            title: ruleForm.title,
            alwaysShow: ruleForm.alwaysShow,
            hidden: ruleForm.hidden,
            icon: ruleForm.icon,
            keepAlive: ruleForm.keepAlive,
            affix: ruleForm.affix,
          },
        })

      if (['edit'].includes(type.value))
        useMenu.editMenu({
          ...ruleForm,
          ...ruleForm,
          meta: {
            title: ruleForm.title,
            alwaysShow: ruleForm.alwaysShow,
            hidden: ruleForm.hidden,
            icon: ruleForm.icon,
            keepAlive: ruleForm.keepAlive,
            affix: ruleForm.affix,
          },
        })
      // openFn.value()
      props.getMenu()
    } else {
      console.log('error submit!', fields)
    }
  })
}
function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
}

function handleCascaderChange(val: any) {
  ruleForm.pid = val
}

defineExpose({
  open,
  close,
})
</script>

<style scoped lang="scss"></style>
