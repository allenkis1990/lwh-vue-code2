<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">

      <div class="header-tit">福建会计人员继续教育培训</div>
      <div class="header-right">
        <a class="hb-ico ico-center"></a>
      </div>
    </div>
    <!--标题栏-->
    <div class="banner banner-notice">培训通知</div>
    <!--列表-->
    <div class="notice">
      <div class="no-data-box pt100"><img src="../images/no-data-img.png" alt=" " class="no-data-img"> <div class="no-data-txt">暂无通知</div></div>
    </div>
    <!--/班级列表-->
    <!--返回顶部-->
    <div class="layer-box">
      <div class="a-items">
        <img class="img" src="../images/icon-top.png" alt=" " />
      </div>
    </div>
    <!--/返回顶部-->
    <div class="weui-tabbar">
      <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
        <div class="weui-tabbar__icon">
          <!--<img src="../images/tabbar-find.png" alt=" " />-->
          <img src="../images/tabbar-find-current.png" alt=" " />
        </div>
        <p class="weui-tabbar__label"><span>首页</span></p>
      </a>

      <a href="javascript:;" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <img src="../images/tabbar-learning.png" alt=" " />
          <!--<img src="../images/tabbar-learning-current.png" alt=" " />-->

        </div>
        <p class="weui-tabbar__label"><span>报名培训</span></p>
      </a>


      <a href="javascript:;" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <img src="../images/tabbar-archives.png" alt=" " />
          <!--<img src="../images/tabbar-archives-current.png" alt=" " />-->
        </div>
        <p class="weui-tabbar__label"><span>学习中心</span></p>
      </a>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
