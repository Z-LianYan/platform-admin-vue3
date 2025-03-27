import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'
import { store } from '@/store'
import MenuAPI from '@/api/menu'
import type { RouteVO } from '@/api/menu/model'
import router from '@/router'
const modules = (import.meta as any).glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')

// setup
export const usePermissionStore = defineStore('permission', () => {
  // state
  const routes = ref<RouteRecordRaw[]>([])

  // 路由是否已加载
  const isRoutesLoaded = ref(false)

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes)
  }

  /**
   * 递归过滤有权限的动态路由
   *
   * @param routes 接口返回所有的动态路由
   * @returns 返回用户有权限的动态路由
   */
  const filterAsyncRoutes = (routes: RouteVO[]) => {
    const asyncRoutes: RouteRecordRaw[] = []
    routes.forEach((route) => {
      const tmpRoute = { ...route } as any // 深拷贝 route 对象 避免污染
      /**
       * 容错处理，防止配置路由时顶级路径前面忘记输入“/”
       */
      if (tmpRoute.pid === 0 && !tmpRoute.path.startsWith('/')) tmpRoute.path = '/' + tmpRoute.path
      /**
       * 处理组件路径
       *
       * 如果是顶级目录，替换为 Layout 组件
       * */
      tmpRoute.component =
        tmpRoute.component?.toString() === 'Layout'
          ? Layout
          : modules[`../../views/${tmpRoute.component}.vue`] ||
            modules['../../views/error-page/404.vue']
      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(route.children)
      }

      asyncRoutes.push(tmpRoute)
    })
    return asyncRoutes
  }

  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes() {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // 接口获取所有路由
      MenuAPI.getRoutes()
        .then((response: any) => {
          // 过滤有权限的动态路由
          const accessedRoutes = filterAsyncRoutes(response.data)
          setRoutes(accessedRoutes)
          resolve(accessedRoutes)

          isRoutesLoaded.value = true
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 获取与激活的顶部菜单项相关的混合模式左侧菜单集合
   */
  const mixLeftMenus = ref<RouteRecordRaw[]>([])
  function setMixLeftMenus(topMenuPath: string) {
    const matchedItem = routes.value.find((item) => item.path === topMenuPath)
    if (matchedItem && matchedItem.children) {
      mixLeftMenus.value = matchedItem.children
    }
  }

  /**
   * 重置路由
   */
  const resetRouter = () => {
    //  从 router 实例中移除动态路由
    routes.value.forEach((route) => {
      if (route.name && !constantRoutes.find((r) => r.name === route.name)) {
        router.removeRoute(route.name)
      }
    })

    // 清空本地存储的路由和菜单数据
    routes.value = []
    mixLeftMenus.value = []
    isRoutesLoaded.value = false
  }
  return {
    routes,
    setRoutes,
    generateRoutes,
    mixLeftMenus,
    setMixLeftMenus,
    resetRouter,
  }
})

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
