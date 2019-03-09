<template>
  <div class="contain">
    <div class="notice-title t-tong">
      <div class="t t-tong"><img class="img" src="images/icon-tong.png" />培训通知</div>
      <div class="line"></div>
    </div>

    <div class="notice-title t-tong">
      <div class="t t-zheng"><img class="img" src="images/icon-zheng.png" />政策法规</div>
      <div class="line"></div>
    </div>
    <div class="notice-title t-tong">
      <div class="t t-xun"><img class="img" src="images/icon-xun.png" />业界资讯</div>
      <div class="line"></div>
    </div>
    <div class="notice-title t-tong">
      <div class="t t-wen"><img class="img" src="images/icon-wen.png" />常见问题</div>
      <div class="line"></div>
    </div>

    <!--列表-->
    <div class="notice">
      <div class="item">
        <div class="title">通知标题一行显示超出省略通知标题通知标题通知标题通知标题通知标题</div>
        <div class="desc">内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多</div>
        <div class="info">
          <div class="views">
            <div class="pic"><img src="images/icon-views.png"></div>
            <div class="text">2345</div>
          </div>
          <div class="date">
            <div class="pic"><img src="images/icon-date.png"></div>
            <div class="text">2018-11-20</div></div>
        </div>
      </div>
      <div class="item">
        <div class="title">通知标题一行显示超出省略通知标题通知标题通知标题通知标题通知标题</div>
        <div class="desc">内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多</div>
        <div class="info">
          <div class="views">
            <div class="pic"><img src="images/icon-views.png"></div>
            <div class="text">2345</div>
          </div>
          <div class="date">
            <div class="pic"><img src="images/icon-date.png"></div>
            <div class="text">2018-11-20</div></div>
        </div>
      </div>
      <div class="item">
        <div class="title">通知标题一行显示超出省略通知标题通知标题通知标题通知标题通知标题</div>
        <div class="desc">内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多</div>
        <div class="info">
          <div class="views">
            <div class="pic"><img src="images/icon-views.png"></div>
            <div class="text">2345</div>
          </div>
          <div class="date">
            <div class="pic"><img src="images/icon-date.png"></div>
            <div class="text">2018-11-20</div></div>
        </div>
      </div>
      <div class="item">
        <div class="title">通知标题一行显示超出省略通知标题通知标题通知标题通知标题通知标题</div>
        <div class="desc">内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多</div>
        <div class="info">
          <div class="views">
            <div class="pic"><img src="images/icon-views.png"></div>
            <div class="text">2345</div>
          </div>
          <div class="date">
            <div class="pic"><img src="images/icon-date.png"></div>
            <div class="text">2018-11-20</div></div>
        </div>
      </div>
      <div class="item">
        <div class="title">通知标题一行显示超出省略通知标题通知标题通知标题通知标题通知标题</div>
        <div class="desc">内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多两行超出省略内容摘要最多</div>
        <div class="info">
          <div class="views">
            <div class="pic"><img src="images/icon-views.png"></div>
            <div class="text">2345</div>
          </div>
          <div class="date">
            <div class="pic"><img src="images/icon-date.png"></div>
            <div class="text">2018-11-20</div></div>
        </div>
      </div>
      <div class="loading-tips"><span class="line"></span><span class="txt">已经到最底部啦</span><span class="line"></span></div>
    </div>
    <!--/班级列表-->
    <!--返回顶部-->
    <div class="layer-box">
      <div class="a-items">
        <img class="img" src="../images/icon-top.png" alt=" " />
      </div>
    </div>
    <!--/返回顶部-->
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
          <img src="../images/tabbar-learning.png" alt=" " />
          <!--<img src="../images/tabbar-learning-current.png" alt=" " />-->

        </div>
        <p class="weui-tabbar__label"><span>报名培训</span></p>
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
