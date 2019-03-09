/**
 * 华博CAS登录
 */
import Utils from '../util/Utils'
import AppConstant from '../../global/constants/AppConstant'

export default {
  /**
   * 登录
   */
  login: function (openId, unionId, accessToken, nickname, context, console, storeTypes, isFromRegist) {
    return new Promise((resolve, reject) => {
      // 先清除CAS缓存。避免短时间执行CAS登录，接口返回FFSO_LOGIN错误
      var loginCallbackState = false // 登录的回调状态，用来标识是否调用loginCallback函数
      window.loginCallback = function (data) {
        loginCallbackState = true
        if (data.code === 603) {
          let requestUrl = data.location + '&' + 'async=true'
          context.$http.request({
            method: 'get',
            url: requestUrl
          }).then(data => {
            if (data.data.state) {
              console.log('=========================帐号登录结果==============' + data.data.msg)
              context.$http.request({
                method: 'get',
                url: AppConstant.sysContext.apiPlatformHost + 'mobile/user/userInfo/getUserInfo' + '?&requestString=' + Utils.requestString('')
              }).then(data => {
                if (data.data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                  // 如果是从注册成功后登录成功的打一个标记，用于延迟三秒再发待支付订单弹窗，因为登录成功倒计时3秒
                  if (isFromRegist) {
                    context.$store.commit(storeTypes.SET_FROM_REGIST, true)
                  }
                  context.$store.commit(storeTypes.ACCOUNT_SET_USERINFO, data.data.data.userInfo)
                  context.setCookie(AppConstant.cookie.userInfo, JSON.stringify(data.data.data.userInfo))
                  AppConstant.sysContext.isLogin = true
                  context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true)
                  return resolve({state: true, message: '登录成功'})
                } else {
                  return resolve({state: false, message: '无法读取用户信息，请与客服联系'})
                }
              }).catch(e => {
                console.log('--------------------------用户信息接口异常----------------------' + e)
                return resolve({state: false, message: '无法读取用户信息，请与客服联系'})
              })
            } else {
              console.log('--------------------------cas登录第三步失败----------------------' + data.code)
              resolve({state: false, message: '登录失败'})
            }
          })
          window.loginCallback = undefined
        } else {
          // 将全局的函数清除掉
          window.loginCallback = undefined
          console.log('--------------------------cas登录第二步失败--------------------------' + data.code)
          if (data.code === 610) {
            resolve({state: false, message: '帐号或密码有误'})
          } else {
            resolve({state: false, message: '登录失败'})
          }
        }
      }
      context.$store.dispatch(storeTypes.LOGIN_LOGIN).then(data => {
        if (window.ssoLogin === undefined || window.ssoLogin === null) {
          return
        }
        window.ssoLogin.lt = encodeURIComponent(window.ssoLogin.lt)  // 对+号进行转义
        window.ssoLogin = window.ssoLogin
        window.ssoLogin && window.ssoLogin.login({
          accessToken: accessToken,
          unionId: unionId,
          openId: openId,
          nickname: nickname,
          loginIdType: 1,
          type: 42,
          figureUrl100: '',
          figureUrl50: '',
          gender: 0
        }, '{\'portalType\':\'mall\'}').then(function (data) {
          if (loginCallbackState === false) {
            resolve({state: false, message: '登录失败'})
          }
        }) // end ssoLogin.login
      }).catch(e => {
        console.log(e)
        resolve({state: false, message: '登录失败'})
      })
    }, (e) => {
      console.log('--------------------------登录异常--------------------------' + JSON.stringify(e))
    })
  },
  getwxInfo: function (context, console, storeTypes, query, AppConstant) {
    return new Promise((resolve, reject) => {
      context.$store.dispatch(storeTypes.ACCOUNT_WX_INFO_REQUEST, query.code).then(data => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          context.setCookie(AppConstant.cookie.openId, data.data.openId)
          context.setCookie(AppConstant.cookie.unionId, data.data.unionId)
          // window.localStorage.setItem(AppConstant.localStorage.unionId, data.data.unionId)
          // window.localStorage.setItem(AppConstant.localStorage.openId, data.data.openId)
          resolve(true)
        }
        console.log('---------------------获取微信的unionId和openId失败---------------------------------' + data)
        resolve(false)
      })
    }, (e) => {
      console.log('---post--response:' + JSON.stringify(e))
    })
  },
  hasBindWX: function (context, console, storeTypes, AppConstant) {
    return new Promise((resolve, reject) => {
      // @todo 改成从localstorage读取
      let params = {
        unionId: context.getCookie(AppConstant.cookie.unionId),
        openId: context.getCookie(AppConstant.cookie.openId)
      }
      // let params = {
      //   unionId: window.localStorage.getItem(AppConstant.localStorage.unionId),
      //   openId: window.localStorage.getItem(AppConstant.localStorage.openId)
      // }
      context.$store.dispatch(storeTypes.ACCOUNT_WX_HASBIND_REQUEST, params).then(data => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          if (data.data.haveBind) {
            resolve(true)
          }
        }
        resolve(false)
      })
    }, (e) => {
      console.log('---post--response:' + JSON.stringify(e))
    })
  },
  loginHtml5: function (context,storeTypes,account,password,isFromRegist) {
    return new Promise((resolve, reject) => {
      context.$store.dispatch(storeTypes.INIT_CAS_REQUEST, {context: context, resolve: resolve,isFromRegist: isFromRegist}).then(parData => {
        if (window.ssoLogin === undefined || window.ssoLogin === null) {
          return
        }
        // 初始化CAS时如果第一步里有SSOLOGIN说明还没登陆，这时候没有帐号密码不需要调用SSOLOGIN而是直接写死code500
        if (!account || !password) {
          window.loginCallback({code: 500})
        } else {
          window.ssoLogin && window.ssoLogin.login({
            username: account,
            password: password,
            accountType: 1
          }, '{\'portalType\':\'mall\'}').then(function () {
          }) // end ssoLogin.login
        }
      }).catch(e => {
        console.log(e)
        resolve({state: false, message: '登录失败'})
      })
    }, (e) => {
      console.log('--------------------------登录异常--------------------------' + JSON.stringify(e))
    })
  },
  //    检验帐号合法性 注册和登录都有调用到 但是注册只用到是否停用CODE 用isRegist区分
  checkAccount(params,storeTypes,context,isRegist) {
    console.log(params);
    return new Promise((resolve,reject) => {
      context.$store.dispatch(storeTypes.CHECK_ACCOUNT, params).then((data) => {
        switch (data.head.code) {
          case storeTypes.NETWORK_RESULT_SUCCESS:
            resolve(true)
            break;
          case 803:
            context.toast('身份证号不存在');
            resolve(false)
            break;
          case 804:
            context.toast('当前帐号已被停用，无法访问！');
            resolve(false)
            break;
          case 805:
            context.toast('请先注册，再登录');
            resolve(false)
            break;
          case 806:
            context.toast('当前帐号为集体报名帐号，请前往PC端登录');
            resolve(false)
            break;
          case 807:
            context.toast('由于该帐号升级为会计专业技术人员，请先完成注册才可登录培训');
            resolve(false)
            break;
          default:
            context.toast(data.head.message);
            resolve(false)
        }
      })
    })
  }
}

