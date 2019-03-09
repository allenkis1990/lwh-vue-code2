<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="mask-select-box">
        <div class="title">
          <div class="t-left">取消</div>
          <div class="t-center">请选择继续教育年度</div>
          <div class="t-right">完成</div>
        </div>
        <div class="con">
          <div class="item cur">2019</div>
          <div class="item">2018</div>
          <div class="item">2017</div>
          <div class="item">2016</div>
          <div class="item">2015</div>
          <div class="item">2014</div>
          <div class="item">2013</div>
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
