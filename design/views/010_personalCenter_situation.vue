<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">各继续教育年度培训情况</div>
      <div class="header-right3">
        <a href="#"><img style="margin:0;" src="../images/icon-warning.png" /></a>
      </div>
    </div>
    <!--标题栏-->
    <div class="course-select-training pb20">
      <div class="preview clear">
        <div class="tit">
          <div class="text">2018年度继续教育学分分布</div>
          <div class="pic"><img src="../images/icon-go-bg.png" /></div>
        </div>
        <div class="tip">
          <img src="../images/icon-warning.png">
          <div class="text">视同申报的XX科目X学分处于待审批中</div>
        </div>
        <div class="chart clear">
          <div class="pic">
            <img src="../images/pic-tongji.png" />
          </div>
          <div class="text">
            <div class="item">
              <div class="color color-1"></div>
              <div class="name">已获得</div>
              <div class="num">25学分</div>
            </div>
            <div class="item">
              <div class="color color-2"></div>
              <div class="name">正在学习</div>
              <div class="num">15学分</div>
            </div>
            <div class="item">
              <div class="color color-3"></div>
              <div class="name">未学习</div>
              <div class="num">15学分</div>
            </div>
            <div class="item">
              <div class="color color-4"></div>
              <div class="name">还差</div>
              <div class="num">10学分</div>
            </div>
            <a href="#" class="btn">购买学分</a>
          </div>
        </div>
        <div class="order-tip jcc">
          <img src="../images/icon-warning.png" />
          <div class="text">已购买学分中，<em>X</em>学分处于退款中，无法选课！</div>
        </div>
        <div class="line"></div>
        <div class="chart clear pt30">
          <div class="pic">
            <img src="../images/pic-tongji.png" />
          </div>
          <div class="text">
            <div class="item">
              <div class="color color-1"></div>
              <div class="name">已获得</div>
              <div class="num">25学分</div>
            </div>
            <div class="item">
              <div class="color color-2"></div>
              <div class="name">正在学习</div>
              <div class="num">15学分</div>
            </div>
            <div class="item">
              <div class="color color-3"></div>
              <div class="name">还差</div>
              <div class="num">15学分</div>
            </div>
            <div class="item">
              <div class="color color-4"></div>
              <div class="name">还差</div>
              <div class="num">10学分</div>
            </div>
            <a href="#" class="btn">前往选课</a>
          </div>
        </div>
        <div class="line"></div>
        <div class="chart clear pt30 pb30">
          <div class="pic">
            <img src="../images/pic-tongji.png" />
          </div>
          <div class="text">
            <div class="item">
              <div class="color color-1"></div>
              <div class="name">已获得</div>
              <div class="num">25学分</div>
            </div>
            <div class="item">
              <div class="color color-2"></div>
              <div class="name">正在学习</div>
              <div class="num">15学分</div>
            </div>
            <div class="item">
              <div class="color color-3"></div>
              <div class="name">还差</div>
              <div class="num">15学分</div>
            </div>
            <div class="item">
              <div class="color color-4"></div>
              <div class="name">还差</div>
              <div class="num">10学分</div>
            </div>
            <a href="#" class="btn">购买学分</a>
          </div>
        </div>
        <div class="tip2">数据来源：实时同步继续教育管理系统</div>
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
