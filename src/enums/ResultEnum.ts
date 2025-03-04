/**
 * 响应码枚举
 */
export const enum ResultEnum {
  /**
   * 成功
   */
  SUCCESS = 200,
  /**
   * 错误
   */
  ERROR = 400,

  /**
   * 令牌无效或过期/（禁止) 服务器拒绝请求。
   */
  TOKEN_INVALID = 403,
}
