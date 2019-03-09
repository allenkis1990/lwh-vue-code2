// import * as storeTypes from '@/store/types'
import AppConstant from '@/global/constants/AppConstant'
import Global from '@/global/global'
export default {
  auth: function (router, store, Global) {
    router.beforeEach((to, from, next) => {
      if (Global.stayCurrentViewPaths.indexOf(to.path) > -1) {
        if (AppConstant.sysContext.firstEnterApp) {
          AppConstant.sysContext.firstEnterApp = false
        }
        return next()
      } else {
        if (AppConstant.sysContext.firstEnterApp) {
          AppConstant.sysContext.firstEnterApp = false
          let currentDomain = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' : '') + window.location.port
          let pathName = window.location.pathname
          window.location.href = currentDomain + pathName
        } else {
          return next()
        }
      }
    })
  }
}
