<template>
  <!--结算成功-->
  <div class="contain hb-box">
    <div class="hb-box-bd">
      <div class="hb-msg bor-b20">
        <img class="icon-success" src="../images/icon-success.png" />
        <div class="fs30 mt20">支付成功</div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">订单信息</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd"><div><span class="tit">订单号</span>543437835424245456</div></div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd"><div><span class="tit">下单时间</span>2017-12-12<span class="ml10">19:23:23</span></div></div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd"><div><span class="tit">付款金额</span><span class="ml10 ci">¥39.99</span></div></div>
          </div>
        </div>
      </div>
      <div class="order-top-tip">
        根据《会计专业技术人员继续教育实施办法》规定XXXX年度，需完成X门公需科目的X学分、Y门专业科目的Y学分的必修课程，共X+Y学分。<a href="#">查看必修课程</a>
        <img src="../images/tag-required.png" class="tag" />
      </div>
      <div class="order-tip2">
        <div class="pic"><img src="../images/icon-warning.png" /></div>
        <div class="text">平台赠送您会计X级职称考试辅导课程，请进入小程序“我的-考前辅导课程”学习。</div>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">学分内容</div>
        <div class="weui-panel__bd">
          <div class="hb-media-box">
            <div class="hb-media-box-hd">
              <img class="hb-media-box-thumb" src="../images/course-img.jpg" />
            </div>
            <div class="hb-media-box-bd">
              <div class="hb-media-box-desc">继续教育年度：2019</div>
              <div class="hb-media-box-desc">每学分：<span class="ci">￥1.00</span></div>
              <div class="hb-media-box-desc">学分：40</div>
            </div>
          </div>
          <div class="hb-media-box">
            <div class="hb-media-box-hd">
              <img class="hb-media-box-thumb" src="../images/course-img.jpg" />
            </div>
            <div class="hb-media-box-bd">
              <div class="hb-media-box-desc">继续教育年度：2019</div>
              <div class="hb-media-box-desc">每学分：<span class="ci">￥1.00</span></div>
              <div class="hb-media-box-desc">学分：40</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hb-tabbar">
      <div class="hb-btn-w hb-btn-3">查看订单详情</div>
      <div class="hb-btn hb-btn-3">进入选课培训</div>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
