const PhoneExp = /^1[3-9]\d{9}$/
// 密码正则 大小写字母+数字
const PasswordExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/
// 用户名正则 6-20中英字符不包含特殊字符
const UserNameExp = /^[\u4e00-\u9fa5a-zA-Z0-9]{6,20}$/
export function PhoneValidate(phone: string) {
  return PhoneExp.test(phone)
}
export function PasswordValidate(password: string) {
  return PasswordExp.test(password)
}
export function UsernameValidate(username: string) {
  return UserNameExp.test(username)
}
export function escHTML(str: string) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/x27/g, '&#039;')
    .replace(/x22/g, '&quto;')
}
