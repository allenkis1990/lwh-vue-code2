<template>
  <div class="contain hb-box">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">选课清单(0)</div>
      <div class="header-right3">
        <a href="#"><img src="../images/icon-write.png" />选课培训</a>
      </div>
    </div>
    <!--标题栏-->
    <div class="no-data-box pt100">
      <img class="no-data-img" src="../images/no-data-img.png" alt=" " />
      <div class="no-data-txt">选课清单空空如也<br/>赶紧去选课培训吧！</div>
    </div>
    <div class="btn-primary btn-m mt30">进入选课</div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
