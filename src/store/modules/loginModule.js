/**
 * Created by admin on 2017/11/8.
 */
import * as storeTypes from '../types'
import { fetchLogin } from '../fetch'
import AppConstant from '../../global/constants/AppConstant'
import Utils from '@/common/util/Utils'

const state = {}
const actions = {
  // 登录
  [storeTypes.LOGIN_LOGIN] ({commit, dispatch, state}, obj) {
    let loginUrl = AppConstant.apiUrl.casModule.login
    let ssoUrl = AppConstant.apiUrl.casModule.sso
    let casUrl = AppConstant.sysContext.casHost
    // let serverUrl = AppConstant.sysContext.apiPlatformHost
    let serverUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' : '') + window.location.port + '/'
    // 【第一步】url
    let firstUrl = casUrl + loginUrl
    let target = serverUrl + ssoUrl
    let requestUrl = firstUrl + '?' + 'TARGET=' + target + '&' + 'js=' + ''
    return dispatch(storeTypes.LOGIN_REQUEST, requestUrl)
      .then((data) => {
        return (data)
      }).catch(e => {
        console.log('>>' + e)
      })
  },
  /**
   * cas的第一步网络请求
   * @param commit
   * @param requestObj
   */
  [storeTypes.LOGIN_REQUEST] ({commit}, requestUrl) {
    return fetchLogin(requestUrl).then(function (data) {
      return data
    }, function (data) {
      return ({head: {code: 700, message: '请求失败'}})
    })
  },
  /**
   * 增加加载状态计数
   * @param commit
   * @param message
   */
  [storeTypes.LOGIN_ADD_LOADING] ({commit}, message) {
    commit(storeTypes.LOGIN_ADD_LOADING, message)
  },

  /**
   * 消减加载状态计数
   * @param commit
   */
  [storeTypes.LOGIN_REMOVE_LOADING] ({commit}) {
    commit(storeTypes.LOGIN_REMOVE_LOADING)
  },
  // 把使用帐号密码登录的cas script插入document
  [storeTypes.INIT_CAS_REQUEST] ({commit},params) {
    // 如果登录的script标签插入过了就移除
    function checkAndRemoveScript () {
      let script = document.getElementById('_login_script')
      if (script) {
        script.parentNode.removeChild(script)
      }
    }
    window.processLogin = window.loginCallback = function (data) {
      if (data.code === 603) {
        let requestUrl = data.location + '&' + 'async=true'
        params.context.$http.request({
          method: 'get',
          url: requestUrl
        }).then(res => {
          console.log(res.data);
          if (res.data.state) {
            console.log('=========================帐号登录结果==============' + data.msg)
            params.context.$http.request({
              method: 'get',
              url: AppConstant.sysContext.apiPlatformHost + 'mobile/user/userInfo/getUserInfo' + '?&requestString=' + Utils.requestString('')
            }).then(userdata => {
              if (userdata.data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                // 如果是从注册成功后登录成功的打一个标记，用于延迟三秒再发待支付订单弹窗，因为登录成功倒计时3秒
                if (params.isFromRegist) {
                  params.context.$store.commit(storeTypes.SET_FROM_REGIST, true)
                }
                AppConstant.sysContext.isLogin = true
                params.context.$store.commit(storeTypes.GLOBAR_LOGIN_SET, true)
                params.context.$store.commit(storeTypes.ACCOUNT_SET_USERINFO, userdata.data.data.userInfo)
                params.context.setCookie(AppConstant.cookie.userInfo, JSON.stringify(userdata.data.data.userInfo))
                return params.resolve({state: true, message: '登录成功'})
              } else {
                return params.resolve({state: false, message: '无法读取用户信息，请与客服联系'})
              }
            }).catch(e => {
              console.log('--------------------------用户信息接口异常----------------------' + e)
              return params.resolve({state: false, message: '无法读取用户信息，请与客服联系'})
            })
          } else {
            console.log('--------------------------cas登录第三步失败----------------------' + data.code)
            params.resolve({state: false, message: '登录失败'})
          }
        })
      } else {
        // 将全局的函数清除掉
        console.log('--------------------------cas登录第二步失败--------------------------' + data.code)
        if (data.code === 610) {
          params.resolve({state: false, message: '帐号或密码有误'})
        } else {
          params.resolve({state: false, message: '登录失败'})
        }
      }
    }
    let casUrl = AppConstant.sysContext.casHost
     // let currentDomain = 'http://kccsv3.test1.59iedu.com:1457'
    // let currentDomain = 'http://kccsv3.test2.59iedu.com:80'
    let currentDomain = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' : '') + window.location.port
    let requestUrl = casUrl + '/login?TARGET=' + currentDomain + '/mobile/sso/auth&js&callback=processLogin';
    return new Promise((resolve, reject) => {
      checkAndRemoveScript()
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = requestUrl
      script.onload = function () {
        console.log('script load success')
        window.clearInterval(window['cauth_login_ticket_timer_id'])
        resolve('6666')
      }
      document.head.appendChild(script)
    })
  }
}
const mutations = {}
const getters = {}
export default {
  state,
  getters,
  actions,
  mutations
}
