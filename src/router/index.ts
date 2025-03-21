import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// export const Layout = () => import("@/layout/index.vue");
import Home from '../views/Home.vue'
import Home1 from '../views/Home1.vue'
import Layout from '@/layout/index.vue'
import Test from '../views/Test.vue'
import Test1 from '@/views/Test1.vue'
import Test2 from '@/views/Test2.vue'
import Test3 from '@/views/Test3.vue'
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home111',
    component: Layout,
    children: [],
    redirect: '/system/menu',
  },
  {
    path: '/test',
    name: 'Test',
    component: Layout,
    meta: {
      title: 'Layout布局',
      roles: ['ADMIN'],
      alwaysShow: true,
      icon: 'iconfont icon-qingjia',
    },
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页children',
          roles: ['ADMIN'],
          alwaysShow: false,
          keepAlive: true,
          affix: true,
          icon: 'el-icon-edit',
        },
        // redirect:"/home/test",
        children: [
          // {
          //   path: 'test',
          //   name: "Test",
          //   component: Test,
          //   meta: {
          //     url: '/home/test',
          //     title: "菜单二级",
          //     icon: "",
          //     hidden: false,
          //     roles: ["ADMIN"],
          //     keepAlive: true,
          //   },
          // },
          // {
          //   path: "test1",
          //   component: Test1,
          //   name: "Test1",
          //   meta: {
          //     url: '/home/test1',
          //     title: "Test1",
          //     icon: "",
          //     hidden: false,
          //     roles: ["ADMIN"],
          //     keepAlive: true,
          //   },
          // }
        ],
      },
      {
        path: 'home1',
        name: 'Home1',
        component: Home1,
        meta: {
          title: 'home1',
          roles: ['ADMIN'],
          alwaysShow: false,
          keepAlive: true,
          icon: '',
        },
        children: [],
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
          url: '/404',
          title: '404',
          roles: ['ADMIN'],
          alwaysShow: false,
          hidden: false,
          icon: '',
        },
      },
    ],
  },

  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: {
      title: '系统设置',
      alwaysShow: true,
      icon: 'iconfont icon-qingjia',
    },
    redirect: '/system/menu',
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单',
          alwaysShow: false,
          keepAlive: true,
          affix: true,
          icon: 'el-icon-edit',
        },
        // redirect:"/home/test",
        children: [],
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/system/admin/index.vue'),
        meta: {
          title: '管理员',
          alwaysShow: false,
          keepAlive: true,
          icon: '',
        },
        children: [],
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          alwaysShow: false,
          keepAlive: true,
          icon: '',
        },
        children: [],
      },
    ],
  },

  // {
  //   path: '/',
  //   name: 'Layout',
  //   component: Layout,
  //   children:[
  //     {
  //       path: '/home',
  //       component: Home,
  //     }
  //   ]
  // },
  // {
  //   path: "/redirect",
  //   component: Layout,
  //   meta: { hidden: true },
  //   children: [
  //     {
  //       path: "/redirect/:path(.*)",
  //       component: () => import("@/views/redirect/index.vue"),
  //     },
  //   ],
  // },

  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true, icon: '' },
  },

  // {
  //   path: "/",
  //   name: "/",
  //   component: Layout,
  //   redirect: "/dashboard",
  //   children: [
  //     {
  //       path: "dashboard",
  //       component: () => import("@/views/dashboard/index.vue"),
  //       name: "Dashboard", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
  //       // https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
  //       meta: {
  //         title: "dashboard",
  //         icon: "homepage",
  //         affix: true,
  //         keepAlive: true,
  //         alwaysShow: false,
  //       },
  //     },
  //     {
  //       path: "401",
  //       component: () => import("@/views/error-page/401.vue"),
  //       meta: { hidden: true },
  //     },
  //     {
  //       path: "404",
  //       component: () => import("@/views/error-page/404.vue"),
  //       meta: { hidden: true },
  //     },
  //   ],
  // },

  // 外部链接
  // {
  //   path: "/external-link",
  //   component: Layout,
  //   children: [ {
  //       component: () => import("@/views/external-link/index.vue"),
  //       path: "https://www.cnblogs.com/haoxianrui/",
  //       meta: { title: "外部链接", icon: "link" },
  //     },
  //   ],
  // },
  // 多级嵌套路由
  /* {
         path: '/nested',
         component: Layout,
         redirect: '/nested/level1/level2',
         name: 'Nested',
         meta: {title: '多级菜单', icon: 'nested'},
         children: [
             {
                 path: 'level1',
                 component: () => import('@/views/nested/level1/index.vue'),
                 name: 'Level1',
                 meta: {title: '菜单一级'},
                 redirect: '/nested/level1/level2',
                 children: [
                     {
                         path: 'level2',
                         component: () => import('@/views/nested/level1/level2/index.vue'),
                         name: 'Level2',
                         meta: {title: '菜单二级'},
                         redirect: '/nested/level1/level2/level3',
                         children: [
                             {
                                 path: 'level3-1',
                                 component: () => import('@/views/nested/level1/level2/level3/index1.vue'),
                                 name: 'Level3-1',
                                 meta: {title: '菜单三级-1'}
                             },
                             {
                                 path: 'level3-2',
                                 component: () => import('@/views/nested/level1/level2/level3/index2.vue'),
                                 name: 'Level3-2',
                                 meta: {title: '菜单三级-2'}
                             }
                         ]
                     }
                 ]
             },
         ]
     }*/

  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true, icon: '' },
  },

  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
  // { path: '/system:afterUser(.*)', component: () => import('@/views/error-page/404.vue') },
]

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' })
}

export default router
