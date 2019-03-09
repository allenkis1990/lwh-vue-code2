<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <!--<div class="header-left" @click="drawerVisibilityEvent"><a class="hb-ico ico-menu"></a></div>-->
      <div class="header-tit2">福建省会计专业技术人员继续教育</div>
      <div class="header-right2" v-if="!$store.getters.hasLogin">
        <a href="#" @click="toLogin">注册/登录</a>
      </div>

      <div @click="toMyLearning" class="header-right" v-else>
        <a class="hb-ico ico-center"></a>
      </div>

    </div>
    <!--标题栏-->
    <Scroller style="box-sizing: border-box;"
              :height="scrollerHeight" lock-x
              scrollbar-y
              use-pulldown
              @on-pulldown-loading="refreshData" v-model="scroller" ref="scroller">
      <div>

        <div class="banner-home"><swiper :height="swiperHeight" :list="swiperList" auto  dots-class="custom-bottom" dots-position="center"></swiper></div>
        <div class="menu-home">
          <a @click="toChooseClass()">
            <div class="pic"><img src="../../../design/images/icon-bao.png"/></div>
            <p>选课培训</p>
          </a>
          <a @click="toMsgList(1)">
            <div class="pic"><img src="../../../design/images/icon-tong.png"/></div>
            <p>培训通知</p>
          </a>
          <a @click="toMsgList(2)">
            <div class="pic"><img src="../../../design/images/icon-zheng.png"/></div>
            <p>政策法规</p>
          </a>
          <a @click="toMsgList(3)">
            <div class="pic"><img src="../../../design/images/icon-xun.png"/></div>
            <p>业界资讯</p>
          </a>
          <a @click="toMsgList(4)">
            <div class="pic"><img src="../../../design/images/icon-wen.png"/></div>
            <p>常见问题</p>
          </a>
        </div>
        <div @click="clickCredit" class="pic-home"><img src="../../../design/images/pic-home.png"/></div>
        <div class="title-home" @click="toMsgList(1)">
          <div class="pic"><img src="../../../design/images/icon-tong.png"/></div>
          <div class="txt">培训通知</div>
          <a href="#" class="more">更多></a>
        </div>
        <!--列表-->
        <div class="notice notice-home">
          <div class="item" @click="toNoticeDetail(item.noticeId,1)" v-for="(item,index) in trainingNotification">
            <div class="title">{{item.noticeTitle}}</div>
            <div class="desc">{{item.content}}</div>
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

          <div v-if="trainingNotification.length == 0" class="no-data-box pt100"><img
            src="../../../design/images/no-data-img.png" alt=" " class="no-data-img">
            <div class="no-data-txt">暂无通知</div>
          </div>

        </div>
        <div class="gray-bar"></div>
        <!--/班级列表-->
        <div class="title-home title-home2" @click="toMsgList(2)">
          <div class="pic"><img src="../../../design/images/icon-zheng.png"/></div>
          <div class="txt">政策法规</div>
          <a href="#" class="more">更多></a>
        </div>
        <!--列表-->
        <div class="notice">
          <div class="item" @click="toNoticeDetail(item.noticeId,2)" v-for="(item,index) in policiesRegulations">
            <div class="title">{{item.noticeTitle}}</div>
            <div class="desc">{{item.content}}</div>
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

          <div v-if="policiesRegulations.length == 0" class="no-data-box pt100"><img
            src="../../../design/images/no-data-img.png" alt=" " class="no-data-img">
            <div class="no-data-txt">暂无政策法规</div>
          </div>
          <!--<div class="loading-tips"><span class="line"></span><span class="txt">已经到最底部啦</span><span class="line"></span></div>-->
        </div>
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
              刷新中....
              </span>
          </p>
        </div>
      </div>
    </Scroller>
    <!--/班级列表-->

    <div class="layer-box" style="z-index: 900">
      <div class="a-items" v-on:click.stop="showTrainProcess">
        <img class="img" src="../../../design/images/icon-pxlc.png" alt=" "/>
      </div>
      <div class="a-items" v-on:click.stop="callPhone">
        <img class="img" src="../../../design/images/icon-kfrx.png" alt=" "/>
      </div>
    </div>


    <div v-transfer-dom>
      <Confirm v-model="showConfirm"
               confirm-text="拨打"
               cancel-text="取消"
               content="968823"
               ref="confirmRef"
               title="电话"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"

      >
      </Confirm>
    </div>

    <!--<div @click="hideMask" style="position: fixed;top:0px;left: 0px;right: 0px;bottom: 0px;background-color: red;z-index: 999;" v-if="showMask">-->

    <TelDialog ref="TelDialogRef"></TelDialog>
    <!--</div>-->

    <div v-if="showMask" class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask" style="background-color: #333;z-index:5001"></div>
      <div class="guide" style="z-index:5001">
        <div class="pic3"><img src="../../../design/images/guide2.jpg"></div>
        <a v-on:click.stop="hideMask" class="btn-ok2">我知道了</a>
      </div>
    </div>

  </div>

