<template>
  <div style="overflow: hidden;overflow-y: scroll">
    <!--:height="'347px'"  :height="scrollerHeight"-->
    <!--<scroller  :height="scrollerHeight" ref="scrol2" lock-x>-->


    <div>
      <div class="block-box situation-info-box">
        <div class="info-tit">基础信息</div>
        <div class="info-desc">课程名称：{{courseDetail==null?'':courseDetail.courseName}}</div>
        <div class="info-desc">讲师：{{courseDetail==null?'':courseDetail.teacherList.join(',')}}</div>
        <div class="info-desc">学分：{{courseDetail==null?'':courseDetail.courseCredit}}</div>

      </div>
      <div class="block-box situation-info-box">
        <div class="info-tit">课程介绍</div>
        <!--中共十九大的召开，不仅是中国的大事，也是世界的大事。世界各国媒体也都在此时此刻将目光投向了-->
        <!--中国，多国媒体派记者来华采访。据十九大新闻中心统计，已有3068名中外记者前来采访报道十九大，其中港澳台记者和外国记-->
        <!--者达到1818人，比十八大时增长6.7%；外国记者来自134个国家，比十八大时增加19.6%，遍布世界五大洲。-->
        <div class="info-desc info-desc-1">{{courseDetail==null?'':courseDetail.courseAbouts}}</div>
      </div>
    </div>
    <!--</scroller>-->
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";

</style>
<script>
  import utils from '@/common/util/Utils'
  import { Scroller } from 'vux'

  export default {
    components: {
      Scroller
    },
    props: {
      scrollerHeight: {
        type: String
      },
      courseDetail: {
        type: Object
      }
    },

    mounted () {

    },
//    computed: {
//      calheight(){
//        return this.scrollerHeight+'px';
//      }
//      },
    data () {
      return {}
    },
    methods: {

      scrolRest () {
        this.$refs.scrol2.reset()
      }
    }
  }
</script>
