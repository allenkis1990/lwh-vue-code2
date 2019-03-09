<template>
  <div>
    <scroller lock-x scrollbar-y :height="scrollerHeight" use-pulldown use-pullup @on-pullup-loading="loadMoreData"
              @on-pulldown-loading="refreshData" v-model="scroller" ref="scroller">
      <div>
        <div class="hb-wrap-box" v-if="items.length === 0">
          <div class="no-data-box">
            <img class="no-data-img" src="../../../design/images/no-data-img.png" alt=" ">
            <p class="no-data-txt">暂时还没有数据~</p>
          </div>
        </div>
        <order-list-cell v-for="item in items" :key="item.orderNo" @on-goToPay="goToPayAction" :item="item"
                         @on-cancelOrder="cancelOrderAction" @on-cellClick="cellClickAction"></order-list-cell>
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
        <span v-show="scroller.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span> <span
        v-show="scroller.pullupStatus === 'loading'" class="il-text">
              数据加载中...
            </span>
      </div>
    </scroller>
  </div>
</template>
<style lang="less">
  .rotate {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }

  .pullup-arrow {
    display: block;
    transition: all linear 0.2s;
    -webkit-transition: all linear 0.2s;
    color: #666;
    font-size: 15px;
  }
</style>
<script>
  import OrderListCell from './orderListCell.vue'
  import { Scroller, LoadMore, InlineLoading, Spinner } from 'vux'
  import * as storeTypes from '../../store/types'

  export default {
    name: 'order-list-unpay',
    components: { OrderListCell, Scroller, LoadMore, InlineLoading, Spinner },
    data () {
      return {
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'disabled',
          pulldownStatus: 'default'
        },
        currentPage: 1,
        recordPage: 1,
        freshStatus: 'refresh',
        isLoadingData: false,
        items: [],
        isFirstLoadData: true
      }
    },
    methods: {
      // ========================获取列表数据===========================
      getUnpayListData () {
        var _this = this
        if (this.isLoadingData) {
          return
        }
        let params = {
          pageNo: this.currentPage,
          pageSize: 10,
          orderStatus: 'WAIT_FOR_PAYMENT',
          propertyQueries: []
        }
        this.$store.dispatch(storeTypes.ORDER_GET_ORDERLIST, params).then((data) => {
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
            if (this.freshStatus === 'refresh') {
              this.currentPage = this.recordPage
            }
          } else {
            debugger
            // 加载成功
            _this.items = _this.$store.getters.orderList.unPayList
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
          if (this.freshStatus === 'refresh') {
            this.currentPage = this.recordPage
          }
        })
      },
      // ========================按钮事件===========================
      loadMoreData () {
        this.loadingStatus = 'loadMore'
        this.getUnpayListData()
      },
      refreshData () {
        this.currentPage = 1
        this.loadingStatus = 'refresh'
        this.getUnpayListData()
      },
      resetScroller () {
        this.$refs.scroller.reset({ top: 0 })
      },
      /**
       * cell点击事件，跳转详情页
       */
      cellClickAction (item) {
        let param = {
          orderNo: item.orderNo
        }
        this.push({ path: '/orderDetail', query: param })
      },
      /**
       * 前往支付事件
       */
      goToPayAction (item) {
        if (item.paymentChannel === 'COLLECTIVE') {
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
          this.judgeCheckStudentPayOrder(item)
        }
      },
      /**
       * 网络请求---校验必修课学分是否改变
       */
      judgeCheckStudentPayOrder (item) {
        var _this = this
//        _this.showLoading('加载中.....')
        _this.$store.dispatch(storeTypes.ORDER_CHECK_STUDENT_PAY_ORDER, {
          orderNo: item.orderNo,
          yearName: item.subOrderList[0].yearName
        }).then(data => {
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            if (data.data.canPay) {
              let param = {
                orderNo: item.orderNo
              }
              _this.push({ path: '/orderPay', query: param })
            } else {
              _this.goToCreateOrder(data.data, item)
            }
          } else {
            _this.toast(data.head.message)
          }
        }).catch(e => {
//          _this.hideLoading();
          console.log('error>>>>>>>' + e)
        })
      },
      goToCreateOrder (data, item) {
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
            _this.realCancelOrder(item, 'goToCreate')
          }
        })
      },
      /**
       * 取消订单事件
       */
      cancelOrderAction (item) {
        this.showConfirm(item)
      },
      // （用户点击确认取消订单时调用）调用取消订单接口
      realCancelOrder (item, tempStr) {
        var _this = this
        let param = {
          orderNo: item.orderNo
        }
        this.$store.dispatch(storeTypes.ORDER_CANCEL_ORDER, param).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.toast('订单取消成功')
            debugger
            if (tempStr != undefined && tempStr === 'goToCreate') {
              let param = {
                currentYear: item.subOrderList[0].yearName
              }
              _this.push({ path: '/createOrder', query: param })
            } else {
              _this.refreshData()
              // 未完成，订单取消页面刷新数据
              _this.$store.commit(storeTypes.ORDER_SET_ISREFEASHCLOSEORDERLISTDATA, true)
            }
          } else {
            this.toast(data.head.message)
          }
        }).catch(e => {
          console.log('error>>>>>>>' + e)
        })
      },
      /**
       * 显示取消提示
       */
      showConfirm (item) {
        if (item.orderNo === undefined || item.orderNo.trim() === '') {
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
            self.realCancelOrder(item)
          }
        })
      }
    },
    // ========================生命周期钩子===========================
    mounted () {
      this.getUnpayListData()
      let self = this
      setTimeout(function () {
        if (self.$refs.scroller !== undefined) {
          self.$refs.scroller.disablePullup()
        }
      }, 300)
      this.scrollerHeight = ((window.outerHeight - 90) || (window.innerHeight - 90)) + 'px'
    }
  }
</script>
