import AuthAPI from '@/api/auth'
import AdminAPI from '@/api/admin'
import { store, usePermissionStoreHook } from '@/store'

import type { LoginData } from '@/api/auth/model'
import type { AdminInfo } from '@/api/admin/model'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import request from '@/utils/request'
import { settings } from 'nprogress'

export const useAdminStore = defineStore('admin', () => {
  const admin = ref<AdminInfo>({})

  /**
   * 获取验证码
   *
   * @param {LoginData}
   * @returns
   */
  function getCaptcha() {
    return new Promise((resolve, reject) => {
      AuthAPI.getCaptcha()
        .then(async (data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(loginData)
        .then(async (response) => {
          const { accessToken } = response.data
          localStorage.setItem(TOKEN_KEY, '' + accessToken) // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getAdminInfo() {
    return new Promise<ResponseData<AdminInfo>>((resolve, reject) => {
      AdminAPI.getAdminInfo()
        .then((response) => {
          if (!response.data) {
            reject('Verification failed, please Login again.')
            return
          }
          Object.assign(admin.value, { ...response.data })
          resolve(response)
        })
        .catch((error) => {
          console.log('出错误了getAdminInfo', error.message)
          reject(error)
        })
    })
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.logout()
        .then(() => {
          localStorage.setItem(TOKEN_KEY, '')
          location.reload() // 清空路由
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // remove token
  // function resetToken() {
  //   return new Promise<void>((resolve) => {
  //     localStorage.setItem(TOKEN_KEY, '')
  //     resetRouter()
  //     resolve()
  //   })
  // }
  function clearToken() {
    localStorage.removeItem(TOKEN_KEY)
  }

  function getList(body: any) {
    return new Promise<AdminInfo>((resolve, reject) => {
      AdminAPI.getList(body)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * 清理用户数据
   *
   * @returns
   */
  function clearAdminData() {
    return new Promise<void>((resolve) => {
      clearToken()
      usePermissionStoreHook().resetRouter()
      // useDictStoreHook().clearDictionaryCache();
      resolve()
    })
  }

  return {
    admin,
    login,
    getAdminInfo,
    logout,
    // resetToken,
    getCaptcha,
    getList,
    clearAdminData,
    clearToken,
  }
})

// 非setup
export function useAdminStoreHook() {
  return useAdminStore(store)
}
