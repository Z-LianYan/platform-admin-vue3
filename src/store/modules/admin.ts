import AuthAPI from '@/api/auth'
import AdminAPI from '@/api/admin'
import { resetRouter } from '@/router'
import { store } from '@/store'

import type { LoginData } from '@/api/auth/model'
import type { AdminInfo } from '@/api/admin/model'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import request from '@/utils/request'
import { settings } from 'nprogress'

export const useAdminStore = defineStore('user', () => {
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
        .then(async (data) => {
          const { accessToken } = data
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
    return new Promise<AdminInfo>((resolve, reject) => {
      AdminAPI.getAdminInfo()
        .then((data: any) => {
          console.log('getAdminInfo=======>>>getAdminInfo', data)
          if (!data) {
            reject('Verification failed, please Login again.')
            return
          }
          // if (!data.roles || data.roles.length <= 0) {
          //   console.log('+++')
          //   reject('getAdminInfo: roles must be a non-null array!')
          //   return
          // }
          Object.assign(admin.value, { ...data })
          resolve(data)
        })
        .catch((error) => {
          console.log('出错误了', error.message)
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
  function resetToken() {
    return new Promise<void>((resolve) => {
      localStorage.setItem(TOKEN_KEY, '')
      resetRouter()
      resolve()
    })
  }

  return {
    admin,
    login,
    getAdminInfo,
    logout,
    resetToken,
    getCaptcha,
  }
})

// 非setup
export function useAdminStoreHook() {
  return useAdminStore(store)
}
