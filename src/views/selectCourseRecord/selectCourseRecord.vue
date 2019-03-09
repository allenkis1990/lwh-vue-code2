<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit2">选课记录</div>
      <div class="header-right2">
        <a href="javascript:void(0)"
           @click="openChangeCourse()">换课记录</a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-wrap-box hb-wrap-box-5">
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

        <div>
          <no-data v-if="!selectRecordList.length"></no-data>
          <div v-if="selectRecordList.length">
            <div class="weui-panel hb-panel" v-for="(item,index) in selectRecordList">
              <div class="order-info-box">
                <div class="order-date">
                  <img src="../../../design/images/icon-ordernum.png" />
                  <div class="text">{{item.orderNo}}</div>
                </div>
                <div class="order-date-r">{{item.createTime}}</div>
              </div>
              <!--<div class="order-info-box">
                <div class="order-date">
                  <img src="../../../design/images/icon-date.png"/>
                  <div class="text">{{item.createTime}}</div>
                </div>
              </div>-->
              <div class="hb-media-box hb-media-box-1"
                   v-if="subIndex<2 || item.showMore"
                   v-for="(subItem,subIndex) in item.courseInfoDtoList">
                <div class="hb-media-box-hd">
                  <img class="hb-media-box-thumb" :src="imageUrl(subItem)"/>
                  <div class="order-status order-status-2" v-show="orderStatusUrl(subItem,item).length">
                    <!--<img class="order-status-img" src="../../../design/images/icon-change-st1.png">-->
                    <img class="order-status-img" :src="orderStatusUrl(subItem,item)">
                  </div>
                </div>
                <div class="hb-media-box-bd">
                  <div class="hb-media-box-title">{{subItem.courseName}}</div>
                  <div class="hb-media-box-desc">年度：{{getSkuValueName(subItem.skuPropertyNameList,
                    'trainingYear')}}年<span
                      class="ml20">科目：{{getSkuValueName(subItem.skuPropertyNameList, 'trainingSubject')}}</span></div>
                  <div class="hb-media-box-desc">专业技术资格等级：{{getSkuValueName(subItem.skuPropertyNameList,
                    'professionalGrade')}}
                  </div>
                  <div class="hb-media-box-desc">学分：{{subItem.period}}</div>
                </div>
              </div>
              <div class="weui-cells"
                   @click="item.showMore=!item.showMore"
                   v-if="item.courseInfoDtoList.length>2">
                <div class="weui-cell weui-cell_access">
                  <div class="weui-cell__bd"></div>
                  <div class="weui-cell__ft" v-if="!item.showMore">共{{item.courseInfoDtoList.length}}个培训内容，点击查看更多</div>
                  <div class="weui-cell__ft" v-if="item.showMore">收起</div>
                </div>
              </div>
              <div class="order-info-box">
                <!--<div class="ci">选课失败</div>-->
                <div v-if="item.status===1">选课成功</div>
                <div class="ci" v-if="item.status===2">选课失败</div>
                <div class="ci" v-if="item.status===3">选课异常,请电话客服反馈</div>
                <div>使用学分数：<span class="ml10 ci fs32">{{item.status !== 2 ? item.totalAmount : '-'}}</span></div>
              </div>
            </div>
          </div>
          <div class="loading-tips" v-if="totalSize<pager.pageSize"><span class="line"></span><span
            class="txt">已经到最底部啦</span><span class="line"></span>
          </div>
          <div class="loading-tips" v-if="totalSize>=pager.pageSize && scroller.pullupStatus === 'default'"><span
            class="line"></span><span class="txt">上拉加载更多</span><span class="line"></span></div>
        </div>
        <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down"
             style="position: absolute; width: 100%; height: 40px; line-height: 40px; text-align: center;top:-40px;">
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
    </div>
    <course-selection-train-dialog :show="showGoStudyDialog" @hide="closeChangeCourse"></course-selection-train-dialog>
  </div>
