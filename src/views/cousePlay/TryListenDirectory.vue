<template>
  <div style="overflow: hidden">
    <!--:height="scrollerHeight" :height="scrollerHeight"-->
    <scroller :height="scrollerHeight" ref="scrol1" lock-x>
      <div>


        <div class="exam-panel-hd">
          <div class="hd-info">{{courseDetail==null?'':courseDetail.courseName}}</div>
        </div>
        <div class="course-catalog-bd">
          <div class="line"></div>
          <div class="items" v-for="(item,index) in directoryList">
            <div class="items-tit">
              <div class="items-tit-hd">
                <span class="label">章节</span>
                <span class="num">{{index+1}}</span>
              </div>
              <div class="items-tit-bd">{{item.chapterName}}</div>
            </div>
            <!--已学完 course-ed-->
            <div @click="clickItem(coursewareItem)"
                 :class="['items-cont',coursewareItem.supportListen?'':'locked',coursewareItem.coursewareId == chooseCoursewareItem.coursewareId?'current':'']"
                 v-for="(coursewareItem,coursewareIndex) in item.coursewareList">
              <div class="items-cont-hd">
                <span v-if="coursewareItem.supportListen" class="process-num">0%</span>
                <div v-else class="locked-img"><img class="ico-locked" src="../../../design/images/icon-locked.png"
                                                    alt=""/>
                </div>

                <div class="process-circle">
                  <div class="current"></div>
                </div>
              </div>
              <div class="items-cont-bd">{{coursewareItem.coursewareName}}</div>
              <div class="items-cont-ft">
                <span>{{calLength(coursewareItem)}}</span>

                <img class="img" :src="calPicName(coursewareItem)" alt=""/>
              </div>
            </div>


          </div>

        </div>


      </div>
    </scroller>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

  .current {
    background-color: white;
  }
