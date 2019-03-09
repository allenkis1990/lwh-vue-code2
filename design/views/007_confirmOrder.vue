<template>
  <!--确认订单-->
  <div class="contain hb-box">
    <div class="order-top-tip">
      根据《会计专业技术人员继续教育实施办法》规定XXXX年度，需完成X门公需科目的<em>X</em>学分、<em>Y</em>门专业科目的<em>Y</em>学分的必修课程，共<em>X+Y</em>学分。<a href="#">查看必修课程</a>
      <img src="../images/tag-required.png" class="tag" />
    </div>
    <div class="hb-box-bd">
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">购买学分</div>
        <div class="weui-panel__bd">
          <div class="hb-media-box">
            <div class="hb-media-box-hd">
              <img class="hb-media-box-thumb" src="../images/course-score.jpg" />
            </div>
            <div class="hb-media-box-bd">
              <div class="hb-media-box-desc">继续教育年度：2019</div>
              <div class="hb-media-box-desc">学分单价：<span class="ci">￥1.00</span></div>
              <div class="course-exchange">
                <div class="num">
                  <div class="icon"><img src="../images/icon-minus-cur.png" /></div>
                  <div class="text">25</div>
                  <div class="icon"><img src="../images/icon-plus.png" /></div>
                </div>
                <div class="unit">学分</div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-cells">
          <div class="order-tip">
            <img src="../images/icon-warning.png" />
            <div class="text">XXXX年度,已购买<em>X</em>学分（其中<em>Y</em>学分处于退款中），还需购买<em>Z</em>学分，才可完成该年度的继续教育学习！</div>
          </div>
        </div>
      </div>
      <div class="weui-panel hb-panel">
        <div class="weui-panel__hd">发票</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <div>索要发票</div>
            </div>
            <div class="weui-cell__ft hb-form-box">
              <div class="hb-form">
                <!--<img class="img" src="../images/radio.png" alt=" " />-->
                <img class="img" src="../images/radio-checked.png" alt=" " />
              </div>
            </div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">
              <div class="to"><span class="tit">发票抬头</span>纸质-单位(福建华博教育科技股份有限公司）</div>
            </div>
            <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hb-tabbar">
      <div class="left-box">待付金额<span class="ci fs40 ml20">￥30.00</span></div>
      <div class="hb-btn disabled">提交订单</div>
    </div>
  </div>

</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
