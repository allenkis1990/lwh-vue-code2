<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">选课培训</div>
      <div class="header-right">
        <a class="hb-ico ico-center"></a>
      </div>
    </div>
    <!--标题栏-->
    <div class="course-select-training">
      <div class="preview clear">
        <div class="tit">
          <div class="text">2018年度继续教育学分购买情况</div>
          <div class="pic"><img src="../images/icon-go-bg.png" /></div>
        </div>
        <div class="chart clear">
          <div class="pic">
            <img src="../images/pic-tongji.png" />
          </div>
          <div class="text">
            <!--
            <div class="item">
              <div class="color color-1"></div>
              <div class="name">已获得学分</div>
              <div class="num">25学分</div>
            </div>
            -->
            <div class="item">
              <div class="color color-2"></div>
              <div class="name">已购买学分</div>
              <div class="num">15学分</div>
            </div>
            <div class="item">
              <div class="color color-3"></div>
              <div class="name">还需购买学分</div>
              <div class="num">15学分</div>
            </div>
          </div>
        </div>
        <div class="order-tip jcc">
          <img src="../images/icon-warning.png" />
          <div class="text">已购买学分中，<em>X</em>学分处于退款中，无法选课！</div>
        </div>
        <a href="#" class="btn">点我购买学分</a>
        <div class="line"></div>
        <!--case1-->
        <div class="situation">
          <div class="text">本年度已购买学分中，剩余<span>Y</span>学分，尚未完成选课。系统根据您培训情况，建议您完成以下科目的选课：</div>
          <div class="proportion">
            <div class="left"></div>
            <div class="right"></div>
          </div>
          <!--只有一项时添加one样式
          <div class="proportion">
            <div class="left one"></div>
          </div>
          -->
          <div class="proportion-txt">
            <div class="item">
              <div class="color color-1"></div>
              <div class="name">公需科目</div>
              <div class="num">20学分</div>
            </div>
            <div class="item">
              <div class="color color-2"></div>
              <div class="name">公需科目</div>
              <div class="num num-2">20学分</div>
            </div>
            <!--只有一项时添加one样式
            <div class="item one">
              <div class="color color-1"></div>
              <div class="name">公需科目</div>
              <div class="num">20学分</div>
            </div>
            -->
          </div>
          <a href="#" class="btn mb0">点我快速选课</a>
          <a href="#" class="btn2">自主选课>></a>
        </div>
        <!--case2-->
        <div class="situation">
          <div class="proportion-img"><img src="../images/icon-traing1.png" /></div>
          <div class="text tc">请先购买学分，方可快速的完成选课！</div>
          <a href="#" class="btn mb0">点我快速选课</a>
          <a href="#" class="btn2">自主选课>></a>
        </div>
        <!--case3-->
        <div class="situation">
          <div class="proportion-img"><img src="../images/icon-traing2.png" /></div>
          <div class="text tc">您已完成本继续教育年度的学分选课，无需选课！</div>
          <div class="text tc"><a href="#" class="btn3">浏览平台课程目录</a><a href="#" class="btn3">进入学习</a></div>
        </div>
      </div>
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
        <p class="weui-tabbar__label"><span>选课培训</span></p>
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
