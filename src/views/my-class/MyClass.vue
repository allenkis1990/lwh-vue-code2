<template>
  <div class="container">
    <div class="container" v-if="needCompleteOrderList.length > 0">
      <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
        <div class="weui-mask"></div>
        <div class="weui-dialog weui-dialog-1">
          <div class="dialog-pic"><img src="../../../design/images/distribution-img.png" alt=""></div>
          <div class="weui-dialog__bd">亲，您存在<span class="cr"> {{needCompleteOrderList.length}}个 </span>订单需要完善配送信息，以便发票/证书的配送！
          </div>
          <div class="weui-dialog__ft">
            <div @click="gotoCompleteOrder()" class="weui-dialog__btn weui-dialog__btn_primary">前往完善</div>
          </div>
        </div>
      </div>
    </div>
    <div class="hb-header-box">
      <div class="header-left" @click="drawerVisibilityEvent">
        <a href="javascript:void(0);" class="hb-ico ico-menu"></a>
      </div>
      <div class="header-tit">我的班级</div>
    </div>
    <!--年度选择-->
    <!--/年度选择-->
    <div class="hb-year-box">
      <div class="year-tit">年度</div>
      <scroller class="year-bd" lock-y scrollbar-x :bounce=false :scrollbar-x=false>
        <tab :style="tabStyle" bar-active-color="#668599" :line-width="2" :custom-bar-width="getBarWidth">
          <tab-item v-for="(item,index) in yearList" :key="index" :selected="index === 0"
                    @click.native="tabItemEvent(item)">
            {{item.skuPropertyValueName}}
          </tab-item>
        </tab>
      </scroller>
    </div>
    <!--/年度选择-->
    <!--班级列表-->
    <scroller
      style="padding-top: 87px; box-sizing: border-box;"
      :height="scrollerHeight"
      lock-x
      scrollbar-y
      use-pulldown
      @on-pulldown-loading="refreshData" v-model="scroller" ref="scroller">
      <div class="weui-panel weui-panel_access hb-panel-3">
        <no-data v-if="!classList.length"></no-data>
        <div class="weui-panel__bd" v-for="(item,index) in classList" :key="index" @click="goClassDetail(item)">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
            <div class="weui-media-box__hd">
              <img class="weui-media-box__thumb" :src="iamgeUrl(item)">
              <span class="label">{{classState}}</span>
            </div>
            <div class="weui-media-box__bd">
              <h4 class="weui-media-box__title">{{item.trainingClassName}}</h4>
              <p class="weui-media-box__desc">年度：{{skuPropertyValue(item, '培训年度')}}年</p>
              <p class="weui-media-box__desc">
                类别：{{skuPropertyValue(item, '培训类别')}}</p>
              <p class="weui-media-box__desc">学时：{{item.period}}</p>
            </div>
          </a>
        </div>
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
    </scroller>
    <!--/班级列表-->

    <!--返回顶部-->
    <a href="javascript:void(0);" class="hb-go-top" @click="goTopEvent">
      <img src="../../../design/images/icon-top.png">
    </a>
    <!--/返回顶部-->
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

</style>

