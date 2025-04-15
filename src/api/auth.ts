import type {
  LoginParamsInterface,
  RegisterParamsInterface,
  SmsParamsInterface,
} from '@/interface/auth'

// 发送短信验证码
export const SmsApi = (data: SmsParamsInterface) => ({
  url: '/sms',
  method: 'post',
  data,
})
// 注册
export const RegisterApi = (data: RegisterParamsInterface) => ({
  url: '/register',
  method: 'post',
  data,
})
// 登录
export const LoginApi = (data: LoginParamsInterface) => ({
  url: '/login',
  method: 'post',
  data,
})
// 当前用户
export const UserApi = () => ({
  url: '/user',
  method: 'get',
})
