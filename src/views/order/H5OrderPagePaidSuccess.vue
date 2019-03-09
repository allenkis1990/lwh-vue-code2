<template>
  <!--结算成功-->
  <div class="contain hb-box">
    <div v-show="isShowUI">
      <div class="hb-box-bd">
        <div class="hb-msg bor-b20">
          <img class="icon-success" src="../../../design/images/icon-success.png"/>
          <div class="fs30 mt20">支付成功</div>
        </div>
        <div class="weui-panel hb-panel bor-b20">
          <div class="weui-panel__hd">订单信息</div>
          <div class="weui-cells">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div><span class="tit">订单号</span>{{orderInfo.orderNo}}</div>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div><span class="tit">下单时间</span>{{orderInfo.createTime}}</div>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div><span class="tit">付款金额</span><span class="ml10 ci">¥{{priceChangetoDecimal2(orderInfo.totalAmount)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-top-tip" v-show="orderInfo.haveCompulsoryCourse">
          系统将为你进行必修课程选课，选课结果<a href="javascript:void(0);" @click="goToSelectCourseLog()">查看选课记录>>”</a>
          <img src="../../../design/images/tag-required.png" class="tag"/>
        </div>
        <div class="order-tip2"
             v-show="orderInfo.courseLevel != undefined && orderInfo.courseLevel != null && orderInfo.courseLevel.length > 0 && orderInfo.firstPurchase">
          <div class="pic"><img src="../../../design/images/icon-warning.png"/></div>
          <div class="text">平台赠送您会计{{orderInfo.courseLevel}}职称考试辅导课程，请进入小程序“我的-考前辅导课程”学习。</div>
        </div>
        <div class="weui-panel hb-panel">
          <div class="weui-panel__hd">学分内容</div>
          <div class="weui-panel__bd">
            <div class="hb-media-box" v-for="(item,index) in orderInfo.subOrderList">
              <div class="hb-media-box-hd">
                <img class="hb-media-box-thumb" src="../../../design/images/course-score.jpg"/>
                <!--<div class="label">{{getClassTypeInSkuList(item.skuPropertyNameList) === 0 ? '面授班' : '网络班'}}</div>-->
              </div>
              <div class="hb-media-box-bd">
                <!--<div class="hb-media-box-title">{{item.skuName}}</div>-->
                <div class="hb-media-box-desc">继续教育年度：{{item.yearName}}年</div>
                <div class="hb-media-box-desc">每学分：<span class="ci">¥ {{priceChangetoDecimal2(item.dealPrice)}}</span>
                </div>
                <div class="hb-media-box-desc">学分：{{item.purchaseQuantity}}</div>
              </div>
              <!--<div class="order-info-box">-->
              <!--<div></div>-->
              <!--<div>实付<span class="ml10 ci">¥ {{item.totalAmount}}</span></div>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>

      <div class="hb-tabbar">
        <div class="hb-btn-w hb-btn-3" @click="goToOrderDetailAction">查看订单详情</div>
        <div class="hb-btn hb-btn-3" @click="goToSelectCourseAction">进入选课培训</div>
      </div>
    </div>
    <!--<go-study-dialog :show="showGoStudyDialog" @hide="closeStudyDialog"></go-study-dialog>-->
  </div>
</template>

<style lang="less">
</style>
<script>
  //  import goStudyDialog from '@/components/goStudyDialog'
  import constant from '@/global/constants/AppConstant'
  import utils from '@/common/util/Utils'
  import * as storeTypes from '@/store/types'

  export default {
    components: {
//      goStudyDialog: goStudyDialog
    },
    data () {
      return {
        orderInfo: {
          orderNo: '',
          createTime: '',
          totalAmount: '',
          subOrderList: []
        },
        isShowUI: false
//        showGoStudyDialog: false
      }
    },
    computed: {},
    methods: {
      analysisUrlOutParamMap(url) {
        var queryString = ''
        try {
          if (url.indexOf("") != -1) {
            var index = url.lastIndexOf("?")
            queryString = url.substring(index + 1);
          }
          let ret = {}
          var params = {}
          var queryArray = queryString.split("&")
          queryArray.forEach(function (item) {
            var obj = {};
            var value = item.split("=")[1];
            var key = item.split("=")[0];
            params[key] = value;
          })
          ret["params"] = params
          return ret
        } catch (e) {
          console.log(e)
        }
        return {}
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
      /**
       * 跳转至订单详情页面
       */
      goToOrderDetailAction () {
        this.push({
          path: '/orderDetail',
          query: {
            orderNo: this.orderInfo.orderNo
          }
        })
      },
      /**
       * 跳转至选课培训界面
       */
      goToSelectCourseAction () {
        this.push({
          path: '/demo/courseSelectionTrain'
        })
      },
      /**
       * 跳转至选课记录
       */
      goToSelectCourseLog () {
        this.push({
          path: 'compulsoryCourseList',
          query: {
            currentYear: this.orderInfo.subOrderList[0].yearName
          }
        })
      },
      /**
       * 加载订单支付信息
       */
      loadOrderInfomationData (orderNo, paymentChannel) {
        debugger
        let params = {
          orderNo: orderNo,
          paymentChannel: paymentChannel
        }
        this.$vux.loading.show({
          text: '加载中'
        })
        let _this = this
        var type = 'get'
        var url = constant.apiUrl.createOrderModule.orderPayOrderInfo
        utils.getAjaxData(type, params, url).then(res => {
          _this.$vux.loading.hide()
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return _this.toast(res.head.message)
          } else {
            _this.orderInfo = res.data
            if (res.data.status == 3 || res.data.status == 4 || res.data.status == 5 || res.data.status == 6) {
              _this.isShowUI = true
            } else {
              _this.isShowUI = false
//              _this.failDialog(orderNo)
              _this.goToOrderPayAgain(orderNo);
            }
          }
        }).catch(e => {
          console.log(e)
          _this.$vux.loading.hide()
          return _this.toast('请求失败')
        })
      },
      failDialog(orderNo){
        let _this = this
        _this.$vux.confirm.show({
          title: '提示',
          content: '支付失败！',
          confirmText: '重新付款',
          cancelText: '暂不处理',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            // 取消
            console.log('plugin cancel')
          },
          onConfirm () {
            // 确认
            console.log('plugin sure')
            _this.goToOrderPayAgain(orderNo);
          }
        })
      },
      goToOrderPayAgain(orderNo){
        this.replace({
          path: '/orderPay',
          query: {
            orderNo: orderNo
          }
        })
      }
    },
    mounted () {
      var tempArray = this.analysisUrlOutParamMap(window.location.href);
      if (tempArray.params.order_no !== undefined) {
        this.loadOrderInfomationData(tempArray.params.order_no, tempArray.params.paymentChannel)
      }
    }
  }
</script>
