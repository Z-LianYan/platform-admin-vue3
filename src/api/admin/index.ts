import request from '@/utils/request'
import type { AdminInfo, AdminPageVO, AdminQuery } from './model'

class AdminAPI {
  /**
   * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
   */
  static getAdminInfo() {
    return request<any, ResponseData<AdminInfo>>({
      url: '/api/v1/admin/getInfo',
      method: 'post',
    })
  }

  /**
   * 获取管理员列表
   *
   * @param body
   */
  static getList(body: AdminQuery) {
    return request<any, PageResult<AdminPageVO[]>>({
      url: '/api/v1/admin/getList',
      method: 'post',
      data: body,
    })
  }
  /**
   * 添加管理员
   *
   * @param body
   */
  static add(body: any) {
    return request<any, PageResult<AdminPageVO[]>>({
      url: '/api/v1/admin/add',
      method: 'post',
      data: body,
    })
  }

  /**
   * 编辑管理员
   *
   * @param body
   */
  static edit(body: any) {
    return request<any, PageResult<AdminPageVO[]>>({
      url: '/api/v1/admin/edit',
      method: 'post',
      data: body,
    })
  }

  /**
   *  删除管理员
   *
   * @param body
   */
  static del(body: any) {
    return request<any, PageResult<AdminPageVO[]>>({
      url: '/api/v1/admin/del',
      method: 'post',
      data: body,
    })
  }
}

export default AdminAPI
