import * as storeTypes from '../types'
import { request } from '../fetch'

const state = {
  orderList: {
    havePayedList: [],
    unPayList: [],
    closeList: []
  },
  orderPayInfo: {},
  isRefreshCloseOrderListData: false,
  orderRefundLog: {},
  orderChangeLog: {
    changedOrder: {},
    originalOrder: {}
  },
  // 完善订单临时存储对象
  completeOrderTemp: {},
  completeInvoiceInfo: {},
  completeCerInfo: {},
  // 创建订单临时存储对象
  createOrderTemp: {},
  createInvoiceInfo: {},
  createCerInfo: {},
  needCompleteOrderList: [],
  orderDetailInfo: [],
  orderRefundDetailInfo: [],
  createOrderNeedInvoice: false,
  completeOrderNeedInvoice: false,
  orderEmail: '',
  showInvoiceTypeText: '请选择发票类型',
  showInvoiceSendText: '请选择配送方式',
  isNeedInvoice: false,
  invoiceInfo: {},
  areaInfo: null,
  receiveAddressInfo: null,
  selectedShoopingItemsArray: [],
  payOrderInfo: null,
  hash: null,
  // 必修课数组
  compulsoryCourseList: [],
  compulsoryConfig: {},
  saveSelectCredit: undefined,
  refundeList: []
}
const actions = {
  // 传递SKU商品列表给生成订单页面
  changeSkuListState (context,arr) {
    context.state.selectedShoopingItemsArray = arr
  },
  // 获取地区信息
  getAreaInfo (context,that) {
    if (context.state.areaInfo === null || context.state.areaInfo === undefined || context.state.areaInfo === '') {
      var type = 'get'
      var url = 'mobile/home/mobileHome/findRegion'
      return request(type, {}, url)
        .then(function (data) {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            // 设置到store
            context.state.areaInfo = data.data
            return (data.data)
          } else {
            that.toast(data.head.message)
            return (null)
          }
        }, function (reason) {
          that.toast('请求失败')
          return (null)
        })
    } else {
      return context.state.areaInfo
    }
  },
  // 获取收货信息
  getReceiveAddressInfo (context,that) {
    if (context.state.receiveAddressInfo === null || context.state.receiveAddressInfo === undefined || context.state.receiveAddressInfo === '') {
      var type = 'get'
      var url = 'mobile/user/deliveryInformation/getReceiverAddress'
      return request(type, {}, url)
        .then(function (data) {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            // 设置到store
            if (data.data.receiverId) {
              context.state.receiveAddressInfo = data.data
              return (data.data)
            } else {
              return (null)
            }
          } else {
            that.toast(data.head.message)
          }
        }, function (reason) {
          that.toast('请求失败')
          return (null)
        })
    } else {
      return context.state.receiveAddressInfo
    }
  },
  // 获取订单列表
  [storeTypes.ORDER_GET_ORDERLIST] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/pageOrder'
    return request(type, param, url)
      .then((data) => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          if (param.pageNo === 1) {
            commit(storeTypes.ORDER_CLEAR_LISTDATA, param.orderStatus)
          }
          commit(storeTypes.ORDER_SET_ORDERLIST, {resultData: data.data.currentPageData, type: param.orderStatus})
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取退款列表
  [storeTypes.ORDER_GET_ORDERLIST_REFUNDE] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/getRefundOrderPageList'
    return request(type, param, url)
      .then((data) => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          if (param.pageNo === 1) {
            commit(storeTypes.ORDER_CLEAR_LISTDATA_REFUNDE)
          }
          commit(storeTypes.ORDER_SET_ORDERLIST_REFUNDE, {resultData: data.data.currentPageData})
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 判断是否可以退款
  [storeTypes.ORDER_GET_JUDGE_REFUNDE] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/canRefund'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 提交发起退款
  [storeTypes.ORDER_GET_SUBMIT_REFUNDE] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/applyOrderRefund'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取退款理由
  [storeTypes.ORDER_GET_REASON_LIST] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/listRefundReason'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 提交发起取消退款
  [storeTypes.ORDER_GET_SUBMIT_CANCEL_REFUNDE] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/cancelOrderRefund'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  /**
   *  获取必修课程相关信息
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
  [storeTypes.ORDER_GET_COMPULSORY_COURSE_MSG] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/selfPickerCourse/compulsoryCourseList'
    return request(type, param, url)
      .then((data) => {
          return (data)
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },

  /**
   *  校验必修课学分是否更改
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.ORDER_CHECK_STUDENT_PAY_ORDER] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/checkStudentPayOrder'
    return request(type, param, url)
      .then((data) => {
        return (data)
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },

  /**
   *  校验必修课学分是否更改
   * @param commit
   * @param params
   * @returns {Promise.<TResult>|*}
   */
    [storeTypes.ORDER_GET_COMPULSORY_COURSE_CONFIG] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/getCreditOrderParams'
    return request(type, param, url)
      .then((data) => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          // 设置到store
          commit(storeTypes.ORDER_SET_COMPULSORY_COURSE_CONFIG, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },

  // 获取类型
  [storeTypes.ORDER_GET_COMPULSORY_COURSE_TYPE] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/selfPickerCourse/getCourseCatagroy'
    return request(type, param, url)
      .then((data) => {
        return (data)
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取待支付订单确认信息
  [storeTypes.ORDER_GET_CONFIRM_PAYORDER] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/mobileStudentOrder/getOrderPaidInfo'
    param.paymentChannel = 'WECHAT'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          // 设置到store
          commit(storeTypes.ORDER_SET_ORDER_PAYINFO, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取订单退款记录
  [storeTypes.ORDER_GET_REFUND_LOG] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/getRefundLog'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          // 设置到store
          commit(storeTypes.ORDER_SET_REFUND_LOG, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  [storeTypes.ORDER_GET_ORDER_PAY_INFO] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/userOrder/payByMobile'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  [storeTypes.ORDER_GET_ORDER_WXH5_PAY_INFO] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/userOrder/payByWeChatH5'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  [storeTypes.ORDER_GET_ORDER_AliH5_PAY_INFO] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/userOrder/payByAliPayH5'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取订单更改记录(换班)
  [storeTypes.ORDER_GET_CHANGE_LOG] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/getAssociateOrder'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ORDER_SET_CHANGE_LOG, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 取消订单
  [storeTypes.ORDER_CANCEL_ORDER] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/cancel'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取待完善信息的订单列表
  [storeTypes.ORDER_GET_NEED_COMPLETE_ORDER_LIST] ({commit}, param) {
    let type = 'GET'
    let url = 'mobile/user/userOrder/pageImperfectOrder'
    let params = {
      pageNo: 1,
      pageSize: 100
    }
    return request(type, params, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          let needCompleteOrderList = []
          let pageData = data.data.currentPageData
          if (pageData && pageData.length) {
            for (var i = 0; i < pageData.length; i++) {
              needCompleteOrderList.push(pageData[i])
            }
          }
          commit(storeTypes.ORDER_SET_NEED_COMPLETE_ORDER_LIST, needCompleteOrderList)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取创建订单配置信息前置条件
  [storeTypes.ORDER_GET_CREATE_CONFIG_SETTING] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/deliveryInformation/getPerfectOrderConfigBySkuId'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取完善订单配置信息前置条件
  [storeTypes.ORDER_GET_COMPLETE_CONFIG_SETTING] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/getPerfectOrderConfigByPaymentChannel'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 创建订单
  [storeTypes.ORDER_CREATE_ORDER] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/mobileStudentOrder/createOrder'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  [storeTypes.ORDER_COMPLETE_ORDER] ({commit}, param) {
    var type = 'POST'
    var url = 'mobile/user/userOrder/applyOrderInvoice'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取自取地址
  [storeTypes.ORDER_GET_SELF_PICK_ADDRESS] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/deliveryInformation/getSelfStorageList'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  [storeTypes.ORDER_GET_ELETRON_INVOICE_URL] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/mobileStudentOrder/downloadBlueBill'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 设置创建订单发票内容
  [storeTypes.ORDER_SET_CREATE_TEMP_INVOICE_INFO] ({commit}, invoiceInfo) {
    commit(storeTypes.ORDER_SET_CREATE_TEMP_INVOICE_INFO, invoiceInfo)
  },
  [storeTypes.ORDER_INVOICE_TEXT] ({commit}, text) {
    commit(storeTypes.ORDER_INVOICE_TEXT, text)
  },
  [storeTypes.ORDER_INVOICE_DER_TEXT] ({commit}, text) {
    commit(storeTypes.ORDER_INVOICE_DER_TEXT, text)
  },
  // 设置创建订单证书内容
  [storeTypes.ORDER_SET_CREATE_TEMP_CER_INFO] ({commit}, cerInfo) {
    commit(storeTypes.ORDER_SET_CREATE_TEMP_CER_INFO, cerInfo)
  },

  // 设置完善订单发票内容
  [storeTypes.ORDER_SET_COMPLETE_TEMP_INVOICE_INFO] ({commit}, invoiceInfo) {
    commit(storeTypes.ORDER_SET_COMPLETE_TEMP_INVOICE_INFO, invoiceInfo)
  },
  // 设置完善订单证书内容
  [storeTypes.ORDER_SET_COMPLETE_TEMP_CER_INFO] ({commit}, cerInfo) {
    commit(storeTypes.ORDER_SET_COMPLETE_TEMP_CER_INFO, cerInfo)
  },
  // 获取订单详情
  [storeTypes.ORDER_GET_ORDER_DETAIL] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/getOrderDetail'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ORDER_SET_ORDER_DETAIL, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  // 获取订单详情
  [storeTypes.ORDER_GET_ORDER_REFUND_ETAIL] ({commit}, param) {
    var type = 'GET'
    var url = ''
    if (param.enterType == 1) {
      url = 'mobile/user/userOrder/getOrderRefundDetailByrefundOrderNo'
    } else {
      url = 'mobile/user/userOrder/getOrderRefundDetail'
    }
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          commit(storeTypes.ORDER_SET_ORDER_REFUND_ETAIL, data.data)
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  },
  [storeTypes.GET_STUDENT_ORDER_TIP_INFO] ({commit}, param) {
    var type = 'GET'
    var url = 'mobile/user/userOrder/getStudentOrderTipInfo'
    return request(type, param, url)
      .then(function (data) {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          return (data)
        } else {
          return (data)
        }
      }, function (reason) {
        return ({ head: { code: 700, message: '请求失败' } })
      })
  }
}
const mutations = {
  /**
   * 我的班级列表
   * @param state
   * @param courseList
   */
  [storeTypes.ORDER_SET_COMPULSORY_COURSE_MSG] (state, courseList) {
    state.compulsoryCourseList = courseList
  },

  [storeTypes.ORDER_SET_ORDERLIST] (state, {resultData, type}) {
    switch (type) {
      case 'WAIT_FOR_PAYMENT': {
        state.orderList.unPayList = state.orderList.unPayList.concat(resultData)
        break
      }
      case 'HAVE_PAID': {
        state.orderList.havePayedList = state.orderList.havePayedList.concat(resultData)
        break
      }
      case 'TRADE_CLOSE': {
        state.orderList.closeList = state.orderList.closeList.concat(resultData)
        break
      }
    }
  },
  [storeTypes.ORDER_SET_ORDERLIST_REFUNDE] (state, {resultData}) {
    state.refundeList = state.refundeList.concat(resultData)
  },
  [storeTypes.ORDER_CLEAR_LISTDATA] (state, type) {
    switch (type) {
      case 'WAIT_FOR_PAYMENT': {
        state.orderList.unPayList = []
        break
      }
      case 'HAVE_PAID': {
        state.orderList.havePayedList = []
        break
      }
      case 'TRADE_CLOSE': {
        state.orderList.closeList = []
        break
      }
    }
  },
  [storeTypes.ORDER_CLEAR_LISTDATA_REFUNDE] (state) {
    state.refundeList = []
  },
  [storeTypes.ORDER_SAVE_SELECT_CREDIT] (state, saveSelectCredit) {
    state.saveSelectCredit = saveSelectCredit
  },
  // 临时存储新建订单时发票信息
  [storeTypes.ORDER_SET_CREATE_TEMP_INVOICE_INFO] (state, invoiceInfo) {
    state.invoiceInfo = invoiceInfo
  },
  [storeTypes.ORDER_INVOICE_TEXT] (state, text) {
    state.showInvoiceTypeText = text
  },
  [storeTypes.ORDER_INVOICE_DER_TEXT] (state, text) {
    state.showInvoiceSendText = text
  },
  // 临时存储新建订单时证书信息
  [storeTypes.ORDER_SET_CREATE_TEMP_CER_INFO] (state, cerInfo) {
    state.createCerInfo = cerInfo
  },
  // 临时存储完善订单时发票信息
  [storeTypes.ORDER_SET_COMPLETE_TEMP_INVOICE_INFO] (state, invoiceInfo) {
    state.completeInvoiceInfo = invoiceInfo
  },
  // 临时存储完善订单时证书信息
  [storeTypes.ORDER_SET_COMPLETE_TEMP_CER_INFO] (state, cerInfo) {
    state.completeCerInfo = cerInfo
  },
  [storeTypes.ORDER_SET_ORDER_PAYINFO] (state, orderPayInfo) {
    state.orderPayInfo = orderPayInfo
  },
  [storeTypes.ORDER_SET_COMPULSORY_COURSE_CONFIG] (state, compulsoryConfig) {
    state.compulsoryConfig = compulsoryConfig
  },
  [storeTypes.ORDER_SET_REFUND_LOG] (state, orderRefundLog) {
    state.orderRefundLog = orderRefundLog
  },
  [storeTypes.ORDER_SET_CHANGE_LOG] (state, orderChangeLog) {
    state.orderChangeLog = orderChangeLog
  },
  [storeTypes.ORDER_SET_NEED_COMPLETE_ORDER_LIST] (state, needCompleteOrderList) {
    state.needCompleteOrderList = needCompleteOrderList
  },
  [storeTypes.ORDER_SET_ORDER_DETAIL] (state, orderDetailInfo) {
    state.orderDetailInfo = orderDetailInfo
  },
  [storeTypes.ORDER_SET_ORDER_REFUND_ETAIL] (state, orderRefundDetailInfo) {
    state.orderRefundDetailInfo = orderRefundDetailInfo
  },
  [storeTypes.ORDER_SET_ISREFEASHCLOSEORDERLISTDATA] (state, isRefreshCloseOrderListData) {
    state.isRefreshCloseOrderListData = isRefreshCloseOrderListData
  },
  [storeTypes.CREATE_ORDER_NEED_INVOICE] (state, needInvoice) {
    state.createOrderNeedInvoice = needInvoice
  },
  [storeTypes.COMPLETE_ORDER_NEED_INVOICE] (state, needInvoice) {
    state.completeOrderNeedInvoice = needInvoice
  },
  [storeTypes.ORDER_SET_ORDEREMAIL] (state,email) {
    state.orderEmail = email;
  }
}
const getters = {
  orderList (state) {
    return state.orderList
  },
  refundeList(state) {
    return state.refundeList
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
