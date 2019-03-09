<template>
  <div class="contain">
    <div class="hb-header-box">
      <div class="header-left" @click="drawerVisibilityEvent"><a class="hb-ico ico-menu"></a></div>
      <div class="header-tit" style="width: 70%">
        {{this.currentOrgan.unitName}}
      </div>
      <!--<div class="header-right"><a class="header-txt">登录/注册</a></div>-->
    </div>
    <div class="hb-tab-tit">
      <div class="tab-tit-items"
           @click="clickTab(item)"
           :class="{'current':item.type===tabType}"
           v-for="(item,index) in tabList"><span class="items-name">{{item.name}}</span>
        <img class="current-img" src="../../../design/images/tab-current-bg.jpg"/>
      </div>
    </div>
    <!--<sku-search v-show="tabType==='TRAINING_CLASS_GOODS'"
                ref="TRAINING_CLASS_GOODS"
                :currentOrgan="currentOrgan"
                @on-childTempOrganChange="childTempOrganChange"
                @on-currentOrganChange="currentOrganChange"
                @findClassList="findTrainClassList"
                category-type="TRAINING_CLASS_GOODS"
                classType="1"></sku-search>
    <sku-search v-show="tabType==='TRAINING_LINEOFF_CLASS'"
                ref="TRAINING_LINEOFF_CLASS"
                :currentOrgan="currentOrgan"
                @on-childTempOrganChange="childTempOrganChange"
                @on-currentOrganChange="currentOrganChange"
                @findClassList="findLineOffClassList"
                category-type="TRAINING_LINEOFF_CLASS"
                classType="2"></sku-search>-->
    <sku-search v-show="tabType==='COURSE_SUPERMARKET_GOODS'"
                ref="COURSE_SUPERMARKET_GOODS"
                :currentOrgan="currentOrgan"
                @on-childTempOrganChange="childTempOrganChange"
                @on-currentOrganChange="currentOrganChange"
                @findClassList="findSelfPickClassList"
                category-type="COURSE_SUPERMARKET_GOODS"
                classType="1"></sku-search>

    <scroller
      style="box-sizing: border-box;"
      :height="scrollerHeight"
      lock-x
      scrollbar-y
      use-pulldown
      use-pullup
      @on-pullup-loading="loadMoreFn"
      @on-pulldown-loading="refreshData"
      v-model="scroller" ref="scroller">
      <div class="hb-wrap-box pb100">
        <div class="hb-panel" v-show="tabType==='TRAINING_CLASS_GOODS'">
          <no-data v-if="!trainClassList.length"></no-data>
          <div class="hb-panel-bd" v-if="trainClassList.length">
            <div class="hb-media-box"
                 @click="goClassDetail(item)"
                 v-for="(item,index) in trainClassList">
              <div class="hb-media-box-hd"><img :src="iamgeUrl(item)" class="hb-media-box-thumb">
                <div class="label" v-if="item.hasBuy">已报名</div>
              </div>
              <div class="hb-media-box-bd">
                <div class="hb-media-box-title">{{item.skuName}}</div>
                <div class="hb-media-box-desc">年度：{{getSkuValueName(item.skuPropertyNameList,'年度')}}年</div>
                <div class="hb-media-box-desc">科目：{{getSkuValueName(item.skuPropertyNameList,'科目')}}</div>
                <div class="hb-media-box-desc">学时：{{item.trainingPeriod}}</div>
              </div>
              <div class="price">
                <div class="now-price">￥<span class="num">{{item.originalPrice}}</span></div>
              </div>
            </div>
          </div>
          <div class="loading-tips" v-if="trainClassTotalSize<trainClassPager.pageSize"><span class="line"></span><span
            class="txt">已经到最底部啦</span><span class="line"></span>
          </div>
          <div class="loading-tips"
               v-if="((tabType==='TRAINING_CLASS_GOODS'&&trainClassTotalSize>=trainClassPager.pageSize)||(tabType==='COURSE_SUPERMARKET_GOODS'&&selfPickTotalSize>=selfPickPager.pageSize)|| (tabType === 'TRAINING_LINEOFF_CLASS' && trainLineOffClassTotalSize >= trainLineOffClassPager.pageSize)) && scroller.pullupStatus === 'default'">
            <span class="line"></span><span class="txt">上拉加载更多</span><span class="line"></span>
          </div>
        </div>

        <div class="hb-panel" v-show="tabType==='COURSE_SUPERMARKET_GOODS'">
          <no-data v-if="!selfClassList.length"></no-data>
          <div class="hb-panel-bd" v-if="selfClassList.length">
            <div class="hb-media-box"
                 @click="goClassDetail(item)"
                 v-for="(item,index) in selfClassList">
              <div class="hb-media-box-hd"><img :src="iamgeUrl(item)" class="hb-media-box-thumb">
                <div class="label" v-if="item.hasBuy">已报名</div>
              </div>
              <div class="hb-media-box-bd">
                <div class="hb-media-box-title">{{item.skuName}}</div>
                <div class="hb-media-box-desc"
                     v-if="getSkuValueName(item.skuPropertyNameList,'年度')">
                  年度：{{getSkuValueName(item.skuPropertyNameList,'年度')}}年
                </div>
                <div class="hb-media-box-desc">科目：{{getSkuValueName(item.skuPropertyNameList,'科目')}}</div>
                <div class="hb-media-box-desc">学时：{{item.trainingPeriod}}</div>
              </div>
              <div class="price">
                <div class="now-price">￥<span class="num">{{item.originalPrice}}</span></div>
              </div>
            </div>
          </div>
          <div class="loading-tips" v-if="selfPickTotalSize<selfPickPager.pageSize"><span class="line"></span><span
            class="txt">已经到最底部啦</span><span class="line"></span>
          </div>
          <div class="loading-tips"
               v-if="((tabType==='TRAINING_CLASS_GOODS'&&trainClassTotalSize>=trainClassPager.pageSize)||(tabType==='COURSE_SUPERMARKET_GOODS'&&selfPickTotalSize>=selfPickPager.pageSize)|| (tabType === 'TRAINING_LINEOFF_CLASS' && trainLineOffClassTotalSize >= trainLineOffClassPager.pageSize)) && scroller.pullupStatus === 'default'">
            <span class="line"></span><span class="txt">上拉加载更多</span><span class="line"></span>
          </div>
        </div>
        <div class="hb-panel" v-show="tabType==='TRAINING_LINEOFF_CLASS'">
          <no-data v-if="!trainLineOffClassList.length"></no-data>
          <div class="hb-panel-bd" v-if="trainLineOffClassList.length">
            <div class="hb-media-box"
                 @click="goClassDetail(item)"
                 v-for="(item,index) in trainLineOffClassList">
              <div class="hb-media-box-hd"><img :src="iamgeUrl(item)" class="hb-media-box-thumb">
                <div class="label" v-if="item.hasBuy">已报名</div>
              </div>
              <div class="hb-media-box-bd">
                <div class="hb-media-box-title">{{item.skuName}}</div>
                <div class="hb-media-box-desc">年度：{{getSkuValueName(item.skuPropertyNameList,'年度')}}年</div>
                <div class="hb-media-box-desc">科目：{{getSkuValueName(item.skuPropertyNameList,'科目')}}</div>
                <div class="hb-media-box-desc">学时：{{item.trainingPeriod}}</div>
              </div>
              <div class="price">
                <div class="now-price">￥<span class="num">{{item.originalPrice}}</span></div>
              </div>
            </div>
          </div>
          <div class="loading-tips" v-if="trainLineOffClassTotalSize < trainLineOffClassPager.pageSize"><span
            class="line"></span><span class="txt">已经到最底部啦</span><span class="line"></span>
          </div>
          <div class="loading-tips"
               v-if="((tabType==='TRAINING_CLASS_GOODS' && trainClassTotalSize >= trainClassPager.pageSize) || (tabType==='COURSE_SUPERMARKET_GOODS' && selfPickTotalSize >= selfPickPager.pageSize) || (tabType === 'TRAINING_LINEOFF_CLASS' && trainLineOffClassTotalSize >= trainLineOffClassPager.pageSize)) && scroller.pullupStatus === 'default'">
            <span class="line"></span><span class="txt">上拉加载更多</span><span class="line"></span>
          </div>
        </div>
      </div>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down"
           style="position: absolute; width: 100%; height: 40px; line-height: 40px; top: 90px; text-align: center;">
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
           style="position: absolute; width: 100%; height: 40px; bottom: 10px; text-align: center;">
        <!--<load-more :show-loading="false" v-show="((tabType==='TRAINING_CLASS_GOODS'&&trainClassTotalSize>0)||(tabType==='COURSE_SUPERMARKET_GOODS'&&selfPickTotalSize)) && scroller.pullupStatus === 'default'" :tip="'上拉加载更多'"
                   background-color="#F4F4F4"></load-more>-->
        <span class="pullup-arrow"
              v-show="(scroller.pullupStatus === 'up'||scroller.pullupStatus === 'down') && !noMore"
              :class="{'rotate':scroller.pullupStatus === 'down'}"
              style="font-size: 16px;font-weight: bold;">↑</span>
        <div v-show="scroller.pullupStatus === 'loading'">
          <p class="inloading">
            <inline-loading></inline-loading>
            <span class="il-text">
      加载中...
      </span>
          </p>
        </div>
      </div>
    </scroller>
    <div class="layer-box" @click="goTopEvent">
      <div class="a-items"><img
        src="../../../design/images/icon-top.png"
        alt=" " class="img"></div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

