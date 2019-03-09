import * as storeTypes from '../types'
import {request} from '../fetch'

const state = {}
const actions = {
  /**
   * 请求 课程详情
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.COURSE_PLAY_COURSE_DETAIL]({commit}, params) {
    let type = 'POST'
    let url = 'mobile/home/mobileTrainning/getCourseById'
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
   * 请求  课程目录列表
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.COURSE_PLAY_COURSE_Directory_List]({commit}, params) {
    let type = 'post'
    let url = 'mobile/home/mobileTrainning/getChapterList'
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
   * 请求  课程播放信息
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.COURSE_PLAY_MSG]({commit}, params) {
    let type = 'post'
    let url = 'mobile/home/mobileTrainning/getCoursePlay'
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
const mutations = {}
const getters = {}
export default {
  state,
  getters,
  actions,
  mutations
}
