export default {
  common: {
    tip: 'tip',
    logout: {
      btn: 'Logout',
      dialog_tip_describe: 'Are you sure to log out and exit the system?',
    },
    sure: 'Sure',
    cancel: 'Cancel',
    system_name: 'Shou Qian Bao Backend',
    edit: 'Edit',
    add: 'Add',
    del: 'Delete',
    yes: 'Yes',
    no: 'No',
    normal: 'Normal',
    disable: ' Disable',
    submit: 'Submit',
    reset: 'Reset',
  },
  route: {
    System: 'System set',
    Menu: 'Menu',
    Admin: 'Admin',
    Role: 'Role',
  },
  sizeSelect: {
    tooltip: 'Layout Size',
    default: 'Default',
    large: 'Large',
    small: 'Small',
    message: {
      success: 'Switch Layout Size Successful!',
    },
  },
  langSelect: {
    message: {
      success: 'Switch Language Successful!',
    },
  },
  settings: {
    project: 'Project Settings',
    theme: 'Theme',
    interface: 'Interface',
    navigation: 'Navigation',
    themeColor: 'Theme Color',
    tagsView: 'Tags View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo',
    watermark: 'Watermark',
    language: 'Language',
  },
  // 登录页面国际化
  login: {
    phone: 'admin account',
    password: 'Password',
    login: 'Login',
    captchaCode: 'Verify Code',
    capsLock: 'Caps Lock is On',
    message: {
      phone: {
        required: 'Please enter admin account',
      },
      password: {
        required: 'Please enter Password',
        min: 'The password can not be less than 6 digits',
      },
      captchaCode: {
        required: 'Please enter Verify Code',
      },
    },
  },
  menuPage: {
    menuTitle: 'Menu Title',
    routeName: 'Route Name',
    routePath: 'Route Path',
    routePathTip:
      'If it is a sub route, it cannot be added before/for example:/ How to write childrenRouter sub route errors',
    component: 'Component',
    componentTip:
      'The first level route is Layout. If there are sub routes for routes above the first level, their component paths are noComponent',
    redirect: 'Redirect Route',
    status: 'Status',
    sort: 'Sort',
    hidden: 'Hidden',
    alwaysShow: 'Always Show',
    alwaysShowTip: 'Does the parent menu always display when there is only one sub route',
    keepAlive: 'Cache',
    icon: 'Icon',
    affix: 'Affix',
    affixTip:
      'Explanation: TagsView preview history menu shows menus that have not been previewed before by default and cannot be closed',
    pid: 'Belonging Menu',
    message: {
      pid: {
        required: 'Please select the belonging menu',
      },
      title: {
        required: 'Please input menu title',
        limit: 'Length should be 1 to 20',
      },
      name: {
        required: 'Please input route name',
      },
      path: {
        required: 'Please input route path',
      },
      component: {
        required: 'Please input component path',
      },
      redirect: {
        required: 'Please input route redirect',
      },
      status: {
        required: 'Please select the status',
      },
      sort: {
        required: 'Please input sort',
      },
      hidden: {
        required: 'Please choose whether to hide or not',
      },
      alwaysShow: {
        required: 'Please choose whether to always show or not',
      },
      keepAlive: {
        required: 'Please choose whether to cache or not',
      },
      icon: {
        required: 'Please input icon',
      },
      affix: {
        required: 'Please choose whether to attach or not',
      },
    },
  },
}
