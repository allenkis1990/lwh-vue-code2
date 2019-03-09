<template>
  <div class="contain">
    <div class="notice-title t-tong" v-if="categoryType === 1">
      <div class="t t-tong"><img class="img" src="../../../design/images/icon-tong.png"/>培训通知</div>
      <div class="line"></div>
    </div>

    <div class="notice-title t-tong" v-else-if="categoryType === 2">
      <div class="t t-zheng"><img class="img" src="../../../design/images/icon-zheng.png"/>政策法规</div>
      <div class="line"></div>
    </div>
    <div class="notice-title t-tong" v-else-if="categoryType === 3">
      <div class="t t-xun"><img class="img" src="../../../design/images/icon-xun.png"/>业界资讯</div>
      <div class="line"></div>
    </div>
    <div class="notice-title t-tong" v-else>
      <div class="t t-wen"><img class="img" src="../../../design/images/icon-wen.png"/>常见问题</div>
      <div class="line"></div>
    </div>

    <!--列表-->
    <scroller class="notice" style="box-sizing: border-box;"
              :height="scrollerHeight"
              lock-x
              scrollbar-y
              use-pulldown
              use-pullup
              @on-pullup-loading="loadMoreFn"
              @on-pulldown-loading="refreshData"
              v-model="scroller" ref="scroller">
      <div>
        <div class="item" @click="toNoticeDetail(item.noticeId)" v-for="(item,index) in dataList">
          <div class="title">{{item.noticeTitle}}</div>
          <div style="max-height: 40px" class="desc">{{item.content}}</div>
          <div class="info">
            <div class="views">
              <div class="pic"><img src="../../../design/images/icon-views.png"></div>
              <div class="text">{{item.viewCount}}</div>
            </div>
            <div class="date">
              <div class="pic"><img src="../../../design/images/icon-date.png"></div>
              <div class="text">{{item.publicTime}}</div>
            </div>
          </div>
        </div>


        <!--<div class="loading-tips"><span class="line"></span><span class="txt">已经到最底部啦</span><span class="line"></span></div>-->

      </div>
      <!--下面为刷新加载的部分-->
      <div class="loading-tips" v-if="noMoreData"><span class="line"></span><span class="txt">已经到最底部啦</span><span
        class="line"></span>
      </div>
      <div class="loading-tips" v-if="!noMoreData && scroller.pullupStatus === 'default'"><span
        class="line"></span><span class="txt">上拉加载更多</span><span class="line"></span>
      </div>

      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down"
           style="position: absolute; width: 100%; height: 40px; line-height: 40px; top: -50px; text-align: center;">
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
        <!--<load-more :show-loading="false" v-show="((tabType==='TRAINING_CLASS_GOODS'&&trainClassTotalSize>0)||(tabType==='COURSE_SUPERMARKET_GOODS'&&selfPickTotalSize)) && scroller.pullupStatus === 'default'" :tip="'上拉加载更多'"
                   background-color="#F4F4F4"></load-more>-->
        <span class="pullup-arrow"
              v-show="(scroller.pullupStatus === 'up'||scroller.pullupStatus === 'down') && !noMoreData"
              :class="{'rotate':scroller.pullupStatus === 'down'}"
              style="font-size: 16px;font-weight: bold;">↑</span>
        <div v-show="scroller.pullupStatus === 'loading' && !noMoreData">
          <p class="inloading">
            <inline-loading></inline-loading>
            <span class="il-text">
      加载中...
      </span>
          </p>
        </div>
      </div>

    </scroller>
    <!--/班级列表-->
    <!--返回顶部-->
    <div class="layer-box" @click="gotoTop">
      <div class="a-items">
        <img class="img" src="../../../design/images/icon-top.png" alt=" "/>
      </div>
    </div>

  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

