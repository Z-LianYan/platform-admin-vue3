import axios from 'axios'
// import { useAdminStoreHook } from "@/store/modules/user";
import { ResultEnum } from '@/enums/ResultEnum'
import { ElMessage } from 'element-plus'
import { TOKEN_KEY } from '@/enums/CacheEnum'
import { useAdminStoreHook } from '@/store'

// 创建 axios 实例
console.log('import.meta==>>', import.meta, localStorage.getItem(TOKEN_KEY))
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        accesstoken: localStorage.getItem(TOKEN_KEY),
      },
    }
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    console.log('response', response)
    // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
    // if (
    //   response.config.responseType === "blob" ||
    //   response.config.responseType === "arraybuffer"
    // ) {
    //   return response;
    // }

    const { code, data, msg } = response.data
    if (code === ResultEnum.SUCCESS) {
      return data
    } else if (code === ResultEnum.TOKEN_INVALID) {
      // 这种情况是当后端设置成全是返回 200 状态是起作用
      ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const userStore = useAdminStoreHook()
        await userStore.resetToken()
        location.reload()
      })
    } else if (code === ResultEnum.UN_AUTHORIZED) {
      // 这种情况是当后端设置成全是返回 200 状态是起作用
      ElMessage.error(msg || '系统出错')
      setTimeout(async () => {
        const userStore = useAdminStoreHook()
        await userStore.resetToken()
        location.reload()
      }, 1000)
    }
    ElMessage.error(msg || '系统出错')
    return Promise.reject(new Error(msg || 'Error'))
  },
  async (error: any) => {
    // 异常处理
    if (error.response.data) {
      const { code, msg } = error.response.data
      if (code === ResultEnum.TOKEN_INVALID) {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const userStore = useAdminStoreHook()
          await userStore.resetToken()
          location.reload()
        })
      } else if (code === ResultEnum.UN_AUTHORIZED) {
        ElMessage.error(msg || '系统出错')
        setTimeout(async () => {
          const userStore = useAdminStoreHook()
          await userStore.resetToken()
          location.reload()
        }, 1000)
      } else {
        ElMessage.error(msg || '系统出错')
      }
    }
    return Promise.reject(error.message)
  },
)

// 导出 axios 实例
export default service
