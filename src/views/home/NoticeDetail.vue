<template>
  <div class="contain">

    <!--标题栏-->
    <!--详情-->
    <div class="notice-detail">
      <!--标题根据类型添加样式：通知t-tong,政策t-zheng,资讯t-xun，问题t-wen-->
      <div :class="bgClass()">
        <div class="tit">{{msgDetail.noticeTitle}}</div>
        <div class="info">
          <div class="view-box"><img src="../../../design/images/icon-date-w.png">{{msgDetail.publicTime}}</div>
          <div class="view-box"><img src="../../../design/images/icon-views-w.png">{{msgDetail.viewCount}}</div>
        </div>
      </div>
      <!--<div class="title" style="text-align: center">{{msgDetail.noticeTitle}}</div>-->
      <!--<div class="info">-->
          <!--<div class="view-box"><img src="../../../design/images/icon-views.png">{{msgDetail.viewCount}}</div>-->
          <!--<div class="view-box"><img src="../../../design/images/icon-date.png">{{msgDetail.publicTime}}</div>-->
      <!--</div>-->
      <Scroller style="box-sizing: border-box;"
                :height="scrollerHeight"  ref="scroller">
      <div class="desc" v-html="msgDetail.content">
        <!--{{msgDetail.content}}-->
      </div>
      </Scroller>
    </div>
    <!--/班级列表-->
    <!--返回顶部-->



  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
  /*.notice-detail{*/
    /*padding: .1rem .2rem 1rem .3rem;*/
  /*}*/
</style>
<script>
  import {Scroller, InlineLoading} from 'vux'
  import * as storeTypes from '../../store/types'
export default {
  components: {
    Scroller,
    InlineLoading
  },
  mounted(){
    this.categoryType = this.$store.state.homeModule.msgType
    this.scrollerHeight = ((window.outerHeight || window.innerHeight)-80) + 'px';
    this.requestData();
  },
  data(){
    return {
      categoryType:1,
      noticeId: this.$route.query.noticeId,
      scrollerHeight: "",
      msgDetail: {
        noticeId: "", // |string|消息ID|
        noticeTitle: "", // |string|标题|
        viewCount: 0, // |int|查看数人数|
        publicTime: "", // |string|发布时间|格式：yyyy-MM-dd|
        publishUserName: "", // |string|发布人|
        content: ''
      }

    }
  },
  methods:{
    //类型不同背景色返回不同
    bgClass(){
      var classArray = ['title'];
      switch (this.categoryType){
        case 1:
        {
          classArray.push('t-tong')
        }
          break;
        case 2:
        {
          classArray.push('t-zheng')
        }
          break;
        case 3:
        {
          classArray.push('t-xun')
        }
          break;
        case 4:
        {
          classArray.push('t-wen')
        }
          break;
        default:
        {
          classArray.push('t-tong')
        }
          break;
      }
      return classArray;
    },
    requestData(){
      var context = this;
      this.showLoading('加载中')
      var param = {
        noticeId:context.noticeId
      }
      this.$store.dispatch(storeTypes.HOME_GET_MSG_DETAIL, param).then((data) => {

        context.hideLoading()

        if (data.head.code == storeTypes.NETWORK_RESULT_SUCCESS) {
  context.msgDetail = data.data;

        } else {
          context.toast(data.head.message)
        }
      })
    }
  }
}
</script>
