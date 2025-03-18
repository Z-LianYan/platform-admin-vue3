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
    del: 'delete',
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
    component: 'Component',
    redirect: 'Redirect Route',
    status: 'Status',
    sort: 'Sort',
    message: {
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
    },
  },
}
