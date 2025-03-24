import request from '@/utils/request'
import type { UserForm, AdminInfo, UserPageVO, UserQuery } from './model'

class AdminRoleAPI {
  /**
   * 获取角色列表
   *
   * @param body
   */
  static getList(body: UserQuery) {
    return request<any, PageResult<UserPageVO[]>>({
      url: '/api/v1/adminRole/getList',
      method: 'post',
      data: body,
    })
  }
}

export default AdminRoleAPI
