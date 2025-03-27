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

  /**
   * 添加角色
   *
   * @param body
   */
  static add(body: any) {
    return request<any, PageResult<any[]>>({
      url: '/api/v1/adminRole/add',
      method: 'post',
      data: body,
    })
  }

  /**
   * 编辑角色
   *
   * @param body
   */
  static edit(body: any) {
    return request<any, PageResult<any[]>>({
      url: '/api/v1/adminRole/edit',
      method: 'post',
      data: body,
    })
  }

  /**
   *  删除角色
   *
   * @param body
   */
  static del(body: any) {
    return request<any, PageResult<any[]>>({
      url: '/api/v1/adminRole/del',
      method: 'post',
      data: body,
    })
  }
}

export default AdminRoleAPI
