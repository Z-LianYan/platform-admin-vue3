import AuthAPI from '@/api/auth'
import UserAPI from '@/api/admin'
import { resetRouter } from '@/router'
import { store } from '@/store'

import type { LoginData } from '@/api/auth/model'
import type { AdminInfo } from '@/api/admin/model'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import request from '@/utils/request'

export const useAdminStore = defineStore('user', () => {
  const user = ref<AdminInfo>({})

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
    console.log('loginData=======>>>', loginData)
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(loginData)
        .then(async (data) => {
          console.log('loginData===>>>', loginData, data)
          const { accessToken } = data
          localStorage.setItem(TOKEN_KEY, '' + accessToken) // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve()
        })
        .catch((error) => {
          console.log('------->>', error)
          reject(error)
        })
    })
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getAdminInfo() {
    return new Promise<AdminInfo>((resolve, reject) => {
      UserAPI.getAdminInfo()
        .then((data: any) => {
          console.log('data--getU', data)
          if (!data) {
            reject('Verification failed, please Login again.')
            return
          }
          if (!data.roles || data.roles.length <= 0) {
            reject('getAdminInfo: roles must be a non-null array!')
            return
          }
          Object.assign(user.value, { ...data })
          resolve(data)
        })
        .catch((error) => {
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
    console.log('resetToken')
    return new Promise<void>((resolve) => {
      localStorage.setItem(TOKEN_KEY, '')
      resetRouter()
      resolve()
    })
  }

  return {
    user,
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
