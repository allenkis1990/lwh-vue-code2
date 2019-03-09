// 选课培训模块
import * as storeTypes from '../types'
import { request } from '../fetch'

const state = {
}
const actions = {
  /**
   * 请求购物车学分汇总
   * @param commit
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.COUNT_SHOPPINGCART_TOTALCREDIT] ({commit},params) {
    let type = 'get'
    let url = 'mobile/user/mobileShoppingCart/statisticShoppingCartCredit'
    // let url = 'static/shoppingCart.json'
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
  /**
   * 请求我的班级年度数组
   * @param commit
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.GET_SHOPPINGCART_LIST] ({commit},params) {
    let type = 'get'
    let url = 'mobile/user/mobileShoppingCart/getUserShoppingCartCommoditySkuGroupPage'
    // let url = 'static/shoppingCart.json'
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
  // 清空失效商品
  [storeTypes.CLEAR_SHOPPINGCART_DISABLED] ({commit},params) {
    let type = 'get'
    let url = 'mobile/user/mobileShoppingCart/clearInvalidCommoditySku'
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
  // 删除选课清单商品
  [storeTypes.DELETE_SHOPPINGCART_GOODS] ({commit},params) {
    let type = 'post'
    let url = 'mobile/user/mobileShoppingCart/putOffShoppingCart'
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
  // 获取购物车中某个年度选课数据汇总
  [storeTypes.COUNT_SHOPPINGCART_CREDIT] ({commit},params) {
    let type = 'post'
    let url = 'mobile/user/mobileShoppingCart/countShoppingCartCredit'
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
