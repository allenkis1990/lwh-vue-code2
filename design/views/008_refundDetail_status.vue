<template>
  <!--更多状态-->
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">退款受理情况</div>
    </div>
    <!--标题栏-->
    <div class="hb-timeline-box hb-timeline-box-1">
      <div class="hb-timeline">
        <div class="timeline-items">
          <span class="hb-ico hb-ico2 ico-close"></span>
          <div class="items-bd">
            <div class="items-info">退款关闭</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico hb-ico2 ico-refuse"></span>
          <div class="items-bd">
            <div class="items-info">退款申请被拒绝</div>
            <div class="sub-info">2017-12-12  09:23</div>
            <div class="fs24 ci">原因：调取退款原因文案调取退款原因文案调取退款原因文案调取退款原因文案调取退款原因文案</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico hb-ico2 ico-succ"></span>
          <div class="items-bd">
            <div class="items-info">退款成功</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico hb-ico2 ico-process"></span>
          <div class="items-bd">
            <div class="items-info">退款处理中</div>
            <div class="sub-info"></div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico hb-ico2 ico-pass"></span>
          <div class="items-bd">
            <div class="items-info">退款审核通过</div>
            <div class="sub-info">2017-12-12  09:23</div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico hb-ico2 ico-wait"></span>
          <div class="items-bd">
            <div class="items-info">等待审核</div>
            <div class="sub-info"></div>
          </div>
        </div>
        <div class="timeline-items">
          <span class="hb-ico hb-ico2 ico-submit"></span>
          <div class="items-bd">
            <div class="items-info">提交退款申请</div>
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