</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";


  .scrollerOk {
    overflow-y: scroll;
  }
</style>
<script>
  import AppConstant from '../../global/constants/AppConstant'
  import { Scroller, InlineLoading, Confirm, TransferDomDirective as TransferDom,Swiper } from 'vux'
  import * as storeTypes from '../../store/types'
  import utils from '@/common/util/Utils'
  import TelDialog from './HomeTelDialog.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      TelDialog,
      Swiper,
      Confirm,
      Scroller,
      InlineLoading
    },
    data () {
      return {
       swiperList:[{
          url: 'javascript:',
          img: require('../../../design/images/home-banner1.jpg'),
          title: ''
        }, {
        url: 'javascript:',
          img: require('../../../design/images/home-banner2.jpg'),
          title: ''
      },
         {
           url: 'javascript:',
           img: require('../../../design/images/home-banner3.jpg'),
           title: ''
         }
       ],
        swiperHeight:'0px',
        showMask: false,
        showConfirm: false,
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        scrollerHeight: '',
        pageSize: 3,
        pageNo: 1,
        trainingNotification: [],
        policiesRegulations: []

      }
    },
    mounted () {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
      })
//      this.setCookie(AppConstant.cookie.openId, data.data.openId)
      var swiperH = Number.parseInt(utils.selectClass('.banner-home').height);
      this.swiperHeight = swiperH+'px';
      var isFirst = this.getCookie(AppConstant.cookie.userFirst)

      if (isFirst == null || isFirst != '1') {
        this.showTrainProcess()
        this.setCookie(AppConstant.cookie.userFirst, '1')

      }

      this.scrollerHeight = ((window.outerHeight || window.innerHeight) - 53) + 'px'
//      this.scrollerHeight = 2000  + 'px';
      console.log(this.scrollerHeight)
