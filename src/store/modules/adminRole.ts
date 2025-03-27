import AuthAPI from '@/api/auth'
import { store } from '@/store'

import type { LoginData } from '@/api/auth/model'
import type { AdminRolePageVO } from '@/api/adminRole/model'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import request from '@/utils/request'
import { settings } from 'nprogress'
import AdminRoleAPI from '@/api/adminRole'
import { ElLoading } from 'element-plus'

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

  function add(body: any, extra: any = { loading: false, text: 'Loading' }) {
    let loading = null
    if (extra.loading) {
      loading = ElLoading.service({
        lock: true,
        text: extra.text || 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    return new Promise<any>((resolve, reject) => {
      AdminRoleAPI.add(body)
        .then((response) => {
          resolve(response.data)
          ElMessage.success(response.msg)
          loading && loading.close()
        })
        .catch((error) => {
          loading && loading.close()
          reject(error)
        })
    })
  }

  function edit(body: any, extra: any = { loading: false, text: 'Loading' }) {
    let loading = null
    if (extra.loading) {
      loading = ElLoading.service({
        lock: true,
        text: extra.text || 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    return new Promise<any>((resolve, reject) => {
      AdminRoleAPI.edit(body)
        .then((response) => {
          resolve(response.data)
          ElMessage.success(response.msg)
          loading && loading.close()
        })
        .catch((error) => {
          loading && loading.close()
          reject(error)
        })
    })
  }

  function del(body: any, extra: any = { loading: false, text: 'Loading' }) {
    let loading = null
    if (extra.loading) {
      loading = ElLoading.service({
        lock: true,
        text: extra.text || 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    return new Promise<any>((resolve, reject) => {
      AdminRoleAPI.del(body)
        .then((response) => {
          resolve(response.data)
          ElMessage.success(response.msg)
          loading && loading.close()
        })
        .catch((error) => {
          loading && loading.close()
          reject(error)
        })
    })
  }

  return {
    getList,
    add,
    edit,
    del,
  }
})

// 非setup
export function useAdminRoleStoreHook() {
  return useAdminRoleStore(store)
}
