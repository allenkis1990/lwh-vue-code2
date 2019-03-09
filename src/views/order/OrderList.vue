<template>
  <div class="contain">
    <CompleteOrderDialog></CompleteOrderDialog>
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-left">
        <!--<a class="hb-ico ico-menu"></a>-->
      </div>
      <div class="header-tit">我的订单</div>
      <div class="header-right">
        <!--<a class="hb-ico ico-center"></a>-->
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-wrap-box" style="padding-top: 0.9rem">
      <tab class="vux-tab hb-tab">
        <tab-item selected active-class="vux-tab-selected" class="vux-tab-item" @on-item-click="onItemClick">未支付
        </tab-item>
        <tab-item active-class="vux-tab-selected" class="vux-tab-item" @on-item-click="onItemClick">已支付</tab-item>
        <tab-item active-class="vux-tab-selected" class="vux-tab-item" @on-item-click="onItemClick">交易关闭</tab-item>
        <tab-item active-class="vux-tab-selected" class="vux-tab-item" @on-item-click="onItemClick">退款</tab-item>
      </tab>
    </div>
    <keep-alive :include="includedComponents">
      <order-list-unpay v-if="index === 0" ref="unpayList"></order-list-unpay>
      <order-list-havepay v-if="index === 1" ref="havepayedList"></order-list-havepay>
      <order-list-close v-if="index === 2" ref="closeList"></order-list-close>
      <order-list-refunde v-if="index === 3" ref="closeList"></order-list-refunde>
    </keep-alive>
    <!--<div v-transfer-dom>-->
    <!--<alert v-model="show2"></alert>-->
    <!--</div>-->

    <!--返回顶部-->
    <div class="layer-box" @click="resetAction">
      <div class="a-items">
        <img class="img" src="../../../design/images/icon-top.png" alt=" "/>
      </div>
    </div>
    <!--/返回顶部-->
  </div>
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";


  .lwh-vux-tab .vux-tab-wrap {
    padding-top: 0px;
  }

  .vux-tab-selected {
    color: @theme-color !important;
  }

  .vux-tab-ink-bar {
    background: @theme-color !important;
  }
</style>
<script>
  import CompleteOrderDialog from './CompleteOrder/completeOrderDialog'
  import { Tab, TabItem, Alert } from 'vux'
  import * as storeTypes from '../../store/types'
  import OrderListHavepay from './OrderList_havePay.vue'
  import OrderListUnpay from './OrderList_unPay.vue'
  import OrderListClose from './OrderList_close.vue'
  import OrderListRefunde from './OrderList_refunde.vue'

  export default {
    components: {
      Tab,
      TabItem,
      Alert,
      OrderListHavepay,
      OrderListUnpay,
      OrderListClose,
      OrderListRefunde,
      CompleteOrderDialog
    },
    mounted () {
      this.onItemClick(0)
      this.getUncompleteListData()
      this.showLoading('数据加载中...')
    },
    beforeDestroy () {
      console.log('orderList beforeDestroy')
    },
    destroyed () {
//      console.log('orderList destroyed')
    },
    data () {
      return {
        includedComponents: ['order-list-unpay', 'order-list-close', 'order-list-havepayed', 'order-list-refunde'],
        index: 0,
        unCompleteOrderNum: 0
      }
    },
    computed: {},
    methods: {
      onItemClick (index) {
        this.index = index
      },
      drawerVisibilityEvent () {
        this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, true)
      },
      getUncompleteListData () {
        let param = {}
        this.$store.dispatch(storeTypes.ORDER_GET_NEED_COMPLETE_ORDER_LIST, param).then(data => {
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.unCompleteOrderNum = this.$store.state.orderModule.needCompleteOrderList.length
          } else {
          }
        }).catch(e => {
          console.log('error>>>>>>>' + e)
        })
      },
      getShowBadgeNumText () {
        if (this.unCompleteOrderNum > 0) {
          return this.unCompleteOrderNum + ''
        } else {
          return ''
        }
      },
      resetAction () {
        switch (this.index) {
          case 0: {
            this.$refs.unpayList.resetScroller()
            break
          }
          case 1: {
            this.$refs.havepayedList.resetScroller()
            break
          }
          case 2: {
            this.$refs.closeList.resetScroller()
            break
          }
        }
      }
    }
  }
</script>
