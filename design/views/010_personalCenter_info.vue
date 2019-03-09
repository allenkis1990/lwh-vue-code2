<template>
  <div class="contain">
    <!--标题栏-->
    <div class="hb-header-box">
      <div class="header-tit">个人信息</div>
      <div class="header-right3">
        <a href="#">返回</a>
      </div>
    </div>
    <!--标题栏-->
    <div class="personal-tip">
      <div class="pic"><img src="../images/icon-warning.png" /></div>
      <div class="text">会计人员信息统一由会计继续教育管理系统统一管理，如需变更，请前往管理系统登记变更。</div>
    </div>
    <div class="hb-box-bd hb-box-bd-4 pb0">
      <div class="weui-panel hb-panel">
        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__hd"><span class="tit-2">身份证号</span></div>
            <div class="weui-cell__bd tr">352115548965124589</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">真实姓名</span></div>
            <div class="weui-cell__bd tr">隔壁老王</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">性别</span></div>
            <div class="weui-cell__bd tr">男</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">手机号</span></div>
            <div class="weui-cell__bd tr">15659135119</div>
            <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">专业技术资格等级（培训）</span></div>
            <div class="weui-cell__bd tr">初级</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">获得资格时间</span></div>
            <div class="weui-cell__bd to tr">2018年12月18日</div>
          </div>
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__hd"><span class="tit-2">单位名称</span></div>
            <div class="weui-cell__bd tr">福建华博教育科技股份有限公司</div>
          </div>
        </div>
      </div>
    </div>
    <div class="personal-tip-2">
      <div class="text">
        <b><img src="../images/icon-warning.png" />《会计专业技术人员继续教育规定》对会计人员继续教育培训时间说明如下：</b><br/>
        <p><em>※</em>具有会计技术专业技术资格的人员应当自取得会计专业技术资格的次年开始参加继续教育，并在规定时间内取得规定学分。</p>
        <p><em>※</em>不具有会计技术专业技术资格的人员应当自从事会计工作的次年开始参加继续教育，并在规定时间内取得规定学分。</p>
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
