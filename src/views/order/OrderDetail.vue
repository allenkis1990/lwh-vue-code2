<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <!--<a href="javascript:void(0);" class="hb-ico ico-return" @click="back()"></a>-->
      </div>
      <div class="header-tit">订单详情</div>
      <div class="header-right">
        <a href="javascript:void(0);" class="hb-ico ico-center" v-if="false"></a>
      </div>
    </div>
    <!--标题栏-->

    <div class="hb-wrap-box hb-wrap-box-5">
      <scroller lock-x scrollbar-y :height="scrollerHeight">
        <div>
          <!--订单状态-->
          <div class="weui-cells hb-panel bor-b20" style="margin-top: 0">
            <div class="weui-cell hb-order-status weui-cell_access">
              <div class="weui-cell__hd">
                <span class="hb-ico trade-succ"></span>
              </div>
              <div class="weui-cell__bd">
                <div class="fs30"><span class="ci">{{getOrderStatusText(orderDetailInfo.status)}}</span></div>
                <div class="time">{{filterChangeStatus(orderDetailInfo.status)}}</div>
              </div>
              <div class="weui-cell__ft" v-if="isShowMoreStatusButton()" @click="moreStatusAction()">更多状态</div>
              <div class="btn-bar">
                <div class="hb-btn-s"
                     v-if="isShowCancelOrderButton() && orderDetailInfo.orderInvoice != undefined && orderDetailInfo.paymentChannel !== 'COLLECTIVE'"
                     @click="cancelOrderAction()">取消订单
                </div>
                <div class="hb-btn-s current" v-if="isShowCancelOrderButton()" @click="goToPayAction()">立即支付</div>
              </div>
            </div>
          </div>
          <!--订单状态-->

          <!-- 发票信息-个人 -->
          <div class="weui-panel hb-panel bor-b20" style="margin-top: 0"
               v-if="orderDetailInfo.totalAmount && orderDetailInfo.orderInvoice && orderDetailInfo.orderInvoice.invoiceType &&orderDetailInfo.orderInvoice.invoiceType !== 3">
            <div class="weui-panel__hd">发票信息</div>
            <div class="weui-cells" style="margin-top:0">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <div class="bd-items mt5"><span class="tit-1">发票类型：</span><span
                    class="txt">{{getInvoicePrintTypeText(orderDetailInfo.orderInvoice.invoiceType)}}</span>
                    <div class="hb-btn-s current" @click="lookSaveOrderInvoice()"
                         v-show="orderDetailInfo.orderInvoice.pdfPath!=undefined && orderDetailInfo.orderInvoice.pdfPath.length">
                      查看发票
                    </div>
                    <div class="hb-btn-s"
                         v-show="!(orderDetailInfo.orderInvoice.pdfPath!=undefined && orderDetailInfo.orderInvoice.pdfPath.length)">
                      待开票
                    </div>
                  </div>

                  <div class="bd-items">
                    <span class="tit-1">抬头类型：</span>
                    <span class="txt">{{getInvoiceTitleTypeText(orderDetailInfo.orderInvoice.titleType)}}</span>
                  </div>
                  <div class="bd-items">
                    <span class="tit-1">发票抬头：</span>
                    <span class="txt">{{dealWithShowString(orderDetailInfo.orderInvoice.title)}}</span>
                  </div>
                  <div class="bd-items" v-if="orderDetailInfo.orderInvoice.invoiceType!== 4 && orderDetailInfo.orderInvoice.titleType !== undefined && orderDetailInfo.orderInvoice.titleType == 2">
                  <span class="tit-1">纳税人识别号：</span>
                  <span class="txt">{{dealWithShowString(orderDetailInfo.orderInvoice.taxpayerNo)}}</span>
                  </div>
                  <!--<div class="bd-items" v-if="orderDetailInfo.orderInvoice.electron && (orderDetailInfo.orderInvoice.state == 1 || orderDetailInfo.orderInvoice.state == 2)">-->
                  <!--<span class="tit-1">查询验证码：</span>-->
                  <!--<span class="txt">{{dealWithShowString(orderDetailInfo.orderInvoice.verifyCode)}}</span>-->
                  <!--</div>-->
                  <!--<div class="bd-items" v-if="orderDetailInfo.orderInvoice.electron && (orderDetailInfo.orderInvoice.state == 1 || orderDetailInfo.orderInvoice.state == 2)">-->
                  <!--<span class="tit-1">发票代码：</span>-->
                  <!--<span class="txt">{{dealWithShowString(orderDetailInfo.orderInvoice.code)}}</span>-->
                  <!--</div>-->
                  <!--<div class="bd-items" v-if="orderDetailInfo.orderInvoice.invoiceNo != undefined && orderDetailInfo.orderInvoice.invoiceNo.length">-->
                  <!--<span class="tit-1">发票号：</span>-->
                  <!--<span class="txt">{{dealWithShowString(orderDetailInfo.orderInvoice.invoiceNo)}}</span>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </div>
          <!-- 发票信息-个人 -->

          <!-- 发票信息-单位 -->
          <div class="weui-panel hb-panel bor-b20" style="margin-top: 0"
               v-if="orderDetailInfo.totalAmount && orderDetailInfo.orderInvoice && orderDetailInfo.orderInvoice.invoiceType &&orderDetailInfo.orderInvoice.invoiceType == 3">
            <div class="weui-panel__hd">发票信息</div>
            <div class="weui-cells" style="margin-top:0">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <div class="bd-items mt5"><span class="tit-1">发票类型：</span><span
                    class="txt">{{getInvoicePrintTypeText(orderDetailInfo.orderInvoice.invoiceType)}}</span>
                    <div class="hb-btn-s current" @click="lookSaveOrderInvoice()"
                         v-show="orderDetailInfo.orderInvoice.pdfPath!=undefined && orderDetailInfo.orderInvoice.pdfPath.length">
                      查看发票
                    </div>
                    <div class="hb-btn-s"
                         v-show="!(orderDetailInfo.orderInvoice.pdfPath!=undefined && orderDetailInfo.orderInvoice.pdfPath.length)">
                      待开票
                    </div>
                  </div>
                  <div class="bd-items">
                    <span class="tit-1">抬头类型：</span>
                    <span class="txt">{{getInvoiceTitleTypeText(orderDetailInfo.orderInvoice.titleType)}}</span>
                  </div>
                  <div class="bd-items">
                    <span class="tit-1">单位全称：</span>
                    <span
                      class="txt">{{orderDetailInfo.orderInvoice == undefined ? '-' : orderDetailInfo.orderInvoice.increasedTicket.unitName}}</span>
                  </div>
                  <div class="bd-items">
                    <span class="tit-1">纳税人识别号：</span>
                    <span
                      class="txt">{{orderDetailInfo.orderInvoice == undefined ? '-' : orderDetailInfo.orderInvoice.increasedTicket.taxpayerNo}}</span>
                  </div>
                  <!--<div class="bd-items">-->
                  <!--<span class="tit-1">注册地址：</span>-->
                  <!--<span class="txt">{{orderDetailInfo.orderInvoice == undefined?'-':orderDetailInfo.orderInvoice.increasedTicket.registerAddress}}</span>-->
                  <!--</div>-->
                  <!--<div class="bd-items">-->
                  <!--<span class="tit-1">注册电话：</span>-->
                  <!--<span class="txt">{{orderDetailInfo.orderInvoice == undefined?'-':orderDetailInfo.orderInvoice.increasedTicket.registerTelNumber}}</span>-->
                  <!--</div>-->
                  <!--<div class="bd-items">-->
                  <!--<span class="tit-1">开户银行：</span>-->
                  <!--<span class="txt">{{orderDetailInfo.orderInvoice == undefined?'-':orderDetailInfo.orderInvoice.increasedTicket.bankTitle}}</span>-->
                  <!--</div>-->
                  <!--<div class="bd-items">-->
                  <!--<span class="tit-1">银行账号：</span>-->
                  <!--<span class="txt">{{orderDetailInfo.orderInvoice == undefined?'-':orderDetailInfo.orderInvoice.increasedTicket.bankAccount}}</span>-->
                  <!--</div>-->
                  <!--<div class="bd-items" v-if="orderDetailInfo.orderInvoice.invoiceNo != undefined && orderDetailInfo.orderInvoice.invoiceNo.length">-->
                  <!--<span class="tit-1">发票号：</span>-->
                  <!--<span class="txt">{{dealWithShowString(orderDetailInfo.orderInvoice.invoiceNo)}}</span>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </div>
          <!-- 发票信息-单位 -->
          <!-- 发票物流信息  -->
          <!--<div class="weui-panel hb-panel bor-b20" style="margin-top: 0" v-if="orderDetailInfo.totalAmount && orderDetailInfo.totalAmount !== 0 && orderDetailInfo.orderInvoice && orderDetailInfo.orderInvoice.electron!==  undefined && !orderDetailInfo.orderInvoice.electron && orderDetailInfo.orderInvoice.deliverType && orderDetailInfo.orderInvoice.deliverType == 1">-->
          <!--<div class="weui-panel__hd">发票物流信息</div>-->
          <!--<div class="weui-cells" style="margin-top:0">-->
          <!--<div class="weui-cell">-->
          <!--<div class="weui-cell__bd">-->
          <!--<div class="bd-items">-->
          <!--<span class="tit-1">快递公司：</span>-->
          <!--<span class="txt">{{orderDetailInfo.orderInvoice.expressCompany ? orderDetailInfo.orderInvoice.expressCompany:'-' }}</span>-->
          <!--</div>-->
          <!--<div class="bd-items">-->
          <!--<span class="tit-1">快递单号：</span>-->
          <!--<div class="txt">{{orderDetailInfo.orderInvoice.trackingNumber ? orderDetailInfo.orderInvoice.trackingNumber:'-'}}</div>-->
          <!--<div class="btn-bar">-->
          <!--<div class="hb-btn-s current" id="copy-btn" data-clipboard-target="#copyTarget" @click="changeCopyText(orderDetailInfo.orderInvoice.trackingNumber)" v-if="isShowCopyButton()">复制</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!-- 发票物流信息  -->
          <!-- 发票配送信息  -->
          <!--<div class="weui-panel hb-panel bor-b20" style="margin-top: 0" v-if="orderDetailInfo.totalAmount && orderDetailInfo.totalAmount!== 0 && orderDetailInfo.orderInvoice && orderDetailInfo.orderInvoice.electron!==  undefined && !orderDetailInfo.orderInvoice.electron">-->
          <!--<div class="weui-panel__hd">发票配送信息</div>-->
          <!--<div class="weui-cells" style="margin-top:0">-->
          <!--<div class="weui-cell">-->
          <!--<div class="weui-cell__bd">-->
          <!--<div class="bd-items">-->
          <!--<span class="tit-1">配送方式：</span>-->
          <!--<span class="txt">{{getDeliverTypeText(orderDetailInfo.orderInvoice.deliverType)}}</span>-->
          <!--</div>-->
          <!--&lt;!&ndash; 邮寄 &ndash;&gt;-->
          <!--<div class="bd-items" v-if="orderDetailInfo.orderInvoice.deliverType !== undefined && orderDetailInfo.orderInvoice.deliverType ==1">-->
          <!--<span class="tit-1 tit-3">收货人：</span>-->
          <!--<span class="txt">{{getShowReceiveUserText(orderDetailInfo.orderInvoice.receiverName,orderDetailInfo.orderInvoice.mobileNo)}}</span>-->
          <!--</div>-->
          <!--<div class="bd-items" v-if="orderDetailInfo.orderInvoice.deliverType !== undefined && orderDetailInfo.orderInvoice.deliverType ==1">-->
          <!--<span class="tit-1">收货地址：</span>-->
          <!--<span class="txt">{{getShowReceiveAddressText(orderDetailInfo.orderInvoice.postAddress,orderDetailInfo.orderInvoice.postCode)}}</span>-->
          <!--</div>-->
          <!--&lt;!&ndash; 自取 &ndash;&gt;-->
          <!--<div class="bd-items" v-if="orderDetailInfo.orderInvoice.deliverType !== undefined && orderDetailInfo.orderInvoice.deliverType ==2">-->
          <!--<span class="tit-1">取件地址：</span>-->
          <!--<span class="txt">{{dealWithShowString(orderDetailInfo.orderInvoice.selfPickupAddress)}}</span>-->
          <!--</div>-->
          <!--<div class="bd-items" v-if="orderDetailInfo.orderInvoice.deliverType !== undefined && orderDetailInfo.orderInvoice.deliverType ==2">-->
          <!--<span class="tit-1">自取时间：</span>-->
          <!--<span class="txt">{{dealWithShowString(orderDetailInfo.orderInvoice.selfPickupDate)}}</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!-- 发票配送信息  -->
          <!--订单信息-->
          <div class="weui-panel hb-panel bor-b20" style="margin-top: 0">
            <div class="weui-panel__hd">订单信息</div>
            <div class="weui-cells" style="margin-top:0">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <div class="bd-items">
                    <span class="tit-1">订单类型：</span>
                    <span
                      class="txt">{{(orderDetailInfo.orderInvoice !== undefined && orderDetailInfo.paymentChannel != 'COLLECTIVE') ? '个人订单' : '集体订单'}}</span>
                  </div>
                  <div class="bd-items">
                    <span class="tit-1">订单号：</span>
                    <span class="txt">{{orderDetailInfo.orderNo}}</span>
                  </div>
                  <div class="bd-items" v-show="orderDetailInfo.orderInvoice !== undefined && orderDetailInfo.paymentChannel == 'COLLECTIVE'">
                    <span class="tit-1">集体报名批次：</span>
                    <span class="txt">{{orderDetailInfo.batchNo }}</span>
                  </div>
                  <!--<div class="bd-items" v-if="isShowOriginalOrderNo(orderDetailInfo.businessType,orderDetailInfo.originalOrderNo)">-->
                  <!--<span class="tit-1">原订单号：</span>-->
                  <!--<span class="txt">{{dealWithShowString(orderDetailInfo.originalOrderNo)}}</span>-->
                  <!--</div>-->
                  <!--<div class="bd-items">-->
                  <!--<span class="tit-1">培训机构：</span>-->
                  <!--<span class="txt">{{orderDetailInfo.unitName}}</span>-->
                  <!--</div>-->
                  <div class="bd-items">
                    <span class="tit-1">下单时间：</span>
                    <span class="txt">{{orderDetailInfo.createTime}}</span>
                  </div>
                  <div class="bd-items">
                    <span class="tit-1">支付渠道：</span>
                    <span
                      class="txt">{{getPaymentChannelText(orderDetailInfo.payType, orderDetailInfo.tradeChannelName, orderDetailInfo.depositBank)}}</span>
                  </div>
                  <div class="bd-items" v-if="orderDetailInfo.accountAlias!=undefined && orderDetailInfo.accountAlias.length>0">
                    <span class="tit-1">支付方式：</span>
                    <span class="txt">{{orderDetailInfo.accountAlias}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 培训内容 -->
          <div class="weui-panel hb-panel" style="margin-top: 0">
            <div class="weui-panel__hd">学分内容</div>
            <div class="order-top-tip order-top-tip-1" v-show="orderDetailInfo.haveCompulsoryCourse">
              系统将为你进行必修课程选课，选课结果<a href="javascript:void(0);" @click="goToSelectCourseLog()">请查阅选课记录</a>
              <img src="../../../design/images/tag-required.png" class="tag"/>
            </div>
            <div class="hb-media-box hb-media-box-1" style="flex-wrap: wrap" v-for="item in getList"
                 :key="item.subOrderNo">
              <div class="hb-media-box-hd">
                <img class="hb-media-box-thumb" src="../../../design/images/course-score.jpg"/>
                <!--<div class="label">{{getClassTypeInSkuList(item.skuPropertyNameList) === 0 ? '面授班' : '网络班'}}</div>-->
              </div>
              <div class="hb-media-box-bd">
                <!--<div class="hb-media-box-title">{{item.skuName}}</div>-->
                <div class="hb-media-box-desc">继续教育年度：{{item.yearName}}年</div>
                <div class="hb-media-box-desc">每学分：<span class="ci">¥ {{priceChangetoDecimal2(item.dealPrice)}}</span></div>
                <div class="hb-media-box-desc">学分：{{item.purchaseQuantity}}</div>
              </div>
              <!--<div :class="['price', (isShowSubRefundButton(item) || isShowSubChangeClassRecordButton(item) || isShowRelevanceOrder()) ? 'bottom-1' : '']">￥<span class="num">{{item.originalPrice}}</span></div>-->
              <!--<div v-if="isShowSubBottomBar(item)" style="margin-top: .1rem;width: 100%;text-align:right">-->
              <!--<div class="hb-btn-s" @click="seeRefund(item)" v-if="isShowSubRefundButton(item)">查看退款</div>-->
              <!--<div class="hb-btn-s" @click="changeClassRecord(item)" v-if="isShowSubChangeClassRecordButton(item)">换班记录</div>-->
              <!--<div class="hb-btn-s" @click="relevanceOrder(item)" v-if="isShowRelevanceOrder()">关联订单</div>-->
              <!--</div>-->
            </div>
            <div class="weui-cells" style="margin-top:0"
                 v-if="orderDetailInfo.subOrderList && orderDetailInfo.subOrderList.length > 3 && showMore"
                 @click="toggleShowMore()">
              <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd"></div>
                <div class="weui-cell__ft weui-cell__ft-1">查看更多</div>
              </div>
            </div>
            <div class="weui-cells" style="margin-top:0"
                 v-if="orderDetailInfo.subOrderList && orderDetailInfo.subOrderList.length > 3 && !showMore"
                 @click="toggleShowMore()">
              <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd"></div>
                <div class="weui-cell__ft weui-cell__ft-2">收起</div>
              </div>
            </div>

            <div class="order-info-box">
              <div class="btn-refund" v-show="orderDetailInfo.totalAmount != undefined && orderDetailInfo.totalAmount>0 && orderDetailInfo.paymentChannel != 'COLLECTIVE' && orderDetailInfo.status === 6 && (getList[0].refundStatus === 0 || getList[0].refundStatus === 3 || getList[0].refundStatus === 7 || getList[0].refundStatus === 10
              || getList[0].refundStatus === 9 || getList[0].refundStatus === 13)" @click="onRefundSubmit(orderDetailInfo.orderNo)">发起退款</div>
              <div>实付<span class="ml10 ci">¥ {{priceChangetoDecimal2(orderDetailInfo.totalAmount)}}</span></div>
            </div>

          </div>
        </div>
      </scroller>
    </div>
    <!-- <div class="complectinfo-box" @click="goToComplectInfoAction(item)">完善配送信息</div> -->
    <!--<div class="hb-tabbar" v-if="!orderDetailInfo.deleiverInfoComplete">-->
    <!--<div class="hb-btn hb-btn-3" @click="goToComplectInfoAction(orderDetailInfo)">完善配送信息</div>-->
    <!--</div>-->
    <div id="copyTarget" style="opacity: 0;" ref="copyTarget"></div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .bottom-1 {
    bottom: 1rem !important;
  }
