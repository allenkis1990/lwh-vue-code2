<template>
  <!--退款申请-->
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">申请退款</div>
    </div>
    <!--标题栏-->
    <div class="hb-wrap-box hb-wrap-box-5" v-for="item in subOrderList"
         :key="item.subOrderNo">
      <div class="weui-panel hb-panel bor-b20">
        <div class="hb-media-box">
          <div class="hb-media-box-hd">
            <img class="hb-media-box-thumb" src="../../../design/images/course-score.jpg"/>
          </div>
          <div class="hb-media-box-bd">
            <div class="hb-media-box-desc">继续教育年度：{{item.yearName}}年</div>
            <div class="hb-media-box-desc">每学分：<span class="ci">￥{{priceChangetoDecimal2(item.dealPrice)}}</span></div>
            <div class="hb-media-box-desc">学分：{{item.purchaseQuantity}}</div>
          </div>
        </div>
      </div>
      <div class="hb-form-cells" style="padding:0 .3rem;">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd">
              <span class="weui-label weui-label-2">退款原因</span>
            </div>
            <div class="weui-cell__bd" @click="clickFilterReason()">
              <div class="tr fs28 c6">{{showFilterReason(selectReasonObj.reason)}}</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="weui-label weui-label-2">退款金额</span></div>
            <div class="weui-cell__bd ci">￥{{item.totalAmount}}</div>
          </div>
        </div>
        <div class="order-tip jcc">
          <img src="../../../design/images/icon-warning.png"/>
          <div class="text">退款成功后，款项原路返回原支付账号</div>
        </div>
        <div class="btn-primary" @click="clickSubmit()">提交</div>
      </div>
    </div>
    <!--以下是退款原因选择-->
    <div class="mask500" v-show="isShowFilterDialog"></div>
    <div class="select-box-501" v-show="isShowFilterDialog">
      <div class="tit">退款原因</div>
      <div class="con">
        <div class="item" v-for="item in reasonList"
             :key="item.index" @click="reasonClickBtn(item, item.index)">
          <div>{{item.reasonName}}</div>
          <img class="img" :src="reasonClickChangeIMG(item.reasonClick)"/>
        </div>
      </div>
      <div class="btn-bottom" @click="clickFilterReasonHide">关闭</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  import * as storeTypes from '../../store/types'
  export default {
    components: {},
    data () {
      return {
        orderNo: '',
        refundOrderNo: '',
        enterType: '',
        subOrderList: [],
        selectReasonObj: {
          reasonId: '',
          reason: ''
        },
        isShowFilterDialog: false,
        reasonList: []
      }
    },
    computed: {},
    methods: {
      /**
       * 点击选择退款原因
       */
      clickFilterReason() {
        this.isShowFilterDialog = true;
      },
      /**
       * 点击选择退款原因
       */
      clickFilterReasonHide() {
        this.isShowFilterDialog = false;
      },
      /**
       * 显示退款选择原因
       */
      showFilterReason(reason) {
        if (reason === undefined || reason.length <= 0) {
          return '请选择';
        } else {
          return reason
        }
      },
      /**
       * 提交退款申请
       */
      clickSubmit() {
        this.requestJudgeRefund()
      },
      /**
       * 网络请求---获取退款理由
       */
      requestRefundReason () {
        var _this = this
        _this.showLoading('加载中.....')
        var param = {}
        _this.$store.dispatch(storeTypes.ORDER_GET_REASON_LIST, param).then(data => {
          _this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            if (data.data != undefined && data.data.length) {
              var list = data.data
              list.forEach((item) => {
                item.reasonClick = false
              })
              _this.reasonList = list
            }
          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
          _this.hideLoading()
          console.log('error>>>>>>>' + e)
        })
      },
      /**
       * 网络请求---判断是否可以发起退款
       */
      requestJudgeRefund () {
        var _this = this
        _this.showLoading('加载中.....')
        var param = {
          orderNo: this.orderNo
        }
        _this.$store.dispatch(storeTypes.ORDER_GET_JUDGE_REFUNDE, param).then(data => {
          _this.hideLoading()
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            _this.requestSubmitRefund()
          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
          _this.hideLoading()
          console.log('error>>>>>>>' + e)
        })
      },
      /**
       * 网络请求---提交退款
       */
      requestSubmitRefund () {
        var _this = this
        _this.showLoading('加载中.....')
        var param = {
          orderNo: this.orderNo,
          reasonId: this.selectReasonObj.reasonId,
          reason: this.selectReasonObj.reason
        }
        _this.$store.dispatch(storeTypes.ORDER_GET_SUBMIT_REFUNDE, param).then(data => {
          _this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            _this.jumpRefundDetail()
          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
          _this.hideLoading()
          console.log('error>>>>>>>' + e)
        })
      },
      jumpRefundDetail() {
        var param = {
          orderNo: this.orderNo,
          enterType: 2
        }
        this.replace({ path: '/refundDetail', query: param })
      },
      /**
       * 原因选择更换图片
       */
      reasonClickChangeIMG(reasonClick) {
        if (reasonClick) {
          return require('../../../design/images/radio-checked.png');
        } else {
          return require('../../../design/images/radio.png');
        }
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
       * 原因选择
       */
      reasonClickBtn(reasonObj, index) {
        let tempiIem = {}
        this.reasonList.forEach((item) => {
          if (reasonObj.reasonName == item.reasonName) {
            item.reasonClick = true
            this.selectReasonObj.reason = item.reasonName
            this.selectReasonObj.reasonId = item.reasonId
            tempiIem = item;
          } else {
            item.reasonClick = false
            tempiIem = item;
          }
        })
        this.$set(this.reasonList, index, tempiIem)
      }
    },
    created () {
      this.requestRefundReason()
    },
    mounted () {
      var _this = this
      window.pageBackFun = function () {
        if (_this.enterType == 1) {
          let param = {
            orderNo: _this.orderNo,
            refundOrderNo: _this.refundOrderNo,
            enterType: 1
          }
          _this.push({ path: '/refundDetail', query: param })
        }
      }
      this.orderNo = this.$route.query.orderNo
      this.subOrderList = []
      this.subOrderList = this.$route.query.subOrderList
      this.enterType = this.$route.query.enterType
      this.refundOrderNo = this.$route.query.refundOrderNo
    }
  }
</script>
