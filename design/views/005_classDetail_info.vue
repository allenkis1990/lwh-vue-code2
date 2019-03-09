<template>
  <div class="contain hb-box">
    <div class="hb-box-bd">
      <div class="view-pos">
        <div class="course-detail-hd">
          <div class="course-detail-btn">
            <img class="img" src="../images/video-audition.png" alt=" " />
          </div>
          <div class="course-detail-img">
            <img class="img" src="../images/course-img.jpg" alt=" " />
          </div>
          <div class="year-label-box">
            <img class="img" src="../images/year-label.png" alt=" " />
            <span class="year-label">2017</span>
          </div>
          <div class="course-info">
            <img class="mask" src="../images/course-img-mask.png" alt=" " />
            <div class="course-name">我是一个培训班的名称培训班的名称培训班的名称</div>
          </div>
        </div>
        <div class="hb-tab-tit">
          <div class="tab-tit-items current">
            <span class="items-name">培训信息</span>
            <img class="current-img" src="../images/tab-current-bg.jpg" />
          </div>
          <div class="tab-tit-items">
            <span class="items-name">课程目录</span>
            <img class="current-img" src="../images/tab-current-bg.jpg" />
          </div>
        </div>
      </div>
      <div class="course-catalog">
        <div class="block-box situation-info-box">
          <div class="info-tit">考核要求</div>
          <div class="info-desc">学习进度 = 100%，考试成绩 ≥ 60</div>
        </div>
        <div class="block-box situation-info-box">
          <div class="info-tit">课程培训信息</div>
          <div class="info-desc">科目：公需科目</div>
          <div class="info-desc">年度：2017年</div>
          <div class="info-desc">专业技术资格级别：初级</div>
          <div class="info-desc">培训起止时间： 2017-06-06 至 2018-06-06</div>
          <div class="info-desc">报名起止时间： 2017-06-06 至 2018-06-06</div>
        </div>
      </div>
    </div>
    <div class="hb-tabbar" style="bottom:.9rem;">
      <div class="left-box tc" style="padding-left: 0px;"><span class="ci fs40">30学分</span></div>
      <div class="hb-btn hb-btn-2">加入选课清单</div>
      <div class="hb-btn">确认选课</div>
    </div>
    <!--
    <div class="hb-tabbar">
      <div class="hb-btn hb-btn-3">前往学习</div>
    </div>
    -->
    <!--
    <div class="exchange-pool b0">
      <div class="pic"><img src="../images/icon-pool.png" /></div>
      <div class="text">2019年度，已选X门，其中公需科目X学分，专业科目Y学分</div>
      <div class="pic2"><img src="../images/icon-go-bgw.png" /></div>
    </div>
    -->

    <div class="exchange-pool disabled b0">
      <div class="pic"><img src="../images/icon-pool-dis.png" /></div>
      <div class="text">2019年度，已选X门，其中公需科目X学分，专业科目Y学分</div>
      <div class="pic2"><img src="../images/icon-go-bgw.png" /></div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
