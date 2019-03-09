<template>
  <!-- 课程超市班级课程目录 -->
  <div class="course-catalog">
    <scroller
      :height="scrollerHeight"
      style="box-sizing: border-box;"
      lock-x
      scrollbar-y
      v-model="scroller" ref="scroller">
      <div>
        <div class="class-directory-box">
          <div class="line"></div>
          <div class="class-directory">
            <div class="directory-li" v-for="(chapter, index) in chapterList" :key="chapter.chapterId">
              <div class="items-tit" @click="toggleExpand(index)">
                <span class="dot"></span><span class="ml20">{{chapter.chapterName}}</span>
              </div>
              <div class="sub-items" v-show="chapter.expand">
                <div class="sub-items-bd" v-for="(item, $index) in chapter.coursewareList" :key="item.coursewareId">
                  <div class="bd">
                    <span class="dot"></span><span class="ml20">{{($index + 1) + '、' + item.coursewareName}}</span>
                  </div>
                  <span class="time">{{transformTime(item.coursewareLength)}}</span>
                  <div class="ft"
                       @click="auditionCourse(item.coursewareId)"
                       v-if="item.supportListen"><img class="img" src="../../../../design/images/icon-play.png"/></div>
                </div>
              </div>

              <!--<div class="sub-items">
                <div class="sub-items-bd">
                  <div class="bd">
                    <span class="dot"></span><span class="tit">这是课程的名称这是课程的名称这是课程的名称这是课程的名称</span>
                  </div>
                  <span class="time">00:23:56</span>
                  <div class="ft"><img class="img" src="../images/icon-play.png" /></div>
                </div>
                <div class="sub-items-bd">
                  <div class="bd">
                    <span class="dot"></span><span class="tit">这是课程的名称这是课程的名称这是课程的名称这是课程的名称</span>
                  </div>
                  <span class="time">00:23:56</span>
                  <div class="ft"><img class="img" src="../images/icon-play.png" /></div>
                </div>
                <div class="sub-items-bd">
                  <div class="bd">
                    <span class="dot"></span><span class="tit">这是课程的名称这是课程的名称这是课程的名称这是课程的名称</span>
                  </div>
                  <span class="time">00:23:56</span>
                  <div class="ft"><img class="img" src="../images/icon-play.png" /></div>
                </div>
                <div class="sub-items-bd">
                  <div class="bd">
                    <span class="dot"></span><span class="tit">这是课程的名称这是课程的名称这是课程的名称这是课程的名称</span>
                  </div>
                  <span class="time">00:23:56</span>
                  <div class="ft"><img class="img" src="../images/icon-play.png" /></div>
                </div>
              </div>-->

            </div>
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
  import { Scroller } from 'vux'
  import utils from '@/common/util/Utils'
  export default {
    components: {
      Scroller
    },
    mounted () {
      this.setScrollerHeight()
    },
    data () {
      return {
        scrollerHeight: '',
        scroller: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        }
      }
    },
    props: {
      fromHelpMeSelectCourse: {
        type: Boolean
      },
      chapterList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      //      设置scroller高度
      setScrollerHeight () {
        let h1 = Number.parseInt(utils.selectClass('.view-pos').height)
        let h2 = !this.fromHelpMeSelectCourse ? Number.parseInt(utils.selectClass('.exchange-pool').height) : 0
        let h3 = !this.fromHelpMeSelectCourse ? Number.parseInt(utils.selectClass('.hb-tabbar').height) : 0
        this.scrollerHeight = (window.outerHeight - (h1 + h2 + h3) || window.innerHeight - (h1 + h2 + h3)) + 'px'
        console.log(this.scrollerHeight, '高度')
      },
      auditionCourse (cweId) {
        return this.$parent.auditionCourse(cweId)
      },
      toggleExpand (index) {
        this.$emit('onToggleExpand', index, 2)
      },
      transformTime (time) {
        let result = ''
        let minute = parseInt(time / 60)
        let second = parseInt(time % 60)
        if (minute === 0) {
          result += '00:'
        } else if (minute > 0 && minute < 10) {
          result += ('0' + minute + ':')
        } else {
          result += (minute + ':')
        }
        if (second === 0) {
          result += '00'
        } else if (second > 0 && second < 10) {
          result += ('0' + second)
        } else {
          result += second
        }
        return result
      }
    }
  }
</script>
