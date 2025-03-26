import AuthAPI from '@/api/auth'
import { store } from '@/store'

import type { LoginData } from '@/api/auth/model'
import type { AdminRolePageVO } from '@/api/adminRole/model'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import request from '@/utils/request'
import { settings } from 'nprogress'
import AdminRoleAPI from '@/api/adminRole'

export const useAdminRoleStore = defineStore('adminRole', () => {
  function getList(body: any) {
    return new Promise((resolve, reject) => {
      AdminRoleAPI.getList(body)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  return {
    getList,
  }
})

// 非setup
export function useAdminRoleStoreHook() {
  return useAdminRoleStore(store)
}
