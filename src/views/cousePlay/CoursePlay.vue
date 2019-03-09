<template>
  <div class="contain">
    <div class="view-pos">
      <div class="hb-video-box">
        <div class="video-top-bar">
          <div class="top-bar-hd">
            <img class="img" src="../../../design/images/icon-return.png" alt=" "/>
          </div>
          <div class="top-bar-bd">
            <span class="course-name">{{courseDetail == null ? '' : courseDetail.courseName}}</span>
          </div>
          <!--<div class="top-bar-ft">-->
          <!--<span class="ft-txt">课程目录</span>-->
          <!--<div class="video-course-catalog" style="display: none;">-->


          <!--</div>-->
          <!--</div>-->
        </div>
        <!--进度条-->
        <!--controls vjs-default-skin:width="videoWidth" :height="videoHieght" :width="videoWidth" :height="videoHieght"-->
        <div class="video-stop-panel">
          <video controls
                 controlslist="nodownload"
                 class="video-js vjs-big-play-centered vjs-default-skin" id="my-player">
            <!--<source src="https://defhwvod.59iedu.com/asset/666e053281787a45eae4e30d16c0bf05/play_video/d64b498a29678acd454c35773d08c770_1_406X270_300_0.m3u8" type="application/x-mpegURL">-->
            <!--<source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">-->
            <!--<source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">-->
          </video>
          <!--<div class="operation-hd">--
          <!--<div class="ico">-->
          <!--<img class="img" src="../../../design/images/video-stop-s.png" alt=" " />-->
          <!--&lt;!&ndash;<img class="img" src="../../../design/images/video-play-s.png" alt=" " />&ndash;&gt;-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="operation-bd">-->
          <!--<div class="video-process">-->
          <!--<div class="current" style="width: 20%;">-->
          <!--<div class="dot"></div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<span class="time">00:20/56:26</span>-->
          <!--</div>-->
          <!--<div class="operation-ft">-->
          <!--<div class="ico">-->
          <!--<img class="img" src="../../../design/images/video-bigger.png" alt=" " />-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--点击暂停后-->
          <!--<div class="video-stop-panel">-->
          <!--<img class="img" src="../../../design/images/video-play-l.png" alt=" " />-->
        </div>
      </div>
      <div class="hb-tab-tit">
        <div :class="['tab-tit-items',selectTab == 0?'current':'']" @click="changeTab(0)">
          <span class="items-name">课程目录</span>
          <img v-if="selectTab == 0" class="current-img indexMax" src="../../../design/images/tab-current-bg.jpg"/>
        </div>
        <div :class="['tab-tit-items',selectTab == 1?'current':'']" @click="changeTab(1)">
          <span class="items-name">课程信息</span>
          <img v-if="selectTab == 1" class="current-img indexMax" src="../../../design/images/tab-current-bg.jpg"/>
        </div>
      </div>
    </div>
    <div class="course-catalog course-catalog-1">
      <direcComponent @changeRes="changeMedia" ref="directRef" :courseId="courseId" :packageId="packageId"
                      :schemeId="schemeId" :coursewareId="coursewareId"
                      :courseDetail="courseDetail" :hidden="selectTab == 1"
                      :scrollerHeight="scrollerHeight"></direcComponent>
      <courseDetailComponent :courseDetail="courseDetail" ref="detailRef" :hidden="selectTab == 0"
                             :scrollerHeight="scrollerHeight"></courseDetailComponent>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  video::-webkit-media-controls {
    display: none !important;
  }

  .indexMax {
    z-index: 998;
  }

  .video-top-bar {
    opacity: 0;
  }
</style>

