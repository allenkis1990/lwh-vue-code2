<template>
  <!--更多状态-->
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">订单详情</div>
      <div class="header-right3">
        <a href="#">返回</a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-timeline-box hb-timeline-box-1">
      <div class="hb-timeline">
        <div class="timeline-items">
          <span class="hb-ico ico-fail"></span>
          <div class="items-bd">
            <div class="items-info">交易关闭</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-succ"></span>
          <div class="items-bd">
            <div class="items-info">交易成功</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-send"></span>
          <div class="items-bd">
            <div class="items-info">已发货</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-paid"></span>
          <div class="items-bd">
            <div class="items-info">已付款</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico ico-submit"></span>
          <div class="items-bd">
            <div class="items-info">订单提交成功</div>
            <div class="sub-info">2017-12-12  09:23</div>
            <div class="sub-info">订单号：235436546547657</div>
          </div>
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
