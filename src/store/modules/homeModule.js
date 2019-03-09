import * as storeTypes from '../types'
import {request} from '../fetch'

const state = {
  msgType: 1
}
const actions = {

  /**
   * 请求  政策法规--培训通知等等数据
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.HOME_GET_MSG]({commit}, params) {
    let type = 'get'
    let url = 'mobile/home/mobileMessage/getMessagePage'


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
   * 请求  政策法规--培训通知等数据的详情
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.HOME_GET_MSG_DETAIL]({commit}, params) {
    let type = 'get'
    let url = 'mobile/home/mobileMessage/getMessageDetail'


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

}
const mutations = {
  /**
   * 保存type
   * @param state
   * @param msgType
   */
    [storeTypes.HOME_SAVE_MSGTYPE](state, type) {
    state.msgType = type
  },
}
const getters = {}
export default {
  state,
  getters,
  actions,
  mutations
}
