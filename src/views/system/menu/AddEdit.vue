<template>
  <el-drawer
    v-model="drawer"
    :title="['add'].includes(opType) ? $t('common.add') : $t('common.edit')"
    direction="rtl"
    :before-close="close"
    size="50%"
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
      <el-form-item :label="$t('menuPage.menuTitle')" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item :label="$t('menuPage.pid')" prop="pid">
        <el-cascader
          v-model="pids"
          :options="menuList"
          clearable
          :props="{
            multiple: false,
            label: 'label',
            value: 'id',
            children: 'children',
            checkStrictly: true, //checkStrictly = true 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的
            expandTrigger: 'click', //enum: 'click' | 'hover'
            emitPath: false,
          }"
          @change="handleCascaderChange"
        >
          <template #default="scope">
            {{
              // translateRouteTitle(scope.data.name, scope.data.meta.title)
              scope.data.meta.title
            }}
          </template>
        </el-cascader>
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
        <el-input type="number" v-model="ruleForm.sort" />
      </el-form-item>
      <el-form-item :label="$t('common.status')" prop="status">
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
      <el-form-item :label="$t('menuPage.adminPermission')" prop="">
        <el-select
          v-model="ruleForm.admin_ids"
          multiple
          filterable
          remote
          reserve-keyword
          :placeholder="$t('menuPage.adminPermissionPlaceholder')"
          :remote-method="adminIdsRemoteMethod"
          :loading="adminIdsLoading"
          style="width: 240px"
        >
          <el-option v-for="item in adminList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('menuPage.rolePermission')" prop="">
        <el-select
          v-model="ruleForm.role_ids"
          multiple
          filterable
          remote
          reserve-keyword
          :placeholder="$t('menuPage.rolePermissionPlaceholder')"
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
import _, { truncate } from 'lodash'
import { relative } from 'path-browserify'
const drawer = ref(false)
const opType = ref<string>('')
const { t, te } = useI18n()
defineOptions({
  name: 'MenuAddEdit',
  inheritAttrs: false, //控制是否继承父组件传递过来的属性
})
const topMenu = {
  children: [],
  component: '',
  created_at: '',
  delete_time: '',
  id: 0,
  meta: {
    title: '顶级菜单',
  },
  name: 'TopMenu',
  path: '',
  pid: 0,
  redirect: '',
  sort: 0,
  status: 0,
  status_name: '',
  updated_at: '',
  label: '顶级菜单',
  admin_ids: [],
  role_ids: [],
}
const useMenu = useMenuStore()
const props = defineProps({
  menu: {
    required: true,
    type: Array<any>,
    default: () => {
      return []
    },
  },
})

function recursionHanderMenu(menu: any[], disabledId: number = 0, pFlag: boolean = false) {
  for (const item of menu) {
    item.label = item.meta.title
    if (disabledId && (disabledId === item.id || pFlag)) {
      //编辑的时候，要编辑的数据如果有子菜单的话，要禁用子菜单(不能选择所属子菜单或者当前菜单)
      item.disabled = true
    }
    if (item.children?.length) {
      recursionHanderMenu(item.children, disabledId, item.disabled)
    }
  }
}
const menuList = ref<RouteRow[]>([])

const ruleFormRef = ref<FormInstance>()

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
  admin_ids: number[]
  role_ids: number[]
}
const pids = ref<number[]>([])
const originRuleForm = {
  title: '',
  name: '',
  path: '',
  component: '',
  redirect: '',
  status: 1,
  sort: 0,
  hidden: 0,
  alwaysShow: 0, //只有一个子路由时是否显示父级菜单
  keepAlive: 0,
  icon: '',
  affix: 0, //否一直显示在历史菜单不可关闭（TagsView中显示）
  pid: 0,
  id: 0,
  admin_ids: [],
  role_ids: [],
}
const ruleForm = reactive<RuleForm>(_.cloneDeep(originRuleForm))

