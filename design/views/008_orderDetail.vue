<template>
  <!--订单详情-->
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">订单详情</div>
      <div class="header-right">
        <a class="hb-ico ico-center"></a>
      </div>
    </div>
    <!--标题栏-->
    <div class="hb-wrap-box hb-wrap-box-5">
      <!--交易成功-->
      <div class="weui-cells hb-panel bor-b20">
        <div class="weui-cell hb-order-status weui-cell_access">
          <div class="weui-cell__hd">
            <span class="hb-ico trade-succ"></span>
          </div>
          <div class="weui-cell__bd">
            <div class="fs30"><span class="ci">交易成功</span></div>
            <div class="time">2017-12-12  09:23</div>
          </div>
          <div class="weui-cell__ft">更多状态</div>
        </div>
      </div>
      <!--开通中-->
      <div class="weui-cells hb-panel bor-b20">
        <div class="weui-cell hb-order-status weui-cell_access">
          <div class="weui-cell__hd">
            <span class="hb-ico trade-ing"></span>
          </div>
          <div class="weui-cell__bd">
            <div class="fs30"><span class="ci">开通中</span></div>
            <div class="time">2017-12-12  09:23</div>
          </div>
          <div class="weui-cell__ft">更多状态</div>
        </div>
      </div>
      <!--交易关闭-->
      <div class="weui-cells hb-panel bor-b20">
        <div class="weui-cell hb-order-status weui-cell_access">
          <div class="weui-cell__hd">
            <span class="hb-ico trade-fail"></span>
          </div>
          <div class="weui-cell__bd">
            <div class="fs30"><span class="ci">交易关闭</span></div>
            <div class="time">2017-12-12  09:23</div>
          </div>
          <div class="weui-cell__ft">更多状态</div>
        </div>
      </div>
      <!--待支付-->
      <div class="weui-cells hb-panel bor-b20">
        <div class="weui-cell hb-order-status weui-cell_access">
          <div class="weui-cell__hd">
            <span class="hb-ico pay-wait"></span>
          </div>
          <div class="weui-cell__bd">
            <div class="fs30"><span class="ci">待支付</span></div>
            <div class="time">2017-12-12  09:23</div>
          </div>
          <div class="btn-bar">
            <div class="hb-btn-s">取消订单</div>
            <div class="hb-btn-s current">立即支付</div>
          </div>
        </div>
      </div>
      <!--支付中-->
      <div class="weui-cells hb-panel bor-b20">
        <div class="weui-cell hb-order-status weui-cell_access">
          <div class="weui-cell__hd">
            <span class="hb-ico pay-ing"></span>
          </div>
          <div class="weui-cell__bd">
            <div class="fs30"><span class="ci">支付中</span></div>
            <div class="time">2017-12-12  09:23</div>
          </div>
          <div class="btn-bar">
            <div class="hb-btn-s">取消订单</div>
            <div class="hb-btn-s current">立即支付</div>
          </div>
        </div>
      </div>
      <!--已付款-->
      <div class="weui-cells hb-panel bor-b20">
        <div class="weui-cell hb-order-status weui-cell_access">
          <div class="weui-cell__hd">
            <span class="hb-ico pay-succ"></span>
          </div>
          <div class="weui-cell__bd">
            <div class="fs30"><span class="ci">已付款</span></div>
            <div class="time">2017-12-12  09:23</div>
          </div>
          <div class="weui-cell__ft">更多状态</div>
        </div>
      </div>


      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">发票信息</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div class="bd-items"><span class="tit-1">发票类型：</span><span class="txt">普通发票</span></div>
              <div class="bd-items"><span class="tit-1">抬头类型：</span><span class="txt">单位</span></div>
              <div class="bd-items"><span class="tit-1">发票抬头：</span><span class="txt">福建省华博教育科技股份有限公司</span></div>
              <div class="bd-items"><span class="tit-1">纳税人识别号：</span><span class="txt">CL3453543543645654</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">发票信息</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div class="bd-items mt5"><span class="tit-1">发票类型：</span><span class="txt">增殖税普通发票（电子）</span><div class="hb-btn-s current">待开票</div></div>
              <div class="bd-items"><span class="tit-1">抬头类型：</span><span class="txt">个人</span></div>
              <div class="bd-items"><span class="tit-1">发票抬头：</span><span class="txt">隔壁老王</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">订单信息</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div class="bd-items"><span class="tit-1">订单类型：</span><span class="txt">个人订单</span></div>
              <div class="bd-items"><span class="tit-1 tit-3">订单号：</span><span class="txt">15659135119</span></div>
              <div class="bd-items"><span class="tit-1">集体报名批次：</span><span class="txt">abcdefg45456542156456415465415645dfdfdfdfdfdfdffdfd6456</span></div>
              <div class="bd-items"><span class="tit-1">下单时间：</span><span class="txt">2017-12-12  19:23:23</span></div>
              <div class="bd-items"><span class="tit-1">下单渠道：</span><span class="txt">在线支付/WEB端</span></div>
              <div class="bd-items"><span class="tit-1">支付方式：</span><span class="txt">微信公众号支付</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">学分内容</div>
        <div class="hb-media-box hb-media-box-1">
          <div class="hb-media-box-hd">
            <img class="hb-media-box-thumb" src="../images/course-score.jpg" />
          </div>
          <div class="hb-media-box-bd">
            <div class="hb-media-box-desc">继续教育年度：2019</div>
            <div class="hb-media-box-desc">每学分：<span class="ci">￥1.00</span></div>
            <div class="hb-media-box-desc">学分：30</div>
          </div>
        </div>
        <div class="hb-media-box hb-media-box-1">
          <div class="hb-media-box-hd">
            <img class="hb-media-box-thumb" src="../images/course-score.jpg" />
          </div>
          <div class="hb-media-box-bd">
            <div class="hb-media-box-desc">继续教育年度：2019</div>
            <div class="hb-media-box-desc">每学分：<span class="ci">￥1.00</span></div>
            <div class="hb-media-box-desc">学分：30</div>
          </div>
        </div>
        <div class="order-top-tip order-top-tip-1">
          系统将为你进行必修课程选课，选课结果<a href="#">请查阅选课记录</a>
          <img src="../images/tag-required.png" class="tag" />
        </div>
        <div class="order-info-box">
          <div class="btn-refund">发起退款</div>
          <div>实付<span class="ml10 ci">¥ 60</span> </div>
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
