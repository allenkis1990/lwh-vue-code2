<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">学分订单</div>
      <div class="header-right3">
        <a href="#">查看学分情况</a>
      </div>
    </div>
    <!--标题栏-->
    <!--tab-->
    <div class="hb-tab-tit">
      <div class="tab-tit-items">
        <span class="items-name">未支付</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
      <div class="tab-tit-items">
        <span class="items-name">已支付</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
      <div class="tab-tit-items">
        <span class="items-name">交易关闭</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
      <div class="tab-tit-items current">
        <span class="items-name">退款</span>
        <img class="current-img" src="../images/tab-current-bg.jpg" />
      </div>
    </div>
    <!--/tab-->

    <div class="hb-wrap-box hb-wrap-box-2">
      <div class="weui-panel hb-panel bor-b20 rel">
        <div class="order-info-box">
          <div class="order-date">
            <img src="../images/icon-ordernum.png" />
            <div class="text">订单号：21254568565624</div>
          </div>
        </div>
        <div class="hb-media-box hb-media-box-1">
          <div class="hb-media-box-hd">
            <img class="hb-media-box-thumb" src="../images/course-score.jpg" />
          </div>
          <div class="hb-media-box-bd">
            <div class="hb-media-box-desc">继续教育年度：2019</div>
            <div class="hb-media-box-desc">每学分：<span class="ci">￥1.00</span></div>
            <div class="hb-media-box-desc">学分：40<div class="ci fr">退款金额：￥40.00</div></div>
          </div>
        </div>
        <div class="order-info-box bor-t">
          <div class="cb">退款成功</div>
          <div class="btn-refund">查看详情</div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20 rel">
        <div class="order-info-box">
          <div class="order-date">
            <img src="../images/icon-ordernum.png" />
            <div class="text">订单号：21254568565624</div>
          </div>
        </div>
        <div class="hb-media-box hb-media-box-1">
          <div class="hb-media-box-hd">
            <img class="hb-media-box-thumb" src="../images/course-score.jpg" />
          </div>
          <div class="hb-media-box-bd">
            <div class="hb-media-box-desc">继续教育年度：2019</div>
            <div class="hb-media-box-desc">每学分：<span class="ci">￥1.00</span></div>
            <div class="hb-media-box-desc">学分：40<div class="ci fr">退款金额：￥40.00</div></div>
          </div>
        </div>
        <div class="order-info-box bor-t">
          <div class="ci">退款提交申请</div>
          <div class="btn-refund">查看详情</div>
        </div>
      </div>
    </div>

    <!--返回顶部-->
    <div class="layer-box">
      <div class="a-items">
        <img class="img" src="../images/icon-top.png" alt=" " />
      </div>
    </div>
    <!--/返回顶部-->
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