</style>
<script>

  import {Scroller} from 'vux'
  import * as storeTypes from '../../store/types'
  import Clipboard from 'clipboard'
  import utils from '@/common/util/Utils'
  export default {
    components: {
      Scroller
    },
    mounted () {
      this.orderNo = this.$route.query.orderNo
      this.requestClassDetailInfo()
      let h1 = Number.parseInt(utils.selectClass('.hb-header-box').height);
      this.scrollerHeight = ((window.outerHeight - h1) || (window.innerHeight - h1)) + 'px'
      let self = this
      self.clipboard = new Clipboard('#copy-btn')
      self.clipboard.on('success', function (e) {
        self.toast('复制成功')
        e.clearSelection()
      })
      self.clipboard.on('error', function (e) {
        self.toast('复制失败')
      })
    },
    beforeDestroy () {
      this.clipboard.destroy()
    },
    data () {
      return {
        orderNo: '',
        orderItem: {},
        orderDetailInfo: {},
        scrollerHeight: '',
        clipboard: null,
        invoicePdfUrl: null,
        requestUrlSuccess: false,
        showMore: true
      }
    },
    beforeCreate () {
      console.log(this.$route)
      console.log(this.requestUrlSuccess)
    },
    computed: {
      getList () {
        let list = this.orderDetailInfo.subOrderList
        if (!list || !list.length) {
          return []
        }
        return list.length > 3 ? this.showMore ? [list[0]] : list : list
      }
    },
    methods: {
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
      isShowSubBottomBar (item) {
        if (item.status === 7) {
          return false
        } else {
          return true
        }
      },
      isShowSubRefundButton (subItem) {
        if (!subItem) {
          return false
        }
        if (subItem.status === 8 || subItem.status === 9 || subItem.exitRefundOrder) {
          return true
        } else {
          return false
        }
      },
      isShowSubChangeClassRecordButton (subItem) {
        if (!subItem) {
          return false
        }
        if (subItem.swapOut) {
          return true
        } else {
          return false
        }
      },
      isShowRelevanceOrder () {
        if (this.orderDetailInfo.businessType === 'SWAP_IN' || this.orderDetailInfo.businessType === 'SWAP_IN_AND_OUT') {
          return true
        } else {
          return false
        }
      },
      seeRefund (item) {
        let param = {
          subOrderNo: item.subOrderNo
        }
        this.push({path: '/refundLog', query: param})
      },
      changeClassRecord (item) {
        let param = {
          orderNo: item.subOrderNo,
          type: 'SWAPORDER'
        }
        this.push({path: '/trainingChangeLog', query: param})
      },
      relevanceOrder () {
        let param = {
          orderNo: this.orderDetailInfo.subOrderList[0].subOrderNo,
          type: 'ASSOCIATEORDER'
        }
        this.push({path: '/trainingChangeLog', query: param})
      },
      toggleShowMore () {
        this.showMore = !this.showMore
      },
      getOrderStatusText (status) {
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
      getOrderTypeText (businessType) {
        switch (businessType) {
          case 'NORMAL':
            return '购买订单'
          case 'SWAP_OUT':
            return '购买订单'
          case 'SWAP_IN':
            return '换班订单'
          case 'SWAP_IN_AND_OUT':
            return '换班订单'
          default:
            return ''
        }
      },
      getInvoiceTitleTypeText (titleType) {
        if (titleType === 1 || titleType === '1') {
          return '个人'
        } else if (titleType === 2 || titleType === '2') {
          return '单位'
        } else {
          return '-'
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
      getInvoicePrintTypeText (makeOutType) {
        // 开票方式 1：普通发票；2、普通电子发票；3：增值税专用发票；4、非税务票（纸质）
        switch (makeOutType) {
          case 1:
            return '普通发票'
          case 2:
            return '增值税普通发票（电子）'
          case 3:
            return '增值税专用发票'
          case 4:
            return '非税务票（纸质）'
          default:
            return '-'
        }
      },
      dealWithShowString (showString) {
        if (showString === undefined) {
          return '-'
        }
        if (showString !== undefined && showString.length) {
          return showString
        }
        return '-'
      },
      getDeliverTypeText (deliverType) {
        if (deliverType === 1) {
          return '邮寄'
        } else if (deliverType === 2) {
          return '自取'
        } else {
          return '-'
        }
      },
      getShowReceiveUserText (receiveUserName, mobileNumber) {
        if (receiveUserName === undefined && mobileNumber === undefined) {
          return '-'
        }
        if (receiveUserName !== undefined && !receiveUserName.length && mobileNumber !== undefined && !mobileNumber.length) {
          return '-'
        }
        if (receiveUserName !== undefined && receiveUserName.length && mobileNumber !== undefined && mobileNumber.length) {
          return receiveUserName + ' , ' + mobileNumber
        }
        if (receiveUserName !== undefined && receiveUserName.length && (mobileNumber === undefined || !mobileNumber.length)) {
          return receiveUserName
        }
        return '-'
      },
      getShowReceiveAddressText (receiveAddress, receivePostCode) {
        if (receiveAddress === undefined && receivePostCode === undefined) {
          return '-'
        }
        if (receiveAddress !== undefined && !receiveAddress.length && receivePostCode !== undefined && !receivePostCode.length) {
          return '-'
        }
        if (receiveAddress !== undefined && receiveAddress.length && receivePostCode !== undefined && receivePostCode.length) {
          return receiveAddress + ' , ' + receivePostCode
        }
        if (receiveAddress !== undefined && receiveAddress.length && (receivePostCode === undefined || !receivePostCode.length)) {
          return receiveAddress
        }
        return '-'
      },
      isShowOriginalOrderNo (businessType, originalOrderNo) {
        if (businessType === undefined || originalOrderNo === undefined || originalOrderNo === null) {
          return false
        }
        if (businessType === 'NORMAL') {
          return false
        } else if (businessType === 'SWAP_OUT') {
          return false
        } else if (businessType === 'SWAP_IN_AND_OUT') {
          return true
        } else if (businessType === 'SWAP_IN') {
          return true
        }
        return false
      },
      getPaymentChannelText (payType, tradeChannelName, depositBank) {
        if (payType === undefined || tradeChannelName === undefined) {
          return ''
        }
        let showString = ''
        if (payType === 1) {
          showString = '线上支付/'
        } else if (payType === 2) {
          showString = '线下支付/'
        }
        if (tradeChannelName && tradeChannelName.length) {
          showString += tradeChannelName
        }
//        if (depositBank && depositBank.length) {
//          showString += '-'
//          showString += depositBank
//        }
        return showString
      },
      /**
       * 请求订单详细数据
       */
      requestClassDetailInfo () {
        this.showLoading('加载中.....')
        if (!this.orderNo.length) {
          this.toast('订单号为空，无法获取订单信息')
          return
        }
        let param = {
          orderNo: this.orderNo
        }
        this.$store.dispatch(storeTypes.ORDER_GET_ORDER_DETAIL, param).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.orderDetailInfo = data.data
            return
          }
        }).catch(e => {
          console.log('error>>>>>>>' + e)
        })
      },
      /** 通过keyname获取对应的sku值 */
      getSkuPropertyValueNameByKeyName (keyName, item) {
        if (item === undefined || item.skuPropertyNameList === undefined) {
          return ''
        }
        if (item.skuPropertyNameList.length === 0) {
          return ''
        }
        let propertyName = ''
        for (let i = 0; i < item.skuPropertyNameList.length; i++) {
          let skuPropertyObject = item.skuPropertyNameList[i]
          if (skuPropertyObject.skuPropertyName === keyName) {
            propertyName = skuPropertyObject.skuPropertyValueName
          }
        }
        return propertyName
      },
      // =========================显示事件=========================
      isShowMoreStatusButton () {
        if (this.orderDetailInfo === undefined || this.orderDetailInfo.status === undefined) {
          return false
        }
        if (this.orderDetailInfo.status === 1 || this.orderDetailInfo.status === 2 || this.orderDetailInfo.status === 8) {
          return false
        } else {
          return true
        }
      },
      isShowCancelOrderButton () {
        if (this.orderDetailInfo === undefined || this.orderDetailInfo.status === undefined) {
          return false
        }
        if (this.orderDetailInfo.status === 1 || this.orderDetailInfo.status === 2 || this.orderDetailInfo.status === 8) {
//          if (this.orderDetailInfo.paymentChannel === 'COLLECTIVE') {
//            return false
//          }
          return true
        } else {
          return false
        }
      },
      isShowCompleteButton () {
        if (this.orderDetailInfo.deleiverInfoComplete === undefined) {
          return false
        }
        if (!this.orderDetailInfo.deleiverInfoComplete) {
          return true
        } else {
          return false
        }
      },
      // 是否显示发票信息
      isShowInvoiceInfo () {
        if (this.orderDetailInfo.invoiceDeliverInfo === undefined || this.orderDetailInfo.invoiceDeliverInfo === null) {
          return false
        } else {
          return true
        }
      },
      // 是否显示发票配送信息，当发票信息不为空且不为电子发票的时候
      isShowInvoiceInfoSendStatus () {
        if (this.orderDetailInfo.invoiceDeliverInfo !== undefined && this.orderDetailInfo.invoiceDeliverInfo !== null && !this.orderDetailInfo.invoiceDeliverInfo.electron) {
          return true
        } else {
          return false
        }
      },
      // 是否显示发票物流信息,当发票信息不为空且不为电子发票且配送方式为邮寄的时候
      isShowInvoiceDeliveryInfo () {
        if (this.orderDetailInfo.invoiceDeliverInfo !== undefined && this.orderDetailInfo.invoiceDeliverInfo !== null && this.orderDetailInfo.invoiceDeliverInfo.deliverType === 1 && !this.orderDetailInfo.invoiceDeliverInfo.electron && this.invoiceDeliverInfo.expressCompany && this.invoiceDeliverInfo.trackingNumber) {
          return true
        } else {
          return false
        }
      },
      // 是否显示证书信息 至少有一个配送物流信息
      isShowCerDeliverInfo () {
        if (this.orderDetailInfo.cerDeliverInfo === undefined || this.orderDetailInfo.cerDeliverInfo === null || this.orderDetailInfo.cerDeliverInfo.length === 0) {
          return false
        } else {
          return true
        }
      },
      // 是否显示证书配送物流信息
      isShowCerDeliverDeliveryInfo () {
        if (this.orderDetailInfo.cerDeliverInfo !== undefined && this.orderDetailInfo.cerDeliverInfo !== null && this.orderDetailInfo.cerDeliverInfo.length >= 0 && this.cetDeliverFirstInfo.deliverType === 1) {
          return true
        } else {
          return false
        }
      },
      isShowCopyButton () {
        if (Clipboard.isSupported() && this.orderDetailInfo.orderInvoice.trackingNumber) {
          return true
        } else {
          return false
        }
      },
      isShowSeeInvoice () {
        if (!this.orderDetailInfo.invoiceDeliverInfo) {
          // 没有发票
          return false;
        } else if (!this.orderDetailInfo.invoiceDeliverInfo.electron) {
          // 不是电子发票
          return false;
        } else if (this.orderDetailInfo.invoiceDeliverInfo.invoiceState !== '5' && this.orderDetailInfo.invoiceDeliverInfo.invoiceState !== '9') {
          // 电子发票状态不为5或9
          return false;
        }
        return true;
      },
      // =========================按钮事件=========================
      moreStatusAction () {
        let param = {
          orderNo: JSON.stringify(this.orderDetailInfo.orderNo),
          statusLogList: JSON.stringify(this.orderDetailInfo.statusLogList)
        }
        this.push({path: '/statusChange', query: param})
      },
      /**
       *
       */
      filterChangeStatus(status){
        var tempStr = '';
        if (this.orderDetailInfo !== undefined && this.orderDetailInfo.statusLogList !== undefined && this.orderDetailInfo !== null){
          this.orderDetailInfo.statusLogList.forEach((item) => {
            if(item.status === status){
              tempStr = item.operateTime;
            }
          });
        }
        return tempStr;
      },
      goToPayAction () {
        if (this.orderDetailInfo.paymentChannel === 'COLLECTIVE') {
          this.$vux.alert.show({
            title: '提示',
            content: '该订单是集体购买，请联系管理员处理！',
            buttonText: '知道了',
            onShow () {
              console.log('Plugin: I\'m showing')
            },
            onHide () {
              console.log('Plugin: I\'m hiding')
            }
          })
        } else {
          this.judgeCheckStudentPayOrder();
        }
      },
      /**
       * 网络请求---校验必修课学分是否改变
       */
      judgeCheckStudentPayOrder(){
        var _this = this;
//        _this.showLoading('加载中.....')
        _this.$store.dispatch(storeTypes.ORDER_CHECK_STUDENT_PAY_ORDER, {
          orderNo: _this.orderNo,
          yearName: _this.orderDetailInfo.subOrderList[0].yearName
        }).then(data => {
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            if (data.data.canPay) {
              let param = {
                orderNo: _this.orderDetailInfo.orderNo
              }
              _this.push({path: '/orderPay', query: param})
            } else {
              _this.goToCreateOrder(data.data);
            }
          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
//          _this.hideLoading();
          console.log('error>>>>>>>' + e)
        })
      },
      goToCreateOrder(data){
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
            _this.realCancelOrder('goToCreate');
          }
        })
      },
      cancelOrderAction () {
        this.showConfirm()
      },
      goToComplectInfoAction (item) {
        this.$store.commit(storeTypes.ORDER_SET_NEED_COMPLETE_ORDER_LIST, [item])
        this.push({path: '/completeOrder', query: {path: '/orderDetail?orderNo=' + this.orderNo}})
      },
      changeCopyText (content) {
        this.$refs.copyTarget.innerText = content
      },
      /**
       * 显示取消提示
       */
      showConfirm () {
        if (this.orderDetailInfo.orderNo === undefined || this.orderDetailInfo.orderNo.trim() === '') {
          this.toast('订单号为空，无法取消订单')
          return
        }
        let self = this
        this.$vux.confirm.show({
          title: '提示',
          content: `确定要取消订单吗？`,
          confirmText: '确定',
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
            self.realCancelOrder()
          }
        })
      },
      // （用户点击确认取消订单时调用）调用取消订单接口
      realCancelOrder (tempStr) {
        let self = this
        let param = {
          orderNo: this.orderDetailInfo.orderNo
        }
        this.$store.dispatch(storeTypes.ORDER_CANCEL_ORDER, param).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            self.toast('订单取消成功')
            if (tempStr != undefined) {
              let param = {
                currentYear: self.orderDetailInfo.subOrderList[0].yearName
              }
              self.replace({path: '/createOrder', query: param})
            } else {
              setTimeout(function () {
                self.requestClassDetailInfo()
              }, 1000)
            }
          } else {
            this.toast(data.head.message)
          }
        }).catch(e => {
          console.log('error>>>>>>>' + e)
        })
      },
      // 检测是否已经完善
      checkIsUncomlteOrder (orderNo) {
        for (let key in this.unCompleteOrderList) {
          let order = this.unCompleteOrderList[key]
          if (order === orderNo) {
            return true
          }
        }
        return false
      },
      /**
       * 跳转至选课记录
       */
      goToSelectCourseLog(){
        this.push({
          path: 'compulsoryCourseList',
          query: {
            currentYear:this.orderDetailInfo.subOrderList[0].yearName
          }
        })
      },
      lookSaveOrderInvoice(){
        window.location.href = this.orderDetailInfo.orderInvoice.pdfPath;
//        this.push({
//          path: '/saveOrderInvoice',
//          query: {
//            pdfPath: this.orderDetailInfo.orderInvoice.pdfPath
//          }
//        })
      },
      /**
       * 发起退款
       */
      onRefundSubmit (orderNo) {
        let param = {
          orderNo: orderNo,
          subOrderList: this.getList
        }
        this.push({ path: '/refundSubmit', query: param })
      }
    }
  }
</script>
