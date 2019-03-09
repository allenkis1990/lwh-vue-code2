<template>
  <div class="contain">
    <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
      <div class="weui-mask"></div>
      <div class="dialog-quick-box">
        <div class="quick-box">
            <div class="bg"><img src="../images/quick-bg.png" /></div>
            <div class="con">
              <div class="hd">2019年度，您已购买的学分中，可以完成以下科目学分的选课：</div>
              <div class="bd">
                <div class="item">
                  <div class="name">公需科目</div>
                  <div class="slider slider-1">
                    <div class="cur" style="width:93%;">
                      <div class="slider-block"></div>
                    </div>
                  </div>
                  <div class="num">28学分</div>
                </div>
                <div class="item">
                  <div class="name">专业科目</div>
                  <div class="slider slider-2">
                    <div class="cur" style="width:75%;">
                      <div class="slider-block"></div>
                    </div>
                  </div>
                  <div class="num">45学分</div>
                </div>

              </div>
            </div>
          <a class="quick-btn"><img src="../images/quick-btn.png" /></a>
          </div>
        <a class="btn-close"><img src="../images/icon-close.png" /></a>
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
