import { AjaxPlugin } from 'vux'
import jsonp from '@/common/util/jsonp'
export default {
  getClientIp: function (callbackFun) {
    return new Promise((resolve, reject) => {
      // http://pv.sohu.com/cityjson
      // http://ip.360.cn/IPShare/info
      // https://ipapi.co/json/
      // headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      // 'application/x-www-form-urlencoded;charset=UTF-8'
      // http://pv.sohu.com/cityjson?ie=utf-8
      AjaxPlugin.$http({
        method: 'get',
        url: 'https://ipapi.co/json/'
      }).then(function (response) {
        if (response.status === 200) {
          if(response.data !== undefined && response.data.ip !== undefined){
            if(response.data.ip.length > 15){
              response.data.ip = window.returnCitySN["cip"]
            }
          }
          resolve(response.data)
        } else {
          reject(response)
        }
      })
    }, (e) => {
      console.log('----get---response:' + JSON.stringify(e))
    })
  },
  getClientDomainInfo: function () {
    let href = window.location.href
    let index = href.indexOf('#/')
    let end = 0
    let start = href.indexOf('//') + 2
    let domain = ''
    let rootPath = ''
    if (index >= 0) {
      end = index
      domain = href.substring(start, end)
      rootPath = href.substring(0, end + 2)
    } else {
      index = href.indexOf('?')
      if (index >= 0) {
        end = index
        domain = href.substring(start, end)
        rootPath = href.substring(0, end)
      } else {
        end = href.length
        domain = href.substring(start, end)
        rootPath = href.substring(0, end)
      }
    }
    return {
      domain: domain,
      rootPath: rootPath
    }
  }
}
