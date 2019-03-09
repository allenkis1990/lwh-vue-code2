<template>
  <!--退款详情-->
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">退款详情</div>
    </div>
    <!--等待平台处理-->
    <scroller lock-x scrollbar-y :height="scrollerHeight">
      <div class="hb-wrap-box hb-wrap-box-5">
        <div class="refund-box bor-b20">
          <div class="info">
            <div class="fs30">{{getOrderStatusText(orderRefundDetailInfo.refundOrderStatus)}}</div>
            <div class="fs28"><span class="mr20">{{filterChangeStatus(orderRefundDetailInfo.refundOrderStatus)}}</span>{{getFilterStatusText(orderRefundDetailInfo.refundOrderStatus)}}
            </div>
          </div>
          <img class="arrow" src="../../../design/images/icon-go-bgw.png" @click="moreStatusAction()">
        </div>
        <div class="refund-tip">
          <div v-show="orderRefundDetailInfo.refundOrderStatus == 3 || orderRefundDetailInfo.refundOrderStatus == 7">拒绝原因：<br/>{{filterRefundReason(orderRefundDetailInfo.refundOrderStatus)}}</div>
          <div v-show="!(orderRefundDetailInfo.refundOrderStatus == 3 || orderRefundDetailInfo.refundOrderStatus == 7)">{{getFilterContextText(orderRefundDetailInfo.refundOrderStatus, orderRefundDetailInfo.depositBank)}}</div>
        </div>
        <div class="refund-btn" v-show="(orderRefundDetailInfo.refundOrderStatus == 1 || orderRefundDetailInfo.refundOrderStatus == 3 || orderRefundDetailInfo.refundOrderStatus == 7)
               && (orderRefundDetailInfo.newRefundOrderStatus != 6 && orderRefundDetailInfo.newRefundOrderStatus != 11 && orderRefundDetailInfo.newRefundOrderStatus != 12)">
          <div v-show="!(orderRefundDetailInfo.refundOrderStatus == 3 || orderRefundDetailInfo.refundOrderStatus == 7)"></div>
          <div class="tip-txt" v-show="orderRefundDetailInfo.refundOrderStatus == 3 || orderRefundDetailInfo.refundOrderStatus == 7">{{getFilterContextText(orderRefundDetailInfo.refundOrderStatus, orderRefundDetailInfo.depositBank)}}</div>
          <div class="btn-refund" @click="clickSubmit(orderRefundDetailInfo.refundOrderStatus)"
               v-show="(orderRefundDetailInfo.refundOrderStatus == 1 || orderRefundDetailInfo.refundOrderStatus == 3 || orderRefundDetailInfo.refundOrderStatus == 7)
               && (orderRefundDetailInfo.newRefundOrderStatus != 6 && orderRefundDetailInfo.newRefundOrderStatus != 11 && orderRefundDetailInfo.newRefundOrderStatus != 12)">
            {{clickSubmitText(orderRefundDetailInfo.refundOrderStatus)}}
          </div>
        </div>
      </div>

      <!--退款信息-->
      <div class="hb-panel bor-t20 bor-b20 pb100">
        <div class="weui-panel__hd">退款信息</div>
        <div class="hb-media-box bor-b0" v-for="item in getList"
             :key="item.subOrderNo">
          <div class="hb-media-box-hd">
            <img class="hb-media-box-thumb" src="../../../design/images/course-score.jpg"/>
          </div>
          <div class="hb-media-box-bd">
            <div class="hb-media-box-desc">继续教育年度：{{item.yearName}}年</div>
            <div class="hb-media-box-desc">每学分：<span class="ci">￥{{priceChangetoDecimal2(item.dealPrice)}}</span></div>
            <div class="hb-media-box-desc">学分：{{item.purchaseQuantity}}</div>
          </div>
          <div class="weui-cells" style="margin-top:0"
               v-if="orderRefundDetailInfo.subOrderList && orderRefundDetailInfo.subOrderList.length > 3 && showMore"
               @click="toggleShowMore()">
            <div class="weui-cell weui-cell_access">
              <div class="weui-cell__bd"></div>
              <div class="weui-cell__ft weui-cell__ft-1">查看更多</div>
            </div>
          </div>
          <div class="weui-cells" style="margin-top:0"
               v-if="orderRefundDetailInfo.subOrderList && orderRefundDetailInfo.subOrderList.length > 3 && !showMore"
               @click="toggleShowMore()">
            <div class="weui-cell weui-cell_access">
              <div class="weui-cell__bd"></div>
              <div class="weui-cell__ft weui-cell__ft-2">收起</div>
            </div>
          </div>
        </div>
        <div class="refund-item-info">
          <div class="item">
            <span class="tit">退款原因：</span><span class="txt">{{orderRefundDetailInfo.reasonName}}</span>
          </div>
          <div class="item">
            <span class="tit">退款金额：</span><span class="txt">￥{{orderRefundDetailInfo.totalAmount}}</span>
          </div>
          <div class="item">
            <span class="tit">申请时间：</span><span class="txt">{{orderRefundDetailInfo.createTime}}</span>
          </div>
          <div class="item">
            <span class="tit">退款编号：</span><span class="txt">{{orderRefundDetailInfo.refundNumber}}</span>
          </div>
        </div>
      </div>
    </scroller>
    <div class="btn-bottom" @click="callTelephone">
      <div>拨打电话咨询</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  import {Scroller} from 'vux'
  import * as storeTypes from '../../store/types'
  import utils from '@/common/util/Utils'
  export default {
    components: {
      Scroller
    },
    mounted () {
      debugger
      this.orderNo = this.$route.query.orderNo
      this.refundOrderNo = this.$route.query.refundOrderNo
      this.enterType = this.$route.query.enterType
      this.requestClassDetailInfo()
      let h1 = Number.parseInt(utils.selectClass('.hb-header-box').height);
      this.scrollerHeight = ((window.outerHeight - h1) || (window.innerHeight - h1)) + 'px'
    },
    data () {
      return {
        orderNo: '',
        refundOrderNo: '',
        scrollerHeight: '',
        enterType: '',
        showMore: true,
        orderRefundDetailInfo: {}
      }
    },
    computed: {
      getList () {
        let list = this.orderRefundDetailInfo.subOrderList
        if (!list || !list.length) {
          return []
        }
        return list.length > 3 ? this.showMore ? [list[0]] : list : list
      }
    },
    methods: {
      toggleShowMore () {
        this.showMore = !this.showMore
      },
      getOrderStatusText (refundOrderStatus) {
        /** 后台状态
         * 退款单状态
         * 1:申请退货
         * 2:审核通过
         * 3:拒绝申请
         * 4:处理中
         * 5:资源已回收
         * 6:已退款
         * 7:拒绝退款
         * 8:资源回收失败
         * 9:买家取消订单
         */
        switch (refundOrderStatus) {
          case 1: {
            return '等待平台处理'
          }
          case 2: {
            return '退款申请审核通过'
          }
          case 3:
          case 7: {
            return '退款申请被拒绝'
          }
          case 4:
          case 5:
          case 8:
          case 10: {
            return '退款处理中'
          }
          case 6:
          case 11:
          case 12: {
            return '退款成功'
          }
          case 9:
          case 13: {
            return '退款关闭'
          }
        }
      },
      getFilterStatusText (refundOrderStatus) {
        /** 后台状态
         * 退款单状态
         * 1:申请退货
         * 2:审核通过
         * 3:拒绝申请
         * 4:处理中
         * 5:资源已回收
         * 6:已退款
         * 7:拒绝退款
         * 8:资源回收失败
         * 9:买家取消订单
         */
        switch (refundOrderStatus) {
          case 1: {
            return '退款提交申请'
          }
          case 2: {
            return ''
          }
          case 3:
          case 7: {
            return ''
          }
          case 4:
          case 5:
          case 8:
          case 10: {
            return '退款审核通过'
          }
          case 6:
          case 11:
          case 12: {
            return ''
          }
          case 9:
          case 13: {
            return ''
          }
        }
      },
      getFilterContextText (refundOrderStatus, depositBank) {
        /** 后台状态
         * 退款单状态
         * 1:申请退货
         * 2:审核通过
         * 3:拒绝申请
         * 4:处理中
         * 5:资源已回收
         * 6:已退款
         * 7:拒绝退款
         * 8:资源回收失败
         * 9:买家取消订单
         */
        switch (refundOrderStatus) {
          case 1: {
            return '您已成功发起退款申请，请耐心等待平台处理。'
          }
          case 2: {
            return '您退款申请已经审核通过，请耐心等待平台处理。'
          }
          case 3:
          case 7: {
            return '平台拒绝您的退款申请，您可重新发起，平台会重新处理。'
          }
          case 4:
          case 5:
          case 8:
          case 10: {
            return '您退款申请已经审核通过，请耐心等待平台处理。'
          }
          case 6:
          case 11:
          case 12: {
            var temp = '退款' + depositBank + '付款账号'
            return temp + ' ( 注：退款款项原路退回。请留意相应付款账户。)'
          }
          case 9:
          case 13: {
            return '您已撤销本次退款申请。'
          }
        }
      },
      clickSubmit(refundOrderStatus){
        switch (refundOrderStatus) {
          case 1: {
            this.clickCancelRefund()
            break
          }
          case 2: {
            break
          }
          case 3:
          case 7: {
            this.requestRefund()
            break
          }
          case 4:
          case 5:
          case 8:
          case 10: {
            break
          }
          case 6:
          case 11:
          case 12: {
            break
          }
          case 9:
          case 13: {
            break
          }
        }
      },
      clickSubmitText(refundOrderStatus){
        switch (refundOrderStatus) {
          case 1: {
            return '取消申请退款'
          }
          case 2: {
            break
          }
          case 3:
          case 7: {
            return '重新发起退款'
          }
          case 4:
          case 5:
          case 8:
          case 10: {
            break
          }
          case 6:
          case 11:
          case 12: {
            break
          }
          case 9:
          case 13: {
            break
          }
        }
      },
      /**
       * 筛选退款状态时间
       */
      filterChangeStatus(status){
        var tempStr = '';
        if (this.orderRefundDetailInfo !== undefined && this.orderRefundDetailInfo.refundLogList !== undefined && this.orderRefundDetailInfo !== null) {
          this.orderRefundDetailInfo.refundLogList.forEach((item) => {
              if (status === 4 || status === 5 || status === 8 || status === 10) {
                if (item.refundOrderStatus === 2) {
                  tempStr = item.operateTime;
                }
              } else {
                if (item.refundOrderStatus === status) {
                  tempStr = item.operateTime;
                }
              }
          });
        }
        return tempStr;
      },
      /**
       * 筛选退款状态时间
       */
      filterRefundReason(status){
        var tempStr = '';
        if (this.orderRefundDetailInfo !== undefined && this.orderRefundDetailInfo.refundLogList !== undefined && this.orderRefundDetailInfo !== null) {
          this.orderRefundDetailInfo.refundLogList.forEach((item) => {
            if (item.refundOrderStatus === status) {
              tempStr = item.operateReason;
            }
          });
        }
        return tempStr;
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
      requestClassDetailInfo () {
        var _this = this;
        _this.showLoading('加载中.....')
        if (!this.orderNo.length) {
          _this.toast('订单号为空，无法获取订单信息')
          return
        }
        let param = {}
        debugger

        if (_this.enterType == 1) {
          param = {
            refundOrderNo: _this.refundOrderNo,
            enterType: _this.enterType
          }
        } else {
          param = {
            orderNo: _this.orderNo,
            enterType: _this.enterType
          }
        }
        _this.$store.dispatch(storeTypes.ORDER_GET_ORDER_REFUND_ETAIL, param).then(data => {
          _this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            _this.orderRefundDetailInfo = data.data
          }
        }).catch(e => {
          console.log('error>>>>>>>' + e)
        })
      },
      isShowMoreStatusButton () {
        if (this.orderRefundDetailInfo === undefined || this.orderRefundDetailInfo.refundOrderStatus === undefined) {
          return false
        }
        if (this.orderRefundDetailInfo.refundOrderStatus === 1 || this.orderRefundDetailInfo.refundOrderStatus === 2 || this.orderRefundDetailInfo.refundOrderStatus === 8) {
          return false
        } else {
          return true
        }
      },

      moreStatusAction () {
        let param = {
          orderNo: JSON.stringify(this.orderRefundDetailInfo.orderNo),
          refundLogList: JSON.stringify(this.orderRefundDetailInfo.refundLogList)
        }
        this.push({path: '/statusChangeRefund', query: param})
      },

      /**
       * 网络请求---重新发起退款
       */
      requestRefund(){
        let param = {
          orderNo: this.orderRefundDetailInfo.orderNo,
          subOrderList: this.orderRefundDetailInfo.subOrderList,
          refundOrderNo: this.orderRefundDetailInfo.refundNumber,
          enterType: 1
        }
        if (this.enterType == 1) {
          this.replace({path: '/refundSubmit', query: param})
        } else {
          this.push({path: '/refundSubmit', query: param})
        }
      },
      clickCancelRefund() {
        var _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '确认取消申请退款？',
          confirmText: '确定',
          cancelText: '取消',
          onCancel: function () {
          },
          onConfirm: function () {
            _this.requestCancelRefund()
          }
        })
      },
      /**
       * 网络请求---发起取消退款
       */
      requestCancelRefund() {
        var _this = this;
        _this.showLoading('加载中.....')
        _this.$store.dispatch(storeTypes.ORDER_GET_SUBMIT_CANCEL_REFUNDE, {
          refundOrderNo: _this.orderRefundDetailInfo.refundNumber
        }).then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            _this.requestClassDetailInfo()
          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
          _this.hideLoading();
          console.log('error>>>>>>>' + e)
        })
      },
      /**
       * 拨打电话号码
       */
      callTelephone(){
        var _this = this
        this.$vux.confirm.show({
          title: '提示',
          content: '968823',
          confirmText: '拨打',
          cancelText: '取消',
          onCancel: function () {
          },
          onConfirm: function () {
            window.location.href = 'tel:968823'
          }
        })
      }
    }
  }
</script>
