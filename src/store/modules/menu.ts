import AuthAPI from '@/api/auth'
import MenuAPI from '@/api/menu'
import { store } from '@/store'

import type { MenuVO } from '@/api/menu/model'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import request, { post } from '@/utils/request'
import { settings } from 'nprogress'
import { ElLoading, ElNotification } from 'element-plus'

export const useMenuStore = defineStore('menu', () => {
  /**
   * 获取菜单列表
   *
   * @param {MenuVO}
   * @returns
   */
  async function getMenu(queryParams: any, extra: any = { loading: false, text: 'Loading' }) {
    let loading = null
    if (extra.loading) {
      loading = ElLoading.service({
        lock: true,
        text: extra.text || 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }

    return new Promise((resolve, reject) => {
      MenuAPI.getMenuList(queryParams)
        .then(async (response) => {
          resolve(response.data)
          loading && loading.close()
        })
        .catch((error) => {
          reject(error)
          loading && loading.close()
        })
    })
  }

  /**
   * 添加菜单
   *
   * @param {MenuVO}
   * @returns
   */
  function addMenu(body: any, extra: any = { loading: false, text: 'Loading' }) {
    let loading = null
    if (extra.loading) {
      loading = ElLoading.service({
        lock: true,
        text: extra.text || 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    return new Promise((resolve, reject) => {
      MenuAPI.addMenu(body)
        .then(async (response) => {
          resolve(response.data)
          ElMessage.success(response.msg)
          loading && loading.close()
        })
        .catch((error) => {
          reject(error)
          loading && loading.close()
        })
    })
  }

  /**
   * 编辑菜单
   *
   * @param {MenuVO}
   * @returns
   */
  function editMenu(body: any, extra: any = { loading: false, text: 'Loading' }) {
    let loading = null
    if (extra.loading) {
      loading = ElLoading.service({
        lock: true,
        text: extra.text || 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    return new Promise((resolve, reject) => {
      MenuAPI.editMenu(body)
        .then(async (response) => {
          resolve(response.data)
          ElMessage.success(response.msg)
          loading && loading.close()
        })
        .catch((error) => {
          reject(error)
          loading && loading.close()
        })
    })
  }

  function del(body: any) {
    return new Promise(async (resolve, reject) => {
      const response: any = await post({
        url: '/api/v1/menu/del',
        data: body,
        loading: true,
      })
      ElMessage.success(response.msg)
      resolve(response)
    })
  }

  return {
    getMenu,
    addMenu,
    editMenu,
    del,
  }
})

// 非setup
export function useMenuStoreHook() {
  return useMenuStore(store)
}
