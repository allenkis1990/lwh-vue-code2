<template>
  <div class="course-detail-tab-bd-1">
    <scroller
      style="box-sizing: border-box;"
      :height="scrollHeight"
      lock-x
      use-pullup
      @on-pullup-loading="loadData"
      v-model="scroller"
      ref="scroller">
      <div class="sign-in-list">
        <div class="sign-in-items" v-for="(course, index) in directoryList" :key="index">
          <div class="date">{{getMonthAndDay(course.startTime)}}<br/>{{getYear(course.startTime)}}</div>
          <div class="sign-in-hd">
            <div class="tit">{{course.courseName}}</div>
            <image class="img" src="../../../../design/images/arrow-open.png" alt=" "/>
            <!--<image class="img" src="/images/arrow-close.png" alt=" " />-->
          </div>
          <div class="sign-in-bd">
            <div class="label">授课时间</div>
            <div class="bd">{{getTime(course.startTime) + ' - ' + getTime(course.endTime)}}</div>
          </div>
          <div class="sign-in-bd">
            <div class="label">授课教师</div>
            <div class="bd">{{course.teacherName}}</div>
          </div>
          <div class="sign-in-bd ai-t">
            <div class="label">授课地点</div>
            <div class="bd">{{course.planAddressName}}</div>
          </div>
        </div>
      </div>
      <div class="loading-tips" v-if="(totalSize <= currentSize) && this.scroller.pullupStatus !== 'loading'"><span
        class="line"></span><span class="txt">已经到最底部啦</span><span class="line"></span>
      </div>
      <div class="loading-tips" v-if="(totalSize > currentSize) && this.scroller.pullupStatus !== 'loading'"><span
        class="line"></span><span class="txt">上拉加载更多</span><span class="line"></span>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up"
           style="position: absolute; width: 100%; height: 40px; bottom: -10px; text-align: center;">
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
</template>
<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

</style>
<script>
  import { Scroller, InlineLoading } from 'vux'

  export default {
    components: {
      Scroller,
      InlineLoading
    },
    props: {
      directoryList: {
        type: Array,
        default () {
          return []
        }
      },
      totalSize: {
        type: Number
      },
      currentSize: {
        type: Number
      }
    },
    data () {
      return {
        scroller: {
          pullupStatus: 'default'
        },
        scrollHeight: ''
      }
    },
    mounted () {
      let fontSize = window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize
      this.scrollHeight = (window.outerHeight || window.innerHeight) - (parseFloat(fontSize) * 5) + 'px'
    },
    methods: {
      getYear (date) {
        return date.substring(0, 4)
      },
      getMonthAndDay (date) {
        let str = date.substring(5, 10)
        return str.replace(/-/, '/')
      },
      getTime (date) {
        return date.substring(11)
      },
      loadData () {
        if (this.totalSize > this.currentSize) {
          this.scroller.pullupStatus = 'loading'
          this.$emit('onLoadMore')
        }
        this.$refs.scroller.donePullup()
        this.scroller.pullupStatus = 'default'
        // this.$emit('onLoadMore')
      }
    }
  }
</script>
