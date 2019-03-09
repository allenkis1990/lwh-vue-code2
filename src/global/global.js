/**
 * Created by 46607 on 2017/7/8.
 */
import { AjaxPlugin, cookie, querystring } from 'vux'
import AppConstant from './constants/AppConstant'
import * as storeTypes from '../store/types'
const fiterPath = ['']
let tourist = {
  // firstView: '/echartsTest',
  firstView: '/loginByPassword',
  // h5游客能访问的页面
  h5VisiterViews: ['/loginByPassword','/forgotPassword','/echartsTest','/authLoginH5','/regiter','/agreement','/forgotPasswordSuccessful'],
  // wx游客能访问的页面
  wxVisiterViews: ['/loginByPassword','/forgotPassword','/echartsTest','/authLogin','/login','/regiter','/agreement','/forgotPasswordSuccessful']
}
let isWeiXin = function () {
  var ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
    return true
  } else {
    return false
  }
}
// 登录后跳转方法
export default {
  stayCurrentViewPaths: ['/H5OrderPagePaidSuccess','/','/authLoginH5','/demo/newHome','/authLogin'], // 刷新后不需要跳到首页的路由集合
  tourist: tourist, // 游客去的第一个页面
  cookie: cookie,
  fiterPath: fiterPath,
  data () {
    return {
      pages: { // 页面
        Home: '/demo/newHome', // 首页
        Login: '/login', // 登录页
        AuthLogin: '/authLogin', // 自动登录
        loginByPassword: '/loginByPassword'
      },
      currentUrlHash: null,
      fromWhere: null
    }
  },
  // beforeRouteEnter: (to, from, next) => {
  //   console.log(isWeiXin())
  //   // H5游客
  //   if (!isWeiXin() && !AppConstant.sysContext.isLogin) {
  //     console.log(to,'tototo',this)
  //     if (tourist.h5VisiterViews.indexOf(to.path) < 0) {
  //       console.log('游客不可进入！！！！！！')
  //       // next()
  //     } else {
  //       next()
  //     }
  //     // 微信游客
  //   } else if (isWeiXin() && !AppConstant.sysContext.isLogin) {
  //     if (tourist.wxVisiterViews.indexOf(to.path) < 0) {
  //       console.log('游客不可进入！！！！！！')
  //       // next()
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next()
  //   }
  // },
  beforeRouteLeave (to, from, next) {
    let isLoading = this.$store.state.loadInfo.isLoading
    if (isLoading) {
      this.hideLoading()
    }
    next()
  },
  methods: {
    setHeaderDomain (domain) {
      if (domain) {
        AjaxPlugin.$http.defaults.headers.post['Hb-Domain-Path'] = domain
        AjaxPlugin.$http.defaults.headers.get['Hb-Domain-Path'] = domain
      }
    },
    showLoading (text) {
      this.$store.dispatch(storeTypes.GLOBAL_ADD_LOADING, text)
    },
    hideLoading () {
      this.$store.dispatch(storeTypes.GLOBAL_REMOVE_LOADING)
    },
    toast (text) {
      if (text === undefined || text === '') {
        return
      }
      this.$vux.toast.text(text, 'middle')
    },
    push (params) {
      this.$router.push(params)
    },
    replace (params) {
      this.$router.replace(params)
    },
    back () {
      this.$router.back()
    },
    backTop () {
      document.body.scrollTop = 0
    },
    setCookie () {
      return cookie.set.apply(this, arguments)
    },
    getCookie () {
      return cookie.get.apply(this, arguments)
    },
    removeCookie (key, options) {
      return cookie.remove(key, options)
    },
    getQuery () {
      return querystring.parse(window.location.search.replace(/^\?/, ''))
    },
    getUnionIDAndOpendIDFromCookie () {
      let unionId = this.getCookie(AppConstant.cookie.unionId)
      let openId = this.getCookie(AppConstant.cookie.openId)
      // let unionId = window.localStorage.getItem(AppConstant.localStorage.unionId)
      // let openId = window.localStorage.getItem(AppConstant.localStorage.openId)
      if (openId === undefined || unionId === undefined || openId.length === 0 || unionId === 0) {
        return false
      }
      return true
    },
    getAccountAndPasswordFormCookie () {
      let account = this.getCookie(AppConstant.cookie.account)
      let password = this.getCookie(AppConstant.cookie.password)
      if (account === undefined || password === undefined || account.length === 0 || password === 0) {
        return false
      }
      return false
    },
    goBeforeUrl () {
      let url = this.getCookie(AppConstant.cookie.beforeLoginUrl)
      if (!url || url.indexOf(this.pages.AuthLogin) !== -1) {
        this.$router.push(this.pages.Home)
      } else {
        this.$router.push({
          path: url
        })
        this.removeCookie(AppConstant.cookie.beforeLoginUrl)
      }
    },
    ajaxGet (url, options) {
      return this.$http.get(url, options)
        .then((data) => {
          return data
        }, (error, config) => {
          console.log(error, config)
        })
    },
    ajaxPost (url, options) {
      return this.$http.post(url, options)
        .then((data) => {
          return data
        })
    },
    errorInfo (message) {
      this.$vux.toast.show({
        type: 'text',
        width: '20em',
        text: `<span style="padding: 15px;word-break: break-all;box-sizing: border-box;display: inline-block;">${message}</span>`
      })
    },
    /**
     * 复制文字
     */
    copyArticle (txt) {
      let _this = this
      function copyFn() {
        var range = document.createRange()
        var copyContent = document.getElementById('copyArticle')
        copyContent.innerText = txt
        console.log(copyContent)
        range.selectNode(copyContent)
        var selection = window.getSelection()
        if (selection.rangeCount > 0) selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('copy')
        _this.toast('复制成功！')
      }
      if (!document.getElementById('copyArticle')) {
        let copyTag = document.createElement('div')
        copyTag.id = 'copyArticle'
        copyTag.style = 'opacity: 0;position:fixed;left:-20000px;top:-20000px;'
        document.documentElement.appendChild(copyTag)
        copyFn()
      } else {
        copyFn()
      }
//        console.log('复制成功！')
    },
    // 打电话
    giveRing(telNum) {
      if (!document.getElementById('telTag')) {
        let telTag = document.createElement('a')
        telTag.href = 'tel:' + telNum
        telTag.id = 'telTag'
        telTag.style = 'display: none'
        document.documentElement.appendChild(telTag)
        let e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        document.getElementById('telTag').dispatchEvent(e);
      } else {
        let e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        document.getElementById('telTag').dispatchEvent(e);
      }
    },
    commonConfirm (that,data) {
      that.$vux.confirm.show({
        title: '提示',
        content: data.head.message,
        confirmText: '知道了',
        cancelText: '复制域名',
        onCancel: function () {
          console.log('取消删除')
          that.copyArticle(data.data)
        },
        onConfirm: function () {
          console.log('确认删除')
        }
      })
    },
    // 去购买学分页面前校验这个年度是否开放购买学分，是否有商品上架
    checkOpenBuyCredit (year) {
//       如果当前年度没有上架的商品提示
      let params = {
        yearName: year
      }
      this.$vux.loading.show({
        text: '处理中'
      })
      return new Promise((resolve, reject) => {
        this.$store.dispatch(storeTypes.CHECK_OPEN_BUY_CREDIT, params).then((data) => {
          this.$vux.loading.hide()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            if (data.data === true) {
              resolve(true)
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: '当前继续教育年度暂未开放报名！',
                buttonText: '知道了',
                onShow () {
                },
                onHide () {
                }
              })
              resolve(false)
            }
          } else {
            this.toast('请求失败')
            resolve(false)
          }
        })
      })
    },
