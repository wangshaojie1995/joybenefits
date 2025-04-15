import Router from '@/router'
import { getToken, removeToken, saveToken } from '@/utils/auth'
import { message } from 'ant-design-vue'
import axios from 'axios'

const ErrorMessageRecord = new Set()

const codeMessage: any = {
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '参数错误',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  429: '请求太频繁，请稍后重试',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}
const customAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_DOMAIN}/api/v1`,
  timeout: 60 * 1000,
})
customAxios.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  // config.headers["x-csrf-token"] = (
  //   document.cookie.match(/(?<=(^| )csrfToken=)(([^;]*)(;|$))/)?.[0] || ""
  // ).replace(";", "");
  return config
})
customAxios.interceptors.response.use(
  (response) => {
    const { data, status, headers } = response
    let msg = '请求出错，请刷新重试'
    if (status in codeMessage) {
      msg = codeMessage[status]
      message.error(data?.message || msg)
      return data
    }
    const { success: resStatus, message: errorMessage, data: resData } = data
    if (!resStatus) {
      if (data === '系统更新中，请稍后') {
        msg = data
      }
      message.error(resData || errorMessage || msg)
      throw data
    }
    if (resData?.token) {
      saveToken(resData.token)
    }

    return data?.data || data
  },
  function (error) {
    const { status } = error.response
    let msg = '请求出错，请刷新重试'
    if (status in codeMessage) {
      msg = codeMessage[status]
    }
    const redirectLogin = status === 401
    if (redirectLogin) {
      if (!ErrorMessageRecord.has(msg)) {
        ErrorMessageRecord.add(msg)
        message.error(msg, 3, () => {
          ErrorMessageRecord.delete(msg)
        })
      }
      let from = location.href.split(import.meta.env.VITE_ROUTER_PREFIX)[1]
      if (from && !from.startsWith('/')) {
        from = '/' + from
      }
      removeToken()
      Router.replace({
        name: 'login',
      })
    } else {
      message.error(msg)
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    return Promise.reject(error)
  },
)
const request = customAxios.request
export default customAxios
export { request }
