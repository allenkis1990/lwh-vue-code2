import { request } from '@/store/fetch'
import * as storeTypes from '@/store/types'
export default {
  /**
   * 获取时间  格式化
   * @returns {string}
   */
  getNowFormatDate () {
    let date = new Date()
    let seperator1 = '-'
    let seperator2 = ':'
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
    return currentdate
  },
  /**
   * 处理请求参数 转为encodeURI
   * @param params
   * @returns {*}
   */
  requestString (params) {
    let requestParams = {
      head: {
        appVersion: '0.0.2',
        osPlatform: 'android  6.0.1',
        requestTime: ''
      },
      data: null
    }
    requestParams.head.appVersion = '0.0.2'
    requestParams.head.osPlatform = 'android  6.0.1'
    requestParams.head.requestTime = this.getNowFormatDate()
    requestParams.data = params
    let jsonString = JSON.stringify(requestParams)
    if (jsonString === undefined) {
      return undefined
    }
    return jsonString
  },

  getAjaxData: function (type, param, url) {
    return request(type, param, url)
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

  // 找下标
  findIndex: function (arr, property, id) {
    var index = null
    arr.forEach(function (item, itemIndex) {
      if (item[property] === id) {
        index = itemIndex
      }
    })
    return index
  },
  findItem: function (arr, property, id) {
    let returnItem = arr.find((item) => {
      return item[property] === id
    })
    return returnItem
  },
  isArray: function (arr) {
    var str = Object.prototype.toString.call(arr)
    if (str === '[object Array]') {
      return true
    } else {
      return false
    }
  },
  selectClass (ele) {
    return window.getComputedStyle(document.querySelector(ele), null)
  },
  // 获取SKU值中文名称
  getSkuValueName (skuList,skuCode) {
    let skuValueName = ''
    skuList.forEach((item) => {
      if (item.skuPropertyCode === skuCode) {
        skuValueName = item.skuPropertyValueName
      }
    })
    return skuValueName
  },
  // 解决精度丢失问题(加)
  accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return ((arg1 * m + arg2 * m) / m).toFixed(2);
  },
  // 清除.00的0
  clearZero(num) {
    // [16,02330]
    let floatReg = /\./
    if (!floatReg.test(num)) {
      return num
    }
    let numArr = num.split('.')
    if (numArr.length && numArr.length === 2) {
      let reg = /0+$/
      let integeNum = numArr[0]
      let floatNum = numArr[1]
      floatNum = floatNum.replace(reg, '')
      if (floatNum) {
        return integeNum + '.' + floatNum
      } else {
        return integeNum
      }
    } else if (numArr.length && numArr.length === 1) {
      return num
    } else {
      return 0
    }
  },
  // 存SessionStorage
  setSessionStorage (key,value) {
    let str = ''
    if (typeof value === 'object') {
      str = JSON.stringify(value)
    } else {
      str = value
    }
    sessionStorage.setItem(key, str);
  },
  // 取SessionStorage
  getSessionStorage (key) {
    let result = ''
    let str = sessionStorage.getItem(key)
    if (str) {
      let parseStr = JSON.parse(str)
      result = parseStr
    } else {
      result = str
    }
    return result
  },
  // 删某个SessionStorage
  removeSessionStorage(key) {
    sessionStorage.removeItem(key);
  },
  // 删除所有SessionStorage
  clearAllSessionStorage() {
    sessionStorage.clear()
  }
}
