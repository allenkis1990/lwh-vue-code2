<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../images/icon-warning.png" />
          <p class="mt20 tl">已获得指考核通过的学分</p>
          <p class="mt20 tl">正在学习指本培训平台内已选课程，学习进度大于0但未考核通过的。</p>
          <p class="mt20 tl">未学习指本培训平台内已选课课程进度为0与手中已购买的学分未选课的。</p>
          <p class="mt20 tl">还差指需完成本年度学分90还未购买的。</p>
        </div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
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
