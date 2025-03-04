export interface CaptchaResult {
  /**
   * 验证码缓存key
   */
  captchaKey: string
  /**
   * 验证码图片Base64字符串
   */
  captchaBase64: string
}
