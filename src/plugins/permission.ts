import router from '@/router'
import NProgress from '@/utils/nprogress'
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import { constantRoutes } from '@/router'
import {
  // useAdminStore,
  usePermissionStore,
  useAdminStore,
} from '@/store'
import defaultSettings from '@/settings'
export function setupPermission() {
  // 白名单路由
  const whiteList = ['/login']

  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = localStorage.getItem(TOKEN_KEY)
    if (hasToken) {
      if (to.path === '/login') {
        // 如果已登录，跳转首页
        next({ path: '/' })
        NProgress.done()
      } else {
        const adminStore: any = useAdminStore()
        // console.log('adminStore.====>>', adminStore.admin.value)
        const hasRoles = adminStore.admin?.id
        if (hasRoles) {
          // 未匹配到任何路由，跳转404
          // console.log('to.matched====>>>', to.matched)
          if (to.matched.length === 0) {
            next('/404')
          } else {
            document.title = getPageTitle(to.meta?.title as string)
            next()
          }
        } else {
          const permissionStore = usePermissionStore()
          try {
            await adminStore.getAdminInfo()
            const accessRoutes = await permissionStore.generateRoutes()
            accessRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
            if (to.path === '/') {
              // 登录页面跳转
              const url = await handleMenu(accessRoutes, '')[0]
              next({ path: url, replace: true })
            } else {
              next({ ...to, replace: true })
            }
            // next({ ...to, replace: true })
          } catch (error: any) {
            console.log('报错了', error.message)
            // 路由加载失败，重置 token 并重定向到登录页
            // await useAdminStore().clearAdminData()
            // redirectToLogin(to, next)
            NProgress.done()
          }
        }
      }
    } else {
      // 未登录可以访问白名单页面
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        // 不在白名单，重定向到登录页
        redirectToLogin(to, next)
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}

// 重定向到登录页
function redirectToLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
  const params = new URLSearchParams(to.query as Record<string, string>)
  const queryString = params.toString()
  const redirect = queryString ? `${to.path}?${queryString}` : to.path
  next(`/login?redirect=${encodeURIComponent(redirect)}`)
}

function getPageTitle(pageTitle: string) {
  let title = defaultSettings.title
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

function handleMenu(menus: any[], p_path: string = '') {
  let paths: any = []
  for (const item of menus) {
    const pPath = p_path + (item.pid === 0 ? item.path : '/' + item.path)
    if (item.children?.length) {
      const _paths = handleMenu(item.children, pPath)
      paths.push(..._paths)
    } else {
      paths.push(pPath)
    }
  }
  return paths
}
