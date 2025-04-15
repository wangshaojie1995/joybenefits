import request from '@/utils/http'
import { AxiosError, type AxiosRequestConfig } from 'axios'
import { onMounted, ref } from 'vue'

interface Config<R> {
  // true 时将自动发起请求
  manual?: boolean
  defaultParams?: any[]
  onSuccess?: (res: R) => void
  onError?: (err: AxiosError) => void
  onFinally?: () => void
  formatResult?: (res: R) => any[]
}
type FunService = (...p: any[]) => AxiosRequestConfig
export type Service = AxiosRequestConfig | string | FunService
function useRequest<R = any>(service: Service, config: Config<R> = {}) {
  const loading = ref(false)
  const data = ref<R>()
  const { manual = true, onSuccess, onError, onFinally, formatResult, defaultParams } = config
  onMounted(() => {
    if (!manual) {
      run(...(defaultParams || []))
    }
  })
  function run(...params: any) {
    loading.value = true
    const type = Object.prototype.toString.call(service)
    let s: AxiosRequestConfig
    if (type === '[object String]') {
      s = { url: service as string }
    } else if (type === '[object Function]') {
      s = (service as FunService)(...params)
    } else {
      s = service as AxiosRequestConfig
    }
    return request(s)
      .finally(() => {
        loading.value = false
        onFinally && onFinally()
      })
      .then((res) => {
        let result: any = res
        if (formatResult) {
          result = formatResult(result)
        }
        data.value = result as R
        onSuccess && onSuccess(data.value)
        return result
      })
      .catch((e) => {
        onError && onError(e)
      })
  }
  return {
    request: run,
    loading,
    data,
    // data: toRefs(data),
  }
}
export default useRequest
