import AppConstant from '../global/constants/AppConstant'

export default {
  hasLogin (state) {
    // if (state.hasLogin === false) {
    //   if (console.mainPage !== undefined) {
    //     // debugger
    //     let info = console.mainPage.getCookie(AppConstant.cookie.userInfo)
    //     // debugger
    //     if (info !== undefined && info !== null) {
    //       state.hasLogin = true
    //     }
    //   }
    // }
    return state.hasLogin
  },
  serverContextInfo (state) {
    return state.serverContextInfo
  }
}