//      如果mark为true则用在其他页面点击前往购买时 false是登录成功后的判断
    getStudentOrderTipInfo (params,callback,year,mark) {
      let _this = this
      this.$store.dispatch(storeTypes.GET_STUDENT_ORDER_TIP_INFO, params).then((data) => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          if (data.data.haveData) {
//              存在一笔尚未支付的订单
            if (data.data.studentOrderTipInfo && data.data.studentOrderTipInfo.haveExistsToBePaidOrder) {
              this.$vux.confirm.show({
                title: '提示',
                content: '当前存在一笔尚未支付的订单，请前往处理',
                confirmText: '前往支付',
                cancelText: '暂不处理',
                onCancel: function () {
                  // if (callback) {
                  //   if (year) {
                  //     _this.checkOpenBuyCredit(year).then((res) => {
                  //       if (res) {
                  //         callback(year)
                  //       }
                  //     })
                  //   } else {
                  //     _this.$store.dispatch(storeTypes.GET_ALL_ORDER_YEAR).then((re) => {
                  //       if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                  //         if (re.data && re.data.length && re.data[0]) {
                  //           _this.checkOpenBuyCredit(re.data[0]).then((res) => {
                  //             if (res) {
                  //               callback(re.data[0])
                  //             }
                  //           })
                  //         }
                  //       } else {
                  //         let currentYear = new Date().getFullYear() + ''
                  //         _this.checkOpenBuyCredit(currentYear).then((res) => {
                  //           if (res) {
                  //             callback(currentYear)
                  //           }
                  //         })
                  //       }
                  //     })
                  //   }
                  // }
                },
                onConfirm: function () {
                  _this.$router.push({
                    path: '/orderDetail',
                    query: {
                      orderNo: data.data.studentOrderTipInfo.orderNo
                    }
                  });
                }
              })
              return false
            }
//              没购满90学分
            if ((data.data.studentOrderTipInfo && data.data.studentOrderTipInfo.recommendedPurchaseCredit > 0)) {
              if (!mark) {
                this.$vux.confirm.show({
                  title: '提示',
                  content: '亲，' + _this.$store.state.accountModule.userInfo.userName + '。' + data.data.studentOrderTipInfo.yearName + '继续教育年度，您存在' + data.data.studentOrderTipInfo.recommendedPurchaseCredit + '学分尚未购买，请前往购买！',
                  confirmText: '前往购买',
                  cancelText: '暂不处理',
                  onCancel: function () {
                  },
                  onConfirm: function () {
                    _this.checkOpenBuyCredit(data.data.studentOrderTipInfo.yearName).then((res) => {
                      if (res) {
                        _this.$router.push({
                          path: '/createOrder',
                          query: {
                            currentYear: data.data.studentOrderTipInfo.yearName
                          }
                        });
                      }
                    })
                  }
                })
              } else {
                if (callback) {
                  let trainYear = year || data.data.studentOrderTipInfo.yearName
                  this.checkOpenBuyCredit(trainYear).then((res) => {
                    if (res) {
                      callback(trainYear)
                    }
                  })
                }
              }
            }
          } else {
            if (callback) {
              this.checkOpenBuyCredit(year).then((res) => {
                if (res) {
                  callback()
                }
              })
            }
          }
        } else {
          this.toast('请求失败')
        }
      })
    }
  },
  AppConstant,
  isWeiXin: isWeiXin
}