</style>
<script>
  import utils from '@/common/util/Utils'
  import { Scroller } from 'vux'
  import * as storeTypes from '../../store/types'

  export default {
    components: {
      Scroller
    },
    props: {
      scrollerHeight: {
        type: String
      },
      courseId: {
        type: String
      },
      packageId: {
        type: String
      },
      courseDetail: {
        type: Object
      },
      coursewareId: {
        type: String
      },
      schemeId: {
        type: String
      }

    },
//    watch:{
//      courseId(newV,oldV) {
//        // do something
//        debugger
//        this.requestDirectory();
//        this.requestPlayRes();
////        console.log(newV,oldV)
//      }
//    },
    mounted () {
//      debugger
      this.requestDirectory()

    },

//  computed: {
//    calheight(){
//      return this.scrollerHeight+'px';
//    }
//    },
    data () {
      return {
        directoryList: [],
        resList: [],
        chooseCoursewareItem: {}

      }
    },
    methods: {
      //点击课件
      clickItem (clickItem) {
        debugger
        if (clickItem == null) return this.toast('无效资源！')
        if (!clickItem.supportListen) {
          this.toast('该课件不支持试听！')
          return
        }

        this.chooseCoursewareItem = clickItem

        var resUrl = this.getResUrl(clickItem)
        this.$emit('changeRes', resUrl)
      },
      //从资源中查找对应的资源url
      getResUrl (courseWareItem) {
        var resurl = ''
        var chooseItem = null
        for (var index in this.resList) {
          var tmpResItem = this.resList[index]
          if (tmpResItem.coursewareId == courseWareItem.coursewareId) {
            chooseItem = tmpResItem
            break
          }
        }

        if (chooseItem === null) return ''
        if (chooseItem.multimediaList == null) return ''
        var resList = chooseItem.multimediaList[0].resList
        if (resList == null) return ''
        for (var index in resList) {
          var tmpResm = resList[index]
//          debugger
          if (tmpResm.resUrl.indexOf('.m3u8') != -1) {
            resurl = tmpResm.resUrl
            break
          }
        }
//        resurl = resList[2].resUrl;
        return resurl

      },
      //返回图片名称
      calPicName (item) {

        var imgSrc = ''
        if (item.type == 1) {
          if (item.coursewareId == this.chooseCoursewareItem.coursewareId) {
            imgSrc = require('../../../design/images/catalog-text-current.png')
          } else {
            imgSrc = require('../../../design/images/catalog-text.png')
          }

        } else {
          if (item.coursewareId == this.chooseCoursewareItem.coursewareId) {
            imgSrc = require('../../../design/images/catalog-video-current.png')
          } else {
            imgSrc = require('../../../design/images/catalog-video.png')
          }
        }
        return imgSrc
      },
      //计算长度
      calLength (item) {
        var seconds = item.coursewareLength
//        if(item.type == 1) seconds == 0;
        var minute = parseInt(seconds / 60)
        seconds = parseInt(seconds % 60)

        var hours = parseInt(minute / 60)
        minute = parseInt(minute % 60)
        return this.parseTime(hours) + ':' + this.parseTime(minute) + ':' + this.parseTime(seconds)
      },
      parseTime (val) {
        return val < 10 ? '0' + val : '' + val
      },
      //请求目录
      requestDirectory () {
        var context = this
        var param = {
          courseId: this.courseId,
          packageId: this.packageId,
          objectType: 1,
          objectValue: this.schemeId,
          courseType: '1',
          isListeningTest: true
        }
        this.$vux.loading.show({
          text: '加载中'
        })
        this.$store.dispatch(storeTypes.COURSE_PLAY_COURSE_Directory_List, param).then((data) => {

          context.$vux.loading.hide()
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            context.directoryList = data.data.chapterList
            context.requestPlayRes()
          } else {
            context.toast(data.head.message)
          }
        })
      },
      //请求播放资源
      requestPlayRes () {
        var context = this


        var param = {
          courseId: this.courseId,
          objectType: 1,
          objectValue: this.schemeId,
          courseType: '1',
          playType: 0
        }
        this.$vux.loading.show({
          text: '加载中'
        })
        this.$store.dispatch(storeTypes.COURSE_PLAY_MSG, param).then((data) => {

          context.$vux.loading.hide()
          if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
            context.resList = data.data.coursewarePlayList
            if (context.coursewareId != null && context.coursewareId != '') {
              var chooseCourseWareItem = context.getCoursewareItemAccordingCourseWareId(context.coursewareId)
              context.clickItem(chooseCourseWareItem)
            } else {
              var chooseCourseWareItem = context.getFirstCourseWare()
              context.clickItem(chooseCourseWareItem)
            }
          } else {
            context.toast(data.head.message)
          }
        })
      },
      getFirstCourseWare () {
        var chooseCourseWareModel = null
        var isFind = false
//        debugger
        for (var index in this.directoryList) {

          var tmpModel = this.directoryList[index]
//           debugger
          for (var i = 0; i < tmpModel.coursewareList.length; i++) {
            var courseWareModel = tmpModel.coursewareList[i]
            if (courseWareModel.supportListen) {
              chooseCourseWareModel = courseWareModel
              isFind = true
              break
            }
          }
          if (isFind) break
        }
        return chooseCourseWareModel
      },
      scrolRest () {
        this.$refs.scrol1.reset()
      },
      //根据课件id获取课件item
      getCoursewareItemAccordingCourseWareId (courseWareId) {
        var chooseCourseWareModel = null
        var isFind = false
//        debugger
        for (var index in this.directoryList) {

          var tmpModel = this.directoryList[index]
//           debugger
          for (var i = 0; i < tmpModel.coursewareList.length; i++) {
            var courseWareModel = tmpModel.coursewareList[i]
            if (courseWareModel.coursewareId == courseWareId) {
              chooseCourseWareModel = courseWareModel
              isFind = true
              break
            }
          }
          if (isFind) break
        }
        return chooseCourseWareModel
      }
    }
  }
</script>