<script>
  import { Tab, TabItem, Scroller, Spinner, LoadMore, InlineLoading } from 'vux'
  import NoData from '../../components/NoData.vue'
  import * as storeTypes from '../../store/types'

  export default {
    components: {
      Tab,
      TabItem,
      Scroller,
      Spinner,
      LoadMore,
      InlineLoading,
      NoData
    },
    mounted () {
      this.$store.dispatch(storeTypes.ORDER_GET_NEED_COMPLETE_ORDER_LIST).then(data => {
        if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
          if (data.data.orderList.length > 0) {
            for (var i = 0; i < data.data.orderList.length; i++) {
              this.needCompleteOrderList.push(data.data.orderList[i].orderNumber)
            }
          }
        } else {
          this.toast(data.head.message)
        }
      })
      this.scrollerHeight = (window.outerHeight || window.innerHeight) + 'px'
      this.requestYear()
    },
    data () {
      return {
        needCompleteOrderList: [],
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        scorllerStatus: 0,
        tabItem: {
          height: 40,
          width: 80,
          barWidth: 20
        },
        noMore: false
      }
    },
    computed: {
      /**
       * 年度tab的样式
       * @returns {{width: string, height: string, disabled: string}}
       */
      tabStyle () {
        return {
          width: this.yearList.length * this.tabItem.width + 'px',
          height: this.tabItem.height + 'px',
          disabled: '#FFFFFF'
        }
      },
      /**
       * 年份数据
       * @returns {*}
       */
      yearList () {
        if (this.$store.state.classModule.yearList === undefined || this.$store.state.classModule.yearList === '') {
          return []
        }
        return this.$store.state.classModule.yearList
      },
      /**
       * 班级数据
       * @returns {*}
       */
      classList () {
        let classList = this.$store.state.classModule.myTrainingList
        if (classList === undefined || classList === null) {
          return []
        }
        return classList
      },
      classState (trainingItemStatus) {
        if (trainingItemStatus === 0) {
          return ''
        } else if (trainingItemStatus === 1) {
          return '退班中'
        } else if (trainingItemStatus === 2) {
          return '失效'
        }
      }
    },
    methods: {
      gotoCompleteOrder () {
        this.$store.commit(storeTypes.COMPLETE_ORDER_NEED_INVOICE, false)
        this.push({ path: '/completeOrder', query: { path: '/demo/myClass', orderList: this.needCompleteOrderList } })
      },
      /**
       * 请求年份列表
       */
      requestYear () {
        if (this.yearList.length === 0) this.showLoading('加载中.....')
        this.$store.dispatch(storeTypes.CLASS_YEARS_REQUEST).then(data => {
          this.hideLoading()
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
            this.requestClassList(this.$store.state.classModule.yearList[0])
            return
          }
        }).catch(e => {
          console.log('error>>>>>>>' + e)
        })
      },
      /**
       * 请求班级列表
       */
      requestClassList (params) {
        if (this.scorllerStatus === 0) {
          if (this.classList.length === 0) this.showLoading('加载中.....')
        }
        this.$store.dispatch(storeTypes.CLASS_MYLIST_REQUEST, params).then(data => {
          this.loadingUIState()
          if (this.$refs.scroller !== undefined) this.$refs.scroller.reset({ top: 0 })
          if (data.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(data.head.message)
          }
        }).catch(e => {
          if (this.$refs.scroller !== undefined) this.$refs.scroller.reset({ top: 0 })
          this.loadingUIState()
          console.log('error>>>>>>>' + e)
        })
      },
      /**
       * 上拉刷新
       */
      refreshData () {
        let params = {
          skuPropertyName: '培训年度',
          skuPropertyValueId: this.$store.state.classModule.skuPropertySearch.skuPropertyValueId
        }
        this.scorllerStatus = 1
        this.requestClassList(params)
      },
      /**
       * 加载视图层
       */
      loadingUIState () {
        if (this.scorllerStatus === 1) {
          if (this.$refs.scroller !== undefined) {
            this.$refs.scroller.donePulldown()
            this.scroller.pulldownStatus = 'default'
            this.scorllerStatus = 0
            return
          }
        }
        this.hideLoading()
      },
      /**
       * 年度tab的宽度
       * @returns {string}
       */
      getBarWidth () {
        return this.tabItem.barWidth + 'px'
      },
      /**
       * 是否显示菜单 点击事件
       */
      drawerVisibilityEvent () {
        this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, true)
      },
      /**
       * 年度tab   点击事件
       * @param item
       */
      tabItemEvent (item) {
        this.$store.commit(storeTypes.CLASS_LIST_SEARCH_PROPERTY, item)
        this.requestClassList(item)
      },
      /**
       * 滚动顶部  点击事件
       */
      goTopEvent () {
        this.$refs.scroller.reset({ top: 0 })
      },
      /**
       * 班级列表的item  点击事件
       */
      goClassDetail (item) {
        this.$router.push({
          path: '/myClassDetail',
          query: { yearObject: this.skuPropertyObeject(item, '培训年度'), trainingClassId: item.trainingClassId }
        })
      },
      iamgeUrl (item) {
        if (item.photoPath === undefined) {
          return require('../../../design/images/course-img.jpg')
        }
        return item.photoPath
      },
      skuPropertyValue (item, property) {
        let skuPropertyObeject = this.skuPropertyObeject(item, property)
        if (skuPropertyObeject !== undefined && skuPropertyObeject !== null) {
          return skuPropertyObeject.skuPropertyValueName
        }
        return ''
      },
      skuPropertyValueCOpy (item, property) {
        let skuPropertyObeject = this.skuPropertyObeject(item, property)
        if (skuPropertyObeject !== undefined && skuPropertyObeject !== null && skuPropertyObeject.skuPropertyValueName !== '') {
          return '/' + skuPropertyObeject.skuPropertyValueName
        }
        return ''
      },
      skuPropertyObeject (item, property) {
        let skuPropertyNameList = item.skuPropertyNameList
        if (skuPropertyNameList === undefined || skuPropertyNameList === null) {
          return ''
        }
        for (let i = 0; i < skuPropertyNameList.length; i++) {
          if (skuPropertyNameList[i].skuPropertyName === property) {
            return skuPropertyNameList[i]
          }
        }
        return ''
      },
      getQueryString (name, url) {
        let value = ''
        let key = ''
        let str = url
        let num = str.indexOf('?')
        str = str.substr(num + 1) // 取得所有参数   stringvar.substr(start [, length ]
        let arr = str.split('&') // 各个参数放到数组里
        for (let i = 0; i < arr.length; i++) {
          num = arr[i].indexOf('=')
          if (num > 0) {
            key = arr[i].substring(0, num)
            if (key === name) {
              value = arr[i].substr(num + 1)
            }
          }
        }
        return value
      }
    }
  }
</script>
