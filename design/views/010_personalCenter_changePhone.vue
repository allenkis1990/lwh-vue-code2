<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">修改手机号</div>
      <div class="header-right3">
        <a href="#">返回</a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-form-cells pt100">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">手机号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入11位手机号" class="weui-input" /></div>
        </div>
      </div>
      <div class="btn-primary mt80">保存修改</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
