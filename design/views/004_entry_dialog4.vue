<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog" style="overflow: visible;border:.1rem solid #000;padding-top:.8rem;">
        <div class="dialog-icon"><img src="../images/icon-order.png" /></div>
        <div class="content">
          <div class="title">2018年度必修课程如下</div>
          <div class="tit">公需科目（共X学分）</div>
          <ul class="con">
            <li><span class="name">XXXX课程名称</span><span class="score">X学分</span></li>
            <li><span class="name">XXXX课程名称</span><span class="score">X学分</span></li>
            <li><span class="name">XXXX课程名称</span><span class="score">X学分</span></li>
            <li><span class="name">XXXX课程名称</span><span class="score">X学分</span></li>
          </ul>
          <div class="tit">专业科目（共X学分）</div>
          <ul class="con">
            <li><span class="name">XXXX课程名称</span><span class="score">X学分</span></li>
            <li><span class="name">XXXX课程名称</span><span class="score">X学分</span></li>
            <li><span class="name">XXXX课程名称</span><span class="score">X学分</span></li>
            <li><span class="name">XXXX课程名称</span><span class="score">X学分</span></li>
          </ul>
          <div class="total">2018年度，必修课程公需科目X学分，专业科目Y学分，共Z学分</div>
        </div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">立即报名</a>
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
