// 选课培训模块
import * as storeTypes from '../types'
import {request} from '../fetch'

const state = {
  selectCourseRecommend: {}
}
const actions = {
  /**
   * 请求我的班级年度数组
   * @param commit
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.SELECT_TRAIN_HELPLIST] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/home/mobileCommodity/listIntelligentRecommendCourseByUserGrade'
    // let url = 'static/autoSelectCourseList.json'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  // 获取选课记录
  [storeTypes.SELECT_COURSE_RECORD] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/user/userOrder/buyCoursePage'
    // let url = 'static/selectCourseRecord.json'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.LIST_SALE_COURSE_CATEGORY] ({commit}, params) {
    let type = 'get'
    // let url = 'mobile/user/userOrder/buyCourseList'
    let url = 'mobile/home/mobileCommodity/listSaleCourseCategory'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.SELECT_COURSE] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/user/userOrder/create'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.ADD_SHOPPINGCART] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/user/mobileShoppingCart/addShoppingCart'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  // 获取快速选课推荐
  [storeTypes.SELECT_COURSE_RECOMMEND] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/user/mobileStudentCredit/countStudentCredit'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  // 获取自主选课SKU
  [storeTypes.GET_SELF_SKU_LIST] ({commit}) {
    let params = {
      categoryType: 'COURSE_SUPERMARKET_GOODS',
      trainingClassType: '1',
      propertyQueries: []
    }
    let type = 'get'
    let url = 'mobile/home/mobileCommodity/listSkuProperty'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  // 获取学分购买情况
  [storeTypes.GET_CREDIT_SITUATION] ({commit}) {
    let params = {}
    let type = 'get'
    let url = 'mobile/user/mobileStudentCredit/latestYearCreditSituation'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  // 获取学分年度数组
  [storeTypes.GET_ALL_ORDER_YEAR] ({commit}) {
    let params = {}
    let type = 'get'
    let url = 'mobile/user/userOrder/getAllOrderYear'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.YEAR_LEARN_SITUATION] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/user/userOrder/yearLearnSituation'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  // 校验当前年度是否开放学分购买
  [storeTypes.CHECK_OPEN_BUY_CREDIT] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/user/userOrder/checkOpenBuyCredit'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  // 进入自主选课的前置判断
  [storeTypes.JUDGE_ENTER_SELFSELECT_COURSE] ({commit}) {
    let type = 'get'
    let url = 'mobile/home/mobileCommodity/verificationSelectCourseCondition'
    let params = {}
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  }
}
const mutations = {
  selectCourseCommonDo (state, options) {
    // 把code可能是数字的情况转成字符串code
    options.code = options.code + ''
    switch (options.code) {
//            存在待支付的集体报名订单
      case '309033':
        options.context.toast(options.message)
        break
//            公需科目选课学分超出
      case '309034':
        options.context.toast(options.data.year + '年度的公需科目学分超出' + options.data.publicCreditDifference + ',请调整')
        break
//            专业科目选课学分超出
      case '309035':
        options.context.toast(options.data.year + '年度的专业科目学分超出' + options.data.professionalCreditDifference + ',请调整')
        break
//              公需科目和专业科目选课学分都超出
      case '309036':
        options.context.toast(options.data.year + '年度的公需科目学分超出' + options.data.publicCreditDifference + ',专业科目学分超出' + data.data.professionalCreditDifference + ',请调整')
        break
//              超出当前年度可使用学分
      case '309037':
        var temp = ''
        if (options.data.freezeCredit != undefined && options.data.freezeCredit != null && options.data.freezeCredit > 0) {
          var st = options.data.availableCredit + options.data.freezeCredit;
          temp = '您当前持有的' + st + '学分(其中' + options.data.freezeCredit + '学分处于退款中,无法使用),无法完成本课程选课,请购买学分！'
        } else {
          temp = '您当前持有的' + options.data.availableCredit + '学分,无法完成本课程选课,请购买学分！'
        }
        options.context.$vux.confirm.show({
          title: '提示',
          content: temp,
          confirmText: '前往购买',
          cancelText: '取消选课',
          onCancel: function () {
          },
          onConfirm: function () {
            let params = {}
            options.context.getStudentOrderTipInfo(params, (year) => {
              options.context.$router.push({
                path: '/createOrder',
                query: {
                  currentYear: options.year ? options.year : year
                }
              });
            }, options.year, true)
          }
        })
        break;
      case '309048':
        var temp1 = ''
        if (options.data.freezeCredit != undefined && options.data.freezeCredit != null && options.data.freezeCredit > 0) {
          var st1 = options.data.availableCredit + options.data.freezeCredit;
          temp1 = '您当前持有的' + st1 + '学分(其中' + options.data.freezeCredit + '学分处于退款中,无法使用),无法完成本课程选课,请购买学分！'
        } else {
          temp1 = '您当前持有的' + options.data.availableCredit + '学分,无法完成本课程选课,请购买学分！'
        }
        options.context.$vux.confirm.show({
          title: '提示',
          content: temp1,
          confirmText: '前往购买',
          cancelText: '取消选课',
          onCancel: function () {
          },
          onConfirm: function () {
            let params = {}
            options.context.getStudentOrderTipInfo(params, (year) => {
              options.context.$router.push({
                path: '/createOrder',
                query: {
                  currentYear: options.year ? options.year : year
                }
              });
            }, options.year, true)
          }
        })
        break;
//              已完成指定年度公需科目选
      case '309038':
        options.context.toast(options.message)
        break
//              已完成指定年度专业科目选课
      case '309039':
        options.context.toast(options.message)
        break
//              完成指定年度的所有选课，无需再次选课
      case '309040':
        options.context.toast(options.message)
        break
//              商品已下架
      case '309042':
        options.context.toast(options.message)
        break
//              部分课程选课失败，请联系客服处理。详情请查看选课记录
      case '309043':
        options.context.$vux.confirm.show({
          title: '提示',
          content: options.message,
          confirmText: '拨打联系客服',
          cancelText: '知道了',
          onCancel: function () {
          },
          onConfirm: function () {
            options.context.giveRing('968823')
          }
        })
        break
//              用户等级和课程不匹配
      case '309045':
        options.context.toast(options.message)
        break
//              您存在部分课程选课失败的记录，暂时无法继续选课。请联系客服处理。详情请查看选课记录
      case '309046':
        options.context.$vux.confirm.show({
          title: '提示',
          content: options.message,
          confirmText: '拨打联系客服',
          cancelText: '知道了',
          onCancel: function () {
          },
          onConfirm: function () {
            options.context.giveRing('968823')
          }
        })
        break
//              商品收款账号没有配置，请联系客服处理
      case '309047':
        options.context.$vux.confirm.show({
          title: '提示',
          content: options.message,
          confirmText: '拨打联系客服',
          cancelText: '知道了',
          onCancel: function () {
          },
          onConfirm: function () {
            options.context.giveRing('968823')
          }
        })
        break
      default:
        options.context.toast(options.message ? options.message : '请求失败')
    }
  },
  rememberCircleData (state, obj) {
    state.selectCourseRecommend = obj
  }
  // [storeTypes.CLASS_YEARS_SET] (state, yearList) {
  //   let arry = yearList.slice()
  //   let all = {
  //     'skuPropertyValueId': '-1',
  //     'skuPropertyValueName': '全部'
  //   }
  //   arry.unshift(all)
  //   state.yearList = arry
  // }
}
const getters = {
  // requiredCourseList (state) {
  //   let courseList = state.courseList
  //   let requiredCourseList = []
  //   for (let i = 0; i < courseList.length; i++) {
  //     let courseItem = courseList[i]
  //     if (courseItem.courseType === 0) {
  //       requiredCourseList.push(courseItem)
  //     }
  //   }
  //   return requiredCourseList
  // }
}
export default {
  state,
  getters,
  actions,
  mutations
}
