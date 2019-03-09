<template>
  <!--结算-->
  <div class="contain hb-box">
    <div id="copyArticle" style="opacity: 0;position:fixed;left:-20000px;top:-20000px"></div>
    <div class="hb-box-bd">
      <!--<div class="hb-warm-tips">-->
      <!--<img class="ico-tips" src="../../../../design/images/icon-tips.png" />-->
      <!--<span class="tips-txt">下单后，请在24小时内完成支付。超出24小时再支付可能导致购买失败，需重新下单购买。</span>-->
      <!--</div>-->
      <div class="weui-cells hb-panel bor-b20">
        <div class="weui-cell hb-order-status">
          <div class="weui-cell__hd">
            <span class="hb-ico pay-wait"></span>
          </div>
          <div class="weui-cell__bd">
            <div class="fs30">订单状态：<span class="ci">{{getOrderStatusText(payOrderInfo.status)}}</span></div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">订单信息</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div><span class="tit">订单号</span>{{orderNo}}</div>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div><span class="tit">下单时间</span>{{payOrderInfo.createTime}}
                <!--2017-12-12<span class="ml10">19:23:23</span>--></div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">学分内容</div>
        <div class="weui-panel__bd">
          <div class="hb-media-box"
               v-if="index == 0 || (index>=1 && isOpenMoreContent && isShowMoreTrainingContent)"
               v-for="(item,index) in payOrderInfo.subOrderList">
            <div class="hb-media-box-hd">
              <img class="hb-media-box-thumb" src="../../../../design/images/course-score.jpg"/>
              <!--<div class="label">{{getClassTypeInSkuList(item.skuPropertyNameList) === 0 ? '面授班' : '网络班'}}</div>-->
            </div>
            <div class="hb-media-box-bd">
              <!--<div class="hb-media-box-title">{{item.skuName}}</div>-->
              <!--<div class="hb-media-box-desc">年度：{{getSkuValueName(item.skuPropertyNameList, '年度')}}年</div>-->
              <div class="hb-media-box-desc">继续教育年度：{{item.yearName}}年</div>
              <div class="hb-media-box-desc">每学分：<span class="ci">¥ {{priceChangetoDecimal2(item.dealPrice)}}</span>
              </div>
              <div class="hb-media-box-desc">学分：{{item.purchaseQuantity}}</div>
              <!--<div class="hb-media-box-desc">有效期：截止至{{item.year}}年{{item.month}}月{{item.day}}日</div>-->
            </div>
            <!--<div class="price">￥<span class="num">{{item.originalPrice}}</span></div>-->
          </div>
        </div>
        <div class="weui-cells"
             v-if="isShowMoreTrainingContent && !isOpenMoreContent"
             @click='changeIsOpenMoreContentAction'>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd"></div>
            <div class="weui-cell__ft weui-cell__ft-1">查看更多</div>
          </div>
        </div>
        <div class="weui-cells"
             v-if="isShowMoreTrainingContent && isOpenMoreContent"
             @click='changeIsOpenMoreContentAction'>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd"></div>
            <div class="weui-cell__ft weui-cell__ft-2">收起</div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="bor-t sum-bar tr">本订单需支付<span
          class="ci ml10">￥{{priceChangetoDecimal2(payOrderInfo.totalAmount)}}</span></div>
      </div>

      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">支付方式</div>
        <div class="weui-cells" v-for="(item,index) in payOrderInfo.paymentAccountList"
             @click="clickPayWay(item,index)">
          <div class="weui-cell">
            <!--:style="{'background-image':'url('+item.payAccountLogoPath+')','background-size':'123% 123%','background-position':'50% 50%','background-repeat':'no-repeat'}"-->
            <div class="weui-cell__bd"><div :style="getImgStyle(item)" style="width:2rem;height:0.6rem"></div><!--<img class="hb-pay-img" :src="item.payAccountLogoPath"/>--></div>
            <div class="pay-check">
              <img class="hb-pay-img" :src="judgePayWay(item.payWay)"/>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="hb-tabbar">
      <div class="hb-btn hb-btn-3" @click="payOrderWay()">确认支付</div>
      <!--<button @click="goOrderPaidSuccess">fn11111</button>-->
    </div>
  </div>


