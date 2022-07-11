import $form from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import baseApi from '@/lib/base-api'
import nprogress from 'nprogress'

// 表单格式提交
$form.defaults.timeout = 12000000 // 响应时间
$form.defaults.responseType = 'json'
$form.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
$form.defaults.baseURL = baseApi.BASE_API_URL // 配置接口地址
$form.defaults.transformRequest = [
  function(params) {
    return qs.stringify(params)
  }
]

function interceptorsRequestSuccess(config) {
  nprogress.start()
  store.commit('switchBtnLoading', { status: true })
  config.headers.Authorization = store.state.token.token
  config.headers.language = store.state.lang
  config.headers['shop-id'] = 1
  return config
}

function interceptorsRequestError(error) {
  return Promise.reject(error)
}

function interceptorsResponseSuccess(response) {
  nprogress.done()
  store.commit('switchBtnLoading', { status: false })
  if (response.data.ret === 0) {
    Message({
      message: response.data.msg,
      type: 'error'
    })
  }
  return Promise.resolve(response.data)
}

function interceptorsResponseError(error) {
  let msg
  nprogress.done()
  store.commit('switchBtnLoading', { status: false })
  if (error.response && error.response.status === 401) {
    store.commit('token/removeToken')
    router.push('/login')
    Message({
      message: '请重新登录',
      type: 'error'
    })
  } else {
    if (error.response && error.response.data && error.response.data.tips) {
      msg = error.response.data.tips
    } else {
      msg = '请求失败'
    }
    Message({
      message: msg,
      type: 'error'
    })
  }
  return Promise.reject((error.response && error.response.data) || msg)
}

$form.interceptors.request.use(interceptorsRequestSuccess, interceptorsRequestError)
$form.interceptors.response.use(interceptorsResponseSuccess, interceptorsResponseError)

// json格式提交
let $json = $form.create({
  baseURL: baseApi.BASE_API_URL, // 配置接口地址
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  transformRequest: [
    function(params) {
      return JSON.stringify(params)
    }
  ]
})

$json.interceptors.request.use(interceptorsRequestSuccess, interceptorsRequestError)
$json.interceptors.response.use(interceptorsResponseSuccess, interceptorsResponseError)

const axios = {}
axios.install = function(Vue, options = {}) {
  Vue.prototype.$http = $form
  Vue.prototype.$json = $json
  Vue.prototype.$baseUrl = baseApi
}

export default axios
export { $form, $json }
