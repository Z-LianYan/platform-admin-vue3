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
    component: '组件',
    redirect: '重定向路由',
    status: '状态',
    sort: '排序',
    message: {
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
    },
  },
}
