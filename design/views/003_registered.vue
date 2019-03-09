<template>
  <!--z注册页-->
  <div class="contain">
    <div class="hb-form-cells">
      <div class="tit-box-1">
        <div class="h1">会计专业技术人员继续教育培训</div>
        <div class="h2">注册</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">身份证号</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入18位身份证号" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">真实姓名</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入真实姓名" class="weui-input" /></div>
        </div>
      </div>
      <div class="btn-primary mt80">立即注册</div>
      <div class="form-other mt60">
        <div class="weui-check__label cb tc pb30">已有帐号，直接登录</div>
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
