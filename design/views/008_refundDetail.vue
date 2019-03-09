<template>
  <!--退款详情-->
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">退款详情</div>
    </div>
    <!--等待平台处理-->
    <div class="hb-wrap-box hb-wrap-box-5">
      <div class="refund-box bor-b20">
        <div class="info">
          <div class="fs30">等待平台处理</div>
          <div class="fs28"><span class="mr20">2018-12-29 12:12:12</span>提交退款申请</div>
        </div>
        <img class="arrow" src="../images/icon-go-bgw.png">
      </div>
      <div class="refund-tip">您已成功发起退款申请，请耐心等待平台处理。</div>
      <div class="refund-btn">
        <div></div>
        <div class="btn-refund">取消退款申请</div>
      </div>
    </div>
    <!--退款关闭-->
    <div class="hb-wrap-box hb-wrap-box-5">
      <div class="refund-box bor-b20">
        <div class="info">
          <div class="fs30">退款关闭</div>
          <div class="fs28"><span class="mr20">2018-12-29 12:12:12</span></div>
        </div>
        <img class="arrow" src="../images/icon-go-bgw.png">
      </div>
      <div class="refund-tip">您已撤销本次退款申请。</div>
    </div>
    <!--退款申请被拒绝-->
    <div class="hb-wrap-box hb-wrap-box-5">
      <div class="refund-box bor-b20">
        <div class="info">
          <div class="fs30">退款申请被拒绝</div>
          <div class="fs28"><span class="mr20">2018-12-29 12:12:12</span></div>
        </div>
        <img class="arrow" src="../images/icon-go-bgw.png">
      </div>
      <div class="refund-tip">拒绝原因：<br/>由于XXXX原因，退款申请不通过不通过不通过不通过不通过不通过不通过不通过不通过不通过</div>
      <div class="refund-btn">
        <div class="tip-txt">平台拒绝您的退款申请，您可以重新发起，平台会重新处理。</div>
        <div class="btn-refund">重新发起退款</div>
      </div>
    </div>
    <!--退款处理中（退款银行处理中/资源回收中/资源回收失败）-->
    <div class="hb-wrap-box hb-wrap-box-5">
      <div class="refund-box bor-b20">
        <div class="info">
          <div class="fs30">退款处理中</div>
          <div class="fs28"><span class="mr20">2018-12-29 12:12:12</span>退款审核通过</div>
        </div>
        <img class="arrow" src="../images/icon-go-bgw.png">
      </div>
      <div class="refund-tip">您退款申请已审核通过，请耐心等待平台处理。</div>
    </div>
    <!--退款成功-->
    <div class="hb-wrap-box hb-wrap-box-5">
      <div class="refund-box bor-b20">
        <div class="info">
          <div class="fs30">退款成功</div>
          <div class="fs28"><span class="mr20">2018-12-29 12:12:12</span></div>
        </div>
        <img class="arrow" src="../images/icon-go-bgw.png">
      </div>
      <div class="refund-tip">退回微信支付付款账号。<br/>注：退款款项原路退回。请留意相应付款账户。</div>
    </div>
    <!--退款失败-->
    <div class="hb-wrap-box hb-wrap-box-5">
      <div class="refund-box bor-b20">
        <div class="info">
          <div class="fs30">退款处理中</div>
          <div class="fs28"><span class="mr20">2018-12-29 12:12:12</span>退款审核通过</div>
        </div>
        <img class="arrow" src="../images/icon-go-bgw.png">
      </div>
      <div class="refund-tip">注：请联系平台客服，反馈问题。</div>
    </div>

    <!--退款信息-->
    <div class="hb-panel bor-t20 bor-b20 pb100">
      <div class="weui-panel__hd">退款信息</div>
      <div class="hb-media-box bor-b0">
        <div class="hb-media-box-hd">
          <img class="hb-media-box-thumb" src="../images/course-score.jpg" />
        </div>
        <div class="hb-media-box-bd">
          <div class="hb-media-box-desc">继续教育年度：2019</div>
          <div class="hb-media-box-desc">每学分：<span class="ci">￥1.00</span></div>
          <div class="hb-media-box-desc">学分：30</div>
        </div>
      </div>
      <div class="refund-item-info">
        <div class="item">
          <span class="tit">退款原因：</span><span class="txt">多买了</span>
        </div>
        <div class="item">
          <span class="tit">退款金额：</span><span class="txt">￥40.00</span>
        </div>
        <div class="item">
          <span class="tit">申请时间：</span><span class="txt">2018-12-30 12:12:12</span>
        </div>
        <div class="item">
          <span class="tit">退款编号：</span><span class="txt">45454545454545454545454</span>
        </div>
      </div>
    </div>
    <div class="btn-bottom">
      拨打电话咨询
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
