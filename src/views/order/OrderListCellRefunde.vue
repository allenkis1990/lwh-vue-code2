<template>
  <div class="weui-panel hb-panel bor-b20" @click="cellClickAction">
    <div class="order-info-box">
      <div class="order-date">
        <img src="../../../design/images/icon-ordernum.png"/>
        <div class="text">{{item.orderNo}}</div>
      </div>
    </div>
    <OrderListSubCellRefunde v-for="subItem in item.subOrderShow" :key="subItem.subOrderNo"
                         :subOrderLen="item.subOrderList.length" :subItem="subItem" :channel="item.channel"
                         :overThree="item.overThree" @on-subSeeRefund="seeRefundAction(subItem)"
                         @on-subChangeClassRecord="changeClassRecordAction(subItem)"></OrderListSubCellRefunde>
    <div class="weui-cells" style="margin-top:0" v-if="item.overThree" @click="toggleExpand($event)">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd"></div>
        <div class="weui-cell__ft weui-cell__ft-1" v-show="!item.expand">查看更多学分内容</div>
        <div class="weui-cell__ft weui-cell__ft-2" v-show="item.expand">收起</div>
      </div>
    </div>
    <div class="order-info-box bor-t" ref="bottomBar"
         style="padding-top:10px;border-bottom: 1px solid #e8e8e8">
      <div>订单状态：<span class="ci">{{getOrderStatusText()}}</span></div>
      <div class="ci" @click="buttonAction('refundSubmit', $event)" v-if="isShowSeeRefundSubmit(this.item)" >退款提交申请</div>
      <div class="btn-refund" @click="buttonAction('refundDetail', $event)" v-if="isShowSeeRefundDetail(this.item)" >查看详情</div>
    </div>
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";


  .show-more {
    width: 100%;
    padding: 0.2rem 0.3rem;
    text-align: right;
    color: #999;
    font-size: 15px;
    cursor: pointer;
  }

  .hb-btn-s-order {
    width: 75px;
    height: 30px;
    line-height: 2.5;
    text-align: center;
    border: 1px solid #ddd;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
    display: inline-block;
    color: #666;
    font-size: 13px;
    margin-top: 7px;
    margin-bottom: 7px;

    &.current {
      border-color: @theme-color;
      background-color: @theme-color;
      color: #fff;
    }
  }
</style>
<script>
  import OrderListSubCellRefunde from './OrderListSubCellRefunde.vue'

  export default {
    components: { OrderListSubCellRefunde },
    props: {
      item: {
        type: Object,
        require: true
      }
    },
    data () {
      return {}
    },
    beforeMount () {
      this.transformItem(this.item)
    },
    beforeUpdate () {
      this.transformItem(this.item)
    },
    methods: {
      transformItem (item) {
        if (item.subOrderShow) {
          return
        }
        if (item.subOrderList.length > 3) {
          this.$set(item, 'overThree', true)
          this.$set(item, 'expand', false)
          this.$set(item, 'subOrderShow', [item.subOrderList[0]])
        } else {
          this.$set(item, 'subOrderShow', item.subOrderList)
        }
      },
      toggleExpand (e) {
        e.stopPropagation()
        if (this.item.expand === undefined) {
          return
        }
        if (this.item.expand) {
          this.item.expand = false
          this.item.subOrderShow = [this.item.subOrderList[0]]
        } else {
          this.item.expand = true
          this.item.subOrderShow = this.item.subOrderList
        }
      },
      getOrderStatusText () {
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
       * 10:退款失败
       * 11:退货不退款成功
       * 12:退货不退款成功
       * 13:卖家取消退款申请
       */
        switch (this.item.refundOrderStatus) {
          case 1: {
            return '退款提交申请'
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
      isShowSeeRefundSubmit (item) {
        if (item === undefined) {
          return false
        }
        if (item.subOrderList === undefined || !item.subOrderList.length) {
          return false
        }
        if (item.subOrderList.length === 1) {
          let subItem = item.subOrderList[0]
          if (subItem.refundOrderStatus === 3 || subItem.refundOrderStatus === 7) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      isShowSeeRefundDetail (item) {
        if (item === undefined) {
          return false
        }
        if (item.subOrderList === undefined || !item.subOrderList.length) {
          return false
        }
        if (item.subOrderList.length === 1) {
          return true
        } else {
          return false
        }
      },
      seeRefundAction (subItem) {
        // 退款记录 主订单的id
        this.$emit('on-seeRefund', this.item)
      },
      changeClassRecordAction (subItem) {
        // 换班记录 子订单的id
        this.$emit('on-changeClassRecord', subItem)
      },

      buttonAction (type, event) {
        if (event) {
          event.stopPropagation()
        }
        switch (type) {
          // 查看退款详情
          case 'refundDetail' : {
            if (this.item.subOrderList.length === 1) {
              this.$emit('on-refundDetail', this.item)
            }
            break
          }
          // 发起退款
          case 'refundSubmit' : {
            if (this.item.subOrderList.length === 1) {
              this.$emit('on-refundSubmit', this.item)
            }
            break
          }
        }
      },
      cellClickAction () {
        this.$emit('on-cellClick', this.item)
      }
    }
  }
</script>