//      this.$refs.scroller.reset()
      this.requestTrainingNotification(1)
      this.requestpoliciesRegulations(1)
    },
    methods: {
      //切换为选课培训界面
      toChooseClass () {
        var haslogin = this.$store.getters.hasLogin
//          haslogin = false;
        if (!haslogin) {
          var context = this
          this.$vux.confirm.show({
            title: '提示',
            content: `请先登录平台帐号，方可学习！`,
            cancelText: '取消',
            confirmText: '前往登录',
            onConfirm () {
              //去登录页面
              context.push({
                path: '/loginByPassword'
              })
            }
          })
          return
        }
        this.$router.push('/demo/courseSelectionTrain')
      },
      //去消息详情页面
      toNoticeDetail (id,type) {
        this.$store.commit(storeTypes.HOME_SAVE_MSGTYPE, type)
        this.push({
          path: '/noticeDetail',
          query: {
            noticeId: id
          }
        })
      },
      //点击学分验证部分
      clickCredit () {
//        this.$store.getters.hasLogin; AppConstant.sysContext.isLogin
        var haslogin = this.$store.state.hasLogin
        debugger
//         haslogin = false;
        if (haslogin) {
          this.push('/courseYearSituation')
          //去历史培训界面
        } else {
          var context = this
          this.$vux.confirm.show({
            title: '提示',
            content: `请先登录，才可查询培训数据`,
            cancelText: '取消',
            confirmText: '前往登录',
            onConfirm () {
              //去登录页面
              context.push({
                path: '/loginByPassword',
                query: { type: 1 }
              })
            }
          })

        }
      },
      //隐藏培训流程蒙版
      hideMask () {
        this.showMask = false
      },
      callPhone () {
        this.$refs.TelDialogRef.show();
//        this.showConfirm = true
      },
      //打电话
      onConfirm () {
//        debugger
        this.giveRing(968823)
//        window.location.href = 'tel://968823'
      },
      onCancel () {
        this.showConfirm = false
      },
      //显示培训流程蒙版
      showTrainProcess () {
        this.showMask = true
      },
      toMsgList (msgt) {
//        this.push({
//          path:'/noticeDetail',
//          query:{
//            noticeId:''
//          }
//        })
        debugger
        this.$store.commit(storeTypes.HOME_SAVE_MSGTYPE, msgt)
        this.push({
          path: '/noticeList',
          query: { msgType: msgt }
        })
      },
      //去登录页面
      toLogin () {
        this.replace('/loginByPassword')
      },
      //去我的学习界面
      toMyLearning () {
        this.push('/demo/studyCenter')
      },
      //刷新数据
      refreshData () {
//        debugger
        var self = this

//setTimeout(function () {
////  debugger
//  console.log("取消刷新")
//  self.loadingUIState();
//},2000)
//        return
        this.requestTrainingNotification(1)
        this.requestpoliciesRegulations(1)
      },
      loadingUIState () {

        if (this.$refs.scroller !== undefined) {
          this.$vux.loading.hide()
//          if(this.$refs.scroller.donePulldown()){
//            this.$refs.scroller.donePulldown()
//          }
//          if(this.scroller.pulldownStatus){
            this.scroller.pulldownStatus = 'default'
//          }


          return
        }


      },
      //请求培训通知
      requestTrainingNotification (page) {
        //填充测试数据
        var context = this
        var arr = []
//        for (var i = 0; i < 0; i++) {
//          var model = {
//            noticeId: '12312', // |string|消息ID|
//            noticeTitle: 'tring|标题', // |string|标题|
//            content: 'sdfasgsfgsgfsfgs', // |string|内容|
//            publicTime: '2018-08-98', // |string|显示时间|格式：yyyy-MM-dd|
//            viewCount: '1234' // |string|观看人数|
//          }
//          arr.push(model)
//        }
//        context.trainingNotification = arr;
//        return


        var param = {
          pageNo: page,
          pageSize: context.pageSize,
          categoryType: 'TRAINING_NOTICE'
        }
        this.showLoading('加载中')
        this.$store.dispatch(storeTypes.HOME_GET_MSG, param).then((data) => {
          context.hideLoading()
          context.loadingUIState()
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            context.trainingNotification = data.data.noticeList
            this.$refs.scroller.reset()
          } else {
            context.toast(data.head.message)
          }
        })
      },
      drawerVisibilityEvent () {
        this.$store.commit(storeTypes.GLOBAL_SET_DRAWER, true)
      },
      // 请求政策法规
      requestpoliciesRegulations (page) {
        var context = this

//        var arr = [];
//        for (var i = 0; i < 3; i++) {
//          var model = {
//            noticeId: "12312", // |string|消息ID|
//            noticeTitle: "tring|标题", // |string|标题|
//            content: "sdfasgsfgsgfsfgs", // |string|内容|
//            publicTime: "2018-08-98", // |string|显示时间|格式：yyyy-MM-dd|
//            viewCount: '1234' // |string|观看人数|
//          }
//          arr.push(model)
//        }
//        context.policiesRegulations = arr;
//        return

        var param = {
          pageNo: page,
          pageSize: context.pageSize,
          categoryType: 'POLICIES_REGULATIONS'
        }
        this.showLoading('加载中')
        this.$store.dispatch(storeTypes.HOME_GET_MSG, param).then((data) => {
          context.hideLoading()
          context.loadingUIState()
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            context.policiesRegulations = data.data.noticeList
            this.$refs.scroller.reset()
          } else {
            context.toast(data.head.message)
          }
        })
      }
    }
  }
</script>
