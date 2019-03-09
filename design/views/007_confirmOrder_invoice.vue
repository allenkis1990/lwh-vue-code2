<template>
  <!--发票-->
  <div class="contain hb-box">
    <div class="hb-box-bd">
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">开票类型</div>
        <div class="weui-cells">
          <div class="weui-cell pbr0">
            <div class="weui-cell__bd">
              <div class="hb-btn-s w1 current">增值税普通用发票</div>
            </div>
          </div>
          <div class="p20 fs26 c9">电子发票即增值税普通发票的电子版本，可支持报销入账，其法律效力、基本用途及使用规定和纸质发票相同。</div>
        </div>
      </div>
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-panel__hd">发票抬头</div>
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd flex">
              <div class="hb-form">
                <img class="img" src="../images/radio.png" alt=" " />
                <!--<img class="img" src="../images/radio-checked.png" alt=" " />-->
              </div>
              <div class="ml20">个人</div>
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__bd flex">
              <div class="hb-form">
                <!--<img class="img" src="../images/radio.png" alt=" " />-->
                <img class="img" src="../images/radio-checked.png" alt=" " />
              </div>
              <div class="ml20">单位</div>
            </div>
          </div>
        </div>
      </div>

      <!--个人-->
      <div class="weui-panel hb-panel bor-b20">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>个人姓名</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
        </div>
      </div>
      <!--/个人-->
      <!--单位-->
      <div class="weui-panel hb-panel">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>单位全称</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
          <div class="weui-cell">
            <div class="weui-cell__hd"><div class="weui-label"><span class="star">*</span>纳税人识别号</div></div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="text" placeholder="请输入" />
            </div>
          </div>
        </div>
        <div class="c9 fs26 p20">按照国税总局公告，自2017年7月1日起，企业索取的增值税发票需填写纳税人识别号，不符合规定的发票，不得作为合法的税收凭证。</div>
      </div>
      <!--/单位-->
    </div>

    <div class="hb-tabbar">
      <div class="hb-btn hb-btn-3">保 存</div>
    </div>
  </div>

</template>

<style lang="less">
  @import "~vux/src/styles/weui/widget/weui_tips/weui-loadmore.less";
</style>
<script>
  require('../styles/webstyle.less')
</script>
