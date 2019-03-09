<template>
  <!--z注册页-->
  <div class="contain">
    <div class="hb-form-cells">
      <div class="tit-box-1">
        <div class="h1">会计专业技术人员继续教育培训</div>
        <div class="h2">设置新密码</div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">设置密码</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请输入6~18位由字母、数字组成的新密码" class="weui-input" /></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><span class="weui-label weui-label-2">确认密码</span></div>
          <div class="weui-cell__bd"><input type="text" placeholder="请重复输入新密码" class="weui-input" /></div>
        </div>
      </div>
      <div class="btn-primary mt80">提交新密码</div>
      <div class="form-other mt60">
        <div class="weui-check__label cb tc pb30">前往登录</div>
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
