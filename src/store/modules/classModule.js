import * as storeTypes from '../types'
import { request } from '../fetch'

const state = {
  yearList: [],
  myTrainingList: [],
  skuPropertySearch: {},
  classDetail: {},
  classWrapAssessment: {},
  courseList: [],
  selectedCourseWrapList: [],
  isFromShopCart: false
}
const actions = {
  /**
   * 请求我的班级年度数组
   * @param commit
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_YEARS_REQUEST] ({commit}) {
    let type = 'get'
    let url = 'mobile/user/mobileTrainingClass/getSkuPropertyValuesByName'
    let param = {
      skuPropertyName: '培训年度'
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.CLASS_YEARS_SET, data.data.skuPropertyValueList)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 请求  我的班级的班级列表
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_MYLIST_REQUEST] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/user/mobileTrainingClass/getMyClassInfoTemp'
    let param = {
      skuPropertySearchList: []
    }
    if (params.skuPropertyValueId !== '-1') {
      let a = {
        skuPropertyName: '培训年度',
        skuPropertyValueId: params.skuPropertyValueId
      }
      param.skuPropertySearchList.push(a)
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.CLASS_MYLIST_SET, data.data.trainingList)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 请求  商品班级的班级详情
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_INFO_REQUEST] ({commit}, params) {
    let type = 'get'
    let url = 'mobile/home/mobileCommodity/findTrainClassCommodityInfo'
    let param = {
      skuId: params.skuId
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.CLASS_INFO_SET, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 请求  我的班级的班级详情
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_INFO_REQUEST] ({commit}, params) {
    let type = 'GET'
    let url = 'mobile/home/mobileTrainning/getTrainDetailInfoById'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.CLASS_INFO_SET, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 获取自选课程详情
   */
  [storeTypes.COURSE_INFO_REQUEST] ({commit}, params) {
    let type = 'GET'
    let url = 'mobile/home/mobileTrainning/getCourseDetailInfo'
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.COURSE_INFO_SET, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 请求课程包信息
   */
  [storeTypes.COURSE_POOLLIST_REQUEST] ({commit}, params) {
    let type = 'GET'
    let url = 'mobile/home/mobileTrainning/findTrainingCoursePoolList'
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
   * 请求课程包下的课程信息
   */
  [storeTypes.POOL_COURSE_LIST_REQUEST] ({commit}, params) {
    let type = 'GET'
    let url = 'mobile/home/mobileTrainning/findTrainingCourseList'
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
   * 请求课程章节信息
   */
  [storeTypes.COURSE_CHAPTERLIST_REQUEST] ({commit}, params) {
    let type = 'POST'
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
   * 请求 班级是否可以购买
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_BUY_JUDGE] ({commit}, params) {
    let type = 'POST'
    let url = 'mobile/home/mobileCommodity/enablePurchase'
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
   * 加入购物车
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_ADD_SHOPPING_CART] ({commit}, params) {
    let type = 'POST'
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
  /**
   * 请求 班级的考核要求
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_ASSESSMENT_INFO_REQUEST] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/user/mobileTrainingClass/getPeriodRequire'
    let param = {
      trainingClassId: params.trainingClassId
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.CLASS_ASSESSMENT_INFO_SET, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 获取课程列表
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_COURSE_LIST_REQUEST] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/user/mobileTrainingClass/getCourseList'
    let param = {
      trainingClassId: params.trainingClassId
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.CLASS_COURSE_LIST_SET, data.data.courseList)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  /**
   * 获取选修包的列表
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.CLASS_SELECTED_COURSEWRAP_LIST_REQUEST] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/user/mobileTrainingClass/getPackageList'
    let param = {
      trainingClassId: params.trainingClassId
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.CLASS_SELECTED_COURSEWRAP_LIST_SET, data.data.electiveWrapList)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.CLASS_SELECTED_COURSE_LIST_REQUEST] ({commit}, params) {
    let type = 'post'
    let url = 'mobile/user/mobileTrainingClass/getChooseCoursePage'
    let param = {
      trainingClassId: params.trainingClassId,
      electiveWrapId: params.electiveWrapId,
      pageNo: params.pageNo,
      pageSize: params.pageSize
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          let courseList = data.data.courseList
          let electiveWrapId = params.electiveWrapId
          commit(storeTypes.CLASS_SELECTED_COURSE_LIST_SET, {courseList, electiveWrapId})
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.GET_LINEOFF_CLASS_DETAIL] ({commit}, params) {
    let type = 'GET'
    let url = 'mobile/home/mobileCommodity/getOffLineTrainClassDetail'
    return request(type, params, url)
      .then(function (data) {
        return data
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.GET_LINEOFF_CLASS_DIRECTORY] ({commit}, params) {
    let type = 'GET'
    let url = 'mobile/home/mobileCommodity/getOffLineTrainClassCourseItemList'
    return request(type, params, url)
      .then(function (data) {
        return data
      }, function (reason) {
        return ({head: {code: 700, message: '请求失败'}})
      })
  },
  [storeTypes.CLASS_DETAIL_TRAINING_ITEM] ({commit}, item) {
    commit(storeTypes.CLASS_DETAIL_TRAINING_ITEM, item)
  }
}
const mutations = {
  /**
   * 年度列表
   * @param state
   * @param yearList
   */
  [storeTypes.CLASS_YEARS_SET] (state, yearList) {
    let arry = yearList.slice()
    let all = {
      'skuPropertyValueId': '-1',
      'skuPropertyValueName': '全部'
    }
    arry.unshift(all)
    state.yearList = arry
  },
  /**
   * 我的班级列表
   * @param state
   * @param trainingList
   */
  [storeTypes.CLASS_MYLIST_SET] (state, trainingList) {
    state.myTrainingList = trainingList
  },
  [storeTypes.CLASS_DETAIL_TRAINING_ITEM] (state, item) {
    state.classDetailTrainItem = item
  },
  [storeTypes.CLASS_LIST_SEARCH_PROPERTY] (state, searchProperty) {
    state.skuPropertySearch = searchProperty
  },
  [storeTypes.CLASS_INFO_SET] (state, classDetail) {
    state.classDetail = classDetail
  },
  [storeTypes.COURSE_INFO_SET] (state, courseDetail) {
    state.courseDetail = courseDetail
  },
  [storeTypes.CLASS_ASSESSMENT_INFO_SET] (state, classWrapAssessment) {
    state.classWrapAssessment = classWrapAssessment
  },
  [storeTypes.CLASS_COURSE_LIST_SET] (state, courseList) {
    state.courseList = courseList
  },
  [storeTypes.CLASS_SELECTED_COURSEWRAP_LIST_SET] (state, selectedCourseWrapList) {
    state.selectedCourseWrapList = selectedCourseWrapList
  },
  [storeTypes.CLASS_SELECTED_COURSE_LIST_SET] (state, {courseList, electiveWrapId}) {
    let courseWrapList = state.selectedCourseWrapList
    for (let i = 0; i < courseWrapList.length; i++) {
      if (courseWrapList[i].electiveWrapId === electiveWrapId) {
        courseWrapList[i].courseList = courseList
      }
    }
  },
  [storeTypes.SET_IS_FROM_SHOPCART] (state, bool) {
    state.isFromShopCart = bool
  }
}
const getters = {
  requiredCourseList (state) {
    let courseList = state.courseList
    let requiredCourseList = []
    for (let i = 0; i < courseList.length; i++) {
      let courseItem = courseList[i]
      if (courseItem.courseType === 0) {
        requiredCourseList.push(courseItem)
      }
    }
    return requiredCourseList
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
