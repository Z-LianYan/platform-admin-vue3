import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

export default {
  common: {
    tip: '提示',
    logout: {
      btn: '注销登出',
      dialog_tip_describe: '确定注销并退出系统吗？',
    },
    sure: '确定',
    cancel: '取消',
    system_name: '收钱宝后台',
    edit: '编辑',
    add: '新增',
    del: '删除',
    yes: '是',
    no: '否',
    normal: '正常',
    disable: '禁用',
    submit: '提交',
    reset: '重置',
    filter: '筛选',
    operation: '操作',
    keywords: '关键字搜索',
  },
  route: {
    System: '系统设置',
    Menu: '菜单',
    Admin: '管理员',
    Role: '角色',
  },
  sizeSelect: {
    tooltip: '布局大小',
    default: '默认',
    large: '大型',
    small: '小型',
    message: {
      success: '切换布局大小成功！',
    },
  },
  langSelect: {
    message: {
      success: '切换语言成功！',
    },
  },
  settings: {
    project: '项目配置',
    theme: '主题设置',
    interface: '界面设置',
    navigation: '导航设置',
    themeColor: '主题颜色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo',
    watermark: '开启水印',
    language: '语言设置',
  },
  // 登录页面国际化
  login: {
    phone: '管理员账号',
    password: '密码',
    login: '登 录',
    captchaCode: '验证码',
    capsLock: '大写锁定已打开',
    message: {
      phone: {
        required: '请输入管理员账号',
      },
      password: {
        required: '请输入密码',
        min: '密码不能少于6位',
      },
      captchaCode: {
        required: '请输入验证码',
      },
    },
  },

  menuPage: {
    menuTitle: '菜单标题',
    routeName: '路由名称',
    routePath: '路由路径',
    routePathTip: '如果是子路由 前面不得加 / 如：/childrenRouter 子路由错误的写法',
    component: '组件',
    componentTip: '一级路由为 Layout， 如果一级以上的路由有子路由，那么其组件路径为 noComponent',
    redirect: '重定向路由',
    status: '状态',
    sort: '排序',
    hidden: '隐藏',
    alwaysShow: '始终显示',
    alwaysShowTip: '只有一个子路由时，是否始终显示父级菜单',
    keepAlive: '缓存',
    icon: '图标',
    affix: '附上',
    affixTip: '释：tagsView 预览历史菜单上没预览过的菜单默认显示且不可关闭',
    pid: '所属菜单',
    listFilterForm: {
      k_s_placeholder: '搜索菜单标题',
    },
    rolePermission: '角色权限',
    adminPermission: '管理员权限',
    adminPermissionPlaceholder: '请选择授权管理员',
    rolePermissionPlaceholder: '请选择授权角色',
    message: {
      pid: {
        required: '请选择所属菜单',
      },
      title: {
        required: '请输入菜单标题',
        limit: '长度应为1到20',
      },
      name: {
        required: '请输入路由名称',
      },
      path: {
        required: '请输入路由路径',
      },
      component: {
        required: '请输入组件路径',
      },
      redirect: {
        required: '请输入路由重定向',
      },
      status: {
        required: '请选择状态',
      },
      sort: {
        required: '请输入排序',
      },
      hidden: {
        required: '请选择是否隐藏',
      },
      alwaysShow: {
        required: '请选择是否始终显示',
      },
      keepAlive: {
        required: '请选择是否缓存',
      },
      icon: {
        required: '请输入图标',
      },
      affix: {
        required: '请选择是否附上',
      },
    },
  },
}
