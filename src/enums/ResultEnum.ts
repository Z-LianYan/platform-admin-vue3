/**
 * 响应码枚举
 */
export const enum ResultEnum {
  /**
   * 成功
   */
  SUCCESS = 200,
  /**
   * 错误请求，如语法错误
   */
  ERROR = 400,

  /**
   * 请求授权失败(账户被禁用了/账号异常)
   */
  UN_AUTHORIZED = 401,

  /**
   * 令牌无效或过期/（禁止) 服务器拒绝请求。
   */
  TOKEN_INVALID = 403,
}
