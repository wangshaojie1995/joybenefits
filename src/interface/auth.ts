// 短信验证码参数
export interface SmsParamsInterface {
  phone: string
  captcha_key?: string
  captcha_code?: string
}
// 注册参数
export interface RegisterParamsInterface {
  phone: string
  password: string
  username: string
  sms: string
}
// 登录参数
export interface LoginParamsInterface {
  phone: string
  password?: string
  sms?: string
}
