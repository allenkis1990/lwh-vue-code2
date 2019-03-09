// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store'
import Global from './global/global'
import {sync} from 'vuex-router-sync'
import UITab from '@/components/Tabbar'
import SetTitle from './common/SetTitle'
import Common from './common/Common'
// import AppConstant from './global/constants/AppConstant'
// import * as storeTypes from './store/types'
import WeixinAuth from './common/core/WeixinAuth'
import AuthH5 from './common/core/AuthH5'
import Interceptor from './common/core/Interceptor'
import * as storeTypes from './store/types'
import AppConstant from './global/constants/AppConstant'
import {
  AjaxPlugin,
  AlertPlugin,
  ConfirmPlugin,
  Datetime,
  DevicePlugin,
  LoadingPlugin,
  ToastPlugin,
  WechatPlugin
} from 'vux'
import {request} from './store/fetch'

// 卍卍卍卍卍卍卍卍卍卍卍卍 全局注册需要的组件 卍卍卍卍卍卍卍卍卍卍卍卍
// 卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍 注 卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍
// 卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍 册 卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍
Vue.component(Datetime.name, Datetime)
// 卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍 组 卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍
// 卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍 件 卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍卍
Vue.use(SetTitle)
// 注册jssdk api
Vue.use(WechatPlugin)
// 设备检测
Vue.use(DevicePlugin)
// 弹窗
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
// 注册提示
Vue.use(ToastPlugin)
// 注册loading
Vue.use(LoadingPlugin)
// 混合
Vue.mixin(Global)
// ajax
Vue.use(AjaxPlugin)
// 设置路由和状态同步
sync(store, router)

AjaxPlugin.$http.defaults.withCredentials = Global.isWeiXin()
AjaxPlugin.$http.defaults.headers.post['Content-Type'] = 'text/plain;charset=utf-8'
AjaxPlugin.$http.defaults.headers.get['Content-Type'] = 'text/plain;charset=utf-8'
// AjaxPlugin.$http.defaults.headers.post['Hb-Domain-Path'] = 'hbpx'  // 暂时写死
// AjaxPlugin.$http.defaults.headers.get['Hb-Domain-Path'] = 'hbpx'  // 暂时写死
// 注册公共组件
Vue.component('UITab', UITab)
/* eslint-disable no-new */
FastClick.attach(document.body)
/**
 * 公共
 */
Common(router, store)
Interceptor(Vue, router)

if (Global.isWeiXin()) {
  WeixinAuth.auth(router, store, Global, Vue)
} else {
  // router.replace(Global.tourist.firstView)
  AuthH5.auth(router,store, Global, Vue)
}

// console.log(window.location)
AppConstant.sysContext.apiPlatformHost = window.location.origin + '/'
if (process.env.NODE_ENV === 'development') {
  // TODO 根据连接的环境做配置，这个值要与config/index.js中dev.proxyTable.target下的代理一致
  // AppConstant.sysContext.apiPlatformHost = 'http://kccsv2test1.lan.59iedu.com:1457/' // 测试1
  // AppConstant.sysContext.apiPlatformHost = 'http://kccsv2test2.lan.59iedu.com:1457/' // 测试2
  // AppConstant.sysContext.apiPlatformHost = 'http://kccsv3.test1.59iedu.com:1457/' // 测试2
  AppConstant.sysContext.apiPlatformHost = '/' // 测试2
}
// 获取系统参数
var type = 'GET'
var url = 'mobile/home/mobileHome/getApplicationContext'
request(type, [], url)
  .then(function (data) {
    if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
      store.dispatch(storeTypes.ACCOUNT_IS_LOGIN).then((res) => {
        if (res.head.code === storeTypes.NETWORK_RESULT_SUCCESS && res.data) {
          AppConstant.sysContext.isLogin = true
          store.commit(storeTypes.GLOBAR_LOGIN_SET, true)
          if (AppConstant.sysContext.isLogin) {
            store.dispatch(storeTypes.ACCOUNT_GET_USERINFO).then((userData) => {
              if (userData.data.userInfo) {
                store.commit(storeTypes.ACCOUNT_SET_USERINFO, userData.data.userInfo)
                Global.methods.setCookie(AppConstant.cookie.userInfo, JSON.stringify(userData.data.userInfo))
                appStart()
              } else {
                appStart()
              }
            })
          }
          // 启动页面实例
        } else {
          appStart()
        }
      })
      AppConstant.sysContext.casHost = data.data.casHost
      AppConstant.sysContext.wxRedirectURI = data.data.wxRedirectURI
      AppConstant.sysContext.invoicePrice = data.data.invoicePrice      // 发票价格
      AppConstant.sysContext.eInvoicePriceLimit = data.data.applyElectronInvoiceMaxPrices      // 电子发票价格限制
      AppConstant.sysContext.isOpenCheckPhoneNumber = data.data.isOpenCheckPhoneNumber  // 是否开启验证码
    }
  }, function (reason) {
    // console.log(window.navigator.userAgent,'lwh')
    // return ({head: {code: 700, message: '请求失败'}})
  })

function appStart() {
  new Vue(Vue.util.extend({
    el: '#app-box',
    router,
    store,
    template: '<App/>',
    components: {App}
  }))
}