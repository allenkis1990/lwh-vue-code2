<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog" style="overflow: visible;border:.1rem solid #000;padding-top:.8rem;margin-top:-.4rem;">
        <div class="dialog-icon"><img src="../images/icon-order.png" /></div>
        <div class="weui-dialog__bd">
          <p class="mt20">XXXX年度存在单位集体报名待缴费的XXX学分，请联系单位管理员报名！</p>
         </div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">我知道了</a>
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
