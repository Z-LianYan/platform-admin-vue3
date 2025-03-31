/**
 * 用户查询对象类型
 */
export interface AdminRoleQuery extends PageQuery {
  keywords?: string
  need_ids?: number[]
}

/**
 * 用户分页对象
 */
export interface AdminRolePageVO {
  /**
   * 用户ID
   */
  id?: number
  /**
   * 用户头像地址
   */
  role_name?: string
  /**
   * 创建时间
   */
  created_at?: Date
  /**
   * 更新时间
   */
  updated_at?: Date
  /**
   * 部门名称
   */
  remark?: string
  /**
   * 删除时间
   */
  deleted_time?: Date

  /**
   * 用户状态(1:启用;0:禁用)
   */
  status?: number
}
