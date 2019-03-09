<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__bd">
          <img class="d-icon-success" src="../images/icon-warning.png" />
          <p class="mt20">您输入的身份证号、姓名不匹配！</p>
          <p class="mt20 tl">检查原因：</p>
          <p class="tl">1.检查输入的信息是否正确；</p>
          <p class="tl">2.检查身份证的长度是否为18位；</p>
          <p class="mt20 tl">若都不存在以上条件，这是由于会计人员库中没有找到您的信息，您需要到当地财政主管部门登记您的会计档案信息（http://www.xxx.com）。在登记确认后，再登录平台注册、报名、缴费、学习。</p>
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