</style>

<script>
  import { Scroller, InlineLoading } from 'vux'
  import NoData from '../../components/NoData.vue'
  import * as storeTypes from '../../store/types'
  import skuSearch from '@/views/home/skuSearchComponent/skuSearchComponent.vue'
  import utils from '@/common/util/Utils'
  import constant from '@/global/constants/AppConstant'

  export default {
    components: {
      Scroller,
      InlineLoading,
      NoData,
      skuSearch
    },
    data () {
      return {
        oldOrgan: {},
        currentOrgan: {
          unitId: this.$store.getters.userInfo.registerOrgId,
          unitName: this.$store.getters.userInfo.registerOrgName,
          domain: this.$store.getters.userInfo.domain
        }, // 当前机构
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
//      0加载 1下拉加载 2加载更多
        scorllerStatus: 0,
        noMore: false,
        orderNo: '',
        tabList: [
//          {name: '网授班', type: 'TRAINING_CLASS_GOODS'},
          { name: '自主选课', type: 'COURSE_SUPERMARKET_GOODS' }
//          {name: '面授班', type: 'TRAINING_LINEOFF_CLASS'}
        ],
        tabType: 'COURSE_SUPERMARKET_GOODS', // 默认培训班tab
        trainClassList: [],
        selfClassList: [],
        trainLineOffClassList: [],
        loadMore: false,
        trainClassPager: { pageNo: 1, pageSize: 10 },
        selfPickPager: { pageNo: 1, pageSize: 10 },
        trainLineOffClassPager: { pageNo: 1, pageSize: 10 },
        trainClassTotalSize: 0,
        selfPickTotalSize: 0,
        trainLineOffClassTotalSize: 0,
        loadMoreTrggierTime: null
      }
    },
    created () {
      if (this.$route.query.unitId) {
        this.currentOrgan = {
          unitId: this.$route.query.unitId,
          unitName: this.$route.query.unitName,
          domain: this.$route.query.domain
        }
      }
//      this.setHeaderDomain(this.currentOrgan.domain)
    },
    mounted () {
      this.scrollerHeight = (window.outerHeight || window.innerHeight) + 'px'
    },
    methods: {
      /**
       * 判断是否短时间内触发两次加载更多
       */
      judgeLoadMoreTriggerToShort () {
        if (this.loadMoreTrggierTime) {
          if (new Date().getTime() - this.loadMoreTrggierTime < 200) {
            console.log(new Date().getTime() - this.loadMoreTrggierTime, 'todo 时间差太小了不运行')
            this.loadingUIState()
            return true
          } else {
            this.loadMoreTrggierTime = new Date().getTime()
            return false
          }
        } else {
          this.loadMoreTrggierTime = new Date().getTime()
          return false
        }
      },
      currentOrganChange (organ) {
        this.oldOrgan = JSON.parse(JSON.stringify(this.currentOrgan))
        this.currentOrgan = organ
      },
      childTempOrganChange (el, organ) {
        this.$refs[el].tempOrganChange(organ)
      },
      drawerVisibilityEvent () {
        this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, true)
      },
      initPager: function () {
        this.trainClassPager = { pageNo: 1, pageSize: 10 }
        this.selfPickPager = { pageNo: 1, pageSize: 10 }
        this.trainLineOffClassPager = { pageNo: 1, pageSize: 10 }
      },
      getSkuValueName: function (skuArr, skuName) {
        if (!skuArr) {
          return ''
        }
        var str = ''
        skuArr.forEach(function (item) {
          if (item.skuPropertyName === skuName) {
            str = item.skuPropertyValueName
          }
        })
        return str
      },
      loadMoreFn: function () {
        if (this.judgeLoadMoreTriggerToShort()) {
          return false
        }
        var that = this
        this.scorllerStatus = 2
        var params = null
        if (this.tabType === 'TRAINING_CLASS_GOODS') {
          if (this.trainClassTotalSize < this.trainClassPager.pageSize) {
            console.log('没有更多了')
            this.loadingUIState()
            return false
          }
          this.trainClassPager.pageNo++
          params = {
            pageNo: that.trainClassPager.pageNo,
            pageSize: that.trainClassPager.pageSize,
            skuPropertySearchList: that.$refs.TRAINING_CLASS_GOODS.skuPropertySearchList,
            trainingClassType: '1'
          }
          this.$refs.TRAINING_CLASS_GOODS.refreshClassList(params, constant.apiUrl.classListModule.trainClass)
        } else if (this.tabType === 'COURSE_SUPERMARKET_GOODS') {
          if (this.selfPickTotalSize < this.selfPickPager.pageSize) {
            console.log('没有更多了')
            this.loadingUIState()
            return false
          }
          this.selfPickPager.pageNo++
          params = {
            pageNo: that.selfPickPager.pageNo,
            pageSize: that.selfPickPager.pageNo,
            skuPropertySearchList: that.$refs.COURSE_SUPERMARKET_GOODS.skuPropertySearchList,
            trainingClassType: '1'
          }
          this.$refs.COURSE_SUPERMARKET_GOODS.refreshClassList(params, constant.apiUrl.classListModule.self)
        } else {
          if (this.trainLineOffClassTotalSize < this.trainLineOffClassPager.pageSize) {
            console.log('没有更多了')
            this.loadingUIState()
            return false
          }
          this.trainLineOffClassPager.pageNo++
          params = {
            pageNo: that.trainLineOffClassPager.pageNo,
            pageSize: that.trainLineOffClassPager.pageNo,
            skuPropertySearchList: that.$refs.TRAINING_LINEOFF_CLASS.skuPropertySearchList,
            trainingClassType: '2'
          }
          this.$refs.TRAINING_LINEOFF_CLASS.refreshClassList(params, constant.apiUrl.classListModule.trainClass)
        }
        console.log('我已经到底部')
      },
      findTrainClassList: function (params, url) {
        var type = 'post'
        console.log(params, url, '培训班')
        if (this.scorllerStatus === 0) {
          this.$vux.loading.show({
            text: '加载中'
          })
        }
        utils.getAjaxData(type, params, url).then(res => {
          this.loadingUIState()
          if (this.$refs.scroller !== undefined && this.scorllerStatus !== 2) this.$refs.scroller.reset({ top: 0 })
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(res.head.message)
          } else {
            console.log(res.data, '培训班列表')
            this.trainClassTotalSize = res.data.commodityList.length
//            2是加载更多
            if (this.scorllerStatus === 2) {
              this.trainClassList = this.trainClassList.concat(res.data.commodityList)
              this.scorllerStatus = 0
            } else {
              this.trainClassList = res.data.commodityList
              this.initPager()
            }
          }
        }).catch(e => {
          this.loadingUIState()
          console.log(e)
        })
      },
      findSelfPickClassList: function (params, url) {
        var type = 'post'
        console.log(params, url, '自主选课')
        if (this.scorllerStatus === 0) {
          this.$vux.loading.show({
            text: '加载中'
          })
        }
        utils.getAjaxData(type, params, url).then(res => {
          this.loadingUIState()
          if (this.$refs.scroller !== undefined && this.scorllerStatus !== 2) this.$refs.scroller.reset({ top: 0 })
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(res.head.message)
          } else {
            console.log(res.data, '自主选课列表')
            this.selfPickTotalSize = res.data.commodityList.length
//            2是加载更多
            if (this.scorllerStatus === 2) {
              this.selfClassList = this.selfClassList.concat(res.data.commodityList)
              this.scorllerStatus = 0
            } else {
              this.selfClassList = res.data.commodityList
              this.initPager()
            }
          }
        }).catch(e => {
          this.loadingUIState()
          console.log(e)
        })
      },
      // 获取面授班列表
      findLineOffClassList (params, url) {
        var type = 'post'
        console.log(params, url, '面授班')
        if (this.scorllerStatus === 0) {
          this.$vux.loading.show({
            text: '加载中'
          })
        }
        utils.getAjaxData(type, params, url).then(res => {
          this.loadingUIState()
          if (this.$refs.scroller !== undefined && this.scorllerStatus !== 2) this.$refs.scroller.reset({ top: 0 })
          if (res.head.code !== storeTypes.NETWORK_RESULT_SUCCESS) {
            return this.toast(res.head.message)
          } else {
            console.log(res.data, '面授班列表')
            this.trainLineOffClassTotalSize = res.data.commodityList.length
//            2是加载更多
            if (this.scorllerStatus === 2) {
              this.trainLineOffClassList = this.trainLineOffClassList.concat(res.data.commodityList)
              this.scorllerStatus = 0
            } else {
              this.trainLineOffClassList = res.data.commodityList
              this.initPager()
            }
          }
        }).catch(e => {
          this.loadingUIState()
          console.log(e)
        })
      },
      /**
       * 切换tab的时候根据当前tab所选的机构刷新另一个tab的列表
       */
      clickTab: function (item) {
        if (this.tabType === item.type) {
          return false
        }
        if (this.$refs.scroller !== undefined) this.$refs.scroller.reset({ top: 0 })
        this.tabType = item.type
        // 点击tab的时候，根据当前机构动态初始化sku值
        if (this.oldOrgan.domain && this.oldOrgan.domain !== this.currentOrgan.domain) {
          this.oldOrgan = JSON.parse(JSON.stringify(this.currentOrgan))
          this.$nextTick(() => {
            if (item.type === 'TRAINING_CLASS_GOODS') {
              this.$refs.TRAINING_CLASS_GOODS.getSkuValue()
              this.$refs.TRAINING_LINEOFF_CLASS.getSkuValue()
            } else if (item.type === 'COURSE_SUPERMARKET_GOODS') {
              this.$refs.COURSE_SUPERMARKET_GOODS.getSkuValue()
              this.$refs.TRAINING_LINEOFF_CLASS.getSkuValue()
            } else {
              this.$refs.COURSE_SUPERMARKET_GOODS.getSkuValue()
              this.$refs.TRAINING_CLASS_GOODS.getSkuValue()
            }
            this.refreshData()
          })
        }
      },
      loadingUIState () {
        if (this.scorllerStatus === 1) {
          if (this.$refs.scroller !== undefined) {
            this.$refs.scroller.donePulldown()
            this.scroller.pulldownStatus = 'default'
            this.scorllerStatus = 0
            return
          }
        }
        if (this.scorllerStatus === 2) {
          if (this.$refs.scroller !== undefined) {
            this.$refs.scroller.donePullup()
            this.scroller.pullupStatus = 'default'
            return
          }
        }
        this.$vux.loading.hide()
      },
      /**
       * 上拉刷新
       */
      refreshData () {
        console.log(this.scroller)
        console.log('下拉刷新！！！')
        this.scorllerStatus = 1
        var that = this
        var TRAINING_CLASS_GOODS_PARAMS = {
          pageNo: 1,
          pageSize: 10,
          trainingClassType: '1',
          skuPropertySearchList: that.$refs.TRAINING_CLASS_GOODS.skuPropertySearchList
        }
        var COURSE_SUPERMARKET_GOODS_PARAMS = {
          pageNo: 1,
          pageSize: 10,
          skuPropertySearchList: that.$refs.COURSE_SUPERMARKET_GOODS.skuPropertySearchList
        }
        var TRAINING_LINEOFF_CLASS_PARAMS = {
          pageNo: 1,
          pageSize: 10,
          trainingClassType: '2',
          skuPropertySearchList: that.$refs.TRAINING_LINEOFF_CLASS.skuPropertySearchList
        }
//       下拉刷新自主选课列表 培训班列表
        this.$refs.TRAINING_CLASS_GOODS.refreshClassList(TRAINING_CLASS_GOODS_PARAMS, constant.apiUrl.classListModule.trainClass)
        this.$refs.COURSE_SUPERMARKET_GOODS.refreshClassList(COURSE_SUPERMARKET_GOODS_PARAMS, constant.apiUrl.classListModule.self)
        that.$refs.TRAINING_LINEOFF_CLASS.refreshClassList(TRAINING_LINEOFF_CLASS_PARAMS, constant.apiUrl.classListModule.trainClass)
//        console.log(this.$refs.TRAINING_CLASS_GOODS.skuPropertySearchList)
//        console.log(this.$refs.COURSE_SUPERMARKET_GOODS.skuPropertySearchList)
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
        let trainingItem = {
          skuId: item.skuId,
          schemeId: item.schemeId
        }
        if (item.categoryType === 'COURSE_SUPERMARKET_GOODS') {
          trainingItem.courseId = item.courseId
          trainingItem.coursePackageId = item.coursePackageId
        }
        this.$store.dispatch(storeTypes.CLASS_DETAIL_TRAINING_ITEM, trainingItem)
        this.$router.push({
          path: '/classDetail',
          query: {
            categoryType: item.categoryType,
            classType: this.tabType
          }
        })
      },
      iamgeUrl (item) {
        if (item.photoPath === undefined) {
          return require('../../../design/images/course-img.jpg')
        }
        return item.photoPath
      }
    },
    activated () {
      // 从购物车过来的请求刷新页面
      let isFromShopCart = this.$store.state.classModule.isFromShopCart
      if (this.$route.query.unitId && isFromShopCart) {
        this.currentOrgan = {
          unitId: this.$route.query.unitId,
          unitName: this.$route.query.unitName,
          domain: this.$route.query.domain
        }
//        this.setHeaderDomain(this.currentOrgan.domain)
        this.$refs.TRAINING_CLASS_GOODS.getSkuValue()
        this.$refs.COURSE_SUPERMARKET_GOODS.getSkuValue()
        this.$refs.TRAINING_CLASS_GOODS.tempOrganChange(this.currentOrgan)
        this.$refs.COURSE_SUPERMARKET_GOODS.tempOrganChange(this.currentOrgan)
        this.$refs.COURSE_SUPERMARKET_GOODS.yearHided = false
        this.refreshData()
        this.$store.commit(storeTypes.SET_IS_FROM_SHOPCART, false)
      }
    }
    // beforeRouteLeave (to, from, next) {
    //   if (to.name !== 'classDetail') {
    //     from.meta.keepAlive = false
    //     this.$destroy()
    //   } else {
    //     if (!from.meta.keepAlive) {
    //       from.meta.keepAlive = true
    //     }
    //   }
    //   next()
    // }
  }
</script>
