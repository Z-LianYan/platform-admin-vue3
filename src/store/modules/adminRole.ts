import AuthAPI from '@/api/auth'
import { resetRouter } from '@/router'
import { store } from '@/store'

import type { LoginData } from '@/api/auth/model'
import type { AdminInfo } from '@/api/admin/model'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import request from '@/utils/request'
import { settings } from 'nprogress'
import AdminRoleAPI from '@/api/adminRole'

export const useAdminRoleStore = defineStore('adminRole', () => {
  function getList(body: any) {
    return new Promise<AdminInfo>((resolve, reject) => {
      AdminRoleAPI.getList(body)
        .then((data: any) => {
          resolve(data)
        })
        .catch((error) => {
          console.log('出错误了', error.message)
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
