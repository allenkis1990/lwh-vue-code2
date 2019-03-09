/**
 * 基于router，实现在进入页面前，对用户认证状态做控制。
 * 根据不同状态，决定路由走向
 */
import * as storeTypes from '../../store/types'
import AppConstant from '../../global/constants/AppConstant'
import Global from '@/global/global'
export default {
  auth: function (router, store, Global, Vue) {
    router.beforeEach((to, from, next) => {
      // 第一次进入应用时，将页面重定向到自动登录页
      // if (AppConstant.sysContext.firstEnterApp) {
      //   AppConstant.sysContext.firstEnterApp = false
      //   if (AppConstant.sysContext.dontLoginPages.indexOf(to.fullPath) === -1) {
      //     debugger
      //     router.replace('/authLogin')
      //   }
      // }
      if (window.location.href.indexOf('code') === -1 && from.fullPath === '/') {
        // cookie 记录目标url
        if (to.fullPath !== '/authLogin' && to.fullPath !== '/') {
          Global.methods.setCookie(AppConstant.cookie.beforeLoginUrl, to.fullPath)
        } else {
          Global.methods.removeCookie(AppConstant.cookie.beforeLoginUrl)
        }
      }
      // // 是否需要认证限制
      // for (let i = 0; i < Global.fiterPath.length; i++) {
      //   if (to.fullPath === Global.fiterPath[i]) {
      //     return next()
      //   }
      // }
      // 检测userInfo是否有用户信息
      if (store.state.accountModule.userInfo !== undefined && store.state.accountModule.userInfo.userId) {
        // debugger
        return next()
      }

      if (window.location.href.indexOf('code') !== -1) {
        if (Global.stayCurrentViewPaths.indexOf(to.path) > -1) {
          if (AppConstant.sysContext.firstEnterApp) {
            AppConstant.sysContext.firstEnterApp = false
          }
          return next()
        } else {
          if (AppConstant.sysContext.firstEnterApp) {
            debugger
            AppConstant.sysContext.firstEnterApp = false
            let currentDomain = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' : '') + window.location.port
            let pathName = window.location.pathname
            let search = window.location.search
            window.location.href = currentDomain + pathName + search
          } else {
            return next()
          }
        }
        // window.location.href = 'http://fjkj7-test1.59iedu.com:9000/wxmp?code=021eqGb62leQPQ0Fjkb62Y3yb62eqGb7&state=STATE'
        // return next()
      } else {
        debugger
        // 首次进入
        this.getAppIdRequest(Vue, Global, next, store)
      }
    })
  },
  getAppIdRequest (Vue, Global, next, store) {
    let query = Global.methods.getQuery()
    if (query.code) {
      return next()
    }
    let params = {}
    store.dispatch(storeTypes.ACCOUNT_WX_APPID_REQUEST, params).then(data => {
      if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
        // 跳转到微信授权页 重定authnLogin
        // let redirectAddress = console.mainPage.getCookie(AppConstant.cookie.beforeLoginUrl)
        // if (redirectAddress === undefined) {
        //   redirectAddress = '/'
        // }
        // if (!redirectAddress || redirectAddress.indexOf(console.mainPage.AuthLogin) !== -1) {
        //   redirectAddress = console.mainPage.HOME
        // }

        let REDIRECT_URI = encodeURI(AppConstant.sysContext.wxRedirectURI)  //  + '/#' + redirectAddress
        let APP_ID = data.data.WXAppId
        Global.methods.setCookie(AppConstant.cookie.appId, APP_ID)
        let path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APP_ID + '&redirect_uri=' + REDIRECT_URI +
          '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        Global.methods.setCookie('authPath', path)
        window.location.href = path
      }
    }).catch(e => {
      console.log('e>>>>>' + e)
    })
  }
}

