<template>
  <!--更多状态-->
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">退款受理情况</div>
    </div>
    <!--标题栏-->
    <scroller lock-x>
      <div class="hb-timeline-box hb-timeline-box-1">
        <div class="hb-timeline">
          <div class="timeline-items" v-for="(item, index) in refundLogList" :key="index">
            <span :class="getStatusStyle(item)" v-show="item.processed"></span>
            <div class="items-bd" v-show="item.processed">
              <div class="items-info">{{getStatusText(item)}}</div>
              <div class="sub-info" v-show="item.refundOrderStatus == 1 || item.refundOrderStatus == 2 || item.refundOrderStatus == 3 || item.refundOrderStatus == 6 || item.refundOrderStatus == 7 || item.refundOrderStatus == 9" >{{item.operateTime}}</div>
              <div class="fs24 ci" v-show="item.refundOrderStatus == 3 || item.refundOrderStatus == 7">原因：{{item.operateReason}}</div>
              <div class="sub-info" v-if="item.refundOrderStatus == 1">订单号：{{orderNo}}</div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  import { Scroller } from 'vux'
  export default {
    components: { Scroller },
    data () {
      return {
        orderNo: '',
        refundLogList: []
      }
    },
    computed: {},
    methods: {
      getStatusStyle: function (item) {
        var str = []
        switch (item.refundOrderStatus) {
          case 1: {
            str = ['hb-ico','hb-ico2','ico-submit']
            break
          }
          case 2: {
            str = ['hb-ico','hb-ico2','ico-pass']
            break
          }
          case 3:
          case 7: {
            str = ['hb-ico','hb-ico2','ico-refuse']
            break
          }
          case 4:
          case 5:
          case 8:
          case 10: {
            str = ['hb-ico','hb-ico2','ico-process']
            break
          }
          case 6:
          case 11:
          case 12: {
            str = ['hb-ico','hb-ico2','ico-succ']
            break
          }
          case 9:
          case 13: {
            str = ['hb-ico','hb-ico2','ico-close']
            break
          }
          default:
            break
        }
        return str
      },
      getStatusText: function (item) {
        var str = ''
        switch (item.refundOrderStatus) {
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
          default:
            break
        }
        return str
      }
    },
    created () {
    },
    mounted () {
      this.orderNo = JSON.parse(this.$route.query.orderNo)
      this.refundLogList = JSON.parse(this.$route.query.refundLogList).sort((a, b) => {
        return b.refundOrderStatus - a.refundOrderStatus
      })
    }
  }
</script>
