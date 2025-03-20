import AuthAPI from '@/api/auth'
import MenuAPI from '@/api/menu'
import { resetRouter } from '@/router'
import { store } from '@/store'

import type { MenuVO } from '@/api/menu/model'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import request from '@/utils/request'
import { settings } from 'nprogress'

export const useMenuStore = defineStore('menu', () => {
  /**
   * 获取菜单列表
   *
   * @param {MenuVO}
   * @returns
   */
  function getMenu(queryParams: any) {
    return new Promise((resolve, reject) => {
      MenuAPI.getMenuList(queryParams)
        .then(async (data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 添加菜单
   *
   * @param {MenuVO}
   * @returns
   */
  function addMenu(body: any) {
    return new Promise((resolve, reject) => {
      MenuAPI.addMenu(body)
        .then(async (data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 编辑菜单
   *
   * @param {MenuVO}
   * @returns
   */
  function editMenu(body: any) {
    return new Promise((resolve, reject) => {
      MenuAPI.editMenu(body)
        .then(async (data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  return {
    getMenu,
    addMenu,
    editMenu,
  }
})

// 非setup
export function useMenuStoreHook() {
  return useMenuStore(store)
}