<!--<script type="text/javascript" src="video.min.js"></script>-->
<!--<link href="./css/video-js.css" rel="stylesheet" type="text/css"/>-->
<script>
  //  import './css/video-js.css'
  //  import './js/video'
  //  import './js/videojs-contrib-hls'

  import 'video.js/dist/video-js.css'
  import videojs from 'video.js'
  // import 'videojs-contrib-hls'
  import direcComponent from './TryListenDirectory.vue'
  import courseDetailComponent from './TryListenInfo.vue'
  import utils from '@/common/util/Utils'
  import * as storeTypes from '../../store/types'

  export default {
    components: {
      direcComponent,
      courseDetailComponent

    },
    data () {
      return {
        videoInstance: null,
        videoWidth: '',
        videoHeight: '',
        scrollerHeight: '',
        selectTab: 0,
        courseId: this.$route.query.courseId,
        packageId: this.$route.query.packageId,
        courseDetail: null,
        coursewareId: this.$route.query.coursewareId,
        schemeId: this.$route.query.schemeId,
        skuId: this.$route.query.skuId
      }
    },
    destroyed () {
      debugger
      this.videoInstance.dispose()
    },
    mounted () {
      let videoHeight = Number.parseInt(utils.selectClass('.hb-video-box').height)
      var options = {
        width: window.screen.width + 'px',
        height: videoHeight + 'px',
//        controlBar: {
//          captionsButton: false,
//          chaptersButton : false,
//          liveDisplay:false,
//          playbackRateMenuButton: false,
//          subtitlesButton:false
//        },
        nativeControlsForTouch: false
      }
      var context = this
      this.videoInstance = videojs('my-player', options, function onPlayerReady () {

//      debugger

        this.on('ended', function () {

        })
        this.on('timeupdate', function (data) {
//         console.log(this.currentTime());
          if (this.currentTime() > 180) {
            context.toast('试听时间已结束')
            this.currentTime(0)
          }
        })
      })
//      this.changeVideoSrc('https://testvod900.59iedu.com:8443/vod/sg1-s1/H0/_a/H0_a6235kqV1B3gKFaZPRQ==/video.m3u8?sc_tk=base64');
//      this.changeVideoSrc("https://defhwvod.59iedu.com/asset/666e053281787a45eae4e30d16c0bf05/play_video/d64b498a29678acd454c35773d08c770_1_406X270_300_0.m3u8")
      var h1 = Number.parseInt(utils.selectClass('.view-pos').height)
      var h2 = Number.parseInt(utils.selectClass('.current-img').height)
      h2 = 0
      this.scrollerHeight = (window.outerHeight - (h1 + h2) || window.innerHeight - (h1 + h2)) + 'px'

      this.requestDetail()
//  debugger
    },
    methods: {
      // 设置video 中的src
      changeVideoSrc (resSrc) {

        this.videoInstance.src(resSrc)  //重置video的src
        this.videoInstance.load(resSrc)//使video重新加载
        this.videoInstance.play()//播放
//        document.getElementById('my-player').play();
//        //微信必须加入Weixin JSAPI的WeixinJSBridgeReady才能生效
        var context = this
//        document.addEventListener("WeixinJSBridgeReady", function () {
//          context.videoInstance.play()//播放
////          document.getElementById('video').play(); //视频自动播放
//        }, false);

      },
      //切换课件了
      changeMedia (resUrl) {
        console.log(resUrl)
        this.changeVideoSrc(resUrl)
      },
      requestDetail () {


        var context = this


        var param = {
          courseId: this.courseId,
          packageId: this.packageId,
          objectType: 1,
          objectValue: this.schemeId,
          skuId: this.skuId,
          courseType: '1'
        }

        this.$vux.loading.show({
          text: '加载中'
        })
        this.$store.dispatch(storeTypes.COURSE_PLAY_COURSE_DETAIL, param).then((data) => {
          context.$vux.loading.hide()
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            context.courseDetail = data.data
          } else {
            context.toast(data.head.message)
          }
        })

      },

      changeTab (tabIndex) {
//      if (tabIndex == 0){
//       this.$refs.directRef.scrolRest();
//      }else {
//        this.$refs.detailRef.scrolRest();
//      }
//      debugger
        this.selectTab = tabIndex
      }
    }
  }
</script>
