import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// export const Layout = () => import("@/layout/index.vue");
// import Home from '../views/Home.vue'
import Layout from '@/layout/index.vue'
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'NotFound',
    component: Layout,
    // redirect: '/system/menu',
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        meta: { hidden: true },
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: { hidden: true },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true, icon: '' },
  },

  // {
  //   path: '/system',
  //   name: 'System',
  //   component: Layout,
  //   meta: {
  //     title: '系统设置',
  //     alwaysShow: true,
  //     icon: 'iconfont icon-jiaoseguanli1',
  //   },
  //   redirect: '/system/menu',
  //   children: [
  //     {
  //       path: 'menu',
  //       name: 'Menu',
  //       component: () => import('@/views/system/menu/index.vue'),
  //       meta: {
  //         title: '菜单',
  //         alwaysShow: false,
  //         keepAlive: true,
  //         affix: true,
  //         icon: 'el-icon-edit',
  //       },
  //       // redirect:"/home/test",
  //       children: [],
  //     },
  //     {
  //       path: 'admin',
  //       name: 'Admin',
  //       component: () => import('@/views/system/admin/index.vue'),
  //       meta: {
  //         title: '管理员',
  //         alwaysShow: false,
  //         keepAlive: true,
  //         icon: '',
  //       },
  //       children: [],
  //     },
  //     {
  //       path: 'role',
  //       name: 'Role',
  //       component: () => import('@/views/system/role/index.vue'),
  //       meta: {
  //         title: '角色管理',
  //         alwaysShow: false,
  //         keepAlive: true,
  //         icon: '',
  //       },
  //       children: [],
  //     },
  //   ],
  // },

  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/system/redirect/index.vue'),
      },
    ],
  },

  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/error-page/404.vue'),
  //   meta: { hidden: true, icon: '' },
  // },

  // 将匹配以 `/system-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
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
// export function resetRouter() {
//   router.replace({ path: '/login' })
// }

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