</template>
<script>
  import * as storeTypes from '@/store/types'
  import utils from '@/common/util/Utils'
  import { Scroller, InlineLoading } from 'vux'
  import NoData from '@/components/NoData.vue'
  import courseSelectionTrainDialog from '../selectCourseRecord/courseSelectionTrainDialog'

  export default {
    data () {
      return {
        showGoStudyDialog: false,
        selectRecordList: [],
        pager: {
          pageNo: 1,
          pageSize: 5
        },
        totalSize: 0,
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
//      0加载 1下拉加载 2加载更多
        scorllerStatus: 0,
        loadMoreTrggierTime: null,
        noMore: false
      }
    },
    mounted () {
      this.setScrollerHeight()
      this.getSelectCourseRecord()
    },
    computed: {},
    components: {
      Scroller,
      InlineLoading,
      NoData,
      courseSelectionTrainDialog
    },
    methods: {
      openChangeCourse () {
        this.showGoStudyDialog = true;
      },
      closeChangeCourse () {
        this.showGoStudyDialog = false;
      },
      imageUrl (item) {
        if (!item.photoPath) {
          return require('../../../design/images/course-img.jpg')
        }
        return item.photoPath
      },
      orderStatusUrl (subItem,item) {
        debugger
        if (item.applyType === 2 && item.status === 4) {
          return require('../../../design/images/icon-change-st1.png')
        }
        if (subItem.subSwapStatus === 'SWAP_OUT') {
          return require('../../../design/images/icon-change-st2.png')
        }
        return ''
      },
      getSelectCourseRecord () {
        let _this = this
        var params = {
          pageNo: _this.pager.pageNo,
          pageSize: _this.pager.pageSize
        }
        if (this.scorllerStatus === 0) {
          this.$vux.loading.show({
            text: '加载中'
          })
        }
        this.$store.dispatch(storeTypes.SELECT_COURSE_RECORD, params).then((data) => {
          this.loadingUIState()
          if (this.$refs.scroller !== undefined && this.scorllerStatus !== 2) {
            this.$refs.scroller.reset({ top: 0 })
          }
          if (data.head.code === storeTypes.NETWORK_RESULT_SUCCESS) {
//            2是加载更多
            this.totalSize = data.data.currentPageData.length
            if (this.scorllerStatus === 2) {
              this.selectRecordList = this.selectRecordList.concat(data.data.currentPageData)
              this.scorllerStatus = 0
            } else {
              this.selectRecordList = data.data.currentPageData
              this.selectRecordList.forEach((item) => {
                this.$set(item, 'showMore', false)
              })
              console.log(data.data.currentPageData, 'json!!')
            }
          } else {
            this.toast('请求失败')
          }
        })
      },
      getSkuValueName (arr, code) {
        return utils.getSkuValueName(arr, code)
      },
      initPager: function () {
        let _this = this
        this.pager = { pageNo: 1, pageSize: _this.pager.pageSize }
      },
      loadMoreFn: function () {
        if (this.judgeLoadMoreTriggerToShort()) {
          return false
        }
//        var that = this
        this.scorllerStatus = 2
        if (this.totalSize < this.pager.pageSize) {
          console.log('没有更多了')
          this.loadingUIState()
          return false
        }
        this.pager.pageNo++
        this.getSelectCourseRecord()
        console.log('我已经到底部')
      },
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
      refreshData () {
        console.log(this.scroller)
        console.log('下拉刷新！！！')
        this.initPager()
        this.scorllerStatus = 1
        this.getSelectCourseRecord()
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
      //      设置scroller高度
      setScrollerHeight () {
        let h1 = Number.parseInt(utils.selectClass('.hb-header-box').height)
        this.scrollerHeight = (window.outerHeight - h1 || window.innerHeight - h1) + 'px'
        console.log(this.scrollerHeight)
      }
    }
  }
</script>

