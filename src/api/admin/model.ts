/**
 * 登录用户信息
 */
export interface AdminInfo {
  id?: number
  name?: string
  phone?: string
  avatar?: string
  role_id?: string
  status?: number
}

/**
 * 用户查询对象类型
 */
export interface UserQuery extends PageQuery {
  keywords?: string
  status?: number
  deptId?: number
  startTime?: string
  endTime?: string
}

/**
 * 用户分页对象
 */
export interface AdminPageVO {
  /**
   * 用户ID
   */
  id?: number
  /**
   * 手机号
   */
  phone?: string
  /**
   * 管理名
   */
  name?: string
  /**
   * 密码
   */
  password?: string
  /**
   * 角色id
   */
  role_id?: number
  /**
   * 最后登录时间
   */
  last_login_time?: Date

  /**
   * 用户状态(1:启用;0:禁用)
   */
  status?: number
  /**
   * 删除时间
   */
  delete_time?: Date

  /**
   * 用户头像地址
   */
  avatar?: string

  /**
   * 创建时间
   */
  created_at?: Date
  /**
   * 创建时间
   */
  updated_at?: Date
}

/**
 * 用户表单类型
 */
export interface UserForm {
  /**
   * 用户头像
   */
  avatar?: string
  /**
   * 部门ID
   */
  deptId?: number
  /**
   * 邮箱
   */
  email?: string
  /**
   * 性别
   */
  gender?: number
  /**
   * 用户ID
   */
  id?: number
  mobile?: string
  /**
   * 昵称
   */
  nickname?: string
  /**
   * 角色ID集合
   */
  roleIds?: number[]
  /**
   * 用户状态(1:正常;0:禁用)
   */
  status?: number
  /**
   * 用户名
   */
  username?: string
}
