<template>
  <div class="js_dialog" id="iosDialog1" style="opacity: 1;" v-if="needCompleteOrderList.length > 0">
    <div class="weui-mask"></div>
    <div class="weui-dialog weui-dialog-1">
      <div class="dialog-pic"><img src="../../../../design/images/distribution-img.png" alt=""></div>
      <div class="weui-dialog__bd">亲，您存在<span class="cr"> {{needCompleteOrderList.length}}个 </span>订单需要完善配送信息，以便发票/证书的配送！
      </div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" @click="gotoCompleteOrder()" class="weui-dialog__btn weui-dialog__btn_primary">前往完善</a>
      </div>
    </div>
  </div>
</template>
<script>
  import * as storeTypes from '../../../store/types'

  export default {
    data () {
      return {
        needCompleteOrderList: []
      }
    },
    beforeMount () {
      this.$store.dispatch(storeTypes.ORDER_GET_NEED_COMPLETE_ORDER_LIST).then(data => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          if (data.data.currentPageData && data.data.currentPageData.length > 0) {
            for (var i = 0; i < data.data.currentPageData.length; i++) {
              this.needCompleteOrderList.push(data.data.currentPageData[i])
            }
          }
        } else {
          this.toast(data.head.message)
        }
      })
    },
    methods: {
      gotoCompleteOrder () {
        this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, false)
        this.push({ path: '/completeOrder', query: { path: '/demo/mine', orderList: this.needCompleteOrderList } })
      }
    }
  }
</script>
