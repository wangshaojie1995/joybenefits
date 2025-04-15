const AuthKey = 'token'

export const saveToken = (token: string) => {
  window.localStorage.setItem(AuthKey, token)
}
export const removeToken = () => {
  window.localStorage.removeItem(AuthKey)
}
export const getToken = () => {
  return window.localStorage.getItem(AuthKey)
}