watch(
  () => props.menu,
  (newMenu, oldMenu) => {
    menuList.value = _.cloneDeep(newMenu)
    if (ruleForm.name) {
      //处理编辑的时候，修改了所属菜单，更新修改后的数据
      menuList.value.unshift(topMenu)
      recursionHanderMenu(menuList.value, (ruleForm as any).id)
      pids.value = recursionMenu(menuList.value, ruleForm.pid)
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
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
    { min: 1, max: 20, message: t('menuPage.message.title.limit'), trigger: 'blur' },
  ],
  name: [
    {
      required: true,
      message: t('menuPage.message.name.required'),
      trigger: 'blur',
    },
  ],
  path: [
    {
      required: true,
      message: t('menuPage.message.path.required'),
      trigger: 'blur',
    },
  ],
  component: [
    {
      type: 'string',
      required: true,
      message: t('menuPage.message.component.required'),
      trigger: 'blur',
    },
  ],
  redirect: [
    {
      type: 'string',
      required: false,
      message: t('menuPage.message.redirect.required'),
      trigger: 'blur',
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
      trigger: 'blur',
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

/**
 * 递归查找选中的id
 * @param menu
 * @param filterId
 */
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
const open = async function ({
  op_type,
  row,
  fun,
  menu = [],
}: {
  op_type: string
  row: RouteRow
  fun: Function
  menu: RouteRow[]
}) {
  openFn.value = fun
  opType.value = op_type
  drawer.value = true
  menuList.value = _.cloneDeep(menu)
  menuList.value.unshift(topMenu)
  if (['edit'].includes(op_type)) {
    recursionHanderMenu(menuList.value, row.id)
    ruleForm.title = row?.meta?.title || ''
    ruleForm.alwaysShow = row?.meta?.alwaysShow || 0
    ruleForm.hidden = row?.meta?.hidden || 0
    ruleForm.icon = row?.meta?.icon || ''
    ruleForm.keepAlive = row?.meta?.keepAlive || 0
    ruleForm.affix = row?.meta?.affix || 0

    ruleForm.pid = row?.pid || 0
    ruleForm.name = row?.name || ''
    ruleForm.path = row?.path || ''
    ruleForm.component = row?.component || ''
    ruleForm.redirect = row?.redirect || ''
    ruleForm.status = row?.status && row?.status === 0 ? row?.status : 1
    ruleForm.sort = row?.sort || 0
    ruleForm.id = row?.id || 0
    ruleForm.admin_ids = row?.admin_ids || []
    ruleForm.role_ids = row?.role_ids || []

    pids.value = recursionMenu(menuList.value, row.pid)
    await getAdminList({
      keywords: '',
      need_ids: row.admin_ids || [],
    })
    await getRoleList({
      keywords: '',
      need_ids: row.role_ids || [],
    })
  } else {
    ruleForm.pid = row.id
    pids.value = recursionMenu(menuList.value, row.id)
    recursionHanderMenu(menuList.value)
  }
}
const close = function () {
  ruleForm.title = originRuleForm.title
  ruleForm.alwaysShow = originRuleForm.alwaysShow
  ruleForm.hidden = originRuleForm.hidden
  ruleForm.icon = originRuleForm.icon
  ruleForm.keepAlive = originRuleForm.keepAlive
  ruleForm.affix = originRuleForm.affix

  ruleForm.pid = originRuleForm.pid
  ruleForm.name = originRuleForm.name
  ruleForm.path = originRuleForm.path
  ruleForm.component = originRuleForm.component
  ruleForm.redirect = originRuleForm?.redirect
  ruleForm.status = originRuleForm?.status
  ruleForm.sort = originRuleForm?.sort
  ruleForm.id = originRuleForm?.id

  ruleForm.admin_ids = []
  ruleForm.role_ids = []

  drawer.value = false

  // resetForm(ruleFormRef.value)
}
onMounted(async () => {})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    console
    if (valid) {
      console.log('submit!', opType.value)
      // return
      if (['add'].includes(opType.value)) {
        await useMenu.addMenu(
          {
            ...ruleForm,
            sort: Number(ruleForm.sort),
            meta: {
              title: ruleForm.title,
              alwaysShow: ruleForm.alwaysShow,
              hidden: ruleForm.hidden,
              icon: ruleForm.icon,
              keepAlive: ruleForm.keepAlive,
              affix: ruleForm.affix,
            },
          },
          {
            loading: true,
          },
        )
      }

      if (['edit'].includes(opType.value)) {
        await useMenu.editMenu(
          {
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
          },
          {
            loading: true,
          },
        )
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

function handleCascaderChange(val: any) {
  ruleForm.pid = val
}

const useAdmin = useAdminStore()
const adminIdsLoading = ref<boolean>(false)
const adminList = ref<any>([])
async function getAdminList(param: { keywords: string; need_ids?: number[] }) {
  adminIdsLoading.value = true
  const result: any = await useAdmin.getList({
    keywords: param?.keywords || '',
    need_ids: param?.need_ids || [],
  })
  adminList.value = result.rows
  adminIdsLoading.value = false
}
function adminIdsRemoteMethod(query: string) {
  getAdminList({
    keywords: query,
    need_ids: ruleForm.admin_ids || [],
  })
}

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
    need_ids: ruleForm.role_ids || [],
  })
}
defineExpose({
  open,
})
</script>

<style scoped lang="scss"></style>
