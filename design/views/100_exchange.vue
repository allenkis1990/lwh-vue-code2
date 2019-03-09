<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">学分兑换课程</div>
      <div class="header-right">
        <a class="hb-ico ico-center"></a>
      </div>
    </div>
    <!--标题栏-->
    <div class="exchange">
      <div class="preview">
        <p>2018年度，已在本平台完成公需科目Z学分，专业科目K学分的选课。您还需选择公需科目X学分，专业科目Y学分的课程。</p>
        <div class="mine">您当前持有X学分可兑换课程。尚差Y学分，才可完成本年度的培训要求学分。<a href="#">前往购买学分>></a></div>
      </div>
      <div class="tip clear">
        <div class="pic"><img src="../images/icon-warning.png" /></div>
        <div class="text">当前存在一笔尚未支付的学习购买记录，请先处理后，再报名！<a href="#">前往处理>></a></div>
      </div>
      <div class="course clear">
        <div class="tag"><img src="../images/icon-tag-ex.png" /></div>
        <div class="grade-sel clear">
          <div class="tit">当前专业技术资格等级（培训）：</div>
          <div class="grade">初级<img src="../images/icon-go.png" /></div>
        </div>
        <div class="grade-sel clear">
          <div class="tit">年度：</div>
          <div class="grade">2018</div>
        </div>
        <div class="title">您还需要完成以下学分兑换课程</div>
        <div class="course-exchange">
          <div class="tit">公需科目：</div>
          <div class="num">
            <div class="icon"><img src="../images/icon-minus.png" /></div>
            <div class="text">20</div>
            <div class="icon"><img src="../images/icon-plus-cur.png" /></div>
          </div>
          <div class="unit">学分</div>
        </div>
        <div class="course-exchange">
          <div class="tit">专业科目：</div>
          <div class="num">
            <div class="icon"><img src="../images/icon-minus-cur.png" /></div>
            <div class="text">25</div>
            <div class="icon"><img src="../images/icon-plus.png" /></div>
          </div>
          <div class="unit">学分</div>
        </div>
        <div class="operation clear">
          <div class="one-key">一键智能兑换<div class="tj"><img src="../images/icon-tj.png" /></div></div>
          <div class="self-btn">自主兑换</div>
        </div>
        <div class="exchange-tip">
          <img src="../images/icon-warning.png" />兑换课程之后，将不可退课与换课。
        </div>
      </div>
    </div>
    <div class="exchange-pool">
      <div class="pic"><img src="../images/icon-pool.png" /></div>
      <div class="text">2019年度，已选X门，其中公需科目X学分，专业科目Y学分</div>
      <div class="pic2"><img src="../images/icon-go.png" /></div>
    </div>
    <div class="weui-tabbar">
      <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
        <div class="weui-tabbar__icon">
          <!--<img src="../images/tabbar-find.png" alt=" " />-->
          <img src="../images/tabbar-find-current.png" alt=" " />
        </div>
        <p class="weui-tabbar__label"><span>首页</span></p>
      </a>

      <a href="javascript:;" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <img src="../images/tabbar-cart.png" alt=" " />
          <!--<img src="../images/tabbar-cart-current.png" alt=" " />-->

        </div>
        <p class="weui-tabbar__label"><span>学分兑换课程</span></p>
      </a>


      <a href="javascript:;" class="weui-tabbar__item">
        <div class="weui-tabbar__icon">
          <img src="../images/tabbar-archives.png" alt=" " />
          <!--<img src="../images/tabbar-archives-current.png" alt=" " />-->
        </div>
        <p class="weui-tabbar__label"><span>学习中心</span></p>
      </a>
    </div>
  </div>
</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
