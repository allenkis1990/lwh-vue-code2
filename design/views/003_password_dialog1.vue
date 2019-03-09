<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../images/icon-warning.png" />
          <p class="mt20">当前帐号未注册，请先注册！</p>
         </div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_gray">取消</a>
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">前往注册</a>
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