</style>
<script>
  import { Scroller, InlineLoading } from 'vux'
  import * as storeTypes from '../../store/types'
  import utils from '@/common/util/Utils'

  export default {
    components: {
      Scroller,
      InlineLoading
    },
    data () {

      return {
        //1 培训通知 2 政策法规 3 业界资讯 4 常见问题
        categoryType: 1,
        noMoreData: false,
        isLoading: false,
        dataList: [],
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        scrollerHeight: '',
        pageSize: 10,
        pageNo: 1
      }
    },
    watch: {
//      categoryType: { handler(newName, oldName) {
//        debugger
//        this.requestData(1);
//      },
//      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
//      immediate: true
//      }

    },
    mounted () {
      let h1 = Number.parseInt(utils.selectClass('.notice-title').height)
      this.scrollerHeight = (window.outerHeight - h1 || window.innerHeight - h1) + 'px'
      this.categoryType = this.$store.state.homeModule.msgType
      debugger
      this.requestData(1)

    },
    methods: {
      //去消息详情页面
      toNoticeDetail (id) {
        this.push({
          path: '/noticeDetail',
          query: {
            noticeId: id
          }
        })
      },
      gotoTop () {
        this.$refs.scroller.reset({ top: 0 })
      },
      requestData (page) {
        var type = ''
        if (this.categoryType == 1) {
          type = 'TRAINING_NOTICE'
        } else if (this.categoryType == 2) {
          type = 'POLICIES_REGULATIONS'
        } else if (this.categoryType == 3) {
          type = 'NEWS'
        } else {
          type = 'HELP_CENTER_COMMON_PROBLEM'
        }

        this.requestTrainingNotification(page, type)
      },
      loadMoreFn () {

        if (this.noMoreData || this.isLoading) {
          this.loadingUIState()
          return
        }

        this.requestData(this.pageNo)
      },
      refreshData () {
        if (this.isLoading) {
          this.loadingUIState()
          return
        }

        this.requestData(1)
      },
      loadingUIState () {

        if (this.$refs.scroller !== undefined) {
          this.$vux.loading.hide()
          this.$refs.scroller.donePulldown()
          this.scroller.pulldownStatus = 'default'
          this.$refs.scroller.donePullup()
          this.scroller.pullupStatus = 'default'
          return
        }

      },
      //请求数据
      requestTrainingNotification (page, type) {
        this.isLoading = true
        //填充测试数据
        var context = this
        var arr = context.dataList
        if (page == 1) {
          arr = []
        }
//        for (var i = 0; i < 5; i++) {
//          var model = {
//            noticeId: '12312', // |string|消息ID|
//            noticeTitle: 'tring|标题', // |string|标题|
//            content: 'sdfasgsfgsgfsfgs', // |string|内容|
//            publicTime: '2018-08-98', // |string|显示时间|格式：yyyy-MM-dd|
//            viewCount: '1234' // |string|观看人数|
//          }
//          arr.push(model)
//        }
//
//        setTimeout(function () {
//          console.log("进入了")
//           context.loadingUIState();
//          context.isLoading = false;
//          context.dataList = arr;
//          context.$refs.scroller.reset()
//        },2000)
//        return

        var param = {
          pageNo: page,
          pageSize: context.pageSize,
          categoryType: type
        }
        this.showLoading('加载中')
        this.$store.dispatch(storeTypes.HOME_GET_MSG, param).then((data) => {
          context.isLoading = false
          context.hideLoading()
          context.loadingUIState()
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {

            context.noMoreData = data.data.noticeList.length < context.pageSize
//              debugger
            if (page == 1) {
//              for(var index in data.data.noticeList){
//                 var tmpM = data.data.noticeList[index];
//                tmpM.content = "<p style='color: red'>今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊今天是个好天气啊啊啊啊</p>";
//              }
              context.dataList = data.data.noticeList

              context.pageNo = 1
            } else {
              context.dataList = context.dataList.concat(data.data.noticeList)

            }
            context.pageNo++
            context.$refs.scroller.reset()
          } else {
            context.toast(data.head.message)
          }
        })
      }

    }
  }
</script>
