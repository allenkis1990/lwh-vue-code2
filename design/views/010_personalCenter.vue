<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">学习中心</div>
    </div>
    <!--标题栏-->
    <div class="hb-user-img bor-b20">
      <img class="user-img" src="../images/user-img.jpg" alt=" ">
      <div class="mt10">隔壁老王</div>
      <div class="mt10 fs28">专业技术资格等级：初级</div>
      <div class="go"><img src="../images/icon-go.png" /></div>
    </div>
    <div class="weui-cells hb-panel hb-personal-center" style="padding-bottom:1rem;">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-year"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">各年度继续教育培训情况</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-study"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">进入学习</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access bor-b20">
        <div class="weui-cell__hd"><span class="hb-ico ico-prove"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">培训证明</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>

      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-exchange"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">选课清单（X学分）</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-order"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">我的订单</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access bor-b20">
        <div class="weui-cell__hd"><span class="hb-ico ico-record"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">选课记录</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>

      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-pwd"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">修改密码</div>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><span class="hb-ico ico-exit"></span></div>
        <div class="weui-cell__bd">
          <div class="bd-items fs30">退出登录</div>
        </div>
        <div class="weui-cell__ft"></div>
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
