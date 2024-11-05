import { useAuthStore } from '@/store'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { TokenUtil } from './auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 重新登录
let isRelogin = false
const router = useRouter()

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // timeout: 10000
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (req) => {
    const token = TokenUtil.getToken()
    if (token) {
      req.headers['Authorization'] = 'Bearer ' + token
    }

    return req
  },
  (err) => {
    Promise.reject(err)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (resp) => {

    if (
      resp.request.responseType === 'blob' ||
      resp.request.responseType === 'arraybuffer'
    ) {
      return resp.data
    }

    return Promise.resolve(resp.data)
  },
  (err) => {
    console.log(err)
    const { status, data } = err.response

    if (status === 401) {
      if (isRelogin) return
      isRelogin = true
      ElMessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          debugger
          isRelogin = false
          useAuthStore().logout()
          router.replace({ path: '/login' })
        })
        .catch(() => (isRelogin = false))
    } else if (status === 403) {
      ElMessage.warning('权限不足,请联系管理员!')
      return Promise.reject(new Error(data))
    } else if (status === 400) {
      ElNotification.error({ title: data })
      return Promise.reject('error')
    } else {
      ElMessage({ message: msg, type: 'error', duration: 5 * 1000 })
    }

    return Promise.reject(err)
  }
)

// 通用下载方法
export function download(url, params, filename, config) {
  downloadLoadingInstance = ElLoading.service({
    text: '正在下载数据，请稍候',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  return service
    .post(url, params, {
      transformRequest: [
        (params) => {
          return tansParams(params)
        },
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config,
    })
    .then(async (data) => {
      const isBlob = blobValidate(data)
      if (isBlob) {
        const blob = new Blob([data])
        saveAs(blob, filename)
      } else {
        const resText = await data.text()
        const rspObj = JSON.parse(resText)
        const errMsg =
          errorCode[rspObj.code] || rspObj.msg || errorCode['default']
        ElMessage.error(errMsg)
      }
      downloadLoadingInstance.close()
    })
    .catch((r) => {
      ElMessage.error('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close()
    })
}

export { service }