</template>
<style>
</style>
<script>
  import * as storeTypes from '@/store/types'
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'
  import Global from '@/global/global'
  import payUtil from '@/common/util/payUtil'

  export default {
    components: {},
    data () {
      return {
        orderNo: '',
        isShowMoreTrainingContent: false,
        payOrderInfo: {},
        isPaying: false,
        isOpenMoreContent: false,
//        payType: 'WECHAT',
        btnIsEnable: true,
        payAccountId: '',
        paymentAccountObject: {}, // 支付收款账号对象
        paymentChannel: '',// 区别不同浏览器支付渠道
        imgStyle: {}
      }
    },
    computed: {},
    mounted () {
      this.selectPaymentChannel() // 设置支付渠道

      let orderNo = this.$route.query.orderNo
      if (orderNo.length) {
        this.orderNo = orderNo
        this.loadOrderInfomationData()
//        this.getPayAccountId()
      } else {
        this.toast('订单号不存在，请确认订单后重新进入！')
        this.$router.go(-1)
      }
    },
    methods: {
      getImgStyle (item) {
        let wxImgReg = /wx/ig
//        :style="{'background-image':'url('+item.payAccountLogoPath+')','background-size':'123% 123%','background-position':'50% 50%','background-repeat':'no-repeat'}"
        var imgStyle = {
          'background-image': 'url(' + item.payAccountLogoPath + ')',
          'background-position': '50% 50%',
          'background-repeat': 'no-repeat',
          'background-size': wxImgReg.test(item.code) ? '100% 100%' : '100% 100%'
        }
        return imgStyle
      },
      getClassTypeInSkuList (skuList) {
        // 返回0：面授班，1：网授班
        for (let i = 0; i < skuList.length; i++) {
          if (skuList[i].skuPropertyCode === 'trainingType') {
            if (skuList[i].skuPropertyValueName === '面授班') {
              return 0
            } else {
              return 1
            }
          }
        }
      },
      goOrderPaidSuccess: function () {
        try {
          this.$store.state.orderModule.payOrderInfo = this.payOrderInfo
        } catch (e) {}
        this.push({path: '/orderPaidSuccess'})
//        this.push({path: '/orderPaidSuccess'})
      },
      priceChangetoDecimal2: function (x) {
        if (x === undefined) {
          return '0.00'
        }
        var f
        f = parseFloat(x)
        if (isNaN(f)) {
          return false
        }
        f = Math.round(x * 100) / 100
        var s = f.toString()
        var rs = s.indexOf('.')
        if (rs < 0) {
          rs = s.length
          s += '.'
        }
        while (s.length <= rs + 2) {
          s += '0'
        }
        return s
      },
      getOrderStatusText: function (status) {
        switch (status) {
          case 1: {
            return '未支付'
          }
          case 2: {
            return '未支付'
          }
          case 3: {
            return '开通中'
          }
          case 4: {
            return '开通中'
          }
          case 5: {
            return '开通中'
          }
          case 6: {
            return '交易成功'
          }
          case 7: {
            return '交易关闭'
          }
          case 8: {
            return '支付中'
          }
        }
      },
      /**
       * 加载订单支付信息
       */
      loadOrderInfomationData () {
        let params = {
          orderNo: this.orderNo,
          paymentChannel: this.paymentChannel
        }
        this.$vux.loading.show({
          text: '加载中'
        })
        var type = 'get'
        let _this = this
        var url = constant.apiUrl.createOrderModule.orderPayOrderInfo
        utils.getAjaxData(type, params, url).then(res => {
          this.$vux.loading.hide()
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return _this.toast(res.head.message)
          } else {
            _this.payOrderInfo = res.data
            if (res.data.paymentAccountList !== undefined && res.data.paymentAccountList.length) {
//              this.payAccountId = res.data.paymentAccountList[0].payAccountId
              _this.pullPaymentAccountListData()
            }
            if (res.data.subOrderList !== undefined && res.data.subOrderList.length) {
              if (res.data.subOrderList.length >= 2) {
                _this.isShowMoreTrainingContent = true
              }
            }
          }
        }).catch(e => {
          console.log(e)
          _this.$vux.loading.hide()
          return _this.toast('请求失败')
        })
      },
      /**
       * 往支付渠道数组填充是否选中
       */
      pullPaymentAccountListData () {
        let _this = this
        if (this.payOrderInfo.paymentAccountList != 'undefined' && this.payOrderInfo.paymentAccountList.length === 1) {
          this.payOrderInfo.paymentAccountList.forEach((item) => {
            item.payWay = true
            _this.paymentAccountObject = item
          })
        } else {
          _this.payOrderInfo.paymentAccountList.forEach((item) => {
            item.payWay = false
          })
        }
      },
      /**
       * 设置支付渠道
       */
      selectPaymentChannel () {
        if (Global.isWeiXin()) {
          this.paymentChannel = 'WECHAT_OFFICIAL_ACCOUNTS'
        } else {
          this.paymentChannel = 'HTML5'
        }
      },
      // =====================================触发事件=====================================
      payOrderWay () {
        var _this = this
        if (this.paymentAccountObject === undefined || !this.paymentAccountObject.payWay) {
          return this.toast('请选择支付方式！')
        }
        if (_this.paymentAccountObject.code === 'ALIPAY_WAP_2.0') {
          // H5支付宝支付
          this.judgeCheckStudentPayOrder(1)
        } else if (_this.paymentAccountObject.code === 'WX_H5_PAY') {
          // H5微信支付
          this.judgeCheckStudentPayOrder(2)
        } else if (_this.paymentAccountObject.code === 'WX_PUBLIC_NO_PAY') {
          // 微信浏览器微支付
          this.judgeCheckStudentPayOrder(3)
        }
      },
      jumpPayWay (index) {
        switch (index) {
          case 1:          // H5支付宝支付
            // 支付宝
            this.payAliPayAction()
            break
          case 2:          //H5微信支付
          case 3:          // 微信浏览器微支付
            this.paidOrder()
            break
        }
      },
      /**
       * 网络请求---校验必修课学分是否改变
       */
      judgeCheckStudentPayOrder (index) {
        var _this = this
//        _this.showLoading('加载中.....')
        _this.$store.dispatch(storeTypes.ORDER_CHECK_STUDENT_PAY_ORDER, {
          orderNo: _this.orderNo,
          yearName: _this.payOrderInfo.yearName
        }).then(data => {
//          _this.hideLoading();
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            if (data.data.canPay) {
              _this.jumpPayWay(index)
            } else {
              _this.goToCreateOrder(data.data)
            }
          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
//          _this.hideLoading();
          console.log('error>>>>>>>' + e)
        })
      },
      goToCreateOrder (data) {
        let _this = this
        _this.$vux.confirm.show({
          title: '提示',
          content: `根据《会计专业技术人员继续教育实施办法》规定` + data.yearName + '年度，需完成' + data.publicCompulsoryCount + '门公需科目的' + data.purchaseCompulsoryPublicCredit + '学分、'
          + data.professionalCompulsoryCount + '门专业科目的' + data.purchaseCompulsoryProfessionalCredit + '学分的必修课程，共' + data.purchaseCompulsoryPublicCredit + '+' +
          data.purchaseCompulsoryProfessionalCredit + '学分。本次购买的学分数，无法满足需求，系统为您重新下单！',
          confirmText: '重新购买',
          cancelText: '暂不处理',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            // 确认取消订单
            _this.realCancelOrder()
          }
        })
      },
      realCancelOrder () {
        let _this = this
        let param = {
          orderNo: _this.orderNo
        }
        this.$store.dispatch(storeTypes.ORDER_CANCEL_ORDER, param).then(data => {
          _this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            _this.toast('订单取消成功')

            let param = {
              currentYear: _this.payOrderInfo.yearName
            }
            _this.push({path: '/createOrder', query: param})

          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
          console.log('error>>>>>>>' + e)
        })
      },
      paidOrder () {
        if (Global.isWeiXin()) {
          // 微信内
          this.payWeiXinInsideAction()
        } else {
          // 微信外
          this.payWeiXinExtAction()
        }

      },
      payAliPayAction () {
        // 支付宝支付
        if (this.btnIsEnable === false) return

        let _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '是否确认付款？请核对订单信息正确',
          confirmText: '继续支付',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            _this.btnIsEnable = false
            var productName = _this.getProductName()
            _this.$vux.loading.show({
              text: '正在请求支付信息......'
            })
            let clientDomainInfo = payUtil.getClientDomainInfo()
            let redirectUrl = clientDomainInfo.rootPath + 'H5OrderPagePaidSuccess?paymentChannel=' + _this.paymentChannel + '&order_no=' + _this.orderNo
            _this.$store.dispatch(storeTypes.ORDER_GET_ORDER_AliH5_PAY_INFO, {
              orderNo: _this.orderNo,
              payAccountId: _this.paymentAccountObject.payAccountId,
              productName: productName,
              payMoney: _this.payOrderInfo.totalAmount,
              paymentChannelType: _this.paymentChannel,
              pageUrl: redirectUrl
            }).then(data => {
              console.log(111)
              _this.btnIsEnable = true
              _this.$vux.loading.hide()
              if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                console.log('pay:' + data.data.url)
//                _this.back();
//                setTimeout(function () {
                window.location.href = data.data.url // 跳转到微信H5支付
//                },10)
              } else {
//                that.toast(data.head.message)
                if (data.head.code === 600) {
                  this.commonConfirm(_this, data)
                } else {
                  return _this.toast(data.head.message)
                }
              }
            }).then(e => {
              // this.hideLoading()
              console.log(e)
              _this.$vux.loading.hide()
              _this.btnIsEnable = true
            })
          }
        })
      },
      payWeiXinInsideAction () {
        if (this.btnIsEnable === false) return

        if (typeof window.WeixinJSBridge === 'undefined') {
          if (window.document.addEventListener) {
            window.document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
          } else if (window.document.attachEvent) {
            window.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            window.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
          }
        }

        let _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '是否确认付款？请核对订单信息正确',
          confirmText: '继续支付',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            _this.btnIsEnable = false
            var productName = _this.getProductName()
            // var openId = 'oxbS9tynHiUyS6oxZSYKsaMfPvnU' 会计openId
            // var openId = 'oRacG03SEY7gPxJYpXnDpJdP7EHM' // 华博openId
            // var openId = 'oRacG03syU52NwLpCwXjuiD2q76I' // 佳斌openId
            var openId = _this.getCookie(constant.cookie.openId)
            // var openId = window.localStorage.getItem(AppConstant.localStorage.openId)
            _this.$vux.loading.show({
              text: '正在请求支付信息......'
            })
            _this.$store.dispatch(storeTypes.ORDER_GET_ORDER_PAY_INFO, {
              orderNo: _this.orderNo,
//              payTypeId: that.payType,
              payAccountId: _this.paymentAccountObject.payAccountId,
              productName: productName,
              payMoney: _this.payOrderInfo.totalAmount,
              openId: openId,
              paymentChannelType: _this.paymentChannel
            }).then(data => {
              console.log(111)
              _this.btnIsEnable = true
              _this.$vux.loading.hide()
              if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                console.log('wxPay:' + data.data.url)
                var jsonObj = JSON.parse(data.data.url)
                console.log(jsonObj)
                // 初始化好
                var param = {
                  appId: jsonObj.appId,
                  timeStamp: jsonObj.timeStamp,
                  nonceStr: jsonObj.nonceStr,
                  package: jsonObj.package,
                  signType: jsonObj.signType,
                  paySign: jsonObj.paySign
                }
                _this.toast('准备进行微信支付.....')
                window.WeixinJSBridge.invoke('getBrandWCPayRequest', param, function (res) {
                  console.log(res)
                  //                window.alert(res.err_msg + '/' + AppConstant.wx.success)
                  if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    _this.toast('支付成功')
                    _this.goOrderPaidSuccess()
//                    that.replace({ path: '/orderPaidSuccess', query: { order: that.payOrderInfo } })
                  } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                    _this.toast(res)
                  } else {
                    _this.toast('支付取消')
                  }
                })
              } else {
//                that.toast(data.head.message)
                if (data.head.code === 600) {
                  this.commonConfirm(_this, data)
                } else {
                  return _this.toast(data.head.message)
                }
              }
            }).then(e => {
              // this.hideLoading()
              _this.$vux.loading.hide()
              _this.btnIsEnable = true
              console.log(JSON.stringify(e))
            })
          }
        })
      },
      payWeiXinExtAction () {
        // 移动端外部浏览器支付：微信
        if (this.btnIsEnable === false) return
        let _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '是否确认付款？请核对订单信息正确',
          confirmText: '继续支付',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            payUtil.getClientIp().then(ipData => {
                if (ipData === undefined || ipData.ip === undefined) {
                  return
                }
                _this.btnIsEnable = false
                var productName = _this.getProductName()
                _this.$vux.loading.show({
                  text: '正在请求支付信息......'
                })
                let clientDomainInfo = payUtil.getClientDomainInfo()
                console.log(clientDomainInfo)
                let redirectUrl = clientDomainInfo.rootPath + 'H5OrderPagePaidSuccess?paymentChannel=' + _this.paymentChannel + '&order_no=' + _this.orderNo
                _this.$store.dispatch(storeTypes.ORDER_GET_ORDER_WXH5_PAY_INFO, {
                  orderNo: _this.orderNo,
                  payAccountId: _this.paymentAccountObject.payAccountId,
                  productName: productName,
                  payMoney: _this.payOrderInfo.totalAmount,
                  paymentChannelType: _this.paymentChannel,
                  wap_url: clientDomainInfo.domain,
                  wap_name: '福建省会计继续教育',
                  pageUrl: redirectUrl,
                  clientIp: ipData.ip
                }).then(data => {
                  console.log(111)
                  _this.btnIsEnable = true
                  _this.$vux.loading.hide()
                  if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
                    console.log('wxPay:' + data.data.url)
//                    _this.back()
//                    setTimeout(function () {
                    window.location.href = data.data.url // 跳转到微信H5支付
//                    },10)
                  } else {
//                that.toast(data.head.message)
                    if (data.head.code === 600) {
                      this.commonConfirm(_this, data)
                    } else {
                      return _this.toast(data.head.message)
                    }
                  }
                }).then(e => {
                  // this.hideLoading()
                  _this.$vux.loading.hide()
                  _this.btnIsEnable = true
                  console.log(JSON.stringify(e))
                })
              }
            ) // end getClientIp
          }

        })
      },
      // =====================================工具事件=====================================
      /**
       * 获取支付商品的名称
       */
      getProductName () {
        var productName = ''
        if (this.payOrderInfo.subOrderList.length > 0) {
          for (var i = 0; i < this.payOrderInfo.subOrderList.length; i++) {
            productName = productName + '|' + this.payOrderInfo.subOrderList[i].skuName
          }
          return productName
        } else {
          return productName
        }
      },
      changeIsOpenMoreContentAction () {
        this.isOpenMoreContent = !this.isOpenMoreContent
      },
      getSkuValueName: function (skuArr, skuName) {
        if (!skuArr) {
          return ''
        }
        var str = ''
        skuArr.forEach(function (item) {
          if (item.skuPropertyName === skuName) {
            str = item.skuPropertyValueName
          }
        })
        return str
      },
      /**
       * 判断使用支付方式
       */
      judgePayWay (payWay) {
        if (payWay) {
          return require('../../../../design/images/radio-checked.png')
        } else {
          return require('../../../../design/images/radio.png')
        }
      },
      /**
       * 设置选中支付方式
       * @param selectItem
       */
      clickPayWay (selectItem, index) {
        let tempiIem = {}
        this.payOrderInfo.paymentAccountList.forEach((item) => {
          if (item.code === selectItem.code) {
            item.payWay = true
            tempiIem = item
            this.paymentAccountObject = item
          } else {
            item.payWay = false
          }
        })
        this.$set(this.payOrderInfo.paymentAccountList, index, tempiIem)
      }
    },
    destroyed: function () {
    }
  }
</script>
