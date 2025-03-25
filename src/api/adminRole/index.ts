import request from '@/utils/request'
import type { AdminRolePageVO, AdminRoleQuery } from './model'

class AdminRoleAPI {
  /**
   * 获取角色列表
   *
   * @param body
   */
  static getList(body: AdminRoleQuery) {
    return request<any, PageResult<AdminRolePageVO[]>>({
      url: '/api/v1/adminRole/getList',
      method: 'post',
      data: body,
    })
  }
}

export default AdminRoleAPI
