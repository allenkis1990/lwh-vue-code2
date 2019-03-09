<template>
  <div>
    <scroller lock-x scrollbar-y :height="scrollerHeight" use-pulldown use-pullup @cell-click="cellClickAction"
              @on-pullup-loading="loadMoreData" @on-pulldown-loading="refreshData" v-model="scroller" ref="scroller">
      <div>
        <div class="hb-wrap-box" v-if="items.length === 0">
          <div class="no-data-box">
            <img class="no-data-img" src="../../../design/images/no-data-img.png" alt=" ">
            <p class="no-data-txt">暂时还没有数据~</p>
          </div>
        </div>
        <order-list-cell-refunde v-for="item in items" :key="item.refundOrderNo" :item="item"
                         @on-cellClick="cellClickAction" @on-refundDetail="onRefundDetail" @on-refundSubmit="onRefundSubmit" ></order-list-cell-refunde>
      </div>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down"
           style="position: absolute; width: 100%; height: 40px; line-height: 40px; top: -60px; text-align: center;">
        <span v-show="scroller.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scroller.pulldownStatus === 'down' || scroller.pulldownStatus==='up'"
              :class="{'rotate': scroller.pulldownStatus === 'up'}"
              style="font-size: 16px;font-weight: bold;">↓</span>
        <div v-show="scroller.pulldownStatus === 'loading'">
          <p class="inloading">
            <inline-loading></inline-loading>
            <span class="il-text">
              刷新中...
            </span>
          </p>
        </div>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="scroller.pullupStatus === 'default'"></span>
        <span class="pullup-arrow"
              v-show="scroller.pullupStatus === 'default' || scroller.pullupStatus === 'up' || scroller.pullupStatus === 'down'"
              :class="{'rotate': scroller.pullupStatus === 'down'}">↑</span>
        <span v-show="scroller.pullupStatus === 'loading'">
          <spinner type="ios-small"></spinner>
        </span>
        <span v-show="scroller.pullupStatus === 'loading'" class="il-text">
              数据加载中...
          </span>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
</style>
<script>
  import OrderListCellRefunde from './OrderListCellRefunde.vue'
  import * as storeTypes from '../../store/types'
  import { Scroller, LoadMore, InlineLoading, Spinner } from 'vux'

  export default {
    name: 'order-list-refunde',
    components: { OrderListCellRefunde, Scroller, LoadMore, InlineLoading, Spinner },
    data () {
      return {
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'disabled',
          pulldownStatus: 'default'
        },
        currentPage: 1,
        recordPage: 1,
        loadingStatus: 'refresh',
        isLoadingData: false,
        isFirstLoadData: true,
        items: []
      }
    },
    methods: {
      // ========================获取列表数据===========================
      getColseOrderListData () {
        if (this.isLoadingData) {
          return
        }
        let params = {
          pageNo: this.currentPage,
          pageSize: 10
//          orderStatus: 'TRADE_CLOSE',
//          propertyQueries: []
        }
        this.$store.dispatch(storeTypes.ORDER_GET_ORDERLIST_REFUNDE, params).then((data) => {
          if (this.isFirstLoadData) {
            this.hideLoading()
          }
          this.isFirstLoadData = false
          this.isLoadingData = false
          // 停止刷新状态
          if (this.loadingStatus === 'refresh') {
            if (this.$refs.scroller !== undefined) {
              this.$refs.scroller.donePulldown()
            }
          } else if (this.loadingStatus === 'loadMore') {
            if (this.$refs.scroller !== undefined) {
              this.$refs.scroller.donePullup()
            }
          }
          if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            this.toast(data.head.message)
            // 加载失败时
            if (this.loadingStatus === 'refresh') {
              this.currentPage = this.recordPage
            }
          } else {
            // 加载成功
            this.items = this.$store.getters.refundeList
            this.$refs.scroller.reset()
            if (data.data.currentPageData.length >= 10) {
              if (this.$refs.scroller !== undefined) {
                this.$refs.scroller.enablePullup()
              }
            } else {
              if (this.$refs.scroller !== undefined) {
                this.$refs.scroller.disablePullup()
              }
            }
            this.recordPage = this.currentPage
            this.currentPage++
          }
        }).catch(e => {
          console.log('>>' + e)
          this.isLoadingData = false
          if (this.loadingStatus === 'refresh') {
            this.$refs.scroller.donePulldown()
            this.currentPage = this.recordPage
          } else if (this.loadingStatus === 'loadMore') {
            this.$refs.scroller.donePullup()
          }
        })
      },
      // ========================按钮事件===========================
      loadMoreData () {
        this.loadingStatus = 'loadMore'
        this.getColseOrderListData()
      },
      refreshData () {
        this.currentPage = 1
        this.loadingStatus = 'refresh'
        this.getColseOrderListData()
      },
      resetScroller () {
        this.$refs.scroller.reset({ top: 0 })
      },
      /**
       * cell点击事件，跳转详情页
       */
      cellClickAction (item) {
      },
      /**
       * 退款详情
       */
      onRefundDetail (item) {
        let param = {
          orderNo: item.orderNo,
          refundOrderNo: item.refundOrderNo,
          enterType: 1
        }
        this.push({ path: '/refundDetail', query: param })
      },
      /**
       * 发起退款
       */
      onRefundSubmit (item) {
        let param = {
          orderNo: item.orderNo,
          subOrderList: item.subOrderList
        }
        this.push({ path: '/refundSubmit', query: param })
      }
    },
    // ========================生命周期钩子===========================
    mounted () {
      this.scrollerHeight = ((window.outerHeight - 90) || (window.innerHeight - 90)) + 'px'
      this.getColseOrderListData()
      let self = this
      setTimeout(function () {
        self.$refs.scroller.disablePullup()
      }, 300)
      this.showLoading('数据加载中...')
    },
    activated () {
    }
  }
</script>
