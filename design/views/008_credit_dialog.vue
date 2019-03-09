<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog weui-dialog-1">
        <div class="weui-dialog__bd weui-dialog__bd-1">
          <div class="tl fs28">
            <p class="credit-num">90</p>
            <p class="credit-txt">剩余未兑换课程学分数</p>
          </div>
          <div class="credit-tip">
            <div class="pic"><img src="../images/icon-warning.png" /></div>
            <div class="text">您尚差Y学分，才可完成本年度的培训要求学分。<a href="#">前往购买学分>></a></div>
          </div>
          <a class="btn-close"><img src="../images/icon-close.png" /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
